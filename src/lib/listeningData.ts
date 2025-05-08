import { grammarPoints, type GrammarLesson, type GrammarPoint, type Example } from '../lib/grammarData';

export interface Question {
    questionJP: string; // Japanese question with potential furigana
    questionEN: string; // English translation of the question
    optionsJP: string[]; // Japanese options with potential furigana
    optionsEN: string[]; // English translations of the options
    answer: number; // Index of the correct option in optionsJP/optionsEN array
  }
  
export interface Exercise {
    id: string;
    mnnLesson: number;
    title: string;
    description: string;
    audioSrc: string;
    transcript: string; // This holds the multi-line Japanese transcript
    translation: string; // This holds the multi-line English translation
    questions: Question[];
  }
  
export interface ListeningExercises {
    beginner: Exercise[];
    intermediate: Exercise[];
    situational: Exercise[];
  }
  
  // Paste your provided listeningExercises data here
export const listeningExercises: ListeningExercises = {
    "beginner": [
          {
              id: 'b_mnn_l1_kaiwa',
              mnnLesson: 1,
              title: 'Lesson 1: Conversation - First Meeting',
              description: 'Listen to a first meeting introduction between Sato-san and Mike Miller.',
              audioSrc: '/assets/audio/listening/mnn_l1.mp3',
              transcript: '（Ａ：）初めまして。おはようございます。\n（Ｂ：）おはようございます。佐藤[さとう]さん、こちらはマイク・ミラーさんです。\n（ミラー：）初めまして、マイク・ミラーです。アメリカから来[き]ました。どうぞよろしく。\n（佐藤：）佐藤[さとう]恵子[けいこ]です。どうぞよろしく。',
              translation: '(A:) Nice to meet you. Good morning.\n(B:) Good morning. Ms. Sato, this is Mr. Mike Miller.\n(Miller:) Nice to meet you, I am Mike Miller. I came from America. Pleased to meet you.\n(Sato:) I am Sato Keiko. Pleased to meet you.',
              questions: [
                  {
                      questionJP: '話[はな]し手[て]は どんな 挨拶[あいさつ]を 使[つか]いましたか？',
                      questionEN: 'What greeting is used by the speakers?',
                      optionsJP: ['こんにちは (Konnichiwa)', 'こんばんは (Konbanwa)', 'おはようございます (Ohayou gozaimasu)', 'おやすみなさい (Oyasuminasai)'],
                      optionsEN: ['Hello (afternoon)', 'Good evening', 'Good morning', 'Good night'],
                      answer: 2
                  },
                  {
                      questionJP: '佐藤[さとう]さんに 誰[だれ]が 紹介[しょうかい]されましたか？',
                      questionEN: 'Who is being introduced to Ms. Sato?',
                      optionsJP: ['田中[たなか]さん', '山田[やまだ]さん', 'マイク・ミラーさん', '鈴木[すずき]さん'],
                      optionsEN: ['Mr./Ms. Tanaka', 'Mr./Ms. Yamada', 'Mr. Mike Miller', 'Mr./Ms. Suzuki'],
                      answer: 2
                  },
                  {
                      questionJP: 'ミラーさんは どこから 来[き]たと 言[い]いましたか？',
                      questionEN: 'Where did Mike Miller say he is from?',
                      optionsJP: ['日本[にほん]', '中国[ちゅうごく]', 'イギリス', 'アメリカ'],
                      optionsEN: ['Japan', 'China', 'England', 'America'],
                      answer: 3
                  },
                  {
                      questionJP: '佐藤[さとう]さんの フルネームは 何[なん]ですか？',
                      questionEN: 'What is Ms. Sato\'s full name?',
                      optionsJP: ['佐藤[さとう] ミラー', '恵子[けいこ] ミラー', '佐藤[さとう] 恵子[けいこ]', '恵子[けいこ] 佐藤[さとう]'],
                      optionsEN: ['Sato Miller', 'Keiko Miller', 'Sato Keiko', 'Keiko Sato'],
                      answer: 2
                  },
                  {
                      questionJP: 'ミラーさんと 佐藤[さとう]さんが 自己紹介[じこしょうかい]の 最後[さいご]に 使[つか]った 表現[ひょうげん]は 何[なん]ですか？',
                      questionEN: 'What phrase is used by both Miller-san and Sato-san at the end of their introductions?',
                      optionsJP: ['はじめまして', 'ありがとう', 'どうぞよろしく', 'すみません'],
                      optionsEN: ['Nice to meet you (first time)', 'Thank you', 'Pleased to meet you', 'Excuse me/Sorry'],
                      answer: 2
                  },
                  {
                      questionJP: 'ミラーさんは どんな 自己紹介[じこしょうかい]を しましたか？',
                      questionEN: 'What kind of self-introduction did Mike Miller give?',
                      optionsJP: ['名前[なまえ]だけ', '名前[なまえ]と国[くに]', '名前[なまえ]と会社名[かいしゃめい]', '名前[なまえ]と趣味[しゅみ]'],
                      optionsEN: ['Name only', 'Name and country', 'Name and company name', 'Name and hobby'],
                      answer: 1
                  }
              ]
          },
          {
            id: 'b2_mnn_l2_kaiwa',
            mnnLesson: 2,
            title: 'Lesson 2: Conversation - New Neighbor Greeting',
            description: 'Listen to Santos-san introducing himself to a neighbor.',
            audioSrc: '/assets/audio/listening/mnn_l2.mp3',
            transcript: '（Ａ：）···はい、どなたですか。\n（サントス：）408のサントスです。\n（Ａ：）こんにちは。\n（サントス：）サントスです。これからお世話[せわ]になります。どうぞよろしくお願いします。\n（Ａ：）こちらこそよろしくお願いします。\n（サントス：）あのう、これ、コーヒーです。どうぞ。\n（Ａ：）どうもありがとうございます。',
            translation: '(A:) ...Yes, who is it?\n(Santos:) It\'s Santos from 408.\n(A:) Hello.\n(Santos:) I\'m Santos. I\'ll be in your care from now on. Pleased to meet you.\n(A:) Likewise, pleased to meet you.\n(Santos:) Um, this is coffee. Please have it.\n(A:) Thank you very much.',
            questions: [
                {
                    questionJP: '訪問者[ほうもんしゃ]は誰[だれ]ですか？ また、どのように自己紹介[じこしょうかい]しましたか？',
                    questionEN: 'Who is the visitor, and how did they introduce themselves?',
                    optionsJP: ['ミラーさん、会社名[かいしゃめい]で', '佐藤[さとう]さん、名前[なまえ]だけで', 'サントスさん、部屋番号[へやばんごう]と名前[なまえ]で', '田中[たなか]さん、住所[じゅうしょ]で'],
                    optionsEN: ['Miller-san, with company name', 'Sato-san, with name only', 'Santos-san, with room number and name', 'Tanaka-san, with address'],
                    answer: 2
                },
                {
                    questionJP: 'サントスさんが挨拶[あいさつ]で使[つか]った、今後[こんご]の関係[かんけい]を示[しめ]す重要[じゅうよう]なフレーズは何[なん]ですか？',
                    questionEN: 'What important phrase did Santos use in his greeting to indicate the future relationship?',
                    optionsJP: ['こんにちは', 'どうぞよろしくお願[ねが]いします', 'こちらこそ', 'これからお世話[おせわ]になります'],
                    optionsEN: ['Konnichiwa', 'Douzo yoroshiku onegaishimasu', 'Kochira koso', 'Korekara osewa ni narimasu'],
                    answer: 3
                },
                {
                    questionJP: '「どうぞよろしくお願[ねが]いします」に対[たい]する、相手[あいて]からの返答[へんとう]は何[なん]でしたか？',
                    questionEN: 'What was the response from the other person to "Douzo yoroshiku onegaishimasu"?',
                    optionsJP: ['はい、そうです', 'どうもありがとうございます', 'こちらこそよろしくお願[ねが]いします', 'いいえ、結構[けっこう]です'],
                    optionsEN: ['Yes, that\'s right', 'Thank you very much', 'Likewise, pleased to meet you', 'No, thank you'],
                    answer: 2
                },
                {
                    questionJP: 'サントスさんは、引[ひ]っ越[こ]しの挨拶[あいさつ]として何[なに]を持[も]ってきましたか？',
                    questionEN: 'What did Santos bring as a moving-in greeting gift?',
                    optionsJP: ['お茶[ちゃ]', 'ケーキ', '花[はな]', 'コーヒー'],
                    optionsEN: ['Tea', 'Cake', 'Flowers', 'Coffee'],
                    answer: 3
                },
                {
                    questionJP: 'サントスさんがコーヒーを渡[わた]す時[とき]に使[つか]った言葉[ことば]は何[なん]ですか？',
                    questionEN: 'What word did Santos use when handing over the coffee?',
                    optionsJP: ['すみません', 'どうぞ', 'これです', 'ありがとう'],
                    optionsEN: ['Excuse me', 'Please (take this)', 'This is it', 'Thank you'],
                    answer: 1
                },
                {
                    questionJP: 'コーヒーを受[う]け取[と]った人[ひと]は、感謝[かんしゃ]の気持[きも]ちをどのように伝[つた]えましたか？',
                    questionEN: 'How did the person who received the coffee express their gratitude?',
                    optionsJP: ['どういたしまして', 'お願[ねが]いします', 'どうもありがとうございます', 'さようなら'],
                    optionsEN: ["You're welcome", 'Please', 'Thank you very much', 'Goodbye'],
                    answer: 2
                }
            ]
        },
        {
          "id": "b2_mnn_l3_kaiwa",
          "mnnLesson": 3,
          "title": "Lesson 3: Conversation - Asking Directions and Buying",
          "description": "Listen to a customer asking for directions to the wine section and buying a wine.",
          "audioSrc": "/assets/audio/listening/mnn_l3.mp3",
          "transcript": "（店員[てんいん] Ａ：）いらっしゃいませ。\n（客[きゃく] Ｂ：）すみません。ワイン売[う]り場[ば]はどこですか?\n（店員[てんいん] Ａ：）地下[ちか] 1 階[かい]です。\n（客[きゃく] Ｂ：）どうも。\n（客[きゃく] Ｂ：）すみません。そのワインを見[み]せてください。\n（店員[てんいん] Ａ：）はい、どうぞ。\n（客[きゃく] Ｂ：）これはどこのワインですか?\n（店員[てんいん] Ａ：）日本[にほん]のです。\n（客[きゃく] Ｂ：）いくらですか?\n（店員[てんいん] Ａ：）2500円[えん] です。\n（客[きゃく] Ｂ：）じゃ、これ を ください。",
          "translation": "(Clerk A:) Welcome.\n(Customer B:) Excuse me. Where is the wine section?\n(Clerk A:) It's on the basement floor 1.\n(Customer B:) Thank you.\n(Customer B:) Excuse me. Please show me that wine.\n(Clerk A:) Yes, here you are.\n(Customer B:) Where is this wine from?\n(Clerk A:) It's from Japan.\n(Customer B:) How much is it?\n(Clerk A:) It's 2500 yen.\n(Customer B:) Okay, I'll take this one.",
          "questions": [
              {
                  "questionJP": "お客[きゃく]さんが探[さが]しているものは何[なん]ですか？",
                  "questionEN": "What is the customer looking for?",
                  "optionsJP": ["コーヒー売[う]り場[ば]", "ワイン売[う]り場[ば]", "本[ほん]売[う]り場[ば]", "魚[さかな]売[う]り場[ば]"],
                  "optionsEN": ["Coffee section", "Wine section", "Book section", "Fish section"],
                  "answer": 1
              },
              {
                  "questionJP": "ワイン売[う]り場[ば]はどこにありますか？",
                  "questionEN": "Where is the wine section?",
                  "optionsJP": ["1階[かい]", "2階[かい]", "地下[ちか]1階[かい]", "地下[ちか]2階[かい]"],
                  "optionsEN": ["1st floor", "2nd floor", "Basement floor 1", "Basement floor 2"],
                  "answer": 2
              },
              {
                  "questionJP": "お客[きゃく]さんは何[なに]を見[み]せてほしいと言[い]いましたか？",
                  "questionEN": "What did the customer ask to be shown?",
                  "optionsJP": ["地圖[ちず]", "ワイン", "メニュー", "レシート"],
                  "optionsEN": ["A map", "A wine", "A menu", "A receipt"],
                  "answer": 1
              },
              {
                  "questionJP": "お客[きゃく]さんが興味[きょうみ]を持[も]ったワインはどこの国[くに]のですか？",
                  "questionEN": "Which country is the wine the customer was interested in from?",
                  "optionsJP": ["フランス", "イタリア", "日本[にほん]", "チリ"],
                  "optionsEN": ["France", "Italy", "Japan", "Chile"],
                  answer: 2
              },
              {
                  "questionJP": "そのワインはいくらですか？",
                  "questionEN": "How much is that wine?",
                  "optionsJP": ["2000円[えん]", "2500円[えん]", "3000円[えん]", "1500円[えん]"],
                  "optionsEN": ["2000 yen", "2500 yen", "3000 yen", "1500 yen"],
                  answer: 1
              },
              {
                  "questionJP": "最後[さいご]に、お客[きゃく]さんはそのワインをどうしましたか？",
                  "questionEN": "Finally, what did the customer do with that wine?",
                  "optionsJP": ["買[か]いませんでした", "他[ほか]のワインを選[えら]びました", "買[か]うことにしました", "値段[ねだん]を聞[き]いただけです"],
                  "optionsEN": ["Didn't buy it", "Chose another wine", "Decided to buy it", "Only asked the price"],
                  answer: 2
              }
          ]
      },
      {
        "id": "b2_mnn_l4_kaiwa",
        "mnnLesson": 4,
        "title": "Lesson 4: Conversation - Asking for Information",
        "description": "Listen to someone asking for a phone number, business hours, and the regular holiday.",
        "audioSrc": "/assets/audio/listening/mnn_l4.mp3",
        "transcript": "（B：）すみません。アスカの電話番号[でんわばんごう]は何番[なんばん]ですか?\n（A：）アスカですか? 5275 の 2725 です。\n（B：）どうもありがとうございます。\n（A：）はい、アスカ[あすか]です。\n（B：）すみません。そちらは何時[なんじ]までですか?\n（A：）10 時[じ]までです。\n（B：）休みは何曜日[なんようび]ですか?\n（A：）日曜日[にちようび]です。\n（B：）そうですか。どうも",
        "translation": "(B:) Excuse me. What is Asuka's phone number?\n(A:) Aka? It's 5275-2725.\n(B:) Thank you very much.\n(A:) Yes, it's Asuka.\n(B:) Excuse me. Until what time are you open?\n(A:) Until 10 o'clock.\n(B:) Which day is the holiday?\n(A:) It's Sunday.\n(B:) I see. Thanks.",
        "questions": [
            {
                "questionJP": "お客[きゃく]さんは最初[さいしょ]に何[なに]の番号[ばんごう]を聞[き]きましたか？",
                "questionEN": "What kind of number did the customer ask for first?",
                "optionsJP": ["部屋[へや]の番号[ばんごう]", "明後日[あさって]の電話番号[でんわばんごう]", "アスカの電話番号[でんわばんごう]", "郵便番号[ゆうびんばんごう]"],
                "optionsEN": ["Room number", "Day after tomorrow's phone number", "Asuka's phone number", "Postal code"],
                "answer": 2
            },
            {
                "questionJP": "相手[あいて]が教[おし]えた電話番号[でんわばんごう]は何番[なんばん]ですか？",
                "questionEN": "What phone number did the other person provide?",
                "optionsJP": ["2575の2725", "5275の2725", "5275の5275", "2725の5275"],
                "optionsEN": ["2575-2725", "5275-2725", "5275-5275", "2725-5275"],
                "answer": 1
            },
            {
                "questionJP": "お客[きゃく]さんは次[つぎ]に何[なに]について聞[き]きましたか？",
                "questionEN": "What did the customer ask about next?",
                "optionsJP": ["場所[ばしょ]", "値段[ねだん]", "営業時間[えいぎょうじかん]", "名前[なまえ]"],
                "optionsEN": ["Location", "Price", "Business hours", "Name"],
                answer: 2
            },
            {
                "questionJP": "そちらは何時[なんじ]まで開[あ]いていますか？",
                "questionEN": "Until what time are they open?",
                "optionsJP": ["9時[じ]まで", "10時[じ]まで", "11時[じ]まで", "12時[じ]まで"],
                "optionsEN": ["Until 9 o'clock", "Until 10 o'clock", "Until 11 o'clock", "Until 12 o'clock"],
                answer: 1
            },
            {
                "questionJP": "休みは何曜日[なんようび]ですか？",
                "questionEN": "Which day is the holiday?",
                "optionsJP": ["月曜日[げつようび]", "土曜日[どようび]", "日曜日[にちようび]", "金曜日[きんようび]"],
                "optionsEN": ["Monday", "Saturday", "Sunday", "Friday"],
                answer: 2
            },
            {
                questionJP: '最後[さいご]に、お客[きゃく]さんは何[なん]と言[い]いましたか？',
                questionEN: 'Finally, what did the customer say?',
                optionsJP: ['また来[き]ます', 'どういたしまして', 'はい、わかりました', 'そうですか。どうも'],
                optionsEN: ["I will come again", "You're welcome", "Yes, I understood", "I see. Thanks."],
                answer: 3
            }
        ]
    },
    {
      "id": "b2_mnn_l5_kaiwa",
      "mnnLesson": 5,
      "title": "Lesson 5: Conversation - Asking about Trains",
      "description": "Listen to someone asking for information about a train to Koshien.",
      "audioSrc": "/assets/audio/listening/mnn_l5.mp3",
      "transcript": "sub : この電車[でんしゃ]は甲子園[こうしえん]へ行[い]きますか?\n（店員[てんいん] B：）すみません。甲子園[こうしえん]までいくらですか?\n（客[きゃく] A：）350 円[えん]です。\n（店員[てんいん] B：）350 円[えん]ですね。ありがとうございました。\n（客[きゃく] A：）どういたしまして。\n（客[きゃく] A：）すみません。甲子園[こうしえん]は何番線[なんばんせん]ですか?\n（店員[てんいん] B：）5 番線[ばんせん]です。\n（客[きゃく] A：）どうも。\n（客[きゃく] A：）あの、この電車[でんしゃ]は甲子園[こうしえん]へ行[い]きますか?\n（店員[てんいん] B：）いえ、次[つぎ]の普通[ふつう]ですよ。\n（客[きゃく] A：）そうですか。どうも。",
      "translation": "sub : Does this train go to Koshien?\n(Clerk B:) Excuse me. How much is it to Koshien?\n(Customer A:) It's 350 yen.\n(Clerk B:) 350 yen, is it. Thank you very much.\n(Customer A:) You're welcome.\n(Customer A:) Excuse me. What platform number is for Koshien?\n(Clerk B:) It's Platform 5.\n(Customer A:) Thanks.\n(Customer A:) Um, does this train go to Koshien?\n(Clerk B:) No, the next local one does.\n(Customer A:) I see. Thanks.",
      "questions": [
          {
              "questionJP": "客[きゃく]さんが行[い]きたい場所[ばしょ]はどこですか？",
              "questionEN": "Where does the customer want to go?",
              "optionsJP": ["大阪[おおさか]", "京都[きょうと]", "甲子園[こうしえん]", "神戸[こうべ]"],
              "optionsEN": ["Osaka", "Kyoto", "Koshien", "Kobe"],
              "answer": 2
          },
          {
              "questionJP": "甲子園[こうしえん]までいくらですか？",
              "questionEN": "How much is it to Koshien?",
              "optionsJP": ["250円[えん]", "300円[えん]", "350円[えん]", "400円[えん]"],
              "optionsEN": ["250 yen", "300 yen", "350 yen", "400 yen"],
              "answer": 2
          },
          {
              "questionJP": "甲子園[こうしえん]は何番線[なんばんせん]ですか？",
              "questionEN": "What platform number is for Koshien?",
              "optionsJP": ["3番線[ばんせん]", "4番線[ばんせん]", "5番線[ばんせん]", "6番線[ばんせん]"],
              "optionsEN": ["Platform 3", "Platform 4", "Platform 5", "Platform 6"],
              answer: 2
          },
          {
              "questionJP": "最初[さいしょ]に質問[しつもん]した電車[でんしゃ]は甲子園[こうしえん]に行[い]きますか？",
              "questionEN": "Does the train initially asked about go to Koshien?",
              "optionsJP": ["はい、行[い]きます", "いいえ、行[い]きません", "普通[ふつう]なら行[い]きます", "急行[きゅうこう]だけです"],
              "optionsEN": ["Yes, it goes", "No, it doesn't go", "It goes if it's local", "Only the express"],
              answer: 1
          },
          {
              "questionJP": "甲子園[こうしえん]へ行[い]く電車[でんしゃ]はどれですか？",
              "questionEN": "Which train goes to Koshien?",
              "optionsJP": ["今[いま]の電車[でんしゃ]", "次[つぎ]の普通[ふつう]", "次[つぎ]の急行[きゅうこう]", "どの電車[でんしゃ]も行[い]きません"],
              "optionsEN": ["The current train", "The next local train", "The next express train", "None of the trains go"],
              answer: 1
          },
          {
              "questionJP": "値段[ねだん]を聞[き]いた後[あと]、客[きゃく]さんは何[なん]と言[い]いましたか？",
              "questionEN": "After asking the price, what did the customer say?",
              "optionsJP": ["どういたしまして", "ありがとうございました", "すみません", "これ を ください"],
              "optionsEN": ["You're welcome", "Thank you very much", "Excuse me", "I'll take this one"],
              answer: 1
          }
      ]
  },{
    "id": "b2_mnn_l6_kaiwa",
    "mnnLesson": 6,
    "title": "Lesson 6: Conversation - Making an Invitation",
    "description": "Listen to someone inviting Miller-san to go cherry blossom viewing.",
    "audioSrc": "/assets/audio/listening/mnn_l6.mp3",
    "transcript": "（A：）ミラーさん\n（ミラー：）何[なん]ですか?\n（A：）明日[あした]友達[ともだち]とお花見[はなみ]をします。ミラーさんも一緒[いっしょ]に行[い]きませんか?\n（ミラー：）いいですね。どこへ行[い]きますか?\n（A：）大阪城[おおさかじょう]です。\n（ミラー：）何時[なんじ]に行[い]きますか?\n（A：）10時[じ]に大阪駅[おおさかえき]で会[あ]いましょう。\n（ミラー：）わかりました。\n（A：）じゃ、また明日[あした]。",
    "translation": "(A:) Mr. Miller.\n(Miller:) Yes?\n(A:) I'm going cherry blossom viewing with a friend tomorrow. Would you like to go together, Mr. Miller?\n(Miller:) Sounds good. Where are you going?\n(A:) To Osaka Castle.\n(Miller:) What time are you going?\n(A:) Let's meet at Osaka Station at 10 o'clock.\n(Miller:) Understood.\n(A:) Okay, see you tomorrow.",
    "questions": [
        {
            "questionJP": "何[なに]をしますか？",
            "questionEN": "What will they do?",
            "optionsJP": ["食事[しょくじ]", "お花見[はなみ]", "買[か]い物[もの]", "映画[えいが]"],
            "optionsEN": ["Have a meal", "Go cherry blossom viewing", "Go shopping", "Watch a movie"],
            "answer": 1
        },
        {
            "questionJP": "誰[だれ]が誘[さそ]われましたか？",
            "questionEN": "Who was invited?",
            "optionsJP": ["サントスさん", "ミラーさん", "山田[やまだ]さん", "田中[たなか]さん"],
            "optionsEN": ["Mr. Santos", "Mr. Miller", "Mr. Yamada", "Mr. Tanaka"],
            answer: 1
        },
        {
            "questionJP": "お花見[はなみ]はどこへ行[い]きますか？",
            "questionEN": "Where will they go for cherry blossom viewing?",
            "optionsJP": ["公園[こうえん]", "大阪駅[おおさかえき]", "大阪城[おおさかじょう]", "川辺[かわべ]"],
            "optionsEN": ["A park", "Osaka Station", "Osaka Castle", "Riverside"],
            answer: 2
        },
        {
            "questionJP": "何時[なんじ]に会[あ]いますか？",
            "questionEN": "What time will they meet?",
            "optionsJP": ["9時[じ]", "10時[じ]", "11時[じ]", "昼[ひる]12時[じ]"],
            "optionsEN": ["9 o'clock", "10 o'clock", "11 o'clock", "12 o'clock (noon)"],
            answer: 1
        },
        {
            "questionJP": "どこで会[あ]いますか？",
            "questionEN": "Where will they meet?",
            "optionsJP": ["大阪城[おおさかじょう]で", "大阪駅[おおさかえき]で", "友達[ともだち]の家[いえ]で", "公園[こうえん]で"],
            "optionsEN": ["At Osaka Castle", "At Osaka Station", "At a friend's house", "At a park"],
            answer: 1
        },
        {
            "questionJP": "ミラーさんの返事[へんじ]は何[なん]でしたか？",
            "questionEN": "What was Mr. Miller's reply?",
            "optionsJP": ["行[い]きません", "ちょっと…", "いいですね", "忙[いそが]しいです"],
            "optionsEN": ["I won't go", "Well...", "Sounds good", "I'm busy"],
            answer: 2
        }
    ]
  },
  {
  "id": "b2_mnn_l7_kaiwa",
  "mnnLesson": 7,
  "title": "Lesson 7: Conversation - Receiving a Guest",
  "description": "Listen to Santos-san visiting someone's home and being offered coffee.",
  "audioSrc": "/assets/audio/listening/mnn_l7.mp3",
  "transcript": "（A：）いらっしゃい。\n（サントス：）はい、サントスです。\n（A：）いらっしゃい。どうぞお上[あ]がりください。\n（サントス：）失礼[しつれい]します。\n（A：）コーヒーはいかがですか?\n（サントス：）ありがとうございます。\n（A：）どうぞ。\n（サントス：）いただきます。このスプーン素敵[すてき]ですね。\n（A：）ええ、会社[かいしゃ]の人[ひと]にもらいました。メキシコのお土産[みやげ]です。",
  "translation": "(A:) Welcome.\n(Santos:) Yes, it's Santos.\n(A:) Welcome. Please come in.\n(Santos:) Excuse me (for entering).\n(A:) Would you like some coffee?\n(Santos:) Thank you very much.\n(A:) Please (take it).\n(Santos:) Thank you (before eating/drinking). This spoon is lovely/nice.\n(A:) Yes, I received it from someone at my company. It's a souvenir from Mexico.",
  "questions": [
      {
          "questionJP": "誰[だれ]が家[いえ]を訪[たず]ねましたか？",
          "questionEN": "Who visited the house?",
          "optionsJP": ["田中[たなか]さん", "山田[やまだ]さん", "ミラーさん", "サントスさん"],
          "optionsEN": ["Mr. Tanaka", "Mr. Yamada", "Mr. Miller", "Mr. Santos"],
          "answer": 3
      },
      {
          "questionJP": "家[いえ]の人[ひと]は客[きゃく]さんに何[なに]を勧[すす]めましたか？",
          "questionEN": "What did the host offer the guest?",
          "optionsJP": ["お茶[ちゃ]", "ジュース", "コーヒー", "水[みず]"],
          "optionsEN": ["Tea", "Juice", "Coffee", "Water"],
          "answer": 2
      },
      {
          "questionJP": "客[きゃく]さんは何[なに]を褒[ほ]めましたか？",
          "questionEN": "What did the guest compliment?",
          "optionsJP": ["カップ", "スプーン", "テーブル", "部屋[へや]"],
          "optionsEN": ["The cup", "The spoon", "The table", "The room"],
          "answer": 1
      },
      {
          "questionJP": "客[きゃく]さんが褒[ほ]めた物[もの]はどこのお土産[みやげ]ですか？",
          "questionEN": "Where is the item the guest complimented from (as a souvenir)?",
          "optionsJP": ["日本[にほん]", "メキシコ", "アメリカ", "フランス"],
          "optionsEN": ["Japan", "Mexico", "America", "France"],
          answer: 1
      },
      {
          "questionJP": "家[いえ]の人[ひと]は、その物[もの]をどうやって手[て]に入[い]れましたか？",
          "questionEN": "How did the host obtain that item?",
          "optionsJP": ["自分[じぶん]で買[か]いました", "友達[ともだち]にもらいました", "会社[かいしゃ]の人[ひと]にもらいました", "家族[かぞく]にもらいました"],
          "optionsEN": ["Bought it themselves", "Received it from a friend", "Received it from someone at their company", "Received it from family"],
          answer: 2
      },
      {
          "questionJP": "サントスさんは家[いえ]に入[はい]る時[とき]、何[なん]と言[い]いましたか？",
          "questionEN": "What did Santos say when entering the house?",
          "optionsJP": ["こんばんは", "失礼[しつれい]します", "お邪魔[じゃま]します", "お疲[つか]れ様[さま]です"],
          "optionsEN": ["Good evening", "Excuse me (for entering)", "Sorry for disturbing", "Thank you for your hard work"],
          answer: 1
      }
  ]
  },
  {
  "id": "b2_mnn_l8_kaiwa",
  "mnnLesson": 8,
  "title": "Lesson 8: Conversation - Talking about Life and Work, and Leaving",
  "description": "Listen to a conversation about life and work in Japan, and someone taking their leave.",
  "audioSrc": "/assets/audio/listening/mnn_l8.mp3",
  "transcript": "（A：）マリアさん、日本[にほん]の生活[せいかつ]はどうですか?\n（マリア：）毎日[まいにち]とても楽[たの]しいです。\n（A：）そうですか。\n（マリア：）サントスさん、お仕事[しごと]はどうですか?\n（サントス：）そうですね。忙[いそが]しいですが面白[おもしろ]いです。\n（A：）コーヒーもう 1 杯[はい]いかがですか?\n（サントス：）いいえ、結構[けっこう]です。\n（サントス：）あ、もう 6 時[じ]ですね。そろそろ失礼[しつれい]します。\n（A：）そうですか。\n（サントス：）今日[きょう]はどうもありがとうございました。\n（A：）いいえ、またいらっしゃってください。",
  "translation": "(A:) Maria, how is your life in Japan?\n(Maria:) It's very enjoyable every day.\n(A:) I see.\n(Maria:) Santos, how is your work?\n(Santos:) Well, it's busy but interesting.\n(A:) Would you like another cup of coffee?\n(Santos:) No, thank you.\n(Santos:) Oh, it's already 6 o'clock, isn't it? I should be leaving soon.\n(A:) I see.\n(Santos:) Thank you very much for today.\n(A:) Not at all, please come again.",
  "questions": [
      {
          "questionJP": "マリアさんの日本[にほん]での生活[せいかつ]はどうですか？",
          "questionEN": "How is Maria's life in Japan?",
          "optionsJP": ["難[むずか]しいです", "忙[いそが]しいです", "毎日[まいにち]楽[たの]しいです", "大変[たいへん]です"],
          "optionsEN": ["It's difficult", "It's busy", "It's enjoyable every day", "It's tough"],
          "answer": 2
      },
      {
          "questionJP": "サントスさんのお仕事[しごと]はどうですか？",
          "questionEN": "How is Santos's work?",
          "optionsJP": ["楽[たの]しいですが忙[いそが]しくないです", "忙[いそが]しいですが面白[おもしろ]いです", "大変[たいへん]ですが面白[おもしろ]くないです", "楽[たの]しくて簡単[かんたん]です"],
          "optionsEN": ["It's enjoyable but not busy", "It's busy but interesting", "It's tough but not interesting", "It's enjoyable and easy"],
          "answer": 1
      },
      {
          "questionJP": "サントスさんはコーヒーをもう1杯[はい]飲[の]みましたか？",
          "questionEN": "Did Santos drink another cup of coffee?",
          "optionsJP": ["はい、飲[の]みました", "いいえ、飲[の]みませんでした", "もう飲[の]んだ後[あと]でした", "飲[の]みたいと言[い]いました"],
          "optionsEN": ["Yes, he did", "No, he didn't", "He had already drunk it", "He said he wanted to drink it"],
          "answer": 1
      },
      {
          "questionJP": "サントスさんが帰[かえ]る時間[じかん]はだいたい何時[なんじ]でしたか？",
          "questionEN": "Approximately what time was it when Santos left?",
          "optionsJP": ["5時[じ]", "6時[じ]", "7時[じ]", "8時[じ]"],
          "optionsEN": ["5 o'clock", "6 o'clock", "7 o'clock", "8 o'clock"],
          "answer": 1
      },
      {
          "questionJP": "サントスさんは帰[かえ]る時[とき]、何[なん]と言[い]いましたか？",
          "questionEN": "What did Santos say when he left?",
          "optionsJP": ["さようなら", "お気[き]をつけて", "そろそろ失礼[しつれい]します", "またね"],
          "optionsEN": ["Goodbye", "Take care", "I should be leaving soon", "See you"],
          "answer": 2
      },
      {
          "questionJP": "家[いえ]の人[ひと]はサントスさんに何[なん]と言[い]って見送[みおく]りましたか？",
          "questionEN": "What did the host say to see off Santos?",
          "optionsJP": ["気[き]をつけて帰[かえ]ってね", "ありがとうございました", "またいらっしゃってください", "お疲[つか]れ様[さま]でした"],
          "optionsEN": ["Please go home carefully", "Thank you very much", "Please come again", "Thank you for your hard work"],
          answer: 2
      }
  ]
  },
  {
  "id": "b2_mnn_l9_kaiwa",
  "mnnLesson": 9,
  "title": "Lesson 9: Conversation - Making an Invitation and Declining",
  "description": "Listen to someone inviting Mr. Kimura to a classical concert, and Mr. Kimura declining.",
  "audioSrc": "/assets/audio/listening/mnn_l9.mp3",
  "transcript": "（ミラー：）はい。\n（木村[きむら]：）木村[きむら]さんですか?ミラーです。\n（木村[きむら]：）ああ、ミラーさん、こんばんは。お元気[げんき]ですか?\n（ミラー：）ええ、元気[げんき]です。あの、木村[きむら]さん、クラシックのコンサート一緒[いっしょ]にいかがですか?\n（木村[きむら]：）いいですね。いつですか?\n（ミラー：）来週[らいしゅう]の金曜日[きんようび]の晩[ばん]です。\n（木村[きむら]：）金曜日[きんようび]ですか。か、金曜日[きんようび]の晩[ばん]はちょっと。\n（ミラー：）ダめですか?\n（木村[きむら]：）ええ、残念[ざんねん]ですが友達[ともだち]と約束[やくそく]がありますから。\n（ミラー：）そうですか。\n（木村[きむら]：）え、また今度[こんど]お願[ねが]いします。",
  "translation": "(Miller:) Yes.\n(Kimura:) Is this Mr. Kimura? It's Miller.\n(Kimura:) Oh, Mr. Miller, good evening. How are you?\n(Miller:) Yes, I'm fine. Um, Mr. Kimura, would you like to go to a classical concert together?\n(Kimura:) Sounds good. When is it?\n(Miller:) It's next Friday evening.\n(Kimura:) Friday, is it? Ah, Friday evening is a bit...\n(Miller:) Not possible?\n(Kimura:) Yes, unfortunately, I have an appointment with a friend.\n(Miller:) I see.\n(Kimura:) Well, please ask me again another time.",
  "questions": [
      {
          "questionJP": "電話[でんわ]をかけたのは誰[だれ]ですか？",
          "questionEN": "Who made the phone call?",
          "optionsJP": ["木村[きむら]さん", "ミラーさん", "友達[ともだち]", "家族[かぞく]"],
          "optionsEN": ["Mr. Kimura", "Mr. Miller", "A friend", "Family"],
          "answer": 1
      },
      {
          "questionJP": "ミラーさんは木村[きむら]さんを何[なん]に誘[さそ]いましたか？",
          "questionEN": "What did Mr. Miller invite Mr. Kimura to?",
          "optionsJP": ["映画[えいが]", "食事[しょくじ]", "クラシックのコンサート", "買[か]い物[もの]"],
          "optionsEN": ["A movie", "A meal", "A classical concert", "Shopping"],
          "answer": 2
      },
      {
          "questionJP": "誘[さそ]われたイベントはいつですか？",
          "questionEN": "When is the invited event?",
          "optionsJP": ["来週[らいしゅう]の土曜日[どようび]の晩[ばん]", "今週[こんしゅう]の金曜日[きんようび]の晩[ばん]", "来週[らいしゅう]の金曜日[きんようび]の晩[ばん]", "明日[あした]の晩[ばん]"],
          "optionsEN": ["Next Saturday evening", "This Friday evening", "Next Friday evening", "Tomorrow evening"],
          "answer": 2
      },
      {
          "questionJP": "木村[きむら]さんはどうして誘[さそ]いを断[ことわ]りましたか？",
          "questionEN": "Why did Mr. Kimura decline the invitation?",
          "optionsJP": ["忙[いそが]しいから", "体調[たいちょう]が悪[わる]いから", "興味[きょうみ]がないから", "友達[ともだち]と約束[やくそく]があるから"],
          "optionsEN": ["Because he's busy", "Because he's not feeling well", "Because he's not interested", "Because he has an appointment with a friend"],
          "answer": 3
      },
      {
          "questionJP": "誘[さそ]いを断[ことわ]る時[とき]、木村[きむら]さんは残念[ざんねん]な気持[きも]ちを表[あらわ]すために何[なん]と言[い]いましたか？",
          "questionEN": "When declining the invitation, what did Mr. Kimura say to express a feeling of regret?",
          "optionsJP": ["いいですね", "ちょっと…", "残念[ざんねん]ですが", "結構[けっこう]です"],
          "optionsEN": ["Sounds good", "Well...", "Unfortunately, but...", "No, thank you"],
          "answer": 2
      },
      {
          "questionJP": "最後[さいご]に、木村[きむら]さんはミラーさんに何[なん]と言[い]いましたか？",
          "questionEN": "Finally, what did Mr. Kimura say to Mr. Miller?",
          "optionsJP": ["また電話[でんわ]します", "また今度[こんど]お願[ねが]いします", "気[き]をつけて帰[かえ]ってね", "楽[たの]しんでください"],
          "optionsEN": ["I will call again", "Please ask me again another time", "Please go home carefully", "Please enjoy yourself"],
          "answer": 1
      }
  ]
  },
          {
            "id": "b2_mnn_l10_kaiwa",
            "mnnLesson": 10,
            "title": "Lesson 10: Conversation - Asking for Directions and Finding Items",
            "description": "Listen to someone asking for directions to Asia Store and then looking for 'Plaa' (likely Nam Pla - fish sauce) inside.",
            "audioSrc": "/assets/audio/listening/mnn_l10.mp3",
            "transcript": "（A：）すみません。アジアストアはどこですか?\n（B：）アジアストアですか?あそこに白[しろ]いビルがありますね。あのビルの中[なか]です。\n（A：）そうですか。どうもすみません。\n（B：）いいえ。\n（A：）あのプラーありますか?\n（B：）はい。あちらに大[タイ]料理[りょうり]のコーナーがあります。 ナンプラーは 1 番下[いちばんした]です。\n（A：）わかりました。どうも",
            "translation": "(A:) Excuse me. Where is Asia Store?\n(B:) Asia Store? You see that white building over there? It's inside that building.\n(A:) I see. Thank you very much.\n(B:) Not at all.\n(A:) Do you have that Plaa?\n(B:) Yes. There's a Thai food corner over there. The Nam Pla is on the very bottom shelf.\n(A:) Understood. Thanks.",
            "questions": [
                {
                    "questionJP": "お客[きゃく]さんが最初[さいしょ]に探[さが]しているお店[みせ]は何[なん]ですか？",
                    "questionEN": "What is the store the customer is looking for first?",
                    "optionsJP": ["スーパー", "白いビル", "アジアストア", "デパート"],
                    "optionsEN": ["Supermarket", "White building", "Asia Store", "Department store"],
                    "answer": 2
                },
                {
                    "questionJP": "アジアストアはどこにありますか？",
                    "questionEN": "Where is Asia Store located?",
                    "optionsJP": ["駅[えき]の前[まえ]", "白いビルの中[なか]", "道[みち]の向[む]こう側[がわ]", "デパートの隣[となり]"],
                    "optionsEN": ["In front of the station", "Inside the white building", "Across the street", "Next to the department store"],
                    "answer": 1
                },
                {
                    "questionJP": "お店[みせ]の場所[ばしょ]を聞[き]いた後[あと]、お客[きゃく]さんは何[なん]と言[い]いましたか？",
                    "questionEN": "After asking for the store's location, what did the customer say?",
                    "optionsJP": ["ありがとうございます", "どういたしまして", "そうですか。どうもすみません。", "また来[き]ます"],
                    "optionsEN": ["Thank you very much", "You're welcome", "I see. Thank you very much.", "I will come again"],
                    "answer": 2
                },
                {
                    "questionJP": "お客[きゃく]さんはアジアストアで何[なに]を探[さが]していますか？",
                    "questionEN": "What is the customer looking for inside Asia Store?",
                    "optionsJP": ["お米[こめ]", "パン", "野菜[やさい]", "プラー (ナンプラー)"],
                    "optionsEN": ["Rice", "Bread", "Vegetables", "Plaa (Nam Pla)"],
                    "answer": 3
                },
                {
                    "questionJP": "その品物[しなもの]はどの料理[りょうり]のコーナーにありますか？",
                    "questionEN": "Which cuisine's corner is that item in?",
                    "optionsJP": ["日本料理[にほんりょうり]", "韓国料理[かんこくりょうり]", "タイ料理[りょうり]", "中国料理[ちゅうごくりょうり]"],
                    "optionsEN": ["Japanese food", "Korean food", "Thai food", "Chinese food"],
                    answer: 2
                },
                {
                    "questionJP": "ナンプラーは棚[たな]のどこにありますか？",
                    "questionEN": "Where on the shelf is the Nam Pla?",
                    "optionsJP": ["一番上[いちばんうえ]", "真[ま]ん中[なか]", "一番下[いちばんした]", "聞[き]いていません"],
                    "optionsEN": ["The very top", "The middle", "The very bottom", "He didn't ask"],
                    answer: 2
                }
            ]
        },
        {
          "id": "b2_mnn_l11_kaiwa",
          "mnnLesson": 11,
          "title": "Lesson 11: Conversation - Sending Mail",
          "description": "Listen to a conversation greeting someone going out and then a scene at the post office sending a package.",
          "audioSrc": "/assets/audio/listening/mnn_l11.mp3",
          "transcript": "（A：）いい天気[てんき]ですね。お出[で]かけですか?\n（B：）ええ、ちょっと郵便局[ゆうびんきょく]まで。\n（A：）そうですか。行[い]ってらっしゃい。\n（B：）行[い]ってきます。\n\n（客[きゃく] A：）あの、これオーストラリアまでお願[ねが]いします。\n（店員[てんいん] B：）はい。船便[ふなびん]ですか?航空便[こうくうびん]ですか?\n（客[きゃく] A：）航空便[こうくうびん]はいくらですか?\n（店員[てんいん] B：）7600 円[えん]です。 船便[ふなびん]は 3450 円[えん]です。\n（客[きゃく] A：）どのくらいかかりますか?\n（店員[てんいん] B：）航空便[こうくうびん]で 7 日[か]、船便[ふなびん]で 2 ヶ月[かげつ]ぐらいです。\n（客[きゃく] A：）じゃあ船便[ふなびん]でお願[ねが]いします。",
          "translation": "(A:) Nice weather, isn't it? Are you going out?\n(B:) Yes, just to the post office.\n(A:) I see. Please go and come back safely.\n(B:) I'm going and will come back.\n\n(Customer A:) Um, please send this to Australia.\n(Clerk B:) Yes. Surface mail or airmail?\n(Customer A:) How much is airmail?\n(Clerk B:) It's 7600 yen. Surface mail is 3450 yen.\n(Customer A:) How long does it take?\n(Clerk B:) About 7 days by airmail, and about 2 months by surface mail.\n(Customer A:) Okay, then surface mail please.",
          "questions": [
              {
                  "questionJP": "最初[さいしょ]に話[はな]している人[ひと]はどこへ行[い]きますか？",
                  "questionEN": "Where is the person speaking first going?",
                  "optionsJP": ["郵便局[ゆうびんきょく]", "病院[びょういん]", "学校[がっこう]", "会社[かいしゃ]"],
                  "optionsEN": ["Post office", "Hospital", "School", "Company"],
                  "answer": 0
              },
              {
                  "questionJP": "送[おく]りたいもの[もの]はどこへ送[おく]りますか？",
                  "questionEN": "Where is the item to be sent going?",
                  "optionsJP": ["日本[にほん]", "アメリカ", "中国[ちゅうごく]", "オーストラリア"],
                  "optionsEN": ["Japan", "America", "China", "Australia"],
                  "answer": 3
              },
              {
                  "questionJP": "航空便[こうくうびん]はいくらですか？",
                  "questionEN": "How much is airmail?",
                  "optionsJP": ["3450円[えん]", "7600円[えん]", "900円[えん]", "それ以上[いじょう]です"],
                  "optionsEN": ["3450 yen", "7600 yen", "900 yen", "More than that"],
                  "answer": 1
              },
              {
                  "questionJP": "船便[ふなびん]はどのくらいかかりますか？",
                  "questionEN": "How long does surface mail take?",
                  "optionsJP": ["7日[か]", "2週間[しゅうかん]ぐらい", "1ヶ月[かげつ]ぐらい", "2ヶ月[かげつ]ぐらい"],
                  "optionsEN": ["7 days", "About 2 weeks", "About 1 month", "About 2 months"],
                  "answer": 3
              },
              {
                  "questionJP": "お客[きゃく]さんは最終的[さいしゅうてき]にどちらの方法[ほうほう]を選[えら]びましたか？",
                  "questionEN": "Which method did the customer ultimately choose?",
                  "optionsJP": ["船便[ふなびん]", "航空便[こうくうびん]", "速達[そくたつ]", "国際[こくさい]小包[こづつみ]"],
                  "optionsEN": ["Surface mail", "Airmail", "Express mail", "International parcel"],
                  "answer": 0
              },
              {
                  "questionJP": "航空便[こうくうびん]は船便[ふなびん]より速[はや]いですか、遅[おそ]いですか？",
                  "questionEN": "Is airmail faster or slower than surface mail?",
                  "optionsJP": ["速[はや]いです", "遅[おそ]いです", "同[おな]じぐらいです", "会話[かいわ]ではわかりません"],
                  "optionsEN": ["It's faster", "It's slower", "It's about the same", "It's unclear from the conversation"],
                  "answer": 0
              }
          ]
      },
      {
        "id": "b2_mnn_l12_kaiwa",
        "mnnLesson": 12,
        "title": "Lesson 12: Conversation - Talking about an Event",
        "description": "Listen to someone returning home, giving a souvenir, and talking about the Gion Festival.",
        "audioSrc": "/assets/audio/listening/mnn_l12.mp3",
        "transcript": "（A：）ただいま。\n（B：）お帰[かえ]りなさい。\n（A：）これ京都[きょうと]のお土産[みやげ]です。\n（B：）どうもすみません。祇園祭[ぎおんまつり]はどうでしたか?\n（A：）面白[おもしろ]かったです。とても賑[にぎ]やかでした。\n（B：）祇園祭[ぎおんまつり]は京都[きょうと]の祭[まつ]りで 1 番[ばん]有名[ゆうめい]ですからね。\n（A：）そうですか。写真[しゃしん]をたくさん撮[と]りました。これです。\n（B：）うわあ、すごい人[ひと]ですね。\n（A：）ええ、ちょっと疲[つか]れました。",
        "translation": "(A:) I'm home.\n(B:) Welcome back.\n(A:) This is a souvenir from Kyoto.\n(B:) Thank you very much. How was the Gion Festival?\n(A:) It was interesting. It was very lively.\n(B:) Well, the Gion Festival is the most famous festival in Kyoto, isn't it?\n(A:) Is that so? I took a lot of pictures. Here they are.\n(B:) Wow, there were a lot of people, weren't there?\n(A:) Yes, I was a little tired.",
        "questions": [
            {
                "questionJP": "家[いえ]に帰[かえ]ってきた人[ひと]はどこへ行[い]っていましたか？",
                "questionEN": "Where had the person who returned home been?",
                "optionsJP": ["大阪[おおさか]", "東京[とうきょう]", "奈良[なら]", "京都[きょうと]"],
                "optionsEN": ["Osaka", "Tokyo", "Nara", "Kyoto"],
                "answer": 3
            },
            {
                "questionJP": "家[いえ]に帰[かえ]ってきた人[ひと]はお土産[みやげ]をあげましたか？",
                "questionEN": "Did the person who returned home give a souvenir?",
                "optionsJP": ["はい、あげました", "いいえ、あげませんでした", "買[か]いませんでした", "忘[わす]れました"],
                "optionsEN": ["Yes, they did", "No, they didn't", "They didn't buy one", "They forgot"],
                "answer": 0
            },
            {
                "questionJP": "祇園祭[ぎおんまつり]はどうでしたか？",
                "questionEN": "How was the Gion Festival?",
                "optionsJP": ["つまらなかったです", "静[しず]かでした", "面白[おもしろ]くて賑[にぎ]やかでした", "大変[たいへん]でした"],
                "optionsEN": ["It was boring", "It was quiet", "It was interesting and lively", "It was tough"],
                "answer": 2
            },
            {
                "questionJP": "祇園祭[ぎおんまつり]はどこのお祭[まつ]りですか？",
                "questionEN": "Which city's festival is the Gion Festival?",
                "optionsJP": ["大阪[おおさか]", "奈良[なら]", "東京[とうきょう]", "京都[きょうと]"],
                "optionsEN": ["Osaka", "Nara", "Tokyo", "Kyoto"],
                "answer": 3
            },
            {
                "questionJP": "京都[きょうと]で一番[いちばん]有名[ゆうめい]なお祭[まつ]りは何[なん]ですか？",
                "questionEN": "What is the most famous festival in Kyoto?",
                "optionsJP": ["時代祭[じだいまつり]", "葵祭[あおいまつり]", "祇園祭[ぎおんまつり]", "火祭[ひまつり]"],
                "optionsEN": ["Jidai Matsuri", "Aoi Matsuri", "Gion Matsuri", "Hi Matsuri"],
                "answer": 2
            },
            {
                "questionJP": "写真[しゃしん]を見[み]た人[ひと]は、何[なに]に驚[おどろ]きましたか？",
                "questionEN": "What did the person who saw the pictures marvel at?",
                "optionsJP": ["美[うつく]しい景色[けしき]", "美味しそうな食[た]べ物[もの]", "すごい人[ひと]の数[かず]", "面白[おもしろ]い建物[たてもの]"],
                "optionsEN": ["The beautiful scenery", "The delicious-looking food", "The incredible number of people", "The interesting buildings"],
                "answer": 2
            }
        ]
    }
      ],
      "intermediate": [
        {
          "id": "b2_mnn_l13_kaiwa",
          "mnnLesson": 13,
          "title": "Lesson 13: Conversation - Ordering Food and Paying Separately",
          "description": "Listen to two people going for lunch, ordering, and paying separately.",
          "audioSrc": "/assets/audio/listening/mnn_l13.mp3",
          "transcript": "（A：）もう 12 時[じ]ですよ。昼[ひる]ご飯[はん]を食[た]べに行[い]きませんか?\n（B：）ええ、\n（A：）どこへ行[い]きますか?\n（B：）そうですね。今日[きょう]は日本料理[にほんりょうり]が食[た]べたいですね。\n（A：）じゃ、鶴屋[つるや]へ行[い]きましょう。\n（店員[てんいん]：）ご注文[ごちゅうもん]は\n（A：）私[わたし]は天ぷら定食[てんぷらていしょく]。\n（B：）私[わたし]は牛丼[ぎゅうどん]。\n（店員[てんいん]：）天ぷら定食[てんぷらていしょく]と牛丼[ぎゅうどん]ですね。少々[しょうしょう]お待ち[おまち]ください。\n（店員[てんいん]：）1680 円[えん]でございます。\n（A：）すみません。別々[べつべつ]にお願[ねが]いします。\n（店員[てんいん]：）はい。天ぷら定食[てんぷらていしょく]は 980 円[えん]。牛丼[ぎゅうどん]は 700 円[えん]です。",
          "translation": "(A:) It's already 12 o'clock. Shall we go eat lunch?\n(B:) Yes.\n(A:) Where shall we go?\n(B:) Let's see. Today, I'd like to eat Japanese food.\n(A:) Okay, let's go to Tsuruya.\n(Clerk:) May I take your order?\n(A:) I'll have the Tempura Set Meal.\n(B:) I'll have the Gyudon.\n(Clerk:) Tempura Set Meal and Gyudon, got it. Please wait a moment.\n(Clerk:) That will be 1680 yen.\n(A:) Excuse me. Separately, please.\n(Clerk:) Yes. The Tempura Set Meal is 980 yen. The Gyudon is 700 yen.",
          "questions": [
              {
                  "questionJP": "昼[ひる]ご飯[はん]を食[た]べに行[い]こうと話[はな]し始[はじ]めた時[とき]、何時[なんじ]でしたか？",
                  "questionEN": "What time was it when they started talking about going for lunch?",
                  "optionsJP": ["11時[じ]", "12時[じ]", "1時[じ]", "10時[じ]"],
                  "optionsEN": ["11 o'clock", "12 o'clock", "1 o'clock", "10 o'clock"],
                  "answer": 1
              },
              {
                  "questionJP": "食[た]べたいと言[い]っていた料理[りょうり]の種類[しゅるい]は何[なん]ですか？",
                  "questionEN": "What type of cuisine did they say they wanted to eat?",
                  "optionsJP": ["中華料理[ちゅうかりょうり]", "韓国料理[かんこくりょうり]", "日本料理[にほんりょうり]", "イタリア料理[いたりありょうり]"],
                  "optionsEN": ["Chinese food", "Korean food", "Japanese food", "Italian food"],
                  "answer": 2
              },
              {
                  "questionJP": "行[い]くことにしたお店[みせ]の名前[なまえ]は何[なん]ですか？",
                  "questionEN": "What is the name of the restaurant they decided to go to?",
                  "optionsJP": ["さくら", "もみじ", "山田屋[やまだや]", "鶴屋[つるや]"],
                  "optionsEN": ["Sakura", "Momiji", "Yamada-ya", "Tsuru-ya"],
                  "answer": 3
              },
              {
                  "questionJP": "天ぷら定食[てんぷらていしょく]を注文[ちゅうもん]したのは誰[だれ]ですか？",
                  "questionEN": "Who ordered the Tempura Set Meal?",
                  "optionsJP": ["一人目[ひとりめ]のお客[きゃく]さん", "二人目[ふたりめ]のお客[きゃく]さん", "店員[てんいん]", "会話[かいわ]からはわからない"],
                  "optionsEN": ["The first customer", "The second customer", "The clerk", "Unclear from the conversation"],
                  "answer": 0
              },
              {
                  "questionJP": "二人[ふたり]が注文[ちゅうもん]した食事[しょくじ]の合計[ごうけい]金額[きんがく]はいくらでしたか？",
                  "questionEN": "What was the total amount for the meals they ordered?",
                  "optionsJP": ["700円[えん]", "980円[えん]", "1680円[えん]", "1780円[えん]"],
                  "optionsEN": ["700 yen", "980 yen", "1680 yen", "1780 yen"],
                  "answer": 2
              },
              {
                  "questionJP": "お客[きゃく]さんはどのように会計[かいけい]したいと言[い]いましたか？",
                  "questionEN": "How did the customer say they wanted to pay?",
                  "optionsJP": ["全部[ぜんぶ]一緒[いっしょ]に", "別々[べつべつ]に", "カードで", "後[あと]で払[はら]う"],
                  "optionsEN": ["All together", "Separately", "By card", "Pay later"],
                  "answer": 1
              }
          ]
      },
      {
        "id": "b2_mnn_l14_kaiwa",
        "mnnLesson": 14,
        "title": "Lesson 14: Conversation - Giving Directions in a Taxi",
        "description": "Listen to a customer giving directions to a taxi driver and paying the fare.",
        "audioSrc": "/assets/audio/listening/mnn_l14.mp3",
        "transcript": "（客[きゃく]：）緑町[みどりちょう]までお願[ねが]いします。\n（運転手[うんてんしゅ]：）緑町[みどりちょう]までお願[ねが]いします。\n（客[きゃく]：）はい。すみません。あの信号[しんごう]を右[みぎ]へ曲[ま]がってください。\n（運転手[うんてんしゅ]：）右[みぎ]ですね。\n（客[きゃく]：）ええ、\n（運転手[うんてんしゅ]：）まっすぐですか?\n（客[きゃく]：）ええ、まっすぐ行[い]ってください。あの花屋[はなや]の前[まえ]で止[と]めてください。\n（運転手[うんてんしゅ]：）はい。\n（運転手[うんてんしゅ]：）1800 円[えん]です。\n（客[きゃく]：）これで お願[ねが]いします。\n（運転手[うんてんしゅ]：）3200 円[えん]のお釣[つ]りです。ありがとうございました。",
        "translation": "(Customer:) To Midorimachi, please.\n(Driver:) To Midorimachi, please.\n(Customer:) Yes. Excuse me. Please turn right at that traffic light.\n(Driver:) Right, is it?\n(Customer:) Yes.\n(Driver:) Straight?\n(Customer:) Yes, please go straight. Please stop in front of that flower shop.\n(Driver:) Okay.\n(Driver:) That will be 1800 yen.\n(Customer:) With this, please.\n(Driver:) 3200 yen is your change. Thank you very much.",
        "questions": [
            {
                "questionJP": "お客[きゃく]さんはどこへ行[い]こうとしていますか？",
                "questionEN": "Where is the customer trying to go?",
                "optionsJP": ["駅[えき]", "緑町[みどりちょう]", "花屋[はなや]", "図書館[としょかん]"],
                "optionsEN": ["Station", "Midorimachi", "Flower shop", "Library"],
                "answer": 1
            },
            {
                "questionJP": "お客[きゃく]さんが最初[さいしょ]に教[おし]えた道順[みちじゅん]は何[なん]ですか？",
                "questionEN": "What was the first direction the customer gave?",
                "optionsJP": ["あの信号[しんごう]を左[ひだり]へ曲[ま]がって", "あの信号[しんごう]を右[みぎ]へ曲[ま]がって", "まっすぐ行[い]って", "ここで止[と]まって"],
                "optionsEN": ["Turn left at that traffic light", "Turn right at that traffic light", "Go straight", "Stop here"],
                "answer": 1
            },
            {
                "questionJP": "お客[きゃく]さんはどこで止[と]めてほしいと言[い]いましたか？",
                "questionEN": "Where did the customer ask the driver to stop?",
                "optionsJP": ["コンビニの前[まえ]", "駅[えき]の前[まえ]", "銀行[ぎんこう]の前[まえ]", "あの花屋[はなや]の前[まえ]"],
                "optionsEN": ["In front of the convenience store", "In front of the station", "In front of the bank", "In front of that flower shop"],
                "answer": 3
            },
            {
                "questionJP": "料金[りょうきん]はいくらでしたか？",
                "questionEN": "How much was the fare?",
                "optionsJP": ["1000円[えん]", "1800円[えん]", "3200円[えん]", "5000円[えん]"],
                "optionsEN": ["1000 yen", "1800 yen", "3200 yen", "5000 yen"],
                "answer": 1
            },
            {
                "questionJP": "お客[きゃく]さんはいくら払[はら]いましたか？",
                "questionEN": "How much did the customer pay?",
                "optionsJP": ["1800円[えん]", "3200円[えん]", "5000円[えん]", "わかりません"],
                "optionsEN": ["1800 yen", "3200 yen", "5000 yen", "Unclear"],
                "answer": 2
            },
            {
                "questionJP": "最後[さいご]に運転手[うんてんしゅ]は何[なん]と言[い]いましたか？",
                "questionEN": "Finally, what did the driver say?",
                "optionsJP": ["どういたしまして", "またお願[ねが]いします", "ありがとうございました", "どうぞ"],
                "optionsEN": ["You're welcome", "Please use our service again", "Thank you very much", "Please (take it)"],
                "answer": 2
            }
        ]
    },
    {
      "id": "b2_mnn_l15_kaiwa",
      "mnnLesson": 15,
      "title": "Lesson 15: Conversation - Talking about Family",
      "description": "Listen to a conversation where people talk about their families.",
      "audioSrc": "/assets/audio/listening/mnn_l15.mp3",
      "transcript": "（A：）いい映画[えいが]でしたね。\n（B：）ええ、私[わたし]は家族[かぞく]を思[おも]い出[だ]しました。\n（A：）そうですか。ミラーさんのご家族[かぞく]は?\n（ミラー：）両親[りょうしん]と姉[あね]が 1 人[ひとり]います。\n（A：）どちらにいらっしゃいますか?\n（ミラー：）両親[りょうしん]はニューヨークの近[ちか]くに住[す]んでいます。姉[あね]はロンドンで働[はたら]いています。\n（ミラー：）木村[きむら]さんのご家族[かぞく]は?\n（A：）3 人[にん]です。父[ちち]は銀行員[ぎんこういん]です。母[はは]は ここ で 英語[えいご] を 教[おし]え て い ます 。",
      "translation": "(A:) It was a good movie, wasn't it?\n(B:) Yes, it reminded me of my family.\n(A:) I see. How about Mr. Miller's family?\n(Miller:) I have my parents and one elder sister.\n(A:) Where are they?\n(Miller:) My parents live near New York. My elder sister works in London.\n(Miller:) How about Mr. Kimura's family?\n(A:) There are 3 people. My father is a banker. My mother teaches English here.",
      "questions": [
          {
              "questionJP": "映画[えいが]は何[なに]を思[おも]い出[だ]させましたか？",
              "questionEN": "What did the movie remind the person of?",
              "optionsJP": ["友達[ともだち]", "家族[かぞく]", "仕事[しごと]", "旅行[りょこう]"],
              "optionsEN": ["Friends", "Family", "Work", "Travel"],
              "answer": 1
          },
          {
              "questionJP": "ミラーさんには兄弟[きょうだい]が何人[なんにん]いますか？",
              "questionEN": "How many siblings does Mr. Miller have?",
              "optionsJP": ["一人[ひとり]もいません", "一人[ひとり]います", "二人[ふたり]います", "三人[さんにん]います"],
              "optionsEN": ["None", "One", "Two", "Three"],
              "answer": 1
          },
          {
              "questionJP": "ミラーさんの両親[りょうしん]はどこに住[す]んでいますか？",
              "questionEN": "Where do Mr. Miller's parents live?",
              "optionsJP": ["ロンドン", "大阪[おおさか]", "ニューヨークの近[ちか]くに住[す]んでいます", "ここ"],
              "optionsEN": ["London", "Osaka", "Near New York", "Here"],
              "answer": 2
          },
          {
              "questionJP": "ミラーさんの姉[あね]はどこで働[はたら]いていますか？",
              "questionEN": "Where does Mr. Miller's elder sister work?",
              "optionsJP": ["ニューヨーク", "日本[にほん]", "ロンドン", "ここ"],
              "optionsEN": ["New York", "Japan", "London", "Here"],
              "answer": 2
          },
          {
              "questionJP": "木村[きむら]さんの家族[かぞく]は何人[なんにん]ですか？",
              "questionEN": "How many people are in Mr. Kimura's family (as mentioned)?",
              "optionsJP": ["2人[ふたり]", "3人[さんにん]", "4人[よにん]", "5人[ごにん]"],
              "optionsEN": ["2 people", "3 people", "4 people", "5 people"],
              "answer": 1
          },
          {
              "questionJP": "木村[きむら]さんのお父[とう]さんの仕事[しごと]は何[なん]ですか？",
              "questionEN": "What is Mr. Kimura's father's job?",
              "optionsJP": ["先生[せんせい]", "会社員[かいしゃいん]", "銀行員[ぎんこういん]", "医者[いしゃ]"],
              "optionsEN": ["Teacher", "Company employee", "Banker", "Doctor"],
              "answer": 2
          },
      ]
  },
  {
    "id": "b2_mnn_l16_kaiwa",
    "mnnLesson": 16,
    "title": "Lesson 16: Conversation - Asking for Instructions (at an ATM)",
    "description": "Listen to someone asking for instructions on how to use a machine, specifically for withdrawing money.",
    "audioSrc": "/assets/audio/listening/mnn_l16.mp3",
    "transcript": "（お客[きゃく]：）すみませんが、ちょっと使[つか]い方[かた]を教[おし]えてください。\n（係[かかり]：）お引[ひ]き出[だ]しですか?\n（お客[きゃく]：）そうです。\n（係[かかり]：）じゃあまずここを押[お]してください。\n（お客[きゃく]：）はい。\n（係[かかり]：）次[つぎ]にキャッシュカードをここに入[い]れて暗証番号[あんしょうばんごう]をしてください。\n（お客[きゃく]：）はい、押[お]しました。\n（係[かかり]：）じゃあ金額[きんがく]を押[お]してください。\n（お客[きゃく]：）5 万円[まんえん]ですが 5\n（係[かかり]：）この万円[まんえん]を押[お]します。 それからこの確認[かくにん]ボタンを押[お]してください。\n（お客[きゃく]：）はい、どうもありがとうございました。",
    "translation": "(Customer:) Excuse me, but could you please show me how to use this?\n(Staff/Helper:) Is it for withdrawal?\n(Customer:) Yes, that's right.\n(Staff/Helper:) Okay, well first please press here.\n(Customer:) Okay.\n(Staff/Helper:) Next, insert your cash card here and enter your PIN.\n(Customer:) Yes, I pressed it.\n(Staff/Helper:) Okay, then please press the amount.\n(Customer:) It's 50,000 yen, but 5...\n(Staff/Helper:) You press this 'man en' (ten thousand yen) button. After that, please press this confirmation button.\n(Customer:) Okay, thank you very much.",
    "questions": [
        {
            "questionJP": "お客[きゃく]さんは何[なに]の使[つか]い方[かた]を知[し]りたいですか？",
            "questionEN": "What does the customer want to know how to use?",
            "optionsJP": ["電話[でんわ]", "自動販売機[じどうはんばいき]", "機械[きかい] (お引[ひ]き出[だ]し)", "コピー機[き]"],
            "optionsEN": ["Phone", "Vending machine", "Machine (for withdrawal)", "Copy machine"],
            "answer": 2
        },
        {
            "questionJP": "お客[きゃく]さんは何[なに]をしたいですか？",
            "questionEN": "What does the customer want to do?",
            "optionsJP": ["振[ふ]り込[こ]み", "残高照会[ざんだかしょうかい]", "お引[ひ]き出[だ]し", "入金[にゅうきん]"],
            "optionsEN": ["Transfer", "Check balance", "Withdrawal", "Deposit"],
            "answer": 2
        },
        {
            "questionJP": "係[かかり]の人[ひと]は、最初[さいしょ]にどこを押[お]すように言[い]いましたか？",
            "questionEN": "What did the staff/helper say to press first?",
            "optionsJP": ["キャンセルボタン", "確認[かくにん]ボタン", "金額[きんがく]ボタン", "ここ (機械[きかい]のある場所[ばしょ])"],
            "optionsEN": ["Cancel button", "Confirmation button", "Amount button", "Here (a specific spot on the machine)"],
            "answer": 3
        },
        {
            "questionJP": "次[つぎ]に何[なに]をしますか？",
            "questionEN": "What should be done next?",
            "optionsJP": ["暗証番号[あんしょうばんごう]を入力[にゅうりょく]する", "金額[きんがく]を押[お]す", "キャッシュカードを入[い]れる", "確認[かくにん]ボタンを押[お]す"],
            "optionsEN": ["Enter the PIN", "Press the amount", "Insert the cash card", "Press the confirmation button"],
            "answer": 2
        },
        {
            "questionJP": "お客[きゃく]さんが引[ひ]き出[だ]したい金額[きんがく]はいくらですか？",
            "questionEN": "How much does the customer want to withdraw?",
            "optionsJP": ["5千円[せんえん]", "5万円[まんえん]", "500円[えん]", "5千万円[せんまんえん]"],
            "optionsEN": ["5,000 yen", "50,000 yen", "500 yen", "50,000,000 yen"],
            "answer": 1
        },
        {
            "questionJP": "金額[きんがく]を入力[にゅうりょく]した後[あと]、何[なん]のボタンを押[お]しますか？",
            "questionEN": "After entering the amount, which button should be pressed?",
            "optionsJP": ["取消[とりけし]ボタン", "訂正[ていせい]ボタン", "確認[かくにん]ボタン", "再開[さいかい]ボタン"],
            "optionsEN": ["Cancel button", "Correction button", "Confirmation button", "Restart button"],
            "answer": 2
        }
    ]
  },
  {
  "id": "b2_mnn_l17_kaiwa",
  "mnnLesson": 17,
  "title": "Lesson 17: Conversation - Visiting a Doctor",
  "description": "Listen to someone visiting a doctor and describing their symptoms.",
  "audioSrc": "/assets/audio/listening/mnn_l17.mp3",
  "transcript": "（医者[いしゃ]：）どうしましたか?\n（患者[かんじゃ]：）昨日[きのう]から喉[のど]が痛[いた]くて熱[ねつ]も少[すこ]しあります。\n（医者[いしゃ]：）そうですか。ちょっと口[くち]を開[あ]けてください。風邪[かぜ]ですね。 2、3 日[にち]ゆっくり休[やす]んでください。\n（患者[かんじゃ]：）あの、明日[あした]から東京[とうきょう]へ出張[しゅっちょう]しなければなりません。\n（医者[いしゃ]：）じゃあ今日[きょう]は薬[くすり]を飲[の]んで早[はや]く寝[ね]てください。\n（患者[かんじゃ]：）はい。\n（医者[いしゃ]：）それから 今晩[こんばん]は。お風呂[ふろ]に入[はい]らないでくださいね。\n（患者[かんじゃ]：）はい、わかりました。\n（医者[いしゃ]：）じゃ、お大事[だいじ]に。\n（患者[かんじゃ]：）どうもありがとうございました。",
  "translation": "(Doctor:) What's wrong?\n(Patient:) My throat has been sore since yesterday and I also have a slight fever.\n(Doctor:) I see. Please open your mouth a little. It's a cold. Please rest for 2 or 3 days.\n(Patient:) Um, I have to go on a business trip to Tokyo starting tomorrow.\n(Doctor:) Well then, please take the medicine and go to bed early today.\n(Patient:) Okay.\n(Doctor:) Also, tonight. Please don't take a bath.\n(Patient:) Yes, I understand.\n(Doctor:) Well then, please take care.\n(Patient:) Thank you very much.",
  "questions": [
      {
          "questionJP": "患者[かんじゃ]さんは昨日[きのう]からどんな症状[しょうじょう]がありますか？",
          "questionEN": "What symptoms has the patient had since yesterday?",
          "optionsJP": ["頭[あたま]が痛[いた]い、鼻水[はなみず]がでる", "お腹[なか]が痛[いた]い、吐[は]き気[け]がする", "喉[のど]が痛[いた]い、熱[ねつ]がある", "咳[せき]がでる、だるい"],
          "optionsEN": ["Headache, runny nose", "Stomach ache, nausea", "Sore throat, fever", "Cough, tired"],
          "answer": 2
      },
      {
          "questionJP": "医者[いしゃ]の診断[しんだん]は何[なん]でしたか？",
          "questionEN": "What was the doctor's diagnosis?",
          "optionsJP": ["インフルエンザ", "風邪[かぜ]", "胃腸炎[いちょうえん]", "アレルギー"],
          "optionsEN": ["Influenza", "A cold", "Gastroenteritis", "Allergy"],
          "answer": 1
      },
      {
          "questionJP": "医者[いしゃ]は患者[かんじゃ]さんに最初[さいしょ]にどうするようにアドバイスしましたか？",
          "questionEN": "What did the doctor initially advise the patient to do?",
          "optionsJP": ["運動[うんどう]をする", "仕事[しごと]を続[つづ]ける", "旅行[りょこう]へ行[い]く", "2、3日[にち]休[やす]む"],
          "optionsEN": ["Exercise", "Continue working", "Go on a trip", "Rest for 2-3 days"],
          "answer": 3
      },
      {
          "questionJP": "患者[かんじゃ]さんは明日[あした]何[なに]をする予定[よてい]がありますか？",
          "questionEN": "What does the patient have planned for tomorrow?",
          "optionsJP": ["友達[ともだち]と会[あ]う", "病院[びょういん]へ行[い]く", "東京[とうきょう]へ出張[しゅっちょう]する", "家[いえ]で休[やす]む"],
          "optionsEN": ["Meet a friend", "Go to the hospital", "Go on a business trip to Tokyo", "Rest at home"],
          "answer": 2
      },
      {
          "questionJP": "医者[いしゃ]は今日[きょう]の夜[よる]、何[なに]をしないように言[い]いましたか？",
          "questionEN": "What did the doctor say not to do tonight?",
          "optionsJP": ["薬[くすり]を飲[の]む", "お風呂[ふろ]に入[はい]る", "早[はや]く寝[ね]る", "食[た]べ過[す]ぎる"],
          "optionsEN": ["Take medicine", "Take a bath", "Go to bed early", "Eat too much"],
          "answer": 1
      },
      {
          "questionJP": "会話[かいわ]の最後[さいご]に、医者[いしゃ]は患者[かんじゃ]さんに何[なん]と言[い]いましたか？",
          "questionEN": "At the end of the conversation, what did the doctor say to the patient?",
          "optionsJP": ["お疲[つか]れ様[さま]でした", "また来[き]てください", "お大事[だいじ]に", "気[き]をつけて"],
          "optionsEN": ["Thank you for your hard work", "Please come again", "Please take care", "Be careful"],
          "answer": 2
      }
  ]
  },
  {
  "id": "b2_mnn_l18_kaiwa",
  "mnnLesson": 18,
  "title": "Lesson 18: Conversation - Talking about Hobbies",
  "description": "Listen to someone asking Santos-san about his hobby and talking about taking pictures.",
  "audioSrc": "/assets/audio/listening/mnn_l18.mp3",
  "transcript": "（A：）サントスさんの趣味[しゅみ]は何[なん]ですか?\n（サントス：）写真[しゃしん]です。\n（A：）どんな写真[しゃしん]を撮[と]りますか?\n（サントス：）動物[どうぶつ]の写真[しゃしん]です。特[とく]に馬[うま]が好[す]きです。\n（A：）へえ。それは面白[おもしろ]いですね。日本[にほん]へ来[き]てから馬[うま]の写真[しゃしん]を撮[と]りましたか?\n（サントス：）いえ、日本[にほん]ではなかなか馬[うま]を見[み]ることができません。\n（A：）北海道[ほっかいどう]に馬[うま]がたくさんいますよ。\n（サントス：）本当[ほんとう]ですか?じゃあ 夏休[なつやす]み に 是非[ぜひ] 行[い]き たい です 。",
  "translation": "(A:) What is your hobby, Mr. Santos?\n(Santos:) Photography.\n(A:) What kind of pictures do you take?\n(Santos:) Pictures of animals. I especially like horses.\n(A:) Oh. That's interesting. Have you taken pictures of horses since you came to Japan?\n(Santos:) No, it's quite difficult to see horses in Japan.\n(A:) There are many horses in Hokkaido.\n(Santos:) Really? Well then, I definitely want to go during the summer vacation.",
  "questions": [
      {
          "questionJP": "サントスさんの趣味[しゅみ]は何[なん]ですか？",
          "questionEN": "What is Mr. Santos's hobby?",
          "optionsJP": ["音楽[おんがく]", "読書[どくしょ]", "写真[しゃしん]", "スポーツ"],
          "optionsEN": ["Music", "Reading", "Photography", "Sports"],
          "answer": 2
      },
      {
          "questionJP": "サントスさんはどんな写真[しゃしん]を撮[と]るのが好[す]きですか？",
          "questionEN": "What kind of pictures does Mr. Santos like to take?",
          "optionsJP": ["人[ひと]の写真[しゃしん]", "風景[ふうけい]の写真[しゃしん]", "建物[たてもの]の写真[しゃしん]", "動物[どうぶつ]の写真[しゃしん]"],
          "optionsEN": ["Pictures of people", "Pictures of scenery", "Pictures of buildings", "Pictures of animals"],
          "answer": 3
      },
      {
          "questionJP": "サントスさんが特[とく]に好[す]きな動物[どうぶつ]は何[なん]ですか？",
          "questionEN": "What animal does Mr. Santos particularly like?",
          "optionsJP": ["犬[いぬ]", "猫[ねこ]", "馬[うま]", "鳥[とり]"],
          "optionsEN": ["Dogs", "Cats", "Horses", "Birds"],
          "answer": 2
      },
      {
          "questionJP": "日本[にほん]へ来[き]てから馬[うま]の写真[しゃしん]を撮[と]りましたか？",
          "questionEN": "Has he taken pictures of horses since coming to Japan?",
          "optionsJP": ["はい、たくさん撮[と]りました", "はい、少[すこ]し撮[と]りました", "いいえ、撮[と]っていません", "会話[かいわ]ではわかりません"],
          "optionsEN": ["Yes, he took many", "Yes, he took a few", "No, he hasn't taken any", "Unclear from the conversation"],
          "answer": 2
      },
      {
          "questionJP": "日本[にほん]で馬[うま]を見[み]ることは簡単[かんたん]ですか？",
          "questionEN": "Is it easy to see horses in Japan?",
          "optionsJP": ["はい、とても簡単[かんたん]です", "はい、簡単[かんたん]です", "いいえ、難[むずか]しいです", "簡単[かんたん]でも難[むずか]しくもありません"],
          "optionsEN": ["Yes, it's very easy", "Yes, it's easy", "No, it's difficult", "It's neither easy nor difficult"],
          "answer": 2
      },
      {
          "questionJP": "馬[うま]がたくさんいる場所[ばしょ]として紹介[しょうかい]されたのはどこですか？",
          "questionEN": "Where was mentioned as a place where there are many horses?",
          "optionsJP": ["東京[とうきょう]", "京都[きょうと]", "北海道[ほっかいどう]", "沖縄[おきなわ]"],
          "optionsEN": ["Tokyo", "Kyoto", "Hokkaido", "Okinawa"],
          "answer": 2
      },
  ]
  },
  {
    "id": "b2_mnn_l19_kaiwa",
    "mnnLesson": 19,
    "title": "Lesson 19: Conversation - Talking about Diet",
    "description": "Listen to a conversation about dieting.",
  "audioSrc": "/assets/audio/listening/mnn_l19.mp3",
  "transcript": "（A：）乾杯[かんぱい]。\n（マリア：）乾杯[かんぱい]。\n（A：）マリアさんあまり食[た]べませんね。\n（マリア：）ええ、昨日[きのう]からダイエットをしています。\n（A：）そうですか。私[わたし]もダイエットしたことがあります。\n（マリア：）どんなダイエットですか?\n（A：）毎日[まいにち]りんごだけ食[た]べたり、水[みず]をたくさん飲[の]んだりしました。でも無理[むり]なダイエットは体[からだ]によく ないですね。\n（マリア：）そうですね。\n（A：）マリアさん、このアイスクリーム美味[おい]しいですよ。\n（マリア：）そうですか。ダイエットはまた明日[あした]からします。",
  "translation": "(A:) Cheers.\n(Maria:) Cheers.\n(A:) Maria, you're not eating much.\n(Maria:) Yes, I've been on a diet since yesterday.\n(A:) I see. I've also been on a diet before.\n(Maria:) What kind of diet?\n(A:) I ate only apples every day, and drank a lot of water, and so on. But extreme diets aren't good for your body, are they?\n(Maria:) That's right.\n(A:) Maria, this ice cream is delicious.\n(Maria:) Is that so? I'll start my diet again from tomorrow.",
  "questions": [
      {
          "questionJP": "マリアさんは何[なん]をしていますか？",
          "questionEN": "What is Maria doing?",
          "optionsJP": ["旅行[りょこう]", "勉強[べんきょう]", "買[か]い物[もの]", "ダイエット"],
          "optionsEN": ["Traveling", "Studying", "Shopping", "Dieting"],
          "answer": 3
      },
      {
          "questionJP": "いつからダイエットをしていますか？",
          "questionEN": "Since when has she been dieting?",
          "optionsJP": ["今日[きょう]から", "明日[あした]から", "昨日[きのう]から", "先週[せんしゅう]から"],
          "optionsEN": ["Since today", "Since tomorrow", "Since yesterday", "Since last week"],
          "answer": 2
      },
      {
          "questionJP": "もう一人[ひとり]の人[ひと]はどんなダイエットをしたことがありますか？",
          "questionEN": "What kind of diet has the other person done before?",
          "optionsJP": ["毎日[まいにち]野菜[やさい]だけ食[た]べる", "毎日[まいにち]パンだけ食[た]べる", "毎日[まいにち]りんごだけ食[た]べる", "毎日[まいにち]肉[にく]だけ食[た]べる"],
          "optionsEN": ["Eating only vegetables every day", "Eating only bread every day", "Eating only apples every day", "Eating only meat every day"],
          "answer": 2
      },
      {
          "questionJP": "もう一人[ひとり]の人[ひと]は無理[むり]なダイエットについてどう思[おも]っていますか？",
          "questionEN": "What does the other person think about extreme diets?",
          "optionsJP": ["体[からだ]にいい", "体[からだ]によくない", "効果[こうか]がある", "楽[たの]しい"],
          "optionsEN": ["It's good for the body", "It's not good for the body", "It's effective", "It's fun"],
          "answer": 1
      },
      {
          "questionJP": "もう一人[ひとり]の人[ひと]はマリアさんに何[なん]を勧[すす]めましたか？",
          "questionEN": "What did the other person recommend to Maria?",
          "optionsJP": ["野菜[やさい]", "水[みず]", "りんご", "アイスクリーム"],
          "optionsEN": ["Vegetables", "Water", "Apples", "Ice cream"],
          "answer": 3
      },
      {
          "questionJP": "マリアさんはアイスクリームを食[た]べた後[あと]、ダイエットをいつ再開[さいかい]すると言[い]いましたか？",
          "questionEN": "After eating the ice cream, when did Maria say she would restart her diet?",
          "optionsJP": ["今日[きょう]の夜[よる]", "明日[あした]から", "来週[らいしゅう]から", "やめました"],
          "optionsEN": ["Tonight", "Starting tomorrow", "Starting next week", "She stopped"],
          "answer": 1
      }
  ]
  },
  {
  "id": "b2_mnn_l20_kaiwa",
  "mnnLesson": 20,
  "title": "Lesson 20: Conversation - Inviting to Climb Mt. Fuji",
  "description": "Listen to a conversation about summer vacation plans and an invitation to climb Mt. Fuji.",
  "audioSrc": "/assets/audio/listening/mnn_l20.mp3",
  "transcript": "（A：）夏休[なつやす]みは国[くに]へ帰[かえ]る?\n（ターポン：）うん、帰[かえ]りたいけど。\n（A：）そう。ターポン君[くん]富士山[ふじさん]に登[のぼ]ったことある?\n（ターポン：）うん。ない。\n（A：）じゃあよかったら一緒[いっしょ]に行[い]かない?\n（ターポン：）うん。 8月[がつ]の始[はじ]め頃[ごろ]はどう?\n（A：）いいよ。\n（ターポン：）じゃあ色々[いろいろ]調[しら]べてまた電話[でんわ]するよ。\n（A：）ありがとう。待[ま]ってるよ。",
  "translation": "(A:) Are you going back to your country for summer vacation?\n(Tarpon:) Yeah, I want to go back, but...\n(A:) Oh. Tarpon-kun, have you ever climbed Mt. Fuji?\n(Tarpon:) Hmm. No.\n(A:) Well, if you'd like, won't you go together?\n(Tarpon:) Hmm. How about around the beginning of August?\n(A:) Sounds good.\n(Tarpon:) Okay, then I'll look into various things and call you again.\n(A:) Thank you. I'll be waiting.",
  "questions": [
      {
          "questionJP": "最初[さいしょ]に、夏休[なつやす]みについて何[なん]を聞[き]いていますか？",
          "questionEN": "First, what is asked about summer vacation?",
          "optionsJP": ["どこへ行[い]くか", "国[くに]へ帰[かえ]るか", "何[なに]をするか", "いつまで休[やす]みか"],
          "optionsEN": ["Where they will go", "Whether they will return to their country", "What they will do", "Until when their vacation is"],
          "answer": 1
      },
      {
          "questionJP": "ターポン君[くん]は富士山[ふじさん]に登[のぼ]ったことがありますか？",
          "questionEN": "Has Tarpon-kun ever climbed Mt. Fuji?",
          "optionsJP": ["はい、あります", "いいえ、ありません", "友達[ともだち]とあります", "会話[かいわ]ではわかりません"],
          "optionsEN": ["Yes, he has", "No, he hasn't", "Yes, with a friend", "Unclear from the conversation"],
          "answer": 1
      },
      {
          "questionJP": "ターポン君[くん]は何[なん]に誘[さそ]われましたか？",
          "questionEN": "What was Tarpon-kun invited to?",
          "optionsJP": ["海[うみ]へ行[い]くこと", "山[やま]に登[のぼ]ること (富士山[ふじさん])", "一緒[いっしょ]に帰国[きこく]すること", "旅行[りょこう]すること"],
          "optionsEN": ["Going to the beach", "Climbing a mountain (Mt. Fuji)", "Returning home together", "Going on a trip"],
          "answer": 1
      },
      {
          "questionJP": "誘[さそ]われたイベントはいつ頃[ごろ]の予定[よてい]ですか？",
          "questionEN": "When is the invited event planned for?",
          "optionsJP": ["7月[がつ]の終[お]わり頃[ごろ]", "8月[がつ]の始[はじ]め頃[ごろ]", "8月[がつ]の終[お]わり頃[ごろ]", "夏休[なつやす]みのいつでも"],
          "optionsEN": ["Around the end of July", "Around the beginning of August", "Around the end of August", "Anytime during summer vacation"],
          "answer": 1
      },
      {
          "questionJP": "ターポン君[くん]は誘[さそ]いにどう答[こた]えましたか？",
          "questionEN": "How did Tarpon-kun respond to the invitation?",
          "optionsJP": ["断[ことわ]りました", "難[むずか]しいと言[い]いました", "承諾[しょうだく]しました", "考[かんが]えますと言[い]いました"],
          "optionsEN": ["He declined", "He said it's difficult", "He accepted", "He said he would think about it"],
          "answer": 2
      },
      {
          "questionJP": "誘[さそ]った人[ひと]は、これから何[なに]をすると言[い]いましたか？",
          "questionEN": "What did the person who invited say they would do next?",
          "optionsJP": ["電話[でんわ]を待[ま]つ", "切符[きっぷ]を買[か]う", "色々[いろいろ]調[しら]べる", "ターポン君[くん]と話[はな]さない"],
          "optionsEN": ["Wait for a phone call", "Buy tickets", "Look into various things", "Not talk to Tarpon-kun"],
          "answer": 2
      }
  ]
  },
      ],
      "situational": [
        {
          "id": "b2_mnn_l21_kaiwa",
          "mnnLesson": 21,
          "title": "Lesson 21: Conversation - Talking about a Soccer Match",
          "description": "Listen to a conversation about a soccer match between Japan and Brazil.",
          "audioSrc": "/assets/audio/listening/mnn_l21.mp3",
          "transcript": "（松本[まつもと]：）あ、サントスさん、久しぶり[ひさしぶり]ですね。\n（サントス：）あ、松本[まつもと]さん、お元気[げんき]ですか?\n（松本[まつもと]：）ええ、ちょっとビールでも飲[の]みませんか?\n（サントス：）いいですね。\n（サントス：）今晩[こんばん] 10 時[じ]から日本[にほん]とブラジル[ぶらじる]のサッカーの試合[しあい]がありますね。\n（松本[まつもと]：）ああ、そうですね。\n（松本[まつもと]：）サントスさんはどちらが勝[か]つと思[おも]いますか?\n（サントス：）もちろんブラジル[ぶらじる]ですよ。\n（松本[まつもと]：）そうですね。でも最近[さいきん]日本[にほん]も強[つよ]くなりましたよ。\n（サントス：）ええ、私[わたし]もそう思[おも]いますが。\n（松本[まつもと]：）あ、もう帰[かえ]らないと。\n（サントス：）ええ、帰[かえ]りましょう。",
          "translation": "(Matsumoto:) Oh, Mr. Santos, it's been a long time.\n(Santos:) Oh, Mr. Matsumoto, how are you?\n(Matsumoto:) Yes, shall we have some beer or something?\n(Santos:) Sounds good.\n(Santos:) Tonight from 10 o'clock, there's a soccer match between Japan and Brazil, isn't there?\n(Matsumoto:) Oh, that's right.\n(Matsumoto:) Which team do you think will win, Mr. Santos?\n(Santos:) Of course, it's Brazil.\n(Matsumoto:) That's right. But recently, Japan has also become strong.\n(Santos:) Yes, I think so too, but...\n(Matsumoto:) Ah, I have to go home now.\n(Santos:) Yes, let's go home.",
          "questions": [
              {
                  "questionJP": "誰[だれ]と誰[だれ]が話[はな]していますか？",
                  "questionEN": "Who is talking to whom?",
                  "optionsJP": ["サントスさんと木村[きむら]さん", "サントスさんと松本[まつもと]さん", "ミラーさんと松本[まつもと]さん", "マリアさんとサントスさん"],
                  "optionsEN": ["Mr. Santos and Mr. Kimura", "Mr. Santos and Mr. Matsumoto", "Mr. Miller and Mr. Matsumoto", "Maria and Mr. Santos"],
                  "answer": 1
              },
              {
                  "questionJP": "話[はな]している二人[ふたり]は久しぶり[ひさしぶり]に会[あ]いましたか？",
                  "questionEN": "Did the two people talking meet after a long time?",
                  "optionsJP": ["はい、会[あ]いました", "いいえ、今日[きょう]も会[あ]いました", "初[はじ]めて会[あ]いました", "会話[かいわ]ではわかりません"],
                  "optionsEN": ["Yes, they did", "No, they met today too", "They met for the first time", "Unclear from the conversation"],
                  "answer": 0
              },
              {
                  "questionJP": "二人[ふたり]は何[なに]について話[はな]していますか？",
                  "questionEN": "What are the two people talking about?",
                  "optionsJP": ["映画[えいが]", "仕事[しごと]", "サッカーの試合[しあい]", "旅行[りょこう]"],
                  "optionsEN": ["A movie", "Work", "A soccer match", "A trip"],
                  "answer": 2
              },
              {
                  "questionJP": "今晩[こんばん]、サッカーの試合[しあい]がある国[くに]はどこですか？",
                  "questionEN": "Which countries have a soccer match tonight?",
                  "optionsJP": ["日本[にほん]と韓国[かんこく]", "ブラジル[ぶらじる]とアルゼンチン[あるぜんちん]", "日本[にほん]とブラジル[ぶらじる]", "日本[にほん]とアメリカ"],
                  "optionsEN": ["Japan and Korea", "Brazil and Argentina", "Japan and Brazil", "Japan and America"],
                  "answer": 2
              },
              {
                  "questionJP": "サントスさんはどちらの国[くに]が勝[か]つと思[おも]いますか？",
                  "questionEN": "Which country does Mr. Santos think will win?",
                  "optionsJP": ["日本[にほん]", "ブラジル[ぶらじる]", "引[ひ]き分[わ]け", "どちらでもない"],
                  "optionsEN": ["Japan", "Brazil", "A draw", "Neither"],
                  "answer": 1
              },
              {
                  "questionJP": "松本[まつもと]さんは最近[さいきん]の日本[にほん]チームについてどう言[い]いましたか？",
                  "questionEN": "What did Mr. Matsumoto say about the recent Japan team?",
                  "optionsJP": ["弱[よわ]くなった", "強[つよ]くなった", "あまり変[か]わらない", "勝[か]てない"],
                  "optionsEN": ["They became weaker", "They became stronger", "They haven't changed much", "They can't win"],
                  "answer": 1
              }
          ]
      },
      {
        "id": "b2_mnn_l22_kaiwa",
        "mnnLesson": 22,
        "title": "Lesson 22: Conversation - Looking for an Apartment",
        "description": "Listen to someone consulting with a real estate agent about finding an apartment.",
        "audioSrc": "/assets/audio/listening/mnn_l22.mp3",
        "transcript": "（店員[てんいん]：）どんな部屋[へや]をお探[さが]しですか?\n（お客[きゃく]：）そうですね。家賃[やちん]は 8万円[まんえん]ぐらいで駅[えき]から遠[とお]くないところがいいです。\n（店員[てんいん]：）ではこちらはいかがですか?駅[えき]から 10分[ぷん]で家賃[やちん]は 8万[まん]3000円[えん]です。\n（お客[きゃく]：）ダイニングキッチンと和室[わしつ]ですね。すみません。ここは何[なん]ですか?\n（店員[てんいん]：）押[お]し入[い]れです。布団[ふとん]を入[い]れるところですよ。\n（お客[きゃく]：）そうですか。この部屋[へや]今日[きょう]見[み]ることができますか?\n（店員[てんいん]：）ええ、今[いま]から行[い]きましょうか?\n（お客[きゃく]：）ええ、お願[ねが]いします。",
        "translation": "(Clerk:) What kind of room are you looking for?\n(Customer:) Well. A place where the rent is around 80,000 yen and not far from the station would be good.\n(Clerk:) Then how about this one? It's 10 minutes from the station and the rent is 83,000 yen.\n(Customer:) A dining kitchen and a Japanese-style room, I see. Excuse me. What is this place here?\n(Clerk:) It's an Oshiire (closet). It's a place for putting futons.\n(Customer:) I see. Can I see this room today?\n(Clerk:) Yes, shall we go now?\n(Customer:) Yes, please.",
        "questions": [
            {
                "questionJP": "お客[きゃく]さんは何[なん]を探[さが]していますか？",
                "questionEN": "What is the customer looking for?",
                "optionsJP": ["車[くるま]", "部屋[へや]", "仕事[しごと]", "店[みせ]"],
                "optionsEN": ["A car", "A room", "A job", "A store"],
                "answer": 1
            },
            {
                "questionJP": "お客[きゃく]さんの希望[きぼう]する家賃[やちん]はいくらぐらいですか？",
                "questionEN": "Approximately how much is the rent the customer hopes for?",
                "optionsJP": ["5万円[まんえん]ぐらい", "8万円[まんえん]ぐらい", "10万円[まんえん]ぐらい", "いくらでもいい"],
                "optionsEN": ["Around 50,000 yen", "Around 80,000 yen", "Around 100,000 yen", "Any amount is fine"],
                "answer": 1
            },
            {
                "questionJP": "お客[きゃく]さんは駅[えき]からの距離[きょり]についてどう言[い]いましたか？",
                "questionEN": "What did the customer say about the distance from the station?",
                "optionsJP": ["近[ちか]いところがいい", "遠[とお]いところがいい", "遠[とお]くないところがいい", "バス停[てい]が近[ちか]ければいい"],
                "optionsEN": ["A place close by is good", "A place far away is good", "A place not far away is good", "As long as the bus stop is close"],
                "answer": 2
            },
            {
                "questionJP": "お店[みせ]の人[ひと]が勧[すす]めた部屋[へや]は、駅[えき]から何分[なんぷん]ですか？",
                "questionEN": "How many minutes is the room the clerk recommended from the station?",
                "optionsJP": ["5分[ぷん]", "10分[ぷん]", "15分[ぷん]", "20分[ぷん]"],
                "optionsEN": ["5 minutes", "10 minutes", "15 minutes", "20 minutes"],
                "answer": 1
            },
            {
                "questionJP": "その部屋[へや]の家賃[やちん]はいくらですか？",
                "questionEN": "How much is the rent for that room?",
                "optionsJP": ["8万円[まんえん]", "8万3000円[まんさんぜんえん]", "8万5000円[まんごせんえん]", "9万円[まんえん]"],
                "optionsEN": ["80,000 yen", "83,000 yen", "85,000 yen", "90,000 yen"],
                "answer": 1
            },
            {
                "questionJP": "お客[きゃく]さんは部屋[へや]の中[なか]の何[なん]について質問[しつもん]しましたか？",
                "questionEN": "What in the room did the customer ask about?",
                "optionsJP": ["キッチン", "和室[わしつ]", "押[お]し入[い]れ", "窓[まど]"],
                "optionsEN": ["The kitchen", "The Japanese-style room", "The Oshiire (closet)", "The window"],
                "answer": 2
            },
        ]
    },
    {
      "id": "b2_mnn_l23_kaiwa",
      "mnnLesson": 23,
      "title": "Lesson 23: Conversation - Asking for Directions and Library Rules",
      "description": "Listen to someone asking for directions to a library and about borrowing books.",
      "audioSrc": "/assets/audio/listening/mnn_l23.mp3",
      "transcript": "（図書館[としょかん]：）はい、緑[みどり]図書館[としょかん]です。\n（お客[きゃく]：）あの、そちらまでどうやって行[い]きますか?\n（図書館[としょかん]：）本田駅[ほんだえき]から 12 番[ばん]のバスに乗[の]って図書館前[としょかんまえ]で降[お]りてください。 3つ目[みっつめ]です。\n（お客[きゃく]：）3つ目[みっつめ]ですね。\n（図書館[としょかん]：）ええ、降[お]りると前[まえ]に公園[こうえん]があります。図書館[としょかん]は公園[こうえん]の中[なか]の建物[たてもの]です。\n（お客[きゃく]：）わかりました。それから本[ほん]を借[か]りる時[とき]何[なに]かいりますか?\n（図書館[としょかん]：）お名前[なまえ]とご住所[じゅうしょ]が分[わ]かるものを持[も]ってきてください。\n（お客[きゃく]：）はい、どうもありがとうございました",
      "translation": "(Library:) Yes, this is Midori Library.\n(Customer:) Um, how do I get there?\n(Library:) Please take the number 12 bus from Honda Station and get off at Toshokan-mae (In front of the library). It's the third stop.\n(Customer:) The third stop, okay.\n(Library:) Yes, when you get off, there's a park in front of you. The library is the building inside the park.\n(Customer:) Understood. Also, do I need anything when borrowing books?\n(Library:) Please bring something that shows your name and address.\n(Customer:) Yes, thank you very much.",
      "questions": [
          {
              "questionJP": "お客[きゃく]さんはどこへ行[い]こうとしていますか？",
              "questionEN": "Where is the customer trying to go?",
              "optionsJP": ["緑公園[みどりこうえん]", "本田駅[ほんだえき]", "緑図書館[みどりとしょかん]", "バス停[てい]"],
              "optionsEN": ["Midori Park", "Honda Station", "Midori Library", "Bus stop"],
              "answer": 2
          },
          {
              "questionJP": "本田駅[ほんだえき]から何番[なんばん]のバスに乗[の]りますか？",
              "questionEN": "What number bus should be taken from Honda Station?",
              "optionsJP": ["10番[ばん]", "11番[ばん]", "12番[ばん]", "13番[ばん]"],
              "optionsEN": ["Number 10", "Number 11", "Number 12", "Number 13"],
              "answer": 2
          },
          {
              "questionJP": "バスはいくつのバス停[てい]で降[お]りますか？",
              "questionEN": "At which bus stop should they get off?",
              "optionsJP": ["1つ目[ひとつめ]", "2つ目[ふたつめ]", "3つ目[みっつめ]", "4つ目[よっつめ]"],
              "optionsEN": ["The 1st stop", "The 2nd stop", "The 3rd stop", "The 4th stop"],
              "answer": 2
          },
          {
              "questionJP": "バスを降[お]りた時[とき]、前[まえ]に何[なん]がありますか？",
              "questionEN": "What is in front when getting off the bus?",
              "optionsJP": ["駅[えき]", "病院[びょういん]", "図書館[としょかん]", "公園[こうえん]"],
              "optionsEN": ["Station", "Hospital", "Library", "Park"],
              "answer": 3
          },
          {
              "questionJP": "図書館[としょかん]はどこにありますか？",
              "questionEN": "Where is the library located?",
              "optionsJP": ["バス停[てい]の前[まえ]", "公園[こうえん]の中[なか]", "駅[えき]の隣[となり]", "白いビルの中[なか]"],
              "optionsEN": ["In front of the bus stop", "Inside the park", "Next to the station", "Inside the white building"],
              "answer": 1
          },
          {
              "questionJP": "本[ほん]を借[か]りる時[とき]、何[なに]を持[も]っていく必要[ひつよう]がありますか？",
              "questionEN": "When borrowing books, what do you need to bring?",
              "optionsJP": ["会員証[かいいんしょう]", "学生証[がくせいしょう]", "名前[なまえ]と住所[じゅうしょ]が分[わ]かるもの", "お金[かね]"],
              "optionsEN": ["Membership card", "Student ID", "Something that shows your name and address", "Money"],
              "answer": 2
          }
      ]
  },
  {
    "id": "b2_mnn_l24_kaiwa",
    "mnnLesson": 24,
    "title": "Lesson 24: Conversation - Helping with a Move",
    "description": "Listen to someone offering to help with a move and discussing the details.",
    "audioSrc": "/assets/audio/listening/mnn_l24.mp3",
    "transcript": "（A：）ワンさん、日曜日[にちようび]引[ひ]っ越[こ]しですね。手伝[てつだ]いに行[い]きましょうか?\n（ワン：）ありがとうございます。じゃあすみませんが 9 時[じ]頃[ごろ]お願[ねが]いします。\n（A：）他[ほか]に誰[だれ]が手伝[てつだ]いに行[い]きますか?\n（ワン：）山田[やまだ]さんとミラーさん[みらーさん]が来[き]てくれます。\n（A：）車[くるま]は?\n（ワン：）山田[やまだ]さんに借[か]してもらいます。\n（A：）昼[ひる]ご飯[はん]はどうしますか?\n（ワン：）えっと、\n（A：）私[わたし]がお弁当[べんとう]持[も]っていきましょうか?\n（ワン：）すみません。お願[ねが]いします。\n（A：）じゃ、日曜日[にちようび]に",
    "translation": "(A:) Mr. Wan, you're moving on Sunday, aren't you? Shall I go and help?\n(Wan:) Thank you very much. Well, excuse me, but around 9 o'clock, please.\n(A:) Who else is going to help?\n(Wan:) Mr. Yamada and Mr. Miller will come.\n(A:) How about a car?\n(Wan:) I'll borrow it from Mr. Yamada.\n(A:) What will you do about lunch?\n(Wan:) Um...\n(A:) Shall I bring lunch boxes?\n(Wan:) Please do. Thank you.\n(A:) Okay, see you on Sunday.",
    "questions": [
        {
            "questionJP": "ワンさんの引[ひ]っ越[こ]しは何曜日[なんようび]ですか？",
            "questionEN": "What day of the week is Mr. Wan's move?",
            "optionsJP": ["土曜日[どようび]", "日曜日[にちようび]", "月曜日[げつようび]", "火曜日[かようび]"],
            "optionsEN": ["Saturday", "Sunday", "Monday", "Tuesday"],
            "answer": 1
        },
        {
            "questionJP": "手伝[てつだ]いに行[い]く時間[じかん]は何時[なんじ]頃[ごろ]にお願[ねが]いされましたか？",
            "questionEN": "Around what time was the person asked to come help?",
            "optionsJP": ["8時[じ]頃[ごろ]", "9時[じ]頃[ごろ]", "10時[じ]頃[ごろ]", "昼[ひる]過[す]ぎ"],
            "optionsEN": ["Around 8 o'clock", "Around 9 o'clock", "Around 10 o'clock", "After noon"],
            "answer": 1
        },
        {
            "questionJP": "他[ほか]に誰[だれ]が手伝[てつだ]いに行[い]きますか？",
            "questionEN": "Who else will come to help?",
            "optionsJP": ["田中[たなか]さんと佐藤[さとう]さん", "山田[やまだ]さんとミラーさん", "木村[きむら]さんと林[はやし]さん", "サントスさんとマリアさん"],
            "optionsEN": ["Mr. Tanaka and Mr. Sato", "Mr. Yamada and Mr. Miller", "Mr. Kimura and Mr. Hayashi", "Mr. Santos and Maria"],
            "answer": 1
        },
        {
            "questionJP": "引[ひ]っ越[こ]しに使[つか]う車[くるま]は誰[だれ]に借[か]りますか？",
            "questionEN": "Who will the car for the move be borrowed from?",
            "optionsJP": ["ミラーさん", "山田[やまだ]さん", "別[べつ]の人[ひと]", "自分[じぶん]の車[くるま]を使[つか]う"],
            "optionsEN": ["Mr. Miller", "Mr. Yamada", "Another person", "Using own car"],
            "answer": 1
        },
        {
            "questionJP": "昼[ひる]ご飯[はん]はどうすることになりましたか？",
            "questionEN": "What was decided about lunch?",
            "optionsJP": ["外[そと]で食[た]べる", "出前[でまえ]を取[と]る", "手伝[てつだ]いに行[い]く人[ひと]がお弁当[べんとう]を持[も]ってくる", "ワンさんが作[つく]る"],
            "optionsEN": ["Eat out", "Order delivery", "The person going to help will bring lunch boxes", "Mr. Wan will make it"],
            "answer": 2
        },
        {
            "questionJP": "会話[かいわ]の最後[さいご]で、手伝[てつだ]いを申[もう]し出[で]た人[ひと]は何[なん]と言[い]いましたか？",
            "questionEN": "At the end of the conversation, what did the person offering help say?",
            "optionsJP": ["また電話[でんわ]します", "じゃ、日曜日[にちようび]に", "頑張[がんば]ってください", "気[き]をつけて"],
            "optionsEN": ["I'll call again", "Okay, see you on Sunday", "Good luck", "Be careful"],
            "answer": 1
        }
    ]
  },
        
  {
    "id": "b2_mnn_l25_kaiwa",
    "mnnLesson": 25,
    "title": "Lesson 25: Conversation - Farewell Party",
    "description": "Listen to a conversation at a farewell party for Mr. Miller, who is moving to Tokyo.",
    "audioSrc": "/assets/audio/listening/mnn_l25.mp3",
    "transcript": "（A：）転勤[てんきん]おめでとうございます。\n（ミラー：）ありがとうございます。\n（B：）ミラーさんが東京[とうきょう]へ行[い]ったら寂[さび]しくなりますね。\n（ミラー：）そうですね。\n（C：）東京[とうきょう]へ行[い]っても大阪[おおさか]のこと忘[わす]れないでくださいね。\n（ミラー：）もちろん。\n（ミラー：）皆さん[みなさん]暇[ひま]があったら是非[ぜひ]東京[とうきょう]へ遊[あそ]びに来[き]てください。\n（D：）ミラーさんも大阪[おおさか]へ来[き]たら電話[でんわ]をください。一緒[いっしょ]に飲[の]みましょう。\n（ミラー：）ええ、是非[ぜひ]\n（ミラー：）皆さん[みなさん] 本[ほん]に色[いろ]々[いろ]お世話[せわ]になりました。\n（一同[いちどう]：）頑張[がんば]ってください。お体[からだ]に気[き]をつけて。\n（ミラー：）はい。皆さん[みなさん]もどうぞお元気[げんき]で。",
    "translation": "(A:) Congratulations on your transfer.\n(Miller:) Thank you.\n(B:) It will be lonely when Mr. Miller goes to Tokyo, won't it?\n(Miller:) Yes, it will.\n(C:) Even when you go to Tokyo, please don't forget about Osaka.\n(Miller:) Of course.\n(Miller:) Everyone, if you have free time, please do come to visit in Tokyo.\n(D:) Mr. Miller, if you come to Osaka, please call me. Let's drink together.\n(Miller:) Yes, definitely.\n(Miller:) Everyone, you've truly taken good care of me.\n(All together:) Please do your best. Take care of yourself.\n(Miller:) Yes. Everyone, please stay well.",
    "questions": [
        {
            "questionJP": "誰[だれ]がどこへ転勤[てんきん]しますか？",
            "questionEN": "Who is transferring and where?",
            "optionsJP": ["サントスさんが大阪[おおさか]へ", "ミラーさんが東京[とうきょう]へ", "木村[きむら]さんが大阪[おおさか]へ", "マリアさんが東京[とうきょう]へ"],
            "optionsEN": ["Mr. Santos to Osaka", "Mr. Miller to Tokyo", "Mr. Kimura to Osaka", "Maria to Tokyo"],
            "answer": 1
        },
        {
            "questionJP": "ミラーさんがいなくなると、皆[みな]さんはどうなりますか？",
            "questionEN": "How will everyone feel when Mr. Miller is gone?",
            "optionsJP": ["嬉[うれ]しい", "悲[かな]しい", "寂[さび]しい", "安心[あんしん]する"],
            "optionsEN": ["Happy", "Sad", "Lonely", "Relieved"],
            "answer": 2
        },
        {
            "questionJP": "ミラーさんは東京[とうきょう]へ行[い]っても、何[なに]を忘[わす]れないでほしいと言[い]われましたか？",
            "questionEN": "Even after going to Tokyo, what was Mr. Miller asked not to forget?",
            "optionsJP": ["仕事[しごと]のこと", "家族[かぞく]のこと", "大阪[おおさか]のこと", "日本[にほん]のこと"],
            "optionsEN": ["About work", "About family", "About Osaka", "About Japan"],
            "answer": 2
        },
        {
            "questionJP": "ミラーさんは皆[みな]さんに何[なん]と言[い]いましたか？",
            "questionEN": "What did Mr. Miller say to everyone?",
            "optionsJP": ["東京[とうきょう]には来[こ]ないでください", "東京[とうきょう]へ遊[あそ]びに来[き]てください", "電話[でんわ]しないでください", "手紙[てがみ]を書[か]いてください"],
            "optionsEN": ["Please don't come to Tokyo", "Please come to visit in Tokyo", "Please don't call me", "Please write a letter"],
            "answer": 1
        },
        {
            "questionJP": "もしミラーさんが大阪[おおさか]へ来[き]たらどうすることになりましたか？",
            "questionEN": "If Mr. Miller comes to Osaka, what was decided they would do?",
            "optionsJP": ["一緒[いっしょ]に映画[えいが]を見[み]る", "一緒[いっしょ]に買[か]い物[もの]をする", "電話[でんわ]して一緒[いっしょ]に飲[の]む", "何[なに]も約束[やくそく]しませんでした"],
            "optionsEN": ["Watch a movie together", "Go shopping together", "Call and drink together", "They didn't make any promises"],
            "answer": 2
        },
        {
            "questionJP": "皆[みな]さんはミラーさんに最後[さいご]に何[なん]と言[い]いましたか？",
            "questionEN": "What did everyone say to Mr. Miller at the end?",
            "optionsJP": ["さようなら", "お大事[だいじ]に", "頑張[がんば]ってください、お体[からだ]に気[き]をつけて", "ありがとうございました"],
            "optionsEN": ["Goodbye", "Please take care", "Please do your best, take care of yourself", "Thank you very much"],
            "answer": 2
        },
        {
            "questionJP": "ミラーさんは皆[みな]さんに何[なん]と返事[へんじ]しましたか？",
            "questionEN": "How did Mr. Miller reply to everyone?",
            "optionsJP": ["どういたしまして", "元気[げんき]で", "はい、わかりました", "はい。皆さん[みなさん]もどうぞお元気[げんき]で"],
            "optionsEN": ["You're welcome", "Stay well", "Yes, I understood", "Yes. Everyone, please stay well."],
            "answer": 3
        }
    ]
  }
    ],
  };