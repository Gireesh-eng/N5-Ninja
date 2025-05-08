export const vocabCategories = [
  {
    category: "1. Essential Phrases & Greetings",
    icon: "👋",
    description: "Common expressions used in everyday Japanese conversations for greetings and basic communication.",
    words: [
      { japanese: "はい", romaji: "hai", english: "yes", example: "先生：わかりますか？ (Sensei: Wakarimasu ka?) / 学生：はい、わかります。(Gakusei: Hai, wakarimasu.) - Teacher: Do you understand? / Student: Yes, I understand." },
      { japanese: "いいえ", romaji: "iie", english: "no", example: "これはペンですか？ (Kore wa pen desu ka?) / いいえ、ちがいます。(Iie, chigaimasu.) - Is this a pen? / No, it's not." },
      { japanese: "ええ", romaji: "ee", english: "yes (less formal than hai)", example: "A: コーヒー、飲みますか？ (Koohii, nomimasu ka?) / B: ええ、いただきます。(Ee, itadakimasu.) - A: Will you have some coffee? / B: Yes, I will (I'll receive it)." },
      { japanese: "おはようございます", romaji: "ohayou gozaimasu", english: "good morning (polite)", example: "毎朝、隣の人に「おはようございます」と言います。(Maiasa, tonari no hito ni 'ohayou gozaimasu' to iimasu.) - Every morning, I say 'good morning' to my neighbor." },
      { japanese: "こんにちは", romaji: "konnichiwa", english: "hello, good afternoon", example: "店員：こんにちは！(Ten'in: Konnichiwa!) / 客：こんにちは。(Kyaku: Konnichiwa.) - Shop staff: Hello! / Customer: Hello." },
      { japanese: "こんばんは", romaji: "konbanwa", english: "good evening", example: "仕事の後、友達に「こんばんは」と挨拶しました。(Shigoto no ato, tomodachi ni 'konbanwa' to aisatsu shimashita.) - After work, I greeted my friend with 'good evening'." },
      { japanese: "さようなら", romaji: "sayounara", english: "goodbye (formal/long term)", example: "先生に「さようなら」と言って、教室を出ました。(Sensei ni 'sayounara' to itte, kyoushitsu o demashita.) - I said 'goodbye' to the teacher and left the classroom." },
      { japanese: "じゃあ、また / またね", romaji: "jaa, mata / mata ne", english: "see you later (informal)", example: "A: じゃあ、また明日。(Jaa, mata ashita.) / B: うん、またね！(Un, mata ne!) - A: Well then, see you tomorrow. / B: Yeah, see ya!" },
      { japanese: "おやすみなさい", romaji: "oyasuminasai", english: "good night (polite)", example: "寝る前に、家族に「おやすみなさい」と言います。(Neru mae ni, kazoku ni 'oyasuminasai' to iimasu.) - Before sleeping, I say 'good night' to my family." },
      { japanese: "ありがとう ございます", romaji: "arigatou gozaimasu", english: "thank you (polite)", example: "手伝ってくれて、ありがとうございます。(Tetsudatte kurete, arigatou gozaimasu.) - Thank you for helping me." },
      { japanese: "どうもありがとう", romaji: "doumo arigatou", english: "thank you very much", example: "プレゼントをもらって、「どうもありがとう」と言いました。(Purezento o moratte, 'doumo arigatou' to iimashita.) - I received a present and said 'thank you very much'." },
      { japanese: "どうも", romaji: "doumo", english: "thanks (casual), very", example: "（店員が商品を渡して）どうぞ。(Douzo.) / （客）どうも。(Doumo.) - (Staff handing over item) Here you go. / (Customer) Thanks." },
      { japanese: "どういたしまして", romaji: "douitashimashite", english: "you're welcome", example: "A: ありがとう！ (Arigatou!) / B: どういたしまして。(Douitashimashite.) - A: Thanks! / B: You're welcome." },
      { japanese: "すみません", romaji: "sumimasen", english: "excuse me, I'm sorry, thank you", example: "道を尋ねるとき、「すみません」と言います。(Michi o tazuneru toki, 'sumimasen' to iimasu.) - When asking for directions, I say 'excuse me'." },
      { japanese: "ごめんなさい", romaji: "gomennasai", english: "I'm sorry (informal)", example: "遅れてごめんなさい。(Okurete gomennasai.) - I'm sorry for being late." },
      { japanese: "おねがいします", romaji: "onegaishimasu", english: "please (request)", example: "これをコピーしてください、お願いします。(Kore o kopii shite kudasai, onegaishimasu.) - Please make a copy of this." },
      { japanese: "どうぞ", romaji: "douzo", english: "please (offering), here you go", example: "席が空いています。どうぞ。(Seki ga aite imasu. Douzo.) - There's an empty seat. Please (take it)." },
      { japanese: "ください", romaji: "kudasai", english: "please give me / please do (request)", example: "水をください。(Mizu o kudasai.) - Please give me water." },
      { japanese: "はじめまして", romaji: "hajimemashite", english: "nice to meet you (first time)", example: "はじめまして、田中です。(Hajimemashite, Tanaka desu.) - Nice to meet you, I'm Tanaka." },
      { japanese: "どうぞ よろしくおねがいします", romaji: "douzo yoroshiku onegaishimasu", english: "pleased to meet you / please treat me kindly", example: "はじめまして、マイクです。どうぞよろしくお願いします。(Hajimemashite, Maiku desu. Douzo yoroshiku onegaishimasu.) - Nice to meet you, I'm Mike. Pleased to make your acquaintance." },
      { japanese: "いただきます", romaji: "itadakimasu", english: "(expression before eating/receiving)", example: "食事の前に「いただきます」と言います。(Shokuji no mae ni 'itadakimasu' to iimasu.) - Before a meal, we say 'itadakimasu'." },
      { japanese: "ごちそうさまでした", romaji: "gochisousama deshita", english: "(expression after eating)", example: "食べ終わったら、「ごちそうさまでした」と言います。(Tabe owattara, 'gochisousama deshita' to iimasu.) - When finished eating, we say 'gochisousama deshita'." },
      { japanese: "いってきます", romaji: "ittekimasu", english: "I'm going (and coming back)", example: "家を出る時、「いってきます！」と言います。(Ie o deru toki, 'ittekimasu!' to iimasu.) - When leaving the house, I say 'I'm off!'" },
      { japanese: "いってらっしゃい", romaji: "itterasshai", english: "go and come back safely", example: "（家族が）「いってきます」と言ったら、「いってらっしゃい」と返します。(Kazoku ga 'ittekimasu' to ittara, 'itterasshai' to kaeshimasu.) - If a family member says 'I'm off,' we reply 'Take care!'" },
      { japanese: "ただいま", romaji: "tadaima", english: "I'm home", example: "家に帰ってきたら、「ただいま」と言います。(Ie ni kaette kitara, 'tadaima' to iimasu.) - When I come back home, I say 'I'm home!'" },
      { japanese: "おかえりなさい", romaji: "okaerinasai", english: "welcome home", example: "（家族が）「ただいま」と言ったら、「おかえりなさい」と迎えます。(Kazoku ga 'tadaima' to ittara, 'okaerinasai' to mukaemasu.) - If a family member says 'I'm home,' we welcome them with 'Welcome back!'" },
      { japanese: "もしもし", romaji: "moshi moshi", english: "hello (on the phone)", example: "電話に出る時、「もしもし」と言います。(Denwa ni deru toki, 'moshi moshi' to iimasu.) - When answering the phone, I say 'hello?'" },
      { japanese: "いらっしゃいませ", romaji: "irasshaimase", english: "welcome (shop, restaurant)", example: "店員：いらっしゃいませ！何名様ですか？(Ten'in: Irasshaimase! Nanmei sama desu ka?) - Shop Staff: Welcome! How many people?" },
      { japanese: "しつれいします", romaji: "shitsurei shimasu", english: "excuse me (for interrupting, entering, leaving)", example: "先生の部屋に入る前に、「失礼します」と言います。(Sensei no heya ni hairu mae ni, 'shitsurei shimasu' to iimasu.) - Before entering the teacher's room, I say 'Excuse me'." },
      { japanese: "おげんきですか", romaji: "ogenki desu ka", english: "how are you?", example: "久しぶりに会った友達に「お元気ですか」と聞きました。(Hisashiburi ni atta tomodachi ni 'ogenki desu ka' to kikimashita.) - I asked a friend I hadn't seen in a while, 'How are you?'" },
      { japanese: "はい、げんきです", romaji: "hai, genki desu", english: "yes, I'm fine", example: "A: お元気ですか？ (Ogenki desu ka?) / B: はい、元気です。ありがとうございます。(Hai, genki desu. Arigatou gozaimasu.) - A: How are you? / B: Yes, I'm fine. Thank you." },
      { japanese: "だいじょうぶ です", romaji: "daijoubu desu", english: "it's okay, I'm okay", example: "A: 大変でしたね。大丈夫ですか？(Taihen deshita ne. Daijoubu desu ka?) / B: はい、大丈夫です。(Hai, daijoubu desu.) - A: That was tough, wasn't it? Are you okay? / B: Yes, I'm okay." },
      { japanese: "けっこうです", romaji: "kekkou desu", english: "no thank you, that's fine", example: "A: コーヒーのおかわりはいかがですか？ (Koohii no okawari wa ikaga desu ka?) / B: いいえ、けっこうです。(Iie, kekkou desu.) - A: How about another cup of coffee? / B: No, I'm fine, thank you." },
      { japanese: "わかりました", romaji: "wakarimashita", english: "I understand / understood", example: "先生の説明を聞いて、わかりました。(Sensei no setsumei o kiite, wakarimashita.) - I listened to the teacher's explanation and understood." },
      { japanese: "わかりません", romaji: "wakarimasen", english: "I don't understand", example: "この言葉の意味がわかりません。(Kono kotoba no imi ga wakarimasen.) - I don't understand the meaning of this word." },
      { japanese: "もう いちど おねがいします", romaji: "mou ichido onegaishimasu", english: "one more time, please", example: "すみません、聞き取れませんでした。もう一度お願いします。(Sumimasen, kikitori masen deshita. Mou ichido onegaishimasu.) - Excuse me, I couldn't catch that. One more time, please." },
      { japanese: "ゆっくり おねがいします", romaji: "yukkuri onegaishimasu", english: "slowly, please", example: "話すのが速いです。ゆっくりお願いします。(Hanasu no ga hayai desu. Yukkuri onegaishimasu.) - You speak fast. Slowly, please." },
      { japanese: "やあ", romaji: "yaa", english: "hi (casual, male speech)", example: "（友達同士で）やあ、元気？(Tomodachi doushi de) Yaa, genki? - (Between friends) Hey, how's it going?" },
      { japanese: "うーん", romaji: "uun", english: "well..., hmm...", example: "うーん、ちょっと考えます。(Uun, chotto kangaemasu.) - Hmm, let me think about it for a moment." },
      { japanese: "ああ", romaji: "aa", english: "ah, oh", example: "ああ、そうなんですね。(Aa, sou nan desu ne.) - Ah, I see / Oh, is that so?" },
      { japanese: "そう", romaji: "sou", english: "so, that's right, in that way", example: "A: これは駅ですか？(Kore wa eki desu ka?) / B: はい、そうです。(Hai, sou desu.) - A: Is this the station? / B: Yes, that's right." },
    ]
  },
  {
    category: "2. Question Words & Pronouns",
    icon: "❓",
    description: "Essential question words and pronouns used to form basic questions and refer to people or things.",
    words: [
      // Question Words
      { japanese: "なに / なん", romaji: "nani / nan", english: "what", example: "これは何ですか？ (Kore wa nan desu ka?) - What is this? / 何を食べますか？ (Nani o tabemasu ka?) - What will you eat?" },
      { japanese: "だれ", romaji: "dare", english: "who", example: "あの人は誰ですか？ (Ano hito wa dare desu ka?) - Who is that person?" },
      { japanese: "どなた", romaji: "donata", english: "who (polite)", example: "あの方はどなたですか？ (Ano kata wa donata desu ka?) - Who is that person? (polite)" },
      { japanese: "いつ", romaji: "itsu", english: "when", example: "誕生日はいつですか？ (Tanjoubi wa itsu desu ka?) - When is your birthday?" },
      { japanese: "どこ", romaji: "doko", english: "where", example: "トイレはどこですか？ (Toire wa doko desu ka?) - Where is the restroom?" },
      { japanese: "どれ", romaji: "dore", english: "which one (of three or more)", example: "あなたの傘はどれですか？ (Anata no kasa wa dore desu ka?) - Which one is your umbrella?" },
      { japanese: "どちら", romaji: "dochira", english: "which one (of two), which way (polite)", example: "コーヒーと紅茶、どちらがいいですか？ (Koohii to koucha, dochira ga ii desu ka?) - Which would you prefer, coffee or tea? / 駅はどちらですか？ (Eki wa dochira desu ka?) - Which way is the station? (polite)" },
      { japanese: "どっち", romaji: "dotchi", english: "which one (of two, informal)", example: "赤と青、どっちが好き？ (Aka to ao, dotchi ga suki?) - Which do you like, red or blue? (informal)" },
      { japanese: "どの", romaji: "dono", english: "which (+ noun)", example: "どのバスに乗りますか？ (Dono basu ni norimasu ka?) - Which bus will you take?" },
      { japanese: "どう", romaji: "dou", english: "how", example: "日本の生活はどうですか？ (Nihon no seikatsu wa dou desu ka?) - How is life in Japan?" },
      { japanese: "どうして / なぜ", romaji: "doushite / naze", english: "why", example: "どうして遅れたんですか？ (Doushite okuretan desu ka?) - Why were you late? / なぜ日本に来たのですか？ (Naze Nihon ni kita no desu ka?) - Why did you come to Japan? (more formal)" },
      { japanese: "いくら", romaji: "ikura", english: "how much (cost)", example: "この本はいくらですか？ (Kono hon wa ikura desu ka?) - How much is this book?" },
      { japanese: "いくつ", romaji: "ikutsu", english: "how many, how old (general counter)", example: "りんごはいくつありますか？ (Ringo wa ikutsu arimasu ka?) - How many apples are there? / お子さんはおいくつですか？ (Okosan wa oikutsu desu ka?) - How old is your child?" },
      { japanese: "どんな", romaji: "donna", english: "what kind of", example: "どんな音楽が好きですか？ (Donna ongaku ga suki desu ka?) - What kind of music do you like?" },
      { japanese: "どうやって", romaji: "douyatte", english: "how, by what means", example: "駅までどうやって行きますか？ (Eki made douyatte ikimasu ka?) - How do you get to the station?" },
      { japanese: "いかが", romaji: "ikaga", english: "how (polite)", example: "コーヒーはいかがですか？ (Koohii wa ikaga desu ka?) - How about some coffee? (polite offer)" },
      { japanese: "だれの", romaji: "dare no", english: "whose", example: "これは誰のかばんですか？ (Kore wa dare no kaban desu ka?) - Whose bag is this?" },
      // Pronouns
      { japanese: "これ", romaji: "kore", english: "this (one)", example: "これは私の本です。(Kore wa watashi no hon desu.) - This is my book." },
      { japanese: "それ", romaji: "sore", english: "that (one, near listener)", example: "それは何ですか？ (Sore wa nan desu ka?) - What is that (near you)?" },
      { japanese: "あれ", romaji: "are", english: "that (one, over there)", example: "あれは富士山です。(Are wa Fuji-san desu.) - That (over there) is Mt. Fuji." },
      { japanese: "この", romaji: "kono", english: "this (+ noun)", example: "このペンを使ってください。(Kono pen o tsukatte kudasai.) - Please use this pen." },
      { japanese: "その", romaji: "sono", english: "that (+ noun, near listener)", example: "その本を見せてください。(Sono hon o misete kudasai.) - Please show me that book (near you)." },
      { japanese: "あの", romaji: "ano", english: "that (+ noun, over there) / um...", example: "あの建物は何ですか？ (Ano tatemono wa nan desu ka?) - What is that building (over there)? / あのう、すみません… (Anou, sumimasen...) - Um, excuse me..." },
      { japanese: "ここ", romaji: "koko", english: "here, this place", example: "ここは教室です。(Koko wa kyoushitsu desu.) - This place is a classroom." },
      { japanese: "そこ", romaji: "soko", english: "there, that place (near listener)", example: "あなたの席はそこです。(Anata no seki wa soko desu.) - Your seat is there." },
      { japanese: "あそこ", romaji: "asoko", english: "over there", example: "トイレはあそこです。(Toire wa asoko desu.) - The restroom is over there." },
      { japanese: "こちら", romaji: "kochira", english: "this way, here (polite)", example: "出口はこちらです。(Deguchi wa kochira desu.) - The exit is this way (polite)." },
      { japanese: "そちら", romaji: "sochira", english: "that way, there (polite)", example: "お荷物はそちらに置いてください。(Onimotsu wa sochira ni oite kudasai.) - Please put your luggage over there (polite)." },
      { japanese: "あちら", romaji: "achira", english: "that way (over there, polite)", example: "富士山はあちらに見えます。(Fuji-san wa achira ni miemasu.) - Mt. Fuji can be seen over that way (polite)." },
      { japanese: "わたし", romaji: "watashi", english: "I", example: "わたしは学生です。(Watashi wa gakusei desu.) - I am a student." },
      { japanese: "わたくし", romaji: "watakushi", english: "I (very formal)", example: "わたくしがご案内します。(Watakushi ga goannai shimasu.) - I will guide you (very formal)." },
      { japanese: "みんな", romaji: "minna", english: "everyone, all", example: "みんなで一緒に食べましょう。(Minna de isshoni tabemashou.) - Let's all eat together." },
      { japanese: "みなさん", romaji: "minasan", english: "everyone (polite)", example: "みなさん、おはようございます。(Minasan, ohayou gozaimasu.) - Good morning, everyone (polite)." },
    ]
  },
  {
    category: "3. People, Family & Titles",
    icon: "👪",
    description: "Vocabulary related to people, family members, and titles used in various contexts.",
    words: [
      { japanese: "ひと", romaji: "hito", english: "person", example: "あそこに人がたくさんいます。(Asoko ni hito ga takusan imasu.) - There are many people over there." },
      { japanese: "かた", romaji: "kata", english: "person (polite)", example: "あの方はどなたですか？ (Ano kata wa donata desu ka?) - Who is that person? (polite)" },
      { japanese: "ともだち", romaji: "tomodachi", english: "friend", example: "彼は私の友達です。(Kare wa watashi no tomodachi desu.) - He is my friend." },
      { japanese: "かぞく", romaji: "kazoku", english: "family", example: "私の家族は４人です。(Watashi no kazoku wa yo-nin desu.) - My family has four people." },
      { japanese: "りょうしん", romaji: "ryoushin", english: "parents", example: "私の両親は東京に住んでいます。(Watashi no ryoushin wa Toukyou ni sunde imasu.) - My parents live in Tokyo." },
      { japanese: "きょうだい", romaji: "kyoudai", english: "siblings", example: "兄弟がいますか？ (Kyoudai ga imasu ka?) - Do you have any siblings?" },
      { japanese: "こども", romaji: "kodomo", english: "child, children", example: "公園で子供たちが遊んでいます。(Kouen de kodomotachi ga asonde imasu.) - Children are playing in the park." },
      { japanese: "おとな", romaji: "otona", english: "adult", example: "これは大人向けの映画です。(Kore wa otona muke no eiga desu.) - This is a movie for adults." },
      { japanese: "おとこ", romaji: "otoko", english: "male, man", example: "男の人が立っています。(Otoko no hito ga tatte imasu.) - A man is standing." },
      { japanese: "おとこのこ", romaji: "otokonoko", english: "boy", example: "元気な男の子ですね。(Genki na otokonoko desu ne.) - He's an energetic boy, isn't he?" },
      { japanese: "おんな", romaji: "onna", english: "female, woman", example: "女の人が歩いています。(Onna no hito ga aruite imasu.) - A woman is walking." },
      { japanese: "おんなのこ", romaji: "onnanoko", english: "girl", example: "かわいい女の子ですね。(Kawaii onnanoko desu ne.) - She's a cute girl, isn't she?" },
      // My Family (Humble)
      { japanese: "ちち", romaji: "chichi", english: "my father", example: "父は会社員です。(Chichi wa kaishain desu.) - My father is a company employee." },
      { japanese: "はは", romaji: "haha", english: "my mother", example: "母は料理が上手です。(Haha wa ryouri ga jouzu desu.) - My mother is good at cooking." },
      { japanese: "あに", romaji: "ani", english: "my older brother", example: "兄は大学で勉強しています。(Ani wa daigaku de benkyou shite imasu.) - My older brother is studying at university." },
      { japanese: "あね", romaji: "ane", english: "my older sister", example: "姉は結婚しています。(Ane wa kekkon shite imasu.) - My older sister is married." },
      { japanese: "おとうと", romaji: "otouto", english: "my younger brother", example: "弟は高校生です。(Otouto wa koukousei desu.) - My younger brother is a high school student." },
      { japanese: "いもうと", romaji: "imouto", english: "my younger sister", example: "妹はピアノを習っています。(Imouto wa piano o naratte imasu.) - My younger sister is learning the piano." },
      { japanese: "しゅじん", romaji: "shujin", english: "my husband", example: "主人はエンジニアです。(Shujin wa enjinia desu.) - My husband is an engineer." },
      { japanese: "つま", romaji: "tsuma", english: "my wife", example: "妻は教師です。(Tsuma wa kyoushi desu.) - My wife is a teacher." },
      // Other's Family / Polite Reference
      { japanese: "おとうさん", romaji: "otousan", english: "father (someone else's/polite)", example: "田中さんのお父さんは医者です。(Tanaka-san no otousan wa isha desu.) - Mr. Tanaka's father is a doctor." },
      { japanese: "おかあさん", romaji: "okaasan", english: "mother (someone else's/polite)", example: "お母さんの誕生日はいつですか？(Okaasan no tanjoubi wa itsu desu ka?) - When is your mother's birthday?" },
      { japanese: "おにいさん", romaji: "oniisan", english: "older brother (someone else's/polite)", example: "山田さんのお兄さんは背が高いですね。(Yamada-san no oniisan wa se ga takai desu ne.) - Mr. Yamada's older brother is tall, isn't he?" },
      { japanese: "おねえさん", romaji: "oneesan", english: "older sister (someone else's/polite)", example: "鈴木さんのお姉さんはきれいですね。(Suzuki-san no oneesan wa kirei desu ne.) - Ms. Suzuki's older sister is beautiful, isn't she?" },
      { japanese: "おとうとさん", romaji: "otoutosan", english: "younger brother (someone else's/polite)", example: "佐藤さんの弟さんは何歳ですか？(Satou-san no otoutosan wa nansai desu ka?) - How old is Mr. Sato's younger brother?" },
      { japanese: "いもうとさん", romaji: "imoutosan", english: "younger sister (someone else's/polite)", example: "加藤さんの妹さんはどこに住んでいますか？(Katou-san no imoutosan wa doko ni sunde imasu ka?) - Where does Ms. Kato's younger sister live?" },
      { japanese: "ごしゅじん", romaji: "goshujin", english: "husband (someone else's/polite)", example: "奥さんのご主人はどんな仕事をしていますか？(Okusan no goshujin wa donna shigoto o shite imasu ka?) - What kind of work does your (talking to wife) husband do?" },
      { japanese: "おくさん", romaji: "okusan", english: "wife (someone else's/polite)", example: "田中さんの奥さんは元気ですか？(Tanaka-san no okusan wa genki desu ka?) - Is Mr. Tanaka's wife doing well?" },
      { japanese: "おじさん", romaji: "ojisan", english: "uncle, middle-aged man", example: "隣のおじさんが庭の手入れをしています。(Tonari no ojisan ga niwa no teire o shite imasu.) - The middle-aged man next door is tending his garden." },
      { japanese: "おばさん", romaji: "obasan", english: "aunt, middle-aged woman", example: "バス停でおばさんと話しました。(Basutei de obasan to hanashimashita.) - I talked with a middle-aged woman at the bus stop." },
      { japanese: "おじいさん", romaji: "ojiisan", english: "grandfather, elderly man", example: "公園でおじいさんが散歩しています。(Kouen de ojiisan ga sanpo shite imasu.) - An elderly man is taking a walk in the park." },
      { japanese: "おばあさん", romaji: "obaasan", english: "grandmother, elderly woman", example: "親切なおばあさんに道を聞きました。(Shinsetsu na obaasan ni michi o kikimashita.) - I asked a kind elderly woman for directions." },
      // Roles & Nationalities
      { japanese: "せんせい", romaji: "sensei", english: "teacher, master, doctor", example: "田中先生は日本語を教えています。(Tanaka-sensei wa nihongo o oshiete imasu.) - Professor Tanaka teaches Japanese." },
      { japanese: "がくせい", romaji: "gakusei", english: "student", example: "私は日本語学校の学生です。(Watashi wa nihongo gakkou no gakusei desu.) - I am a student at a Japanese language school." },
      { japanese: "りゅうがくせい", romaji: "ryuugakusei", english: "international student", example: "クラスには留学生がたくさんいます。(Kurasu ni wa ryuugakusei ga takusan imasu.) - There are many international students in the class." },
      { japanese: "かいしゃいん", romaji: "kaishain", english: "company employee", example: "私の父は会社員です。(Watashi no chichi wa kaishain desu.) - My father is a company employee." },
      { japanese: "いしゃ", romaji: "isha", english: "doctor (medical)", example: "病気になったので、医者に行きました。(Byouki ni natta node, isha ni ikimashita.) - I got sick, so I went to the doctor." },
      { japanese: "かんごし", romaji: "kangoshi", english: "nurse", example: "病院で看護師さんが手伝ってくれました。(Byouin de kangoshi-san ga tetsudatte kuremashita.) - A nurse helped me at the hospital." },
      { japanese: "がいこくじん", romaji: "gaikokujin", english: "foreigner", example: "駅で外国人を見かけました。(Eki de gaikokujin o mikakemashita.) - I saw a foreigner at the station." },
      { japanese: "じん", romaji: "jin", english: "person nationality suffix (e.g., アメリカじん)", example: "私はアメリカ人です。(Watashi wa Amerikajin desu.) - I am an American." },
      { japanese: "にほんじん", romaji: "nihonjin", english: "Japanese person", example: "彼は日本人です。(Kare wa Nihonjin desu.) - He is a Japanese person." },
      // Suffixes/Titles
      { japanese: "さん", romaji: "san", english: "Mr., Mrs., Miss, Ms.", example: "田中さん、おはようございます。(Tanaka-san, ohayou gozaimasu.) - Good morning, Mr./Ms. Tanaka." },
      { japanese: "ちゃん", romaji: "chan", english: "suffix for children, pets, close friends (informal)", example: "花子ちゃん、一緒に遊ぼう！(Hanako-chan, isshoni asobou!) - Hanako-chan, let's play together!" },
      { japanese: "くん", romaji: "kun", english: "suffix usually for boys or juniors (informal)", example: "太郎くん、宿題は終わった？(Tarou-kun, shukudai wa owatta?) - Taro-kun, have you finished your homework?" },
      { japanese: "さま", romaji: "sama", english: "Mr., Mrs., etc. (very polite, customers)", example: "お客様、こちらへどうぞ。(Okyaku-sama, kochira e douzo.) - Esteemed customer, this way please." },
      { japanese: "たち", romaji: "tachi", english: "plural suffix for people (e.g., こどもたち)", example: "子供たちが公園で遊んでいます。(Kodomotachi ga kouen de asonde imasu.) - The children are playing in the park." },
      // Other
      { japanese: "なまえ", romaji: "namae", english: "name", example: "お名前は何ですか？ (Onamae wa nan desu ka?) - What is your name? (polite)" },
    ]
  },
  {
    category: "4. Numbers, Counters & Money",
    icon: "🔢",
    description: "Basic numbers, counting systems, and common counters used in Japanese.",
    words: [
      { japanese: "ゼロ / れい", romaji: "zero / rei", english: "zero", example: "電話番号はゼロ・イチ・ニ・…です。(Denwa bangou wa zero-ichi-ni... desu.) - The phone number is 0-1-2... / テストは零点でした。(Tesuto wa rei ten deshita.) - The test score was zero points." },
      { japanese: "いち", romaji: "ichi", english: "one", example: "りんごが一つあります。(Ringo ga hitotsu arimasu.) - There is one apple." },
      { japanese: "に", romaji: "ni", english: "two", example: "猫が二匹います。(Neko ga ni-hiki imasu.) - There are two cats." },
      { japanese: "さん", romaji: "san", english: "three", example: "本を三冊買いました。(Hon o san-satsu kaimashita.) - I bought three books." },
      { japanese: "よん / し", romaji: "yon / shi", english: "four", example: "四時に会いましょう。(Yo-ji ni aimashou.) - Let's meet at four o'clock. / 部屋が四つあります。(Heya ga yottsu arimasu.) - There are four rooms." },
      { japanese: "ご", romaji: "go", english: "five", example: "五分待ってください。(Go-fun matte kudasai.) - Please wait for five minutes." },
      { japanese: "ろく", romaji: "roku", english: "six", example: "六百円です。(Roppyaku en desu.) - It's six hundred yen." },
      { japanese: "なな / しち", romaji: "nana / shichi", english: "seven", example: "七時に起きます。(Shichi-ji ni okimasu.) - I wake up at seven o'clock. / 七人家族です。(Nana-nin kazoku desu.) - We are a family of seven." },
      { japanese: "はち", romaji: "hachi", english: "eight", example: "八階に住んでいます。(Hakkai ni sunde imasu.) - I live on the eighth floor." },
      { japanese: "きゅう / く", romaji: "kyuu / ku", english: "nine", example: "九時に寝ます。(Ku-ji ni nemasu.) - I go to bed at nine o'clock. / 九百円です。(Kyuuhyaku en desu.) - It's nine hundred yen." },
      { japanese: "じゅう", romaji: "juu", english: "ten", example: "十分休憩しましょう。(Juppun kyuukei shimashou.) - Let's take a ten-minute break." },
      { japanese: "ひゃく", romaji: "hyaku", english: "hundred", example: "百円ショップで買いました。(Hyaku en shoppu de kaimashita.) - I bought it at a 100-yen shop." },
      { japanese: "せん", romaji: "sen", english: "thousand", example: "このカメラは三千円でした。(Kono kamera wa sanzen en deshita.) - This camera cost three thousand yen." },
      { japanese: "まん", romaji: "man", english: "ten thousand", example: "家賃は月八万円です。(Yachin wa tsuki hachi man en desu.) - The rent is eighty thousand yen per month." },
      // General Native Counters
      { japanese: "ひとつ", romaji: "hitotsu", english: "one (general counter)", example: "質問が一つあります。(Shitsumon ga hitotsu arimasu.) - I have one question." },
      { japanese: "ふたつ", romaji: "futatsu", english: "two (general counter)", example: "パンを二つください。(Pan o futatsu kudasai.) - Please give me two pieces of bread." },
      { japanese: "みっつ", romaji: "mittsu", english: "three (general counter)", example: "角を三つ曲がってください。(Kado o mittsu magatte kudasai.) - Please turn at the third corner." },
      { japanese: "よっつ", romaji: "yottsu", english: "four (general counter)", example: "テーブルが四つあります。(Teeburu ga yottsu arimasu.) - There are four tables." },
      { japanese: "いつつ", romaji: "itsutsu", english: "five (general counter)", example: "クッキーを五つ食べました。(Kukkii o itsutsu tabemashita.) - I ate five cookies." },
      { japanese: "むっつ", romaji: "muttsu", english: "six (general counter)", example: "卵が六つ必要です。(Tamago ga muttsu hitsuyou desu.) - We need six eggs." },
      { japanese: "ななつ", romaji: "nanatsu", english: "seven (general counter)", example: "荷物が七つあります。(Nimotsu ga nanatsu arimasu.) - There are seven pieces of luggage." },
      { japanese: "やっつ", romaji: "yattsu", english: "eight (general counter)", example: "椅子を八つ並べてください。(Isu o yattsu narabete kudasai.) - Please line up eight chairs." },
      { japanese: "ここのつ", romaji: "kokonotsu", english: "nine (general counter)", example: "問題が九つあります。(Mondai ga kokonotsu arimasu.) - There are nine problems." },
      { japanese: "とお", romaji: "too", english: "ten (general counter)", example: "みかんを十個買いました。(Mikan o tooko kaimashita.) - I bought ten mandarins." },
      // Specific Counters
      { japanese: "にん", romaji: "nin", english: "counter for people (e.g., さんにん - 3 people)", example: "家族は三人です。(Kazoku wa san-nin desu.) - My family has three people." },
      { japanese: "ひとり", romaji: "hitori", english: "one person", example: "一人で旅行します。(Hitori de ryokou shimasu.) - I will travel alone." },
      { japanese: "ふたり", romaji: "futari", english: "two people", example: "二人で映画を見ました。(Futari de eiga o mimashita.) - We (two people) watched a movie." },
      { japanese: "さい", romaji: "sai", english: "years old (e.g., ごさい - 5 yrs old)", example: "私は二十五歳です。(Watashi wa ni-juu go sai desu.) - I am twenty-five years old." },
      { japanese: "はたち", romaji: "hatachi", english: "twenty years old (special reading)", example: "妹は今年二十歳になります。(Imouto wa kotoshi hatachi ni narimasu.) - My younger sister will turn twenty this year." },
      { japanese: "まい", romaji: "mai", english: "counter for thin flat objects (paper, plates, shirts)", example: "紙を五枚ください。(Kami o go-mai kudasai.) - Please give me five sheets of paper." },
      { japanese: "ほん / ぽん / ぼん", romaji: "hon / pon / bon", english: "counter for long cylindrical objects (pens, bottles, trees)", example: "ビールを三本飲みました。(Biiru o san-bon nomimashita.) - I drank three bottles of beer. / ペンが一本あります。(Pen ga ippon arimasu.) - There is one pen." },
      { japanese: "こ", romaji: "ko", english: "counter for small objects (apples, eggs)", example: "卵を二個使います。(Tamago o ni-ko tsukaimasu.) - I will use two eggs." },
      { japanese: "さつ", romaji: "satsu", english: "counter for bound objects (books, magazines)", example: "図書館で本を五冊借りました。(Toshokan de hon o go-satsu karimashita.) - I borrowed five books from the library." },
      { japanese: "かい", romaji: "kai", english: "counter for floors of a building (e.g., さんがい - 3rd floor)", example: "私の部屋は三階です。(Watashi no heya wa san-gai desu.) - My room is on the third floor." },
      { japanese: "かい", romaji: "kai", english: "counter for frequency/times (e.g., いっかい - one time)", example: "日本へは一回行ったことがあります。(Nihon e wa ikkai itta koto ga arimasu.) - I have been to Japan one time." }, // Note: same spelling, different Kanji/context
      { japanese: "ど", romaji: "do", english: "counter for frequency/times, degrees (e.g., いちど - once)", example: "もう一度お願いします。(Mou ichido onegaishimasu.) - Once more, please. / 今日の気温は三十度です。(Kyou no kion wa san-juu do desu.) - Today's temperature is 30 degrees." },
      { japanese: "だい", romaji: "dai", english: "counter for machines/vehicles (cars, computers)", example: "家にパソコンが二台あります。(Uchi ni pasokon ga ni-dai arimasu.) - There are two computers at home." },
      { japanese: "はい / ぱい / ばい", romaji: "hai / pai / bai", english: "counter for cups/glasses/bowls of liquids", example: "コーヒーを一杯ください。(Koohii o ippai kudasai.) - One cup of coffee, please." },
      { japanese: "ひき / ぴき / びき", romaji: "hiki / piki / biki", english: "counter for small animals (dogs, cats, fish)", example: "犬を三匹飼っています。(Inu o san-biki katte imasu.) - I have three dogs." },
      // Units
      { japanese: "えん", romaji: "en", english: "yen", example: "これは五百円です。(Kore wa gohyaku en desu.) - This is 500 yen." },
      { japanese: "まんえん", romaji: "man'en", english: "ten thousand yen", example: "このパソコンは十万円でした。(Kono pasokon wa juu man'en deshita.) - This computer was 100,000 yen." },
      { japanese: "メートル", romaji: "meetoru", english: "meter", example: "駅から百メートルです。(Eki kara hyaku meetoru desu.) - It's 100 meters from the station." },
      { japanese: "キロメートル", romaji: "kiromeetoru", english: "kilometer", example: "家から学校まで二キロメートルです。(Uchi kara gakkou made ni kiromeetoru desu.) - It's two kilometers from my house to school." },
      { japanese: "キロ", romaji: "kiro", english: "kilogram / kilometer (colloquial)", example: "りんごを二キロ買いました。(Ringo o ni kiro kaimashita.) - I bought two kilograms of apples. / 十キロ走りました。(Jukkiro hashirimashita.) - I ran ten kilometers." },
      { japanese: "グラム", romaji: "guramu", english: "gram", example: "肉を二百グラムください。(Niku o nihyaku guramu kudasai.) - Please give me 200 grams of meat." },
      // Quantity/Amount
      { japanese: "たくさん", romaji: "takusan", english: "many, a lot", example: "人がたくさんいます。(Hito ga takusan imasu.) - There are a lot of people." },
      { japanese: "おおい", romaji: "ooi", english: "many, numerous (adjective)", example: "この街は外国人が多いです。(Kono machi wa gaikokujin ga ooi desu.) - There are many foreigners in this town." },
      { japanese: "すこし", romaji: "sukoshi", english: "a little, a few", example: "少し疲れました。(Sukoshi tsukaremashita.) - I'm a little tired." },
      { japanese: "ちょっと", romaji: "chotto", english: "a little (colloquial)", example: "ちょっと待ってください。(Chotto matte kudasai.) - Please wait a moment." },
      { japanese: "はんぶん", romaji: "hanbun", english: "half (portion)", example: "ケーキを半分ください。(Keeki o hanbun kudasai.) - Please give me half of the cake." },
      { japanese: "ぐらい / くらい", romaji: "gurai / kurai", english: "about, approximately", example: "ここから駅まで十分ぐらいです。(Koko kara eki made juppun gurai desu.) - It's about ten minutes from here to the station." },
      // Other
      { japanese: "ばんごう", romaji: "bangou", english: "number (ID, phone)", example: "部屋の番号は何番ですか？(Heya no bangou wa nanban desu ka?) - What is the room number?" },
      { japanese: "でんわばんごう", romaji: "denwabangou", english: "telephone number", example: "電話番号を教えてください。(Denwa bangou o oshiete kudasai.) - Please tell me your phone number." },
    ]
  },
  {
    category: "5. Time, Dates & Frequency",
    icon: "🕒",
    description: "Vocabulary related to time, dates, and frequency used in daily conversations.",
    words: [
      // Basic Time Units
      { japanese: "じ", romaji: "ji", english: "o'clock (e.g., さんじ - 3 o'clock)", example: "今、何時ですか？ (Ima, nan-ji desu ka?) - What time is it now? / 三時です。(San-ji desu.) - It's 3 o'clock." },
      { japanese: "ふん / ぷん", romaji: "fun / pun", english: "minute(s) (e.g., ごふん - 5 min, いっぷん - 1 min)", example: "五分待ってください。(Go-fun matte kudasai.) - Please wait five minutes. / あと一分です。(Ato ippun desu.) - There's one minute left." },
      { japanese: "はん", romaji: "han", english: "half (hour) (e.g., さんじはん - 3:30)", example: "会議は二時半に始まります。(Kaigi wa ni-ji han ni hajimarimasu.) - The meeting starts at 2:30." },
      { japanese: "じかん", romaji: "jikan", english: "hour(s), time duration (e.g., いちじかん - 1 hour)", example: "勉強時間は毎日二時間です。(Benkyou jikan wa mainichi ni-jikan desu.) - My study time is two hours every day. / 時間がありますか？ (Jikan ga arimasu ka?) - Do you have time?" },
      // Parts of the Day
      { japanese: "あさ", romaji: "asa", english: "morning", example: "明日の朝、電話します。(Ashita no asa, denwa shimasu.) - I will call tomorrow morning." },
      { japanese: "ひる", romaji: "hiru", english: "noon, daytime", example: "お昼は何を食べますか？ (Ohiru wa nani o tabemasu ka?) - What will you eat for lunch?" },
      { japanese: "ゆうがた", romaji: "yuugata", english: "evening", example: "夕方、散歩に行きました。(Yuugata, sanpo ni ikimashita.) - I went for a walk in the evening." },
      { japanese: "ばん", romaji: "ban", english: "evening, night", example: "今晩、何をしますか？ (Konban, nani o shimasu ka?) - What are you doing tonight?" },
      { japanese: "よる", romaji: "yoru", english: "night", example: "昨日の夜、よく寝ました。(Kinou no yoru, yoku nemashita.) - I slept well last night." },
      { japanese: "けさ", romaji: "kesa", english: "this morning", example: "今朝、パンを食べました。(Kesa, pan o tabemashita.) - I ate bread this morning." },
      { japanese: "こんばん", romaji: "konban", english: "this evening, tonight", example: "今晩、パーティーがあります。(Konban, paatii ga arimasu.) - There is a party tonight." },
      // Days, Weeks, Months, Years
      { japanese: "きょう", romaji: "kyou", english: "today", example: "今日はいい天気ですね。(Kyou wa ii tenki desu ne.) - The weather is nice today, isn't it?" },
      { japanese: "きのう", romaji: "kinou", english: "yesterday", example: "昨日、映画を見ました。(Kinou, eiga o mimashita.) - I watched a movie yesterday." },
      { japanese: "おととい", romaji: "ototoi", english: "the day before yesterday", example: "一昨日、友達に会いました。(Ototoi, tomodachi ni aimashita.) - I met a friend the day before yesterday." },
      { japanese: "あした", romaji: "ashita", english: "tomorrow", example: "明日、テストがあります。(Ashita, tesuto ga arimasu.) - There is a test tomorrow." },
      { japanese: "あさって", romaji: "asatte", english: "day after tomorrow", example: "明後日、旅行に行きます。(Asatte, ryokou ni ikimasu.) - I'm going on a trip the day after tomorrow." },
      { japanese: "こんしゅう", romaji: "konshuu", english: "this week", example: "今週は忙しいです。(Konshuu wa isogashii desu.) - I am busy this week." },
      { japanese: "せんしゅう", romaji: "senshuu", english: "last week", example: "先週、京都へ行きました。(Senshuu, Kyouto e ikimashita.) - I went to Kyoto last week." },
      { japanese: "らいしゅう", romaji: "raishuu", english: "next week", example: "来週、新しい仕事が始まります。(Raishuu, atarashii shigoto ga hajimarimasu.) - My new job starts next week." },
      { japanese: "こんげつ", romaji: "kongetsu", english: "this month", example: "今月は私の誕生日です。(Kongetsu wa watashi no tanjoubi desu.) - This month is my birthday." },
      { japanese: "せんげつ", romaji: "sengetsu", english: "last month", example: "先月、引っ越しました。(Sengetsu, hikkoshimashita.) - I moved last month." },
      { japanese: "らいげつ", romaji: "raigetsu", english: "next month", example: "来月、日本へ行きます。(Raigetsu, Nihon e ikimasu.) - I will go to Japan next month." },
      { japanese: "ことし", romaji: "kotoshi", english: "this year", example: "今年はオリンピックがあります。(Kotoshi wa orinpikku ga arimasu.) - The Olympics are this year." },
      { japanese: "きょねん", romaji: "kyonen", english: "last year", example: "去年、大学を卒業しました。(Kyonen, daigaku o sotsugyou shimashita.) - I graduated from university last year." },
      { japanese: "らいねん", romaji: "rainen", english: "next year", example: "来年、結婚します。(Rainen, kekkon shimasu.) - I will get married next year." },
      { japanese: "ひ", romaji: "hi", english: "day, sun", example: "母の日は五月です。(Haha no hi wa go-gatsu desu.) - Mother's Day is in May. / 今日は日が強いですね。(Kyou wa hi ga tsuyoi desu ne.) - The sun is strong today, isn't it?" },
      { japanese: "にち", romaji: "nichi", english: "day (name/counter)", example: "誕生日は五月五日です。(Tanjoubi wa go-gatsu itsuka desu.) - My birthday is May 5th." }, // See special readings below
      { japanese: "しゅうかん", romaji: "shuukan", english: "week(s) duration", example: "一週間の旅行に行きます。(Isshuukan no ryokou ni ikimasu.) - I'm going on a one-week trip." },
      { japanese: "かかん", romaji: "kakan", english: "day(s) duration", example: "三日間の休みがあります。(Mikkakan no yasumi ga arimasu.) - There is a three-day holiday." }, // Uses special readings too
      { japanese: "かげつ / つき", romaji: "kagetsu / tsuki", english: "month(s) duration (e.g., ひとつき - one month)", example: "日本に一か月います。(Nihon ni ikkagetsu imasu.) - I will be in Japan for one month. / 一月 (hitotsuki) は寒いです。(Hitotsuki wa samui desu.) - January is cold." },
      { japanese: "ねん", romaji: "nen", english: "year", example: "2024年です。(Nisen ni-juu yo-nen desu.) - It is the year 2024." },
      { japanese: "しゅうまつ", romaji: "shuumatsu", english: "weekend", example: "週末は何をしますか？ (Shuumatsu wa nani o shimasu ka?) - What are you doing on the weekend?" },
      { japanese: "やすみ", romaji: "yasumi", english: "holiday, day off, absence (noun)", example: "明日は休みです。(Ashita wa yasumi desu.) - Tomorrow is a day off. / 夏休みはどこへ行きますか？(Natsuyasumi wa doko e ikimasu ka?) - Where are you going for summer vacation?" },
      // Days of the Week
      { japanese: "げつようび", romaji: "getsuyoubi", english: "Monday", example: "月曜日に会議があります。(Getsuyoubi ni kaigi ga arimasu.) - There is a meeting on Monday." },
      { japanese: "かようび", romaji: "kayoubi", english: "Tuesday", example: "火曜日は日本語のクラスがあります。(Kayoubi wa nihongo no kurasu ga arimasu.) - I have Japanese class on Tuesday." },
      { japanese: "すいようび", romaji: "suiyoubi", english: "Wednesday", example: "水曜日に映画を見に行きます。(Suiyoubi ni eiga o mi ni ikimasu.) - I'm going to see a movie on Wednesday." },
      { japanese: "もくようび", romaji: "mokuyoubi", english: "Thursday", example: "木曜日は図書館へ行きます。(Mokuyoubi wa toshokan e ikimasu.) - I go to the library on Thursday." },
      { japanese: "きんようび", romaji: "kinyoubi", english: "Friday", example: "金曜日の夜、飲みに行きます。(Kinyoubi no yoru, nomi ni ikimasu.) - I'm going out for drinks on Friday night." },
      { japanese: "どようび", romaji: "doyoubi", english: "Saturday", example: "土曜日は休みです。(Doyoubi wa yasumi desu.) - Saturday is a day off." },
      { japanese: "にちようび", romaji: "nichiyoubi", english: "Sunday", example: "日曜日に家族と過ごします。(Nichiyoubi ni kazoku to sugoshimasu.) - I spend time with my family on Sunday." },
      { japanese: "なんようび", romaji: "nanyoubi", english: "what day of the week?", example: "今日は何曜日ですか？ (Kyou wa nan'youbi desu ka?) - What day of the week is it today?" },
      // Days of the Month (Special Readings)
      { japanese: "ついたち", romaji: "tsuitachi", english: "1st day of the month", example: "一月一日はお正月です。(Ichi-gatsu tsuitachi wa oshougatsu desu.) - January 1st is New Year's Day." },
      { japanese: "ふつか", romaji: "futsuka", english: "2nd day / two days", example: "二日に会いましょう。(Futsuka ni aimashou.) - Let's meet on the 2nd. / 二日間休みます。(Futsukakan yasumimasu.) - I will take two days off." },
      { japanese: "みっか", romaji: "mikka", english: "3rd day / three days", example: "三日までにレポートを出してください。(Mikka made ni repooto o dashite kudasai.) - Please submit the report by the 3rd. / 三日間旅行しました。(Mikkakan ryokou shimashita.) - I traveled for three days." },
      { japanese: "よっか", romaji: "yokka", english: "4th day / four days", example: "四日は忙しいです。(Yokka wa isogashii desu.) - I'm busy on the 4th. / 四日間働きました。(Yokkakan hatarakimashita.) - I worked for four days." },
      { japanese: "いつか", romaji: "itsuka", english: "5th day / five days", example: "五日にパーティーがあります。(Itsuka ni paatii ga arimasu.) - There's a party on the 5th. / 五日間入院しました。(Itsukakan nyuuin shimashita.) - I was hospitalized for five days." },
      { japanese: "むいか", romaji: "muika", english: "6th day / six days", example: "六日にテストがあります。(Muika ni tesuto ga arimasu.) - There's a test on the 6th. / 六日間かかります。(Muikakan kakarimasu.) - It will take six days." },
      { japanese: "なのか", romaji: "nanoka", english: "7th day / seven days", example: "七日は七夕です。(Nanoka wa tanabata desu.) - The 7th is Tanabata. / 七日間滞在します。(Nanokakan taizai shimasu.) - I will stay for seven days." },
      { japanese: "ようか", romaji: "youka", english: "8th day / eight days", example: "八日に会議があります。(Youka ni kaigi ga arimasu.) - There's a meeting on the 8th. / 八日間雨が降りました。(Youkakan ame ga furimashita.) - It rained for eight days." },
      { japanese: "ここのか", romaji: "kokonoka", english: "9th day / nine days", example: "九日に友達が来ます。(Kokonoka ni tomodachi ga kimasu.) - My friend is coming on the 9th. / 九日間かかりました。(Kokonokakan kakarimashita.) - It took nine days." },
      { japanese: "とおか", romaji: "tooka", english: "10th day / ten days", example: "十日に出発します。(Tooka ni shuppatsu shimasu.) - I will depart on the 10th. / 十日間勉強しました。(Tookakan benkyou shimashita.) - I studied for ten days." },
      { japanese: "じゅうよっか", romaji: "juuyokka", english: "14th day / fourteen days", example: "十四日はバレンタインデーです。(Juuyokka wa Barentain dee desu.) - The 14th is Valentine's Day." },
      { japanese: "はつか", romaji: "hatsuka", english: "20th day / twenty days", example: "二十日は給料日です。(Hatsuka wa kyuuryoubi desu.) - The 20th is payday." },
      { japanese: "にじゅうよっか", romaji: "nijuuyokka", english: "24th day / twenty-four days", example: "二十四日に試験があります。(Ni-juu yokka ni shiken ga arimasu.) - There is an exam on the 24th." },
      { japanese: "なんにち", romaji: "nannichi", english: "what day of the month / how many days", example: "今日は何日ですか？ (Kyou wa nan nichi desu ka?) - What is the date today? / 夏休みは何日間ですか？(Natsuyasumi wa nan nichi kan desu ka?) - How many days is the summer vacation?" },
      // Frequency
      { japanese: "まいにち", romaji: "mainichi", english: "every day", example: "毎日、日本語を勉強します。(Mainichi, nihongo o benkyou shimasu.) - I study Japanese every day." },
      { japanese: "まいあさ", romaji: "maiasa", english: "every morning", example: "毎朝、ジョギングをします。(Maiasa, jogingu o shimasu.) - I go jogging every morning." },
      { japanese: "まいばん", romaji: "maiban", english: "every night", example: "毎晩、本を読みます。(Maiban, hon o yomimasu.) - I read a book every night." },
      { japanese: "まいしゅう", romaji: "maishuu", english: "every week", example: "毎週、テニスをします。(Maishuu, tenisu o shimasu.) - I play tennis every week." },
      { japanese: "まいつき / まいげつ", romaji: "maitsuki / maigetsu", english: "every month", example: "毎月、家賃を払います。(Maitsuki, yachin o haraimasu.) - I pay rent every month." },
      { japanese: "まいとし / まいねん", romaji: "maitoshi / mainen", english: "every year", example: "毎年、海外旅行に行きます。(Maitoshi, kaigai ryokou ni ikimasu.) - I travel abroad every year." },
      { japanese: "いつも", romaji: "itsumo", english: "always", example: "彼はいつも元気です。(Kare wa itsumo genki desu.) - He is always energetic." },
      { japanese: "よく", romaji: "yoku", english: "often", example: "週末はよく映画を見ます。(Shuumatsu wa yoku eiga o mimasu.) - I often watch movies on weekends." }, // Also means "well"
      { japanese: "ときどき", romaji: "tokidoki", english: "sometimes", example: "時々、外食します。(Tokidoki, gaishoku shimasu.) - I sometimes eat out." },
      { japanese: "あまり", romaji: "amari", english: "not much, not often (+ neg verb)", example: "あまりテレビを見ません。(Amari terebi o mimasen.) - I don't watch TV much." },
      { japanese: "ぜんぜん", romaji: "zenzen", english: "not at all (+ neg verb)", example: "全然わかりません。(Zenzen wakarimasen.) - I don't understand at all." },
      { japanese: "たいてい", romaji: "taitei", english: "usually, generally", example: "たいてい、朝はパンを食べます。(Taitei, asa wa pan o tabemasu.) - Usually, I eat bread for breakfast." },
      // Relative Time & Sequencing
      { japanese: "いま", romaji: "ima", english: "now", example: "今、何をしていますか？ (Ima, nani o shite imasu ka?) - What are you doing now?" },
      { japanese: "すぐ", romaji: "sugu", english: "soon, right away", example: "すぐ行きます。(Sugu ikimasu.) - I'll go right away." },
      { japanese: "もうすぐ", romaji: "mousugu", english: "soon", example: "もうすぐ春ですね。(Mousugu haru desu ne.) - It will be spring soon, won't it?" },
      { japanese: "あとで", romaji: "atode", english: "later", example: "後で電話します。(Atode denwa shimasu.) - I'll call you later." },
      { japanese: "さっき", romaji: "sakki", english: "a little while ago", example: "さっき、田中さんに会いました。(Sakki, Tanaka-san ni aimashita.) - I met Mr. Tanaka a little while ago." },
      { japanese: "これから", romaji: "korekara", english: "from now on, after this", example: "これから会議が始まります。(Korekara kaigi ga hajimarimasu.) - The meeting will start now." },
      { japanese: "こんど", romaji: "kondo", english: "next time, this time", example: "今度、一緒に食事しましょう。(Kondo, isshoni shokuji shimashou.) - Let's have a meal together next time." },
      { japanese: "さいしょに", romaji: "saisho ni", english: "firstly, at the beginning", example: "最初に、自己紹介をします。(Saisho ni, jiko shoukai o shimasu.) - First, I will introduce myself." },
      { japanese: "つぎに", romaji: "tsugi ni", english: "next, secondly", example: "次に、この問題を解いてください。(Tsugi ni, kono mondai o toite kudasai.) - Next, please solve this problem." },
      { japanese: "さいごに", romaji: "saigo ni", english: "finally, lastly", example: "最後に、質問はありますか？(Saigo ni, shitsumon wa arimasu ka?) - Finally, are there any questions?" },
      { japanese: "はやい", romaji: "hayai", english: "early", example: "今朝は早く起きました。(Kesa wa hayaku okimashita.) - I woke up early this morning." }, // Also means "fast"
      { japanese: "おそい", romaji: "osoi", english: "late", example: "昨日は遅く寝ました。(Kinou wa osoku nemashita.) - I went to bed late yesterday." }, // Also means "slow"
      { japanese: "まだ", romaji: "mada", english: "still, not yet (+ neg)", example: "まだ仕事が終わっていません。(Mada shigoto ga owatte imasen.) - I haven't finished work yet. / 彼はまだ学生です。(Kare wa mada gakusei desu.) - He is still a student." },
      { japanese: "もう", romaji: "mou", english: "already, anymore", example: "もう宿題をしましたか？ (Mou shukudai o shimashita ka?) - Have you already done your homework? / もう要りません。(Mou irimasen.) - I don't need it anymore." },
    ]
  },
  {
    category: "6. Location & Direction",
    icon: "🗺️", // Added a placeholder icon
    description: "Vocabulary related to locations, directions, and spatial relationships.",
    words: [
      // Relative Positions
      { japanese: "うえ", romaji: "ue", english: "up, above, on top", example: "本は机の上にあります。(Hon wa tsukue no ue ni arimasu.) - The book is on the desk." },
      { japanese: "した", romaji: "shita", english: "down, below, under", example: "猫はテーブルの下にいます。(Neko wa teeburu no shita ni imasu.) - The cat is under the table." },
      { japanese: "まえ", romaji: "mae", english: "front, before (space or time)", example: "駅の前にスーパーがあります。(Eki no mae ni suupaa ga arimasu.) - There is a supermarket in front of the station. / 食事の前に手を洗います。(Shokuji no mae ni te o araimasu.) - I wash my hands before meals." },
      { japanese: "うしろ", romaji: "ushiro", english: "behind, back", example: "私の後ろに座ってください。(Watashi no ushiro ni suwatte kudasai.) - Please sit behind me." },
      { japanese: "みぎ", romaji: "migi", english: "right (side)", example: "右に曲がってください。(Migi ni magatte kudasai.) - Please turn right." },
      { japanese: "ひだり", romaji: "hidari", english: "left (side)", example: "左のドアから入ってください。(Hidari no doa kara haitte kudasai.) - Please enter through the left door." },
      { japanese: "なか", romaji: "naka", english: "inside, middle", example: "箱の中に何がありますか？(Hako no naka ni nani ga arimasu ka?) - What is inside the box?" },
      { japanese: "そと", romaji: "soto", english: "outside", example: "外は寒いです。(Soto wa samui desu.) - It's cold outside." },
      { japanese: "となり", romaji: "tonari", english: "next to, beside (similar items)", example: "銀行の隣に郵便局があります。(Ginkou no tonari ni yuubinkyoku ga arimasu.) - There is a post office next to the bank." },
      { japanese: "よこ", romaji: "yoko", english: "side, beside (general)", example: "彼の横に座りました。(Kare no yoko ni suwarimashita.) - I sat beside him." },
      { japanese: "ちかく", romaji: "chikaku", english: "near, vicinity (noun)", example: "駅の近くに住んでいます。(Eki no chikaku ni sunde imasu.) - I live near the station." },
      { japanese: "そば", romaji: "soba", english: "nearby, beside", example: "窓のそばに立ってください。(Mado no soba ni tatte kudasai.) - Please stand near the window." },
      { japanese: "あいだ", romaji: "aida", english: "between, interval", example: "本屋とレストランの間にカフェがあります。(Hon'ya to resutoran no aida ni kafe ga arimasu.) - There is a cafe between the bookstore and the restaurant." },
      // Places/Directions
      { japanese: "ここ", romaji: "koko", english: "here, this place", example: "ここは図書館です。(Koko wa toshokan desu.) - This place is a library." }, // Repeat from Pronouns for context
      { japanese: "そこ", romaji: "soko", english: "there, that place (near listener)", example: "そこに座ってください。(Soko ni suwatte kudasai.) - Please sit there." }, // Repeat
      { japanese: "あそこ", romaji: "asoko", english: "over there (far from both)", example: "あそこに公園があります。(Asoko ni kouen ga arimasu.) - There is a park over there." }, // Repeat
      { japanese: "どこ", romaji: "doko", english: "where", example: "お手洗いはどこですか？ (Otearai wa doko desu ka?) - Where is the restroom?" }, // Repeat from Questions
      { japanese: "こちら", romaji: "kochira", english: "this way, here (polite)", example: "受付はこちらです。(Uketsuke wa kochira desu.) - The reception is this way." }, // Repeat
      { japanese: "そちら", romaji: "sochira", english: "that way, there (polite)", example: "会議室はそちらです。(Kaigishitsu wa sochira desu.) - The meeting room is that way." }, // Repeat
      { japanese: "あちら", romaji: "achira", english: "that way, over there (polite)", example: "エレベーターはあちらです。(Erebeetaa wa achira desu.) - The elevator is over that way." }, // Repeat
      { japanese: "どちら", romaji: "dochira", english: "which way, where (polite)", example: "出口はどちらですか？ (Deguchi wa dochira desu ka?) - Which way is the exit? (polite)" }, // Repeat from Questions
      { japanese: "むこう", romaji: "mukou", english: "over there, beyond, the other side", example: "川の向こうに家が見えます。(Kawa no mukou ni ie ga miemasu.) - A house can be seen on the other side of the river." },
      { japanese: "まっすぐ", romaji: "massugu", english: "straight ahead", example: "この道をまっすぐ行ってください。(Kono michi o massugu itte kudasai.) - Please go straight down this road." },
      { japanese: "かど", romaji: "kado", english: "corner (street)", example: "次の角を右に曲がってください。(Tsugi no kado o migi ni magatte kudasai.) - Please turn right at the next corner." },
      { japanese: "いりぐち", romaji: "iriguchi", english: "entrance", example: "入口はどこですか？ (Iriguchi wa doko desu ka?) - Where is the entrance?" },
      { japanese: "でぐち", romaji: "deguchi", english: "exit", example: "出口はあちらです。(Deguchi wa achira desu.) - The exit is over there." },
      { japanese: "にし", romaji: "nishi", english: "west", example: "西に向かって歩きます。(Nishi ni mukatte arukimasu.) - I walk towards the west." },
      { japanese: "ひがし", romaji: "higashi", english: "east", example: "太陽は東から昇ります。(Taiyou wa higashi kara noborimasu.) - The sun rises from the east." },
      { japanese: "みなみ", romaji: "minami", english: "south", example: "南の窓を開けてください。(Minami no mado o akete kudasai.) - Please open the south window." },
      { japanese: "きた", romaji: "kita", english: "north", example: "北へ向かう電車に乗ります。(Kita e mukau densha ni norimasu.) - I will take the train heading north." },
      { japanese: "ちゅう", romaji: "chuu", english: "in, middle of, during (suffix, e.g. 電話中)", example: "今、食事中です。(Ima, shokuji-chuu desu.) - I am in the middle of eating now. / 田中さんは電話中です。(Tanaka-san wa denwa-chuu desu.) - Mr. Tanaka is on the phone." },
      { japanese: "うら", romaji: "ura", english: "back side, reverse side", example: "家の裏に庭があります。(Ie no ura ni niwa ga arimasu.) - There is a garden behind the house." },
      { japanese: "ところ", romaji: "tokoro", english: "place", example: "静かな所が好きです。(Shizuka na tokoro ga suki desu.) - I like quiet places." },
    ]
  },
  // --- Core Actions & Descriptions ---
  {
    category: "7. Common Verbs (Actions)",
    icon: "🔄",
    description: "Common verbs used in daily conversations, covering a range of actions and states.",
    words: [
       // Existence
      { japanese: "います", romaji: "imasu", english: "be, exist (animate: people, animals)", example: "教室に学生がいます。(Kyoushitsu ni gakusei ga imasu.) - There are students in the classroom. / Base form: iru" },
      { japanese: "あります", romaji: "arimasu", english: "be, exist, have (inanimate: objects, events)", example: "机の上に本があります。(Tsukue no ue ni hon ga arimasu.) - There is a book on the desk. / Base form: aru" },
      // Movement
      { japanese: "いきます", romaji: "ikimasu", english: "go", example: "明日、学校へ行きます。(Ashita, gakkou e ikimasu.) - I will go to school tomorrow. / Base form: iku" },
      { japanese: "きます", romaji: "kimasu", english: "come", example: "友達が家に来ます。(Tomodachi ga uchi ni kimasu.) - My friend will come to my house. / Base form: kuru" },
      { japanese: "かえります", romaji: "kaerimasu", english: "return, go back (home)", example: "五時に家に帰ります。(Go-ji ni uchi ni kaerimasu.) - I will return home at 5 o'clock. / Base form: kaeru" },
      { japanese: "あるきます", romaji: "arukimasu", english: "walk", example: "毎日、駅まで歩きます。(Mainichi, eki made arukimasu.) - I walk to the station every day. / Base form: aruku" },
      { japanese: "はしります", romaji: "hashirimasu", english: "run", example: "公園で走ります。(Kouen de hashirimasu.) - I run in the park. / Base form: hashiru" },
      { japanese: "とびます", romaji: "tobimasu", english: "fly, jump", example: "鳥が空を飛びます。(Tori ga sora o tobimasu.) - Birds fly in the sky. / Base form: tobu" },
      { japanese: "のります", romaji: "norimasu", english: "ride, get on (vehicle)", example: "バスに乗ります。(Basu ni norimasu.) - I will get on the bus. / Base form: noru" },
      { japanese: "おります", romaji: "orimasu", english: "get off (vehicle)", example: "次の駅で降ります。(Tsugi no eki de orimasu.) - I will get off at the next station. / Base form: oriru" },
      { japanese: "でかけます", romaji: "dekakemasu", english: "go out", example: "週末はよく出かけます。(Shuumatsu wa yoku dekakemasu.) - I often go out on weekends. / Base form: dekakeru" },
      { japanese: "でます", romaji: "demasu", english: "leave, exit, attend", example: "七時に家を出ます。(Shichi-ji ni ie o demasu.) - I leave home at 7 o'clock. / 会議に出ます。(Kaigi ni demasu.) - I will attend the meeting. / Base form: deru" },
      { japanese: "はいります", romaji: "hairimasu", english: "enter", example: "教室に入ります。(Kyoushitsu ni hairimasu.) - I enter the classroom. / Base form: hairu" },
      { japanese: "まがります", romaji: "magarimasu", english: "turn (corner)", example: "次の角を左に曲がります。(Tsugi no kado o hidari ni magarimasu.) - I will turn left at the next corner. / Base form: magaru" },
      { japanese: "わたります", romaji: "watarimasu", english: "cross (bridge, road)", example: "橋を渡ります。(Hashi o watarimasu.) - I cross the bridge. / Base form: wataru" },
      { japanese: "とまります", romaji: "tomarimasu", english: "stop (intransitive), stay (at hotel)", example: "バスが止まります。(Basu ga tomarimasu.) - The bus stops. / 京都のホテルに泊まります。(Kyouto no hoteru ni tomarimasu.) - I will stay at a hotel in Kyoto. / Base form: tomaru" },
      { japanese: "のぼります", romaji: "noborimasu", english: "climb, go up", example: "山に登ります。(Yama ni noborimasu.) - I climb the mountain. / Base form: noboru" },
      { japanese: "あがります", romaji: "agarimasu", english: "go up, rise", example: "二階へ上がります。(Nikai e agarimasu.) - I go up to the second floor. / Base form: agaru" },
      // Daily Routine
      { japanese: "おきます", romaji: "okimasu", english: "get up, wake up", example: "毎朝六時に起きます。(Maiasa roku-ji ni okimasu.) - I get up at 6 o'clock every morning. / Base form: okiru" },
      { japanese: "ねます", romaji: "nemasu", english: "sleep, go to bed", example: "十一時に寝ます。(Juu-ichi-ji ni nemasu.) - I go to bed at 11 o'clock. / Base form: neru" },
      { japanese: "はたらきます", romaji: "hatarakimasu", english: "work", example: "銀行で働いています。(Ginkou de hataraite imasu.) - I work at a bank. / Base form: hataraku" },
      { japanese: "やすみます", romaji: "yasumimasu", english: "rest, take a day off, be absent", example: "今日は会社を休みます。(Kyou wa kaisha o yasumimasu.) - I will take the day off from work today. / Base form: yasumu" },
      { japanese: "べんきょうします", romaji: "benkyoushimasu", english: "study", example: "図書館で勉強します。(Toshokan de benkyou shimasu.) - I study at the library. / Base form: benkyou suru" },
      { japanese: "おわります", romaji: "owarimasu", english: "end, finish", example: "仕事は五時に終わります。(Shigoto wa go-ji ni owarimasu.) - Work finishes at 5 o'clock. / Base form: owaru" },
      { japanese: "はじまります", romaji: "hajimarimasu", english: "begin, start (intransitive)", example: "授業は九時に始まります。(Jugyou wa ku-ji ni hajimarimasu.) - Class begins at 9 o'clock. / Base form: hajimaru" },
      { japanese: "つくります", romaji: "tsukurimasu", english: "make, create, cook", example: "晩ごはんを作ります。(Bangohan o tsukurimasu.) - I make dinner. / Base form: tsukuru" },
      { japanese: "あらいます", romaji: "araimasu", english: "wash", example: "手を洗います。(Te o araimasu.) - I wash my hands. / Base form: arau" },
      { japanese: "そうじします", romaji: "soujishimasu", english: "clean", example: "部屋を掃除します。(Heya o souji shimasu.) - I clean the room. / Base form: souji suru" },
      { japanese: "せんたくします", romaji: "sentakushimasu", english: "do laundry", example: "週末に洗濯します。(Shuumatsu ni sentaku shimasu.) - I do laundry on the weekend. / Base form: sentaku suru" },
      { japanese: "みがきます", romaji: "migakimasu", english: "polish, brush (teeth)", example: "歯を磨きます。(Ha o migakimasu.) - I brush my teeth. / Base form: migaku" },
      // Eating & Drinking
      { japanese: "たべます", romaji: "tabemasu", english: "eat", example: "朝ごはんを食べます。(Asagohan o tabemasu.) - I eat breakfast. / Base form: taberu" },
      { japanese: "のみます", romaji: "nomimasu", english: "drink", example: "コーヒーを飲みます。(Koohii o nomimasu.) - I drink coffee. / Base form: nomu" },
      // Communication
      { japanese: "いいます", romaji: "iimasu", english: "say, tell", example: "「ありがとう」と言います。(Arigatou to iimasu.) - I say 'thank you'. / Base form: iu" },
      { japanese: "はなします", romaji: "hanashimasu", english: "speak, talk", example: "日本語を話します。(Nihongo o hanashimasu.) - I speak Japanese. / Base form: hanasu" },
      { japanese: "ききます", romaji: "kikimasu", english: "listen, hear, ask", example: "音楽を聞きます。(Ongaku o kikimasu.) - I listen to music. / 先生に聞きます。(Sensei ni kikimasu.) - I ask the teacher. / Base form: kiku" },
      { japanese: "よみます", romaji: "yomimasu", english: "read", example: "本を読みます。(Hon o yomimasu.) - I read a book. / Base form: yomu" },
      { japanese: "かきます", romaji: "kakimasu", english: "write, draw", example: "手紙を書きます。(Tegami o kakimasu.) - I write a letter. / 絵を描きます。(E o kakimasu.) - I draw a picture. / Base form: kaku" },
      { japanese: "しります", romaji: "shirimasu", english: "know", example: "彼の名前を知っていますか？ (Kare no namae o shitte imasu ka?) - Do you know his name? (Note: usually used in -te iru form for 'know') / Base form: shiru" },
      { japanese: "わかります", romaji: "wakarimasu", english: "understand", example: "日本語がわかります。(Nihongo ga wakarimasu.) - I understand Japanese. / Base form: wakaru" },
      { japanese: "おしえます", romaji: "oshiemasu", english: "teach, tell, inform", example: "英語を教えます。(Eigo o oshiemasu.) - I teach English. / 道を教えます。(Michi o oshiemasu.) - I'll tell you the way. / Base form: oshieru" },
      { japanese: "ならいます", romaji: "naraimasu", english: "learn (from someone)", example: "田中先生に日本語を習います。(Tanaka-sensei ni nihongo o naraimasu.) - I learn Japanese from Professor Tanaka. / Base form: narau" },
      { japanese: "おぼえます", romaji: "oboemasu", english: "memorize, learn, remember", example: "新しい言葉を覚えます。(Atarashii kotoba o oboemasu.) - I memorize new words. / Base form: oboeru" },
      { japanese: "わすれます", romaji: "wasuremasu", english: "forget", example: "宿題を忘れました。(Shukudai o wasuremashita.) - I forgot my homework. / Base form: wasureru" },
      { japanese: "しつもんします", romaji: "shitsumon shimasu", english: "ask a question", example: "先生に質問します。(Sensei ni shitsumon shimasu.) - I ask the teacher a question. / Base form: shitsumon suru" },
      { japanese: "こたえます", romaji: "kotaemasu", english: "answer, reply", example: "質問に答えます。(Shitsumon ni kotaemasu.) - I answer the question. / Base form: kotaeru" },
      { japanese: "よびます", romaji: "yobimasu", english: "call, invite", example: "タクシーを呼びます。(Takushii o yobimasu.) - I call a taxi. / 友達をパーティーに呼びます。(Tomodachi o paatii ni yobimasu.) - I invite my friend to the party. / Base form: yobu" },
      { japanese: "でんわします", romaji: "denwa shimasu", english: "make a phone call", example: "後で電話します。(Atode denwa shimasu.) - I will make a phone call later. / Base form: denwa suru" },
      // Seeing
      { japanese: "みます", romaji: "mimasu", english: "see, watch, look", example: "テレビを見ます。(Terebi o mimasu.) - I watch TV. / Base form: miru" },
      { japanese: "みせます", romaji: "misemasu", english: "show", example: "写真を見せてください。(Shashin o misete kudasai.) - Please show me the photo. / Base form: miseru" },
      { japanese: "あいます", romaji: "aimasu", english: "meet", example: "友達に会います。(Tomodachi ni aimasu.) - I meet my friend. / Base form: au" },
      // Using Objects
      { japanese: "つかいます", romaji: "tsukaimasu", english: "use", example: "ペンを使います。(Pen o tsukaimasu.) - I use a pen. / Base form: tsukau" },
      { japanese: "もちます", romaji: "mochimasu", english: "hold, have, carry", example: "かばんを持ちます。(Kaban o mochimasu.) - I carry a bag. / Base form: motsu" },
      { japanese: "とります", romaji: "torimasu", english: "take, get, pass (something), take (photo)", example: "塩を取ってください。(Shio o totte kudasai.) - Please pass the salt. / 写真を撮ります。(Shashin o torimasu.) - I take a picture. / Base form: toru" },
      { japanese: "おきます", romaji: "okimasu", english: "put, place", example: "本を机の上に置きます。(Hon o tsukue no ue ni okimasu.) - I put the book on the desk. / Base form: oku (different from 'wake up')" },
      { japanese: "いれます", romaji: "iremasu", english: "put in, insert", example: "かばんにお金を入れます。(Kaban ni okane o iremasu.) - I put money in the bag. / Base form: ireru" },
      { japanese: "だします", romaji: "dashimasu", english: "take out, submit, send (letter)", example: "財布からお金を出します。(Saifu kara okane o dashimasu.) - I take money out of my wallet. / レポートを出します。(Repooto o dashimasu.) - I submit the report. / Base form: dasu" },
      // Opening/Closing, Turning On/Off
      { japanese: "あけます", romaji: "akemasu", english: "open (something) (transitive)", example: "窓を開けます。(Mado o akemasu.) - I open the window. / Base form: akeru" },
      { japanese: "あきます", romaji: "akimasu", english: "open (intransitive)", example: "ドアが開きます。(Doa ga akimasu.) - The door opens. / Base form: aku" },
      { japanese: "しめます", romaji: "shimemasu", english: "close (something) (transitive)", example: "ドアを閉めます。(Doa o shimemasu.) - I close the door. / Base form: shimeru" },
      { japanese: "しまります", romaji: "shimarimasu", english: "close, be closed (intransitive)", example: "店が閉まります。(Mise ga shimarimasu.) - The store closes. / Base form: shimaru" },
      { japanese: "つけます", romaji: "tsukemasu", english: "turn on (light, TV), attach", example: "電気をつけます。(Denki o tsukemasu.) - I turn on the light. / Base form: tsukeru" },
      { japanese: "けします", romaji: "keshimasu", english: "turn off, erase, extinguish", example: "テレビを消します。(Terebi o keshimasu.) - I turn off the TV. / Base form: kesu" },
      // Giving & Receiving
      { japanese: "あげます", romaji: "agemasu", english: "give (to others)", example: "友達にプレゼントをあげます。(Tomodachi ni purezento o agemasu.) - I give a present to my friend. / Base form: ageru" },
      { japanese: "もらいます", romaji: "moraimasu", english: "receive", example: "母に花をもらいました。(Haha ni hana o moraimashita.) - I received flowers from my mother. / Base form: morau" },
      { japanese: "くれます", romaji: "kuremasu", english: "give (to me or my group)", example: "兄が私に本をくれました。(Ani ga watashi ni hon o kuremashita.) - My older brother gave me a book. / Base form: kureru" },
      { japanese: "かします", romaji: "kashimasu", english: "lend", example: "友達にお金を貸します。(Tomodachi ni okane o kashimasu.) - I lend money to my friend. / Base form: kasu" },
      { japanese: "かります", romaji: "karimasu", english: "borrow", example: "図書館で本を借ります。(Toshokan de hon o karimasu.) - I borrow a book from the library. / Base form: kariru" },
      { japanese: "かえします", romaji: "kaeshimasu", english: "return (an object)", example: "借りた本を図書館に返します。(Karita hon o toshokan ni kaeshimasu.) - I return the borrowed book to the library. / Base form: kaesu" },
      { japanese: "わたします", romaji: "watashimasu", english: "hand over, pass", example: "書類を渡します。(Shorui o watashimasu.) - I hand over the documents. / Base form: watasu" },
      // Buying & Selling
      { japanese: "かいます", romaji: "kaimasu", english: "buy", example: "スーパーで野菜を買います。(Suupaa de yasai o kaimasu.) - I buy vegetables at the supermarket. / Base form: kau" },
      { japanese: "うります", romaji: "urimasu", english: "sell", example: "古い車を売ります。(Furui kuruma o urimasu.) - I sell my old car. / Base form: uru" },
      // Waiting & Hurrying
      { japanese: "まちます", romaji: "machimasu", english: "wait", example: "駅で友達を待ちます。(Eki de tomodachi o machimasu.) - I wait for my friend at the station. / Base form: matsu" },
      { japanese: "いそぎます", romaji: "isogimasu", english: "hurry", example: "急いでください。(Isoide kudasai.) - Please hurry. / Base form: isogu" },
      // Wearing Clothes
      { japanese: "きます", romaji: "kimasu", english: "wear (upper body: shirt, coat)", example: "シャツを着ます。(Shatsu o kimasu.) - I wear a shirt. / Base form: kiru (different from 'come')" },
      { japanese: "はきます", romaji: "hakimasu", english: "put on, wear (lower body: pants, shoes, socks)", example: "ズボンをはきます。(Zubon o hakimasu.) - I wear pants. / Base form: haku" },
      { japanese: "かぶります", romaji: "kaburimasu", english: "put on, wear (on head: hat, cap)", example: "帽子をかぶります。(Boushi o kaburimasu.) - I wear a hat. / Base form: kaburu" },
      { japanese: "かけます", romaji: "kakemasu", english: "put on, wear (glasses)", example: "めがねをかけます。(Megane o kakemasu.) - I wear glasses. / Base form: kakeru" },
      { japanese: "します", romaji: "shimasu", english: "wear (accessories: tie, scarf)", example: "ネクタイをします。(Nekutai o shimasu.) - I wear a tie. / Base form: suru" },
      { japanese: "ぬぎます", romaji: "nugimasu", english: "take off (clothes, shoes)", example: "靴を脱ぎます。(Kutsu o nugimasu.) - I take off my shoes. / Base form: nugu" },
      // Activities & Hobbies
      { japanese: "あそびます", romaji: "asobimasu", english: "play, hang out, visit", example: "公園で子供が遊びます。(Kouen de kodomo ga asobimasu.) - Children play in the park. / 友達の家へ遊びに行きます。(Tomodachi no ie e asobi ni ikimasu.) - I go to visit my friend's house. / Base form: asobu" },
      { japanese: "およぎます", romaji: "oyogimasu", english: "swim", example: "海で泳ぎます。(Umi de oyogimasu.) - I swim in the sea. / Base form: oyogu" },
      { japanese: "うたいます", romaji: "utaimasu", english: "sing", example: "カラオケで歌います。(Karaoke de utaimasu.) - I sing at karaoke. / Base form: utau" },
      { japanese: "ひきます", romaji: "hikimasu", english: "play (string instrument, piano)", example: "ピアノを弾きます。(Piano o hikimasu.) - I play the piano. / Base form: hiku (different from 'pull')" },
      { japanese: "さんぽします", romaji: "sanposhimasu", english: "take a walk, stroll", example: "公園を散歩します。(Kouen o sanpo shimasu.) - I take a walk in the park. / Base form: sanpo suru" },
      { japanese: "りょこうします", romaji: "ryokoushimasu", english: "travel", example: "夏休みに旅行します。(Natsuyasumi ni ryokou shimasu.) - I travel during summer vacation. / Base form: ryokou suru" },
      { japanese: "れんしゅうします", romaji: "renshuushimasu", english: "practice", example: "毎日ピアノを練習します。(Mainichi piano o renshuu shimasu.) - I practice the piano every day. / Base form: renshuu suru" },
      // Other Common Verbs
      { japanese: "すみます", romaji: "sumimasu", english: "live, reside", example: "東京に住んでいます。(Toukyou ni sunde imasu.) - I live in Tokyo. / Base form: sumu" },
      { japanese: "すわります", romaji: "suwarimasu", english: "sit down", example: "いすに座ります。(Isu ni suwarimasu.) - I sit on the chair. / Base form: suwaru" },
      { japanese: "たちます", romaji: "tachimasu", english: "stand up", example: "立ってください。(Tatte kudasai.) - Please stand up. / Base form: tatsu" },
      { japanese: "つかれます", romaji: "tsukaremasu", english: "get tired", example: "仕事で疲れました。(Shigoto de tsukaremashita.) - I got tired from work. / Base form: tsukareru" },
      { japanese: "しにます", romaji: "shinimasu", english: "die", example: "祖父は去年死にました。(Sofu wa kyonen shinimashita.) - My grandfather died last year. / Base form: shinu" },
      { japanese: "こまります", romaji: "komarimasu", english: "be in trouble, be inconvenienced", example: "お金がなくて困っています。(Okane ga nakute komatte imasu.) - I'm in trouble because I don't have money. / Base form: komaru" },
      { japanese: "ちがいます", romaji: "chigaimasu", english: "be different, be wrong", example: "これは違います。(Kore wa chigaimasu.) - This is wrong. / Base form: chigau" },
      { japanese: "まちがえます", romaji: "machigaemasu", english: "make a mistake", example: "答えを間違えました。(Kotae o machigaemashita.) - I made a mistake in the answer. / Base form: machigaeru" },
      { japanese: "できます", romaji: "dekimasu", english: "can do, be able to, be ready/completed", example: "日本語ができます。(Nihongo ga dekimasu.) - I can speak Japanese. / 料理ができました。(Ryouri ga dekimashita.) - The food is ready. / Base form: dekiru" },
      { japanese: "すいます", romaji: "suimasu", english: "smoke, inhale, suck", example: "タバコを吸いますか？ (Tabako o suimasu ka?) - Do you smoke cigarettes? / Base form: suu" },
      { japanese: "やくそくします", romaji: "yakusokushimasu", english: "promise", example: "明日、会う約束をしました。(Ashita, au yakusoku o shimashita.) - I made a promise to meet tomorrow. / Base form: yakusoku suru" },
      { japanese: "ならびます", romaji: "narabimasu", english: "line up, stand in line (intransitive)", example: "バス停に人が並んでいます。(Basutei ni hito ga narande imasu.) - People are lined up at the bus stop. / Base form: narabu" },
      { japanese: "ならべます", romaji: "narabemasu", english: "line up, arrange (transitive)", example: "本を棚に並べます。(Hon o tana ni narabemasu.) - I arrange the books on the shelf. / Base form: naraberu" },
      { japanese: "ふります", romaji: "furimasu", english: "fall (rain, snow)", example: "雨が降っています。(Ame ga futte imasu.) - It is raining. / Base form: furu" },
      { japanese: "コピーします", romaji: "kopiishimasu", english: "make a copy", example: "この書類をコピーします。(Kono shorui o kopii shimasu.) - I will make a copy of this document. / Base form: kopii suru" },
      { japanese: "します / する", romaji: "shimasu / suru", english: "do, play (sports/games)", example: "宿題をします。(Shukudai o shimasu.) - I do homework. / テニスをします。(Tenisu o shimasu.) - I play tennis. / Base form: suru" },
    ]
  },
  {
    category: "8. Common Adjectives & Descriptions",
    icon: "📝",
    description: "Common adjectives and descriptive words used to describe people, objects, and situations.",
    words: [
      // Size & Length
      { japanese: "おおきい", romaji: "ookii", english: "big, large", example: "大きい犬がいます。(Ookii inu ga imasu.) - There is a big dog." },
      { japanese: "ちいさい", romaji: "chiisai", english: "small, little", example: "小さい花が咲いています。(Chiisai hana ga saite imasu.) - Small flowers are blooming." },
      { japanese: "ながい", romaji: "nagai", english: "long", example: "髪が長いです。(Kami ga nagai desu.) - My hair is long." },
      { japanese: "みじかい", romaji: "mijikai", english: "short (length)", example: "短いスカートをはいています。(Mijikai sukaato o haite imasu.) - She is wearing a short skirt." },
      { japanese: "たかい", romaji: "takai", english: "tall, high / expensive", example: "彼は背が高いです。(Kare wa se ga takai desu.) - He is tall. / この時計は高いです。(Kono tokei wa takai desu.) - This watch is expensive." },
      { japanese: "ひくい", romaji: "hikui", english: "low", example: "この山は低いです。(Kono yama wa hikui desu.) - This mountain is low." },
      { japanese: "ひろい", romaji: "hiroi", english: "spacious, wide", example: "広い部屋に住みたいです。(Hiroi heya ni sumitai desu.) - I want to live in a spacious room." },
      { japanese: "せまい", romaji: "semai", english: "narrow, small (area)", example: "私の部屋は狭いです。(Watashi no heya wa semai desu.) - My room is small." },
      { japanese: "ふとい", romaji: "futoi", english: "thick, fat (cylindrical)", example: "太いペンで書いてください。(Futoi pen de kaite kudasai.) - Please write with a thick pen." },
      { japanese: "ほそい", romaji: "hosoi", english: "thin, slender, fine", example: "彼女は足が細いです。(Kanojo wa ashi ga hosoi desu.) - She has slender legs." },
      { japanese: "あつい", romaji: "atsui", english: "thick (flat objects) / hot (weather/object)", example: "厚い本を読んでいます。(Atsui hon o yonde imasu.) - I am reading a thick book. / 今日は暑いです。(Kyou wa atsui desu.) - It is hot today. / このスープは熱いです。(Kono suupu wa atsui desu.) - This soup is hot." },
      { japanese: "うすい", romaji: "usui", english: "thin (material), weak (taste)", example: "薄い紙を使います。(Usui kami o tsukaimasu.) - I use thin paper. / このお茶は味が薄いです。(Kono ocha wa aji ga usui desu.) - This tea has a weak flavor." },
      // Age & Condition
      { japanese: "あたらしい", romaji: "atarashii", english: "new", example: "新しい靴を買いました。(Atarashii kutsu o kaimashita.) - I bought new shoes." },
      { japanese: "ふるい", romaji: "furui", english: "old (not for people)", example: "古いお寺を見に行きました。(Furui otera o mi ni ikimashita.) - I went to see an old temple." },
      { japanese: "わかい", romaji: "wakai", english: "young", example: "彼はまだ若いです。(Kare wa mada wakai desu.) - He is still young." },
      // Quality & Evaluation
      { japanese: "いい / よい", romaji: "ii / yoi", english: "good", example: "今日は天気がいいですね。(Kyou wa tenki ga ii desu ne.) - The weather is good today, isn't it? / 良い考えですね。(Yoi kangae desu ne.) - That's a good idea." },
      { japanese: "わるい", romaji: "warui", english: "bad, wrong", example: "悪いことをしてはいけません。(Warui koto o shite wa ikemasen.) - You must not do bad things. / 気分が悪いです。(Kibun ga warui desu.) - I feel sick." },
      { japanese: "ただしい", romaji: "tadashii", english: "correct", example: "正しい答えを選んでください。(Tadashii kotae o erande kudasai.) - Please choose the correct answer." },
      { japanese: "むずかしい", romaji: "muzukashii", english: "difficult", example: "この問題は難しいです。(Kono mondai wa muzukashii desu.) - This problem is difficult." },
      { japanese: "やさしい", romaji: "yasashii", english: "easy / kind", example: "このテストは易しいです。(Kono tesuto wa yasashii desu.) - This test is easy. / 彼は優しい人です。(Kare wa yasashii hito desu.) - He is a kind person." },
      // 'takai' already covered under Size
      { japanese: "やすい", romaji: "yasui", english: "cheap, inexpensive", example: "この店は野菜が安いです。(Kono mise wa yasai ga yasui desu.) - Vegetables are cheap at this store." },
      { japanese: "おもしろい", romaji: "omoshiroi", english: "interesting, funny, fun", example: "この本は面白いです。(Kono hon wa omoshiroi desu.) - This book is interesting." },
      { japanese: "つまらない", romaji: "tsumaranai", english: "boring, trivial", example: "この映画はつまらなかったです。(Kono eiga wa tsumaranakatta desu.) - This movie was boring." },
      { japanese: "いそがしい", romaji: "isogashii", english: "busy", example: "今週はとても忙しいです。(Konshuu wa totemo isogashii desu.) - I am very busy this week." },
      { japanese: "ひま", romaji: "hima (na)", english: "free (time), not busy", example: "今日は暇です。(Kyou wa hima desu.) - I am free today. / 暇な時に電話してください。(Hima na toki ni denwa shite kudasai.) - Please call me when you are free. / Na-adjective" },
      { japanese: "きれい", romaji: "kirei (na)", english: "pretty, clean, beautiful", example: "きれいな花ですね。(Kirei na hana desu ne.) - What beautiful flowers! / 部屋をきれいにしました。(Heya o kirei ni shimashita.) - I cleaned the room. / Na-adjective" },
      { japanese: "きたない", romaji: "kitanai", english: "dirty", example: "手が汚いです。洗ってください。(Te ga kitanai desu. Aratte kudasai.) - Your hands are dirty. Please wash them." },
      { japanese: "おいしい", romaji: "oishii", english: "delicious, tasty", example: "このケーキはおいしいです。(Kono keeki wa oishii desu.) - This cake is delicious." },
      { japanese: "まずい", romaji: "mazui", english: "bad tasting, unpleasant", example: "このスープはまずいです。(Kono suupu wa mazui desu.) - This soup tastes bad." },
      { japanese: "あまい", romaji: "amai", english: "sweet", example: "甘いものが好きです。(Amai mono ga suki desu.) - I like sweet things." },
      { japanese: "からい", romaji: "karai", english: "hot, spicy", example: "このカレーは辛いです。(Kono karee wa karai desu.) - This curry is spicy." },
      { japanese: "しょっぱい", romaji: "shoppai", english: "salty", example: "このラーメンはしょっぱいです。(Kono raamen wa shoppai desu.) - This ramen is salty." },
      { japanese: "すっぱい", romaji: "suppai", english: "sour", example: "レモンは酸っぱいです。(Remon wa suppai desu.) - Lemons are sour." },
      { japanese: "にがい", romaji: "nigai", english: "bitter", example: "この薬は苦いです。(Kono kusuri wa nigai desu.) - This medicine is bitter." },
      // Colors (adjective forms where common)
      { japanese: "あかい", romaji: "akai", english: "red", example: "赤いりんごが好きです。(Akai ringo ga suki desu.) - I like red apples." },
      { japanese: "あおい", romaji: "aoi", english: "blue", example: "空が青いです。(Sora ga aoi desu.) - The sky is blue." },
      { japanese: "くろい", romaji: "kuroi", english: "black", example: "黒い猫を飼っています。(Kuroi neko o katte imasu.) - I have a black cat." },
      { japanese: "しろい", romaji: "shiroi", english: "white", example: "白いシャツを着ています。(Shiroi shatsu o kite imasu.) - I am wearing a white shirt." },
      { japanese: "きいろい", romaji: "kiiroi", english: "yellow", example: "黄色い花が咲いています。(Kiiroi hana ga saite imasu.) - Yellow flowers are blooming." },
      { japanese: "ちゃいろい", romaji: "chairoi", english: "brown", example: "茶色いカバンを持っています。(Chairoi kaban o motte imasu.) - I have a brown bag." },
      { japanese: "みどり", romaji: "midori (no)", english: "green (noun/no-adj)", example: "緑の葉がきれいです。(Midori no ha ga kirei desu.) - The green leaves are beautiful." },
      { japanese: "ピンク", romaji: "pinku (no)", english: "pink (noun/no-adj)", example: "ピンクのセーターを買いました。(Pinku no seetaa o kaimashita.) - I bought a pink sweater." },
      { japanese: "いろ", romaji: "iro", english: "color (noun)", example: "何色が好きですか？ (Nani iro ga suki desu ka?) - What color do you like?" },
      { japanese: "いろいろ", romaji: "iroiro (na)", english: "various", example: "いろいろな国の人がいます。(Iroiro na kuni no hito ga imasu.) - There are people from various countries. / Na-adjective" },
      // Feelings & Conditions
      { japanese: "たのしい", romaji: "tanoshii", english: "fun, enjoyable", example: "パーティーは楽しかったです。(Paatii wa tanoshikatta desu.) - The party was fun." },
      { japanese: "うれしい", romaji: "ureshii", english: "happy, pleased", example: "プレゼントをもらって、うれしいです。(Purezento o moratte, ureshii desu.) - I'm happy to receive the present." },
      { japanese: "かなしい", romaji: "kanashii", english: "sad", example: "悲しい映画を見て泣きました。(Kanashii eiga o mite nakimashita.) - I watched a sad movie and cried." },
      { japanese: "さびしい", romaji: "sabishii", english: "lonely, sad", example: "一人でいると寂しいです。(Hitori de iru to sabishii desu.) - I feel lonely when I'm alone." },
      { japanese: "こわい", romaji: "kowai", english: "scary, afraid", example: "暗いところが怖いです。(Kurai tokoro ga kowai desu.) - I'm afraid of dark places." },
      { japanese: "げんき", romaji: "genki (na)", english: "healthy, fine, energetic", example: "おばあさんは元気です。(Obaasan wa genki desu.) - My grandmother is healthy. / 元気な子供たちですね。(Genki na kodomotachi desu ne.) - They are energetic children, aren't they? / Na-adjective" },
      { japanese: "しんせつ", romaji: "shinsetsu (na)", english: "kind", example: "田中さんは親切な人です。(Tanaka-san wa shinsetsu na hito desu.) - Mr. Tanaka is a kind person. / Na-adjective" },
      { japanese: "べんり", romaji: "benri (na)", english: "convenient", example: "このアプリは便利です。(Kono apuri wa benri desu.) - This app is convenient. / 便利な場所に住んでいます。(Benri na basho ni sunde imasu.) - I live in a convenient location. / Na-adjective" },
      { japanese: "ふべん", romaji: "fuben (na)", english: "inconvenient", example: "駅から遠くて不便です。(Eki kara tookute fuben desu.) - It's far from the station and inconvenient. / 不便な生活は嫌です。(Fuben na seikatsu wa iya desu.) - I dislike an inconvenient life. / Na-adjective" },
      { japanese: "たいせつ", romaji: "taisetsu (na)", english: "important, precious", example: "家族は大切です。(Kazoku wa taisetsu desu.) - Family is important. / 大切な書類をなくしました。(Taisetsu na shorui o nakushimashita.) - I lost important documents. / Na-adjective" },
      { japanese: "だいじょうぶ", romaji: "daijoubu (na)", english: "okay, alright", example: "大丈夫ですか？ (Daijoubu desu ka?) - Are you okay? / 大丈夫なようです。(Daijoubu na you desu.) - It seems to be okay. / Na-adjective" },
      { japanese: "じょうず", romaji: "jouzu (na)", english: "skillful, good at", example: "彼は日本語が上手です。(Kare wa nihongo ga jouzu desu.) - He is good at Japanese. / 上手な絵ですね。(Jouzu na e desu ne.) - That's a skillful drawing! / Na-adjective" },
      { japanese: "へた", romaji: "heta (na)", english: "unskillful, bad at", example: "私は歌が下手です。(Watashi wa uta ga heta desu.) - I am bad at singing. / 下手な字でごめんなさい。(Heta na ji de gomennasai.) - Sorry for my poor handwriting. / Na-adjective" },
      { japanese: "すき", romaji: "suki (na)", english: "like, fond of", example: "猫が好きです。(Neko ga suki desu.) - I like cats. / 好きな食べ物は何ですか？(Suki na tabemono wa nan desu ka?) - What is your favorite food? / Na-adjective" },
      { japanese: "きらい", romaji: "kirai (na)", english: "dislike, hate", example: "ピーマンが嫌いです。(Piiman ga kirai desu.) - I dislike green peppers. / 嫌いなことはしたくないです。(Kirai na koto wa shitakunai desu.) - I don't want to do things I dislike. / Na-adjective" },
      { japanese: "だいすき", romaji: "daisuki (na)", english: "like very much, love", example: "アニメが大好きです。(Anime ga daisuki desu.) - I love anime. / 大好きな人と結婚します。(Daisuki na hito to kekkon shimasu.) - I will marry the person I love. / Na-adjective" },
      { japanese: "ゆうめい", romaji: "yuumei (na)", english: "famous", example: "このレストランは有名です。(Kono resutoran wa yuumei desu.) - This restaurant is famous. / 有名な歌手に会いました。(Yuumei na kashu ni aimashita.) - I met a famous singer. / Na-adjective" },
      { japanese: "りっぱ", romaji: "rippa (na)", english: "splendid, magnificent", example: "立派な建物ですね。(Rippa na tatemono desu ne.) - What a splendid building! / 彼は立派な医者になりました。(Kare wa rippa na isha ni narimashita.) - He became a respectable doctor. / Na-adjective" },
      // Environment & State
      { japanese: "あかるい", romaji: "akarui", english: "bright, light", example: "この部屋は明るいです。(Kono heya wa akarui desu.) - This room is bright." },
      { japanese: "くらい", romaji: "kurai", english: "dark", example: "夜になると暗くなります。(Yoru ni naru to kuraku narimasu.) - It gets dark at night." },
      { japanese: "あたたかい", romaji: "atatakai", english: "warm (object, weather, feeling)", example: "今日は暖かいですね。(Kyou wa atatakai desu ne.) - It's warm today, isn't it? / 温かいスープを飲みました。(Atatakai suupu o nomimashita.) - I drank warm soup." },
      { japanese: "すずしい", romaji: "suzushii", english: "cool (weather)", example: "秋は涼しいです。(Aki wa suzushii desu.) - Autumn is cool." },
      // 'atsui' already covered under Size/Thickness
      { japanese: "さむい", romaji: "samui", english: "cold (weather)", example: "冬は寒いです。(Fuyu wa samui desu.) - Winter is cold." },
      { japanese: "つめたい", romaji: "tsumetai", english: "cold (to touch)", example: "冷たい水を飲みます。(Tsumetai mizu o nomimasu.) - I drink cold water." },
      { japanese: "ぬるい", romaji: "nurui", english: "lukewarm", example: "お風呂がぬるいです。(Ofuro ga nurui desu.) - The bath is lukewarm." },
      { japanese: "しずか", romaji: "shizuka (na)", english: "quiet", example: "図書館は静かです。(Toshokan wa shizuka desu.) - The library is quiet. / 静かな場所が好きです。(Shizuka na basho ga suki desu.) - I like quiet places. / Na-adjective" },
      { japanese: "にぎやか", romaji: "nigiyaka (na)", english: "lively, bustling", example: "この街はにぎやかです。(Kono machi wa nigiyaka desu.) - This town is lively. / にぎやかな市場に行きました。(Nigiyaka na ichiba ni ikimashita.) - I went to a bustling market. / Na-adjective" },
      { japanese: "うるさい", romaji: "urusai", english: "noisy, annoying", example: "隣の工事がうるさいです。(Tonari no kouji ga urusai desu.) - The construction next door is noisy." },
      { japanese: "あぶない", romaji: "abunai", english: "dangerous", example: "この道は危ないです。(Kono michi wa abunai desu.) - This road is dangerous." },
      // Speed & Closeness
      { japanese: "はやい", romaji: "hayai", english: "fast / early", example: "新幹線は速いです。(Shinkansen wa hayai desu.) - The bullet train is fast. / 朝早く起きました。(Asa hayaku okimashita.) - I woke up early in the morning." },
      { japanese: "おそい", romaji: "osoi", english: "slow / late", example: "歩くのが遅いです。(Aruku no ga osoi desu.) - My walking is slow. / 昨日は帰りが遅かったです。(Kinou wa kaeri ga osokatta desu.) - I came home late yesterday." },
      { japanese: "ちかい", romaji: "chikai", english: "near, close", example: "家は駅から近いです。(Uchi wa eki kara chikai desu.) - My house is near the station." },
      { japanese: "とおい", romaji: "tooi", english: "far", example: "空港は遠いです。(Kuukou wa tooi desu.) - The airport is far." },
      // Strength
      { japanese: "つよい", romaji: "tsuyoi", english: "strong", example: "風が強いです。(Kaze ga tsuyoi desu.) - The wind is strong." },
      { japanese: "よわい", romaji: "yowai", english: "weak", example: "体があまり弱いです。(Karada ga amari yowai desu.) - My body is rather weak." },
      // Weight
      { japanese: "おもい", romaji: "omoi", english: "heavy", example: "この荷物は重いです。(Kono nimotsu wa omoi desu.) - This luggage is heavy." },
      { japanese: "かるい", romaji: "karui", english: "light (weight)", example: "このカバンは軽いです。(Kono kaban wa karui desu.) - This bag is light." },
      // Shape
      { japanese: "まるい", romaji: "marui", english: "round", example: "月は丸いです。(Tsuki wa marui desu.) - The moon is round." },
      // Desire
      { japanese: "ほしい", romaji: "hoshii", english: "want (object/thing)", example: "新しいパソコンが欲しいです。(Atarashii pasokon ga hoshii desu.) - I want a new computer." },
    ]
  },
  // --- Specific Noun Categories ---
  {
    category: "9. Food & Drink",
    icon: "🍽️",
    description: "Common food and drink items, including meals, ingredients, and beverages.",
    words: [
      // General
      { japanese: "たべもの", romaji: "tabemono", english: "food", example: "好きな食べ物は何ですか？ (Suki na tabemono wa nan desu ka?) - What is your favorite food?" },
      { japanese: "のみもの", romaji: "nomimono", english: "drink, beverage", example: "飲み物は何がいいですか？ (Nomimono wa nani ga ii desu ka?) - What would you like to drink?" },
      { japanese: "ごはん", romaji: "gohan", english: "cooked rice / meal", example: "晩ごはんを食べます。(Bangohan o tabemasu.) - I eat dinner. / ご飯を三杯食べました。(Gohan o sanbai tabemashita.) - I ate three bowls of rice." },
      { japanese: "あさごはん", romaji: "asagohan", english: "breakfast", example: "朝ごはんはいつもパンです。(Asagohan wa itsumo pan desu.) - Breakfast is always bread." },
      { japanese: "ひるごはん", romaji: "hirugohan", english: "lunch", example: "昼ごはんを一緒に食べませんか？ (Hirugohan o isshoni tabemasen ka?) - Won't you have lunch with me?" },
      { japanese: "ばんごはん", romaji: "bangohan", english: "dinner", example: "今日の晩ごはんはカレーです。(Kyou no bangohan wa karee desu.) - Tonight's dinner is curry." },
      { japanese: "おべんとう", romaji: "obentou", english: "lunch box, packed meal", example: "毎日、お弁当を作ります。(Mainichi, obentou o tsukurimasu.) - I make a bento box every day." },
      { japanese: "りょうり", romaji: "ryouri", english: "cooking, cuisine, dish", example: "イタリア料理が好きです。(Itaria ryouri ga suki desu.) - I like Italian cuisine. / 母は料理が上手です。(Haha wa ryouri ga jouzu desu.) - My mother is good at cooking." },
      // Drinks
      { japanese: "みず", romaji: "mizu", english: "water (cold/room temp)", example: "水を一杯ください。(Mizu o ippai kudasai.) - Please give me a glass of water." },
      { japanese: "おゆ", romaji: "oyu", english: "hot water", example: "お湯を沸かしてください。(Oyu o wakashite kudasai.) - Please boil some hot water." },
      { japanese: "おちゃ", romaji: "ocha", english: "tea (usually green tea)", example: "食後にお茶を飲みます。(Shokugo ni ocha o nomimasu.) - I drink tea after meals." },
      { japanese: "こうちゃ", romaji: "koucha", english: "black tea", example: "紅茶にミルクを入れますか？ (Koucha ni miruku o iremasu ka?) - Do you put milk in your black tea?" },
      { japanese: "コーヒー", romaji: "koohii", english: "coffee", example: "毎朝コーヒーを飲みます。(Maiasa koohii o nomimasu.) - I drink coffee every morning." },
      { japanese: "ぎゅうにゅう / ミルク", romaji: "gyuunyuu / miruku", english: "milk", example: "子供は牛乳が好きです。(Kodomo wa gyuunyuu ga suki desu.) - Children like milk." },
      { japanese: "ジュース", romaji: "juusu", english: "juice", example: "オレンジジュースをください。(Orenji juusu o kudasai.) - Orange juice, please." },
      { japanese: "ビール", romaji: "biiru", english: "beer", example: "仕事の後、ビールを飲みます。(Shigoto no ato, biiru o nomimasu.) - I drink beer after work." },
      { japanese: "ワイン", romaji: "wain", english: "wine", example: "フランスのワインが好きです。(Furansu no wain ga suki desu.) - I like French wine." },
      { japanese: "おさけ", romaji: "osake", english: "alcohol, sake (Japanese rice wine)", example: "お酒はあまり飲みません。(Osake wa amari nomimasen.) - I don't drink much alcohol. / 日本酒を飲みました。(Nihonshu (osake) o nomimashita.) - I drank sake." },
      // Staples & Grains
      { japanese: "パン", romaji: "pan", english: "bread", example: "朝はパンを食べます。(Asa wa pan o tabemasu.) - I eat bread in the morning." },
      { japanese: "めん", romaji: "men", english: "noodles", example: "ラーメンは人気の麺料理です。(Raamen wa ninki no men ryouri desu.) - Ramen is a popular noodle dish." },
      // Proteins
      { japanese: "にく", romaji: "niku", english: "meat", example: "肉と野菜を炒めます。(Niku to yasai o itamemasu.) - I stir-fry meat and vegetables." },
      { japanese: "とりにく", romaji: "toriniku", english: "chicken (meat)", example: "鶏肉の唐揚げが好きです。(Toriniku no karaage ga suki desu.) - I like fried chicken." },
      { japanese: "ぶたにく", romaji: "butaniku", english: "pork", example: "豚肉で生姜焼きを作ります。(Butaniku de shougayaki o tsukurimasu.) - I make ginger pork with pork." },
      { japanese: "ぎゅうにく", romaji: "gyuuniku", english: "beef", example: "すき焼きには牛肉を使います。(Sukiyaki ni wa gyuuniku o tsukaimasu.) - Beef is used for sukiyaki." },
      { japanese: "さかな", romaji: "sakana", english: "fish", example: "焼き魚定食を食べました。(Yakizakana teishoku o tabemashita.) - I ate the grilled fish set meal." },
      { japanese: "たまご", romaji: "tamago", english: "egg", example: "毎朝、卵を食べます。(Maiasa, tamago o tabemasu.) - I eat an egg every morning." },
      { japanese: "とうふ", romaji: "tofu", english: "tofu", example: "冷奴は豆腐の料理です。(Hiyayakko wa tofu no ryouri desu.) - Hiyayakko is a tofu dish." },
      // Fruits & Vegetables
      { japanese: "やさい", romaji: "yasai", english: "vegetable", example: "野菜をたくさん食べましょう。(Yasai o takusan tabemashou.) - Let's eat lots of vegetables." },
      { japanese: "くだもの", romaji: "kudamono", english: "fruit", example: "食後に果物を食べます。(Shokugo ni kudamono o tabemasu.) - I eat fruit after the meal." },
      { japanese: "りんご", romaji: "ringo", english: "apple", example: "毎日りんごを一つ食べます。(Mainichi ringo o hitotsu tabemasu.) - I eat one apple every day." },
      { japanese: "みかん", romaji: "mikan", english: "mandarin orange", example: "冬はみかんがおいしいです。(Fuyu wa mikan ga oishii desu.) - Mandarin oranges are delicious in winter." },
      { japanese: "バナナ", romaji: "banana", english: "banana", example: "朝食にバナナを食べます。(Choushoku ni banana o tabemasu.) - I eat a banana for breakfast." },
      // Sweets & Snacks
      { japanese: "おかし", romaji: "okashi", english: "sweets, snacks, confectionery", example: "子供はお菓子が大好きです。(Kodomo wa okashi ga daisuki desu.) - Children love snacks." },
      { japanese: "ケーキ", romaji: "keeki", english: "cake", example: "誕生日にケーキを食べました。(Tanjoubi ni keeki o tabemashita.) - I ate cake on my birthday." },
      { japanese: "チョコレート", romaji: "chokoreeto", english: "chocolate", example: "バレンタインにチョコレートをあげます。(Barentain ni chokoreeto o agemasu.) - I give chocolates on Valentine's Day." },
      { japanese: "アイスクリーム", romaji: "aisukuriimu", english: "ice cream", example: "夏はアイスクリームが食べたいです。(Natsu wa aisukuriimu ga tabetai desu.) - I want to eat ice cream in the summer." },
      { japanese: "クリーム", romaji: "kuriimu", english: "cream", example: "ケーキにクリームを塗ります。(Keeki ni kuriimu o nurimasu.) - I spread cream on the cake." },
      // Seasonings & Condiments
      { japanese: "さとう", romaji: "satou", english: "sugar", example: "コーヒーに砂糖を入れますか？ (Koohii ni satou o iremasu ka?) - Do you put sugar in your coffee?" },
      { japanese: "しお", romaji: "shio", english: "salt", example: "スープに塩を少し入れます。(Suupu ni shio o sukoshi iremasu.) - I put a little salt in the soup." },
      { japanese: "こしょう", romaji: "koshou", english: "pepper (spice)", example: "ステーキにこしょうをかけます。(Suteeki ni koshou o kakemasu.) - I put pepper on the steak." },
      { japanese: "しょうゆ", romaji: "shouyu", english: "soy sauce", example: "寿司に醤油をつけます。(Sushi ni shouyu o tsukemasu.) - I dip sushi in soy sauce." },
      { japanese: "みそ", romaji: "miso", english: "miso (fermented soybean paste)", example: "毎朝、味噌汁を飲みます。(Maiasa, misoshiru o nomimasu.) - I drink miso soup every morning." },
      // Eating Utensils (often discussed with food)
      { japanese: "はし", romaji: "hashi", english: "chopsticks", example: "日本では箸でご飯を食べます。(Nihon de wa hashi de gohan o tabemasu.) - In Japan, people eat rice with chopsticks." },
      { japanese: "ちゃわん", romaji: "chawan", english: "rice bowl", example: "お茶碗にご飯をよそいます。(Ochawan ni gohan o yosoimasu.) - I serve rice in a rice bowl." },
      { japanese: "おさら", romaji: "osara", english: "plate, dish", example: "お皿を洗ってください。(Osara o aratte kudasai.) - Please wash the plates." },
      { japanese: "コップ", romaji: "koppu", english: "glass, cup (usually glass)", example: "コップに水を入れてください。(Koppu ni mizu o irete kudasai.) - Please pour water into the glass." },
      { japanese: "カップ", romaji: "kappu", english: "cup (usually mug-like)", example: "温かいコーヒーをカップで飲みます。(Atatakai koohii o kappu de nomimasu.) - I drink hot coffee from a cup." },
      { japanese: "スプーン", romaji: "supuun", english: "spoon", example: "スープをスプーンで飲みます。(Suupu o supuun de nomimasu.) - I eat soup with a spoon." },
      { japanese: "フォーク", romaji: "fooku", english: "fork", example: "パスタをフォークで食べます。(Pasuta o fooku de tabemasu.) - I eat pasta with a fork." },
      { japanese: "ナイフ", romaji: "naifu", english: "knife", example: "ステーキをナイフで切ります。(Suteeki o naifu de kirimasu.) - I cut the steak with a knife." },
    ]
  },
  {
    category: "10. Everyday Objects",
    icon: "👜",
    description: "Common objects and items found in daily life, including stationery, containers, and personal items.",
    words: [
      // Stationary & Writing
      { japanese: "ほん", romaji: "hon", english: "book", example: "図書館で本を借りました。(Toshokan de hon o karimashita.) - I borrowed a book from the library." },
      { japanese: "ノート", romaji: "nooto", english: "notebook", example: "授業の内容をノートに書きます。(Jugyou no naiyou o nooto ni kakimasu.) - I write the class content in my notebook." },
      { japanese: "じしょ", romaji: "jisho", english: "dictionary", example: "わからない言葉を辞書で調べます。(Wakaranai kotoba o jisho de shirabemasu.) - I look up words I don't understand in the dictionary." },
      { japanese: "しんぶん", romaji: "shinbun", english: "newspaper", example: "毎朝、新聞を読みます。(Maiasa, shinbun o yomimasu.) - I read the newspaper every morning." },
      { japanese: "ざっし", romaji: "zasshi", english: "magazine", example: "電車の中で雑誌を読みます。(Densha no naka de zasshi o yomimasu.) - I read magazines on the train." },
      { japanese: "かみ", romaji: "kami", english: "paper", example: "紙に名前を書いてください。(Kami ni namae o kaite kudasai.) - Please write your name on the paper." },
      { japanese: "てがみ", romaji: "tegami", english: "letter", example: "友達に手紙を書きました。(Tomodachi ni tegami o kakimashita.) - I wrote a letter to my friend." },
      { japanese: "はがき", romaji: "hagaki", english: "postcard", example: "旅行先から葉書を送ります。(Ryokousaki kara hagaki o okurimasu.) - I will send a postcard from my travel destination." },
      { japanese: "ふうとう", romaji: "fuutou", english: "envelope", example: "手紙を封筒に入れます。(Tegami o fuutou ni iremasu.) - I put the letter in the envelope." },
      { japanese: "きって", romaji: "kitte", english: "postage stamp", example: "封筒に切手を貼ります。(Fuutou ni kitte o harimasu.) - I stick a stamp on the envelope." },
      { japanese: "えんぴつ", romaji: "enpitsu", english: "pencil", example: "鉛筆で絵を描きます。(Enpitsu de e o kakimasu.) - I draw pictures with a pencil." },
      { japanese: "ペン", romaji: "pen", english: "pen", example: "このペンは書きやすいです。(Kono pen wa kakiyasui desu.) - This pen is easy to write with." },
      { japanese: "ボールペン", romaji: "boorupen", english: "ballpoint pen", example: "書類にボールペンでサインします。(Shorui ni boorupen de sain shimasu.) - I sign the documents with a ballpoint pen." },
      { japanese: "まんねんひつ", romaji: "mannenhitsu", english: "fountain pen", example: "父は万年筆を使っています。(Chichi wa mannenhitsu o tsukatte imasu.) - My father uses a fountain pen." },
      { japanese: "けしゴム", romaji: "keshigomu", english: "eraser", example: "間違えたところを消しゴムで消します。(Machigaeta tokoro o keshigomu de keshimasu.) - I erase the mistaken part with an eraser." },
      // Containers & Bags
      { japanese: "かばん", romaji: "kaban", english: "bag, briefcase", example: "カバンに教科書を入れます。(Kaban ni kyoukasho o iremasu.) - I put textbooks in my bag." },
      { japanese: "さいふ", romaji: "saifu", english: "wallet, purse", example: "財布にお金が入っています。(Saifu ni okane ga haitte imasu.) - There is money in the wallet." },
      { japanese: "はこ", romaji: "hako", english: "box", example: "この箱の中に何がありますか？ (Kono hako no naka ni nani ga arimasu ka?) - What is inside this box?" },
      { japanese: "ふくろ", romaji: "fukuro", english: "bag, sack (plastic, paper)", example: "スーパーで袋をもらいます。(Suupaa de fukuro o moraimasu.) - I get a bag at the supermarket." },
      { japanese: "ポケット", romaji: "poketto", english: "pocket", example: "鍵をポケットに入れました。(Kagi o poketto ni iremashita.) - I put the key in my pocket." },
      // Common Items
      { japanese: "かさ", romaji: "kasa", english: "umbrella", example: "雨が降っているので、傘を持っていきます。(Ame ga futte iru node, kasa o motte ikimasu.) - It's raining, so I'll take an umbrella." },
      { japanese: "かぎ", romaji: "kagi", english: "key", example: "家の鍵を忘れました。(Ie no kagi o wasuremashita.) - I forgot the house key." },
      { japanese: "とけい", romaji: "tokei", english: "watch, clock", example: "壁に時計がかかっています。(Kabe ni tokei ga kakatte imasu.) - There is a clock hanging on the wall. / 腕時計をしています。(Udedokei o shite imasu.) - I am wearing a wristwatch." },
      { japanese: "めがね", romaji: "megane", english: "glasses, spectacles", example: "本を読む時、めがねをかけます。(Hon o yomu toki, megane o kakemasu.) - I wear glasses when I read books." },
      { japanese: "くすり", romaji: "kusuri", english: "medicine", example: "風邪をひいたので、薬を飲みました。(Kaze o hiita node, kusuri o nomimashita.) - I caught a cold, so I took medicine." },
      { japanese: "おかね", romaji: "okane", english: "money", example: "銀行でお金をおろします。(Ginkou de okane o oroshimasu.) - I withdraw money at the bank." },
      { japanese: "きっぷ", romaji: "kippu", english: "ticket", example: "駅で電車の切符を買います。(Eki de densha no kippu o kaimasu.) - I buy a train ticket at the station." },
      { japanese: "しゃしん", romaji: "shashin", english: "photograph, picture", example: "旅行でたくさん写真を撮りました。(Ryokou de takusan shashin o torimashita.) - I took many pictures on my trip." },
      { japanese: "ちず", romaji: "chizu", english: "map", example: "地図を見て、道を確認します。(Chizu o mite, michi o kakunin shimasu.) - I look at the map and check the route." },
      { japanese: "カレンダー", romaji: "karendaa", english: "calendar", example: "壁にカレンダーをかけます。(Kabe ni karendaa o kakemasu.) - I hang a calendar on the wall." },
      { japanese: "マッチ", romaji: "macchi", english: "match (fire)", example: "マッチで火をつけます。(Macchi de hi o tsukemasu.) - I light a fire with a match." },
      { japanese: "たばこ", romaji: "tabako", english: "cigarette, tobacco", example: "ここでタバコを吸わないでください。(Koko de tabako o suwanaide kudasai.) - Please do not smoke cigarettes here." },
      { japanese: "はんこ / いんかん", romaji: "hanko / inkan", english: "seal, stamp (personal)", example: "書類に判子を押します。(Shorui ni hanko o oshimasu.) - I stamp the document with my seal." },
      { japanese: "にもつ", romaji: "nimotsu", english: "luggage, baggage, package", example: "空港で荷物を預けます。(Kuukou de nimotsu o azukemasu.) - I check in my luggage at the airport." },
      // Abstract Things
      { japanese: "もの", romaji: "mono", english: "thing (tangible object)", example: "テーブルの上に色々な物があります。(Teeburu no ue ni iroiro na mono ga arimasu.) - There are various things on the table." },
      { japanese: "こと", romaji: "koto", english: "thing (intangible matter, affair)", example: "日本のことについて勉強しています。(Nihon no koto ni tsuite benkyou shite imasu.) - I am studying about things related to Japan." },
      { japanese: "じかん", romaji: "jikan", english: "time", example: "時間があまりありません。(Jikan ga amari arimasen.) - I don't have much time." }, // Also duration
      { japanese: "しごと", romaji: "shigoto", english: "work, job", example: "私の仕事はエンジニアです。(Watashi no shigoto wa enjinia desu.) - My job is an engineer." },
      { japanese: "やくそく", romaji: "yakusoku", english: "promise, appointment", example: "友達と会う約束があります。(Tomodachi to au yakusoku ga arimasu.) - I have an appointment to meet my friend." },
      { japanese: "はなし", romaji: "hanashi", english: "story, talk, conversation", example: "面白い話を聞きました。(Omoshiroi hanashi o kikimashita.) - I heard an interesting story." },
    ]
  },
  {
    category: "11. Home & Living",
    icon: "🏡",
    description: "Common words related to home, living spaces, and household items.",
    words: [
      // Buildings & Rooms
      { japanese: "いえ / うち", romaji: "ie / uchi", english: "house, home", example: "これは私の家です。(Kore wa watashi no ie desu.) - This is my house. / うちへ帰りましょう。(Uchi e kaerimashou.) - Let's go home." },
      { japanese: "アパート", romaji: "apaato", english: "apartment (usually older, smaller)", example: "駅の近くのアパートに住んでいます。(Eki no chikaku no apaato ni sunde imasu.) - I live in an apartment near the station." },
      { japanese: "マンション", romaji: "manshon", english: "condominium, apartment (usually larger, newer)", example: "新しいマンションに引っ越しました。(Atarashii manshon ni hikkoshimashita.) - I moved to a new condominium." },
      { japanese: "へや", romaji: "heya", english: "room", example: "私の部屋は二階にあります。(Watashi no heya wa nikai ni arimasu.) - My room is on the second floor." },
      { japanese: "げんかん", romaji: "genkan", english: "entranceway, foyer", example: "玄関で靴を脱ぎます。(Genkan de kutsu o nugimasu.) - I take off my shoes in the entranceway." },
      { japanese: "だいどころ", romaji: "daidokoro", english: "kitchen", example: "台所で料理をします。(Daidokoro de ryouri o shimasu.) - I cook in the kitchen." },
      { japanese: "しょくどう", romaji: "shokudou", english: "dining room, cafeteria", example: "食堂で昼ごはんを食べます。(Shokudou de hirugohan o tabemasu.) - I eat lunch in the dining room/cafeteria." },
      { japanese: "いま", romaji: "ima", english: "living room (western style)", example: "居間でテレビを見ます。(Ima de terebi o mimasu.) - I watch TV in the living room." }, // (kanji 居間)
      { japanese: "しんしつ", romaji: "shinshitsu", english: "bedroom", example: "寝室で寝ます。(Shinshitsu de nemasu.) - I sleep in the bedroom." },
      { japanese: "おふろ / ふろば", romaji: "ofuro / furoba", english: "bath / bathroom", example: "お風呂に入ります。(Ofuro ni hairimasu.) - I take a bath. / 風呂場を掃除します。(Furoba o souji shimasu.) - I clean the bathroom." },
      { japanese: "おてあらい / トイレ", romaji: "otearai / toire", english: "lavatory, toilet, restroom", example: "お手洗いはどこですか？ (Otearai wa doko desu ka?) - Where is the restroom? / トイレに行きたいです。(Toire ni ikitai desu.) - I want to go to the toilet." },
      { japanese: "にわ", romaji: "niwa", english: "garden, yard", example: "庭にきれいな花が咲いています。(Niwa ni kirei na hana ga saite imasu.) - Beautiful flowers are blooming in the garden." },
      { japanese: "かいだん", romaji: "kaidan", english: "stairs", example: "階段を上ります。(Kaidan o noborimasu.) - I go up the stairs." },
      { japanese: "まど", romaji: "mado", english: "window", example: "窓を開けてください。(Mado o akete kudasai.) - Please open the window." },
      { japanese: "ドア", romaji: "doa", english: "door", example: "ドアを閉めてください。(Doa o shimete kudasai.) - Please close the door." },
      // Furniture
      { japanese: "つくえ", romaji: "tsukue", english: "desk", example: "机の上で勉強します。(Tsukue no ue de benkyou shimasu.) - I study at the desk." },
      { japanese: "いす", romaji: "isu", english: "chair", example: "この椅子に座ってください。(Kono isu ni suwatte kudasai.) - Please sit in this chair." },
      { japanese: "テーブル", romaji: "teeburu", english: "table", example: "テーブルの上に料理を並べます。(Teeburu no ue ni ryouri o narabemasu.) - I arrange the dishes on the table." },
      { japanese: "ベッド", romaji: "beddo", english: "bed", example: "ベッドで寝ます。(Beddo de nemasu.) - I sleep in the bed." },
      { japanese: "ふとん", romaji: "futon", english: "Japanese bedding", example: "畳の上に布団を敷きます。(Tatami no ue ni futon o shikimasu.) - I lay the futon on the tatami mat." },
      { japanese: "ほんだな", romaji: "hondana", english: "bookshelf", example: "本棚に本を並べます。(Hondana ni hon o narabemasu.) - I arrange books on the bookshelf." },
      { japanese: "たんす", romaji: "tansu", english: "chest of drawers", example: "服を箪笥にしまいます。(Fuku o tansu ni shimaimasu.) - I put away clothes in the chest of drawers." },
      // Appliances & Utilities
      { japanese: "でんき", romaji: "denki", english: "electricity, electric light", example: "部屋の電気をつけてください。(Heya no denki o tsukete kudasai.) - Please turn on the room light." },
      { japanese: "エアコン", romaji: "eakon", english: "air conditioner", example: "暑いので、エアコンをつけます。(Atsui node, eakon o tsukemasu.) - It's hot, so I'll turn on the air conditioner." },
      { japanese: "ストーブ / ヒーター", romaji: "sutoobu / hiitaa", english: "heater, stove", example: "寒いので、ストーブをつけます。(Samui node, sutoobu o tsukemasu.) - It's cold, so I'll turn on the heater." },
      { japanese: "れいぞうこ", romaji: "reizouko", english: "refrigerator", example: "冷蔵庫にジュースが入っています。(Reizouko ni juusu ga haitte imasu.) - There is juice in the refrigerator." },
      { japanese: "せんたくき", romaji: "sentakuki", english: "washing machine", example: "洗濯機で服を洗います。(Sentakuki de fuku o araimasu.) - I wash clothes in the washing machine." },
      { japanese: "そうじき", romaji: "soujiki", english: "vacuum cleaner", example: "掃除機で部屋をきれいにします。(Soujiki de heya o kirei ni shimasu.) - I clean the room with the vacuum cleaner." },
      { japanese: "テレビ", romaji: "terebi", english: "television, TV", example: "毎晩テレビを見ます。(Maiban terebi o mimasu.) - I watch TV every evening." },
      { japanese: "ラジオ", romaji: "rajio", english: "radio", example: "朝、ラジオを聞きます。(Asa, rajio o kikimasu.) - I listen to the radio in the morning." },
      { japanese: "パソコン", romaji: "pasokon", english: "personal computer, PC", example: "仕事でパソコンを使います。(Shigoto de pasokon o tsukaimasu.) - I use a computer for work." }, // Also Tech
      { japanese: "でんわ", romaji: "denwa", english: "telephone, phone call", example: "友達に電話をかけます。(Tomodachi ni denwa o kakemasu.) - I make a phone call to my friend." }, // Also Tech
      // Household Supplies
      { japanese: "せっけん", romaji: "sekken", english: "soap", example: "石鹸で手を洗います。(Sekken de te o araimasu.) - I wash my hands with soap." },
      { japanese: "シャンプー", romaji: "shampuu", english: "shampoo", example: "シャンプーで髪を洗います。(Shampuu de kami o araimasu.) - I wash my hair with shampoo." },
      { japanese: "はブラシ", romaji: "haburashi", english: "toothbrush", example: "歯ブラシで歯を磨きます。(Haburashi de ha o migakimasu.) - I brush my teeth with a toothbrush." }, // (Ha = tooth)
      { japanese: "タオル", romaji: "taoru", english: "towel", example: "お風呂のあと、タオルで体を拭きます。(Ofuro no ato, taoru de karada o fukimasu.) - After the bath, I dry my body with a towel." },
      { japanese: "ティッシュペーパー", romaji: "tisshupeepaa", english: "tissue paper", example: "鼻をかむのにティッシュペーパーを使います。(Hana o kamu no ni tisshupeepaa o tsukaimasu.) - I use tissue paper to blow my nose." },
      { japanese: "トイレットペーパー", romaji: "toirettopepaa", english: "toilet paper", example: "トイレにトイレットペーパーがあります。(Toire ni toirettopepaa ga arimasu.) - There is toilet paper in the restroom." },
    ]
  },
  {
    category: "12. Places & Buildings (Public)",
    icon: "🏢",
    description: "Common places and buildings, including public facilities, landmarks, and locations.",
    words: [
      { japanese: "まち", romaji: "machi", english: "town, city", example: "この町はとてもきれいです。(Kono machi wa totemo kirei desu.) - This town is very beautiful." },
      { japanese: "むら", romaji: "mura", english: "village", example: "祖母は小さな村に住んでいます。(Sobo wa chiisana mura ni sunde imasu.) - My grandmother lives in a small village." },
      { japanese: "くに", romaji: "kuni", english: "country, nation", example: "あなたの国はどこですか？ (Anata no kuni wa doko desu ka?) - Where is your country?" },
      { japanese: "がいこく", romaji: "gaikoku", english: "foreign country", example: "外国へ旅行したいです。(Gaikoku e ryokou shitai desu.) - I want to travel to a foreign country." },
      { japanese: "にほん", romaji: "nihon", english: "Japan", example: "日本へようこそ。(Nihon e youkoso.) - Welcome to Japan." },
      { japanese: "かいしゃ", romaji: "kaisha", english: "company, office", example: "父は会社で働いています。(Chichi wa kaisha de hataraite imasu.) - My father works at a company." },
      { japanese: "がっこう", romaji: "gakkou", english: "school", example: "子供たちは学校へ行きました。(Kodomotachi wa gakkou e ikimashita.) - The children went to school." },
      { japanese: "だいがく", romaji: "daigaku", english: "university", example: "兄は大学で経済学を勉強しています。(Ani wa daigaku de keizaigaku o benkyou shite imasu.) - My older brother is studying economics at university." },
      { japanese: "びょういん", romaji: "byouin", english: "hospital", example: "病気になったので、病院へ行きました。(Byouki ni natta node, byouin e ikimashita.) - I got sick, so I went to the hospital." },
      { japanese: "ぎんこう", romaji: "ginkou", english: "bank", example: "銀行でお金をおろします。(Ginkou de okane o oroshimasu.) - I withdraw money at the bank." },
      { japanese: "ゆうびんきょく", romaji: "yuubinkyoku", english: "post office", example: "郵便局で手紙を出します。(Yuubinkyoku de tegami o dashimasu.) - I mail a letter at the post office." },
      { japanese: "としょかん", romaji: "toshokan", english: "library", example: "図書館で本を借ります。(Toshokan de hon o karimasu.) - I borrow books at the library." },
      { japanese: "びじゅつかん", romaji: "bijutsukan", english: "art museum", example: "週末に美術館へ行きました。(Shuumatsu ni bijutsukan e ikimashita.) - I went to the art museum on the weekend." },
      { japanese: "えき", romaji: "eki", english: "station (train, subway)", example: "毎朝、駅まで歩きます。(Maiasa, eki made arukimasu.) - I walk to the station every morning." },
      { japanese: "くうこう", romaji: "kuukou", english: "airport", example: "飛行機に乗るために空港へ行きます。(Hikouki ni noru tame ni kuukou e ikimasu.) - I go to the airport to board the plane." },
      { japanese: "ホテル", romaji: "hoteru", english: "hotel", example: "旅行でホテルに泊まります。(Ryokou de hoteru ni tomarimasu.) - I stay at a hotel when traveling." },
      { japanese: "みせ", romaji: "mise", english: "store, shop", example: "駅前に新しい店ができました。(Ekimae ni atarashii mise ga dekimashita.) - A new store opened in front of the station." },
      { japanese: "レストラン", romaji: "resutoran", english: "restaurant", example: "友達とレストランで食事しました。(Tomodachi to resutoran de shokuji shimashita.) - I had a meal with my friend at a restaurant." },
      { japanese: "きっさてん", romaji: "kissaten", english: "coffee shop, cafe", example: "喫茶店でコーヒーを飲みながら本を読みます。(Kissaten de koohii o nominagara hon o yomimasu.) - I read a book while drinking coffee at the coffee shop." },
      { japanese: "スーパー", romaji: "suupaa", english: "supermarket", example: "スーパーで買い物します。(Suupaa de kaimono shimasu.) - I shop at the supermarket." },
      { japanese: "デパート", romaji: "depaato", english: "department store", example: "デパートで服を買いました。(Depaato de fuku o kaimashita.) - I bought clothes at the department store." },
      { japanese: "コンビニ", romaji: "konbini", english: "convenience store", example: "コンビニでお弁当を買います。(Konbini de obentou o kaimasu.) - I buy a bento box at the convenience store." },
      { japanese: "えいがかん", romaji: "eigakan", english: "movie theater, cinema", example: "週末に映画館へ行きます。(Shuumatsu ni eigakan e ikimasu.) - I go to the movie theater on weekends." },
      { japanese: "こうえん", romaji: "kouen", english: "park", example: "公園を散歩します。(Kouen o sanpo shimasu.) - I take a walk in the park." },
      { japanese: "プール", romaji: "puuru", english: "swimming pool", example: "夏はプールで泳ぎます。(Natsu wa puuru de oyogimasu.) - I swim in the pool in the summer." },
      { japanese: "たいしかん", romaji: "taishikan", english: "embassy", example: "ビザの申請に大使館へ行きました。(Biza no shinsei ni taishikan e ikimashita.) - I went to the embassy to apply for a visa." },
      { japanese: "けいさつしょ / こうばん", romaji: "keisatsusho / kouban", english: "police station / police box", example: "道を尋ねるために交番へ行きました。(Michi o tazuneru tame ni kouban e ikimashita.) - I went to the police box to ask for directions." },
      { japanese: "たてもの", romaji: "tatemono", english: "building", example: "あの高い建物は何ですか？ (Ano takai tatemono wa nan desu ka?) - What is that tall building?" },
      { japanese: "みち", romaji: "michi", english: "road, street, way", example: "この道をまっすぐ行ってください。(Kono michi o massugu itte kudasai.) - Please go straight down this road." },
      { japanese: "はし", romaji: "hashi", english: "bridge", example: "川に橋がかかっています。(Kawa ni hashi ga kakatte imasu.) - There is a bridge over the river." }, // Also chopsticks
      { japanese: "いけ", romaji: "ike", english: "pond", example: "公園の池でボートに乗りました。(Kouen no ike de booto ni norimashita.) - I rode a boat on the pond in the park." }, // Nature, but also place
      { japanese: "エレベーター", romaji: "erebeetaa", english: "elevator, lift", example: "エレベーターで五階へ行きます。(Erebeetaa de gokai e ikimasu.) - I will go to the fifth floor by elevator." },
      { japanese: "エスカレーター", romaji: "esukareetaa", english: "escalator", example: "デパートでエスカレーターに乗りました。(Depaato de esukareetaa ni norimashita.) - I rode the escalator at the department store." },
    ]
  },
  {
    category: "13. Transportation",
    icon: "🚗",
    description: "Common words related to transportation, vehicles, and travel.",
    words: [
      { japanese: "くるま / じどうしゃ", romaji: "kuruma / jidousha", english: "car, automobile", example: "週末は車で出かけます。(Shuumatsu wa kuruma de dekakemasu.) - I go out by car on weekends. / 自動車の運転免許を持っています。(Jidousha no unten menkyo o motte imasu.) - I have a driver's license." },
      { japanese: "バス", romaji: "basu", english: "bus", example: "バスに乗って学校へ行きます。(Basu ni notte gakkou e ikimasu.) - I go to school by bus." },
      { japanese: "タクシー", romaji: "takushii", english: "taxi", example: "駅から家までタクシーに乗りました。(Eki kara ie made takushii ni norimashita.) - I took a taxi from the station to my house." },
      { japanese: "じてんしゃ", romaji: "jitensha", english: "bicycle", example: "自転車で買い物に行きます。(Jitensha de kaimono ni ikimasu.) - I go shopping by bicycle." },
      { japanese: "でんしゃ", romaji: "densha", english: "train (electric)", example: "毎朝、電車で会社へ行きます。(Maiasa, densha de kaisha e ikimasu.) - I go to the company by train every morning." },
      { japanese: "ちかてつ", romaji: "chikatetsu", english: "subway", example: "東京の地下鉄は便利です。(Toukyou no chikatetsu wa benri desu.) - The subway in Tokyo is convenient." },
      { japanese: "しんかんせん", romaji: "shinkansen", english: "bullet train", example: "新幹線で大阪へ行きました。(Shinkansen de Oosaka e ikimashita.) - I went to Osaka by Shinkansen." },
      { japanese: "ひこうき", romaji: "hikouki", english: "airplane", example: "飛行機でアメリカへ行きます。(Hikouki de Amerika e ikimasu.) - I will go to America by airplane." },
      { japanese: "ふね", romaji: "fune", english: "boat, ship", example: "島へ行くために船に乗りました。(Shima e iku tame ni fune ni norimashita.) - I took a boat to go to the island." },
      { japanese: "バイク", romaji: "baiku", english: "motorcycle", example: "彼はバイクに乗るのが好きです。(Kare wa baiku ni noru no ga suki desu.) - He likes riding motorcycles." },
      { japanese: "えき", romaji: "eki", english: "station", example: "駅で友達を待ちます。(Eki de tomodachi o machimasu.) - I will wait for my friend at the station." }, // Repeated for context
      { japanese: "くうこう", romaji: "kuukou", english: "airport", example: "三時に空港に着きました。(San-ji ni kuukou ni tsukimashita.) - I arrived at the airport at three o'clock." }, // Repeated for context
      { japanese: "バスてい", romaji: "basutei", english: "bus stop", example: "家の前のバス停でバスを待ちます。(Ie no mae no basutei de basu o machimasu.) - I wait for the bus at the bus stop in front of my house." },
      { japanese: "のりば", romaji: "noriba", english: "boarding place (bus, train platform)", example: "新幹線の乗り場はどこですか？ (Shinkansen no noriba wa doko desu ka?) - Where is the Shinkansen platform?" },
      { japanese: "きっぷ", romaji: "kippu", english: "ticket", example: "窓口で切符を買います。(Madoguchi de kippu o kaimasu.) - I buy a ticket at the ticket window." }, // Repeated for context
      // Verbs strongly related to transport
      { japanese: "のります", romaji: "norimasu", english: "ride, get on", example: "電車に乗ります。(Densha ni norimasu.) - I get on the train. / Base form: noru" },
      { japanese: "おります", romaji: "orimasu", english: "get off", example: "渋谷駅で降ります。(Shibuya-eki de orimasu.) - I get off at Shibuya station. / Base form: oriru" },
      { japanese: "のりかえます", romaji: "norikaemasu", english: "change (trains, buses)", example: "新宿駅で電車を乗り換えます。(Shinjuku-eki de densha o norikaemasu.) - I change trains at Shinjuku station. / Base form: norikaeru" },
      { japanese: "うんてんします", romaji: "untenshimasu", english: "drive", example: "父は毎日車を運転します。(Chichi wa mainichi kuruma o unten shimasu.) - My father drives a car every day. / Base form: unten suru" },
    ]
  },
  // --- More Specific Areas ---
  {
    category: "14. School & Study",
    icon: "🏫",
    description: "Common words related to school, education, and study.",
    words: [
      { japanese: "がっこう", romaji: "gakkou", english: "school", example: "私の学校は大きいです。(Watashi no gakkou wa ookii desu.) - My school is big." }, // Repeated
      { japanese: "だいがく", romaji: "daigaku", english: "university", example: "彼は東京大学の学生です。(Kare wa Toukyou Daigaku no gakusei desu.) - He is a student at the University of Tokyo." }, // Repeated
      { japanese: "がくせい", romaji: "gakusei", english: "student", example: "教室に学生がたくさんいます。(Kyoushitsu ni gakusei ga takusan imasu.) - There are many students in the classroom." }, // Repeated
      { japanese: "せんせい", romaji: "sensei", english: "teacher", example: "先生に質問があります。(Sensei ni shitsumon ga arimasu.) - I have a question for the teacher." }, // Repeated
      { japanese: "クラス", romaji: "kurasu", english: "class", example: "私のクラスは二十人です。(Watashi no kurasu wa ni-juu nin desu.) - My class has twenty people." },
      { japanese: "じゅぎょう", romaji: "jugyou", english: "class, lesson", example: "今日の授業は難しかったです。(Kyou no jugyou wa muzukashikatta desu.) - Today's lesson was difficult." },
      { japanese: "べんきょうします", romaji: "benkyoushimasu", english: "study", example: "家で日本語を勉強します。(Uchi de nihongo o benkyou shimasu.) - I study Japanese at home. / Base form: benkyou suru" }, // Repeated
      { japanese: "ならいます", romaji: "naraimasu", english: "learn (from someone)", example: "ピアノを習っています。(Piano o naratte imasu.) - I am learning the piano. / Base form: narau" }, // Repeated
      { japanese: "おしえます", romaji: "oshiemasu", english: "teach, inform", example: "子供たちに英語を教えています。(Kodomotachi ni eigo o oshiete imasu.) - I teach English to children. / Base form: oshieru" }, // Repeated
      { japanese: "おぼえます", romaji: "oboemasu", english: "memorize, learn, remember", example: "漢字を覚えるのは大変です。(Kanji o oboeru no wa taihen desu.) - Memorizing kanji is hard. / Base form: oboeru" }, // Repeated
      { japanese: "わかります", romaji: "wakarimasu", english: "understand", example: "先生の説明がよくわかりました。(Sensei no setsumei ga yoku wakarimashita.) - I understood the teacher's explanation well. / Base form: wakaru" }, // Repeated
      { japanese: "しつもん", romaji: "shitsumon", english: "question (noun)", example: "質問がある人は手を挙げてください。(Shitsumon ga aru hito wa te o agete kudasai.) - Please raise your hand if you have a question." },
      { japanese: "こたえ", romaji: "kotae", english: "answer (noun)", example: "この問題の答えがわかりません。(Kono mondai no kotae ga wakarimasen.) - I don't know the answer to this problem." },
      { japanese: "れい", romaji: "rei", english: "example", example: "例を見て、文を作ってください。(Rei o mite, bun o tsukutte kudasai.) - Look at the example and make a sentence." },
      { japanese: "きょうかしょ", romaji: "kyoukasho", english: "textbook", example: "日本語の教科書を使います。(Nihongo no kyoukasho o tsukaimasu.) - I use a Japanese textbook." },
      { japanese: "じしょ", romaji: "jisho", english: "dictionary", example: "電子辞書は便利です。(Denshi jisho wa benri desu.) - Electronic dictionaries are convenient." }, // Repeated
      { japanese: "ノート", romaji: "nooto", english: "notebook", example: "ノートに単語を書きます。(Nooto ni tango o kakimasu.) - I write vocabulary in my notebook." }, // Repeated
      { japanese: "えんぴつ", romaji: "enpitsu", english: "pencil", example: "テストは鉛筆で書いてください。(Tesuto wa enpitsu de kaite kudasai.) - Please write the test answers in pencil." }, // Repeated
      { japanese: "ペン", romaji: "pen", english: "pen", example: "ペンを貸してください。(Pen o kashite kudasai.) - Please lend me a pen." }, // Repeated
      { japanese: "けしゴム", romaji: "keshigomu", english: "eraser", example: "消しゴムを忘れました。(Keshigomu o wasuremashita.) - I forgot my eraser." }, // Repeated
      { japanese: "つくえ", romaji: "tsukue", english: "desk", example: "教室に机がたくさんあります。(Kyoushitsu ni tsukue ga takusan arimasu.) - There are many desks in the classroom." }, // Repeated
      { japanese: "いす", romaji: "isu", english: "chair", example: "この椅子は座りやすいです。(Kono isu wa suwariyasui desu.) - This chair is comfortable to sit in." }, // Repeated
      { japanese: "しゅくだい", romaji: "shukudai", english: "homework", example: "宿題がたくさんあって大変です。(Shukudai ga takusan atte taihen desu.) - It's tough because I have a lot of homework." },
      { japanese: "しけん", romaji: "shiken", english: "exam, test", example: "来週、日本語の試験があります。(Raishuu, nihongo no shiken ga arimasu.) - There is a Japanese exam next week." },
      { japanese: "れんしゅう", romaji: "renshuu", english: "practice (noun)", example: "漢字の練習をします。(Kanji no renshuu o shimasu.) - I do kanji practice." },
      { japanese: "れんしゅうします", romaji: "renshuushimasu", english: "practice (verb)", example: "毎日、会話を練習します。(Mainichi, kaiwa o renshuu shimasu.) - I practice conversation every day. / Base form: renshuu suru" }, // Repeated
      { japanese: "さくぶん", romaji: "sakubun", english: "composition, essay", example: "週末に作文を書きます。(Shuumatsu ni sakubun o kakimasu.) - I will write an essay on the weekend." },
      { japanese: "ページ", romaji: "peeji", english: "page", example: "教科書の十ページを開けてください。(Kyoukasho no juu peeji o akete kudasai.) - Please open page 10 of the textbook." },
    ]
  },
  {
    category: "15. Hobbies, Art & Media",
    icon: "🎨",
    description: "Common words related to hobbies, art, music, and media.",
    words: [
      // General
      { japanese: "しゅみ", romaji: "shumi", english: "hobby", example: "私の趣味は読書です。(Watashi no shumi wa dokusho desu.) - My hobby is reading." },
      // Art & Music
      { japanese: "え", romaji: "e", english: "drawing, picture, painting", example: "絵を描くのが好きです。(E o kaku no ga suki desu.) - I like drawing pictures." },
      { japanese: "おんがく", romaji: "ongaku", english: "music", example: "どんな音楽が好きですか？ (Donna ongaku ga suki desu ka?) - What kind of music do you like?" },
      { japanese: "うた", romaji: "uta", english: "song", example: "この歌を知っていますか？ (Kono uta o shitte imasu ka?) - Do you know this song?" },
      { japanese: "うたいます", romaji: "utaimasu", english: "sing", example: "みんなで歌を歌いましょう。(Minna de uta o utaimashou.) - Let's all sing a song together. / Base form: utau" }, // Repeated
      { japanese: "ギター", romaji: "gitaa", english: "guitar", example: "彼はギターを弾くのが上手です。(Kare wa gitaa o hiku no ga jouzu desu.) - He is good at playing the guitar." },
      { japanese: "ピアノ", romaji: "piano", english: "piano", example: "子供の時、ピアノを習っていました。(Kodomo no toki, piano o naratte imashita.) - I learned the piano when I was a child." },
      { japanese: "ひきます", romaji: "hikimasu", english: "play (string instrument, piano)", example: "姉はバイオリンを弾きます。(Ane wa baiorin o hikimasu.) - My older sister plays the violin. / Base form: hiku" }, // Repeated
      // Media
      { japanese: "えいが", romaji: "eiga", english: "movie, film", example: "昨日、面白い映画を見ました。(Kinou, omoshiroi eiga o mimashita.) - I watched an interesting movie yesterday." },
      { japanese: "テレビ", romaji: "terebi", english: "television, TV", example: "家でテレビをあまり見ません。(Uchi de terebi o amari mimasen.) - I don't watch TV much at home." }, // Repeated
      { japanese: "ラジオ", romaji: "rajio", english: "radio", example: "運転しながらラジオを聞きます。(Unten shinagara rajio o kikimasu.) - I listen to the radio while driving." }, // Repeated
      { japanese: "しんぶん", romaji: "shinbun", english: "newspaper", example: "父は毎朝新聞を読みます。(Chichi wa maiasa shinbun o yomimasu.) - My father reads the newspaper every morning." }, // Repeated
      { japanese: "ざっし", romaji: "zasshi", english: "magazine", example: "ファッション雑誌を買いました。(Fasshon zasshi o kaimashita.) - I bought a fashion magazine." }, // Repeated
      { japanese: "ほん", romaji: "hon", english: "book", example: "寝る前に本を読みます。(Neru mae ni hon o yomimasu.) - I read a book before sleeping." }, // Repeated
      { japanese: "ニュース", romaji: "nyuusu", english: "news", example: "毎晩、ニュースを見ます。(Maiban, nyuusu o mimasu.) - I watch the news every night." },
      { japanese: "カメラ", romaji: "kamera", english: "camera", example: "新しいカメラを買いたいです。(Atarashii kamera o kaitai desu.) - I want to buy a new camera." },
      { japanese: "しゃしん", romaji: "shashin", english: "photograph, picture", example: "家族の写真です。(Kazoku no shashin desu.) - This is a picture of my family." }, // Repeated
      { japanese: "とります", romaji: "torimasu", english: "take (a photo)", example: "ここで写真を撮ってもいいですか？ (Koko de shashin o totte mo ii desu ka?) - May I take a picture here? / Base form: toru" }, // Context for toru
      { japanese: "フィルム", romaji: "firumu", english: "film (camera)", example: "昔はフィルムカメラを使っていました。(Mukashi wa firumu kamera o tsukatte imashita.) - In the past, I used a film camera." },
      { japanese: "レコード", romaji: "rekoodo", english: "record (vinyl)", example: "古いレコードを集めています。(Furui rekoodo o atsumete imasu.) - I collect old records." },
      { japanese: "テープ", romaji: "teepu", english: "tape (cassette)", example: "昔の音楽をカセットテープで聞きました。(Mukashi no ongaku o kasetto teepu de kikimashita.) - I listened to old music on cassette tapes." }, // Also adhesive tape
      { japanese: "テープレコーダー", romaji: "teepurekooda", english: "tape recorder", example: "授業をテープレコーダーで録音しました。(Jugyou o teepurekoodaa de rokuon shimashita.) - I recorded the class with a tape recorder." },
      // Sports & Recreation
      { japanese: "スポーツ", romaji: "supootsu", english: "sports", example: "どんなスポーツが好きですか？ (Donna supootsu ga suki desu ka?) - What kind of sports do you like?" },
      { japanese: "します", romaji: "shimasu", english: "play (sports)", example: "週末はテニスをします。(Shuumatsu wa tenisu o shimasu.) - I play tennis on weekends. / Base form: suru" }, // Context for suru
      { japanese: "サッカー", romaji: "sakkaa", english: "soccer, football", example: "弟はサッカーの選手です。(Otouto wa sakkaa no senshu desu.) - My younger brother is a soccer player." },
      { japanese: "テニス", romaji: "tenisu", english: "tennis", example: "友達とテニスをします。(Tomodachi to tenisu o shimasu.) - I play tennis with my friend." },
      { japanese: "やきゅう", romaji: "yakyuu", english: "baseball", example: "子供の時、野球をしていました。(Kodomo no toki, yakyuu o shite imashita.) - I played baseball when I was a child." },
      { japanese: "およぎます", romaji: "oyogimasu", english: "swim", example: "夏は海で泳ぎたいです。(Natsu wa umi de oyogitai desu.) - I want to swim in the sea in the summer. / Base form: oyogu" }, // Repeated
      { japanese: "プール", romaji: "puuru", english: "swimming pool", example: "ホテルのプールは大きかったです。(Hoteru no puuru wa ookikatta desu.) - The hotel pool was big." }, // Repeated
      { japanese: "さんぽします", romaji: "sanposhimasu", english: "take a walk, stroll", example: "毎朝、公園を散歩します。(Maiasa, kouen o sanpo shimasu.) - I take a walk in the park every morning. / Base form: sanpo suru" }, // Repeated
      { japanese: "やまのぼり", romaji: "yamanobori", english: "mountain climbing", example: "趣味は山登りです。(Shumi wa yamanobori desu.) - My hobby is mountain climbing." },
      { japanese: "りょこう", romaji: "ryokou", english: "travel, trip (noun)", example: "来月、北海道へ旅行に行きます。(Raigetsu, Hokkaidou e ryokou ni ikimasu.) - I'm going on a trip to Hokkaido next month." },
      { japanese: "りょこうします", romaji: "ryokoushimasu", english: "travel (verb)", example: "去年、ヨーロッパを旅行しました。(Kyonen, Yooroppa o ryokou shimashita.) - I traveled around Europe last year. / Base form: ryokou suru" }, // Repeated
      { japanese: "あそびます", romaji: "asobimasu", english: "play, have fun, visit", example: "週末は友達と遊びます。(Shuumatsu wa tomodachi to asobimasu.) - I hang out with friends on the weekend. / Base form: asobu" }, // Repeated
      { japanese: "パーティー", romaji: "paatii", english: "party", example: "土曜日に誕生日パーティーを開きます。(Doyoubi ni tanjoubi paatii o hirakimasu.) - I will hold a birthday party on Saturday." },
    ]
  },
  {
    category: "16. Clothing & Accessories",
    icon: "👗",
    description: "Common words related to clothing, accessories, and personal items.",
    words: [
      { japanese: "ふく", romaji: "fuku", english: "clothes, clothing", example: "デパートで服を買いました。(Depaato de fuku o kaimashita.) - I bought clothes at the department store." },
      { japanese: "ようふく", romaji: "youfuku", english: "western clothes", example: "仕事の時は洋服を着ます。(Shigoto no toki wa youfuku o kimasu.) - I wear Western clothes when I work." },
      { japanese: "わふく / きもの", romaji: "wafuku / kimono", english: "Japanese clothes / kimono", example: "お正月に着物を着ました。(Oshougatsu ni kimono o kimashita.) - I wore a kimono on New Year's Day." },
      { japanese: "シャツ", romaji: "shatsu", english: "shirt", example: "青いシャツを着ています。(Aoi shatsu o kite imasu.) - I am wearing a blue shirt." },
      { japanese: "ワイシャツ", romaji: "waishatsu", english: "business shirt (white shirt)", example: "父は毎日ワイシャツを着て会社へ行きます。(Chichi wa mainichi waishatsu o kite kaisha e ikimasu.) - My father wears a business shirt to the office every day." },
      { japanese: "ブラウス", romaji: "burausu", english: "blouse", example: "彼女はきれいなブラウスを着ています。(Kanojo wa kirei na burausu o kite imasu.) - She is wearing a pretty blouse." },
      { japanese: "セーター", romaji: "seetaa", english: "sweater", example: "寒いので、セーターを着ます。(Samui node, seetaa o kimasu.) - It's cold, so I'll wear a sweater." },
      { japanese: "コート", romaji: "kooto", english: "coat", example: "冬はコートが必要です。(Fuyu wa kooto ga hitsuyou desu.) - A coat is necessary in winter." },
      { japanese: "うわぎ", romaji: "uwagi", english: "jacket, outerwear", example: "出かける前に上着を着ます。(Dekakeru mae ni uwagi o kimasu.) - I put on a jacket before going out." },
      { japanese: "したぎ", romaji: "shitagi", english: "underwear", example: "旅行のために下着を買いました。(Ryokou no tame ni shitagi o kaimashita.) - I bought underwear for the trip." },
      { japanese: "ズボン / パンツ", romaji: "zubon / pantsu", english: "pants, trousers", example: "彼は黒いズボンをはいています。(Kare wa kuroi zubon o haite imasu.) - He is wearing black pants." },
      { japanese: "スカート", romaji: "sukaato", english: "skirt", example: "姉は長いスカートが好きです。(Ane wa nagai sukaato ga suki desu.) - My older sister likes long skirts." },
      { japanese: "ドレス", romaji: "doresu", english: "dress", example: "結婚式でドレスを着ました。(Kekkonshiki de doresu o kimashita.) - I wore a dress at the wedding ceremony." },
      { japanese: "くつ", romaji: "kutsu", english: "shoes", example: "玄関で靴を脱ぎます。(Genkan de kutsu o nugimasu.) - I take off my shoes at the entrance." },
      { japanese: "くつした", romaji: "kutsushita", english: "socks", example: "毎日、新しい靴下をはきます。(Mainichi, atarashii kutsushita o hakimasu.) - I wear new socks every day." },
      { japanese: "ぼうし", romaji: "boushi", english: "hat, cap", example: "夏は帽子をかぶります。(Natsu wa boushi o kaburimasu.) - I wear a hat in the summer." },
      { japanese: "めがね", romaji: "megane", english: "glasses, spectacles", example: "目が悪いので、めがねをかけています。(Me ga warui node, megane o kakete imasu.) - My eyesight is bad, so I wear glasses." }, // Repeated
      { japanese: "ネクタイ", romaji: "nekutai", english: "necktie", example: "父は毎日ネクタイをします。(Chichi wa mainichi nekutai o shimasu.) - My father wears a necktie every day." },
      { japanese: "てぶくろ", romaji: "tebukuro", english: "gloves", example: "冬は手袋をします。(Fuyu wa tebukuro o shimasu.) - I wear gloves in the winter." },
      { japanese: "マフラー", romaji: "mafuraa", english: "scarf (winter)", example: "寒いのでマフラーを巻きます。(Samui node mafuraa o makimasu.) - It's cold, so I'll wrap a scarf around my neck." },
      { japanese: "ゆびわ", romaji: "yubiwa", english: "ring (finger)", example: "結婚指輪をしています。(Kekkon yubiwa o shite imasu.) - I am wearing a wedding ring." },
      { japanese: "とけい / うでどけい", romaji: "tokei / udedokei", english: "clock / wristwatch", example: "プレゼントに腕時計をもらいました。(Purezento ni udedokei o moraimashita.) - I received a wristwatch as a present." }, // Repeated/Specified
      { japanese: "ハンカチ", romaji: "hankachi", english: "handkerchief", example: "いつもハンカチを持っています。(Itsumo hankachi o motte imasu.) - I always carry a handkerchief." },
      { japanese: "かばん", romaji: "kaban", english: "bag, briefcase", example: "重いカバンを持っています。(Omoi kaban o motte imasu.) - I am carrying a heavy bag." }, // Repeated
      { japanese: "ポケット", romaji: "poketto", english: "pocket", example: "ズボンのポケットにハンカチを入れます。(Zubon no poketto ni hankachi o iremasu.) - I put a handkerchief in my pants pocket." }, // Repeated
      // Verbs strongly related to clothing
      { japanese: "きます", romaji: "kimasu", english: "wear (upper body)", example: "セーターを着ます。(Seetaa o kimasu.) - I wear a sweater. / Base form: kiru" }, // Repeated
      { japanese: "はきます", romaji: "hakimasu", english: "wear (lower body/feet)", example: "靴下をはきます。(Kutsushita o hakimasu.) - I wear socks. / Base form: haku" }, // Repeated
      { japanese: "かぶります", romaji: "kaburimasu", english: "wear (on head)", example: "帽子をかぶります。(Boushi o kaburimasu.) - I wear a hat. / Base form: kaburu" }, // Repeated
      { japanese: "かけます", romaji: "kakemasu", english: "wear (glasses)", example: "サングラスをかけます。(Sangurasu o kakemasu.) - I wear sunglasses. / Base form: kakeru" }, // Repeated
      { japanese: "します", romaji: "shimasu", english: "wear (accessories)", example: "イヤリングをします。(Iyaringu o shimasu.) - I wear earrings. / Base form: suru" }, // Repeated
      { japanese: "ぬぎます", romaji: "nugimasu", english: "take off (clothes, shoes)", example: "コートを脱ぎます。(Kooto o nugimasu.) - I take off my coat. / Base form: nugu" }, // Repeated
    ]
  },
  {
    category: "17. Body & Health",
    icon: "🩺",
    description: "Common words related to the body, health, and medical terms.",
    words: [
      // Body Parts
      { japanese: "からだ", romaji: "karada", english: "body", example: "体を動かすのが好きです。(Karada o ugokasu no ga suki desu.) - I like moving my body (exercising)." },
      { japanese: "あたま", romaji: "atama", english: "head", example: "頭が痛いです。(Atama ga itai desu.) - I have a headache." },
      { japanese: "かみ", romaji: "kami", english: "hair", example: "髪を切りました。(Kami o kirimashita.) - I cut my hair." }, // Also paper
      { japanese: "かお", romaji: "kao", english: "face", example: "毎朝、顔を洗います。(Maiasa, kao o araimasu.) - I wash my face every morning." },
      { japanese: "め", romaji: "me", english: "eye", example: "目が疲れました。(Me ga tsukaremashita.) - My eyes are tired." },
      { japanese: "みみ", romaji: "mimi", english: "ear", example: "耳がよく聞こえません。(Mimi ga yoku kikoemasen.) - I can't hear well." },
      { japanese: "はな", romaji: "hana", english: "nose", example: "花粉症で鼻がつまります。(Kafunshou de hana ga tsumarimasu.) - My nose is stuffy due to hay fever." }, // Also flower
      { japanese: "くち", romaji: "kuchi", english: "mouth", example: "口を開けてください。(Kuchi o akete kudasai.) - Please open your mouth." },
      { japanese: "は", romaji: "ha", english: "tooth", example: "歯が痛いので、歯医者に行きます。(Ha ga itai node, haisha ni ikimasu.) - My tooth hurts, so I'll go to the dentist." },
      { japanese: "くび", romaji: "kubi", english: "neck", example: "寝違えて首が痛いです。(Nechigaete kubi ga itai desu.) - I slept wrong and my neck hurts." },
      { japanese: "かた", romaji: "kata", english: "shoulder", example: "肩がこりました。(Kata ga korimashita.) - My shoulders are stiff." },
      { japanese: "うで", romaji: "ude", english: "arm", example: "重い物を持って腕が疲れました。(Omoi mono o motte ude ga tsukaremashita.) - My arms are tired from carrying heavy things." },
      { japanese: "て", romaji: "te", english: "hand, arm", example: "食事の前に手を洗います。(Shokuji no mae ni te o araimasu.) - I wash my hands before meals." },
      { japanese: "ゆび", romaji: "yubi", english: "finger, toe", example: "紙で指を切りました。(Kami de yubi o kirimashita.) - I cut my finger on the paper." },
      { japanese: "むね", romaji: "mune", english: "chest", example: "深呼吸をすると胸が痛いです。(Shinkokyuu o suru to mune ga itai desu.) - My chest hurts when I take a deep breath." },
      { japanese: "おなか", romaji: "onaka", english: "stomach, abdomen", example: "お腹がすきました。(Onaka ga sukimashita.) - I'm hungry." },
      { japanese: "せなか", romaji: "senaka", english: "back (body)", example: "背中がかゆいです。(Senaka ga kayui desu.) - My back itches." },
      { japanese: "こし", romaji: "koshi", english: "lower back, waist, hips", example: "重い物を持ったら腰が痛くなりました。(Omoi mono o mottara koshi ga itaku narimashita.) - My lower back started hurting after lifting something heavy." },
      { japanese: "あし", romaji: "ashi", english: "foot, leg", example: "たくさん歩いたので、足が疲れました。(Takusan aruita node, ashi ga tsukaremashita.) - My legs/feet are tired because I walked a lot." },
      // Health & Condition
      { japanese: "げんき", romaji: "genki (na)", english: "healthy, fine, energetic", example: "おかげさまで元気です。(Okagesama de genki desu.) - Thanks to you, I'm fine. / Na-adjective" }, // Repeated
      { japanese: "びょうき", romaji: "byouki", english: "illness, sickness", example: "病気で学校を休みました。(Byouki de gakkou o yasumimashita.) - I was absent from school due to illness." },
      { japanese: "いたい", romaji: "itai", english: "painful, sore (adjective)", example: "転んで膝が痛いです。(Koronde hiza ga itai desu.) - I fell and my knee hurts." },
      { japanese: "いたみ", romaji: "itami", english: "pain (noun)", example: "痛み止めの薬を飲みました。(Itamidome no kusuri o nomimashita.) - I took pain relief medicine." },
      { japanese: "かぜ", romaji: "kaze", english: "a cold (illness)", example: "風邪をひいて、熱があります。(Kaze o hiite, netsu ga arimasu.) - I caught a cold and have a fever." }, // Also wind
      { japanese: "ねつ", romaji: "netsu", english: "fever", example: "熱があるので、今日は休みます。(Netsu ga aru node, kyou wa yasumimasu.) - I have a fever, so I will rest today." },
      { japanese: "けが", romaji: "kega", english: "injury", example: "スポーツで怪我をしました。(Supootsu de kega o shimashita.) - I got injured playing sports." },
      { japanese: "くすり", romaji: "kusuri", english: "medicine", example: "医者に薬をもらいました。(Isha ni kusuri o moraimashita.) - I received medicine from the doctor." }, // Repeated
      { japanese: "びょういん", romaji: "byouin", english: "hospital", example: "怪我をしたので、病院へ行きます。(Kega o shita node, byouin e ikimasu.) - I got injured, so I'm going to the hospital." }, // Repeated
      { japanese: "いしゃ", romaji: "isha", english: "doctor (medical)", example: "お医者さんに診てもらいました。(Oishasan ni mite moraimashita.) - I was examined by the doctor." }, // Repeated
      { japanese: "かんごし", romaji: "kangoshi", english: "nurse", example: "看護師さんが注射をしてくれました。(Kangoshi-san ga chuusha o shite kuremashita.) - The nurse gave me an injection." }, // Repeated
      { japanese: "しにます", romaji: "shinimasu", english: "die", example: "病気で犬が死んでしまいました。(Byouki de inu ga shinde shimaimashita.) - My dog died from an illness. / Base form: shinu" }, // Repeated
      { japanese: "つかれます", romaji: "tsukaremasu", english: "get tired", example: "一日中働いて疲れました。(Ichinichijuu hataraite tsukaremashita.) - I worked all day and got tired. / Base form: tsukareru" }, // Repeated
      { japanese: "シャワー", romaji: "shawā", english: "shower", example: "毎朝シャワーを浴びます。(Maiasa shawaa o abimasu.) - I take a shower every morning." },
      { japanese: "あびます", romaji: "abimasu", english: "take (a shower), bathe", example: "シャワーを浴びてさっぱりしました。(Shawaa o abite sappari shimashita.) - I felt refreshed after taking a shower. / Base form: abiru" },
      { japanese: "はいります", romaji: "hairimasu", english: "take (a bath)", example: "毎晩お風呂に入ります。(Maiban ofuro ni hairimasu.) - I take a bath every night. / Base form: hairu" }, // Context for hairu (おふろに はいる)
      // Characteristics related to body
      { japanese: "せい", romaji: "sei", english: "height, stature (noun)", example: "彼は背が高いです。(Kare wa se ga takai desu.) - He is tall." },
      { japanese: "こえ", romaji: "koe", english: "voice", example: "彼女は声がきれいです。(Kanojo wa koe ga kirei desu.) - She has a beautiful voice." },
    ]
  },
  {
    category: "18. Nature & Weather",
    icon: "🌳",
    description: "Common words related to nature, weather, and seasons.",
    words: [
      // Nature Elements
      { japanese: "やま", romaji: "yama", english: "mountain", example: "富士山は日本で一番高い山です。(Fuji-san wa Nihon de ichiban takai yama desu.) - Mt. Fuji is the highest mountain in Japan." },
      { japanese: "かわ", romaji: "kawa", english: "river", example: "家の近くに川が流れています。(Ie no chikaku ni kawa ga nagarete imasu.) - A river flows near my house." },
      { japanese: "うみ", romaji: "umi", english: "sea, ocean", example: "夏は海へ泳ぎに行きます。(Natsu wa umi e oyogi ni ikimasu.) - I go swimming in the sea in the summer." },
      { japanese: "そら", romaji: "sora", english: "sky", example: "今日の空は青くてきれいです。(Kyou no sora wa aokute kirei desu.) - Today's sky is blue and beautiful." },
      { japanese: "たいよう / ひ", romaji: "taiyou / hi", english: "sun", example: "太陽が昇ると暖かくなります。(Taiyou ga noboru to atatakaku narimasu.) - It gets warm when the sun rises. / 日が沈むのが早くなりました。(Hi ga shizumu no ga hayaku narimashita.) - The sun started setting earlier." }, // Repeated
      { japanese: "つき", romaji: "tsuki", english: "moon", example: "今夜は月がきれいです。(Kon'ya wa tsuki ga kirei desu.) - The moon is beautiful tonight." }, // Also month
      { japanese: "ほし", romaji: "hoshi", english: "star", example: "夜空に星がたくさん見えます。(Yozora ni hoshi ga takusan miemasu.) - Many stars are visible in the night sky." },
      { japanese: "き", romaji: "ki", english: "tree, wood", example: "庭に大きな木があります。(Niwa ni ookina ki ga arimasu.) - There is a big tree in the garden." },
      { japanese: "はな", romaji: "hana", english: "flower", example: "春にはきれいな花が咲きます。(Haru ni wa kirei na hana ga sakimasu.) - Beautiful flowers bloom in spring." }, // Also nose
      { japanese: "いけ", romaji: "ike", english: "pond", example: "池には魚がいます。(Ike ni wa sakana ga imasu.) - There are fish in the pond." }, // Repeated
      { japanese: "いし", romaji: "ishi", english: "stone, rock", example: "庭に石を置きました。(Niwa ni ishi o okimashita.) - I placed stones in the garden." },
      // Animals
      { japanese: "どうぶつ", romaji: "doubutsu", english: "animal", example: "動物園で色々な動物を見ました。(Doubutsuen de iroiro na doubutsu o mimashita.) - I saw various animals at the zoo." },
      { japanese: "いぬ", romaji: "inu", english: "dog", example: "公園で犬を散歩させます。(Kouen de inu o sanpo sasemasu.) - I walk my dog in the park." },
      { japanese: "ねこ", romaji: "neko", english: "cat", example: "隣の家は猫を飼っています。(Tonari no ie wa neko o katte imasu.) - The house next door has a cat." },
      { japanese: "とり", romaji: "tori", english: "bird", example: "窓の外で鳥が鳴いています。(Mado no soto de tori ga naite imasu.) - A bird is singing outside the window." },
      { japanese: "さかな", romaji: "sakana", english: "fish", example: "川で魚を釣りました。(Kawa de sakana o tsurimashita.) - I caught fish in the river." }, // Repeated
      { japanese: "むし", romaji: "mushi", english: "insect", example: "夏は虫が多いです。(Natsu wa mushi ga ooi desu.) - There are many insects in summer." },
      // Weather
      { japanese: "てんき", romaji: "tenki", english: "weather", example: "明日の天気はどうですか？ (Ashita no tenki wa dou desu ka?) - How is the weather tomorrow?" },
      { japanese: "はれ", romaji: "hare", english: "clear weather, sunny", example: "今日は晴れです。(Kyou wa hare desu.) - It is sunny today." },
      { japanese: "くもり", romaji: "kumori", english: "cloudy weather", example: "明日は曇りでしょう。(Ashita wa kumori deshou.) - It will probably be cloudy tomorrow." },
      { japanese: "あめ", romaji: "ame", english: "rain", example: "雨が降っていますから、傘を持っていきましょう。(Ame ga futte imasu kara, kasa o motte ikimashou.) - It's raining, so let's take an umbrella." },
      { japanese: "ゆき", romaji: "yuki", english: "snow", example: "冬には雪がたくさん降ります。(Fuyu ni wa yuki ga takusan furimasu.) - It snows a lot in winter." },
      { japanese: "かぜ", romaji: "kaze", english: "wind", example: "今日は風が強いです。(Kyou wa kaze ga tsuyoi desu.) - The wind is strong today." }, // Also a cold
      { japanese: "くも", romaji: "kumo", english: "cloud", example: "空に白い雲が浮かんでいます。(Sora ni shiroi kumo ga ukande imasu.) - White clouds are floating in the sky." },
      { japanese: "たいふう", romaji: "taifuu", english: "typhoon", example: "台風が近づいています。(Taifuu ga chikazuite imasu.) - A typhoon is approaching." },
      { japanese: "ふります", romaji: "furimasu", english: "fall (rain, snow)", example: "雪が降ってきました。(Yuki ga futte kimashita.) - It has started to snow. / Base form: furu" }, // Repeated
      // Weather Adjectives
      { japanese: "あたたかい", romaji: "atatakai", english: "warm (weather)", example: "春は暖かい日が多いです。(Haru wa atatakai hi ga ooi desu.) - There are many warm days in spring." }, // Repeated
      { japanese: "すずしい", romaji: "suzushii", english: "cool (weather)", example: "今朝は涼しいです。(Kesa wa suzushii desu.) - It's cool this morning." }, // Repeated
      { japanese: "あつい", romaji: "atsui", english: "hot (weather)", example: "日本の夏は暑いです。(Nihon no natsu wa atsui desu.) - Japanese summers are hot." }, // Repeated
      { japanese: "さむい", romaji: "samui", english: "cold (weather)", example: "冬の朝は寒いです。(Fuyu no asa wa samui desu.) - Winter mornings are cold." }, // Repeated
      // Seasons
      { japanese: "きせつ", romaji: "kisetsu", english: "season", example: "日本には四季があります。(Nihon ni wa shiki (kisetsu) ga arimasu.) - Japan has four seasons." },
      { japanese: "はる", romaji: "haru", english: "spring", example: "春は桜がきれいです。(Haru wa sakura ga kirei desu.) - Cherry blossoms are beautiful in spring." },
      { japanese: "なつ", romaji: "natsu", english: "summer", example: "夏休みには海へ行きます。(Natsuyasumi ni wa umi e ikimasu.) - I go to the sea during summer vacation." },
      { japanese: "あき", romaji: "aki", english: "autumn, fall", example: "秋は紅葉が美しいです。(Aki wa kouyou ga utsukushii desu.) - The autumn leaves are beautiful in fall." },
      { japanese: "ふゆ", romaji: "fuyu", english: "winter", example: "冬はスキーをします。(Fuyu wa sukii o shimasu.) - I ski in the winter." },
    ]
  },
  {
    category: "19. Language & Communication",
    icon: "🗣️",
    description: "Common words related to language, communication, and media.",
    words: [
      // Language Itself
      { japanese: "ことば", romaji: "kotoba", english: "word, language", example: "新しい言葉をたくさん覚えました。(Atarashii kotoba o takusan oboemashita.) - I learned many new words." },
      { japanese: "ご", romaji: "go", english: "language suffix (e.g., にほんご)", example: "何語を話しますか？ (Nani-go o hanashimasu ka?) - What languages do you speak?" },
      { japanese: "にほんご", romaji: "nihongo", english: "Japanese language", example: "毎日、日本語を勉強しています。(Mainichi, nihongo o benkyou shite imasu.) - I study Japanese every day." },
      { japanese: "えいご", romaji: "eigo", english: "English language", example: "仕事で英語を使います。(Shigoto de eigo o tsukaimasu.) - I use English at work." },
      { japanese: "かんじ", romaji: "kanji", english: "kanji", example: "漢字を読むのは難しいです。(Kanji o yomu no wa muzukashii desu.) - Reading kanji is difficult." },
      { japanese: "ひらがな", romaji: "hiragana", english: "hiragana", example: "子供はひらがなを習います。(Kodomo wa hiragana o naraimasu.) - Children learn hiragana." },
      { japanese: "カタカナ", romaji: "katakana", english: "katakana", example: "外国の言葉はカタカナで書くことが多いです。(Gaikoku no kotoba wa katakana de kaku koto ga ooi desu.) - Foreign words are often written in katakana." },
      { japanese: "ローマじ", romaji: "roomaji", english: "romaji, Roman letters", example: "キーボードでローマ字を入力します。(Kiiboodo de roomaji o nyuuryoku shimasu.) - I input Roman letters using the keyboard." },
      { japanese: "ほんやく", romaji: "honyaku", english: "translation", example: "この文の翻訳をお願いします。(Kono bun no honyaku o onegaishimasu.) - Please translate this sentence." },
      { japanese: "いみ", romaji: "imi", english: "meaning", example: "この言葉の意味がわかりません。(Kono kotoba no imi ga wakarimasen.) - I don't understand the meaning of this word." },
      // Communication Tools & Actions
      { japanese: "でんわ", romaji: "denwa", english: "telephone, phone call", example: "後で電話をかけます。(Atode denwa o kakemasu.) - I will make a phone call later." }, // Repeated
      { japanese: "でんわばんごう", romaji: "denwabangou", english: "telephone number", example: "すみません、電話番号を教えてください。(Sumimasen, denwa bangou o oshiete kudasai.) - Excuse me, please tell me your phone number." }, // Repeated
      { japanese: "でんわします", romaji: "denwa shimasu", english: "make a phone call", example: "ホテルに電話して予約します。(Hoteru ni denwa shite yoyaku shimasu.) - I will call the hotel and make a reservation. / Base form: denwa suru" }, // Repeated
      { japanese: "てがみ", romaji: "tegami", english: "letter", example: "祖母に手紙を送りました。(Sobo ni tegami o okurimashita.) - I sent a letter to my grandmother." }, // Repeated
      { japanese: "はがき", romaji: "hagaki", english: "postcard", example: "年賀状は葉書で送ります。(Nengajou wa hagaki de okurimasu.) - I send New Year's cards by postcard." }, // Repeated
      { japanese: "ふうとう", romaji: "fuutou", english: "envelope", example: "切手を貼った封筒をポストに入れます。(Kitte o hatta fuutou o posuto ni iremasu.) - I put the stamped envelope in the mailbox." }, // Repeated
      { japanese: "きって", romaji: "kitte", english: "postage stamp", example: "この手紙には８４円切手が必要です。(Kono tegami ni wa hachijuu-yo en kitte ga hitsuyou desu.) - This letter requires an 84 yen stamp." }, // Repeated
      { japanese: "だします", romaji: "dashimasu", english: "send (a letter)", example: "郵便局で手紙を出します。(Yuubinkyoku de tegami o dashimasu.) - I send the letter at the post office. / Base form: dasu" }, // Context for dasu
      { japanese: "メール", romaji: "meeru", english: "email", example: "仕事のメールをチェックします。(Shigoto no meeru o chekku shimasu.) - I check my work email." },
      { japanese: "パソコン", romaji: "pasokon", english: "personal computer, PC", example: "パソコンでレポートを書きます。(Pasokon de repooto o kakimasu.) - I write reports on my personal computer." }, // Repeated
      { japanese: "スマホ", romaji: "sumaho", english: "smartphone", example: "スマホで地図を見ます。(Sumaho de chizu o mimasu.) - I look at maps on my smartphone." },
      { japanese: "インターネット", romaji: "intaanetto", english: "internet", example: "インターネットで情報を探します。(Intaanetto de jouhou o sagashimasu.) - I search for information on the internet." },
      { japanese: "コピー", romaji: "kopii", english: "copy, photocopy", example: "会議の資料のコピーをお願いします。(Kaigi no shiryou no kopii o onegaishimasu.) - Please make a copy of the meeting materials." },
      { japanese: "コピーします", romaji: "kopiishimasu", english: "make a copy", example: "パスポートをコピーしてください。(Pasupooto o kopii shite kudasai.) - Please make a copy of your passport. / Base form: kopii suru" }, // Repeated
      { japanese: "ファックス", romaji: "fakkusu", english: "fax", example: "書類をファックスで送ります。(Shorui o fakkusu de okurimasu.) - I will send the documents by fax." },
      { japanese: "はなします", romaji: "hanashimasu", english: "speak, talk", example: "もっと日本語で話したいです。(Motto nihongo de hanashitai desu.) - I want to speak more in Japanese. / Base form: hanasu" }, // Repeated
      { japanese: "ききます", romaji: "kikimasu", english: "listen, hear, ask", example: "分からないことは先生に聞きます。(Wakaranai koto wa sensei ni kikimasu.) - I ask the teacher things I don't understand. / Base form: kiku" }, // Repeated
      { japanese: "いいます", romaji: "iimasu", english: "say, tell", example: "自分の意見をはっきり言います。(Jibun no iken o hakkiri iimasu.) - I clearly state my opinion. / Base form: iu" }, // Repeated
      { japanese: "はなし", romaji: "hanashi", english: "story, talk, conversation", example: "友達との話は楽しいです。(Tomodachi to no hanashi wa tanoshii desu.) - Conversations with friends are fun." }, // Repeated
      { japanese: "しつもん", romaji: "shitsumon", english: "question (noun)", example: "授業の最後に質問の時間があります。(Jugyou no saigo ni shitsumon no jikan ga arimasu.) - There is time for questions at the end of the class." }, // Repeated
      { japanese: "こたえ", romaji: "kotae", english: "answer (noun)", example: "あなたの答えは正しいです。(Anata no kotae wa tadashii desu.) - Your answer is correct." }, // Repeated
    ]
  },
  // ... (Previous categories omitted for brevity) ...
  {
    category: "20. Other Useful Words (Adverbs, Conjunctions etc.)",
    icon: "🔤",
    description: "Common adverbs, conjunctions, and other useful words.",
      words: [
        // Adverbs (Manner, Degree) - Many frequency adverbs are in Time category
        { japanese: "いっしょに", romaji: "isshoni", english: "together", example: "一緒に映画を見に行きませんか？ (Isshoni eiga o mi ni ikimasen ka?) - Won't you go see a movie together with me?" },
        { japanese: "ゆっくり", romaji: "yukkuri", english: "slowly, leisurely", example: "休みの日は家でゆっくりします。(Yasumi no hi wa ie de yukkuri shimasu.) - I relax leisurely at home on my days off." },
        { japanese: "まっすぐ", romaji: "massugu", english: "straight ahead", example: "この道をまっすぐ行くと、駅があります。(Kono michi o massugu iku to, eki ga arimasu.) - If you go straight down this road, there is a station." }, // Also Direction
        { japanese: "たいへん", romaji: "taihen", english: "very / terrible, hard, difficult", example: "今日は大変暑いです。(Kyou wa taihen atsui desu.) - It is very hot today. / 試験の勉強は大変です。(Shiken no benkyou wa taihen desu.) - Studying for exams is hard." }, // Can be adverb or na-adjective
        { japanese: "すこし", romaji: "sukoshi", english: "a little, a few", example: "日本語が少しわかります。(Nihongo ga sukoshi wakarimasu.) - I understand a little Japanese." }, // Also Quantity
        { japanese: "ちょっと", romaji: "chotto", english: "a little (colloquial)", example: "ちょっと待ってください。(Chotto matte kudasai.) - Please wait a moment." }, // Also Quantity/Excuse me
        { japanese: "もっと", romaji: "motto", english: "more", example: "もっとゆっくり話してください。(Motto yukkuri hanashite kudasai.) - Please speak more slowly." },
        { japanese: "いちばん", romaji: "ichiban", english: "the most, number one", example: "日本で一番好きな食べ物は何ですか？ (Nihon de ichiban suki na tabemono wa nan desu ka?) - What is your most favorite food in Japan?" },
        { japanese: "よく", romaji: "yoku", english: "well", example: "昨日はよく寝ました。(Kinou wa yoku nemashita.) - I slept well yesterday." }, // Also means "often"
        { japanese: "たぶん", romaji: "tabun", english: "probably, perhaps", example: "明日はたぶん雨でしょう。(Ashita wa tabun ame deshou.) - It will probably rain tomorrow." },
        { japanese: "ほんとうに", romaji: "hontou ni", english: "really, truly", example: "本当にありがとうございました。(Hontou ni arigatou gozaimashita.) - Thank you very much indeed." },
        { japanese: "だんだん", romaji: "dandan", english: "gradually, step by step", example: "だんだん日本語が上手になってきました。(Dandan nihongo ga jouzu ni natte kimashita.) - My Japanese is gradually getting better." },
        // Conjunctions & Particles (Basic) - Note: Particles are complex, these are just common conjunction-like words
        { japanese: "そして", romaji: "soshite", english: "and (connects sentences)", example: "朝ごはんを食べました。そして、学校へ行きました。(Asagohan o tabemashita. Soshite, gakkou e ikimashita.) - I ate breakfast. And then, I went to school." },
        { japanese: "それから", romaji: "sorekara", english: "and then, after that", example: "シャワーを浴びます。それから、寝ます。(Shawaa o abimasu. Sorekara, nemasu.) - I take a shower. After that, I go to sleep." },
        { japanese: "でも", romaji: "demo", english: "but, however", example: "勉強しました。でも、試験は難しかったです。(Benkyou shimashita. Demo, shiken wa muzukashikatta desu.) - I studied. But, the exam was difficult." },
        { japanese: "ですから / だから", romaji: "desukara / dakara", english: "therefore, so", example: "雨が降っています。ですから、傘を持っていきます。(Ame ga futte imasu. Desukara, kasa o motte ikimasu.) - It's raining. Therefore, I will take an umbrella. / 疲れました。だから、早く寝ます。(Tsukaremashita. Dakara, hayaku nemasu.) - I'm tired. So, I'll go to bed early." },
        { japanese: "じゃあ / それでは", romaji: "jaa / sore dewa", english: "well then, in that case", example: "A: もう時間です。(Mou jikan desu.) B: じゃあ、帰りましょう。(Jaa, kaerimashou.) - A: It's already time. B: Well then, let's go home. / それでは、始めましょう。(Sore dewa, hajimemashou.) - Well then, let's begin (more formal)." },
        // Other
        { japanese: "ほか", romaji: "hoka (no)", english: "other, besides", example: "何か他の質問はありますか？ (Nani ka hoka no shitsumon wa arimasu ka?) - Do you have any other questions? / これの他に、何かいりますか？(Kore no hoka ni, nani ka irimasu ka?) - Besides this, do you need anything else?" },
        { japanese: "つぎ", romaji: "tsugi (no)", english: "next", example: "次の角を曲がってください。(Tsugi no kado o magatte kudasai.) - Please turn at the next corner. / 次のバスはいつ来ますか？(Tsugi no basu wa itsu kimasu ka?) - When does the next bus come?" },
        { japanese: "はじめ", romaji: "hajime (ni)", english: "beginning / at the beginning", example: "初めに自己紹介をします。(Hajime ni jiko shoukai o shimasu.) - At the beginning, I will introduce myself. / 日本に来た初めは大変でした。(Nihon ni kita hajime wa taihen deshita.) - The beginning of my time in Japan was difficult." },
        { japanese: "おわり", romaji: "owari", english: "the end", example: "映画の終わりは感動的でした。(Eiga no owari wa kandouteki deshita.) - The end of the movie was moving." },
        { japanese: "くみ", romaji: "kumi", english: "group, team, set, class (grade)", example: "私たちは同じ組です。(Watashitachi wa onaji kumi desu.) - We are in the same group/class. / このカップは三つで一組です。(Kono kappu wa mittsu de hito-kumi desu.) - These cups come as a set of three." },
        { japanese: "どうして", romaji: "doushite", english: "why? / for what reason?", example: "どうして日本へ来たのですか？ (Doushite Nihon e kita no desu ka?) - Why did you come to Japan?" }, // Also Question word
        { japanese: "なぜ", romaji: "naze", english: "why? (more formal)", example: "なぜそれが正しいと思いますか？ (Naze sore ga tadashii to omoimasu ka?) - Why do you think that is correct?" }, // Also Question word
        { japanese: "どうやって", romaji: "douyatte", english: "how? / by what means?", example: "どうやって駅へ行けばいいですか？ (Douyatte eki e ikeba ii desu ka?) - How should I go to the station?" }, // Also Question word
        { japanese: "ほんとう", romaji: "hontou", english: "truth, reality (noun)", example: "それは本当ですか？ (Sore wa hontou desu ka?) - Is that true?" },
        { japanese: "なんか", romaji: "nanka", english: "something like..., things like... (colloquial filler)", example: "なんか、おもしろいことないかな？(Nanka, omoshiroi koto nai kana?) - Like, isn't there something interesting going on?" },
    ]
  }
// ... (Closing bracket for the entire export const vocabCategories array would be here) ...
] // Make sure this closes the main array if it's the last category
