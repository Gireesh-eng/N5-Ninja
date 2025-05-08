import type { ReadingExercise, VocabularyItem, Question } from './readingTypes';

export const beginnerReadingExercises: ReadingExercise[] = [
    {
        "id": "b1",
        "title": "わたしの いちにち (My Day)",
        "level": "N5",
        "levelDescription": "Beginner",
        "text": "わたしは まいにち ろくじに おきます。かおを あらって、あさごはんを たべます。パンと たまごを たべます。コーヒーを のみます。しちじはんに いえを でます。でんしゃで がっこうに いきます。がっこうは はちじに はじまります。ごご よじに おわります。ごじに いえに かえります。ばんごはんを たべて、しゅくだいを します。ときどき テレビを みます。じゅういちじに ねます。",
        "translation": "I wake up at 6 o'clock every day. I wash my face and eat breakfast. I eat bread and eggs. I drink coffee. I leave home at 7:30. I go to school by train. School starts at 8 o'clock. It ends at 4 o'clock in the afternoon. I return home at 5 o'clock. I eat dinner and do homework. Sometimes I watch TV. I go to sleep at 11 o'clock.",
        "vocabulary": [
            { "word": "まいにち", "reading": "mainichi", "meaning": "every day" },
            { "word": "おきます", "reading": "okimasu", "meaning": "to wake up" },
            { "word": "かおを あらう", "reading": "kao o arau", "meaning": "to wash face" },
            { "word": "あさごはん", "reading": "asagohan", "meaning": "breakfast" },
            { "word": "パン", "reading": "pan", "meaning": "bread" },
            { "word": "たまご", "reading": "tamago", "meaning": "egg" },
            { "word": "コーヒー", "reading": "koohii", "meaning": "coffee" },
            { "word": "のみます", "reading": "nomimasu", "meaning": "to drink" },
            { "word": "いえを でます", "reading": "ie o demasu", "meaning": "to leave home" },
            { "word": "でんしゃ", "reading": "densha", "meaning": "train" },
            { "word": "がっこう", "reading": "gakkou", "meaning": "school" },
            { "word": "はじまります", "reading": "hajimarimasu", "meaning": "to start" },
            { "word": "おわります", "reading": "owarimasu", "meaning": "to end" },
            { "word": "かえります", "reading": "kaerimasu", "meaning": "to return" },
            { "word": "ばんごはん", "reading": "bangohan", "meaning": "dinner" },
            { "word": "しゅくだい", "reading": "shukudai", "meaning": "homework" },
            { "word": "ときどき", "reading": "tokidoki", "meaning": "sometimes" },
            { "word": "ねます", "reading": "nemasu", "meaning": "to sleep" }
        ],
        "questions": [
            {
                "id": "b1q1",
                "question": "なんじに おきますか。",
                "question_en": "What time do they wake up?",
                "options": ["5じ", "6じ", "7じ", "7じはん"],
                "options_en": ["5 o'clock", "6 o'clock", "7 o'clock", "7:30"],
                "answer": 1,
                "explanation": "本文に「ろくじに おきます」と書いてあります。\\n起きる時間は6時ですね。\\nテキストから直接読み取れます。"
            },
            {
                "id": "b1q2",
                "question": "何(なに)で がっこうに 行(い)きますか。",
                "question_en": "How do they go to school?",
                "options": ["バス", "くるま", "でんしゃ", "じてんしゃ"],
                "options_en": ["Bus", "Car", "Train", "Bicycle"],
                "answer": 2,
                "explanation": "本文に「でんしゃで がっこうに いきます」とあります。\\n「でんしゃ」が正解です。\\n交通手段を問うています。"
            },
            {
                "id": "b1q3",
                "question": "あさごはん に 何(なに)を 食(た)べますか。",
                "question_en": "What do they eat for breakfast?",
                "options": ["ごはん と みそしる", "パン と たまご", "ヨーグルト と フルーツ", "うどん"],
                "options_en": ["Rice and miso soup", "Bread and eggs", "Yogurt and fruit", "Udon"],
                "answer": 1,
                "explanation": "本文に「パンと たまごを たべます」とあります。\\n朝食の内容を確認しましょう。"
            },
            {
                "id": "b1q4",
                "question": "がっこうは 何時(なんじ)に 始(はじ)まりますか。",
                "question_en": "What time does school start?",
                "options": ["7じはん", "8じ", "8じはん", "9じ"],
                "options_en": ["7:30", "8 o'clock", "8:30", "9 o'clock"],
                "answer": 1,
                "explanation": "「がっこうは はちじに はじまります」と書かれています。\\n開始時間を見つけましょう。"
            },
            {
                "id": "b1q5",
                "question": "何時(なんじ)に ねますか。",
                "question_en": "What time do they go to sleep?",
                "options": ["9じ", "10じ", "10じはん", "11じ"],
                "options_en": ["9 o'clock", "10 o'clock", "10:30", "11 o'clock"],
                "answer": 3,
                "explanation": "最後に「じゅういちじに ねます」とあります。\\n就寝時間を確認します。"
            }
        ]
    },
    {
        "id": "b2",
        "title": "きょうの てんき (Today's Weather)",
        "level": "N5",
        "levelDescription": "Beginner",
        "text": "おはようございます。きょうは いい てんきですね。あさから あたたかいです。そらは あおくて、くもが すこし あります。かぜも ふいていません。きのうは あめでしたから、きょうは せんたくものが よく かわきそうです。ごごも はれるでしょう。よるは すこし ひえるかもしれません。かさを もっていく ひつようは なさそうです。こんな ひは こうえんに いきたいですね。",
        "translation": "Good morning. The weather is nice today, isn't it? It has been warm since this morning. The sky is blue, and there are a few clouds. The wind is not blowing either. Since it rained yesterday, the laundry is likely to dry well today. It will probably be sunny in the afternoon too. It might get a little cold at night. It doesn't seem necessary to bring an umbrella. On a day like this, I'd like to go to the park.",
        "vocabulary": [
            { "word": "てんき", "reading": "tenki", "meaning": "weather" },
            { "word": "あたたかい", "reading": "atatakai", "meaning": "warm" },
            { "word": "そら", "reading": "sora", "meaning": "sky" },
            { "word": "あおい", "reading": "aoi", "meaning": "blue" },
            { "word": "くも", "reading": "kumo", "meaning": "cloud" },
            { "word": "すこし", "reading": "sukoshi", "meaning": "a little, a few" },
            { "word": "かぜ", "reading": "kaze", "meaning": "wind" },
            { "word": "ふきます", "reading": "fukimasu", "meaning": "to blow (wind)" },
            { "word": "きのう", "reading": "kinou", "meaning": "yesterday" },
            { "word": "あめ", "reading": "ame", "meaning": "rain" },
            { "word": "せんたくもの", "reading": "sentakumono", "meaning": "laundry" },
            { "word": "かわきます", "reading": "kawakimasu", "meaning": "to dry" },
            { "word": "ごご", "reading": "gogo", "meaning": "afternoon" },
            { "word": "はれる", "reading": "hareru", "meaning": "to be sunny" },
            { "word": "よる", "reading": "yoru", "meaning": "night" },
            { "word": "ひえる", "reading": "hieru", "meaning": "to get cold" },
            { "word": "かさ", "reading": "kasa", "meaning": "umbrella" },
            { "word": "ひつよう", "reading": "hitsuyou", "meaning": "necessary" },
            { "word": "こうえん", "reading": "kouen", "meaning": "park" }
        ],
        "questions": [
            {
                "id": "b2q1",
                "question": "きょうの てんきは どうですか。",
                "question_en": "How is today's weather?",
                "options": ["わるい てんき", "いい てんき", "あめ", "くもり"],
                "options_en": ["Bad weather", "Nice weather", "Rainy", "Cloudy"],
                "answer": 1,
                "explanation": "「きょうは いい てんきですね」とありますので、良い天気です。\\n天気の状況を尋ねています。"
            },
            {
                "id": "b2q2",
                "question": "きのうの てんきは どうでしたか。",
                "question_en": "How was yesterday's weather?",
                "options": ["はれ", "くもり", "あめ", "ゆき"],
                "options_en": ["Sunny", "Cloudy", "Rainy", "Snowy"],
                "answer": 2,
                "explanation": "「きのうは あめでしたから」とあるので、雨でした。\\n過去の天気を特定します。"
            },
            {
                "id": "b2q3",
                "question": "かさを もっていく ひつようは ありますか。",
                "question_en": "Is it necessary to bring an umbrella?",
                "options": ["はい、あります", "いいえ、ありません", "わかりません", "たぶん"],
                "options_en": ["Yes, it is", "No, it isn't", "I don't know", "Maybe"],
                "answer": 1,
                "explanation": "「かさを もっていく ひつようは なさそうです」と書かれているので、必要ありません。\\n持ち物について確認します。"
            },
            {
                "id": "b2q4",
                "question": "この ひは 何(なに)を したいと 言(い)っていますか。",
                "question_en": "What does the speaker say they want to do on this day?",
                "options": ["いえで やすみたい", "かいものに いきたい", "こうえんに いきたい", "えいがを みたい"],
                "options_en": ["Rest at home", "Go shopping", "Go to the park", "Watch a movie"],
                "answer": 2,
                "explanation": "「こんな ひは こうえんに いきたいですね」と最後にあります。\\n希望する行動を読み取ります。"
            }
        ]
    },
    {
        "id": "b3",
        "title": "かいもの (Shopping)",
        "level": "N5",
        "levelDescription": "Beginner",
        "text": "わたしは きのう デパートへ かいものに いきました。あたらしい くつが ほしかったです。くつうりばは ごかいに ありました。いろいろな くつが ありました。あかくて きれいな くつを みつけました。ためしに はいてみました。ちょうど よかったです。ねだんも たかくなかったです。その くつを かいました。それから、ほんやで にほんごの ほんも かいました。とても いい かいものでした。",
        "translation": "I went shopping at a department store yesterday. I wanted new shoes. The shoe department was on the 5th floor. There were various shoes. I found red, beautiful shoes. I tried them on. They were just right. The price was not expensive either. I bought those shoes. After that, I also bought a Japanese language book at a bookstore. It was very good shopping.",
        "vocabulary": [
             {"word": "デパート", "reading": "depaato", "meaning": "department store"},
             {"word": "かいもの", "reading": "kaimono", "meaning": "shopping"},
             {"word": "あたらしい", "reading": "atarashii", "meaning": "new"},
             {"word": "くつ", "reading": "kutsu", "meaning": "shoes"},
             {"word": "ほしい", "reading": "hoshii", "meaning": "want"},
             {"word": "うりば", "reading": "uriba", "meaning": "sales floor, department"},
             {"word": "ごかい", "reading": "gokai", "meaning": "5th floor"},
             {"word": "いろいろな", "reading": "iroirona", "meaning": "various"},
             {"word": "あかい", "reading": "akai", "meaning": "red"},
             {"word": "きれいな", "reading": "kireina", "meaning": "beautiful, clean"},
             {"word": "みつけます", "reading": "mitsukemasu", "meaning": "to find"},
             {"word": "ためしに はきます", "reading": "tameshi ni hakimasu", "meaning": "to try on (shoes)"},
             {"word": "ちょうど いい", "reading": "choudo ii", "meaning": "just right"},
             {"word": "ねだん", "reading": "nedan", "meaning": "price"},
             {"word": "たかくない", "reading": "takakunai", "meaning": "not expensive"},
             {"word": "かいます", "reading": "kaimasu", "meaning": "to buy"},
             {"word": "それから", "reading": "sorekara", "meaning": "after that, and then"},
             {"word": "ほんや", "reading": "honya", "meaning": "bookstore"},
             {"word": "にほんご", "reading": "Nihongo", "meaning": "Japanese language"}
        ],
        "questions": [
            {
                "id": "b3q1",
                "question": "どこへ かいものに いきましたか。",
                "question_en": "Where did they go shopping?",
                "options": ["スーパー", "デパート", "コンビニ", "えきまえの みせ"],
                "options_en": ["Supermarket", "Department store", "Convenience store", "Shop in front of the station"],
                "answer": 1,
                "explanation": "「きのう デパートへ かいものに いきました」とあります。"
            },
            {
                "id": "b3q2",
                "question": "何(なに)が ほしかったですか。",
                "question_en": "What did they want?",
                "options": ["かばん", "ふく", "ほん", "くつ"],
                "options_en": ["Bag", "Clothes", "Book", "Shoes"],
                "answer": 3,
                "explanation": "「あたらしい くつが ほしかったです」と明確に書かれています。"
            },
            {
                "id": "b3q3",
                "question": "くつうりばは 何階(なんがい)に ありましたか。",
                "question_en": "What floor was the shoe department on?",
                "options": ["1かい", "3かい", "5かい", "ちか1かい"],
                "options_en": ["1st floor", "3rd floor", "5th floor", "Basement 1st floor"],
                "answer": 2,
                "explanation": "「くつうりばは ごかいに ありました」とあります。"
            },
            {
                "id": "b3q4",
                "question": "どんな くつを かいましたか。",
                "question_en": "What kind of shoes did they buy?",
                "options": ["くろくて やすい くつ", "しろくて あたらしい くつ", "あかくて きれいな くつ", "おおきくて ちゃいろい くつ"],
                "options_en": ["Black and cheap shoes", "White and new shoes", "Red and beautiful shoes", "Large and brown shoes"],
                "answer": 2,
                "explanation": "「あかくて きれいな くつを みつけました」とあり、それを買いました。"
            },
            {
                "id": "b3q5",
                "question": "デパートで くつの ほかに 何(なに)を かいましたか。",
                "question_en": "Besides shoes, what else did they buy at the department store?",
                "options": ["ぼうし", "にほんごの ほん", "おかし", "なにも かわなかった"],
                "options_en": ["Hat", "Japanese language book", "Sweets", "Didn't buy anything else"],
                "answer": 1,
                "explanation": "「それから、ほんやで にほんごの ほんも かいました」とあります。ただし、本文では「ほんやで」とあるので、デパートの中の書店か別の書店かは明確ではありませんが、質問は「デパートで」となっている点に注意が必要です。文脈上、デパート内の本屋と解釈するのが自然でしょう。"
            }
        ]
    },
    {
        "id": "b4",
        "title": "がっこう (School)",
        "level": "N5",
        "levelDescription": "Beginner",
        "text": "わたしは まいにち がっこうへ いきます。がっこうは たのしいです。わたしの がっこうは とうきょうに あります。がっこうまで でんしゃで じゅうごふん かかります。クラスは さんじゅうにん います。ともだちと いっしょに べんきょうします。にほんごの クラスが いちばん すきです。えいごと すうがくも べんきょうします。せんせいは みんな やさしいです。きょうしつの まどから こうえんが みえます。やすみじかんは ともだちと はなします。がっこうが おわったら、ときどき ともだちと カフェに いきます。",
        "translation": "I go to school every day. School is fun. My school is in Tokyo. It takes 15 minutes by train to get to school. There are 30 students in my class. I study with my friends. My favorite class is Japanese. I also study English and mathematics. All the teachers are nice. I can see the park from the classroom window. During break time, I talk with my friends. After school, I sometimes go to a cafe with my friends.",
        "vocabulary": [
            {"word": "まいにち", "reading": "mainichi", "meaning": "every day"},
            {"word": "がっこう", "reading": "gakkou", "meaning": "school"},
            {"word": "たのしい", "reading": "tanoshii", "meaning": "fun, enjoyable"},
            {"word": "とうきょう", "reading": "Toukyou", "meaning": "Tokyo"},
            {"word": "あります", "reading": "arimasu", "meaning": "to exist, to be (inanimate)"},
            {"word": "でんしゃ", "reading": "densha", "meaning": "train"},
            {"word": "じゅうごふん", "reading": "juugofun", "meaning": "15 minutes"},
            {"word": "かかります", "reading": "kakarimasu", "meaning": "to take (time/money)"},
            {"word": "クラス", "reading": "kurasu", "meaning": "class"},
            {"word": "さんじゅうにん", "reading": "sanjuunin", "meaning": "30 people"},
            {"word": "います", "reading": "imasu", "meaning": "to exist, to be (animate)"},
            {"word": "ともだち", "reading": "tomodachi", "meaning": "friend"},
            {"word": "いっしょに", "reading": "issho ni", "meaning": "together"},
            {"word": "べんきょうします", "reading": "benkyoushimasu", "meaning": "to study"},
            {"word": "にほんご", "reading": "Nihongo", "meaning": "Japanese language"},
            {"word": "いちばん すき", "reading": "ichiban suki", "meaning": "favorite, like the most"},
            {"word": "えいご", "reading": "eigo", "meaning": "English language"},
            {"word": "すうがく", "reading": "suugaku", "meaning": "mathematics"},
            {"word": "せんせい", "reading": "sensei", "meaning": "teacher"},
            {"word": "みんな", "reading": "minna", "meaning": "everyone, all"},
            {"word": "やさしい", "reading": "yasashii", "meaning": "kind, gentle"},
            {"word": "きょうしつ", "reading": "kyoushitsu", "meaning": "classroom"},
            {"word": "まど", "reading": "mado", "meaning": "window"},
            {"word": "こうえん", "reading": "kouen", "meaning": "park"},
            {"word": "みえます", "reading": "miemasu", "meaning": "can be seen"},
            {"word": "やすみじかん", "reading": "yasumijikan", "meaning": "break time"},
            {"word": "はなします", "reading": "hanashimasu", "meaning": "to talk, to speak"},
            {"word": "おわったら", "reading": "owattara", "meaning": "after finishing"},
            {"word": "ときどき", "reading": "tokidoki", "meaning": "sometimes"},
            {"word": "カフェ", "reading": "kafe", "meaning": "cafe"}
        ],
        "questions": [
            {
                "id": "b4q1",
                "question": "がっこうは どこに ありますか。",
                "question_en": "Where is the school located?",
                "options": ["おおさか", "きょうと", "とうきょう", "なごや"],
                "options_en": ["Osaka", "Kyoto", "Tokyo", "Nagoya"],
                "answer": 2,
                "explanation": "「わたしの がっこうは とうきょうに あります」と記載されています。"
            },
            {
                "id": "b4q2",
                "question": "がっこうまで 何(なに)で いきますか。",
                "question_en": "How do they go to school?",
                "options": ["バス", "じてんしゃ", "あるいて", "でんしゃ"],
                "options_en": ["Bus", "Bicycle", "Walking", "Train"],
                "answer": 3,
                "explanation": "「がっこうまで でんしゃで じゅうごふん かかります」とあります。"
            },
            {
                "id": "b4q3",
                "question": "クラスに 何人(なんにん) いますか。",
                "question_en": "How many students are in the class?",
                "options": ["20にん", "25にん", "30にん", "35にん"],
                "options_en": ["20 students", "25 students", "30 students", "35 students"],
                "answer": 2,
                "explanation": "「クラスは さんじゅうにん います」と書かれています。"
            },
            {
                "id": "b4q4",
                "question": "いちばん すきな クラスは 何(なん)ですか。",
                "question_en": "What is their favorite class?",
                "options": ["えいご", "すうがく", "おんがく", "にほんご"],
                "options_en": ["English", "Mathematics", "Music", "Japanese"],
                "answer": 3,
                "explanation": "「にほんごの クラスが いちばん すきです」とあります。"
            },
            {
                "id": "b4q5",
                "question": "やすみじかんに 何(なに)を しますか。",
                "question_en": "What do they do during break time?",
                "options": ["ほんを よみます", "ともだちと はなします", "ゲームを します", "そとで あそびます"],
                "options_en": ["Read a book", "Talk with friends", "Play games", "Play outside"],
                "answer": 1,
                "explanation": "「やすみじかんは ともだちと はなします」と記載されています。"
            }
        ]
    },
    {
        "id": "b5",
        "title": "にちようびの よてい (Sunday's Plan)",
        "level": "N5",
        "levelDescription": "Beginner",
        "text": "こんしゅうの にちようびは ともだちと えいがを みに いきます。えいがは 「となりのトトロ」です。わたしは この えいがが だいすきです。なんども みましたが、また みたいです。えいがは ごぜんじゅうじに はじまります。えいがかんは しんじゅくに あります。うちから しんじゅくまでは ちかてつで さんじゅっぷんぐらいです。えいがのあと、ひるごはんを いっしょに たべます。しんじゅくには おいしい レストランが たくさん ありますから、たのしみです。それから、すこし かいものを して、ごごよじごろ いえに かえる つもりです。",
        "translation": "This Sunday, I will go to see a movie with my friend. The movie is 'My Neighbor Totoro.' I love this movie. I've seen it many times, but I want to see it again. The movie starts at 10 AM. The cinema is in Shinjuku. It takes about 30 minutes by subway from my home to Shinjuku. After the movie, we will eat lunch together. There are many delicious restaurants in Shinjuku, so I'm looking forward to it. After that, I plan to do a little shopping and return home around 4 PM.",
        "vocabulary": [
            {"word": "こんしゅう", "reading": "konshuu", "meaning": "this week"},
            {"word": "にちようび", "reading": "nichiyoubi", "meaning": "Sunday"},
            {"word": "よてい", "reading": "yotei", "meaning": "plan, schedule"},
            {"word": "えいが", "reading": "eiga", "meaning": "movie"},
            {"word": "みます", "reading": "mimasu", "meaning": "to see, to watch"},
            {"word": "となりのトトロ", "reading": "Tonari no Totoro", "meaning": "My Neighbor Totoro (movie title)"},
            {"word": "だいすき", "reading": "daisuki", "meaning": "love, like very much"},
            {"word": "なんども", "reading": "nandomo", "meaning": "many times"},
            {"word": "また", "reading": "mata", "meaning": "again"},
            {"word": "みたい", "reading": "mitai", "meaning": "want to see"},
            {"word": "ごぜんじゅうじ", "reading": "gozen juuji", "meaning": "10 AM"},
            {"word": "えいがかん", "reading": "eigakan", "meaning": "cinema, movie theater"},
            {"word": "しんじゅく", "reading": "Shinjuku", "meaning": "Shinjuku (place name)"},
            {"word": "うちから", "reading": "uchi kara", "meaning": "from home"},
            {"word": "ちかてつ", "reading": "chikatetsu", "meaning": "subway"},
            {"word": "さんじゅっぷんぐらい", "reading": "sanjuppun gurai", "meaning": "about 30 minutes"},
            {"word": "ひるごはん", "reading": "hirugohan", "meaning": "lunch"},
            {"word": "いっしょに", "reading": "issho ni", "meaning": "together"},
            {"word": "おいしい", "reading": "oishii", "meaning": "delicious"},
            {"word": "レストラン", "reading": "resutoran", "meaning": "restaurant"},
            {"word": "たくさん", "reading": "takusan", "meaning": "many, a lot"},
            {"word": "たのしみ", "reading": "tanoshimi", "meaning": "looking forward to"},
            {"word": "それから", "reading": "sorekara", "meaning": "after that, and then"},
            {"word": "すこし", "reading": "sukoshi", "meaning": "a little"},
            {"word": "かいもの", "reading": "kaimono", "meaning": "shopping"},
            {"word": "ごごよじごろ", "reading": "gogo yoji goro", "meaning": "around 4 PM"},
            {"word": "かえる つもり", "reading": "kaeru tsumori", "meaning": "plan to return"}
        ],
        "questions": [
            {
                "id": "b5q1",
                "question": "にちようびに 何(なに)を しますか。",
                "question_en": "What will they do on Sunday?",
                "options": ["ともだちと こうえんに いきます", "ひとりで えいがを みます", "ともだちと えいがを みに いきます", "うちで べんきょうします"],
                "options_en": ["Go to the park with a friend", "Watch a movie alone", "Go to see a movie with a friend", "Study at home"],
                "answer": 2,
                "explanation": "冒頭に「ともだちと えいがを みに いきます」とあります。"
            },
            {
                "id": "b5q2",
                "question": "どんな えいがを みますか。",
                "question_en": "What movie will they watch?",
                "options": ["あたらしい アニメえいが", "ハリーポッター", "となりのトトロ", "スパイダーマン"],
                "options_en": ["A new anime movie", "Harry Potter", "My Neighbor Totoro", "Spiderman"],
                "answer": 2,
                "explanation": "「えいがは 「となりのトトロ」です」と具体的に述べられています。"
            },
            {
                "id": "b5q3",
                "question": "えいがは 何時(なんじ)に はじまりますか。",
                "question_en": "What time does the movie start?",
                "options": ["ごぜん9じ", "ごぜん10じ", "ごご1じ", "ごご2じ"],
                "options_en": ["9 AM", "10 AM", "1 PM", "2 PM"],
                "answer": 1,
                "explanation": "「えいがは ごぜんじゅうじに はじまります」とあります。"
            },
            {
                "id": "b5q4",
                "question": "えいがの あと、何(なに)を しますか。",
                "question_en": "What will they do after the movie?",
                "options": ["すぐに いえに かえります", "ひるごはんを たべます", "ともだちと わかれます", "しんじゅくで はたらきます"],
                "options_en": ["Return home immediately", "Eat lunch", "Part ways with the friend", "Work in Shinjuku"],
                "answer": 1,
                "explanation": "「えいがのあと、ひるごはんを いっしょに たべます」と書かれています。"
            },
            {
                "id": "b5q5",
                "question": "何時(なんじ)ごろ いえに かえる つもりですか。",
                "question_en": "Around what time do they plan to return home?",
                "options": ["ごご3じごろ", "ごご4じごろ", "ごご5じごろ", "よる7じごろ"],
                "options_en": ["Around 3 PM", "Around 4 PM", "Around 5 PM", "Around 7 PM"],
                "answer": 1,
                "explanation": "「ごごよじごろ いえに かえる つもりです」と最後にあります。"
            }
        ]
    },
    {
        "id": "b6",
        "title": "わたしの かぞく (My Family)",
        "level": "N5",
        "levelDescription": "Beginner",
        "text": "わたしは よにん かぞくです。ちちと ははと あねと わたしです。ちちは ぎんこうで はたらいています。ははは せんせいです。にほんごを おしえています。あねは だいがくせいです。あねは にじゅういっさいです。えいごを べんきょうしています。わたしは こうこうせいです。みんな とても なかよしです。しゅうまつは いっしょに ごはんを たべたり、えいがを みたり、こうえんに いったり します。かぞくと いるときが いちばん しあわせです。",
        "translation": "I have a family of four. My father, mother, older sister, and me. My father works at a bank. My mother is a teacher. She teaches Japanese. My older sister is a university student. She is 21 years old. She is studying English. I am a high school student. Everyone gets along very well. On weekends, we eat meals together, watch movies, and go to the park, among other things. I am happiest when I am with my family.",
        "vocabulary": [
            {"word": "よにんかぞく", "reading": "yonin kazoku", "meaning": "family of four"},
            {"word": "ちち", "reading": "chichi", "meaning": "father (my)"},
            {"word": "はは", "reading": "haha", "meaning": "mother (my)"},
            {"word": "あね", "reading": "ane", "meaning": "older sister (my)"},
            {"word": "ぎんこう", "reading": "ginkou", "meaning": "bank"},
            {"word": "はたらいています", "reading": "hataraiteimasu", "meaning": "is working"},
            {"word": "せんせい", "reading": "sensei", "meaning": "teacher"},
            {"word": "にほんご", "reading": "Nihongo", "meaning": "Japanese language"},
            {"word": "おしえています", "reading": "oshieteimasu", "meaning": "is teaching"},
            {"word": "だいがくせい", "reading": "daigakusei", "meaning": "university student"},
            {"word": "にじゅういっさい", "reading": "nijuuissai", "meaning": "21 years old"},
            {"word": "えいご", "reading": "eigo", "meaning": "English language"},
            {"word": "べんきょうしています", "reading": "benkyoushiteimasu", "meaning": "is studying"},
            {"word": "こうこうせい", "reading": "koukousei", "meaning": "high school student"},
            {"word": "なかよし", "reading": "nakayoshi", "meaning": "good friends, get along well"},
            {"word": "しゅうまつ", "reading": "shuumatsu", "meaning": "weekend"},
            {"word": "ごはんを たべます", "reading": "gohan o tabemasu", "meaning": "to eat a meal"},
            {"word": "えいがを みます", "reading": "eiga o mimasu", "meaning": "to watch a movie"},
            {"word": "こうえんに いきます", "reading": "kouen ni ikimasu", "meaning": "to go to the park"},
            {"word": "しあわせ", "reading": "shiawase", "meaning": "happy, happiness"}
        ],
        "questions": [
            {
                "id": "b6q1",
                "question": "かぞくは 何人(なんにん)ですか。",
                "question_en": "How many people are in the family?",
                "options": ["2にん", "3にん", "4にん", "5にん"],
                "options_en": ["2 people", "3 people", "4 people", "5 people"],
                "answer": 2,
                "explanation": "「わたしは よにん かぞくです」とあります。"
            },
            {
                "id": "b6q2",
                "question": "おとうさんは 何(なに)を していますか。",
                "question_en": "What does the father do?",
                "options": ["かいしゃいん", "せんせい", "ぎんこういん", "いしゃ"],
                "options_en": ["Company employee", "Teacher", "Bank employee", "Doctor"],
                "answer": 2,
                "explanation": "「ちちは ぎんこうで はたらいています」とあるので、銀行員です。"
            },
            {
                "id": "b6q3",
                "question": "おかあさんは 何(なに)を おしえていますか。",
                "question_en": "What does the mother teach?",
                "options": ["えいご", "すうがく", "にほんご", "おんがく"],
                "options_en": ["English", "Mathematics", "Japanese", "Music"],
                "answer": 2,
                "explanation": "「ははは せんせいです。にほんごを おしえています」とあります。"
            },
            {
                "id": "b6q4",
                "question": "おねえさんは 何歳(なんさい)ですか。",
                "question_en": "How old is the older sister?",
                "options": ["18さい", "20さい", "21さい", "23さい"],
                "options_en": ["18 years old", "20 years old", "21 years old", "23 years old"],
                "answer": 2,
                "explanation": "「あねは にじゅういっさいです」と書かれています。"
            },
            {
                "id": "b6q5",
                "question": "しゅうまつに よく 何(なに)を しますか。",
                "question_en": "What do they often do on weekends?",
                "options": ["かいもの", "スポーツ", "いえの そうじ", "かぞくで すごす"],
                "options_en": ["Shopping", "Sports", "House cleaning", "Spend time with family"],
                "answer": 3,
                "explanation": "「しゅうまつは いっしょに ごはんを たべたり、えいがを みたり、こうえんに いったり します」とあり、家族で過ごす活動が列挙されています。"
            }
        ]
    },
    {
        "id": "b7",
        "title": "わたしの しゅみ (My Hobby)",
        "level": "N5",
        "levelDescription": "Beginner",
        "text": "わたしの しゅみは ほんを よむことです。まいにち すくなくとも にじっぷん ほんを よみます。とくに、にほんの しょうせつが すきです。むずかしい ことばが あるときは、じしょで しらべます。きっさてんで コーヒーを のみながら、ゆっくり ほんを よむのが すきなじかんです。あたらしい ほんを みつけるために、よく ほんやへ いきます。せんしゅう あたらしい ほんを さんさつ かいました。ときどき ともだちと よんだ ほんについて はなします。ともだちも どくしょが すきです。ほんは たくさん ありますから、ぜんぶ よむのは たいへんですが、たのしいです。",
        "translation": "My hobby is reading books. I read books for at least 20 minutes every day. Especially, I like Japanese novels. When there are difficult words, I look them up in a dictionary. The time I slowly read a book while drinking coffee at a coffee shop is my favorite time. I often go to bookstores to find new books. Last week, I bought three new books. Sometimes I talk with my friends about the books we have read. My friends also like reading. Since there are many books, reading them all is difficult, but it's fun.",
        "vocabulary": [
            {"word": "しゅみ", "reading": "shumi", "meaning": "hobby"},
            {"word": "ほんを よむこと", "reading": "hon o yomu koto", "meaning": "reading books"},
            {"word": "まいにち", "reading": "mainichi", "meaning": "every day"},
            {"word": "すくなくとも", "reading": "sukunakutomo", "meaning": "at least"},
            {"word": "にじっぷん", "reading": "nijippun", "meaning": "20 minutes"},
            {"word": "とくに", "reading": "toku ni", "meaning": "especially"},
            {"word": "にほんの しょうせつ", "reading": "Nihon no shousetsu", "meaning": "Japanese novels"},
            {"word": "すき", "reading": "suki", "meaning": "like"},
            {"word": "むずかしい ことば", "reading": "muzukashii kotoba", "meaning": "difficult words"},
            {"word": "じしょ", "reading": "jisho", "meaning": "dictionary"},
            {"word": "しらべます", "reading": "shirabemasu", "meaning": "to look up, to investigate"},
            {"word": "きっさてん", "reading": "kissaten", "meaning": "coffee shop, tea room"},
            {"word": "コーヒーを のみながら", "reading": "koohii o nominagara", "meaning": "while drinking coffee"},
            {"word": "ゆっくり", "reading": "yukkuri", "meaning": "slowly"},
            {"word": "すきなじかん", "reading": "sukina jikan", "meaning": "favorite time"},
            {"word": "あたらしい ほん", "reading": "atarashii hon", "meaning": "new book"},
            {"word": "みつけるために", "reading": "mitsukeru tame ni", "meaning": "in order to find"},
            {"word": "よく", "reading": "yoku", "meaning": "often"},
            {"word": "ほんや", "reading": "honya", "meaning": "bookstore"},
            {"word": "せんしゅう", "reading": "senshuu", "meaning": "last week"},
            {"word": "さんさつ", "reading": "sansatsu", "meaning": "three volumes/books (counter for books)"},
            {"word": "かいました", "reading": "kaimashita", "meaning": "bought"},
            {"word": "ときどき", "reading": "tokidoki", "meaning": "sometimes"},
            {"word": "ともだち", "reading": "tomodachi", "meaning": "friend"},
            {"word": "よんだ ほんについて はなします", "reading": "yonda hon ni tsuite hanashimasu", "meaning": "talk about the books read"},
            {"word": "どくしょ", "reading": "dokusho", "meaning": "reading (as a hobby)"},
            {"word": "たくさん", "reading": "takusan", "meaning": "many, a lot"},
            {"word": "ぜんぶ", "reading": "zenbu", "meaning": "all"},
            {"word": "たいへん", "reading": "taihen", "meaning": "tough, difficult"},
            {"word": "たのしい", "reading": "tanoshii", "meaning": "fun, enjoyable"}
        ],
        "questions": [
            {
                "id": "b7q1",
                "question": "このひと の しゅみは 何(なん)ですか。",
                "question_en": "What is this person's hobby?",
                "options": ["えいがを みること", "スポーツを すること", "ほんを よむこと", "りょうりを すること"],
                "options_en": ["Watching movies", "Playing sports", "Reading books", "Cooking"],
                "answer": 2,
                "explanation": "「わたしの しゅみは ほんを よむことです」と最初に書かれています。"
            },
            {
                "id": "b7q2",
                "question": "まいにち どのくらい ほんを よみますか。",
                "question_en": "How long do they read books every day?",
                "options": ["やく10ぷん", "すくなくとも20ぷん", "やく30ぷん", "1じかん いじょう"],
                "options_en": ["About 10 minutes", "At least 20 minutes", "About 30 minutes", "More than 1 hour"],
                "answer": 1,
                "explanation": "「まいにち すくなくとも にじっぷん ほんを よみます」とあります。"
            },
            {
                "id": "b7q3",
                "question": "どんな ほんが とくに すきですか。",
                "question_en": "What kind of books do they especially like?",
                "options": ["アメリカの しょうせつ", "にほんの れきし", "にほんの しょうせつ", "かがくの ほん"],
                "options_en": ["American novels", "Japanese history", "Japanese novels", "Science books"],
                "answer": 2,
                "explanation": "「とくに、にほんの しょうせつが すきです」と書かれています。"
            },
            {
                "id": "b7q4",
                "question": "どこで よく ほんを よみますか。",
                "question_en": "Where do they often read books?",
                "options": ["でんしゃの なか", "こうえんの ベンチ", "じぶんの へや", "きっさてん"],
                "options_en": ["Inside the train", "Park bench", "Their own room", "Coffee shop"],
                "answer": 3,
                "explanation": "「きっさてんで コーヒーを のみながら、ゆっくり ほんを よむのが すきなじかんです」とあります。"
            },
            {
                "id": "b7q5",
                "question": "せんしゅう 何冊(なんさつ) あたらしい ほんを かいましたか。",
                "question_en": "How many new books did they buy last week?",
                "options": ["1さつ", "2さつ", "3さつ", "かいませんでした"],
                "options_en": ["1 book", "2 books", "3 books", "Didn't buy any"],
                "answer": 2,
                "explanation": "「せんしゅう あたらしい ほんを さんさつ かいました」とあります。"
            }
        ]
    }
]; 