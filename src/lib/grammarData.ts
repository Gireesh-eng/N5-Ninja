export interface Example {
  japanese: string;
  romaji: string;
  english: string;
}

export interface GrammarPoint {
  pattern: string;
  japanese: string | string[]; // Can be string or array of strings
  romaji: string | string[];   // Can be string or array of strings
  english: string | string[];  // Can be string or array of strings
  explanation: string;
  examples?: Example[];       // Optional examples array
}

export interface GrammarLesson {
  id: string;
  title: string;
  points: GrammarPoint[];
}

export type GrammarCollection = GrammarLesson[];

// TODO: User needs to paste the grammarPoints array data here
export const grammarPoints: GrammarCollection = [
 // Paste the entire grammarPoints array content from src/pages/Grammar.tsx here

  {
    id: "lesson-1",
    title: "Lesson 1",
    points: [
      {
        pattern: "N1 は N2 です",
        japanese: "<ruby><rb>私</rb><rt>わたし</rt></ruby>はマイク・ミラーです。",
        romaji: "Watashi wa Maiku Miraa desu.",
        english: "I am Mike Miller.",
        explanation: "Basic sentence structure for stating identification or facts. 'は' (wa) marks the topic."
      },
      {
        pattern: "N1 は N2 じゃありません (ではありません)",
        japanese: "サントスさんは<ruby><rb>学生</rb><rt>がくせい</rt></ruby>じゃありません。",
        romaji: "Santosu-san wa gakusei ja arimasen.",
        english: "Mr. Santos is not a student.",
        explanation: "Negative form of 'N1 は N2 です'. 'ではありません' (dewa arimasen) is more formal and also common at N5 level."
      },
      {
        pattern: "Sentence か",
        japanese: "ミラーさんはアメリカ<ruby><rb>人</rb><rt>じん</rt></ruby>ですか。",
        romaji: "Miraa-san wa Amerikajin desu ka.",
        english: "Is Mr. Miller American?",
        explanation: "Turns a statement into a yes/no question by adding 'か' (ka) at the end. Essential for N5 questions."
      },
      {
        pattern: "N も",
        japanese: "ミラーさんも<ruby><rb>会社員</rb><rt>かいしゃいん</rt></ruby>です。",
        romaji: "Miraa-san mo kaishain desu.",
        english: "Mr. Miller is also a company employee.",
        explanation: "Replaces 'は' (wa) when the predicate is the same as in the previous statement, meaning 'also' or 'too'. Core N5 particle."
      },
      {
        pattern: "N1 の N2",
        japanese: "<ruby><rb>私</rb><rt>わたし</rt></ruby>はIMCの<ruby><rb>社員</rb><rt>しゃいん</rt></ruby>です。",
        romaji: "Watashi wa IMC no shain desu.",
        english: "I am an employee of IMC.",
        explanation: "'の' (no) connects two nouns. N1 modifies N2 (possession, affiliation, origin, material, etc.). Crucial N5 particle."
      },
      {
        pattern: "〜さん",
        japanese: "<ruby><rb>山田</rb><rt>やまだ</rt></ruby>さん、おはようございます。",
        romaji: "Yamada-san, ohayou gozaimasu.",
        english: "Good morning, Mr./Ms. Yamada.",
        explanation: "A common suffix added to names for politeness, equivalent to Mr./Ms./Mrs. Fundamental for polite N5 conversation."
      }
    ]
  },
      // Lesson 2
      {
        id: "lesson-2",
        title: "Lesson 2",
        points: [
          {
            pattern: "これ/それ/あれ は N です",
            japanese: "これは<ruby><rb>本</rb><rt>ほん</rt></ruby>です。",
            romaji: "Kore wa hon desu.",
            english: "This is a book.",
            explanation: "Demonstrative pronouns: 'これ' (kore - this, near speaker), 'それ' (sore - that, near listener), 'あれ' (are - that over there, far from both). Core N5 vocabulary and grammar."
          },
          {
            pattern: "この/その/あの N",
            japanese: "この<ruby><rb>本</rb><rt>ほん</rt></ruby>は<ruby><rb>私</rb><rt>わたし</rt></ruby>のです。",
            romaji: "Kono hon wa watashi no desu.",
            english: "This book is mine.",
            explanation: "Demonstrative adjectives modifying a noun: 'この' (kono - this N), 'その' (sono - that N), 'あの' (ano - that N over there). Essential for N5 identification."
          },
          {
            pattern: "そうです / そうじゃありません",
            japanese: "A: それは<ruby><rb>辞書</rb><rt>じしょ</rt></ruby>ですか。 B: はい、そうです。",
            romaji: "A: Sore wa jisho desu ka. B: Hai, sou desu.",
            english: "A: Is that a dictionary? B: Yes, it is.",
            explanation: "'そうです' (sou desu) affirms the preceding statement. 'そうじゃありません' (sou ja arimasen) negates it. Basic N5 conversational responses."
          },
          {
            pattern: "S1 か、S2 か",
            japanese: "これは「９」ですか、「７」ですか。",
            romaji: "Kore wa 'kyuu' desu ka, 'nana' desu ka.",
            english: "Is this a '9' or a '7'?",
            explanation: "Presents alternatives using 'か' (ka). Useful for clarification, relevant for N5."
          },
          {
            pattern: "N1 の N2 (Attribute/Content)",
            japanese: "これはコンピューターの<ruby><rb>本</rb><rt>ほん</rt></ruby>です。",
            romaji: "Kore wa konpyuutaa no hon desu.",
            english: "This is a book about computers.",
            explanation: "'の' (no) indicates the content or type of N2 (e.g., <ruby><rb>日本語</rb><rt>にほんご</rt></ruby>の<ruby><rb>本</rb><rt>ほん</rt></ruby> - Japanese language book). Important use of の for N5."
          },
          {
              pattern: "そうですか",
              japanese: "A: この<ruby><rb>傘</rb><rt>かさ</rt></ruby>はあなたのですか。 B: いいえ、<ruby><rb>違</rb><rt>ちが</rt></ruby>います。シュミットさんのです。 A: そうですか。",
              romaji: "A: Kono kasa wa anata no desu ka. B: Iie, chigaimasu. Shumitto-san no desu. A: Sou desu ka.",
              english: "A: Is this umbrella yours? B: No, it's not. It's Mr. Schmidt's. A: I see.",
              explanation: "Expresses understanding or acknowledgement of new information ('I see', 'Oh, really?'). Common N5 conversational expression."
          }
        ]
      },
      // Lesson 3
      {
        id: "lesson-3",
        title: "Lesson 3",
        points: [
          {
            pattern: "ここ/そこ/あそこ は Place です",
            japanese: "ここは<ruby><rb>食堂</rb><rt>しょくどう</rt></ruby>です。",
            romaji: "Koko wa shokudou desu.",
            english: "Here is the cafeteria.",
            explanation: "Place demonstratives: 'ここ' (koko - here), 'そこ' (soko - there), 'あそこ' (asoko - over there). Essential N5 location words."
          },
          {
            pattern: "Noun は Place です",
            japanese: "<ruby><rb>電話</rb><rt>でんわ</rt></ruby>はあそこです。",
            romaji: "Denwa wa asoko desu.",
            english: "The telephone is over there.",
            explanation: "Indicates the location of a person or thing. Basic N5 sentence structure for location."
          },
          {
              pattern: "どこ / こちら / そちら / あちら",
              japanese: "<ruby><rb>お手洗</rb><rt>おてあら</rt></ruby>いはどこですか。 ... あそこです。",
              romaji: "Otearai wa doko desu ka. ... Asoko desu.",
              english: "Where is the restroom? ... It's over there.",
              explanation: "'どこ' (doko) asks 'where?'. 'こちら/そちら/あちら' (kochira/sochira/achira) are polite equivalents and also mean 'this way/that way/that way over there'. 'どこ' is fundamental N5, politeness levels are good exposure."
          },
          {
              pattern: "N1 の N2 (Origin/Maker)",
              japanese: "これはどこのコンピューターですか。 ... <ruby><rb>日本</rb><rt>にほん</rt></ruby>のコンピューターです。",
              romaji: "Kore wa doko no konpyuutaa desu ka. ... Nihon no konpyuutaa desu.",
              english: "Where is this computer from? / What make is this computer? ... It's a Japanese computer.",
              explanation: "'の' (no) indicating the origin or manufacturer. 'どこの' asks 'from where?' or 'what make?'. Relevant N5 usage of の and どこ."
          },
          {
              pattern: "お<ruby><rb>国</rb><rt>くに</rt></ruby>はどちらですか", // Added Kanji/Furigana
              japanese: "お<ruby><rb>国</rb><rt>くに</rt></ruby>はどちらですか。 ... アメリカです。",
              romaji: "Okuni wa dochira desu ka. ... Amerika desu.",
              english: "What country are you from? (Polite)",
              explanation: "A polite way to ask someone's home country using the polite question word 'どちら' (dochira). Useful N5 conversational phrase."
          },
          {
            pattern: "〜は いくらですか",
            japanese: "この<ruby><rb>時計</rb><rt>とけい</rt></ruby>はいくらですか。",
            romaji: "Kono tokei wa ikura desu ka.",
            english: "How much is this watch?",
            explanation: "'いくら' (ikura) asks 'how much?' (cost). Essential N5 question word for shopping."
          }
        ]
      },
       // Lesson 4
      {
        id: "lesson-4",
        title: "Lesson 4",
        points: [
          {
              pattern: "<ruby><rb>今</rb><rt>いま</rt></ruby> 〜<ruby><rb>時</rb><rt>じ</rt></ruby> 〜<ruby><rb>分</rb><rt>ふん/ぷん</rt></ruby>です",
              japanese: "<ruby><rb>今</rb><rt>いま</rt></ruby>、<ruby><rb>四時</rb><rt>よじ</rt></ruby><ruby><rb>五分</rb><rt>ごふん</rt></ruby>です。",
              romaji: "Ima, yo-ji go-fun desu.",
              english: "It's 4:05 now.",
              explanation: "Telling time using '〜時' (ji - o'clock) and '〜分' (fun/pun - minute). Fundamental N5 skill."
          },
          {
            pattern: "V-ます / V-ません / V-ました / V-ませんでした",
            japanese: "<ruby><rb>毎朝</rb><rt>まいあさ</rt></ruby><ruby><rb>六時</rb><rt>ろくじ</rt></ruby>に<ruby><rb>起</rb><rt>お</rt></ruby>きます。<ruby><rb>今朝</rb><rt>けさ</rt></ruby>は<ruby><rb>六時半</rb><rt>ろくじはん</rt></ruby>に<ruby><rb>起</rb><rt>お</rt></ruby>きました。",
            romaji: "Maiasa roku-ji ni okimasu. Kesa wa roku-ji han ni okimashita.",
            english: "I get up at 6 every morning. This morning I got up at 6:30.",
            explanation: "Basic polite verb conjugations (present/past, affirmative/negative). The absolute core of N5 verb grammar."
          },
          {
            pattern: "N (time) に V",
            japanese: "<ruby><rb>七月</rb><rt>しちがつ</rt></ruby><ruby><rb>二日</rb><rt>ふつか</rt></ruby>に<ruby><rb>日本</rb><rt>にほん</rt></ruby>へ<ruby><rb>来</rb><rt>き</rt></ruby>ました。",
            romaji: "Shichi-gatsu futsuka ni Nihon e kimashita.",
            english: "I came to Japan on July 2nd.",
            explanation: "The particle 'に' (ni) marks a specific point in time (hour, day, month, year) when an action occurs. Essential N5 particle for time."
          },
          {
            pattern: "N1 から N2 まで",
            japanese: "<ruby><rb>銀行</rb><rt>ぎんこう</rt></ruby>は<ruby><rb>九時</rb><rt>くじ</rt></ruby>から<ruby><rb>三時</rb><rt>さんじ</rt></ruby>までです。",
            romaji: "Ginkou wa ku-ji kara san-ji made desu.",
            english: "The bank is open from 9:00 to 3:00.",
            explanation: "'から' (kara - from), 'まで' (made - until/to). Used for time or spatial ranges. Core N5 particles."
          },
          {
            pattern: "N1 と N2",
            japanese: "<ruby><rb>銀行</rb><rt>ぎんこう</rt></ruby>の<ruby><rb>休</rb><rt>やす</rt></ruby>みは<ruby><rb>土曜日</rb><rt>どようび</rt></ruby>と<ruby><rb>日曜日</rb><rt>にちようび</rt></ruby>です。",
            romaji: "Ginkou no yasumi wa doyoubi to nichiyoubi desu.",
            english: "The bank's holidays are Saturday and Sunday.",
            explanation: "The particle 'と' (to) connects nouns, meaning 'and'. Basic N5 conjunction."
          },
          {
              pattern: "〜ね",
              japanese: "A: <ruby><rb>毎日</rb><rt>まいにち</rt></ruby><ruby><rb>十時</rb><rt>じゅうじ</rt></ruby>ごろまで<ruby><rb>勉強</rb><rt>べんきょう</rt></ruby>します。 B: <ruby><rb>大変</rb><rt>たいへん</rt></ruby>ですね。",
              romaji: "A: Mainichi juu-ji goro made benkyou shimasu. B: Taihen desu ne.",
              english: "A: I study until about 10:00 every day. B: That's tough, isn't it?",
              explanation: "Sentence ending particle 'ね' (ne) seeks confirmation, agreement, or expresses empathy. Common in N5 level conversation."
          }
        ]
      },
        // Lesson 5
        {
          id: "lesson-5",
          title: "Lesson 5",
          points: [
            {
              pattern: "N (place) へ <ruby><rb>行</rb><rt>い</rt></ruby>きます / <ruby><rb>来</rb><rt>き</rt></ruby>ます / <ruby><rb>帰</rb><rt>かえ</rt></ruby>ります",
              japanese: "<ruby><rb>京都</rb><rt>きょうと</rt></ruby>へ<ruby><rb>行</rb><rt>い</rt></ruby>きます。",
              romaji: "Kyouto e ikimasu.",
              english: "I am going to Kyoto.",
              explanation: "Particle 'へ' (e) indicates direction towards a place with verbs of movement (go, come, return). Fundamental N5 grammar for movement."
            },
            {
              pattern: "どこ[へ]も <ruby><rb>行</rb><rt>い</rt></ruby>きません / <ruby><rb>行</rb><rt>い</rt></ruby>きませんでした",
              japanese: "<ruby><rb>昨日</rb><rt>きのう</rt></ruby>はどこへも<ruby><rb>行</rb><rt>い</rt></ruby>きませんでした。",
              romaji: "Kinou wa doko e mo ikimasendeshita.",
              english: "I didn't go anywhere yesterday.",
              explanation: "Question word + 'も' + Negative verb = 'not... anywhere/anything/anyone'. Important N5 pattern for expressing totality in negation."
            },
            {
              pattern: "N (vehicle) で <ruby><rb>行</rb><rt>い</rt></ruby>きます / <ruby><rb>来</rb><rt>き</rt></ruby>ます / <ruby><rb>帰</rb><rt>かえ</rt></ruby>ります",
              japanese: "<ruby><rb>電車</rb><rt>でんしゃ</rt></ruby>で<ruby><rb>大阪</rb><rt>おおさか</rt></ruby>へ<ruby><rb>行</rb><rt>い</rt></ruby>きます。",
              romaji: "Densha de Oosaka e ikimasu.",
              english: "I will go to Osaka by train.",
              explanation: "Particle 'で' (de) indicates the means or method (e.g., transportation). Core N5 particle usage."
            },
            {
              pattern: "N (person/<ruby><rb>動物</rb><rt>どうぶつ</rt></ruby>) と V", // Added 動物
              japanese: "<ruby><rb>家族</rb><rt>かぞく</rt></ruby>と<ruby><rb>日本</rb><rt>にほん</rt></ruby>へ<ruby><rb>来</rb><rt>き</rt></ruby>ました。",
              romaji: "Kazoku to Nihon e kimashita.",
              english: "I came to Japan with my family.",
              explanation: "Particle 'と' (to) indicates the person or animal accompanying the subject. Important N5 usage of と."
            },
            {
                pattern: "いつ",
                japanese: "いつ<ruby><rb>日本</rb><rt>にほん</rt></ruby>へ<ruby><rb>来</rb><rt>き</rt></ruby>ましたか。 ... <ruby><rb>三月</rb><rt>さんがつ</rt></ruby><ruby><rb>二十五日</rb><rt>にじゅうごにち</rt></ruby>に<ruby><rb>来</rb><rt>き</rt></ruby>ました。",
                romaji: "Itsu Nihon e kimashita ka. ... San-gatsu nijuugo-nichi ni kimashita.",
                english: "When did you come to Japan? ... I came on March 25th.",
                explanation: "Question word 'いつ' (itsu) asks 'when?'. Essential N5 question word. Note 'に' marks the specific date."
            },
            {
              pattern: "〜よ",
              japanese: "A: <ruby><rb>明日</rb><rt>あした</rt></ruby><ruby><rb>京都</rb><rt>きょうと</rt></ruby>へ<ruby><rb>行</rb><rt>い</rt></ruby>きますか。 B: いいえ、<ruby><rb>行</rb><rt>い</rt></ruby>きません。<ruby><rb>明後日</rb><rt>あさって</rt></ruby><ruby><rb>行</rb><rt>い</rt></ruby>きますよ。",
              romaji: "A: Ashita Kyouto e ikimasu ka. B: Iie, ikimasen. Asatte ikimasu yo.",
              english: "A: Are you going to Kyoto tomorrow? B: No, I'm not. I'm going the day after tomorrow!",
              explanation: "Sentence ending particle 'よ' (yo) provides new information or emphasis. Common in N5 level conversation."
            }
          ]
        },
        // Lesson 6
        {
          id: "lesson-6",
          title: "Lesson 6",
          points: [
            {
              pattern: "N を V (transitive)",
              japanese: "ジュースを<ruby><rb>飲</rb><rt>の</rt></ruby>みます。",
              romaji: "Juusu o nomimasu.",
              english: "I drink juice.",
              explanation: "Particle 'を' (o/wo) marks the direct object of a transitive verb. Absolutely fundamental N5 particle."
            },
            {
              pattern: "N を します",
              japanese: "サッカーをします。",
              romaji: "Sakkaa o shimasu.",
              english: "I play soccer.",
              explanation: "'します' (shimasu - to do) is used with nouns for activities like sports, games, events. Very common N5 pattern."
            },
            {
              pattern: "<ruby><rb>何</rb><rt>なに</rt></ruby> を しますか",
              japanese: "<ruby><rb>月曜日</rb><rt>げつようび</rt></ruby><ruby><rb>何</rb><rt>なに</rt></ruby>をしますか。",
              romaji: "Getsuyoubi nani o shimasu ka.",
              english: "What will you do on Monday?",
              explanation: "'何' (nani/nan - what) with 'を' asks about the object of an action. Essential N5 question structure."
            },
            {
              pattern: "N (place) で V",
              japanese: "<ruby><rb>駅</rb><rt>えき</rt></ruby>で<ruby><rb>新聞</rb><rt>しんぶん</rt></ruby>を<ruby><rb>買</rb><rt>か</rt></ruby>います。",
              romaji: "Eki de shinbun o kaimasu.",
              english: "I buy a newspaper at the station.",
              explanation: "Particle 'で' (de) indicates the location where an action takes place. Core N5 particle usage."
            },
            {
              pattern: "V-ませんか",
              japanese: "<ruby><rb>一緒</rb><rt>いっしょ</rt></ruby>にビールを<ruby><rb>飲</rb><rt>の</rt></ruby>みませんか。",
              romaji: "Issho ni biiru o nomimasen ka.",
              english: "Won't you drink beer together? / How about drinking beer together?",
              explanation: "Polite invitation form ('Won't you...?'). Very useful N5 pattern."
            },
            {
              pattern: "V-ましょう",
              japanese: "ちょっと<ruby><rb>休</rb><rt>やす</rt></ruby>みましょう。",
              romaji: "Chotto yasumimashou.",
              english: "Let's take a short break.",
              explanation: "Volitional form ('Let's...'). Used for suggesting actions or responding positively to invitations. Key N5 grammar."
            },
            {
                pattern: "<ruby><rb>何</rb><rt>なに</rt></ruby>か Vますか", // Changed pattern to be more specific
                japanese: "<ruby><rb>何</rb><rt>なに</rt></ruby>か<ruby><rb>食</rb><rt>た</rt></ruby>べますか。",
                romaji: "Nani ka tabemasu ka.",
                english: "Will you eat something?",
                explanation: "Question word + 'か' creates indefinite pronouns: 何か (nanika - something), どこか (dokoka - somewhere), だれか (dareka - someone), いつか (itsuka - sometime). Important N5 pattern."
            }
          ]
        },
        // Lesson 7
        {
          id: "lesson-7",
          title: "Lesson 7",
          points: [
            {
              pattern: "N (tool/means) で V",
              japanese: "はしで<ruby><rb>食</rb><rt>た</rt></ruby>べます。",
              romaji: "Hashi de tabemasu.",
              english: "I eat with chopsticks.",
              explanation: "Particle 'で' (de) indicates the tool, method, or means used for an action. Important N5 use of 'で'."
            },
            {
              pattern: "Word/Sentence は 〜<ruby><rb>語</rb><rt>ご</rt></ruby>で <ruby><rb>何</rb><rt>なん</rt></ruby>ですか",
              japanese: "「ありがとう」は<ruby><rb>英語</rb><rt>えいご</rt></ruby>で<ruby><rb>何</rb><rt>なん</rt></ruby>ですか。",
              romaji: "'Arigatou' wa Eigo de nan desu ka.",
              english: "What is 'Arigatou' in English?",
              explanation: "Asking how to say something in another language. Useful N5 question pattern."
            },
            {
              pattern: "N (person) に あげます",
              japanese: "<ruby><rb>山田</rb><rt>やまだ</rt></ruby>さんは<ruby><rb>木村</rb><rt>きむら</rt></ruby>さんに<ruby><rb>花</rb><rt>はな</rt></ruby>をあげました。",
              romaji: "Yamada-san wa Kimura-san ni hana o agemashita.",
              english: "Mr. Yamada gave flowers to Ms. Kimura.",
              explanation: "'あげます' (agemasu - to give) used when the giver/receiver are third parties or the speaker gives to others. 'に' marks the recipient. Core N5 verb of giving."
            },
            {
              pattern: "N (person) に もらいます",
              japanese: "<ruby><rb>私</rb><rt>わたし</rt></ruby>は<ruby><rb>木村</rb><rt>きむら</rt></ruby>さんに<ruby><rb>花</rb><rt>はな</rt></ruby>をもらいました。",
              romaji: "Watashi wa Kimura-san ni hana o moraimashita.",
              english: "I received flowers from Ms. Kimura.",
              explanation: "'もらいます' (moraimasu - to receive). 'に' marks the giver. Core N5 verb of receiving."
            },
            {
              pattern: "もう V-ました",
              japanese: "もう<ruby><rb>荷物</rb><rt>にもつ</rt></ruby>を<ruby><rb>送</rb><rt>おく</rt></ruby>りましたか。 ... はい、もう<ruby><rb>送</rb><rt>おく</rt></ruby>りました。",
              romaji: "Mou nimotsu o okurimashita ka. ... Hai, mou okurimashita.",
              english: "Have you sent the luggage already? ... Yes, I've already sent it.",
              explanation: "'もう' (mou - already) used with the past tense (V-ました). Important N5 adverb."
            },
            {
                pattern: "まだです / まだ V-ていません", // Added V-te imasen option
                japanese: "もう<ruby><rb>昼</rb><rt>ひる</rt></ruby>ごはんを<ruby><rb>食</rb><rt>た</rt></ruby>べましたか。 ... いいえ、まだです。(or いいえ、まだ<ruby><rb>食</rb><rt>た</rt></ruby>べていません。)",
                romaji: "Mou hirugohan o tabemashita ka. ... Iie, mada desu. (or Iie, mada tabete imasen.)",
                english: "Have you eaten lunch already? ... No, not yet.",
                explanation: "'まだです' (mada desu - not yet) is a common N5 response. 'まだ + V-te imasen' (mada + negative continuous) also means 'haven't done yet' and is N5 relevant."
            }
          ]
        },
         // Lesson 8
        {
          id: "lesson-8",
          title: "Lesson 8",
          points: [
            {
              pattern: "い-adjective (い) です",
              japanese: "<ruby><rb>富士山</rb><rt>ふじさん</rt></ruby>は<ruby><rb>高</rb><rt>たか</rt></ruby>いです。",
              romaji: "Fujisan wa takai desu.",
              english: "Mt. Fuji is high.",
              explanation: "Basic sentence structure with い-adjectives (ending in い). Adjective keeps final い before です. Fundamental N5 grammar."
            },
            {
              pattern: "な-adjective です", // Removed (な) for clarity before です
              japanese: "<ruby><rb>奈良公園</rb><rt>ならこうえん</rt></ruby>は<ruby><rb>静</rb><rt>しず</rt></ruby>かです。",
              romaji: "Nara Kouen wa shizuka desu.",
              english: "Nara Park is quiet.",
              explanation: "Basic sentence structure with な-adjectives. The な is NOT used before です. Fundamental N5 grammar."
            },
            {
              pattern: "い-adjective + Noun",
              japanese: "これは<ruby><rb>高</rb><rt>たか</rt></ruby>い<ruby><rb>山</rb><rt>やま</rt></ruby>です。",
              romaji: "Kore wa takai yama desu.",
              english: "This is a high mountain.",
              explanation: "い-adjectives directly modify nouns, keeping the final 'い'. Core N5 noun modification."
            },
            {
              pattern: "な-adjective + な + Noun",
              japanese: "ミラーさんは<ruby><rb>親切</rb><rt>しんせつ</rt></ruby>な<ruby><rb>人</rb><rt>ひと</rt></ruby>です。",
              romaji: "Miraa-san wa shinsetsu na hito desu.",
              english: "Mr. Miller is a kind person.",
              explanation: "な-adjectives require 'な' (na) when modifying a noun directly. Core N5 noun modification."
            },
            {
                pattern: "とても / あまり + Adjective",
                japanese: [
                    "<ruby><rb>北京</rb><rt>ぺキン</rt></ruby>はとても<ruby><rb>寒</rb><rt>さむ</rt></ruby>いです。",
                    "この<ruby><rb>本</rb><rt>ほん</rt></ruby>はあまり<ruby><rb>面白</rb><rt>おもしろ</rt></ruby>くないです。"
                ],
                romaji: [
                    "Pekin wa totemo samui desu.",
                    "Kono hon wa amari omoshirokunai desu."
                ],
                english: [
                    "Beijing is very cold.",
                    "This book is not very interesting."
                ],
                explanation: "'とても' (totemo - very) with affirmative adjectives. 'あまり' (amari - not very) with negative adjectives/verbs. Essential N5 adverbs of degree."
            },
            {
              pattern: "N は どうですか",
              japanese: "<ruby><rb>日本</rb><rt>にほん</rt></ruby>の<ruby><rb>生活</rb><rt>せいかつ</rt></ruby>はどうですか。 ... <ruby><rb>楽</rb><rt>たの</rt></ruby>しいです。",
              romaji: "Nihon no seikatsu wa dou desu ka. ... Tanoshii desu.",
              english: "How is life in Japan? ... It's enjoyable.",
              explanation: "'どうですか' (dou desu ka) asks for an opinion or impression. Useful N5 question phrase."
            },
            {
              pattern: "S1 が、S2",
              japanese: "<ruby><rb>日本</rb><rt>にほん</rt></ruby>の<ruby><rb>食</rb><rt>た</rt></ruby>べ<ruby><rb>物</rb><rt>もの</rt></ruby>はおいしいですが、<ruby><rb>高</rb><rt>たか</rt></ruby>いです。",
              romaji: "Nihon no tabemono wa oishii desu ga, takai desu.",
              english: "Japanese food is delicious, but expensive.",
              explanation: "Particle 'が' (ga) connects clauses, often indicating contrast ('but'). Important N5 conjunction."
            },
            {
                pattern: "どれ",
                japanese: "ミラーさんの<ruby><rb>傘</rb><rt>かさ</rt></ruby>はどれですか。 ... あの<ruby><rb>青</rb><rt>あお</rt></ruby>い<ruby><rb>傘</rb><rt>かさ</rt></ruby>です。",
                romaji: "Miraa-san no kasa wa dore desu ka. ... Ano aoi kasa desu.",
                english: "Which one is Mr. Miller's umbrella? ... It's that blue one.",
                explanation: "'どれ' (dore) asks 'which one?' (from three or more). N5 relevant question word for selection."
            }
          ]
        },
         // Lesson 9
        {
          id: "lesson-9",
          title: "Lesson 9",
          points: [
            {
              pattern: "N が あります / わかります / <ruby><rb>好</rb><rt>す</rt></ruby>きです / <ruby><rb>嫌</rb><rt>きら</rt></ruby>いです / <ruby><rb>上手</rb><rt>じょうず</rt></ruby>です / <ruby><rb>下手</rb><rt>へた</rt></ruby>です", // Expanded pattern
              japanese: "<ruby><rb>私</rb><rt>わたし</rt></ruby>はイタリア<ruby><rb>料理</rb><rt>りょうり</rt></ruby>が<ruby><rb>好</rb><rt>す</rt></ruby>きです。",
              romaji: "Watashi wa Itaria ryouri ga suki desu.",
              english: "I like Italian food.",
              examples: [ // Keep extra examples here for clarity
                {
                  japanese: "<ruby><rb>私</rb><rt>わたし</rt></ruby>はコンピューターがあります。",
                  romaji: "Watashi wa konpyuutaa ga arimasu.",
                  english: "I have a computer."
                },
                {
                  japanese: "<ruby><rb>私</rb><rt>わたし</rt></ruby>は<ruby><rb>日本語</rb><rt>にほんご</rt></ruby>が<ruby><rb>少</rb><rt>すこ</rt></ruby>しわかります。",
                  romaji: "Watashi wa Nihongo ga sukoshi wakarimasu.",
                  english: "I understand Japanese a little."
                }
              ],
              explanation: "Particle 'が' (ga) marks the object for verbs like あります (have/exist), わかります (understand), and for adjectives like 好き (like), 嫌い (dislike), 上手 (good at), 下手 (poor at). Critical N5 pattern."
            },
            {
                pattern: "どんな N",
                japanese: "どんなスポーツが<ruby><rb>好</rb><rt>す</rt></ruby>きですか。 ... サッカーが<ruby><rb>好</rb><rt>す</rt></ruby>きです。",
                romaji: "Donna supootsu ga suki desu ka. ... Sakkaa ga suki desu.",
                english: "What kind of sports do you like? ... I like soccer.",
                explanation: "'どんな' (donna) asks 'what kind of?'. Useful N5 question word."
            },
            {
                pattern: "よく / <ruby><rb>大体</rb><rt>だいたい</rt></ruby> / たくさん / <ruby><rb>少</rb><rt>すこ</rt></ruby>し / あまり / <ruby><rb>全然</rb><rt>ぜんぜん</rt></ruby> + V/Adj",
                japanese: [
                    "<ruby><rb>英語</rb><rt>えいご</rt></ruby>がよくわかります。",
                    "お<ruby><rb>金</rb><rt>かね</rt></ruby>がたくさんあります。",
                    "<ruby><rb>時間</rb><rt>じかん</rt></ruby>が<ruby><rb>全然</rb><rt>ぜんぜん</rt></ruby>ありません。"
                ],
                romaji: [
                    "Eigo ga yoku wakarimasu.",
                    "Okane ga takusan arimasu.",
                    "Jikan ga zenzen arimasen."
                ],
                english: [
                    "I understand English well.",
                    "I have a lot of money.",
                    "I don't have any time at all."
                ],
                explanation: "Adverbs of degree/quantity: よく (well, often), 大体 (mostly), たくさん (many/much), 少し (a little), あまり (not much [with neg.]), 全然 (not at all [with neg.]). All are important N5 adverbs."
            },
            {
                pattern: "S1 から、S2",
                japanese: "<ruby><rb>時間</rb><rt>じかん</rt></ruby>がないですから、<ruby><rb>新聞</rb><rt>しんぶん</rt></ruby>を<ruby><rb>読</rb><rt>よ</rt></ruby>みません。", // Using plain form ない before ですから is common style, but ありません works too. Keep as is for MNN style.
                romaji: "Jikan ga arimasen kara, shinbun o yomimasen.", // Adjusted Romaji to match original Japanese example style
                english: "Because I don't have time, I don't read the newspaper.",
                explanation: "'から' (kara) at the end of the first clause indicates the reason or cause for S2. Essential N5 conjunction for reason."
            },
            {
                pattern: "どうして",
                japanese: "どうして<ruby><rb>昨日</rb><rt>きのう</rt></ruby><ruby><rb>早</rb><rt>はや</rt></ruby>く<ruby><rb>帰</rb><rt>かえ</rt></ruby>りましたか。 ... <ruby><rb>用事</rb><rt>ようじ</rt></ruby>がありましたから。",
                romaji: "Doushite kinou hayaku kaerimashita ka. ... Youji ga arimashita kara.",
                english: "Why did you go home early yesterday? ... Because I had an errand/business.",
                explanation: "'どうして' (doushite) asks 'why?'. Answer often ends in '〜から です'. Fundamental N5 question word."
            }
          ]
        },
          // Lesson 10
        {
          id: "lesson-10",
          title: "Lesson 10",
          points: [
            {
              pattern: "N が います / あります",
              japanese: [
                "あそこに<ruby><rb>男</rb><rt>おとこ</rt></ruby>の<ruby><rb>子</rb><rt>こ</rt></ruby>がいます。",
                "<ruby><rb>庭</rb><rt>にわ</rt></ruby>に<ruby><rb>木</rb><rt>き</rt></ruby>があります。"
              ],
              romaji: [
                "Asoko ni otoko no ko ga imasu.",
                "Niwa ni ki ga arimasu."
              ],
              english: [
                "There is a boy over there.",
                "There is a tree in the garden."
              ],
              explanation: "Existence: 'います' (imasu) for animate (people, animals), 'あります' (arimasu) for inanimate (objects, plants). 'が' marks the thing that exists. Core N5 concept."
            },
            {
              pattern: "Place に N が あります / います",
              japanese: "<ruby><rb>事務所</rb><rt>じむしょ</rt></ruby>にミラーさんがいます。",
              romaji: "Jimusho ni Miraa-san ga imasu.",
              english: "Mr. Miller is in the office.",
              explanation: "Specifies location of existence. 'に' (ni) marks the location. Fundamental N5 pattern for location + existence."
            },
            {
              pattern: "N (thing/person/place) の N (position)",
              japanese: "<ruby><rb>机</rb><rt>つくえ</rt></ruby>の<ruby><rb>上</rb><rt>うえ</rt></ruby>に<ruby><rb>写真</rb><rt>しゃしん</rt></ruby>があります。",
              romaji: "Tsukue no ue ni shashin ga arimasu.",
              english: "There is a photograph on the desk.",
              explanation: "Using position words (上 ue-on, 下 shita-under, 前 mae-front, 後ろ ushiro-behind, 右 migi-right, 左 hidari-left, 中 naka-inside, 外 soto-outside, 隣 tonari-next to, 近く chikaku-near, 間 aida-between) with 'の' to specify relative location. Essential N5 vocabulary and structure."
            },
            {
              pattern: "N1 や N2 [など]", // Added など
              japanese: "<ruby><rb>箱</rb><rt>はこ</rt></ruby>の<ruby><rb>中</rb><rt>なか</rt></ruby>に<ruby><rb>手紙</rb><rt>てがみ</rt></ruby>や<ruby><rb>写真</rb><rt>しゃしん</rt></ruby>があります。",
              romaji: "Hako no naka ni tegami ya shashin ga arimasu.",
              english: "There are letters, photos, and other things in the box.",
              explanation: "'や' (ya) lists examples non-exhaustively ('and so on'). Often used with 'など' (nado - etc.). Relevant N5 particle for listing."
            },
            {
                pattern: "〜はありますか (Asking Existence)", // Renamed for clarity
                japanese: "すみません、<ruby><rb>切手</rb><rt>きって</rt></ruby>はありますか。",
                romaji: "Sumimasen, kitte wa arimasu ka.",
                english: "Excuse me, do you have stamps?",
                explanation: "Common way to ask if something is available, especially in shops. Uses は to mark the topic being inquired about. Practical N5 usage."
            },
            {
                pattern: "Locating Items (Shop Context)", // Changed pattern name
                japanese: "チリソースはありますか。 ... はい、[ええと、]あそこにあります。", // Kept original example
                romaji: "Chirisōsu wa arimasu ka. ... Hai, [eeto,] asoko ni arimasu.",
                english: "Do you have chili sauce? ... Yes, [uh,] it's over there.",
                explanation: "Demonstrates practical N5 conversation using あります/います and location words to ask for and find items."
            }
          ]
        },
         // Lesson 11
        {
          id: "lesson-11",
          title: "Lesson 11",
          points: [
            {
              pattern: "Counter Suffixes",
              japanese: [
                "りんごを<ruby><rb>四</rb><rt>よっ</rt></ruby>つ<ruby><rb>買</rb><rt>か</rt></ruby>いました。",
                "<ruby><rb>切手</rb><rt>きって</rt></ruby>を<ruby><rb>五枚</rb><rt>ごまい</rt></ruby>ください。",
                "<ruby><rb>外国人</rb><rt>がいこくじん</rt></ruby>の<ruby><rb>学生</rb><rt>がくせい</rt></ruby>が<ruby><rb>二人</rb><rt>ふたり</rt></ruby>います。"
              ],
              romaji: [
                "Ringo o yottsu kaimashita.",
                "Kitte o go-mai kudasai.",
                "Gaikokujin no gakusei ga futari imasu."
              ],
              english: [
                "I bought four apples.",
                "Please give me five stamps.",
                "There are two foreign students."
              ],
              explanation: "Using counters (〜つ general, 〜人 nin/ri people, 〜台 dai machines/vehicles, 〜枚 mai flat objects, 〜回 kai frequency, etc.) with numbers. Essential N5 skill for counting."
            },
            {
              pattern: "Frequency: Period に 〜<ruby><rb>回</rb><rt>かい</rt></ruby> V",
              japanese: "１か<ruby><rb>月</rb><rt>げつ</rt></ruby>に２<ruby><rb>回</rb><rt>かい</rt></ruby><ruby><rb>映画</rb><rt>えいが</rt></ruby>を<ruby><rb>見</rb><rt>み</rt></ruby>ます。",
              romaji: "Ikkagetsu ni ni-kai eiga o mimasu.",
              english: "I watch movies twice a month.",
              explanation: "Expressing frequency using a time period + 'に' (ni) + frequency counter (〜回 kai). Important N5 pattern."
            },
            {
              pattern: "Noun/Quantity だけ", // Simplified pattern name
              japanese: "<ruby><rb>休</rb><rt>やす</rt></ruby>みは<ruby><rb>日曜日</rb><rt>にちようび</rt></ruby>だけです。",
              romaji: "Yasumi wa Nichiyoubi dake desu.",
              english: "The only day off is Sunday.",
              explanation: "'だけ' (dake) means 'only' or 'just', limiting the noun or quantity it follows. Important N5 particle."
            },
             {
                pattern: "どのくらい (Duration/Quantity)",
                japanese: "どのくらい<ruby><rb>日本語</rb><rt>にほんご</rt></ruby>を<ruby><rb>勉強</rb><rt>べんきょう</rt></ruby>しましたか。 ... ３か<ruby><rb>月</rb><rt>げつ</rt></ruby><ruby><rb>勉強</rb><rt>べんきょう</rt></ruby>しました。",
                romaji: "Dono kurai Nihongo o benkyou shimashita ka. ... San-kagetsu benkyou shimashita.",
                english: "How long did you study Japanese? ... I studied for three months.",
                explanation: "'どのくらい' (dono kurai) asks 'how long?' (duration) or 'how much/many?' (quantity). Key N5 question phrase."
            },
            {
                pattern: "Number + Counter + ぐらい/くらい (Approximation)",
                japanese: "<ruby><rb>大阪</rb><rt>おおさか</rt></ruby>から<ruby><rb>東京</rb><rt>とうきょう</rt></ruby>まで<ruby><rb>新幹線</rb><rt>しんかんせん</rt></ruby>で２<ruby><rb>時間半</rb><rt>じかんはん</rt></ruby>ぐらいかかります。",
                romaji: "Oosaka kara Toukyou made Shinkansen de ni-jikan han gurai kakarimasu.",
                english: "It takes about two and a half hours from Osaka to Tokyo by Shinkansen.",
                explanation: "'ぐらい/くらい' (gurai/kurai) means 'approximately' or 'about' after a quantity or duration. Useful N5 expression."
            }
          ]
        },
        // Lesson 12
        {
          id: "lesson-12",
          title: "Lesson 12",
          points: [
            {
              pattern: "い-adj Past: 〜かったです",
              japanese: "<ruby><rb>昨日</rb><rt>きのう</rt></ruby>は<ruby><rb>暑</rb><rt>あつ</rt></ruby>かったです。",
              romaji: "Kinou wa atsukatta desu.",
              english: "It was hot yesterday.",
              explanation: "Past tense of い-adjectives: change final 'い' (i) to 'かった' (katta). Fundamental N5 conjugation."
            },
            {
              pattern: "な-adj/Noun Past: 〜でした",
              japanese: [
                "<ruby><rb>昨日</rb><rt>きのう</rt></ruby>の<ruby><rb>試験</rb><rt>しけん</rt></ruby>は<ruby><rb>簡単</rb><rt>かんたん</rt></ruby>でした。",
                "<ruby><rb>昨日</rb><rt>きのう</rt></ruby>は<ruby><rb>雨</rb><rt>あめ</rt></ruby>でした。"
              ],
              romaji: [
                "Kinou no shiken wa kantan deshita.",
                "Kinou wa ame deshita."
              ],
              english: [
                "Yesterday's exam was easy.",
                "It was rainy yesterday."
              ],
              explanation: "Past tense of な-adjectives and Noun + です sentences: change 'です' (desu) to 'でした' (deshita). Fundamental N5 conjugation."
            },
             {
              pattern: "い-adj Past Neg: 〜くなかったです",
              japanese: "お<ruby><rb>祭</rb><rt>まつ</rt></ruby>りはあまり<ruby><rb>楽</rb><rt>たの</rt></ruby>しくなかったです。",
              romaji: "Omatsuri wa amari tanoshikunakatta desu.",
              english: "The festival wasn't very fun.",
              explanation: "Past negative of い-adjectives: change 'い' (i) to 'くなかった' (kunakatta) + です. Core N5 conjugation."
            },
            {
              pattern: "な-adj/Noun Past Neg: 〜じゃありませんでした",
              japanese: [
                "<ruby><rb>奈良</rb><rt>なら</rt></ruby>はあまり<ruby><rb>静</rb><rt>しず</rt></ruby>かじゃありませんでした。",
                "<ruby><rb>昨日</rb><rt>きのう</rt></ruby>は<ruby><rb>休</rb><rt>やす</rt></ruby>みじゃありませんでした。"
              ],
              romaji: [
                "Nara wa amari shizuka ja arimasen deshita.",
                "Kinou wa yasumi ja arimasen deshita."
              ],
              english: [
                "Nara wasn't very quiet.",
                "Yesterday wasn't a holiday."
              ],
              explanation: "Past negative of な-adjectives and Nouns: change 'です' to 'じゃありませんでした' (or 'ではありませんでした' - formal). Core N5 conjugation."
            },
            {
              pattern: "N1 は N2 より Adjective です",
              japanese: "この<ruby><rb>車</rb><rt>くるま</rt></ruby>はあの<ruby><rb>車</rb><rt>くるま</rt></ruby>より<ruby><rb>大</rb><rt>おお</rt></ruby>きいです。",
              romaji: "Kono kuruma wa ano kuruma yori ookii desu.",
              english: "This car is bigger than that car.",
              explanation: "Comparative structure using 'より' (yori - than). Essential N5 comparison pattern."
            },
            {
              pattern: "N1 と N2 と どちらが Adj ですか",
              japanese: "サッカーと<ruby><rb>野球</rb><rt>やきゅう</rt></ruby>とどちらがおもしろいですか。",
              romaji: "Sakkaa to yakyuu to dochira ga omoshiroi desu ka.",
              english: "Which is more interesting, soccer or baseball?",
              explanation: "Asking for comparison between two items using 'どちら' (dochira - which of two). Key N5 question pattern."
            },
            {
              pattern: "(N1/N2) のほうが Adj です",
              japanese: "サッカーのほうがおもしろい。", // Example simplified slightly
              romaji: "Sakkaa no hou ga omoshiroi desu.", // Romaji corrected
              english: "Soccer is more interesting.",
              explanation: "Answering a 'どちらが〜' question, stating preference/comparison result using '〜のほう' (no hou - the side/alternative of). Key N5 response pattern."
            },
            {
              pattern: "N [の<ruby><rb>中</rb><rt>なか</rt></ruby>]で {<ruby><rb>何</rb><rt>なに</rt></ruby>/どこ/だれ/いつ} が いちばん Adj ですか",
              japanese: [
                "<ruby><rb>家族</rb><rt>かぞく</rt></ruby>の<ruby><rb>中</rb><rt>なか</rt></ruby>でだれがいちばん<ruby><rb>背</rb><rt>せ</rt></ruby>が<ruby><rb>高</rb><rt>たか</rt></ruby>いですか。",
                "<ruby><rb>日本料理</rb><rt>にほんりょうり</rt></ruby>[の<ruby><rb>中</rb><rt>なか</rt></ruby>]で<ruby><rb>何</rb><rt>なに</rt></ruby>がいちばんおいしいですか。"
              ],
              romaji: [
                "Kazoku no naka de dare ga ichiban se ga takai desu ka.",
                "Nihon ryouri [no naka] de nani ga ichiban oishii desu ka."
              ],
              english: [
                "Who is the tallest in your family?",
                "What is the most delicious Japanese food?"
              ],
              explanation: "Superlative structure using 'いちばん' (ichiban - the most) within a category (N). Essential N5 comparison pattern."
            },
            {
                pattern: "N が いちばん Adj です",
                japanese: "<ruby><rb>天</rb><rt>てん</rt></ruby>ぷらがいちばんおいしいです。",
                romaji: "Tenpura ga ichiban oishii desu.",
                english: "Tempura is the most delicious.",
                explanation: "Answer to the superlative question. N5 relevant response pattern."
            }
          ]
        },
         // Lesson 13
        {
          id: "lesson-13",
          title: "Lesson 13",
          points: [
            {
              pattern: "N が <ruby><rb>欲</rb><rt>ほ</rt></ruby>しいです",
              japanese: "<ruby><rb>私</rb><rt>わたし</rt></ruby>は<ruby><rb>友達</rb><rt>ともだち</rt></ruby>が<ruby><rb>欲</rb><rt>ほ</rt></ruby>しいです。",
              romaji: "Watashi wa tomodachi ga hoshii desu.",
              english: "I want friends.",
              explanation: "'欲しい' (hoshii - want [something]) is an い-adjective. Desired object marked with 'が' (ga). Important N5 pattern for expressing desires."
            },
            {
              pattern: "V-ます form たいです",
              japanese: "<ruby><rb>私</rb><rt>わたし</rt></ruby>は<ruby><rb>沖縄</rb><rt>おきなわ</rt></ruby>へ<ruby><rb>行</rb><rt>い</rt></ruby>きたいです。",
              romaji: "Watashi wa Okinawa e ikitai desu.",
              english: "I want to go to Okinawa.",
              explanation: "Expresses speaker's desire to do something. Change V-ます (masu) to V-たい (tai). Conjugates like い-adj. Core N5 pattern for desires."
            },
            {
                pattern: "N (place) へ { V-ます stem / Noun } に <ruby><rb>行</rb><rt>い</rt></ruby>きます/<ruby><rb>来</rb><rt>き</rt></ruby>ます/<ruby><rb>帰</rb><rt>かえ</rt></ruby>ります",
                japanese: [
                    "<ruby><rb>神戸</rb><rt>こうべ</rt></ruby>へ<ruby><rb>買</rb><rt>か</rt></ruby>い<ruby><rb>物</rb><rt>もの</rt></ruby>に<ruby><rb>行</rb><rt>い</rt></ruby>きます。", // Noun purpose
                    "デパートへ<ruby><rb>服</rb><rt>ふく</rt></ruby>を<ruby><rb>買</rb><rt>か</rt></ruby>いに<ruby><rb>行</rb><rt>い</rt></ruby>きます。"  // Verb stem purpose
                ],
                romaji: [
                    "Koube e kaimono ni ikimasu.",
                    "Depaato e fuku o kai ni ikimasu."
                ],
                english: [
                    "I am going to Kobe for shopping.",
                    "I am going to the department store to buy clothes."
                ],
                explanation: "Indicates the purpose of movement using 'に' (ni). Purpose can be a noun (like 買い物 shopping) or V-stem (like 買い to buy). Essential N5 pattern."
            },
             {
                pattern: "どこか / <ruby><rb>何</rb><rt>なに</rt></ruby>か (Indefinite Place/Thing)",
                japanese: [
                    "のどが<ruby><rb>渇</rb><rt>かわ</rt></ruby>きましたから、<ruby><rb>何</rb><rt>なに</rt></ruby>か<ruby><rb>飲</rb><rt>の</rt></ruby>みたいです。",
                    "<ruby><rb>冬休</rb><rt>ふゆやす</rt></ruby>みはどこか<ruby><rb>行</rb><rt>い</rt></ruby>きましたか。"
                ],
                romaji: [
                    "Nodo ga kawakimashita kara, nani ka nomitai desu.",
                    "Fuyuyasumi wa dokoka ikimashita ka."
                ],
                english: [
                    "Because I'm thirsty, I want to drink something.",
                    "Did you go somewhere during the winter vacation?"
                ],
                explanation: "Question word + か: 何か (nanika - something), どこか (dokoka - somewhere). Indicates unspecified thing/place. Important N5 vocabulary."
            }
          ]
        },
        // Lesson 14
        {
          id: "lesson-14",
          title: "Lesson 14",
          points: [
            {
              pattern: "V-て form",
              japanese: "<ruby><rb>食</rb><rt>た</rt></ruby>べて, <ruby><rb>飲</rb><rt>の</rt></ruby>んで, <ruby><rb>書</rb><rt>か</rt></ruby>いて, <ruby><rb>急</rb><rt>いそ</rt></ruby>いで, <ruby><rb>待</rb><rt>ま</rt></ruby>って...",
              romaji: "tabete, nonde, kaite, isoide, matte...",
              english: "(Various 'te-forms')",
              explanation: "The 'te-form' is crucial for requests, connecting clauses, sequence, permission, ongoing actions, etc. Formation rules vary by verb group. Absolutely essential N5 conjugation."
            },
            {
              pattern: "V-て ください",
              japanese: "ちょっと<ruby><rb>待</rb><rt>ま</rt></ruby>ってください。",
              romaji: "Chotto matte kudasai.",
              english: "Please wait a moment.",
              explanation: "Polite request or instruction ('Please do...'). Fundamental N5 pattern."
            },
            {
              pattern: "V-て います (Action in Progress)",
              japanese: "ミラーさんは<ruby><rb>今</rb><rt>いま</rt></ruby><ruby><rb>電話</rb><rt>でんわ</rt></ruby>をかけています。",
              romaji: "Miraa-san wa ima denwa o kakete imasu.",
              english: "Mr. Miller is making a phone call now.",
              explanation: "Indicates action in progress ('-ing' in English). Core N5 grammatical use of te-form."
               },
            {
              pattern: "V-て もいいですか",
              japanese: "<ruby><rb>写真</rb><rt>しゃしん</rt></ruby>を<ruby><rb>撮</rb><rt>と</rt></ruby>ってもいいですか。",
              romaji: "Shashin o totte mo ii desu ka.",
              english: "May I take a picture?",
              explanation: "Asking for permission ('May I...?'). Important N5 pattern."
            },
            {
              pattern: "V-て は いけません",
              japanese: "ここでタバコを<ruby><rb>吸</rb><rt>す</rt></ruby>ってはいけません。",
              romaji: "Koko de tabako o sutte wa ikemasen.",
              english: "You must not smoke here.",
              explanation: "Indicates prohibition ('must not do'). Stronger than V-ないでください. Important N5 pattern for rules/prohibitions."
            },
            {
                pattern: "V-て います (Resultant State)",
                japanese: [
                    "<ruby><rb>私</rb><rt>わたし</rt></ruby>は<ruby><rb>結婚</rb><rt>けっこん</rt></ruby>しています。",
                    "<ruby><rb>私</rb><rt>わたし</rt></ruby>は<ruby><rb>大阪</rb><rt>おおさか</rt></ruby>に<ruby><rb>住</rb><rt>す</rt></ruby>んでいます。"
                ],
                romaji: [
                    "Watashi wa kekkon shite imasu.",
                    "Watashi wa Oosaka ni sunde imasu."
                ],
                english: [
                    "I am married.",
                    "I live in Osaka."
                ],
                explanation: "For certain verbs (知る know, 住む live, 持つ own, 結婚する marry, etc.), V-て います indicates a continuing state resulting from a past action. Key N5 nuance of te-form."
            }
          ]
        },
        // Lesson 15
         {
          id: "lesson-15",
          title: "Lesson 15",
          points: [
            { // Focus on Permission Granting
              pattern: "V-て も いいです (Granting Permission)",
              japanese: "このカタログをもらってもいいですか。 ... ええ、いいですよ。どうぞ。",
              romaji: "Kono katarogu o moratte mo ii desu ka. ... Ee, ii desu yo. Douzo.",
              english: "May I have this catalogue? ... Yes, you may. Go ahead.",
              explanation: "Granting permission in response to V-て も いいですか. Important N5 interaction pattern."
            },
             { // Reiteration of Prohibition
              pattern: "V-て は いけません (Prohibition)",
              japanese: "ここで<ruby><rb>写真</rb><rt>しゃしん</rt></ruby>を<ruby><rb>撮</rb><rt>と</rt></ruby>ってはいけません。",
              romaji: "Koko de shashin o totte wa ikemasen.",
              english: "You must not take pictures here.",
              explanation: "Reiteration of the prohibition pattern. Important for understanding rules at N5 level."
            },
             { // Focus on State/Occupation
              pattern: "V-て います (State/Occupation/Knowledge)",
              japanese: [
                "サントスさんは IMC で <ruby><rb>働</rb><rt>はたら</rt></ruby>いています。",
                "<ruby><rb>市役所</rb><rt>しやくしょ</rt></ruby>の<ruby><rb>電話番号</rb><rt>でんわばんごう</rt></ruby>を<ruby><rb>知</rb><rt>し</rt></ruby>っていますか。 ... いいえ、<ruby><rb>知</rb><rt>し</rt></ruby>りません。"
              ],
              romaji: [
                "Santosu-san wa IMC de hataraite imasu.",
                "Shiyakusho no denwa bangou o shitte imasu ka. ... Iie, shirimasen."
              ],
              english: [
                "Mr. Santos works at IMC.",
                "Do you know the city hall's phone number? ... No, I don't know."
              ],
              explanation: "Further examples of V-て います indicating state (occupation 働いています, knowledge 知っています). Note negative of 知る is 知りません. Key N5 verb states."
            },
             { // Focus on Possession
              pattern: "V-て います (Possession - <ruby><rb>持</rb><rt>も</rt></ruby>つ)",
                japanese: "<ruby><rb>私</rb><rt>わたし</rt></ruby>はカメラを<ruby><rb>持</rb><rt>も</rt></ruby>っています。",
                romaji: "Watashi wa kamera o motte imasu.",
                english: "I have/own a camera.",
              explanation: "Using 持っています (motte imasu) to express possession ('to have/hold'). Important N5 vocabulary and state expression."
            }
          ]
        },
         // Lesson 16
        {
          id: "lesson-16",
          title: "Lesson 16",
          points: [
            {
              pattern: "V-て, V-て, ... V-ます/ました (Sequence)",
              japanese: "<ruby><rb>朝</rb><rt>あさ</rt></ruby>ジョギングをして、シャワーを<ruby><rb>浴</rb><rt>あ</rt></ruby>びて、<ruby><rb>会社</rb><rt>かいしゃ</rt></ruby>へ<ruby><rb>行</rb><rt>い</rt></ruby>きます。",
              romaji: "Asa jogingu o shite, shawaa o abite, kaisha e ikimasu.",
              english: "In the morning, I jog, take a shower, and then go to the company.",
              explanation: "Connecting verbs in sequence using the te-form. Tense determined by the final verb. Essential N5 pattern for describing routines/sequences."
            },
            {
              pattern: "い-adj (-い) -> 〜くて (Connecting Adj)",
              japanese: "ミラーさんは<ruby><rb>若</rb><rt>わか</rt></ruby>くて、<ruby><rb>元気</rb><rt>げんき</rt></ruby>です。",
              romaji: "Miraa-san wa wakakute, genki desu.",
              english: "Mr. Miller is young and energetic.",
              explanation: "Connecting い-adjectives: change final 'い' (i) to 'くて' (kute). Core N5 grammar for descriptions."
            },
            {
              pattern: "な-adj / Noun + で (Connecting Adj/Nouns)",
              japanese: [
                "<ruby><rb>奈良</rb><rt>なら</rt></ruby>は<ruby><rb>静</rb><rt>しず</rt></ruby>かで、きれいな<ruby><rb>町</rb><rt>まち</rt></ruby>です。",
                "カリナさんは<ruby><rb>学生</rb><rt>がくせい</rt></ruby>で、インドネシア<ruby><rb>人</rb><rt>じん</rt></ruby>です。"
              ],
              romaji: [
                "Nara wa shizuka de, kirei na machi desu.",
                "Karina-san wa gakusei de, Indoneshiajin desu."
              ],
              english: [
                "Nara is a quiet and beautiful town.",
                "Karina is a student and is Indonesian."
              ],
              explanation: "Connecting な-adjectives or Nouns: add 'で' (de) after the adjective stem or noun. Core N5 grammar for descriptions."
            },
            {
              pattern: "V1-てから、V2",
              japanese: "<ruby><rb>国</rb><rt>くに</rt></ruby>へ<ruby><rb>帰</rb><rt>かえ</rt></ruby>ってから、<ruby><rb>父</rb><rt>ちち</rt></ruby>の<ruby><rb>会社</rb><rt>かいしゃ</rt></ruby>で<ruby><rb>働</rb><rt>はたら</rt></ruby>きます。",
              romaji: "Kuni e kaette kara, chichi no kaisha de hatarakimasu.",
              english: "After I return to my country, I will work at my father's company.",
              explanation: "'V1-てから' (V1 te kara) means 'after doing V1'. Emphasizes completion of V1 before V2. Important N5 sequencing pattern."
            },
            {
              pattern: "N1 は N2 が Adjective",
              japanese: "<ruby><rb>大阪</rb><rt>おおさか</rt></ruby>は<ruby><rb>食</rb><rt>た</rt></ruby>べ<ruby><rb>物</rb><rt>もの</rt></ruby>がおいしいです。",
              romaji: "Oosaka wa tabemono ga oishii desu.",
              english: "Osaka has delicious food. / As for Osaka, the food is delicious.",
              explanation: "Describes an attribute (Adjective) of a part/aspect (N2) of the main topic (N1). N1 は, N2 が. Key N5 descriptive pattern."
            },
            {
                pattern: "どうやって",
                japanese: "<ruby><rb>大学</rb><rt>だいがく</rt></ruby>までどうやって<ruby><rb>行</rb><rt>い</rt></ruby>きますか。 ... <ruby><rb>京都駅</rb><rt>きょうとえき</rt></ruby>から１６<ruby><rb>番</rb><rt>ばん</rt></ruby>のバスに<ruby><rb>乗</rb><rt>の</rt></ruby>って、<ruby><rb>大学前</rb><rt>だいがくまえ</rt></ruby>で<ruby><rb>降</rb><rt>お</rt></ruby>ります。",
                romaji: "Daigaku made douyatte ikimasu ka. ... Kyouto Eki kara juu-roku-ban no basu ni notte, Daigaku-mae de orimasu.",
                english: "How do you get to the university? ... From Kyoto Station, take bus number 16 and get off at Daigaku-mae.",
                explanation: "'どうやって' (douyatte) asks 'how?' or 'by what means?' (method/process). Essential N5 question phrase for directions/instructions."
            }
          ]
        },
          // Lesson 17
        {
          id: "lesson-17",
          title: "Lesson 17",
          points: [
            {
              pattern: "V-ない form (Plain Negative)",
              japanese: "<ruby><rb>食</rb><rt>た</rt></ruby>べない, <ruby><rb>飲</rb><rt>の</rt></ruby>まない, <ruby><rb>書</rb><rt>か</rt></ruby>かない, しない, <ruby><rb>来</rb><rt>こ</rt></ruby>ない",
              romaji: "tabenai, nomanai, kakanai, shinai, konai",
              english: "(Various 'nai-forms' - plain negative)",
              explanation: "Plain negative form (casual equivalent of V-ません). Used in casual speech and as base for other patterns. Essential N5 conjugation."
            },
            {
              pattern: "V-ない で ください",
              japanese: "ここで<ruby><rb>写真</rb><rt>しゃしん</rt></ruby>を<ruby><rb>撮</rb><rt>と</rt></ruby>らないでください。",
              romaji: "Koko de shashin o toranaide kudasai.",
              english: "Please don't take pictures here.",
              explanation: "Polite negative request ('Please don't do...'). Softer than V-てはいけません. Important N5 pattern."
            },
            {
              pattern: "V-ない -> なければなりません",
              japanese: "<ruby><rb>薬</rb><rt>くすり</rt></ruby>を<ruby><rb>飲</rb><rt>の</rt></ruby>まなければなりません。",
              romaji: "Kusuri o nomanakereba narimasen.",
              english: "I must take the medicine.",
              explanation: "Expresses obligation/necessity ('must do', 'have to do'). Formed from V-ない stem + ければなりません. Core N5 pattern for obligation."
            },
            {
              pattern: "V-ない -> なくてもいいです",
              japanese: "<ruby><rb>明日</rb><rt>あした</rt></ruby><ruby><rb>来</rb><rt>こ</rt></ruby>なくてもいいです。",
              romaji: "Ashita konakute mo ii desu.",
              english: "You don't have to come tomorrow.",
              explanation: "Expresses lack of necessity ('don't have to do'). Formed from V-ない stem + くてもいいです. Important N5 pattern."
            },
             {
                pattern: "N (time) までに V",
                japanese: "<ruby><rb>会議</rb><rt>かいぎ</rt></ruby>は<ruby><rb>五時</rb><rt>ごじ</rt></ruby>までに<ruby><rb>終</rb><rt>お</rt></ruby>わります。",
                romaji: "Kaigi wa go-ji made ni owarimasu.",
                english: "The meeting will end by 5 o'clock.",
                explanation: "'N (time) までに' (made ni) indicates a deadline ('by...'). Different from 'まで' (until). Key N5 particle usage for deadlines."
            },
            {
                pattern: "N (object of obligation) は V-なければなりません", // Clarified pattern
                japanese: "レポートは<ruby><rb>月曜日</rb><rt>げつようび</rt></ruby>までに<ruby><rb>出</rb><rt>だ</rt></ruby>さなければなりません。",
                romaji: "Repōto wa getsuyōbi made ni dasanakereba narimasen.",
                english: "The report must be submitted by Monday.",
                explanation: "When the object related to the V-なければなりません obligation is the topic, it's often marked with は (wa). Common N5 sentence structure."
            }
          ]
        },
         // Lesson 18
        {
          id: "lesson-18",
          title: "Lesson 18",
          points: [
             {
              pattern: "Potential Verb Form (V-れる/られる)",
                japanese: "<ruby><rb>私</rb><rt>わたし</rt></ruby>は<ruby><rb>漢字</rb><rt>かんじ</rt></ruby>が<ruby><rb>読</rb><rt>よ</rt></ruby>めます。", // Direct potential form example
                romaji: "Watashi wa kanji ga yomemasu.",
                english: "I can read Kanji.",
              explanation: "Potential verb conjugation expresses ability ('can do'). Group 1: -u sound to -eru. Group 2: stem + られる. Group 3: できます, 来られます (koraremasu). Often uses が for the object. Core N5 conjugation."
            },
            {
              pattern: "V-dictionary form + こと が できます",
              japanese: "スキーをすることができます。",
              romaji: "Sukii o suru koto ga dekimasu.",
              english: "I can ski.",
              explanation: "Alternative way to express ability using dictionary form + 'こと が できます'. Less common than potential verb form for simple actions but important N5 structure."
            },
           {
              pattern: "N が できます", // Moved this after potential verb for logical flow
              japanese: "<ruby><rb>私</rb><rt>わたし</rt></ruby>はピアノが<ruby><rb>弾</rb><rt>ひ</rt></ruby>けます。", // Example uses potential verb form (弾ける) which is more natural here than できます
              romaji: "Watashi wa piano ga hikemasu.", // Romaji corrected to match potential verb
              english: "I can play the piano.",
              explanation: "Expresses ability, often synonymous with potential verbs. Noun (skill/language/etc.) + が + Potential Verb (or できます if noun represents the action itself e.g., 運転ができます - I can drive). Key N5 pattern."
            },
            {
                pattern: "Potential Verb Usage (Possibility/Permissibility)", // Renamed pattern
                japanese: "<ruby><rb>駅</rb><rt>えき</rt></ruby>で<ruby><rb>両替</rb><rt>りょうがえ</rt></ruby>ができます。", // Example uses できます itself
                romaji: "Eki de ryōgae ga dekimasu.",
                english: "You can exchange money at the station.",
                explanation: "Potential forms (including できます) indicate possibility or permissibility in a location or situation. Important N5 usage."
            },
            {
                pattern: "<ruby><rb>見</rb><rt>み</rt></ruby>えます / <ruby><rb>聞</rb><rt>き</rt></ruby>こえます",
                japanese: [
                    "あそこから<ruby><rb>山</rb><rt>やま</rt></ruby>が<ruby><rb>見</rb><rt>み</rt></ruby>えます。",
                    "ラジオの<ruby><rb>音</rb><rt>おと</rt></ruby>が<ruby><rb>聞</rb><rt>き</rt></ruby>こえます。"
                ],
                romaji: [
                    "Asoko kara yama ga miemasu.",
                    "Rajio no oto ga kikoemasu."
                ],
                english: [
                    "You can see the mountains from over there.",
                    "I can hear the radio."
                ],
                explanation: "Specific potential verbs: 見えます (can be seen/visible), 聞こえます (can be heard/audible). Refer to passive perception. N5 relevant vocabulary."
            },
             {
              pattern: "〜しか V-ません/V-ない", // Added plain negative option
              japanese: "ローマ<ruby><rb>字</rb><rt>じ</rt></ruby>しか<ruby><rb>書</rb><rt>か</rt></ruby>けません。",
              romaji: "Rooma-ji shika kakemasen.",
              english: "I can only write in Romaji.",
              explanation: "'しか' (shika) + negative verb means 'only' or 'nothing but'. Emphasizes limitation. Important N5 particle nuance."
            },
            {
              pattern: "N1 は〜が、N2 は〜 (Contrast)",
              japanese: "ひらがなは<ruby><rb>書</rb><rt>か</rt></ruby>けますが、<ruby><rb>漢字</rb><rt>かんじ</rt></ruby>は<ruby><rb>書</rb><rt>か</rt></ruby>けません。",
              romaji: "Hiragana wa kakemasu ga, kanji wa kakemasen.",
              english: "I can write Hiragana, but I cannot write Kanji.",
              explanation: "Contrasting two subjects (N1, N2) regarding different predicates using は...が、は... pattern. Useful N5 structure."
            }
          ]
        },
         // Lesson 19
        {
          id: "lesson-19",
          title: "Lesson 19",
          points: [
            {
              pattern: "V-た form (Plain Past Affirmative)",
              japanese: "<ruby><rb>食</rb><rt>た</rt></ruby>べた, <ruby><rb>飲</rb><rt>の</rt></ruby>んだ, <ruby><rb>書</rb><rt>か</rt></ruby>いた, <ruby><rb>急</rb><rt>いそ</rt></ruby>いだ, <ruby><rb>待</rb><rt>ま</rt></ruby>った...",
              romaji: "tabeta, nonda, kaita, isoida, matta...",
              english: "(Various 'ta-forms' - plain past affirmative)",
              explanation: "Plain past affirmative (casual equivalent of V-ました). Used in casual speech and other grammar patterns. Formation usually like V-て (te->ta, de->da). Essential N5 conjugation."
            },
            {
              pattern: "V-た ことが あります",
              japanese: "<ruby><rb>馬</rb><rt>うま</rt></ruby>に<ruby><rb>乗</rb><rt>の</rt></ruby>ったことがあります。",
              romaji: "Uma ni notta koto ga arimasu.",
              english: "I have ridden a horse before.",
              explanation: "Expresses past experience ('have done before'). Uses V-た form. Key N5 pattern for experiences."
            },
            {
              pattern: "V-た り, V-た り します",
              japanese: "<ruby><rb>日曜日</rb><rt>にちようび</rt></ruby>はテニスをしたり、<ruby><rb>映画</rb><rt>えいが</rt></ruby>を<ruby><rb>見</rb><rt>み</rt></ruby>たりします。",
              romaji: "Nichiyoubi wa tenisu o shitari, eiga o mitari shimasu.",
              english: "On Sundays, I do things like playing tennis and watching movies.",
              explanation: "Lists representative actions non-exhaustively ('do things like A and B'). Uses V-た form + り. Final verb (します/しました) sets tense. Important N5 pattern for listing activities."
            },
            {
                pattern: "〜に なります (Change of State)",
                japanese: [
                    "<ruby><rb>寒</rb><rt>さむ</rt></ruby>くなります。", // い-adj -> く + なります
                    "<ruby><rb>元気</rb><rt>げんき</rt></ruby>になります。", // な-adj -> に + なります
                    "２５<ruby><rb>歳</rb><rt>さい</rt></ruby>になります。" // Noun -> に + なります
                ],
                romaji: [
                    "Samuku narimasu.",
                    "Genki ni narimasu.",
                    "Nijuu-go sai ni narimasu."
                ],
                english: [
                    "It will become cold.",
                    "I will get well / become energetic.",
                    "I will turn 25 years old."
                ],
                explanation: "'なります' (narimasu - to become/get). Indicates change. Preceded by い-adj stem + く, な-adj stem + に, or Noun + に. Core N5 verb for changes."
            }
          ]
        },
         // Lesson 20
        {
          id: "lesson-20",
          title: "Lesson 20",
          points: [
            {
              pattern: "Plain Forms Overview (Verbs)",
              japanese: [
                "Dictionary: <ruby><rb>食</rb><rt>た</rt></ruby>べる, <ruby><rb>飲</rb><rt>の</rt></ruby>む, <ruby><rb>書</rb><rt>か</rt></ruby>く, する, <ruby><rb>来</rb><rt>く</rt></ruby>る",
                "Nai-form (-): <ruby><rb>食</rb><rt>た</rt></ruby>べない, <ruby><rb>飲</rb><rt>の</rt></ruby>まない, <ruby><rb>書</rb><rt>か</rt></ruby>かない, しない, <ruby><rb>来</rb><rt>こ</rt></ruby>ない",
                "Ta-form (past): <ruby><rb>食</rb><rt>た</rt></ruby>べた, <ruby><rb>飲</rb><rt>の</rt></ruby>んだ, <ruby><rb>書</rb><rt>か</rt></ruby>いた, した, <ruby><rb>来</rb><rt>き</rt></ruby>た",
                "Nakatta-form (past-): <ruby><rb>食</rb><rt>た</rt></ruby>べなかった, <ruby><rb>飲</rb><rt>の</rt></ruby>まなかった, <ruby><rb>書</rb><rt>か</rt></ruby>かなかった, しなかった, <ruby><rb>来</rb><rt>こ</rt></ruby>なかった"
              ],
              romaji: "(See Japanese readings)",
              english: "(Dictionary, Nai, Ta, Nakatta forms)",
              explanation: "Review of the four plain forms (casual equivalents of ます, ません, ました, ませんでした). Used with friends/family and in specific grammatical structures (e.g., quotes, before と思います, noun modification). Essential N5 knowledge."
            },
            {
              pattern: "Plain Forms (い-adjectives)",
              japanese: "<ruby><rb>高</rb><rt>たか</rt></ruby>い, <ruby><rb>高</rb><rt>たか</rt></ruby>くない, <ruby><rb>高</rb><rt>たか</rt></ruby>かった, <ruby><rb>高</rb><rt>たか</rt></ruby>くなかった",
              romaji: "takai, takakunai, takakatta, takakunakatta",
              english: "(Present Aff, Pres Neg, Past Aff, Past Neg)",
              explanation: "Plain forms of い-adjectives (です is dropped). Necessary for N5 level grammar patterns using plain forms."
            },
            {
              pattern: "Plain Forms (な-adjectives / Nouns)",
              japanese: [
                "な-adj: <ruby><rb>元気</rb><rt>げんき</rt></ruby>だ, <ruby><rb>元気</rb><rt>げんき</rt></ruby>じゃない, <ruby><rb>元気</rb><rt>げんき</rt></ruby>だった, <ruby><rb>元気</rb><rt>げんき</rt></ruby>じゃなかった",
                "Noun: <ruby><rb>学生</rb><rt>がくせい</rt></ruby>だ, <ruby><rb>学生</rb><rt>がくせい</rt></ruby>じゃない, <ruby><rb>学生</rb><rt>がくせい</rt></ruby>だった, <ruby><rb>学生</rb><rt>がくせい</rt></ruby>じゃなかった"
              ],
              romaji: [
                   "na-adj: genki da, genki janai, genki datta, genki janakatta",
                   "Noun: gakusei da, gakusei janai, gakusei datta, gakusei janakatta"
                   ],
              english: "(Present Aff, Pres Neg, Past Aff, Past Neg)",
              explanation: "Plain forms of な-adjectives/Nouns. Present aff. uses だ (da), negative uses じゃない (janai), past uses だった (datta), past neg. uses じゃなかった (janakatta). Necessary for N5 grammar."
            },
            { // Replaced the vague んですか point with a clear casual conversation example as per MNN L20's focus
                pattern: "Casual Conversation Example (Using Plain Forms)",
                japanese: "A: <ruby><rb>明日</rb><rt>あした</rt></ruby>、パーティーに<ruby><rb>行</rb><rt>い</rt></ruby>く？ B: うん、<ruby><rb>行</rb><rt>い</rt></ruby>く。",
                romaji: "A: Ashita, paatii ni iku? B: Un, iku.",
                english: "A: Are you going to the party tomorrow? B: Yeah, I'm going.",
                explanation: "Demonstrates using plain verb forms (行く iku instead of 行きます ikimasu) and casual responses (うん un instead of はい hai) in informal N5 level speech context. Questions in plain form often have rising intonation instead of か."
            }
          ]
        },
          // Lesson 21
        {
          id: "lesson-21",
          title: "Lesson 21",
          points: [
            {
              pattern: "Plain Form + と<ruby><rb>思</rb><rt>おも</rt></ruby>います",
              japanese: "<ruby><rb>明日</rb><rt>あした</rt></ruby><ruby><rb>雨</rb><rt>あめ</rt></ruby>が<ruby><rb>降</rb><rt>ふ</rt></ruby>ると<ruby><rb>思</rb><rt>おも</rt></ruby>います。",
              romaji: "Ashita ame ga furu to omoimasu.",
              english: "I think it will rain tomorrow.",
              explanation: "Expresses speaker's opinion/conjecture ('I think that...'). Clause before と思います must be plain form. Core N5 pattern."
            },
            {
                pattern: "Quote (Plain Form) + と<ruby><rb>言</rb><rt>い</rt></ruby>います/ました",
                japanese: [
                    "<ruby><rb>寝</rb><rt>ね</rt></ruby>る<ruby><rb>前</rb><rt>まえ</rt></ruby>に「おやすみなさい」と<ruby><rb>言</rb><rt>い</rt></ruby>います。", // Direct quote
                    "ミラーさんは<ruby><rb>来週</rb><rt>らいしゅう</rt></ruby><ruby><rb>東京</rb><rt>とうきょう</rt></ruby>へ<ruby><rb>出張</rb><rt>しゅっちょう</rt></ruby>すると<ruby><rb>言</rb><rt>い</rt></ruby>っていました。" // Indirect quote (using plain suru before to) - Using 言っていました (itte imashita - was saying/said) is also natural here.
                ],
                romaji: [
                    "Neru mae ni 'Oyasuminasai' to iimasu.",
                    "Miraa-san wa raishuu Toukyou e shucchou suru to itte imashita." // Adjusted romaji
                ],
                english: [
                    "Before going to bed, you say 'Oyasuminasai'.",
                    "Mr. Miller said that he will go on a business trip to Tokyo next week."
                ],
                explanation: "Used for quoting speech/thoughts ('say/said that...'). Direct quotes use「」. Indirect quotes use plain form before と言います/言いました. Important N5 reporting pattern."
            },
            {
              pattern: "Plain Form + でしょう？",
              japanese: "<ruby><rb>北海道</rb><rt>ほっかいどう</rt></ruby>は<ruby><rb>寒</rb><rt>さむ</rt></ruby>かったでしょう？",
              romaji: "Hokkaidou wa samukatta deshou?",
              english: "Hokkaido was cold, wasn't it? / I suppose Hokkaido was cold?",
              explanation: "Seeking agreement/confirmation ('..., right?', '..., wasn't it?'). Plain form precedes でしょう. Common N5 conversational device."
            },
            {
                pattern: "N (place) で N (event) があります",
                japanese: "<ruby><rb>東京</rb><rt>とうきょう</rt></ruby>で<ruby><rb>日本</rb><rt>にほん</rt></ruby>の<ruby><rb>料理</rb><rt>りょうり</rt></ruby>のフェスティバルがあります。",
                romaji: "Tōkyō de Nihon no ryōri no fesutibaru ga arimasu.",
                english: "There is a Japanese food festival in Tokyo.",
                explanation: "Indicates an event (festival, meeting, etc.) takes place 'で' (de) at a location. Event marked with 'があります'. N5 relevant pattern."
            },
            { // Renamed for clarity - Purpose/Destination Particle
                pattern: "N (event/purpose) に <ruby><rb>行</rb><rt>い</rt></ruby>きます/<ruby><rb>参加</rb><rt>さんか</rt></ruby>します etc.",
                japanese: "フェスティバルに<ruby><rb>行</rb><rt>い</rt></ruby>きませんか。",
                romaji: "Fesutibaru ni ikimasen ka.",
                english: "Won't you go to the festival?",
                explanation: "Particle 'に' (ni) marks the event or occasion one attends, participates in, etc. Important N5 use of に."
            }
          ]
        },
         // Lesson 22
        {
          id: "lesson-22",
          title: "Lesson 22",
          points: [
            {
              pattern: "Noun-Modifying Clause (Verb Plain Form + Noun)",
              japanese: "これはミラーさんが<ruby><rb>作</rb><rt>つく</rt></ruby>ったケーキです。",
              romaji: "Kore wa Miraa-san ga tsukutta keeki desu.",
              english: "This is the cake that Mr. Miller made.",
              explanation: "A verb clause (plain form) directly modifies a noun. Describes the noun. Core N5 grammar for complex descriptions."
            },
            {
                pattern: "Noun-Modifying Clause (Subject marked by が)",
                japanese: "<ruby><rb>私</rb><rt>わたし</rt></ruby>はミラーさんが<ruby><rb>住</rb><rt>す</rt></ruby>んでいる<ruby><rb>家</rb><rt>いえ</rt></ruby>を<ruby><rb>知</rb><rt>し</rt></ruby>っています。",
                romaji: "Watashi wa Miraa-san ga sunde iru ie o shitte imasu.",
                english: "I know the house where Mr. Miller lives.",
                explanation: "When the subject within the modifying clause is different from the main sentence topic, it's usually marked with 'が' (ga). Important N5 detail for modifying clauses."
            },
            { // Renamed for clarity, reinforcing existing knowledge in the context of modification
              pattern: "Noun Modification Review (Adj/Noun)",
              japanese: "[<ruby><rb>背</rb><rt>せ</rt></ruby>が<ruby><rb>高</rb><rt>たか</rt></ruby>い<ruby><rb>人</rb><rt>ひと</rt></ruby>] / [<ruby><rb>親切</rb><rt>しんせつ</rt></ruby>な<ruby><rb>人</rb><rt>ひと</rt></ruby>] / [<ruby><rb>会議</rb><rt>かいぎ</rt></ruby>の<ruby><rb>資料</rb><rt>しりょう</rt></ruby>]",
              romaji: "[Se ga takai hito] / [Shinsetsu na hito] / [Kaigi no shiryō]",
              english: "[A tall person] / [A kind person] / [Meeting materials]",
              explanation: "Reminder: い-adj directly modify nouns; な-adj take な; Nouns take の to modify other nouns. These also function as noun-modifying structures. Fundamental N5."
            },
            { // Renamed for clarity
              pattern: "Modifying Clause + Abstract Noun (<ruby><rb>時間</rb><rt>じかん</rt></ruby>/<ruby><rb>約束</rb><rt>やくそく</rt></ruby>/<ruby><rb>用事</rb><rt>ようじ</rt></ruby>)",
              japanese: [
                "<ruby><rb>私</rb><rt>わたし</rt></ruby>は<ruby><rb>今日</rb><rt>きょう</rt></ruby>、<ruby><rb>市役所</rb><rt>しやくしょ</rt></ruby>へ<ruby><rb>行</rb><rt>い</rt></ruby>く<ruby><rb>用事</rb><rt>ようじ</rt></ruby>があります。",
                "<ruby><rb>映画</rb><rt>えいが</rt></ruby>を<ruby><rb>見</rb><rt>み</rt></ruby>る<ruby><rb>時間</rb><rt>じかん</rt></ruby>がありません。"
              ],
              romaji: [
                "Watashi wa kyō, shiyakusho e iku yōji ga arimasu.",
                "Eiga o miru jikan ga arimasen."
              ],
              english: [
                "I have an errand to go to the city hall today.",
                "I don't have time to watch a movie."
              ],
              explanation: "Using modifying clauses (plain form V/Adj/N) before abstract nouns like 時間 (time), 約束 (appointment), 用事 (errand) to specify their content. Useful N5 structure."
            }
          ]
        },
         // Lesson 23
        {
          id: "lesson-23",
          title: "Lesson 23",
          points: [
            {
              pattern: "〜とき、〜 (When...)",
              japanese: [
                "<ruby><rb>図書館</rb><rt>としょかん</rt></ruby>で<ruby><rb>本</rb><rt>ほん</rt></ruby>を<ruby><rb>借</rb><rt>か</rt></ruby>りるとき、カードが<ruby><rb>要</rb><rt>い</rt></ruby>ります。", // V-dict formとき
                "<ruby><rb>暇</rb><rt>ひま</rt></ruby>なとき、うちへ<ruby><rb>遊</rb><rt>あそ</rt></ruby>びに<ruby><rb>来</rb><rt>き</rt></ruby>ませんか。", // Na-adjなとき
                "<ruby><rb>妻</rb><rt>つま</rt></ruby>が<ruby><rb>病気</rb><rt>びょうき</rt></ruby>のとき、<ruby><rb>会社</rb><rt>かいしゃ</rt></ruby>を<ruby><rb>休</rb><rt>やす</rt></ruby>みました。" // Nounのとき
              ],
              romaji: [
                "Toshokan de hon o kariru toki, kaado ga irimasu.",
                "Hima na toki, uchi e asobi ni kimasen ka.",
                "Tsuma ga byouki no toki, kaisha o yasumimashita."
              ],
              english: [
                "When you borrow books at the library, you need a card.",
                "When you are free, won't you come over to my place?",
                "When my wife was sick, I took time off work."
              ],
              explanation: "'とき' (toki - when/at the time of). Connects clauses. Form before とき (V-dict, V-ta, い-adj, な-adj+な, N+の) depends on timing/state. Essential N5 conjunction."
            },
            {
              pattern: "V-dictionary form + と、〜 (Natural Consequence/Discovery)",
              japanese: "このボタンを<ruby><rb>押</rb><rt>お</rt></ruby>すと、お<ruby><rb>釣</rb><rt>つ</rt></ruby>りが<ruby><rb>出</rb><rt>で</rt></ruby>ます。",
              romaji: "Kono botan o osu to, otsuri ga demasu.",
              english: "If/When you press this button, the change comes out.",
              explanation: "'と' conditional: If/When A happens, B naturally/inevitably follows. Used for machine operations, directions, natural phenomena. Important N5 conditional."
            },
             {
                pattern: "N (place) を V (motion verb)",
                japanese: [
                    "<ruby><rb>道</rb><rt>みち</rt></ruby>を<ruby><rb>渡</rb><rt>わた</rt></ruby>ります。",
                    "<ruby><rb>公園</rb><rt>こうえん</rt></ruby>を<ruby><rb>散歩</rb><rt>さんぽ</rt></ruby>します。"
                ],
                romaji: [
                    "Michi o watarimasu.",
                    "Kōen o sanpo shimasu."
                ],
                english: [
                    "I cross the street.",
                    "I take a walk in the park."
                ],
                explanation: "Particle 'を' (o/wo) marks the place *through which* movement occurs (crossing, walking through) with verbs like 渡る (cross), 散歩する (walk), 曲がる (turn at). Key N5 use of を."
            },
            { // Replaced 'N ga Adjective' (too basic/covered) with a more specific L23 point: Turning at a corner
              pattern: "Place を <ruby><rb>曲</rb><rt>ま</rt></ruby>がります (Turning)",
              japanese: "あの<ruby><rb>角</rb><rt>かど</rt></ruby>を<ruby><rb>右</rb><rt>みぎ</rt></ruby>へ<ruby><rb>曲</rb><rt>ま</rt></ruby>がってください。",
              romaji: "Ano kado o migi e magatte kudasai.",
              english: "Please turn right at that corner.",
              explanation: "The particle 'を' marks the point (corner, intersection) where turning occurs with 曲がります (magarimasu - to turn). Essential N5 direction-giving pattern."
            }
          ]
        },
         // Lesson 24
        {
          id: "lesson-24",
          title: "Lesson 24",
          points: [
            {
              pattern: "N(giver) は N(recipient=me/us) に N(thing) を くれます", // Clarified recipient
              japanese: "<ruby><rb>佐藤</rb><rt>さとう</rt></ruby>さんは<ruby><rb>私</rb><rt>わたし</rt></ruby>にクリスマスカードをくれました。",
              romaji: "Satō-san wa watashi ni kurisumasu kaado o kuremashita.",
              english: "Ms. Sato gave me a Christmas card.",
              explanation: "'くれます' (kuremasu - to give). Used when someone gives to the speaker or speaker's inner circle. Recipient (me/us) marked by に. Core N5 giving verb."
            },
            {
              pattern: "V-て あげます (Doing a favor for others)",
              japanese: "<ruby><rb>私</rb><rt>わたし</rt></ruby>は<ruby><rb>木村</rb><rt>きむら</rt></ruby>さんに<ruby><rb>本</rb><rt>ほん</rt></ruby>を<ruby><rb>貸</rb><rt>か</rt></ruby>してあげました。",
              romaji: "Watashi wa Kimura-san ni hon o kashite agemashita.",
              english: "I lent Ms. Kimura a book (as a favor).",
              explanation: "Doing a favor (V-te) for someone else (に). Speaker does for others, or third party for third party. Important N5 giving/receiving pattern."
            },
            {
              pattern: "V-て もらいます (Receiving a favor)",
              japanese: "<ruby><rb>私</rb><rt>わたし</rt></ruby>は<ruby><rb>山田</rb><rt>やまだ</rt></ruby>さんに<ruby><rb>図書館</rb><rt>としょかん</rt></ruby>の<ruby><rb>電話番号</rb><rt>でんわばんごう</rt></ruby>を<ruby><rb>教</rb><rt>おし</rt></ruby>えてもらいました。",
              romaji: "Watashi wa Yamada-san ni toshokan no denwa bangō o oshiete moraimashita.",
              english: "I had Mr. Yamada tell me the library's phone number (I received the favor).",
              explanation: "Receiving a favor (V-te) from someone (に). Speaker/speaker's group receives benefit. Important N5 giving/receiving pattern."
            },
            {
              pattern: "V-て くれます (Someone doing a favor for me/us)",
              japanese: "<ruby><rb>母</rb><rt>はは</rt></ruby>がセーターを<ruby><rb>送</rb><rt>おく</rt></ruby>ってくれました。",
              romaji: "Haha ga seetaa o okutte kuremashita.",
              english: "My mother sent me a sweater (as a favor to me).",
              explanation: "Someone (は/が) does a favor (V-te) for the speaker or speaker's inner circle. Important N5 giving/receiving pattern."
            },
            {
                pattern: "だれが V-てくれましたか (Asking who did the favor)",
                japanese: "だれが<ruby><rb>手伝</rb><rt>てつだ</rt></ruby>ってくれましたか。",
                romaji: "Dare ga tetsudatte kuremashita ka.",
                english: "Who helped you?",
                explanation: "Asking who performed the favor for the speaker/listener using V-てくれます. Useful N5 question related to favors."
            }
          ]
        },
        // Lesson 25
        {
        id: "lesson-25",
        title: "Lesson 25",
        points: [
          {
            pattern: "Plain Past Form + ら、〜 (Conditional 'if/when')",
            japanese: "お<ruby><rb>金</rb><rt>かね</rt></ruby>があったら、<ruby><rb>旅行</rb><rt>りょこう</rt></ruby>します。", // Noun + dattara example: 時間があったら...
            romaji: "Okane ga attara, ryokou shimasu.",
            english: "If I have money, I will travel.",
            explanation: "General conditional ('if/when'). Add 'ら' (ra) to plain past (V-た, い-adj-かった, な-adj/N-だった). Used broadly, often when S2 is speaker's intention/request. Essential N5 conditional."
          },
          { // Clarifying the 'after' usage of ~tara
            pattern: "V-たら、〜 (Temporal Sequence 'when/after')",
              japanese: "１０<ruby><rb>時</rb><rt>じ</rt></ruby>になったら、<ruby><rb>出</rb><rt>で</rt></ruby>かけましょう。",
              romaji: "Juu-ji ni nattara, dekakemashou.",
              english: "Let's go out when it becomes 10 o'clock.",
              explanation: "When V-tara indicates a specific time or completion, it often means 'when' or 'after' the condition is met. Key N5 usage nuance."
          },
          {
            pattern: "〜ても、〜 (Concessive 'even if/although')",
            japanese: [
              "<ruby><rb>雨</rb><rt>あめ</rt></ruby>が<ruby><rb>降</rb><rt>ふ</rt></ruby>っても、<ruby><rb>洗濯</rb><rt>せんたく</rt></ruby>します。", // V-te + も
              "<ruby><rb>安</rb><rt>やす</rt></ruby>くても、<ruby><rb>私</rb><rt>わたし</rt></ruby>はグループ<ruby><rb>旅行</rb><rt>りょこう</rt></ruby>が<ruby><rb>嫌</rb><rt>きら</rt></ruby>いです。", // i-adj stem + くても
              "<ruby><rb>便利</rb><rt>べんり</rt></ruby>でも、パソコンを<ruby><rb>使</rb><rt>つか</rt></ruby>いません。", // na-adj stem + でも
              "<ruby><rb>日曜日</rb><rt>にちようび</rt></ruby>でも、<ruby><rb>働</rb><rt>はたら</rt></ruby>きます。" // Noun + でも
            ],
            romaji: [
              "Ame ga futte mo, sentaku shimasu.",
              "Yasukute mo, watashi wa guruupu ryokou ga kirai desu.",
              "Benri demo, pasokon o tsukaimasen.",
              "Nichiyōbi demo, hatarakimasu."
            ],
            english: [
              "Even if it rains, I will do the laundry.",
              "Even if it's cheap, I don't like group tours.",
              "Even though it's convenient, I don't use a personal computer.",
              "Even if it's Sunday, I work."
            ],
            explanation: "Expresses 'even if' or 'although'. Formed by adding 'も' (mo) to V-て form, い-adj stem+くて, な-adj stem+で, or Noun+で. Essential N5 concessive pattern."
          },
          {
              pattern: "もし / いくら (Emphasizing Conditionals)",
              japanese: [
                  "もし１<ruby><rb>億円</rb><rt>おくえん</rt></ruby>あったら、<ruby><rb>何</rb><rt>なに</rt></ruby>をしたいですか。",
                  "いくら<ruby><rb>考</rb><rt>かんが</rt></ruby>えても、わかりません。"
              ],
              romaji: [
                  "Moshi ichi oku en attara, nani o shitai desu ka.",
                  "Ikura kangaete mo, wakarimasen."
              ],
              english: [
                  "If you had 100 million yen, what would you want to do?",
                  "No matter how much I think about it, I don't understand."
              ],
              explanation: "'もし' (moshi - if) often optionally precedes 〜たら for hypothetical emphasis. 'いくら' (ikura - however much/many) often optionally precedes 〜ても to emphasize 'no matter how much/many'. N5 relevant adverbs."
          }
        ]
      }

]; 