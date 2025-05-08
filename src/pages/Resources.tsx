import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Check, ChevronDown, ChevronUp, HelpCircle, BookOpenText, Sparkles,
    GraduationCap, Leaf, Sprout, Languages, ListChecks, X, Lightbulb, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// --- Define Types ---
type VocabularyItem = { word: string; reading: string; meaning: string };
type Question = {
    id: string;
    question: string;
    question_en?: string; // Added English translation for question
    options: string[];
    options_en?: string[]; // Added English translations for options
    answer: number; // Index of the correct option
    explanation?: string; // Optional explanation
};
type ReadingExercise = {
    id: string;
    title: string;
    level: string; // e.g., N5, N4, N3
    levelDescription: string; // e.g., Beginner, Intermediate
    text: string; // This will now contain only Kana (Hiragana/Katakana) + punctuation/spaces
    translation: string;
    vocabulary: VocabularyItem[];
    questions: Question[];
};
type ProgressState = { beginner: number; intermediate: number; advanced: number };
type AnsweredQuestionsState = { [key: string]: { selected: number; correct: boolean } };
type ShowInfoState = { [key: string]: boolean };
type Level = keyof ProgressState; // 'beginner' | 'intermediate' | 'advanced'

// --- Helper function to render Japanese text with Furigana ---
// Converts a string with 漢字(かんじ) format to <ruby> tags
// Note: This function is still used for Questions/Options/Explanations/Vocabulary
// where Kanji with readings are still present in the data.
// It will simply return the string as is if no 漢字(かんじ) patterns are found (like the main text now).
function renderJapaneseWithFurigana(text: string): React.ReactNode[] {
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    // Regex to find patterns like 漢字(かんじ) or 言葉(ことば)
    // It captures the part before the parenthesis (Kanji/word) and the part inside (reading)
    const regex = /([^()\s]+)\(([^()]+)\)/g;
    let match;

    while ((match = regex.exec(text)) !== null) {
        const kanji = match[1];
        const reading = match[2];
        const startIndex = match.index;
        const endIndex = regex.lastIndex;

        // Add text before the match
        if (startIndex > lastIndex) {
            parts.push(text.substring(lastIndex, startIndex));
        }

        // Add the ruby element (Kanji with reading above)
        parts.push(
            <ruby key={`ruby-${startIndex}-${kanji}`}>
                {kanji}
                <rt>{reading}</rt>
            </ruby>
        );

        lastIndex = endIndex;
    }

    // Add any remaining text after the last match
    if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
    }

    // If no matches were found, return the original text as a single node
     if (parts.length === 0 && text.length > 0) {
         // Check if the text contains only Hiragana, Katakana, numbers, punctuation, and spaces
         // This is a simplified check, might need refinement based on exact requirements
         const kanaOnlyRegex = /^[\u3040-\u309F\u30A0-\u30FF\u31F0-\u31FF\u3000-\u303F\uFF01-\uFF0F\uFF1A-\uFF20\uFF3B-\uFF40\uFF5B-\uFF60\u30FB-\u30FC\u0020-\u007E0-9]+$/;
         if (kanaOnlyRegex.test(text)) {
             return [text]; // Render as plain text if it looks like only kana/symbols
         } else {
            // Fallback or handle cases that might still have Kanji without furigana format
            // For this specific request, the data is being pre-processed, so this branch
            // might indicate an issue with the pre-processing or an unexpected character.
            // For now, just return the raw text.
            return [text];
         }
     }

    return parts;
}


// --- Sample Data (Augmented with Furigana, text field is now Kana-only) ---
const readingExercises: Record<Level, ReadingExercise[]> = {
    beginner: [
        {
            id: 'b1',
            title: 'わたしの いちにち (My Day)',
            level: 'N5',
            levelDescription: 'Beginner',
            text: 'わたしは まいにち ろくじに おきます。かおを あらって、あさごはんを たべます。パンと たまごを たべます。コーヒーを のみます。しちじはんに いえを でます。でんしゃで がっこうに いきます。がっこうは はちじに はじまります。ごご よじに おわります。ごじに いえに かえります。ばんごはんを たべて、しゅくだいを します。ときどき テレビを みます。じゅういちじに ねます。', // Kana only - NO CHANGE NEEDED
            translation: 'I wake up at 6 o\'clock every day. I wash my face and eat breakfast. I eat bread and eggs. I drink coffee. I leave home at 7:30. I go to school by train. School starts at 8 o\'clock. It ends at 4 o\'clock in the afternoon. I return home at 5 o\'clock. I eat dinner and do homework. Sometimes I watch TV. I go to sleep at 11 o\'clock.',
            vocabulary: [ { word: 'まいにち', reading: 'mainichi', meaning: 'every day' }, { word: 'おきます', reading: 'okimasu', meaning: 'to wake up' }, { word: 'かおを あらう', reading: 'kao o arau', meaning: 'to wash face' }, { word: 'あさごはん', reading: 'asagohan', meaning: 'breakfast' }, { word: 'パン', reading: 'pan', meaning: 'bread' }, { word: 'たまご', reading: 'tamago', meaning: 'egg' }, { word: 'コーヒー', reading: 'koohii', meaning: 'coffee' }, { word: 'のみます', reading: 'nomimasu', meaning: 'to drink' }, { word: 'いえを でます', reading: 'ie o demasu', meaning: 'to leave home' }, { word: 'でんしゃ', reading: 'densha', meaning: 'train' }, { word: 'がっこう', reading: 'gakkou', meaning: 'school' }, { word: 'はじまります', reading: 'hajimarimasu', meaning: 'to start' }, { word: 'おわります', reading: 'owarimasu', meaning: 'to end' }, { word: 'かえります', reading: 'kaerimasu', meaning: 'to return' }, { word: 'ばんごはん', reading: 'bangohan', meaning: 'dinner' }, { word: 'しゅくだい', reading: 'shukudai', meaning: 'homework' }, { word: 'ときどき', reading: 'tokidoki', meaning: 'sometimes' }, { word: 'ねます', reading: 'nemasu', meaning: 'to sleep' } ],
            questions: [
                { id: 'b1q1', question: '何(なん)じに 起(お)きますか。', question_en: 'What time do they wake up?', options: ['5時(じ)', '6時(じ)', '7時(じ)', '7時(じ)半(はん)'], options_en: ['5 o\'clock', '6 o\'clock', '7 o\'clock', '7:30'], answer: 1, explanation: '本文に「ろくじに おきます」と書いてあります。\n起きる時間は6時ですね。\nテキストから直接読み取れます。' },
                { id: 'b1q2', question: '何(なに)で 学校(がっこう)に 行(い)きますか。', question_en: 'How do they go to school?', options: ['バス', 'くるま', '電車(でんしゃ)', '自転車(じてんしゃ)'], options_en: ['By bus', 'By car', 'By train', 'By bicycle'], answer: 2, explanation: '本文には「でんしゃで がっこうに いきます」と\nはっきり書かれています。学校へは電車を\n使って行くとわかります。' },
                { id: 'b1q3', question: '晩御飯(ばんごはん)の 後(あと)で、何(なに)を しますか。', question_en: 'What do they do after dinner?', options: ['テレビを 見(み)ます', '宿題(しゅくだい)を します', '寝(ね)ます', 'コーヒーを 飲(の)みます'], options_en: ['Watch TV', 'Do homework', 'Sleep', 'Drink coffee'], answer: 1, explanation: '「ばんごはんを たべて、しゅくだいを します」と\nあります。夕食後すぐにすることとして宿題が\n挙げられていますね。' }
            ]
        },
        {
            id: 'b2',
            title: 'かいもの (Shopping)',
            level: 'N5',
            levelDescription: 'Beginner',
            text: 'きのう、わたしは ともだちと スーパーへ いきました。スーパーは えきの ちかくに あります。くだものと やさいを かいました。りんごは よっつ、みかんは いつつ かいました。ぜんぶで せんえんでした。ともだちは ぎゅうにゅうと パンを かいました。かいものの あとで、きっさてんに はいりました。コーヒーを のんで、すこし はなしました。たのしかったです。', // Kana only - NO CHANGE NEEDED
            translation: 'Yesterday, I went to the supermarket with a friend. The supermarket is near the station. I bought fruits and vegetables. I bought four apples and five oranges. It was 1000 yen in total. My friend bought milk and bread. After shopping, we went into a coffee shop. We drank coffee and talked a little. It was fun.',
            vocabulary: [ { word: 'きのう', reading: 'kinou', meaning: 'yesterday' }, { word: 'ともだち', reading: 'tomodachi', meaning: 'friend' }, { word: 'スーパー', reading: 'suupaa', meaning: 'supermarket' }, { word: 'えき', reading: 'eki', meaning: 'station' }, { word: 'ちかく', reading: 'chikaku', meaning: 'near, nearby' }, { word: 'くだもの', reading: 'kudamono', meaning: 'fruit' }, { word: 'やさい', reading: 'yasai', meaning: 'vegetable' }, { word: 'かいました', reading: 'kaimashita', meaning: 'bought' }, { word: 'りんご', reading: 'ringo', meaning: 'apple' }, { word: 'みかん', reading: 'mikan', meaning: 'orange' }, { word: 'よっつ', reading: 'yottsu', meaning: 'four (things)' }, { word: 'いつつ', reading: 'itsutsu', meaning: 'five (things)' }, { word: 'ぜんぶで', reading: 'zenbu de', meaning: 'in total' }, { word: 'せんえん', reading: 'sen en', meaning: '1000 yen' }, { word: 'ぎゅうにゅう', reading: 'gyuunyuu', meaning: 'milk' }, { word: 'きっさてん', reading: 'kissaten', meaning: 'coffee shop' }, { word: 'はいりました', reading: 'hairimashita', meaning: 'entered' }, { word: 'すこし', reading: 'sukoshi', meaning: 'a little' }, { word: 'はなしました', reading: 'hanashimashita', meaning: 'talked' }, { word: 'たのしい', reading: 'tanoshii', meaning: 'fun, enjoyable' } ],
            questions: [
                 { id: 'b2q1', question: 'どこで 買(か)い物(もの)を しましたか。', question_en: 'Where did they shop?', options: ['デパート', 'コンビニ', 'スーパー', '駅(えき)'], options_en: ['Department store', 'Convenience store', 'Supermarket', 'Station'], answer: 2, explanation: '本文には「スーパーへ いきました」と\n書かれています。買い物をした場所は\nスーパーだとわかります。' },
                 { id: 'b2q2', question: 'りんごをいくつ 買(か)いましたか。', question_en: 'How many apples did they buy?', options: ['みっつ', 'よっつ', 'いつつ', 'むっつ'], options_en: ['3', '4', '5', '6'], answer: 1, explanation: '「りんごは よっつ... かいました」と\n本文に書かれていますね。りんごの数は\n４個だとわかります。' },
                 { id: 'b2q3', question: '買(か)い物(もの)の 後(あと)で、何(なに)を しましたか。', question_en: 'What did they do after shopping?', options: ['家(いえ)に 帰(かえ)りました', '映画(えいが)を 見(み)ました', '喫茶店(きっさてん)に 入(はい)りました', '本(ほん)を 読(よ)みました'], options_en: ['Returned home', 'Watched a movie', 'Entered a coffee shop', 'Read a book'], answer: 2, explanation: '「かいものの あとで、きっさてんに はいりました」と\n書いてあります。買い物の後に喫茶店に\n行ったことがわかります。' }
            ]
        },
        {
            id: 'b3',
            title: 'たんじょうび (Birthday)',
            level: 'N5',
            levelDescription: 'Beginner',
            text: 'きょうは わたしの たんじょうびです。ともだちを よんで パーティーを ひらきます。パーティーは ごご ろくじからです。やまださんと きむらさんと たなかさんが きます。みんなで おいしい りょうりを たべます。いっしょに ケーキを つくって、プレゼントを あけるつもりです。ケーキは いちごの ケーキに します。わたしは はたちに なります。たのしい いちにちに なるでしょう。きょねんの たんじょうびも とても たのしかったです。', // Kanji removed (二十歳 -> はたち) - NO CHANGE NEEDED
            translation: 'Today is my birthday. I\'m having a party with my friends. The party is from 6 PM. Yamada-san, Kimura-san, and Tanaka-san are coming. We will eat delicious food together. We\'re going to make a cake and open presents together. We will make a strawberry cake. I will turn 20 years old. It will be a fun day. Last year\'s birthday was also a lot of fun.',
            vocabulary: [
                { word: 'きょう', reading: 'kyou', meaning: 'today' },
                { word: 'たんじょうび', reading: 'tanjoubi', meaning: 'birthday' },
                { word: 'ともだち', reading: 'tomodachi', meaning: 'friend' },
                { word: 'よんで', reading: 'yonde', meaning: 'invite' },
                { word: 'パーティー', reading: 'paatii', meaning: 'party' },
                { word: 'ひらきます', reading: 'hirakimasu', meaning: 'to hold (an event)' },
                { word: 'ごご', reading: 'gogo', meaning: 'PM / afternoon' },
                { word: 'ろくじ', reading: 'rokuji', meaning: '6 o\'clock' },
                { word: 'から', reading: 'kara', meaning: 'from' },
                { word: 'やまださん', reading: 'Yamada-san', meaning: 'Mr./Ms. Yamada' },
                { word: 'きむらさん', reading: 'Kimura-san', meaning: 'Mr./Ms. Kimura' },
                { word: 'たなかさん', reading: 'Tanaka-san', meaning: 'Mr./Ms. Tanaka' },
                { word: 'きます', reading: 'kimasu', meaning: 'to come' },
                { word: 'みんなで', reading: 'minna de', meaning: 'everyone together' },
                { word: 'おいしい', reading: 'oishii', meaning: 'delicious' },
                { word: 'りょうり', reading: 'ryouri', meaning: 'food, cooking' },
                { word: 'たべます', reading: 'tabemasu', meaning: 'to eat' },
                { word: 'いっしょに', reading: 'issho ni', meaning: 'together' },
                { word: 'ケーキ', reading: 'keeki', meaning: 'cake' },
                { word: 'つくって', reading: 'tsukutte', meaning: 'make' },
                { word: 'いちご', reading: 'ichigo', meaning: 'strawberry' },
                { word: 'します', reading: 'shimasu', meaning: 'to do' },
                { word: 'はたち', reading: 'hatachi', meaning: '20 years old' }, // Reading for 二十歳
                { word: 'なります', reading: 'narimasu', meaning: 'to become' },
                { word: 'プレゼント', reading: 'purezento', meaning: 'present' },
                { word: 'あける', reading: 'akeru', meaning: 'to open' },
                { word: 'つもり', reading: 'tsumori', meaning: 'intention, plan' },
                { word: 'たのしい', reading: 'tanoshii', meaning: 'fun, enjoyable' },
                { word: 'いちにち', reading: 'ichinichi', meaning: 'one day' },
                { word: 'でしょう', reading: 'deshou', meaning: 'probably, I suppose' },
                { word: 'きょねん', reading: 'kyonen', meaning: 'last year' },
                { word: 'とても', reading: 'totemo', meaning: 'very' },
                { word: 'たのしかった', reading: 'tanoshikatta', meaning: 'was fun (past tense)' }
            ],
            questions: [
                { id: 'b3q1', question: '今日(きょう)は 何(なに)の 日(ひ)ですか。', question_en: 'What day is today?', options: ['結婚式(けっこんしき)', '誕生日(たんじょうび)', '卒業式(そつぎょうしき)', '旅行(りょこう)'], options_en: ['Wedding', 'Birthday', 'Graduation', 'Trip'], answer: 1, explanation: '本文の最初に「今日(きょう)は わたしの 誕生日(たんじょうび)です」\nとあります。今日は誕生日ということが\nはっきりと述べられています。' },
                { id: 'b3q2', question: 'パーティーで 何(なに)を しますか。', question_en: 'What will they do at the party?', options: ['映画(えいが)を 見(み)る', 'ケーキを 作(つく)る', 'ゲームを する', '買(か)い物(もの)に 行(い)く'], options_en: ['Watch a movie', 'Make a cake', 'Play a game', 'Go shopping'], answer: 1, explanation: '「一緒(いっしょ)に ケーキを 作(つく)って」とあるので、\nケーキを作る予定だとわかります。また、「プレゼントを\nあけるつもりです」ともあります。' },
                { id: 'b3q3', question: 'パーティーは 何時(なんじ)からですか。', question_en: 'What time does the party start?', options: ['午後(ごご) 5時(じ)', '午後(ごご) 6時(じ)', '午後(ごご) 7時(じ)', '午前(ごぜん) 10時(じ)'], options_en: ['5 PM', '6 PM', '7 PM', '10 AM'], answer: 1, explanation: '本文に「パーティーは 午後(ごご) 六時(ろくじ)からです」と\n書いてあります。パーティーは午後6時から\n始まることがわかります。' },
                { id: 'b3q4', question: 'だれが パーティーに 来(き)ますか。', question_en: 'Who is coming to the party?', options: ['先生(せんせい)', '家族(かぞく)', '山田(やまだ)さんと 木村(きむら)さんと 田中(たなか)さん', 'だれも 来(こ)ない'], options_en: ['Teacher', 'Family', 'Yamada, Kimura & Tanaka', 'Nobody is coming'], answer: 2, explanation: '本文に「山田(やまだ)さんと 木村(きむら)さんと 田中(たなか)さんが\n来(き)ます」と書いてあります。3人の友達が\n来ることがわかります。' },
                { id: 'b3q5', question: 'どんなケーキを 作(つく)りますか。', question_en: 'What kind of cake will they make?', options: ['チョコレートケーキ', 'バナナケーキ', 'いちごケーキ', 'チーズケーキ'], options_en: ['Chocolate cake', 'Banana cake', 'Strawberry cake', 'Cheese cake'], answer: 2, explanation: '本文に「ケーキは いちごの ケーキに します」と\n書いてあります。イチゴのケーキを作る\n予定だとわかります。' },
                { id: 'b3q6', question: '「わたし」は 何歳(なんさい)になりますか。', question_en: 'How old will "I" turn?', options: ['18歳(さい)', '19歳(さい)', '20歳(はたち)', '21歳(さい)'], options_en: ['18 years old', '19 years old', '20 years old', '21 years old'], answer: 2, explanation: '本文に「わたしは 二十歳(はたち)に なります」と\nあります。誕生日で20歳になることが\n書かれています。' }
            ]
        },
        {
            id: 'b4',
            title: 'がっこう (School)',
            level: 'N5',
            levelDescription: 'Beginner',
            text: 'わたしは まいにち がっこうへ いきます。がっこうは たのしいです。わたしの がっこうは とうきょうに あります。がっこうまで でんしゃで じゅうごふん かかります。クラスは さんじゅうにん います。ともだちと いっしょに べんきょうします。にほんごの クラスが いちばん すきです。えいごと すうがくも べんきょうします。せんせいは みんな やさしいです。きょうしつの まどから こうえんが みえます。やすみじかんは ともだちと はなします。がっこうが おわったら、ときどき ともだちと カフェに いきます。', // Kanji removed - NO CHANGE NEEDED
            translation: 'I go to school every day. School is fun. My school is in Tokyo. It takes 15 minutes by train to get to school. There are 30 students in my class. I study with my friends. My favorite class is Japanese. I also study English and mathematics. All the teachers are nice. I can see the park from the classroom window. During break time, I talk with my friends. After school, I sometimes go to a cafe with my friends.',
            vocabulary: [
                { word: 'まいにち', reading: 'mainichi', meaning: 'every day' },
                { word: 'がっこう', reading: 'gakkou', meaning: 'school' },
                { word: 'いきます', reading: 'ikimasu', meaning: 'to go' },
                { word: 'たのしい', reading: 'tanoshii', meaning: 'fun, enjoyable' },
                { word: 'とうきょう', reading: 'toukyou', meaning: 'Tokyo' },
                { word: 'あります', reading: 'arimasu', meaning: 'there is (for inanimate objects)' },
                { word: 'まで', reading: 'made', meaning: 'to, until' },
                { word: 'でんしゃで', reading: 'densha de', meaning: 'by train' },
                { word: 'じゅうごふん', reading: 'juugofun', meaning: '15 minutes' },
                { word: 'かかります', reading: 'kakarimasu', meaning: 'to take (time)' },
                { word: 'クラス', reading: 'kurasu', meaning: 'class' },
                { word: 'さんじゅうにん', reading: 'sanjuunin', meaning: '30 people' },
                { word: 'います', reading: 'imasu', meaning: 'there is/are (for animate objects)' },
                { word: 'ともだち', reading: 'tomodachi', meaning: 'friend' },
                { word: 'いっしょに', reading: 'issho ni', meaning: 'together' },
                { word: 'べんきょうします', reading: 'benkyou shimasu', meaning: 'to study' },
                { word: 'にほんご', reading: 'nihongo', meaning: 'Japanese (language)' },
                { word: 'いちばん', reading: 'ichiban', meaning: 'number one, the best' },
                { word: 'すき', reading: 'suki', meaning: 'like, love' },
                { word: 'えいご', reading: 'eigo', meaning: 'English (language)' },
                { word: 'すうがくも', reading: 'suugaku mo', meaning: 'mathematics too' }, // Corrected reading slightly
                { word: 'せんせい', reading: 'sensei', meaning: 'teacher' },
                { word: 'みんな', reading: 'minna', meaning: 'everyone, all' },
                { word: 'やさしい', reading: 'yasashii', meaning: 'kind, gentle' },
                { word: 'きょうしつ', reading: 'kyoushitsu', meaning: 'classroom' },
                { word: 'まど', reading: 'mado', meaning: 'window' },
                { word: 'から', reading: 'kara', meaning: 'from' },
                { word: 'こうえん', reading: 'kouen', meaning: 'park' },
                { word: 'みえます', reading: 'miemasu', meaning: 'can see, is visible' },
                { word: 'やすみじかん', reading: 'yasumijikan', meaning: 'break time' },
                { word: 'はなします', reading: 'hanashimasu', meaning: 'to talk' },
                { word: 'おわったら', reading: 'owattara', meaning: 'after (something) ends' },
                { word: 'ときどき', reading: 'tokidoki', meaning: 'sometimes' },
                { word: 'カフェ', reading: 'kafe', meaning: 'cafe' }
            ],
            questions: [
                { id: 'b4q1', question: '学校(がっこう)は どこに ありますか。', question_en: 'Where is the school?', options: ['大阪(おおさか)', '京都(きょうと)', '東京(とうきょう)', '名古屋(なごや)'], options_en: ['Osaka', 'Kyoto', 'Tokyo', 'Nagoya'], answer: 2, explanation: '本文に「わたしの 学校(がっこう)は 東京(とうきょう)に あります」と\nはっきり書かれています。学校は東京にあることが\nわかります。' },
                { id: 'b4q2', question: '学校(がっこう)まで 何分(なんぷん) かかりますか。', question_en: 'How long does it take to get to school?', options: ['5分(ふん)', '10分(ぷん)', '15分(ふん)', '30分(ぷん)'], options_en: ['5 minutes', '10 minutes', '15 minutes', '30 minutes'], answer: 2, explanation: '本文には「学校(がっこう)まで 電車(でんしゃ)で 十五分(じゅうごふん)\nかかります」と書いてあります。学校までは\n電車で15分かかります。' },
                { id: 'b4q3', question: 'クラスには 何人(なんにん) いますか。', question_en: 'How many students are in the class?', options: ['20人(にん)', '25人(にん)', '30人(にん)', '40人(にん)'], options_en: ['20 people', '25 people', '30 people', '40 people'], answer: 2, explanation: '「クラスは 三十人(さんじゅうにん) います」と書いてあります。\nクラスには30人いることがわかります。' },
                { id: 'b4q4', question: '何(なに)の クラスが 一番(いちばん) 好(す)きですか。', question_en: 'Which class do you like the most?', options: ['英語(えいご)', '数学(すうがく)', '歴史(れきし)', '日本語(にほんご)'], options_en: ['English', 'Mathematics', 'History', 'Japanese'], answer: 3, explanation: '「日本語(にほんご)の クラスが 一番(いちばん) 好(す)きです」と\n本文に書いてあります。日本語のクラスが\n一番好きだということです。' },
                { id: 'b4q5', question: '教室(きょうしつ)の 窓(まど)から 何(なに)が 見(み)えますか。', question_en: 'What can you see from the classroom window?', options: ['海(うみ)', '山(やま)', '公園(こうえん)', '学校(がっこう)'], options_en: ['Sea', 'Mountain', 'Park', 'School'], answer: 2, explanation: '「教室(きょうしつ)の 窓(まど)から 公園(こうえん)が 見(み)えます」と\n書いてあります。教室の窓から公園が\n見えるということがわかります。' },
                { id: 'b4q6', question: '学校(がっこう)の 後(あと)で、時々(ときどき) どこに 行(い)きますか。', question_en: 'Where do you sometimes go after school?', options: ['図書館(としょかん)', 'カフェ', '映画館(えいがかん)', 'スーパー'], options_en: ['Library', 'Cafe', 'Movie theater', 'Supermarket'], answer: 1, explanation: '本文に「学校(がっこう)が 終(お)わったら、時々(ときどき) 友達(ともだち)と\nカフェに 行(い)きます」と書いてあります。\n時々カフェに行くことがわかります。' }
            ]
        },
        {
            id: 'b5',
            title: 'てんき (Weather)',
            level: 'N5',
            levelDescription: 'Beginner',
            text: 'きょうの てんきは はれです。あたたかいです。かぜも すこし ふいています。さんぽに いきたいです。うちの まえの こうえんを さんぽします。こうえんには きれいな はなが たくさん さいています。あかい はなと しろい はなが あります。とりも います。とても きもちがいいです。あしたは あめが ふるかもしれません。', // Kanji removed - NO CHANGE NEEDED
            translation: 'Today\'s weather is clear. It\'s warm. The wind is blowing a little. I want to go for a walk. I will walk in the park in front of my house. There are many beautiful flowers blooming in the park. There are red flowers and white flowers. There are also birds. It feels very pleasant. It might rain tomorrow.',
            vocabulary: [
                { word: 'きょう', reading: 'kyou', meaning: 'today' },
                { word: 'てんき', reading: 'tenki', meaning: 'weather' },
                { word: 'はれ', reading: 'hare', meaning: 'clear weather' },
                { word: 'あたたかい', reading: 'atatakai', meaning: 'warm' },
                { word: 'かぜ', reading: 'kaze', meaning: 'wind' },
                { word: 'すこし', reading: 'sukoshi', meaning: 'a little' },
                { word: 'ふいています', reading: 'fuite imasu', meaning: 'is blowing' },
                { word: 'さんぽ', reading: 'sanpo', meaning: 'walk/stroll' },
                { word: 'いきたい', reading: 'ikitai', meaning: 'want to go' },
                { word: 'うち', reading: 'uchi', meaning: 'home' },
                { word: 'まえ', reading: 'mae', meaning: 'in front of' },
                { word: 'こうえん', reading: 'kouen', meaning: 'park' },
                { word: 'します', reading: 'shimasu', meaning: 'to do' },
                { word: 'きれいな', reading: 'kirei na', meaning: 'beautiful' },
                { word: 'はな', reading: 'hana', meaning: 'flower' },
                { word: 'たくさん', reading: 'takusan', meaning: 'many' },
                { word: 'さいています', reading: 'saite imasu', meaning: 'are blooming' },
                { word: 'あかい', reading: 'akai', meaning: 'red' },
                { word: 'しろい', reading: 'shiroi', meaning: 'white' },
                { word: 'あります', reading: 'arimasu', meaning: 'there is/are' },
                { word: 'とり', reading: 'tori', meaning: 'bird' },
                { word: 'います', reading: 'imasu', meaning: 'there is/are (for animate objects)' },
                { word: 'とても', reading: 'totemo', meaning: 'very' },
                { word: 'きもちがいい', reading: 'kimochi ga ii', meaning: 'feels pleasant/good' },
                { word: 'あした', reading: 'ashita', meaning: 'tomorrow' },
                { word: 'あめ', reading: 'ame', meaning: 'rain' },
                { word: 'ふる', reading: 'furu', meaning: 'to fall (rain, snow)' },
                { word: 'かもしれません', reading: 'kamoshiremasen', meaning: 'might, perhaps' }
            ],
            questions: [
                { id: 'b5q1', question: '今日(きょう)の 天気(てんき)は どうですか。', question_en: 'How is the weather today?', options: ['暖(あたた)かいです', '寒(さむ)いです', '雨(あめ)が 降(ふ)っています', '曇(くも)りです'], options_en: ['It\'s warm', 'It\'s cold', 'It\'s raining', 'It\'s cloudy'], answer: 0, explanation: '本文の最初に「今日(きょう)の 天気(てんき)は 晴(は)れです。暖(あたた)かいです」\nと書いてあります。今日は晴れで暖かいという\nことがわかります。' },
                { id: 'b5q2', question: 'どこを 散歩(さんぽ)しますか。', question_en: 'Where will they walk?', options: ['公園(こうえん)', '学校(がっこう)', 'うち', '道(みち)'], options_en: ['Park', 'School', 'Home', 'Street'], answer: 0, explanation: '本文には「うちの 前(まえ)の 公園(こうえん)を 散歩(さんぽ)します」と\n書いてあります。家の前の公園を散歩する\nということです。' },
                { id: 'b5q3', question: '公園(こうえん)には 何(なに)が ありますか。', question_en: 'What is in the park?', options: ['犬(いぬ)', '猫(ねこ)', '花(はな)と 鳥(とり)', '車(くるま)'], options_en: ['Dog', 'Cat', 'Flowers and birds', 'Car'], answer: 2, explanation: '本文に「公園(こうえん)には きれいな 花(はな)が たくさん 咲(さ)いています」\nと「鳥(とり)も います」と書いてあります。公園には花と鳥が\nいることがわかります。' },
                { id: 'b5q4', question: '何色(なんいろ)の 花(はな)が ありますか。', question_en: 'What colors of flowers are there?', options: ['青(あお)い 花(はな)', '赤(あか)い 花(はな)と 白(しろ)い 花(はな)', 'ピンクの 花(はな)', '紫色(むらさきいろ)の 花(はな)'], options_en: ['Blue flowers', 'Red and white flowers', 'Pink flowers', 'Purple flowers'], answer: 1, explanation: '本文に「赤(あか)い 花(はな)と 白(しろ)い 花(はな)が あります」\nと書いてあります。赤と白の花があることが\nわかります。' },
                { id: 'b5q5', question: '明日(あした)の 天気(てんき)は どうなりそうですか。', question_en: 'How is the weather likely to be tomorrow?', options: ['晴(は)れ', '曇(くも)り', '雨(あめ)', '雪(ゆき)'], options_en: ['Clear', 'Cloudy', 'Rainy', 'Snowy'], answer: 2, explanation: '本文の最後(さいご)に「明日(あした)は 雨(あめ)が 降(ふ)るかもしれません」と\n書いてあります。明日は雨が降るかもしれない\nということです。' }
            ]
        },
        {
            id: 'b6',
            title: 'わたしの かぞく (My Family)',
            level: 'N5',
            levelDescription: 'Beginner',
            text: 'わたしは よにん かぞくです。ちちと ははと あねと わたしです。ちちは ぎんこうで はたらいています。ははは せんせいです。にほんごを おしえています。あねは だいがくせいです。あねは にじゅういっさいです。えいごを べんきょうしています。わたしは こうこうせいです。みんな とても なかよしです。しゅうまつは いっしょに ごはんを たべたり、えいがを みたり、こうえんに いったり します。かぞくと いるときが いちばん しあわせです。', // Kanji removed - NO CHANGE NEEDED
            translation: 'I have a family of four. My father, mother, older sister, and me. My father works at a bank. My mother is a teacher. She teaches Japanese. My older sister is a university student. She is 21 years old. She is studying English. I am a high school student. Everyone gets along very well. On weekends, we eat meals together, watch movies, and go to the park, among other things. I am happiest when I am with my family.',
            vocabulary: [
                { word: 'よにん', reading: 'yonin', meaning: 'four people' },
                { word: 'かぞく', reading: 'kazoku', meaning: 'family' },
                { word: 'ちち', reading: 'chichi', meaning: 'father (my own)' },
                { word: 'はは', reading: 'haha', meaning: 'mother (my own)' },
                { word: 'あね', reading: 'ane', meaning: 'older sister (my own)' },
                { word: 'ぎんこう', reading: 'ginkou', meaning: 'bank' },
                { word: 'はたらいています', reading: 'hataraite imasu', meaning: 'is working' },
                { word: 'せんせい', reading: 'sensei', meaning: 'teacher' },
                { word: 'おしえています', reading: 'oshiete imasu', meaning: 'is teaching' },
                { word: 'にほんご', reading: 'nihongo', meaning: 'Japanese language' },
                { word: 'だいがくせい', reading: 'daigakusei', meaning: 'university student' },
                { word: 'にじゅういっさい', reading: 'nijuuissai', meaning: '21 years old' },
                { word: 'えいご', reading: 'eigo', meaning: 'English language' },
                { word: 'べんきょうしています', reading: 'benkyou shite imasu', meaning: 'is studying' },
                { word: 'こうこうせい', reading: 'koukousei', meaning: 'high school student' },
                { word: 'みんな', reading: 'minna', meaning: 'everyone' },
                { word: 'なかよし', reading: 'nakayoshi', meaning: 'good friends, getting along well' },
                { word: 'しゅうまつ', reading: 'shuumatsu', meaning: 'weekend' },
                { word: 'いっしょに', reading: 'issho ni', meaning: 'together' },
                { word: 'ごはん', reading: 'gohan', meaning: 'meal, cooked rice' },
                { word: 'たべたり', reading: 'tabetari', meaning: 'to eat (and other things)' },
                { word: 'えいが', reading: 'eiga', meaning: 'movie' },
                { word: 'みたり', reading: 'mitari', meaning: 'to watch (and other things)' },
                { word: 'こうえん', reading: 'kouen', meaning: 'park' },
                { word: 'いったり', reading: 'ittari', meaning: 'to go (and other things)' },
                { word: 'します', reading: 'shimasu', meaning: 'to do' },
                { word: 'いるとき', reading: 'iru toki', meaning: 'when (I) am there' },
                { word: 'いちばん', reading: 'ichiban', meaning: 'most, best' },
                { word: 'しあわせ', reading: 'shiawase', meaning: 'happy' }
            ],
            questions: [
                { id: 'b6q1', question: '何人(なんにん) 家族(かぞく)ですか。', question_en: 'How many people are in the family?', options: ['3人(にん)', '4人(にん)', '5人(にん)', '6人(にん)'], options_en: ['3 people', '4 people', '5 people', '6 people'], answer: 1, explanation: '本文の最初に「わたしは 四人(よにん) 家族(かぞく)です」と\n書いてあります。これは「私は四人家族です」\nという意味で、４人家族ということです。' },
                { id: 'b6q2', question: '母(はは)は 何(なに)を していますか。', question_en: 'What does the mother do?', options: ['銀行(ぎんこう)で 働(はたら)いています', '日本語(にほんご)を 教(おし)えています', '大学生(だいがくせい)です', '高校生(こうこうせい)ですか'], options_en: ['Works at a bank', 'Teaches Japanese', 'Is a university student', 'Is a high school student'], answer: 1, explanation: '本文に「母(はは)は 先生(せんせい) です。日本語(にほんご)を 教(おし)えています」\nと書いてあります。お母さんは先生で、日本語を\n教えているということがわかります。' },
                { id: 'b6q3', question: '姉(あね)は 何歳(なんさい)ですか。', question_en: 'How old is the older sister?', options: ['18歳(さい)', '19歳(さい)', '20歳(さい)', '21歳(さい)'], options_en: ['18 years old', '19 years old', '20 years old', '21 years old'], answer: 3, explanation: '本文に「姉(あね)は 二十一歳(にじゅういっさい)です」と\n書いてあります。お姉さんは21歳だということが\nわかります。' },
                { id: 'b6q4', question: '「わたし」は 何(なん)ですか。', question_en: 'What is the speaker?', options: ['先生(せんせい)', '大学生(だいがくせい)', '高校生(こうこうせい)', '小学生(しょうがくせい)'], options_en: ['Teacher', 'University student', 'High school student', 'Elementary school student'], answer: 2, explanation: '本文に「わたしは 高校生(こうこうせい)です」と\n書いてあります。「わたし」は高校生だということが\nわかります。' },
                { id: 'b6q5', question: '週末(しゅうまつ)に 家族(かぞく)と 何(なに)を しますか。', question_en: 'What do you do with your family on weekends?', options: ['勉強(べんきょう)します', '御飯(ごはん)を 食(た)べたり、映画(えいが)を 見(み)たり、公園(こうえん)に 行(い)ったりします', '働(はたら)きます', '寝(ね)ます'], options_en: ['Study', 'Eat meals, watch movies, go to the park', 'Work', 'Sleep'], answer: 1, explanation: '本文に「週末(しゅうまつ)は 一緒(いっしょ)に 御飯(ごはん)を\n食(た)べたり、映画(えいが)を 見(み)たり、公園(こうえん)に 行(い)ったり します」と\n書いてあります。週末は家族と一緒に食事をしたり\n映画を見たり公園に行ったりしています。' }
            ]
        },
        {
            id: 'b7',
            title: 'わたしの しゅみ (My Hobby)',
            level: 'N5',
            levelDescription: 'Beginner',
            text: 'わたしの しゅみは ほんを よむことです。まいにち すくなくとも にじっぷん ほんを よみます。とくに、にほんの しょうせつが すきです。むずかしい ことばが あるときは、じしょで しらべます。きっさてんで コーヒーを のみながら、ゆっくり ほんを よむのが すきなじかんです。あたらしい ほんを みつけるために、よく ほんやへ いきます。せんしゅう あたらしい ほんを さんさつ かいました。ときどき ともだちと よんだ ほんについて はなします。ともだちも どくしょが すきです。ほんは たくさん ありますから、ぜんぶ よむのは たいへんですが、たのしいです。', // Kanji removed - NO CHANGE NEEDED
            translation: 'My hobby is reading books. I read books for at least 20 minutes every day. Especially, I like Japanese novels. When there are difficult words, I look them up in a dictionary. The time I slowly read a book while drinking coffee at a coffee shop is my favorite time. I often go to bookstores to find new books. Last week, I bought three new books. Sometimes I talk with my friends about the books we have read. My friends also like reading. Since there are many books, reading them all is difficult, but it\'s fun.',
            vocabulary: [
                { word: 'しゅみ', reading: 'shumi', meaning: 'hobby' },
                { word: 'ほん', reading: 'hon', meaning: 'book' },
                { word: 'よむこと', reading: 'yomu koto', meaning: 'reading (the act of)' },
                { word: 'まいにち', reading: 'mainichi', meaning: 'every day' },
                { word: 'すくなくとも', reading: 'sukunaku tomo', meaning: 'at least' },
                { word: 'にじっぷん', reading: 'nijippun', meaning: '20 minutes' },
                { word: 'よみます', reading: 'yomimasu', meaning: 'to read' },
                { word: 'とくに', reading: 'tokuni', meaning: 'especially' },
                { word: 'にほんの', reading: 'nihon no', meaning: 'Japanese (adj)' },
                { word: 'しょうせつ', reading: 'shousetsu', meaning: 'novel' },
                { word: 'すきです', reading: 'suki desu', meaning: 'like' },
                { word: 'むずかしい', reading: 'muzukashii', meaning: 'difficult' },
                { word: 'ことば', reading: 'kotoba', meaning: 'word, language' },
                { word: 'あるとき', reading: 'aru toki', meaning: 'when there is/are' },
                { word: 'じしょ', reading: 'jisho', meaning: 'dictionary' },
                { word: 'しらべます', reading: 'shirabemasu', meaning: 'to look up, to check' },
                { word: 'きっさてん', reading: 'kissaten', meaning: 'coffee shop' },
                { word: 'コーヒー', reading: 'koohii', meaning: 'coffee' },
                { word: 'のみながら', reading: 'nominagara', meaning: 'while drinking' },
                { word: 'ゆっくり', reading: 'yukkuri', meaning: 'slowly' },
                { word: 'すきな', reading: 'suki na', meaning: 'favorite, liked' },
                { word: 'じかん', reading: 'jikan', meaning: 'time' },
                { word: 'あたらしい', reading: 'atarashii', meaning: 'new' },
                { word: 'みつける', reading: 'mitsukeru', meaning: 'to find' },
                { word: 'ために', reading: 'tame ni', meaning: 'in order to, for the purpose of' },
                { word: 'よく', reading: 'yoku', meaning: 'often' },
                { word: 'ほんや', reading: 'honya', meaning: 'bookstore' },
                { word: 'せんしゅう', reading: 'senshuu', meaning: 'last week' },
                { word: 'さんさつ', reading: 'sansatsu', meaning: 'three books (counter for books)' },
                { word: 'かいました', reading: 'kaimashita', meaning: 'bought' },
                { word: 'ときどき', reading: 'tokidoki', meaning: 'sometimes' },
                { word: 'ともだち', reading: 'tomodachi', meaning: 'friend' },
                { word: 'よんだ', reading: 'yonda', meaning: 'read (past tense)' },
                { word: '～について', reading: '~ni tsuite', meaning: 'about~' },
                { word: 'はなします', reading: 'hanashimasu', meaning: 'to talk' },
                { word: 'どくしょ', reading: 'dokusho', meaning: 'reading (books)' },
                { word: 'たくさん', reading: 'takusan', meaning: 'many' },
                { word: 'ありますから', reading: 'arimasu kara', meaning: 'because there are' },
                { word: 'ぜんぶ', reading: 'zenbu', meaning: 'all' },
                { word: 'たいへん', reading: 'taihen', meaning: 'difficult, hard' },
                { word: 'たのしい', reading: 'tanoshii', meaning: 'fun, enjoyable' }
            ],
            questions: [
                { id: 'b7q1', question: 'わたしの 趣味(しゅみ)は 何(なに)ですか。', question_en: 'What is my hobby?', options: ['料理(りょうり)', '映画(えいが)', '本(ほん)を 読(よ)むこと', '音楽(おんがく)'], options_en: ['Cooking', 'Movies', 'Reading books', 'Music'], answer: 2, explanation: '本文の最初に「わたしの 趣味(しゅみ)は 本(ほん)を 読(よ)むことです」と\nはっきり書かれていますね。趣味は本を読むことだと\nわかります。' },
                { id: 'b7q2', question: '毎日(まいにち) 何分(なんぷん) 本(ほん)を 読(よ)みますか。', question_en: 'How many minutes do you read books every day?', options: ['10分(ぷん)', '15分(ぷん)', '20分(ぷん)', '30分(ぷん)'], options_en: ['10 minutes', '15 minutes', '20 minutes', '30 minutes'], answer: 2, explanation: '本文に「毎日(まいにち) 少(すく)なくとも 二十分(にじっぷん) 本(ほん)を\n読(よ)みます」と書いてあります。少なくとも20分、\n本を読んでいるということがわかります。' },
                { id: 'b7q3', question: 'どんな 本(ほん)が 好(す)きですか。', question_en: 'What kind of books do you like?', options: ['英語(えいご)の 本(ほん)', '子供(こども)の 本(ほん)', '日本(にほん)の 小説(しょうせつ)', '料理(りょうり)の 本(ほん)'], options_en: ['English books', 'Children\'s books', 'Japanese novels', 'Cooking books'], answer: 2, explanation: '本文に「特(とく)に、日本(にほん)の 小説(しょうせつ)が 好(す)きです」と\n書いてあるので、特に日本の小説が好きだと\nわかります。' },
                { id: 'b7q4', question: '難(むずか)しい 言葉(ことば)が あるとき、どうしますか。', question_en: 'What do you do when there are difficult words?', options: ['先生(せんせい)に 聞(き)きます', '友達(ともだち)に 聞(き)きます', '辞書(じしょ)で 調(しら)べます', '本(ほん)を 読(よ)むのを やめます'], options_en: ['Ask the teacher', 'Ask friends', 'Look them up in a dictionary', 'Stop reading the book'], answer: 2, explanation: '本文に「難(むずか)しい 言葉(ことば)が あるときは、\n辞書(じしょ)で 調(しら)べます」と書いてあります。難しい言葉がある時は\n辞書で調べるとわかります。' },
                { id: 'b7q5', question: '先週(せんしゅう) 何(なに)を しましたか。', question_en: 'What did you do last week?', options: ['本屋(ほんや)へ 行(い)きました', '新(あたら)しい 本(ほん)を 三冊(さんさつ) 買(か)いました', '友達(ともだち)と 話(はな)しました', '喫茶店(きっさてん)で コーヒーを 飲(の)みました'], options_en: ['Went to a bookstore', 'Bought three new books', 'Talked with friends', 'Drank coffee at a coffee shop'], answer: 1, explanation: '本文に「先週(せんしゅう) 新(あたら)しい 本(ほん)を 三冊(さんさつ) 買(か)いました」\nと書いてあります。先週、新しい本を3冊買ったということが\nわかります。' }
            ]
        },
        {
            id: 'b8',
            title: 'えきまで (To the Station)',
            level: 'N5',
            levelDescription: 'Beginner',
            text: 'わたしは いま、うちに います。これから えきへ いきます。えきまで バスで じゅっぷんです。バスていは いえの すぐ まえに あります。バスは ごふんに いっぽん きます。バスに のって、えきで おります。えきの ちかくに ゆうびんきょくが ありますから、てがみを だします。てがみは かぞくに だします。えきの なかに コンビニも あります。のどが かわきましたから、おちゃを かいます。その あと、えきで ともだちと あう よていです。ともだちと いっしょに えいがを みに いきます。えいがは ごご いちじからです。えいがの あとで、レストランで ひるごはんを たべる よていです。', // Kanji removed - NO CHANGE NEEDED
            translation: 'I am at home now. I will go to the station from now. It is 10 minutes by bus to the station. The bus stop is right in front of my house. A bus comes every 5 minutes. I will get on the bus and get off at the station. There is a post office near the station, so I will send a letter. I will send the letter to my family. There is also a convenience store inside the station. I am thirsty, so I will buy tea. After that, I plan to meet a friend at the station. I will go to see a movie with my friend. The movie starts at 1 PM. After the movie, we plan to eat lunch at a restaurant.',
            vocabulary: [
                { word: 'いま', reading: 'ima', meaning: 'now' },
                { word: 'うち', reading: 'uchi', meaning: 'home, house' },
                { word: 'います', reading: 'imasu', meaning: 'to be (for living things)' },
                { word: 'これから', reading: 'korekara', meaning: 'from now' },
                { word: 'えき', reading: 'eki', meaning: 'station' },
                { word: 'いきます', reading: 'ikimasu', meaning: 'to go' },
                { word: '～まで', reading: 'made', meaning: 'to, until' },
                { word: 'バスで', reading: 'basu de', meaning: 'by bus' },
                { word: 'じゅっぷん', reading: 'juppun', meaning: '10 minutes' },
                { word: 'バスてい', reading: 'basutei', meaning: 'bus stop' },
                { word: 'いえの まえ', reading: 'ie no mae', meaning: 'in front of the house' },
                { word: 'すぐ', reading: 'sugu', meaning: 'immediately, right away' },
                { word: 'ごふんに いっぽん', reading: 'gofun ni ippon', meaning: 'one (bus/train) every 5 minutes' },
                { word: 'きます', reading: 'kimasu', meaning: 'to come' },
                { word: '～に のって', reading: '~ni notte', meaning: 'get on ~' },
                { word: '～で おります', reading: '~de orimasu', meaning: 'get off at ~' },
                { word: 'ちかくに', reading: 'chikaku ni', meaning: 'near, nearby' },
                { word: 'ゆうびんきょく', reading: 'yuubinkyoku', meaning: 'post office' },
                { word: 'ありますから', reading: 'arimasu kara', meaning: 'because there is' },
                { word: 'てがみ', reading: 'tegami', meaning: 'letter' },
                { word: 'だします', reading: 'dashimasu', meaning: 'to send out, to take out' },
                { word: 'かぞく', reading: 'kazoku', meaning: 'family' },
                { word: 'なか', reading: 'naka', meaning: 'inside' },
                { word: 'コンビニ', reading: 'konbini', meaning: 'convenience store' },
                { word: 'のどが かわきました', reading: 'nodo ga kawakimashita', meaning: 'I am thirsty (throat is dry)' },
                { word: 'おちゃ', reading: 'ocha', meaning: 'tea' },
                { word: 'かいます', reading: 'kaimasu', meaning: 'to buy' },
                { word: 'そのあと', reading: 'sono ato', meaning: 'after that' },
                { word: 'ともだちと', reading: 'tomodachi to', meaning: 'with a friend' },
                { word: 'あう', reading: 'au', meaning: 'to meet' },
                { word: 'よていです', reading: 'yotei desu', meaning: 'is planned, is the plan' },
                { word: 'いっしょに', reading: 'issho ni', meaning: 'together' },
                { word: 'えいが', reading: 'eiga', meaning: 'movie' },
                { word: 'みに いきます', reading: 'mi ni ikimasu', meaning: 'go to see/watch' },
                { word: 'ごご いちじ', reading: 'gogo ichiji', meaning: '1 PM' },
                { word: 'から', reading: 'kara', meaning: 'from' },
                { word: 'あとで', reading: 'ato de', meaning: 'after' },
                { word: 'レストラン', reading: 'resutoran', meaning: 'restaurant' },
                { word: 'ひるごはん', reading: 'hirugohan', meaning: 'lunch' }
            ],
            questions: [
                { id: 'b8q1', question: '今(いま)、どこに いますか。', question_en: 'Where are you now?', options: ['学校(がっこう)', '駅(えき)', '郵便局(ゆうびんきょく)', 'うち'], options_en: ['School', 'Station', 'Post office', 'Home'], answer: 3, explanation: '本文の最初(さいしょ)に「わたしは 今(いま)、うちに います」と\n書いてあります。だから、今家にいることが\nわかります。' },
                { id: 'b8q2', question: '何(なに)で 駅(えき)へ 行(い)きますか。', question_en: 'How do you go to the station?', options: ['歩(ある)いて', '電車(でんしゃ)で', 'バスで', '自転車(じてんしゃ)で'], options_en: ['Walking', 'By train', 'By bus', 'By bicycle'], answer: 2, explanation: '本文には「駅(えき)まで バスで 十分(じゅっぷん)です」と\nあります。交通(こうつう)手段(しゅだん)はバスだと書いて\nあります。' },
                { id: 'b8q3', question: 'バスは 何分(なんぷん)に 一本(いっぽん) 来(き)ますか。', question_en: 'How often does the bus come?', options: ['3分(ぷん)に一本(いっぽん)', '5分(ふん)に一本(いっぽん)', '10分(ぷん)に一本(いっぽん)', '15分(ぷん)に一本(いっぽん)'], options_en: ['Every 3 minutes', 'Every 5 minutes', 'Every 10 minutes', 'Every 15 minutes'], answer: 1, explanation: '本文に「バスは 五分(ごふん)に 一本(いっぽん) 来(き)ます」と\n書いてあります。バスは5分に1本来ることが\nわかります。' },
                { id: 'b8q4', question: '手紙(てがみ)は だれに 出(だ)しますか。', question_en: 'Who will you send the letter to?', options: ['友達(ともだち)', '家族(かぞく)', '先生(せんせい)', '会社(かいしゃ)'], options_en: ['Friend', 'Family', 'Teacher', 'Company'], answer: 1, explanation: '本文に「手紙(てがみ)は 家族(かぞく)に 出(だ)します」と\n書いてあります。手紙は家族に送る\nことがわかります。' },
                { id: 'b8q5', question: 'コンビニで 何(なに)を 買(か)いますか。', question_en: 'What will you buy at the convenience store?', options: ['パン', 'お茶(おちゃ)', '新聞(しんぶん)', '弁当(べんとう)'], options_en: ['Bread', 'Tea', 'Newspaper', 'Lunch box'], answer: 1, explanation: '本文に「のどが かわきましたから、お茶(おちゃ)を 買(か)います」\nと書いてあります。コンビニでお茶を買うということが\nわかります。' },
                { id: 'b8q6', question: '友達(ともだち)と 何(なに)を する 予定(よてい)ですか。', question_en: 'What do you plan to do with your friend?', options: ['買(か)い物(もの)に 行(い)く', '映画(えいが)を 見(み)に 行(い)く', 'レストランに 行(い)く', '公園(こうえん)に 行(い)く'], options_en: ['Go shopping', 'Go to see a movie', 'Go to a restaurant', 'Go to a park'], answer: 1, explanation: '本文に「友達(ともだち)と 一緒(いっしょ)に 映画(えいが)を 見(み)に 行(い)きます」\nと書いてあります。友達と映画を見に行く予定だということが\nわかります。' }
            ]
        },
    ],
    intermediate: [
        {
            id: 'i1',
            title: 'にほんのしょくぶんか (Japanese Food Culture)',
            level: 'N3',
            levelDescription: 'Intermediate',
            text: 'にほんのしょくぶんかはたようで、ちいきごとに とくしょくがあります。すし、てんぷら、らーめんなどはにほんを だいひょうする りょうりです。にほんのしょくじはいっぱんてきにごはん、みそしる、おかずのくみあわせで こうせいされています。きせつのしょくざいをたいせつにし、しんせんさをじゅうしします。また、しょくじはたんにえいようをとるためだけでなく、かぞくやゆうじんとともに たのしむ たいせつなじかんとされています。さいきんでは、わしょくがゆねすこのむけいぶんかいさんに とうろくされるなど、そのぶんかてきかちがさいにんしきされています。', // Processed: 日本の(にほんの) -> にほんの, 多様(たよう) -> たよう, 地域(ちいき) -> ちいき, etc.
            translation: 'Japanese food culture is diverse and varies by region. Sushi, tempura, and ramen are representative dishes of Japan. A typical Japanese meal consists of rice, miso soup, and several side dishes. Seasonal ingredients are valued, and freshness is emphasized. Moreover, meals are not only for nutrition but also considered an important time to enjoy with family and friends. Recently, Japanese cuisine has been registered as a UNESCO Intangible Cultural Heritage, re-recognizing its cultural value.',
            vocabulary: [ { word: '食文化', reading: 'しょくぶんか', meaning: 'food culture' }, { word: '多様', reading: 'たよう', meaning: 'diverse' }, { word: '地域', reading: 'ちいき', meaning: 'region' }, { word: '特色', reading: 'とくしょく', meaning: 'characteristic' }, { word: '寿司', reading: 'すし', meaning: 'sushi' }, { word: '天ぷら', reading: 'てんぷら', meaning: 'tempura' }, { word: 'ラーメン', reading: 'らーめん', meaning: 'ramen' }, { word: '代表する', reading: 'だいひょうする', meaning: 'to represent' }, { word: '料理', reading: 'りょうり', meaning: 'cuisine, dish' }, { word: '一般的', reading: 'いっぱんてき', meaning: 'generally' }, { word: '構成する', reading: 'こうせいする', meaning: 'to consist of' }, { word: '味噌汁', reading: 'みそしる', meaning: 'miso soup' }, { word: 'おかず', reading: 'おかず', meaning: 'side dishes' }, { word: '組み合わせ', reading: 'くみあわせ', meaning: 'combination' }, { word: '季節', reading: 'きせつ', meaning: 'season' }, { word: '食材', reading: 'しょくざい', meaning: 'food ingredients' }, { word: '大切にする', reading: 'たいせつにする', meaning: 'to value, cherish' }, { word: '新鮮', reading: 'しんせん', meaning: 'fresh' }, { word: '重視する', reading: 'じゅうしする', meaning: 'to emphasize' }, { word: '単に', reading: 'たんに', meaning: 'simply, merely' }, { word: '栄養', reading: 'えいよう', meaning: 'nutrition' }, { word: '摂る', reading: 'とる', meaning: 'to take (nutrition)' }, { word: '家族', reading: 'かぞく', meaning: 'family' }, { word: '友人', reading: 'ゆうじん', meaning: 'friend' }, { word: '楽しむ', reading: 'たのしむ', meaning: 'to enjoy' }, { word: '大切な', reading: 'たいせつな', meaning: 'important' }, { word: '時間', reading: 'じかん', meaning: 'time' }, { word: '最近', reading: 'さいきん', meaning: 'recently' }, { word: '和食', reading: 'わしょく', meaning: 'Japanese food' }, { word: 'ユネスコ', reading: 'ゆねすこ', meaning: 'UNESCO' }, { word: '無形文化遺産', reading: 'むけいぶんかいさん', meaning: 'Intangible Cultural Heritage' }, { word: '登録される', reading: 'とうろくされる', meaning: 'to be registered' }, { word: '文化的', reading: 'ぶんかてき', meaning: 'cultural' }, { word: '再認識', reading: 'さいにんしき', meaning: 're-recognition' }, { word: '価値', reading: 'かち', meaning: 'value' } ],
            questions: [
                { id: 'i1q1', question: '日本(にほん)の食(しょく)文化(ぶんか)はどのように多様(たよう)ですか。', question_en: 'How is Japanese food culture diverse?', options: ['地域(ちいき)ごとに特色(とくしょく)がある', '全(すべ)ての地域(ちいき)で同(おな)じ料理(りょうり)が食(た)べられる', '外国(がいこく)の料理(りょうり)が主流(しゅりゅう)である', '食事(しょくじ)は栄養(えいよう)摂取(せっしゅ)のみに限(かぎ)られる'], options_en: ['It varies by region', 'The same dishes are eaten in all regions', 'Foreign cuisine is mainstream', 'Meals are limited to nutrition intake'], answer: 0, explanation: '本文に「地域ごとに特色があります」とあるように、\n日本の食文化は地域によって異なる料理や食材を\n持っています。' },
                { id: 'i1q2', question: '和食(わしょく)がユネスコの無形(むけい)文化(ぶんか)遺産(いさん)に登録(とうろく)された理由(りゆう)は何(なん)ですか。', question_en: 'Why was Japanese cuisine registered as a UNESCO Intangible Cultural Heritage?', options: ['その歴史的(れきしてき)背景(はいけい)から', '日本(にほん)国内(こくない)でのみ楽(たの)しまれているから', '文化的(ぶんかてき)価値(かち)が再認識(さいにんしき)されたから', '特定(とくてい)の地域(ちいき)だけの料理(りょうり)だから'], options_en: ['Due to its historical background', 'Because it is enjoyed only in Japan', 'Because its cultural value has been re-recognized', 'Because it is a dish from a specific region'], answer: 2, explanation: '最近、和食がユネスコの無形文化遺産に\n登録されるなど、その文化的価値が\n再認識されています。' }
            ]
        },
        {
            id: 'i2',
            title: 'にほんのでんとうぎょうじ (Traditional Events in Japan)',
            level: 'N3',
            levelDescription: 'Intermediate',
            text: 'にほんにはおおくのでんとうぎょうじがあります。おしょうがつ、ひなまつり、たんごのせっく、たなばた、けいろうのひ、くりすますなど、きせつごとにさまざまなぎょうじがおこなわれます。おしょうがつはかぞくですごし、はつもうでをして いちねんのぶじをいのります。ひなまつりはおんなのこのけんこうとせいちょうをねがうひで、ひなにんぎょうをかざります。たんごのせっくはおとこのこのけんこうとせいちょうをねがうひで、こいのぼりをかざります。たなばたはたんざくにねがいごとをかいて ささに かざるぎょうじです。けいろうのひはおとしよりをうやまい、ちょうじゅをいわうひです。くりすますはきんねんにほんでもひろまり、いるみねーしょんやくりすますつりーをたのしみます。このように、にほんのせいかつやぶんかは、しきのへんかとふかくむすびついています。', // Processed: 日本(にほん) -> にほん, 多く(おおく) -> おおく, 伝統行事(でんとうぎょうじ) -> でんとうぎょうじ etc.
            translation: 'Japan has many traditional events. New Year, Hinamatsuri (Doll Festival), Tango no Sekku (Boys\' Day), Tanabata (Star Festival), Respect for the Aged Day, Christmas, and various other events are held throughout the year. New Year is spent with family, and people pray for a safe year at the first shrine visit (Hatsumode). Hinamatsuri is a day to wish for the health and growth of girls, and hina dolls are displayed. Tango no Sekku is a day to wish for the health and growth of boys, and carp streamers (koinobori) are flown. Tanabata is a festival where people write their wishes on tanzaku (small strips of paper) and hang them on bamboo. Respect for the Aged Day is a day to honor the elderly and celebrate longevity. Christmas has spread to Japan in recent years, and people enjoy illuminations and Christmas trees. Thus, Japan\'s traditional events are often seasonal and emphasize celebrating with family and the community.',
            vocabulary: [ { word: '伝統行事', reading: 'でんとうぎょうじ', meaning: 'traditional events' }, { word: 'お正月', reading: 'おしょうがつ', meaning: 'New Year\'s' }, { word: 'ひな祭り', reading: 'ひなまつり', meaning: 'Hinamatsuri (Doll Festival)' }, { word: '端午の節句', reading: 'たんごのせっく', meaning: 'Tango no Sekku (Boys\' Day)' }, { word: '鯉のぼり', reading: 'こいのぼり', meaning: 'carp streamer' }, { word: '七夕', reading: 'たなばた', meaning: 'Tanabata (Star Festival)' }, { word: '短冊', reading: 'たんざく', meaning: 'tanzaku (small strips of paper for writing wishes)' }, { word: '敬老の日', reading: 'けいろうのひ', meaning: 'Respect for the Aged Day' }, { word: 'クリスマス', reading: 'くりすます', meaning: 'Christmas' }, { word: '近年', reading: 'きんねん', meaning: 'in recent years' }, { word: '広まる', reading: 'ひろまる', meaning: 'to spread' }, { word: 'イルミネーション', reading: 'いるみねーしょん', meaning: 'illumination' }, { word: '地域社会', reading: 'ちいきしゃかい', meaning: 'community' }, { word: '祝う', reading: 'いわう', meaning: 'to celebrate' }, { word: '大切にする', reading: 'たいせつにする', meaning: 'to value, cherish' }, { word: 'このように', reading: 'このように', meaning: 'in this way' }, { word: '多く', reading: 'おおく', meaning: 'many' }, { word: '季節', reading: 'きせつ', meaning: 'season' }, { word: '様々', reading: 'さまざま', meaning: 'various' }, { word: '共に', reading: 'ともに', meaning: 'together with' }, { word: '過ごす', reading: 'すごす', meaning: 'to spend (time)' }, { word: '無事', reading: 'ぶじ', meaning: 'safety, peace' }, { word: '願う', reading: 'ねがう', meaning: 'to wish, hope' }, { word: '健康', reading: 'けんこう', meaning: 'health' }, { word: '成長', reading: 'せいちょう', meaning: 'growth' }, { word: '飾る', reading: 'かざる', meaning: 'to decorate' }, { word: '日', reading: 'ひ', meaning: 'day' }, { word: '大切な', reading: 'たいせつな', meaning: 'important' }, { word: '家族', reading: 'かぞく', meaning: 'family' }, { word: '友人',reading: 'ゆうじん', meaning: 'friend' }, { word: '地域', reading: 'ちいき', meaning: 'region' }, { word: '社会', reading: 'しゃかい', meaning: 'society' } ],
            questions: [
                { id: 'i2q1', question: 'ひな祭(まつ)りは 何(なん)のための 日(ひ)ですか。', question_en: 'What is Hinamatsuri for?', options: ['男(おとこ)の子(こ)の健康(けんこう)を願(ねが)う', '女(おんな)の子(こ)の健康(けんこう)を願(ねが)う', '家族(かぞく)の健康(けんこう)を願(ねが)う', '地域(ちいき)の健康(けんこう)を願(ねが)う'], options_en: ['To wish for the health of boys', 'To wish for the health of girls', 'To wish for the health of the family', 'To wish for the health of the community'], answer: 1, explanation: 'ひな祭りは女の子の健康と成長を願う日で、\nひな人形を飾ります。本文にそのまま\n書かれていますね。' },
                { id: 'i2q2', question: '端午(たんご)の節句(せっく)に飾(かざ)るものは何(なん)ですか。', question_en: 'What do you display on Tango no Sekku?', options: ['ひな人形(にんぎょう)', '鯉(こい)のぼり', 'クリスマスツリー', 'お正月(しょうがつ)飾(かざ)り'], options_en: ['Hina dolls', 'Carp streamers', 'Christmas tree', 'New Year decorations'], answer: 1, explanation: '端午の節句は男の子の健康と成長を願う日で、\n鯉のぼりを飾ります。これも本文に\n具体的に記載があります。' },
                { id: 'i2q3', question: '「敬老(けいろう)の日(ひ)」は 何(なに)を祝(いわ)う日(ひ)ですか。', question_en: 'What do we celebrate on Respect for the Aged Day?', options: ['お年寄(としよ)りを敬(うやま)う', '子供(こども)の成長(せいちょう)を祝(いわ)う', '家族(かぞく)の絆(きずな)を深(ふか)める', '地域(ちいき)の発展(はってん)を祝(いわ)う'], options_en: ['To honor the elderly', 'To celebrate the growth of children', 'To deepen family bonds', 'To celebrate the development of the community'], answer: 0, explanation: '敬老の日はお年寄りを敬い、長寿を祝う日です。\n本文に目的が\nはっきり書かれています。' }
            ]
        }
    ],
    advanced: [
        {
            id: 'a1',
            title: 'にほんのしき (Seasons in Japan)',
            level: 'N2',
            levelDescription: 'Advanced',
            text: 'にほんはなんぼくにながいしまぐにであるため、ちいきごとにきこうはことなりますが、おおくのちいきではしきがはっきりしています。はる（3がつ～5がつ）はさくらのきせつとしてしられ、ひとびとは「はなみ」をたのしみます。きおんがあがり、すごしやすいようきとなります。なつ（6がつ～8がつ）はつゆとよばれるうきからはじまり、そのご、こうおんたしつなひびがつづきます。なつまつりやはなびたいかいがおおくかいさいされ、ひとびとはゆかたをきてでかけます。あき（9がつ～11がつ）は「しょくよくのあき」「すぽーつのあき」「どくしょのあき」などといわれ、きこうがあんていしかいてきなため、さまざまなかつどうにてきしています。やまやまがこうようでいろづくうつくしいきせつでもあります。ふゆ（12がつ～2がつ）はさむさがきびしくなり、とくににほんかいがわやきたにほんではゆきがおおくふります。すきーやすのーぼーどなどのうぃんたーすぽーつがさかんになります。また、ねんまつねんしにはとくべつなぎょうじやしゅうかんがあります。このように、にほんのせいかつやぶんかは、しきのへんかとふかくむすびついています。', // Processed: 日本(にほん) -> にほん, 南北(なんぼく) -> なんぼく, 島国(しまぐに) -> しまぐに etc.
            translation: 'Japan is a long archipelago stretching north to south, so the climate varies by region, but many areas have distinct four seasons. Spring (March-May) is known as the cherry blossom season, and people enjoy "Hanami" (cherry blossom viewing). Temperatures rise, making for pleasant weather. Summer (June-August) begins with a rainy season called "Tsuyu," followed by hot and humid days. Many summer festivals and fireworks displays are held, and people go out wearing yukata. Autumn (September-November) is often called "Autumn of Appetite," "Autumn of Sports," or "Autumn of Reading," as the stable and comfortable climate is suitable for various activities. It is also a beautiful season when mountains turn red and yellow with autumn leaves. Winter (December-February) brings severe cold, with heavy snowfall particularly on the Sea of Japan side and in northern Japan. Winter sports like skiing and snowboarding become popular. There are also special events and customs around the year-end and New Year holidays. In this way, Japanese life and culture are deeply connected to the changing seasons.',
            vocabulary: [ { word: '南北', reading: 'なんぼく', meaning: 'north and south' }, { word: '島国', reading: 'しまぐに', meaning: 'island country' }, { word: '気候', reading: 'きこう', meaning: 'climate' }, { word: '四季', reading: 'しき', meaning: 'four seasons' }, { word: 'はっきりしている', reading: 'はっきりしている', meaning: 'is distinct, clear' }, { word: '花見', reading: 'はなみ', meaning: 'cherry blossom viewing' }, { word: '陽気', reading: 'ようき', meaning: 'weather (cheerful, pleasant)' }, { word: '梅雨', reading: 'つゆ', meaning: 'rainy season' }, { word: '雨季', reading: 'うき', meaning: 'rainy season' }, { word: '高温多湿', reading: 'こうおんたしつ', meaning: 'high temperature and humidity' }, { word: '夏祭り', reading: 'なつまつり', meaning: 'summer festival' }, { word: '花火大会', reading: 'はなびたいかい', meaning: 'fireworks display' }, { word: '開催される', reading: 'かいさいされる', meaning: 'to be held' }, { word: '浴衣', reading: 'ゆかた', meaning: 'yukata (informal cotton kimono)' }, { word: '食欲', reading: 'しょくよく', meaning: 'appetite' }, { word: '安定する', reading: 'あんていする', meaning: 'to be stable' }, { word: '快適', reading: 'かいてき', meaning: 'comfortable' }, { word: '適している', reading: 'てきしている', meaning: 'to be suitable' }, { word: '紅葉', reading: 'こうよう', meaning: 'autumn leaves' }, { word: '色づく', reading: 'いろづく', meaning: 'to change color, take on color' }, { word: '厳しい', reading: 'きびしい', meaning: 'severe, strict' }, { word: '日本海側', reading: 'にほんかいがわ', meaning: 'Sea of Japan side' }, { word: '盛んになる', reading: 'さかんになる', meaning: 'to become popular, flourish' }, { word: '年末年始', reading: 'ねんまつねんし', meaning: 'year-end and New Year holidays' }, { word: '行事', reading: 'ぎょうじ', meaning: 'event, function' }, { word: '習慣', reading: 'しゅうかん', meaning: 'custom, habit' }, { word: '結びつく', reading: 'むすびつく', meaning: 'to be connected, linked' }, ],
            questions: [
                { id: 'a1q1', question: '夏(なつ)の特徴(とくちょう)として、本文(ほんぶん)で述(の)べられていないものはどれですか。', question_en: 'Which of the following is NOT mentioned as a characteristic of summer in the text?', options: ['梅雨(つゆ)がある', '高温多湿(こうおんたしつ)である', '紅葉(こうよう)が美(うつく)しい', '夏祭(なつまつ)りや花火(はなび)大会(たいかい)がある'], options_en: ['There is a rainy season', 'It is hot and humid', 'Autumn leaves are beautiful', 'There are summer festivals and fireworks'], answer: 2, explanation: '紅葉 (Autumn leaves) は秋の特徴であり、\n夏のものではありません。本文では梅雨や\n高温多湿などが夏の特徴として挙げられています。' },
                { id: 'a1q2', question: '「〇〇の秋(あき)」として本文(ほんぶん)で挙(あ)げられていないものはどれですか。', question_en: 'Which "Autumn of XX" is NOT listed in the text?', options: ['食欲(しょくよく)', '芸術(げいじゅつ)', 'スポーツ', '読書(どくしょ)'], options_en: ['Appetite', 'Art', 'Sports', 'Reading'], answer: 1, explanation: '本文では食欲、スポーツ、読書の秋が\n挙げられています。芸術の秋は一般的ですが、\nこの文章には含まれていません。' },
                { id: 'a1q3', question: '冬(ふゆ)に雪(ゆき)が多(おお)く降(ふ)るのは、主(おも)に日本(にほん)のどの地域(ちいき)ですか。', question_en: 'In which region of Japan does it mainly snow a lot in winter?', options: ['太平洋(たいへいよう)側(がわ)', '南日本(みなみにほん)', '日本海(にほんかい)側(がわ)や北日本(きたにほん)', '全(すべ)ての地域(ちいき)'], options_en: ['Pacific Ocean side', 'Southern Japan', 'Sea of Japan side and Northern Japan', 'All regions'], answer: 2, explanation: '本文には「特(とく)に日本海(にほんかい)側(がわ)や北日本(きたにほん)では雪(ゆき)が\n多(おお)く降(ふ)ります」とはっきり書かれています。\nこの地域が主(おも)な降雪(こうせつ)地帯(ちたい)です。' }
            ]
        },
        {
            id: 'a2',
            title: 'らくごについて (About Rakugo)',
            level: 'N3-N2',
            levelDescription: 'Advanced',
            text: 'らくごは、にほんのでんとうてきな わげいの一つです。ひとりのえんじゃ（らくごか）がざぶとんのうえにすわり、みぶりてぶりをまじえながら、せんすやてぬぐいをこどうぐとしてつかって、こっけいなはなしやにんじょうばなしなどをかたります。ものがたりにはさまざまなとうじょうじんぶつがでてきますが、こわいろやはなしかた、ひょうじょうをかえることで、すべてえんじゃひとりでえんじわけます。はなしのさいごには「おち」（けつまつのおもしろいぶぶん）がつくのがとくちょうです。らくごのえんもくはこてんらくごと しんさくらくごに たいべつされ、かずおおく そんざいします。えどじだいにしょみんのごらくとして はってんし、げんざいでもよせやほーる、てれびなどでたのしむことができます。らくごかになるためには、ししょうにでしいりし、きびしいしゅぎょうをつむひつようがあります。ことばのおもしろさやにんげんのふへんてきなかんじょうをえがくららくごは、じだいをこえておおくのひとびとにあいされています。', // Processed: 落語(らくご) -> らくご, 日本(にほん) -> にほん, 伝統的(でんとうてき) -> でんとうてき etc.
            translation: 'Rakugo is one of Japan\'s traditional forms of storytelling performance art. A single performer (rakugoka) sits on a cushion (zabuton) and tells comical stories, human-interest stories, etc., using gestures, and employing a fan (sensu) and a hand towel (tenugui) as props. Various characters appear in the story, but the performer portrays them all alone by changing their voice tone, way of speaking, and facial expressions. A characteristic feature is the "ochi" (the punchline or witty ending) at the end of the story. Rakugo pieces are broadly divided into classical rakugo and new rakugo, and numerous stories exist. It developed during the Edo period as entertainment for the common people and can still be enjoyed today at variety halls (yose), concert halls, on television, etc. To become a rakugoka, one must become an apprentice to a master (shisho) and undergo rigorous training. Rakugo, which depicts the fun of language and universal human emotions, is loved by many people across generations.',
            vocabulary: [ { word: '落語', reading: 'らくご', meaning: 'Rakugo (traditional comic storytelling)' }, { word: '伝統的', reading: 'でんとうてき', meaning: 'traditional' }, { word: '話芸', reading: 'わげい', meaning: 'storytelling art' }, { word: '演者', reading: 'えんじゃ', meaning: 'performer' }, { word: '落語家', reading: 'らくごか', meaning: 'Rakugo performer' }, { word: '座布団', reading: 'ざぶとん', meaning: 'zabuton (flat floor cushion)' }, { word: '身振り手振り', reading: 'みぶりてぶり', meaning: 'gestures' }, { word: '交える', reading: 'まじえる', meaning: 'to mix, include' }, { word: '扇子', reading: 'せんす', meaning: 'folding fan' }, { word: '手ぬぐい', reading: 'てぬぐい', meaning: 'tenugui (traditional hand towel)' }, { word: '小道具', reading: 'こどうぐ', meaning: 'props' }, { word: '滑稽な', reading: 'こっけいな', meaning: 'comical, funny' }, { word: '人情話', reading: 'にんじょうばなし', meaning: 'human-interest story' }, { word: '語る', reading: 'かたる', meaning: 'to tell, narrate' }, { word: '登場人物', reading: 'とうじょうじんぶつ', meaning: 'characters (in a story)' }, { word: '声色', reading: 'こわいろ', meaning: 'voice tone' }, { word: '表情', reading: 'ひょうじょう', meaning: 'facial expression' }, { word: '演じ分ける', reading: 'えんじわける', meaning: 'to play different roles' }, { word: 'オチ', reading: 'おち', meaning: 'punchline, witty ending' }, { word: '結末', reading: 'けつまつ', meaning: 'ending, conclusion' }, { word: '演目', reading: 'えんもく', meaning: 'program (of entertainment), repertoire' }, { word: '古典', reading: 'こてん', meaning: 'classical' }, { word: '新作', reading: 'しんさく', meaning: 'new work' }, { word: '大別される', reading: 'たいべつされる', meaning: 'to be broadly divided' }, { word: '数多く', reading: 'かずおおく', meaning: 'numerous, many' }, { word: '江戸時代', reading: 'えどじだい', meaning: 'Edo period' }, { word: '庶民', reading: 'しょみん', meaning: 'common people' }, { word: '娯楽', reading: 'ごらく', meaning: 'entertainment, amusement' }, { word: '発展する', reading: 'はってんする', meaning: 'to develop, grow' }, { word: '寄席', reading: 'よせ', meaning: 'yose (traditional variety hall)' }, { word: '師匠', reading: 'ししょう', meaning: 'master, teacher (in arts)' }, { word: '弟子入りする', reading: 'でしいりする', meaning: 'to become an apprentice' }, { word: '修行', reading: 'しゅぎょう', meaning: 'training, practice (esp. ascetic)' }, { word: '普遍的', reading: 'ふへんてき', meaning: 'universal' }, { word: '感情', reading: 'かんじょう', meaning: 'emotion, feeling' }, { word: '描く', reading: 'えがく', meaning: 'to depict, describe' }, { word: '時代を超える', reading: 'じだいをこえる', meaning: 'to transcend time/generations' }, ],
            questions: [
                { id: 'a2q1', question: '落語家(らくごか)が使(つか)う主(おも)な小道具(こどうぐ)は何(なん)ですか。', question_en: 'What are the main props used by a rakugoka?', options: ['本(ほん)と鉛筆(えんぴつ)', '扇子(せんす)と手(て)ぬぐい', 'マイクと台本(だいほん)', '仮面(かめん)と衣装(いしょう)'], options_en: ['Book and pencil', 'Fan and hand towel', 'Microphone and script', 'Mask and costume'], answer: 1, explanation: '本文には「扇子や手ぬぐいを小道具として使って」\nと書いてあります。これが落語家が使う\n主な小道具です。' },
                { id: 'a2q2', question: '落語(らくご)の特徴(とくちょう)として、本文(ほんぶん)で述(の)べられているものはどれですか。', question_en: 'Which of the following is mentioned as a characteristic of rakugo in the text?', options: ['複数(ふくすう)の演者(えんじゃ)で演(えん)じる', '必(かなら)ず音楽(おんがく)が伴(ともな)う', '話(はなし)の最後(さいご)に「オチ」がある', '立(た)って演(えん)じるのが基本(きほん)'], options_en: ['Performed by multiple performers', 'Always accompanied by music', 'Has an "ochi" at the end of the story', 'Basically performed standing up'], answer: 2, explanation: '本文に「話(はなし)の最後(さいご)には「オチ」がつくのが特徴(とくちょう)です」と\n記載されています。「オチ」は物語(ものがたり)の面白(おもしろ)い\n結末(けつまつ)の部分(ぶぶん)ですね。' },
                { id: 'a2q3', question: '落語家(らくごか)になるためには何(なに)が必要(ひつよう)ですか。', question_en: 'What is necessary to become a rakugoka?', options: ['大学(だいがく)を卒業(そつぎょう)すること', '試験(しけん)に合格(ごうかく)すること', '師匠(ししょう)に弟子入(でしい)りして修行(しゅぎょう)すること', '海外(かいがい)留学(りゅうがく)の経験(けいけん)'], options_en: ['Graduating from university', 'Passing an exam', 'Becoming an apprentice to a master and training', 'Experience studying abroad'], answer: 2, explanation: '本文には「師匠(ししょう)に弟子入(でしい)りし、厳(きび)しい修行(しゅぎょう)を積(つ)む\n必要(ひつよう)があります」と書いてあります。これが落語家(らくごか)に\nなるために必要(ひつよう)なことです。' }
            ]
        }
    ]
};


// --- React Component ---
const Reading = () => {
    // --- State Variables ---
    const [activeTab, setActiveTab] = useState<Level>('beginner'); // Explicit type
    const [progress, setProgress] = useState<ProgressState>({
        beginner: 0, intermediate: 0, advanced: 0,
    });
    const [expandedText, setExpandedText] = useState<string | null>(null);
    const [showTranslation, setShowTranslation] = useState<ShowInfoState>({});
    const [showVocabulary, setShowVocabulary] = useState<ShowInfoState>({});
    // Initialize showQuestionTranslation to hide all by default
    const [showQuestionTranslation, setShowQuestionTranslation] = useState<ShowInfoState>({});

    // State to manage user answers for all questions across all exercises
    const [answeredQuestions, setAnsweredQuestions] = useState<AnsweredQuestionsState>({});

    // --- Animation Variants ---
    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } }, };
    const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }, };
    const cardHoverVariants = {
        hover: {
            y: -5,
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            transition: { type: "spring", stiffness: 300, damping: 15 }
        }
    };

    // --- Level Icons ---
    const levelIcons: Record<Level, React.ReactNode> = {
        beginner: <Sprout className="mr-2 h-5 w-5 text-green-500 dark:text-green-400" />,
        intermediate: <Leaf className="mr-2 h-5 w-5 text-yellow-600 dark:text-yellow-500" />,
        advanced: <GraduationCap className="mr-2 h-5 w-5 text-indigo-600 dark:text-indigo-500" />,
    };

    // --- Helper Functions ---
    const toggleTextExpansion = (id: string) => {
        setExpandedText(prev => (prev === id ? null : id));
    };

    const toggleInfo = (id: string, type: 'translation' | 'vocabulary' | 'questionTranslation') => {
        if (type === 'translation') {
            setShowTranslation(prev => ({ ...prev, [id]: !prev[id] }));
        } else if (type === 'vocabulary') {
            setShowVocabulary(prev => ({ ...prev, [id]: !prev[id] }));
        } else if (type === 'questionTranslation') {
             // Toggle specifically for the question translation state
            setShowQuestionTranslation(prev => ({ ...prev, [id]: !prev[id] }));
        }
    };


    const updateProgress = (level: Level) => {
        const exercises = readingExercises[level];
        const totalQuestions = exercises.reduce((acc, ex) => acc + (ex.questions?.length || 0), 0);
        if (totalQuestions === 0) {
             setProgress(prev => ({ ...prev, [level]: 0 }));
             return;
        }

        let answeredCorrectlyCount = 0;
        exercises.forEach(ex => {
            ex.questions?.forEach(q => {
                if (answeredQuestions[q.id]?.correct) {
                    answeredCorrectlyCount++;
                }
            });
        });

        setProgress(prev => ({
            ...prev,
            [level]: Math.round((answeredCorrectlyCount / totalQuestions) * 100)
        }));
    };

    // Recalculate progress when the tab changes or when answers change
    useEffect(() => {
        updateProgress(activeTab);
    }, [activeTab, answeredQuestions]);

    const handleAnswer = (exerciseId: string, questionId: string, selectedOptionIndex: number, question: Question) => {
        // Prevent changing answer if already answered
        if (answeredQuestions[questionId] !== undefined) {
            return;
        }

        const isCorrect = selectedOptionIndex === question.answer;
        setAnsweredQuestions(prev => ({
            ...prev,
            [questionId]: { selected: selectedOptionIndex, correct: isCorrect }
        }));
    };

    // --- Component Render ---
    return (
        <Layout>
            <TooltipProvider>
                <motion.div
                    className="container mx-auto py-10 px-4"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    {/* Header */}
                    <motion.div variants={itemVariants} className="mb-8 text-center">
                        <div className="inline-flex items-center justify-center bg-gradient-to-r from-primary via-blue-500 to-purple-600 p-1 rounded-lg shadow-lg mb-4">
                            <BookOpenText className="h-10 w-10 text-white mx-3" />
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tight mb-2 text-gray-900 dark:text-gray-100">
                            Japanese Reading Practice
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            Improve your reading skills and boost your comprehension
                        </p>
                    </motion.div>

                    {/* Instructions */}
                    <motion.div variants={itemVariants} className="mb-8">
                        <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700">
                            <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            <AlertTitle className="text-blue-800 dark:text-blue-300">How to Use</AlertTitle>
                            <AlertDescription className="text-blue-700 dark:text-blue-400">
                                Select a level (Beginner, Intermediate, Advanced). Click on an exercise card to expand it. Read the text (now in Kana only), check vocabulary and text translation if needed. For questions, answer by clicking an option. Use the globe icon next to the questions section to toggle question and option translations. Your progress is tracked per level.
                            </AlertDescription>
                        </Alert>
                    </motion.div>

                    {/* Main Content Area */}
                    <motion.div variants={itemVariants}>
                        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as Level)} className="w-full">
                            {/* Level Tabs */}
                            <TabsList className="grid w-full grid-cols-3 mb-8 rounded-lg p-1 bg-gray-100 dark:bg-gray-800 shadow-inner">
                                {(Object.keys(readingExercises) as Level[]).map((level) => (
                                    <TabsTrigger
                                        key={level}
                                        value={level}
                                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-2.5 text-sm sm:text-base font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md hover:bg-gray-200 dark:hover:bg-gray-700 data-[state=active]:hover:bg-primary/90"
                                    >
                                        {levelIcons[level]}
                                        <span className="capitalize mr-1">{level}</span>
                                        (<span className="text-xs">{progress[level]}%</span>)
                                    </TabsTrigger>
                                ))}

                            </TabsList>

                            {/* Tab Content */}
                            <AnimatePresence mode="wait">
                                {(Object.keys(readingExercises) as Level[]).map((level) => (
                                    activeTab === level && (
                                        <motion.div
                                            key={level}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="space-y-8"
                                        >
                                            {/* Level Progress Header */}
                                            <motion.div
                                                variants={itemVariants}
                                                className="flex flex-wrap items-center justify-between gap-4 mb-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-4 rounded-lg shadow"
                                            >
                                                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                                                    {levelIcons[level]}
                                                    {level === 'beginner' ? '初級レベル' : level === 'intermediate' ? '中級レベル' : '上級レベル'}
                                                    <span className="text-sm ml-2 capitalize text-gray-500 dark:text-gray-400">({level})</span>
                                                </h2>
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Progress:</span>
                                                    <Progress value={progress[level]} className="w-32 sm:w-48 h-2.5" />
                                                    <span className="text-sm font-bold text-primary dark:text-primary-light">{progress[level]}%</span>
                                                </div>
                                            </motion.div>

                                            {/* Exercise Cards */}
                                            {readingExercises[level].map((exercise) => (
                                                <motion.div
                                                    key={exercise.id}
                                                    variants={itemVariants}
                                                    whileHover="hover"
                                                >
                                                    <motion.div variants={cardHoverVariants}>
                                                        <Card className="overflow-hidden border dark:border-gray-700 shadow-sm hover:shadow-lg transition-shadow duration-300">
                                                            {/* Card Header */}
                                                            <CardHeader className="bg-gray-50 dark:bg-gray-800/50 p-4 border-b dark:border-gray-700">
                                                                <div className="flex flex-wrap justify-between items-start gap-2">
                                                                    <div className="flex-grow mr-4">
                                                                        <CardTitle className="text-xl font-semibold text-pink-700 dark:text-pink-500 mb-1">{exercise.title}</CardTitle>
                                                                        <CardDescription className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                                            <Tooltip>
                                                                                <TooltipTrigger asChild>
                                                                                    <Badge variant="outline" className="mr-2 cursor-default border-pink-700/50 text-pink-700 dark:border-pink-500/50 dark:text-pink-500">
                                                                                        {exercise.level}
                                                                                    </Badge>
                                                                                </TooltipTrigger>
                                                                                <TooltipContent><p>{exercise.levelDescription} Level</p></TooltipContent>
                                                                            </Tooltip>
                                                                            JLPT {exercise.level} Equivalent
                                                                        </CardDescription>
                                                                    </div>
                                                                    <div className="flex space-x-1 flex-shrink-0">
                                                                        <Tooltip>
                                                                            <TooltipTrigger asChild>
                                                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900/50" onClick={() => toggleInfo(exercise.id, 'translation')}>
                                                                                    <Languages className="h-5 w-5" />
                                                                                </Button>
                                                                            </TooltipTrigger>
                                                                            <TooltipContent><p>Toggle Text Translation</p></TooltipContent>
                                                                        </Tooltip>
                                                                        <Tooltip>
                                                                            <TooltipTrigger asChild>
                                                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-900/50" onClick={() => toggleInfo(exercise.id, 'vocabulary')}>
                                                                                    <ListChecks className="h-5 w-5" />
                                                                                </Button>
                                                                            </TooltipTrigger>
                                                                            <TooltipContent><p>Toggle Vocabulary</p></TooltipContent>
                                                                        </Tooltip>
                                                                        <Tooltip>
                                                                            <TooltipTrigger asChild>
                                                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700" onClick={() => toggleTextExpansion(exercise.id)}>
                                                                                    {expandedText === exercise.id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                                                                                </Button>
                                                                            </TooltipTrigger>
                                                                            <TooltipContent><p>{expandedText === exercise.id ? 'Collapse' : 'Expand'} Exercise</p></TooltipContent>
                                                                        </Tooltip>
                                                                    </div>
                                                                </div>
                                                            </CardHeader>

                                                            {/* Collapsible Content Area */}
                                                            <AnimatePresence>
                                                                {expandedText === exercise.id && (
                                                                    <motion.div
                                                                        initial={{ height: 0, opacity: 0 }}
                                                                        animate={{ height: 'auto', opacity: 1 }}
                                                                        exit={{ height: 0, opacity: 0 }}
                                                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                                                        className="overflow-hidden"
                                                                    >
                                                                        <CardContent className="p-5 space-y-6">
                                                                            {/* Reading Text */}
                                                                            <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none bg-gray-50 dark:bg-gray-800 p-4 rounded-md border-l-4 border-primary dark:border-primary-light">
                                                                              <p className="text-lg xl:text-xl leading-relaxed font-jp font-semibold" lang="ja" style={{ whiteSpace: 'pre-wrap' }}>
                                                                                    {/* Render text with Furigana - will output plain kana here */}
                                                                                    {renderJapaneseWithFurigana(exercise.text)}
                                                                                </p>
                                                                            </div>

                                                                            {/* Translation */}
                                                                            <AnimatePresence>
                                                                                {showTranslation[exercise.id] && (
                                                                                    <motion.div
                                                                                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
                                                                                        className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-md border border-blue-200 dark:border-blue-700"
                                                                                    >
                                                                                        <h4 className="font-semibold mb-2 text-blue-800 dark:text-blue-300 flex items-center"><Languages className="h-4 w-4 mr-2" />Translation</h4>
                                                                                        <p className="text-sm text-blue-700 dark:text-blue-400">{exercise.translation}</p>
                                                                                    </motion.div>
                                                                                )}
                                                                            </AnimatePresence>

                                                                            {/* Vocabulary */}
                                                                             <AnimatePresence>
                                                                                {showVocabulary[exercise.id] && (
                                                                                    <motion.div
                                                                                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
                                                                                        className="p-4 bg-green-50 dark:bg-green-900/30 rounded-md border border-green-200 dark:border-green-700"
                                                                                    >
                                                                                        <h4 className="font-semibold mb-3 text-green-800 dark:text-green-300 flex items-center"><ListChecks className="h-4 w-4 mr-2" />Vocabulary</h4>
                                                                                        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 text-sm">
                                                                                            {exercise.vocabulary.map((vocab, index) => (
                                                                                                <motion.li key={`${exercise.id}-vocab-${index}`}
                                                                                                    className="border-b border-green-200 dark:border-green-800 py-1"
                                                                                                    whileHover={{ x: 3, color: 'rgb(22 163 74)' }}
                                                                                                >
                                                                                                    <span className="font-medium text-green-700 dark:text-green-300">{renderJapaneseWithFurigana(vocab.word)}</span> ({vocab.reading})
                                                                                                    <span className="text-green-600 dark:text-green-400"> – {vocab.meaning}</span>
                                                                                                </motion.li>
                                                                                            ))}
                                                                                        </ul>
                                                                                    </motion.div>
                                                                                )}
                                                                             </AnimatePresence>

                                                                            {/* Comprehension Questions */}
                                                                            {(exercise.questions && exercise.questions.length > 0) && (
                                                                                <div className="mt-6 bg-white dark:bg-gray-800/60 p-4 rounded-lg shadow-inner">
                                                                                    <div className="flex items-center justify-between mb-4">
                                                                                        <h3 className="text-lg font-medium flex items-center text-gray-800 dark:text-gray-200">
                                                                                            <HelpCircle className="mr-2 h-5 w-5 text-primary dark:text-primary-light" />
                                                                                            Comprehension Check (理解度チェック)
                                                                                        </h3>
                                                                                        {/* Question/Option Translation Toggle Button */}
                                                                                        <Tooltip>
                                                                                            <TooltipTrigger asChild>
                                                                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-purple-600 hover:bg-purple-100 dark:text-purple-400 dark:hover:bg-purple-900/50" onClick={() => toggleInfo(exercise.id, 'questionTranslation')}>
                                                                                                    <Languages className="h-5 w-5" />
                                                                                                </Button>
                                                                                            </TooltipTrigger>
                                                                                            <TooltipContent><p>Toggle Question/Option Translation</p></TooltipContent>
                                                                                        </Tooltip>
                                                                                    </div>
                                                                                    <Accordion type="single" collapsible className="w-full" defaultValue={exercise.questions[0]?.id}> {/* Use optional chaining */}
                                                                                        {exercise.questions.map((question, qIndex) => {
                                                                                            const answerState = answeredQuestions[question.id];
                                                                                            const isAnswered = answerState !== undefined;

                                                                                            return (
                                                                                                <AccordionItem key={question.id} value={question.id} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                                                                                                    <AccordionTrigger className="text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 px-3 py-3 rounded-md text-base [&[data-state=open]]:bg-gray-50 dark:[&[data-state=open]]:bg-gray-700/50">
                                                                                                        <div className="flex items-center justify-between w-full">
                                                                                                            {/* Question text */}
                                                                                                            <span className="font-semibold"> {/* Apply boldness here */}
                                                                                                                {`Q${qIndex + 1}: `}
                                                                                                                {/* Render question text with Furigana */}
                                                                                                                {renderJapaneseWithFurigana(question.question)}
                                                                                                                {/* Conditionally render English translation */}
                                                                                                                {showQuestionTranslation[exercise.id] && question.question_en && (
                                                                                                                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 font-normal">({question.question_en})</span>
                                                                                                                )}
                                                                                                            </span>
                                                                                                            {/* Icon indicating answer status */}
                                                                                                            {isAnswered && (
                                                                                                                answerState.correct ?
                                                                                                                    <Check className="ml-2 h-5 w-5 text-green-500 flex-shrink-0" /> :
                                                                                                                    <X className="ml-2 h-5 w-5 text-red-500 flex-shrink-0" />
                                                                                                            )}
                                                                                                        </div>
                                                                                                    </AccordionTrigger>
                                                                                                    <AccordionContent className="px-3 pt-3 pb-4">
                                                                                                        <div className="space-y-2">
                                                                                                            {question.options.map((option, optionIndex) => {
                                                                                                                const isAnswered = answeredQuestions[question.id] !== undefined;
                                                                                                                const answerState = answeredQuestions[question.id];
                                                                                                                const isSelected = isAnswered && answerState.selected === optionIndex;
                                                                                                                const isCorrectAnswer = optionIndex === question.answer;

                                                                                                                let buttonVariant: "default" | "destructive" | "outline" | "secondary" = "outline";
                                                                                                                let buttonClass = "justify-start w-full text-left h-auto py-2 px-3 whitespace-normal flex items-center text-sm sm:text-base";
                                                                                                                let IconComponent = null;

                                                                                                                if (isAnswered) {
                                                                                                                    if (isSelected) {
                                                                                                                        buttonVariant = isCorrectAnswer ? "default" : "destructive";
                                                                                                                        buttonClass += isCorrectAnswer
                                                                                                                            ? " bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-800 border-transparent"
                                                                                                                            : " bg-red-600 hover:bg-red-700 text-white dark:bg-red-700 dark:hover:bg-red-800 border-transparent";
                                                                                                                        IconComponent = isCorrectAnswer ? <Check className="h-4 w-4 mr-2 flex-shrink-0"/> : <X className="h-4 w-4 mr-2 flex-shrink-0"/>;
                                                                                                                    } else if (isCorrectAnswer) {
                                                                                                                        buttonVariant = "outline";
                                                                                                                        buttonClass += " border-green-500 text-green-700 dark:border-green-600 dark:text-green-400 bg-green-50/50 dark:bg-green-900/20";
                                                                                                                        IconComponent = <Check className="h-4 w-4 mr-2 text-green-500 flex-shrink-0"/>;
                                                                                                                    } else {
                                                                                                                        buttonClass += " text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 opacity-70";
                                                                                                                        buttonVariant = "outline";
                                                                                                                    }
                                                                                                                } else {
                                                                                                                    buttonClass += " hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-primary transition-colors duration-150"
                                                                                                                    buttonVariant = "outline";
                                                                                                                }

                                                                                                                return (
                                                                                                                    <Button
                                                                                                                        key={`${question.id}-opt-${optionIndex}`}
                                                                                                                        variant={buttonVariant}
                                                                                                                        className={buttonClass}
                                                                                                                        disabled={isAnswered}
                                                                                                                        onClick={() => handleAnswer(exercise.id, question.id, optionIndex, question)}
                                                                                                                    >
                                                                                                                        {IconComponent}
                                                                                                                        <span className="flex-1 font-semibold"> {/* Apply boldness here */}
                                                                                                                            {/* Render option text with Furigana */}
                                                                                                                            {renderJapaneseWithFurigana(option)}
                                                                                                                            {/* Conditionally render English translation */}
                                                                                                                            {showQuestionTranslation[exercise.id] && question.options_en && question.options_en[optionIndex] && (
                                                                                                                                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 font-normal">({question.options_en[optionIndex]})</span>
                                                                                                                            )}
                                                                                                                        </span>
                                                                                                                    </Button>
                                                                                                                );
                                                                                                            })}
                                                                                                        </div>
                                                                                                        {/* Explanation Area */}
                                                                                                        <AnimatePresence>
                                                                                                            {isAnswered && (
                                                                                                                <motion.div
                                                                                                                    initial={{ opacity: 0, y: 10 }}
                                                                                                                    animate={{ opacity: 1, y: 0 }}
                                                                                                                    exit={{ opacity: 0, y: 10 }}
                                                                                                                    transition={{ duration: 0.2 }}
                                                                                                                >
                                                                                                                    <Alert className={`mt-4 ${answerState.correct ? 'border-green-200 bg-green-50 dark:border-green-700 dark:bg-green-900/30' : 'border-red-200 bg-red-50 dark:border-red-700 dark:bg-red-900/30'}`}>
                                                                                                                        <Lightbulb className={`h-4 w-4 ${answerState.correct ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} />
                                                                                                                        <AlertTitle className={`${answerState.correct ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}`}>
                                                                                                                            {answerState.correct ? 'Correct!' : 'Incorrect'}
                                                                                                                        </AlertTitle>
                                                                                                                        <AlertDescription className={`text-sm ${answerState.correct ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                                                                                                                            {/* Use pre-wrap to respect \n for multi-line explanations */}
                                                                                                                            <p style={{ whiteSpace: 'pre-wrap' }}>{question.explanation ? renderJapaneseWithFurigana(question.explanation) : (answerState.correct ? 'Well done!' : `The correct answer was: ${renderJapaneseWithFurigana(question.options[question.answer])}`)}</p>
                                                                                                                        </AlertDescription>
                                                                                                                    </Alert>
                                                                                                                </motion.div>
                                                                                                            )}
                                                                                                        </AnimatePresence>
                                                                                                    </AccordionContent>
                                                                                                </AccordionItem>
                                                                                            );
                                                                                        })}
                                                                                    </Accordion>
                                                                                </div>
                                                                            )}
                                                                        </CardContent>
                                                                    </motion.div>
                                                                )}
                                                            </AnimatePresence>

                                                            {/* Card Footer */}
                                                            <CardFooter className="bg-gray-50 dark:bg-gray-800/50 p-3 border-t dark:border-gray-700 flex justify-end">
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="text-sm text-pink-700 hover:bg-pink-700/10 dark:text-pink-500 dark:hover:bg-pink-700/20"
                                                                    onClick={() => toggleTextExpansion(exercise.id)}
                                                                >
                                                                    {expandedText === exercise.id ? '閉じる (Close)' : '続きを読む (Read More)'}
                                                                    {expandedText === exercise.id ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
                                                                </Button>
                                                            </CardFooter>
                                                        </Card>
                                                    </motion.div>
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    )
                                ))}
                            </AnimatePresence>

                        </Tabs>
                    </motion.div>
                </motion.div>
            </TooltipProvider>
        </Layout>
    );
};

export default Reading;