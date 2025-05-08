import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import HandwritingPractice from '@/components/HandwritingPractice';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { 
  PenTool, 
  GraduationCap, 
  BookOpen, 
  ArrowLeft, 
  ArrowRight,
  RotateCw,
  CheckCircle,
  Info,
  HelpCircle
} from 'lucide-react';

// Character data types
interface Character {
  char: string;
  romaji: string;
  meaning?: string;
  strokes: number;
  examples?: string[];
  tips?: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
}

// --- Expanded Hiragana Data ---
const HIRAGANA_DATA: Character[] = [
  // Basic Vowels (あ行)
  { char: 'あ', romaji: 'a', strokes: 3, level: 'beginner', examples: ['あめ (ame) - rain', 'あか (aka) - red'], tips: 'Keep the cross centered.' },
  { char: 'い', romaji: 'i', strokes: 2, level: 'beginner', examples: ['いぬ (inu) - dog', 'いち (ichi) - one'], tips: 'The left stroke is slightly curved and longer.' },
  { char: 'う', romaji: 'u', strokes: 2, level: 'beginner', examples: ['うみ (umi) - sea', 'うた (uta) - song'], tips: 'The top stroke is a small tick.' },
  { char: 'え', romaji: 'e', strokes: 2, level: 'beginner', examples: ['えき (eki) - station', 'えいが (eiga) - movie'], tips: 'Similar to う but with a connected final stroke.' },
  { char: 'お', romaji: 'o', strokes: 3, level: 'beginner', examples: ['おかあさん (okāsan) - mother', 'おんがく (ongaku) - music'], tips: 'Ensure the final tick doesn\'t connect to the main loop.' },
  // K-row (か行)
  { char: 'か', romaji: 'ka', strokes: 3, level: 'beginner', examples: ['かばん (kaban) - bag', 'かぜ (kaze) - wind'], tips: 'The small tick on the right is important.' },
  { char: 'き', romaji: 'ki', strokes: 4, level: 'beginner', examples: ['きって (kitte) - stamp', 'きょう (kyō) - today'], tips: 'The bottom curve is usually detached in handwriting.' },
  { char: 'く', romaji: 'ku', strokes: 1, level: 'beginner', examples: ['くつ (kutsu) - shoes', 'くも (kumo) - cloud'], tips: 'A simple, single curved stroke.' },
  { char: 'け', romaji: 'ke', strokes: 3, level: 'beginner', examples: ['けいたい (keitai) - mobile phone', 'けさ (kesa) - this morning'], tips: 'The vertical stroke crosses the horizontal one.' },
  { char: 'こ', romaji: 'ko', strokes: 2, level: 'beginner', examples: ['ここ (koko) - here', 'こども (kodomo) - child'], tips: 'Two simple, parallel curves.' },
  // S-row (さ行)
  { char: 'さ', romaji: 'sa', strokes: 3, level: 'beginner', examples: ['さかな (sakana) - fish', 'さん (san) - three'], tips: 'Similar to き, but the bottom curve connects.' },
  { char: 'し', romaji: 'shi', strokes: 1, level: 'beginner', examples: ['しごと (shigoto) - work', 'しゃしん (shashin) - photo'], tips: 'A single hook-like stroke.' },
  { char: 'す', romaji: 'su', strokes: 2, level: 'beginner', examples: ['すし (sushi)', 'すき (suki) - like'], tips: 'The loop is characteristic.' },
  { char: 'せ', romaji: 'se', strokes: 3, level: 'beginner', examples: ['せんせい (sensei) - teacher', 'せかい (sekai) - world'], tips: 'Ensure the second and third strokes are distinct.' },
  { char: 'そ', romaji: 'so', strokes: 1, level: 'beginner', examples: ['そこ (soko) - there', 'そら (sora) - sky'], tips: 'Written as one continuous zigzag stroke.' },
  // T-row (た行)
  { char: 'た', romaji: 'ta', strokes: 4, level: 'beginner', examples: ['たかい (takai) - tall/expensive', 'たべる (taberu) - to eat'], tips: 'Similar to こ with an added cross.' },
  { char: 'ち', romaji: 'chi', strokes: 2, level: 'beginner', examples: ['ちいさい (chiisai) - small', 'ちかてつ (chikatetsu) - subway'], tips: 'Looks like a reversed number 5.' },
  { char: 'つ', romaji: 'tsu', strokes: 1, level: 'beginner', examples: ['つくえ (tsukue) - desk', 'つぎ (tsugi) - next'], tips: 'A single, large curve.' },
  { char: 'て', romaji: 'te', strokes: 1, level: 'beginner', examples: ['てがみ (tegami) - letter', 'てんき (tenki) - weather'], tips: 'A curved stroke, like a tilted T.' },
  { char: 'と', romaji: 'to', strokes: 2, level: 'beginner', examples: ['ともだち (tomodachi) - friend', 'としょかん (toshokan) - library'], tips: 'Two strokes, the second is a C-shape.' },
  // N-row (な行)
  { char: 'な', romaji: 'na', strokes: 4, level: 'beginner', examples: ['なまえ (namae) - name', 'なに (nani) - what'], tips: 'Complex shape, notice the small loop.' },
  { char: 'に', romaji: 'ni', strokes: 3, level: 'beginner', examples: ['にほん (Nihon) - Japan', 'にく (niku) - meat'], tips: 'Similar to こ with a leading vertical stroke.' },
  { char: 'ぬ', romaji: 'nu', strokes: 2, level: 'beginner', examples: ['ぬるい (nurui) - lukewarm', 'ぬぐ (nugu) - to take off clothes'], tips: 'Complex shape with a final loop.' },
  { char: 'ね', romaji: 'ne', strokes: 2, level: 'beginner', examples: ['ねこ (neko) - cat', 'ねる (neru) - to sleep'], tips: 'Similar to ぬ but ends with a curly tail.' },
  { char: 'の', romaji: 'no', strokes: 1, level: 'beginner', examples: ['のむ (nomu) - to drink', 'ノート (nōto) - notebook'], tips: 'A single, large swirling stroke.' },
  // H-row (は行)
  { char: 'は', romaji: 'ha', strokes: 3, level: 'beginner', examples: ['はな (hana) - flower/nose', 'はは (haha) - mother'], tips: 'Similar to け but the vertical stroke doesn\'t cross fully.' },
  { char: 'ひ', romaji: 'hi', strokes: 1, level: 'beginner', examples: ['ひと (hito) - person', 'ひこうき (hikōki) - airplane'], tips: 'A single smiling curve.' },
  { char: 'ふ', romaji: 'fu', strokes: 4, level: 'beginner', examples: ['ふじさん (Fujisan) - Mt. Fuji', 'ふく (fuku) - clothes'], tips: 'Four distinct small strokes.' },
  { char: 'へ', romaji: 'he', strokes: 1, level: 'beginner', examples: ['へや (heya) - room', 'へた (heta) - unskillful'], tips: 'A simple angled stroke, shorter on the left.' },
  { char: 'ほ', romaji: 'ho', strokes: 4, level: 'beginner', examples: ['ほん (hon) - book', 'ほしい (hoshii) - want'], tips: 'Similar to は but with two horizontal lines.' },
  // M-row (ま行)
  { char: 'ま', romaji: 'ma', strokes: 3, level: 'beginner', examples: ['まど (mado) - window', 'まいあさ (maiasa) - every morning'], tips: 'Similar to ほ but the vertical stroke crosses fully.' },
  { char: 'み', romaji: 'mi', strokes: 2, level: 'beginner', examples: ['みみ (mimi) - ear', 'みせ (mise) - shop'], tips: 'A complex stroke followed by a curve.' },
  { char: 'む', romaji: 'mu', strokes: 3, level: 'beginner', examples: ['むし (mushi) - insect', 'むずかしい (muzukashii) - difficult'], tips: 'Similar to す but ends with a tick.' },
  { char: 'め', romaji: 'me', strokes: 2, level: 'beginner', examples: ['め (me) - eye', 'めがね (megane) - glasses'], tips: 'Similar to ぬ but without the final loop.' },
  { char: 'も', romaji: 'mo', strokes: 3, level: 'beginner', examples: ['もも (momo) - peach', 'もしもし (moshi moshi) - hello (on phone)'], tips: 'Similar to し with two added horizontal strokes.' },
  // Y-row (や行)
  { char: 'や', romaji: 'ya', strokes: 3, level: 'beginner', examples: ['やま (yama) - mountain', 'やさい (yasai) - vegetable'] },
  { char: 'ゆ', romaji: 'yu', strokes: 2, level: 'beginner', examples: ['ゆき (yuki) - snow', 'ゆうびんきょく (yūbinkyoku) - post office'] },
  { char: 'よ', romaji: 'yo', strokes: 2, level: 'beginner', examples: ['よる (yoru) - night', 'よむ (yomu) - to read'] },
  // R-row (ら行)
  { char: 'ら', romaji: 'ra', strokes: 2, level: 'beginner', examples: ['ラーメン (rāmen)', 'ラジオ (rajio) - radio'] },
  { char: 'り', romaji: 'ri', strokes: 2, level: 'beginner', examples: ['りんご (ringo) - apple', 'りょうり (ryōri) - cooking'] },
  { char: 'る', romaji: 'ru', strokes: 1, level: 'beginner', examples: ['るす (rusu) - absence', 'ルール (rūru) - rule'] },
  { char: 'れ', romaji: 're', strokes: 2, level: 'beginner', examples: ['れいぞうこ (reizōko) - refrigerator', 'れきし (rekishi) - history'] },
  { char: 'ろ', romaji: 'ro', strokes: 1, level: 'beginner', examples: ['ろうそく (rōsoku) - candle', 'ロシア (roshia) - Russia'] },
  // W-row and N (わ行 + ん)
  { char: 'わ', romaji: 'wa', strokes: 2, level: 'beginner', examples: ['わたし (watashi) - I', 'わらう (warau) - to laugh'] },
  { char: 'を', romaji: 'wo', strokes: 3, level: 'beginner', examples: ['ほんをよむ (hon o yomu) - read a book (particle)'], tips: 'Mainly used as a particle.' },
  { char: 'ん', romaji: 'n', strokes: 1, level: 'beginner', examples: ['にほん (Nihon) - Japan', 'しんぶん (shinbun) - newspaper'], tips: 'A single cursive stroke.' },
];

// --- Expanded Katakana Data ---
const KATAKANA_DATA: Character[] = [
  // Basic Vowels (ア行)
  { char: 'ア', romaji: 'a', strokes: 2, level: 'beginner', examples: ['アメリカ (Amerika) - America', 'アイスクリーム (aisukurīmu) - ice cream'] },
  { char: 'イ', romaji: 'i', strokes: 2, level: 'beginner', examples: ['イギリス (Igirisu) - England', 'インド (Indo) - India'] },
  { char: 'ウ', romaji: 'u', strokes: 3, level: 'beginner', examples: ['ウイスキー (uisukī) - whiskey', 'ウール (ūru) - wool'] },
  { char: 'エ', romaji: 'e', strokes: 3, level: 'beginner', examples: ['エレベーター (erebētā) - elevator', 'エネルギー (enerugī) - energy'] },
  { char: 'オ', romaji: 'o', strokes: 3, level: 'beginner', examples: ['オレンジ (orenji) - orange', 'オリンピック (orinpikku) - Olympics'] },
  // K-row (カ行)
  { char: 'カ', romaji: 'ka', strokes: 2, level: 'beginner', examples: ['カメラ (kamera) - camera', 'カラオケ (karaoke)'] },
  { char: 'キ', romaji: 'ki', strokes: 3, level: 'beginner', examples: ['キーボード (kībōdo) - keyboard', 'キロ (kiro) - kilogram'] },
  { char: 'ク', romaji: 'ku', strokes: 2, level: 'beginner', examples: ['クラス (kurasu) - class', 'クリスマス (kurisumasu) - Christmas'] },
  { char: 'ケ', romaji: 'ke', strokes: 3, level: 'beginner', examples: ['ケーキ (kēki) - cake', 'ケース (kēsu) - case'] },
  { char: 'コ', romaji: 'ko', strokes: 2, level: 'beginner', examples: ['コンピューター (konpyūtā) - computer', 'コーヒー (kōhī) - coffee'] },
  // S-row (サ行)
  { char: 'サ', romaji: 'sa', strokes: 3, level: 'beginner', examples: ['サービス (sābisu) - service', 'サイズ (saizu) - size'] },
  { char: 'シ', romaji: 'shi', strokes: 3, level: 'beginner', examples: ['シャワー (shawā) - shower', 'シャツ (shatsu) - shirt'] },
  { char: 'ス', romaji: 'su', strokes: 2, level: 'beginner', examples: ['スーパー (sūpā) - supermarket', 'スポーツ (supōtsu) - sports'] },
  { char: 'セ', romaji: 'se', strokes: 2, level: 'beginner', examples: ['セーター (sētā) - sweater', 'センター (sentā) - center'] },
  { char: 'ソ', romaji: 'so', strokes: 2, level: 'beginner', examples: ['ソファ (sofa)', 'ソース (sōsu) - sauce'] },
  // T-row (タ行)
  { char: 'タ', romaji: 'ta', strokes: 3, level: 'beginner', examples: ['タクシー (takushī) - taxi', 'タオル (taoru) - towel'] },
  { char: 'チ', romaji: 'chi', strokes: 3, level: 'beginner', examples: ['チーズ (chīzu) - cheese', 'チケット (chiketto) - ticket'] },
  { char: 'ツ', romaji: 'tsu', strokes: 3, level: 'beginner', examples: ['ツアー (tsuā) - tour', 'ツール (tsūru) - tool'] },
  { char: 'テ', romaji: 'te', strokes: 3, level: 'beginner', examples: ['テレビ (terebi) - television', 'テスト (tesuto) - test'] },
  { char: 'ト', romaji: 'to', strokes: 2, level: 'beginner', examples: ['トイレ (toire) - toilet', 'トマト (tomato)'] },
  // N-row (ナ行)
  { char: 'ナ', romaji: 'na', strokes: 2, level: 'beginner', examples: ['ナイフ (naifu) - knife', 'ナイロン (nairon) - nylon'] },
  { char: 'ニ', romaji: 'ni', strokes: 2, level: 'beginner', examples: ['ニュース (nyūsu) - news', 'ニュージーランド (Nyūjīrando) - New Zealand'] },
  { char: 'ヌ', romaji: 'nu', strokes: 2, level: 'beginner', examples: ['ヌードル (nūdoru) - noodle'] },
  { char: 'ネ', romaji: 'ne', strokes: 4, level: 'beginner', examples: ['ネクタイ (nekutai) - necktie', 'ネット (netto) - net'] },
  { char: 'ノ', romaji: 'no', strokes: 1, level: 'beginner', examples: ['ノート (nōto) - notebook', 'ノーベル賞 (Nōberu-shō) - Nobel Prize'] },
  // H-row (ハ行)
  { char: 'ハ', romaji: 'ha', strokes: 2, level: 'beginner', examples: ['ハンバーガー (hanbāgā) - hamburger', 'ハイキング (haikingu) - hiking'] },
  { char: 'ヒ', romaji: 'hi', strokes: 2, level: 'beginner', examples: ['ビール (bīru) - beer', 'ピアノ (piano)'] },
  { char: 'フ', romaji: 'fu', strokes: 1, level: 'beginner', examples: ['フランス (Furansu) - France', 'フィルム (firumu) - film'] },
  { char: 'ヘ', romaji: 'he', strokes: 1, level: 'beginner', examples: ['ヘリコプター (herikoputā) - helicopter', 'ベッド (beddo) - bed'] },
  { char: 'ホ', romaji: 'ho', strokes: 4, level: 'beginner', examples: ['ホテル (hoteru) - hotel', 'ホーム (hōmu) - platform/home'] },
  // M-row (マ行)
  { char: 'マ', romaji: 'ma', strokes: 2, level: 'beginner', examples: ['マッチ (matchi) - match', 'マラソン (marason) - marathon'] },
  { char: 'ミ', romaji: 'mi', strokes: 3, level: 'beginner', examples: ['ミルク (miruku) - milk', 'ミス (misu) - miss/mistake'] },
  { char: 'ム', romaji: 'mu', strokes: 2, level: 'beginner', examples: ['ムービー (mūbī) - movie', 'ムード (mūdo) - mood'] },
  { char: 'メ', romaji: 'me', strokes: 2, level: 'beginner', examples: ['メール (mēru) - email', 'メニュー (menyū) - menu'] },
  { char: 'モ', romaji: 'mo', strokes: 3, level: 'beginner', examples: ['モーター (mōtā) - motor', 'モデル (moderu) - model'] },
  // Y-row (ヤ行)
  { char: 'ヤ', romaji: 'ya', strokes: 2, level: 'beginner', examples: ['タイヤ (taiya) - tire', 'ヤード (yādo) - yard'] },
  { char: 'ユ', romaji: 'yu', strokes: 2, level: 'beginner', examples: ['ユーモア (yūmoa) - humor', 'ユニーク (yunīku) - unique'] },
  { char: 'ヨ', romaji: 'yo', strokes: 3, level: 'beginner', examples: ['ヨーグルト (yōguruto) - yogurt', 'ヨーロッパ (Yōroppa) - Europe'] },
  // R-row (ラ行)
  { char: 'ラ', romaji: 'ra', strokes: 2, level: 'beginner', examples: ['ラジオ (rajio) - radio', 'ラーメン (rāmen)'] },
  { char: 'リ', romaji: 'ri', strokes: 2, level: 'beginner', examples: ['リスト (risuto) - list', 'リーダー (rīdā) - leader'] },
  { char: 'ル', romaji: 'ru', strokes: 2, level: 'beginner', examples: ['ルール (rūru) - rule', 'ルビー (rubī) - ruby'] },
  { char: 'レ', romaji: 're', strokes: 1, level: 'beginner', examples: ['レストラン (resutoran) - restaurant', 'レポート (repōto) - report'] },
  { char: 'ロ', romaji: 'ro', strokes: 3, level: 'beginner', examples: ['ロボット (robotto) - robot', 'ロケット (roketto) - rocket'] },
  // W-row and N (ワ行 + ん)
  { char: 'ワ', romaji: 'wa', strokes: 2, level: 'beginner', examples: ['ワイン (wain) - wine', 'ワンピース (wanpīsu) - one-piece dress'] },
  { char: 'ヲ', romaji: 'wo', strokes: 3, level: 'beginner', examples: ['Used primarily for emphasis or older texts.'], tips: 'Rarely used in modern Japanese.' },
  { char: 'ン', romaji: 'n', strokes: 2, level: 'beginner', examples: ['パン (pan) - bread', 'ペン (pen)'] },
];

// --- Expanded Kanji Data (N5 Level Focus) ---
const KANJI_DATA: Character[] = [
  // Numbers
  { char: '一', romaji: 'ichi/hito', meaning: 'one', strokes: 1, level: 'beginner', examples: ['一人 (hitori) - one person', '一日 (ichinichi) - one day'] },
  { char: '二', romaji: 'ni/futa', meaning: 'two', strokes: 2, level: 'beginner', examples: ['二人 (futari) - two people', '二日 (futsuka) - 2nd day'] },
  { char: '三', romaji: 'san/mi', meaning: 'three', strokes: 3, level: 'beginner', examples: ['三回 (sankai) - three times', '三日 (mikka) - 3rd day'] },
  { char: '四', romaji: 'shi/yon', meaning: 'four', strokes: 5, level: 'beginner', examples: ['四人 (yonin) - four people', '四日 (yokka) - 4th day'] },
  { char: '五', romaji: 'go/itsu', meaning: 'five', strokes: 4, level: 'beginner', examples: ['五回 (gokai) - five times', '五分 (gofun) - five minutes'] },
  { char: '六', romaji: 'roku/mu', meaning: 'six', strokes: 4, level: 'beginner', examples: ['六月 (rokugatsu) - June', '六日 (muika) - 6th day'] },
  { char: '七', romaji: 'shichi/nana', meaning: 'seven', strokes: 2, level: 'beginner', examples: ['七月 (shichigatsu) - July', '七時 (shichiji) - 7 o\'clock'] },
  { char: '八', romaji: 'hachi/ya', meaning: 'eight', strokes: 2, level: 'beginner', examples: ['八月 (hachigatsu) - August', '八回 (hakkai) - eight times'] },
  { char: '九', romaji: 'kyū/ku/kokono', meaning: 'nine', strokes: 2, level: 'beginner', examples: ['九月 (kugatsu) - September', '九日 (kokonoka) - 9th day'] },
  { char: '十', romaji: 'jū/tō', meaning: 'ten', strokes: 2, level: 'beginner', examples: ['十日 (tōka) - 10th day', '十分 (juppun) - ten minutes'] },
  { char: '百', romaji: 'hyaku', meaning: 'hundred', strokes: 6, level: 'beginner', examples: ['百円 (hyaku en) - 100 yen', '三百 (sanbyaku) - 300'] },
  { char: '千', romaji: 'sen/chi', meaning: 'thousand', strokes: 3, level: 'beginner', examples: ['千円 (sen en) - 1000 yen', '三千 (sanzen) - 3000'] },
  { char: '万', romaji: 'man', meaning: 'ten thousand', strokes: 3, level: 'beginner', examples: ['一万円 (ichiman en) - 10,000 yen', '百万円 (hyakuman en) - 1,000,000 yen'] },
  // Time/Dates
  { char: '日', romaji: 'nichi/hi/ka', meaning: 'day, sun', strokes: 4, level: 'beginner', examples: ['日曜日 (nichiyōbi) - Sunday', '今日 (kyō) - today'] },
  { char: '月', romaji: 'getsu/tsuki', meaning: 'month, moon', strokes: 4, level: 'beginner', examples: ['月曜日 (getsuyōbi) - Monday', '今月 (kongetsu) - this month'] },
  { char: '火', romaji: 'ka/hi', meaning: 'fire', strokes: 4, level: 'beginner', examples: ['火曜日 (kayōbi) - Tuesday', '花火 (hanabi) - fireworks'] },
  { char: '水', romaji: 'sui/mizu', meaning: 'water', strokes: 4, level: 'beginner', examples: ['水曜日 (suiyōbi) - Wednesday', '水着 (mizugi) - swimsuit'] },
  { char: '木', romaji: 'moku/ki', meaning: 'tree, wood', strokes: 4, level: 'beginner', examples: ['木曜日 (mokuyōbi) - Thursday', '木村 (Kimura) - surname'] },
  { char: '金', romaji: 'kin/kane', meaning: 'gold, money', strokes: 8, level: 'beginner', examples: ['金曜日 (kinyōbi) - Friday', 'お金 (okane) - money'] },
  { char: '土', romaji: 'do/tsuchi', meaning: 'earth, soil', strokes: 3, level: 'beginner', examples: ['土曜日 (doyōbi) - Saturday', '土地 (tochi) - land'] },
  { char: '年', romaji: 'nen/toshi', meaning: 'year', strokes: 6, level: 'beginner', examples: ['今年 (kotoshi) - this year', '来年 (rainen) - next year'] },
  { char: '時', romaji: 'ji/toki', meaning: 'time, hour', strokes: 10, level: 'intermediate', examples: ['時間 (jikan) - time, hour(s)', '時計 (tokei) - clock'] },
  { char: '分', romaji: 'fun/bun/wa(karu)', meaning: 'minute, part, understand', strokes: 4, level: 'beginner', examples: ['五分 (gofun) - 5 minutes', '分かる (wakaru) - to understand'] },
  { char: '間', romaji: 'kan/ken/aida', meaning: 'interval, space', strokes: 12, level: 'intermediate', examples: ['一時間 (ichijikan) - one hour', '間 (aida) - between'] },
  { char: '半', romaji: 'han/naka(ba)', meaning: 'half', strokes: 5, level: 'beginner', examples: ['半分 (hanbun) - half', '三時半 (sanji han) - 3:30'] },
  { char: '今', romaji: 'kon/ima', meaning: 'now', strokes: 4, level: 'beginner', examples: ['今週 (konshū) - this week', '今 (ima) - now'] },
  { char: '週', romaji: 'shū', meaning: 'week', strokes: 11, level: 'intermediate', examples: ['毎週 (maishū) - every week', '来週 (raishū) - next week'] },
  { char: '毎', romaji: 'mai', meaning: 'every', strokes: 6, level: 'beginner', examples: ['毎日 (mainichi) - every day', '毎朝 (maiasa) - every morning'] },
  { char: '午', romaji: 'go', meaning: 'noon', strokes: 4, level: 'beginner', examples: ['午前 (gozen) - A.M.', '午後 (gogo) - P.M.'] },
  // People/Body
  { char: '人', romaji: 'jin/hito', meaning: 'person', strokes: 2, level: 'beginner', examples: ['日本人 (Nihonjin) - Japanese person', '一人 (hitori) - one person'] },
  { char: '男', romaji: 'dan/otoko', meaning: 'man, male', strokes: 7, level: 'beginner', examples: ['男の子 (otoko no ko) - boy', '男性 (dansei) - male'] },
  { char: '女', romaji: 'jo/onna', meaning: 'woman, female', strokes: 3, level: 'beginner', examples: ['女の子 (onna no ko) - girl', '女性 (josei) - female'] },
  { char: '子', romaji: 'shi/ko', meaning: 'child', strokes: 3, level: 'beginner', examples: ['子供 (kodomo) - child', '女子 (joshi) - girl'] },
  { char: '父', romaji: 'fu/chichi', meaning: 'father', strokes: 4, level: 'beginner', examples: ['お父さん (otōsan) - father', '父の日 (chichi no hi) - Father\'s Day'] },
  { char: '母', romaji: 'bo/haha', meaning: 'mother', strokes: 5, level: 'beginner', examples: ['お母さん (okāsan) - mother', '母国語 (bokokugo) - mother tongue'] },
  { char: '友', romaji: 'yū/tomo', meaning: 'friend', strokes: 4, level: 'beginner', examples: ['友達 (tomodachi) - friend', '友人 (yūjin) - friend (formal)'] },
  { char: '口', romaji: 'kō/kuchi', meaning: 'mouth', strokes: 3, level: 'beginner', examples: ['入口 (iriguchi) - entrance', '人口 (jinkō) - population'] },
  { char: '目', romaji: 'moku/me', meaning: 'eye', strokes: 5, level: 'beginner', examples: ['目薬 (megusuri) - eye drops', '目的 (mokuteki) - purpose'] },
  { char: '耳', romaji: 'ji/mimi', meaning: 'ear', strokes: 6, level: 'beginner', examples: ['耳鼻科 (jibik) - ENT clinic', '耳 (mimi) - ear'] },
  { char: '手', romaji: 'shu/te', meaning: 'hand', strokes: 4, level: 'beginner', examples: ['上手 (jōzu) - skillful', '手紙 (tegami) - letter'] },
  { char: '足', romaji: 'soku/ashi/ta(riru)', meaning: 'leg, foot, suffice', strokes: 7, level: 'beginner', examples: ['一足 (issoku) - one pair (footwear)', '足ります (tarimasu) - to be enough'] },
  { char: '力', romaji: 'ryoku/riki/chikara', meaning: 'power, strength', strokes: 2, level: 'beginner', examples: ['力持ち (chikaramochi) - strong person', '努力 (doryoku) - effort'] },
  // Nature/Directions
  { char: '山', romaji: 'san/yama', meaning: 'mountain', strokes: 3, level: 'beginner', examples: ['富士山 (Fujisan) - Mt. Fuji', '山道 (yamamichi) - mountain path'] },
  { char: '川', romaji: 'sen/kawa', meaning: 'river', strokes: 3, level: 'beginner', examples: ['川沿い (kawazoi) - along the river', '小川 (ogawa) - stream'] },
  { char: '田', romaji: 'den/ta', meaning: 'rice field', strokes: 5, level: 'beginner', examples: ['田中 (Tanaka) - surname', '田舎 (inaka) - countryside'] },
  { char: '上', romaji: 'jō/ue/a(garu)', meaning: 'up, above', strokes: 3, level: 'beginner', examples: ['上着 (uwagi) - jacket', '上手 (jōzu) - skillful'] },
  { char: '下', romaji: 'ka/shita/sa(garu)', meaning: 'down, below', strokes: 3, level: 'beginner', examples: ['地下鉄 (chikatetsu) - subway', '下手 (heta) - unskillful'] },
  { char: '中', romaji: 'chū/naka', meaning: 'middle, inside', strokes: 4, level: 'beginner', examples: ['中国 (Chūgoku) - China', '一日中 (ichinichijū) - all day long'] },
  { char: '左', romaji: 'sa/hidari', meaning: 'left', strokes: 5, level: 'beginner', examples: ['左手 (hidarite) - left hand', '左側 (hidarigawa) - left side'] },
  { char: '右', romaji: 'u/yū/migi', meaning: 'right', strokes: 5, level: 'beginner', examples: ['右手 (migite) - right hand', '右側 (migigawa) - right side'] },
  { char: '東', romaji: 'tō/higashi', meaning: 'east', strokes: 8, level: 'beginner', examples: ['東京 (Tōkyō) - Tokyo', '東口 (higashiguchi) - east entrance'] },
  { char: '西', romaji: 'sei/sai/nishi', meaning: 'west', strokes: 6, level: 'beginner', examples: ['西口 (nishiguchi) - west entrance', '東西 (tōzai) - east and west'] },
  { char: '南', romaji: 'nan/minami', meaning: 'south', strokes: 9, level: 'intermediate', examples: ['南口 (minamiguchi) - south entrance', '東南アジア (tōnan ajia) - Southeast Asia'] },
  { char: '北', romaji: 'hoku/kita', meaning: 'north', strokes: 5, level: 'beginner', examples: ['北口 (kitaguchi) - north entrance', '北海道 (Hokkaidō)'] },
  { char: '外', romaji: 'gai/soto', meaning: 'outside', strokes: 5, level: 'beginner', examples: ['外国 (gaikoku) - foreign country', '外食 (gaishoku) - eating out'] },
  { char: '前', romaji: 'zen/mae', meaning: 'before, front', strokes: 9, level: 'beginner', examples: ['名前 (namae) - name', '午前 (gozen) - A.M.'] },
  { char: '後', romaji: 'go/ato/ushi(ro)', meaning: 'after, behind', strokes: 9, level: 'beginner', examples: ['午後 (gogo) - P.M.', '後ろ (ushiro) - behind'] },
  // Basic Verbs/Adjectives
  { char: '見', romaji: 'ken/mi(ru)', meaning: 'see, look', strokes: 7, level: 'beginner', examples: ['見ます (mimasu) - to see', '意見 (iken) - opinion'] },
  { char: '行', romaji: 'kō/i(ku)', meaning: 'go', strokes: 6, level: 'beginner', examples: ['行きます (ikimasu) - to go', '銀行 (ginkō) - bank'] },
  { char: '来', romaji: 'rai/ku(ru)', meaning: 'come', strokes: 7, level: 'beginner', examples: ['来ます (kimasu) - to come', '来週 (raishū) - next week'] },
  { char: '食', romaji: 'shoku/ta(beru)', meaning: 'eat', strokes: 9, level: 'beginner', examples: ['食べます (tabemasu) - to eat', '食堂 (shokudō) - cafeteria'] },
  { char: '飲', romaji: 'in/no(mu)', meaning: 'drink', strokes: 12, level: 'intermediate', examples: ['飲みます (nomimasu) - to drink', '飲み物 (nomimono) - drink'] },
  { char: '買', romaji: 'bai/ka(u)', meaning: 'buy', strokes: 12, level: 'intermediate', examples: ['買います (kaimasu) - to buy', '買い物 (kaimono) - shopping'] },
  { char: '円', romaji: 'en/maru(i)', meaning: 'yen, circle', strokes: 4, level: 'beginner', examples: ['百円 (hyaku en) - 100 yen', '円高 (endaka) - strong yen'] },
  { char: '車', romaji: 'sha/kuruma', meaning: 'car, vehicle', strokes: 7, level: 'beginner', examples: ['車 (kuruma) - car', '電車 (densha) - train'] },
  { char: '駅', romaji: 'eki', meaning: 'station', strokes: 14, level: 'intermediate', examples: ['駅員 (ekiin) - station attendant', '東京駅 (Tōkyō eki) - Tokyo Station'] },
  { char: '道', romaji: 'dō/michi', meaning: 'road, way', strokes: 12, level: 'intermediate', examples: ['道 (michi) - road', '柔道 (jūdō) - Judo'] },
  { char: '電', romaji: 'den', meaning: 'electricity', strokes: 13, level: 'intermediate', examples: ['電気 (denki) - electricity', '電話 (denwa) - telephone'] },
  { char: '店', romaji: 'ten/mise', meaning: 'store, shop', strokes: 8, level: 'beginner', examples: ['店員 (tenin) - store clerk', '店 (mise) - shop'] },
  { char: '社', romaji: 'sha/yashiro', meaning: 'company, shrine', strokes: 7, level: 'beginner', examples: ['社会 (shakai) - society', '会社 (kaisha) - company'] },
  { char: '銀', romaji: 'gin', meaning: 'silver', strokes: 14, level: 'intermediate', examples: ['銀行 (ginkō) - bank', '銀色 (giniro) - silver color'] },
  { char: '病', romaji: 'byō/ya(mu)', meaning: 'sick, illness', strokes: 10, level: 'intermediate', examples: ['病院 (byōin) - hospital', '病気 (byōki) - illness'] },
  { char: '院', romaji: 'in', meaning: 'institution, hospital', strokes: 10, level: 'intermediate', examples: ['大学院 (daigakuin) - graduate school', '病院 (byōin) - hospital'] },
  // Add more N5/N4 Kanji as needed...
  // Added missing Kanji from CSV (Stroke count needs manual update)
  { char: '先', romaji: 'sen/saki', meaning: 'before, ahead, previous', strokes: 0, level: 'beginner', examples: ['先生 (sensei) - teacher'] },
  { char: '名', romaji: 'mei/na', meaning: 'name, famous', strokes: 0, level: 'beginner', examples: ['有名 (yūmei) - famous'] },
  { char: '国', romaji: 'koku/kuni', meaning: 'country', strokes: 0, level: 'beginner', examples: ['韓国 (kankoku) - Korea'] },
  { char: '天', romaji: 'ten/ama', meaning: 'heaven, sky', strokes: 0, level: 'beginner', examples: ['天気 (tenki) - weather'] },
  { char: '気', romaji: 'ki', meaning: 'spirit, mind, air', strokes: 0, level: 'beginner', examples: ['元気 (genki) - healthy, lively'] },
  { char: '雨', romaji: 'u/ame', meaning: 'rain', strokes: 0, level: 'beginner', examples: ['大雨 (ōame) - heavy rain'] },
  { char: '空', romaji: 'kū/sora/a(ku)', meaning: 'sky, empty', strokes: 0, level: 'beginner', examples: ['空気 (kūki) - air'] },
  { char: '石', romaji: 'seki/ishi', meaning: 'stone', strokes: 0, level: 'beginner', examples: ['石鹸 (sekken) - soap'] },
  { char: '花', romaji: 'ka/hana', meaning: 'flower', strokes: 0, level: 'beginner', examples: ['花火 (hanabi) - fireworks'] },
  { char: '読', romaji: 'doku/yo(mu)', meaning: 'read', strokes: 0, level: 'beginner', examples: ['読書 (dokusho) - reading'] },
  { char: '書', romaji: 'sho/ka(ku)', meaning: 'write', strokes: 0, level: 'beginner', examples: ['図書館 (toshokan) - library'] },
  { char: '話', romaji: 'wa/hana(su)', meaning: 'speak, talk', strokes: 0, level: 'beginner', examples: ['電話 (denwa) - telephone'] },
  { char: '聞', romaji: 'bun/ki(ku)', meaning: 'hear, listen, ask', strokes: 0, level: 'beginner', examples: ['新聞 (shinbun) - newspaper'] },
  { char: '言', romaji: 'gen/i(u)', meaning: 'say, word', strokes: 0, level: 'beginner', examples: ['言語 (gengo) - language'] },
  { char: '立', romaji: 'ritsu/ta(tsu)', meaning: 'stand up, establish', strokes: 0, level: 'beginner', examples: ['国立 (kokuritsu) - national'] },
  { char: '休', romaji: 'kyū/yasu(mu)', meaning: 'rest', strokes: 0, level: 'beginner', examples: ['休日 (kyūjitsu) - holiday'] },
  { char: '入', romaji: 'nyū/hai(ru)/i(reru)', meaning: 'enter', strokes: 0, level: 'beginner', examples: ['入口 (iriguchi) - entrance'] },
  { char: '出', romaji: 'shutsu/de(ru)/da(su)', meaning: 'exit, go out', strokes: 0, level: 'beginner', examples: ['出口 (deguchi) - exit'] },
  { char: '生', romaji: 'sei/shō/u(mareru)/i(kiru)', meaning: 'live, birth, student', strokes: 0, level: 'beginner', examples: ['学生 (gakusei) - student'] },
  { char: '学', romaji: 'gaku/mana(bu)', meaning: 'study, learn', strokes: 0, level: 'beginner', examples: ['学校 (gakkō) - school'] },
  { char: '会', romaji: 'kai/a(u)', meaning: 'meet, society', strokes: 0, level: 'beginner', examples: ['会社 (kaisha) - company'] },
  { char: '作', romaji: 'saku/tsuku(ru)', meaning: 'make, create', strokes: 0, level: 'beginner', examples: ['作文 (sakubun) - essay'] },
  { char: '帰', romaji: 'ki/kae(ru)', meaning: 'return, go home', strokes: 0, level: 'beginner', examples: ['帰国 (kikoku) - return to home country'] },
  { char: '大', romaji: 'dai/tai/ō(kii)', meaning: 'big, large', strokes: 0, level: 'beginner', examples: ['大学 (daigaku) - university'] },
  { char: '小', romaji: 'shō/chii(sai)/ko', meaning: 'small, little', strokes: 0, level: 'beginner', examples: ['小学校 (shōgakkō) - elementary school'] },
  { char: '高', romaji: 'kō/taka(i)', meaning: 'high, tall, expensive', strokes: 0, level: 'beginner', examples: ['高校 (kōkō) - high school'] },
  { char: '安', romaji: 'an/yasu(i)', meaning: 'cheap, peaceful', strokes: 0, level: 'beginner', examples: ['安全 (anzen) - safety'] },
  { char: '新', romaji: 'shin/atara(shii)', meaning: 'new', strokes: 0, level: 'beginner', examples: ['新聞 (shinbun) - newspaper'] },
  { char: '古', romaji: 'ko/furu(i)', meaning: 'old', strokes: 0, level: 'beginner', examples: ['中古 (chūko) - secondhand'] },
  { char: '多', romaji: 'ta/ō(i)', meaning: 'many, much', strokes: 0, level: 'beginner', examples: ['多分 (tabun) - probably'] },
  { char: '少', romaji: 'shō/suku(nai)/suko(shi)', meaning: 'few, little', strokes: 0, level: 'beginner', examples: ['少し (sukoshi) - a little'] },
  { char: '長', romaji: 'chō/naga(i)', meaning: 'long, leader', strokes: 0, level: 'beginner', examples: ['社長 (shachō) - company president'] },
  { char: '白', romaji: 'haku/shiro(i)', meaning: 'white', strokes: 0, level: 'beginner', examples: ['白黒 (shirokuro) - black and white'] },
  { char: '赤', romaji: 'seki/aka(i)', meaning: 'red', strokes: 0, level: 'beginner', examples: ['赤ちゃん (akachan) - baby'] },
  { char: '青', romaji: 'sei/ao(i)', meaning: 'blue', strokes: 0, level: 'beginner', examples: ['青年 (seinen) - youth'] },
  { char: '語', romaji: 'go/kata(ru)', meaning: 'language, word', strokes: 0, level: 'beginner', examples: ['日本語 (nihongo) - Japanese language'] },
  { char: '本', romaji: 'hon/moto', meaning: 'book, origin', strokes: 0, level: 'beginner', examples: ['本屋 (honya) - bookstore'] },
  { char: '校', romaji: 'kō', meaning: 'school, proofread', strokes: 0, level: 'beginner', examples: ['中学校 (chūgakkō) - middle school'] },
];

// Group types for learning progression
type CharGroup =
  // Hiragana/Katakana Rows
  'basic' | 'k-row' | 's-row' | 't-row' | 'n-row' | 'h-row' | 'm-row' | 'y-row' | 'r-row' | 'w-row' |
  // Kanji Themes
  'numbers' | 'time' | 'people' | 'nature' | 'directions' | 'verbs' | 'adjectives' | 'nouns' | 'all'; // Added 'all'

interface GroupDefinition {
  id: CharGroup;
  name: string;
  description: string;
  script: 'hiragana' | 'katakana' | 'kanji' | 'common'; // Added script type for easier filtering
}

// Define groups for each script type
const ALL_GROUPS: GroupDefinition[] = [
  // Hiragana
  { id: 'basic', name: 'Basic Vowels (あ行)', description: 'あ, い, う, え, お', script: 'hiragana' },
  { id: 'k-row', name: 'K-row (か行)', description: 'か, き, く, け, こ', script: 'hiragana' },
  { id: 's-row', name: 'S-row (さ行)', description: 'さ, し, す, せ, そ', script: 'hiragana' },
  { id: 't-row', name: 'T-row (た行)', description: 'た, ち, つ, て, と', script: 'hiragana' },
  { id: 'n-row', name: 'N-row (な行)', description: 'な, に, ぬ, ね, の', script: 'hiragana' },
  { id: 'h-row', name: 'H-row (は行)', description: 'は, ひ, ふ, へ, ほ', script: 'hiragana' },
  { id: 'm-row', name: 'M-row (ま行)', description: 'ま, み, む, め, も', script: 'hiragana' },
  { id: 'y-row', name: 'Y-row (や行)', description: 'や, ゆ, よ', script: 'hiragana' },
  { id: 'r-row', name: 'R-row (ら行)', description: 'ら, り, る, れ, ろ', script: 'hiragana' },
  { id: 'w-row', name: 'W-row & N (わ行+ん)', description: 'わ, を, ん', script: 'hiragana' },
  // Katakana (reuse IDs where applicable, filter by script type)
  { id: 'basic', name: 'Basic Vowels (ア行)', description: 'ア, イ, ウ, エ, オ', script: 'katakana' },
  { id: 'k-row', name: 'K-row (カ行)', description: 'カ, キ, ク, ケ, コ', script: 'katakana' },
  { id: 's-row', name: 'S-row (サ行)', description: 'サ, シ, ス, セ, ソ', script: 'katakana' },
  { id: 't-row', name: 'T-row (タ行)', description: 'タ, チ, ツ, テ, ト', script: 'katakana' },
  { id: 'n-row', name: 'N-row (ナ行)', description: 'ナ, ニ, ヌ, ネ, ノ', script: 'katakana' },
  { id: 'h-row', name: 'H-row (ハ行)', description: 'ハ, ヒ, フ, ヘ, ホ', script: 'katakana' },
  { id: 'm-row', name: 'M-row (マ行)', description: 'マ, ミ, ム, メ, モ', script: 'katakana' },
  { id: 'y-row', name: 'Y-row (ヤ行)', description: 'ヤ, ユ, ヨ', script: 'katakana' },
  { id: 'r-row', name: 'R-row (ラ行)', description: 'ラ, リ, ル, レ, ロ', script: 'katakana' },
  { id: 'w-row', name: 'W-row & N (ワ行+ン)', description: 'ワ, ヲ, ン', script: 'katakana' },
  // Kanji
  { id: 'numbers', name: 'Numbers', description: '一, 二, 三, 四, 五, 六, 七, 八, 九, 十, 百, 千, 万', script: 'kanji' },
  { id: 'time', name: 'Time/Calendar', description: '日, 月, 火, 水, 木, 金, 土, 年, 時, 分, 間, 半, 今, 週, 毎, 午', script: 'kanji' },
  { id: 'people', name: 'People/Family', description: '人, 男, 女, 子, 父, 母, 友, 口, 目, 耳, 手, 足, 力', script: 'kanji' },
  { id: 'nature', name: 'Nature', description: '山, 川, 田, 木, 火, 水, 土, 石, 花, 天, 気, 雨, 空', script: 'kanji' },
  { id: 'directions', name: 'Directions/Position', description: '上, 下, 中, 左, 右, 東, 西, 南, 北, 外, 前, 後', script: 'kanji' },
  { id: 'verbs', name: 'Common Verbs', description: '見, 行, 来, 食, 飲, 買, 読, 書, 話, 聞, 言, 立, 休, 入, 出, 会, 作, 帰', script: 'kanji' },
  { id: 'adjectives', name: 'Common Adjectives', description: '大, 小, 高, 安, 新, 古, 多, 少, 長, 白, 赤, 青', script: 'kanji' },
  { id: 'nouns', name: 'Common Nouns', description: '本, 語, 学, 校, 先, 生, 何, 名, 国, 円, 車, 駅, 道, 電, 店, 社, 銀, 病, 院', script: 'kanji' },
  { id: 'all', name: 'All Hiragana', description: 'Practice all Hiragana characters', script: 'hiragana' },
  { id: 'all', name: 'All Katakana', description: 'Practice all Katakana characters', script: 'katakana' },
  { id: 'all', name: 'All N5 Kanji', description: 'Practice all listed Kanji characters', script: 'kanji' },
];

// Helper function to get characters for a specific group
const getCharsForGroup = (script: 'hiragana' | 'katakana' | 'kanji', group: CharGroup): Character[] => {
  const baseData = script === 'hiragana' ? HIRAGANA_DATA : script === 'katakana' ? KATAKANA_DATA : KANJI_DATA;

  if (group === 'all') return baseData;

  switch (script) {
    case 'hiragana':
    case 'katakana':
      const hiraganaMap: Record<CharGroup, string[]> = {
        'basic': ['あ', 'い', 'う', 'え', 'お', 'ア', 'イ', 'ウ', 'エ', 'オ'],
        'k-row': ['か', 'き', 'く', 'け', 'こ', 'カ', 'キ', 'ク', 'ケ', 'コ'],
        's-row': ['さ', 'し', 'す', 'せ', 'そ', 'サ', 'シ', 'ス', 'セ', 'ソ'],
        't-row': ['た', 'ち', 'つ', 'て', 'と', 'タ', 'チ', 'ツ', 'テ', 'ト'],
        'n-row': ['な', 'に', 'ぬ', 'ね', 'の', 'ナ', 'ニ', 'ヌ', 'ネ', 'ノ'],
        'h-row': ['は', 'ひ', 'ふ', 'へ', 'ほ', 'ハ', 'ヒ', 'フ', 'ヘ', 'ホ'],
        'm-row': ['ま', 'み', 'む', 'め', 'も', 'マ', 'ミ', 'ム', 'メ', 'モ'],
        'y-row': ['や', 'ゆ', 'よ', 'ヤ', 'ユ', 'ヨ'],
        'r-row': ['ら', 'り', 'る', 'れ', 'ろ', 'ラ', 'リ', 'ル', 'レ', 'ロ'],
        'w-row': ['わ', 'を', 'ん', 'ワ', 'ヲ', 'ン'],
        // Add other potential group IDs if needed, mapping them to empty arrays or default behavior
        'numbers': [], 'time': [], 'people': [], 'nature': [], 'directions': [], 'verbs': [], 'adjectives': [], 'nouns': [], 'all': []
      };
      const targetChars = hiraganaMap[group] || [];
      return baseData.filter(c => targetChars.includes(c.char));

    case 'kanji':
      const kanjiMap: Record<CharGroup, string[]> = {
        'numbers': ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '百', '千', '万'],
        'time': ['日', '月', '火', '水', '木', '金', '土', '年', '時', '分', '間', '半', '今', '週', '毎', '午'], // Added time related kanji
        'people': ['人', '男', '女', '子', '父', '母', '友', '口', '目', '耳', '手', '足', '力'], // Added body parts
        'nature': ['山', '川', '田', '木', '火', '水', '土', '石', '花', '天', '気', '雨', '空'], // Added nature kanji
        'directions': ['上', '下', '中', '左', '右', '東', '西', '南', '北', '外', '前', '後'], // Added directions
        'verbs': ['見', '行', '来', '食', '飲', '買', '読', '書', '話', '聞', '言', '立', '休', '入', '出', '会', '作', '帰'], // Added verbs
        'adjectives': ['大', '小', '高', '安', '新', '古', '多', '少', '長', '白', '赤', '青'], // Added adjectives
        'nouns': ['本', '語', '学', '校', '先', '生', '何', '名', '国', '円', '車', '駅', '道', '電', '店', '社', '銀', '病', '院'], // Added nouns
         // Add other potential group IDs if needed
        'basic': [], 'k-row': [], 's-row': [], 't-row': [], 'n-row': [], 'h-row': [], 'm-row': [], 'y-row': [], 'r-row': [], 'w-row': [], 'all': []
      };
      const targetKanji = kanjiMap[group] || [];
      return baseData.filter(c => targetKanji.includes(c.char));

    default:
      return [];
  }
};


// WritingPractice component
const WritingPractice: React.FC = () => {
  // State for the tab selection
  const [scriptType, setScriptType] = useState<'hiragana' | 'katakana' | 'kanji'>('hiragana');

  // Get available groups for the current script type
  const getAvailableGroups = (): GroupDefinition[] => {
    return ALL_GROUPS.filter(g => g.script === scriptType || g.script === 'common');
  };

  // State for group selection - initialize based on the first available group for hiragana
  const [selectedGroup, setSelectedGroup] = useState<CharGroup>(() => {
      const initialGroups = ALL_GROUPS.filter(g => g.script === 'hiragana');
      return initialGroups.length > 0 ? initialGroups[0].id : 'basic'; // Default fallback
  });

  // State for the current character index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Current data based on script type and group
  const [currentData, setCurrentData] = useState<Character[]>([]);

  // State for progress
  const [progress, setProgress] = useState(0);

  // State for completed characters
  const [completedChars, setCompletedChars] = useState<Record<string, boolean>>({});

  // Calculate the current character data
  const currentChar = currentData[currentIndex]; // Can be undefined initially or if currentData is empty

  // Effect to set the current data based on script type and group
  useEffect(() => {
    const availableGroups = getAvailableGroups();
    // If the current selectedGroup is not valid for the new scriptType, reset it
    if (!availableGroups.some(g => g.id === selectedGroup)) {
      setSelectedGroup(availableGroups[0]?.id || 'basic'); // Reset to the first available group
      // This state change will trigger the effect again, so we can return early
      return;
    }

    const filteredData = getCharsForGroup(scriptType, selectedGroup);
    setCurrentData(filteredData);
    setCurrentIndex(0); // Reset index when group/script changes
    // Progress will be updated by the next effect
  }, [scriptType, selectedGroup]); // Rerun when script or group changes

  // Effect to update progress when current index or data changes
  useEffect(() => {
    const totalChars = currentData.length;
    // Calculate progress based on completed characters within the current set
    const completedCount = currentData.filter(c => completedChars[c.char]).length;

    // Update progress based on the *next* character to be practiced (currentIndex)
    // or show 100% if all are marked complete
    let progressPercentage = 0;
    if (totalChars > 0) {
        if (completedCount === totalChars) {
            progressPercentage = 100;
        } else {
            // Progress represents the percentage of characters *before* the current one that are done,
            // effectively showing progress towards completing the current character.
             progressPercentage = (currentIndex / totalChars) * 100;
        }
    }

    setProgress(progressPercentage);

  }, [currentIndex, currentData, completedChars]); // Depend on completedChars as well

  // Handle next character
  const handleNext = () => {
    if (!currentChar) return; // Guard against undefined currentChar

    // Mark the current character as completed
    setCompletedChars((prev) => ({
      ...prev,
      [currentChar.char]: true
    }));

    if (currentIndex < currentData.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Completed all characters in this group
      setProgress(100); // Ensure progress shows 100%
      alert('Congratulations! You have completed this group.');
      // Optionally: suggest moving to the next group or script
    }
  };

  // Handle previous character
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        {/* Header section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Japanese Writing Practice
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Master writing Hiragana, Katakana, and Kanji with interactive practice and stroke order guides.
          </p>
        </motion.div>
        
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left sidebar / controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card>
              <CardHeader>
                <CardTitle>Learning Path</CardTitle>
                <CardDescription>Select a script and character group</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Script type selection */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Script Type</h3>
                  <Tabs 
                    defaultValue="hiragana" 
                    value={scriptType}
                    onValueChange={(value) => {
                        const newScript = value as 'hiragana' | 'katakana' | 'kanji';
                        setScriptType(newScript);
                        // Reset group selection logic is handled by useEffect
                    }}
                    className="w-full"
                  >
                    <TabsList className="grid grid-cols-3 mb-4 w-full">
                      <TabsTrigger value="hiragana" className="flex items-center gap-1">
                        <span className="text-lg">あ</span> Hiragana
                      </TabsTrigger>
                      <TabsTrigger value="katakana" className="flex items-center gap-1">
                        <span className="text-lg">ア</span> Katakana
                      </TabsTrigger>
                      <TabsTrigger value="kanji" className="flex items-center gap-1">
                        <span className="text-lg">漢</span> Kanji
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                
                {/* Character group selection */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Character Group</h3>
                  <Select 
                    value={selectedGroup}
                    onValueChange={(value) => setSelectedGroup(value as CharGroup)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a group" />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailableGroups().map((group) => (
                        <SelectItem key={`${group.script}-${group.id}`} value={group.id}>
                          {group.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {/* Group description */}
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {getAvailableGroups().find(g => g.id === selectedGroup)?.description}
                  </p>
                </div>
                
                {/* Progress indicator */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-sm font-medium">Group Progress</h3>
                     <span className="text-xs text-gray-500 dark:text-gray-400">
                      {/* Show completion checkmark if progress is 100 */}
                      {progress >= 100 ? (
                        <CheckCircle className="h-4 w-4 text-green-500 inline-block mr-1" />
                      ) : (
                        `${currentIndex + 1} / ${currentData.length}`
                      )}
                       ({Math.round(progress)}%)
                    </span>
                  </div>
                  <Progress value={progress} className="w-full h-2" />
                </div>
                
                {/* Learning tips */}
                <Card className="bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800">
                  <CardHeader className="pb-2 pt-4">
                    <CardTitle className="text-blue-800 dark:text-blue-300 text-sm flex items-center">
                      <HelpCircle className="h-4 w-4 mr-2" /> Writing Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs text-blue-700 dark:text-blue-300 pt-0">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Follow the stroke order shown in the guide</li>
                      <li>Practice each character multiple times</li>
                      <li>Pay attention to the proportions of each part</li>
                      <li>Use the audio button to hear pronunciation</li>
                      <li>Complete each character to progress</li>
                    </ul>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Main practice area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-3"
                   >
            {/* Handwriting practice component */}
            {/* Add a key to force re-render when character changes */}
            {currentChar ? (
              <HandwritingPractice
                key={`${scriptType}-${currentChar.char}`} // Force re-mount on character change
                character={currentChar.char}
                pronunciation={currentChar.romaji}
                meaning={currentChar.meaning || 
                  (scriptType === 'hiragana' ? 'Hiragana character' :
                   scriptType === 'katakana' ? 'Katakana character' : 'Kanji character')}
                strokeOrder={`/assets/strokes/${scriptType}/${currentChar.char}.gif`}
                audioPath={`/assets/audio/${scriptType}/${currentChar.char}.mp3`} // Ensure audio files exist
                expectedStrokes={currentChar.strokes}
                examples={currentChar.examples}
                tips={currentChar.tips}
                onNext={handleNext}
                onPrevious={handlePrevious}
                level={currentChar.level || 'beginner'} // Provide default level
                showControls={true}
              />
            ) : (
                // Placeholder or loading state if no character is selected/available
                <Card className="flex items-center justify-center h-96">
                    <CardContent className="text-center">
                        <p className="text-gray-500 dark:text-gray-400">Select a script and group to start practicing.</p>
                    </CardContent>
                </Card>
            )}
            
            {/* Navigation info */}
            <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 text-center">
              Use the <span className="font-medium">Previous</span> and <span className="font-medium">Next</span> buttons to navigate between characters, or select a new group from the sidebar.
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default WritingPractice;