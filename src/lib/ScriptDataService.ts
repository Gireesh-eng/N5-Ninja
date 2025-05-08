import Papa from 'papaparse';

// Define interfaces for type safety
export interface KanaChar {
  char: string;
  romaji: string;
  strokeOrder: string;
  audio: string;
  category?: string; // Add category field
}

export interface KanjiChar {
  char: string;
  meaning: string;
  onyomi: string;
  kunyomi: string;
  example: string;
  strokeOrder: string;
  audio: string;
  category?: string; // Add category field
  jlpt?: string;     // Add JLPT level
}

export interface QuizQuestion {
  character: string;
  options: string[];
  correctAnswer: string;
  audioPath: string;
}

export type CharacterCategory = 'main' | 'dakuten' | 'combination' | 'all' | string;

// Define a type for the service instance if needed, though using the class directly is often fine
export type IScriptDataService = InstanceType<typeof ScriptDataService>;

// Singleton class for fetching and caching Japanese script data
class ScriptDataService {
  private hiraganaCache: KanaChar[] | null = null;
  private katakanaCache: KanaChar[] | null = null;
  private kanjiCache: KanjiChar[] | null = null;
  private loading = false;
  private loadPromise: Promise<void> | null = null;

  // Load all script data at once
  async loadAllData(): Promise<void> {
    if (this.loading && this.loadPromise) {
      return this.loadPromise;
    }

    this.loading = true;
    this.loadPromise = this.fetchAndParseAllData();
    return this.loadPromise;
  }

  private async fetchAndParseAllData(): Promise<void> {
    try {
      // Fetch all CSV files in parallel
      const [hiraganaCsv, katakanaCsv, kanjiCsv] = await Promise.all([
        fetch('./data/hiragana.csv').then(response => {
          if (!response.ok) {
            throw new Error(`Failed to fetch hiragana data: ${response.status}`);
          }
          return response.text();
        }),
        fetch('./data/katakana.csv').then(response => {
          if (!response.ok) {
            throw new Error(`Failed to fetch katakana data: ${response.status}`);
          }
          return response.text();
        }),
        fetch('./data/kanji.csv').then(response => {
          if (!response.ok) {
            throw new Error(`Failed to fetch kanji data: ${response.status}`);
          }
          return response.text();
        })
      ]);

      // Parse CSV data
      const parseOptions = { header: true, skipEmptyLines: true };
      const hiraganaResult = Papa.parse<KanaChar>(hiraganaCsv, parseOptions);
      const katakanaResult = Papa.parse<KanaChar>(katakanaCsv, parseOptions);
      const kanjiResult = Papa.parse<KanjiChar>(kanjiCsv, parseOptions);

      // Check for errors
      if (hiraganaResult.errors.length) {
        console.error("Hiragana Parsing Errors:", hiraganaResult.errors);
        throw new Error(`Error parsing hiragana data: ${hiraganaResult.errors[0].message}`);
      }
      if (katakanaResult.errors.length) {
        console.error("Katakana Parsing Errors:", katakanaResult.errors);
        throw new Error(`Error parsing katakana data: ${katakanaResult.errors[0].message}`);
      }
      if (kanjiResult.errors.length) {
        console.error("Kanji Parsing Errors:", kanjiResult.errors);
        throw new Error(`Error parsing kanji data: ${kanjiResult.errors[0].message}`);
      }

      // Store parsed data in cache and categorize if category info is missing
      const processedHiragana = hiraganaResult.data.filter(d => d.char).map(char => {
        if (!char.category) {
          // Default categorization for hiragana based on character properties
          if (char.romaji && char.romaji.length > 1 && char.romaji.includes('y')) {
            char.category = 'combination';
          } else if (char.romaji && ['g', 'z', 'd', 'b', 'p'].some(sound => char.romaji.startsWith(sound))) {
            char.category = 'dakuten';
          } else {
            char.category = 'main';
          }
        }
        return char;
      });

      const processedKatakana = katakanaResult.data.filter(d => d.char).map(char => {
        if (!char.category) {
          // Default categorization for katakana based on character properties
          if (char.romaji && char.romaji.length > 1 && char.romaji.includes('y')) {
            char.category = 'combination';
          } else if (char.romaji && ['g', 'z', 'd', 'b', 'p'].some(sound => char.romaji.startsWith(sound))) {
            char.category = 'dakuten';
          } else {
            char.category = 'main';
          }
        }
        return char;
      });

      this.hiraganaCache = processedHiragana;
      this.katakanaCache = processedKatakana;
      this.kanjiCache = kanjiResult.data.filter(d => d.char);

      console.log(`Successfully loaded: ${this.hiraganaCache.length} hiragana, ${this.katakanaCache.length} katakana, and ${this.kanjiCache.length} kanji characters`);
    } catch (error) {
      console.error("Failed to fetch or parse script data:", error);
      throw error;
    } finally {
      this.loading = false;
    }
  }

  // Helper to get the row identifier (e.g., 'k' from 'ka', 'g' from 'ga')
  private getKanaRow(romaji: string): string {
    if (!romaji) return '';
    // Vowel row: a, i, u, e, o
    if (["a","i","u","e","o"].includes(romaji)) return 'a';
    // K-row: ka, ki, ku, ke, ko
    if (["ka","ki","ku","ke","ko"].includes(romaji)) return 'k';
    // S-row: sa, shi, su, se, so
    if (["sa","shi","su","se","so"].includes(romaji)) return 's';
    // T-row: ta, chi, tsu, te, to
    if (["ta","chi","tsu","te","to"].includes(romaji)) return 't';
    // N-row: na, ni, nu, ne, no
    if (["na","ni","nu","ne","no"].includes(romaji)) return 'n';
    // H-row: ha, hi, fu, he, ho
    if (["ha","hi","fu","he","ho"].includes(romaji)) return 'h';
    // M-row: ma, mi, mu, me, mo
    if (["ma","mi","mu","me","mo"].includes(romaji)) return 'm';
    // Y-row: ya, yu, yo
    if (["ya","yu","yo"].includes(romaji)) return 'y';
    // R-row: ra, ri, ru, re, ro
    if (["ra","ri","ru","re","ro"].includes(romaji)) return 'r';
    // W-row: wa, wo, n
    if (["wa","wo","n"].includes(romaji)) return 'w';
    // Dakuten/Handakuten rows
    if (["ga","gi","gu","ge","go"].includes(romaji)) return 'g';
    if (["za","ji","zu","ze","zo"].includes(romaji)) return 'z';
    if (["da","ji","zu","de","do"].includes(romaji)) return 'd';
    if (["ba","bi","bu","be","bo"].includes(romaji)) return 'b';
    if (["pa","pi","pu","pe","po"].includes(romaji)) return 'p';
    // Combination rows (kya, gya, etc.)
    if (["kya","kyu","kyo"].includes(romaji)) return 'kya';
    if (["gya","gyu","gyo"].includes(romaji)) return 'gya';
    if (["sha","shu","sho"].includes(romaji)) return 'sha';
    if (["ja","ju","jo"].includes(romaji)) return 'ja';
    if (["cha","chu","cho"].includes(romaji)) return 'cha';
    if (["nya","nyu","nyo"].includes(romaji)) return 'nya';
    if (["hya","hyu","hyo"].includes(romaji)) return 'hya';
    if (["bya","byu","byo"].includes(romaji)) return 'bya';
    if (["pya","pyu","pyo"].includes(romaji)) return 'pya';
    if (["mya","myu","myo"].includes(romaji)) return 'mya';
    if (["rya","ryu","ryo"].includes(romaji)) return 'rya';
    // Fallback: first letter
    return romaji[0];
  }


  // Get hiragana data
  async getHiragana(category: CharacterCategory = 'all', selectedRows?: string[]): Promise<KanaChar[]> {
    if (!this.hiraganaCache) {
      await this.loadAllData();
    }
    let filteredData = this.hiraganaCache || [];

    // Filter by category first
    if (category !== 'all') {
      filteredData = filteredData.filter(char => char.category === category);
    }

    // Then filter by selected rows if provided
    if (selectedRows && selectedRows.length > 0) {
      const rowSet = new Set(selectedRows);
      filteredData = filteredData.filter(char => rowSet.has(this.getKanaRow(char.romaji)));
    }

    return filteredData;
  }

  // Get katakana data (add row filtering)
  async getKatakana(category: CharacterCategory = 'all', selectedRows?: string[]): Promise<KanaChar[]> {
    if (!this.katakanaCache) {
      await this.loadAllData();
    }
    let filteredData = this.katakanaCache || [];

    // Filter by category first
    if (category !== 'all') {
      filteredData = filteredData.filter(char => char.category === category);
    }

    // Then filter by selected rows if provided
    if (selectedRows && selectedRows.length > 0) {
      const rowSet = new Set(selectedRows);
      filteredData = filteredData.filter(char => rowSet.has(this.getKanaRow(char.romaji)));
    }

    return filteredData;
  }

  // Get kanji data
  async getKanji(category: CharacterCategory = 'all'): Promise<KanjiChar[]> {
    if (!this.kanjiCache) {
      await this.loadAllData();
    }
    if (category === 'all') {
      return this.kanjiCache || [];
    } else {
      return (this.kanjiCache || []).filter(char => char.category === category || char.jlpt === category);
    }
  }

  // Get available hiragana categories
  async getHiraganaCategories(): Promise<CharacterCategory[]> { // Return type updated
    const hiragana = await this.getHiragana(); // Use the updated getHiragana
    const categories = new Set(hiragana.map(char => char.category || 'main'));
    // Ensure standard categories are present even if data is sparse
    categories.add('main');
    categories.add('dakuten');
    categories.add('combination');
    return Array.from(categories) as CharacterCategory[];
  }

  // Get distinct hiragana rows for main kana
  async getHiraganaMainRows(): Promise<string[]> {
    const mainKana = await this.getHiragana('main');
    const rows = new Set(mainKana.map(char => this.getKanaRow(char.romaji)));
    // Define expected main rows for consistent order
    const expectedMainRows = ['a', 'k', 's', 't', 'n', 'h', 'm', 'y', 'r', 'w'];
    return expectedMainRows.filter(row => rows.has(row)); // Filter based on actual data but keep order
  }

  // Get distinct hiragana rows for dakuten/handakuten kana
  async getHiraganaDakutenRows(): Promise<string[]> {
    const dakutenKana = await this.getHiragana('dakuten');
    const rows = new Set(dakutenKana.map(char => this.getKanaRow(char.romaji)));
     // Define expected dakuten rows for consistent order
    const expectedDakutenRows = ['g', 'z', 'j', 'd', 'b', 'p']; // j is often grouped with z/d but treated as a row here
    return expectedDakutenRows.filter(row => rows.has(row)); // Filter based on actual data but keep order
  }


  // Get available katakana categories
  async getKatakanaCategories(): Promise<CharacterCategory[]> { // Return type updated
    const katakana = await this.getKatakana(); // Use updated getKatakana
    const categories = new Set(katakana.map(char => char.category || 'main'));
    // Ensure standard categories are present
    categories.add('main');
    categories.add('dakuten');
    categories.add('combination');
    return Array.from(categories) as CharacterCategory[];
  }

  // Get distinct katakana rows for main kana
  async getKatakanaMainRows(): Promise<string[]> {
    const mainKana = await this.getKatakana('main');
    const rows = new Set(mainKana.map(char => this.getKanaRow(char.romaji)));
    const expectedMainRows = ['a', 'k', 's', 't', 'n', 'h', 'm', 'y', 'r', 'w'];
    return expectedMainRows.filter(row => rows.has(row));
  }

  // Get distinct katakana rows for dakuten/handakuten kana
  async getKatakanaDakutenRows(): Promise<string[]> {
    const dakutenKana = await this.getKatakana('dakuten');
    const rows = new Set(dakutenKana.map(char => this.getKanaRow(char.romaji)));
    const expectedDakutenRows = ['g', 'z', 'j', 'd', 'b', 'p'];
    return expectedDakutenRows.filter(row => rows.has(row));
  }

  // Get available kanji categories (JLPT levels)
  async getKanjiCategories(): Promise<string[]> {
    const kanji = await this.getKanji();
    const categories = new Set(kanji.map(char => char.jlpt || 'N5'));
    return Array.from(categories);
  }

  // Generate quiz questions for hiragana with category and row filtering
  async getHiraganaQuizQuestions(category: CharacterCategory = 'all', selectedRows?: string[]): Promise<QuizQuestion[]> {
    // Fetch data based on category AND selected rows
    const hiragana = await this.getHiragana(category, selectedRows);

    if (hiragana.length === 0) {
        console.warn(`No hiragana found for category '${category}' and rows: ${selectedRows?.join(', ')}`);
        return []; // Return empty if no characters match the criteria
    }

    // Determine the pool of potential wrong answers (all hiragana)
    const allHiragana = await this.getHiragana('all');

    // Generate questions based on the filtered hiragana
    return this.generateKanaQuizQuestions(hiragana, allHiragana, 'hiragana');
  }

  // Generate quiz questions for katakana with category and row filtering
  async getKatakanaQuizQuestions(category: CharacterCategory = 'all', selectedRows?: string[]): Promise<QuizQuestion[]> {
    // Fetch data based on category AND selected rows
    const katakana = await this.getKatakana(category, selectedRows);

    if (katakana.length === 0) {
        console.warn(`No katakana found for category '${category}' and rows: ${selectedRows?.join(', ')}`);
        return []; // Return empty if no characters match the criteria
    }

    // Determine the pool of potential wrong answers (all katakana)
    const allKatakana = await this.getKatakana('all');

    // Generate questions based on the filtered katakana
    return this.generateKanaQuizQuestions(katakana, allKatakana, 'katakana');
  }

  // Generate quiz questions for kanji with category filtering
  async getKanjiQuizQuestions(count: number = 10, category: CharacterCategory = 'all'): Promise<QuizQuestion[]> {
    const kanji = await this.getKanji(category);
    return this.generateKanjiQuizQuestions(kanji, count);
  }

  // Helper function to generate kana quiz questions
  // Takes the characters to be quizzed on, and the full pool for wrong answers
  private generateKanaQuizQuestions(
    charsToQuiz: KanaChar[],
    allCharsInScript: KanaChar[],
    scriptType: 'hiragana' | 'katakana'
  ): QuizQuestion[] {
    if (charsToQuiz.length === 0) return [];

    // Ensure we don't request more questions than available characters
    const count = charsToQuiz.length; // Quiz on all selected characters

    // Shuffle the characters to quiz
    const shuffledCharsToQuiz = [...charsToQuiz].sort(() => Math.random() - 0.5);

    return shuffledCharsToQuiz.map(char => {
      const correctAnswer = char.romaji;

      // Get 3 random wrong options from the *entire* script pool, excluding the correct answer
      const wrongOptions = allCharsInScript
        .filter(k => k.romaji !== correctAnswer)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3) // Get 3 wrong answers
        .map(k => k.romaji);

      // Ensure we have exactly 4 options (1 correct + 3 wrong)
      // If fewer than 3 wrong options are available (small dataset), duplicate some wrong ones (less ideal)
      while (wrongOptions.length < 3 && allCharsInScript.length > 1) {
         const randomWrong = allCharsInScript
            .filter(k => k.romaji !== correctAnswer)
            .sort(() => Math.random() - 0.5)[0]?.romaji;
         if (randomWrong && !wrongOptions.includes(randomWrong)) {
            wrongOptions.push(randomWrong);
         } else if (randomWrong) {
             // If we can only find duplicates, add one (better than fewer options)
             wrongOptions.push(randomWrong);
         } else {
             break; // Cannot find any more options
         }
      }
       // If still less than 3, maybe duplicate the correct answer (very unlikely case)
       while (wrongOptions.length < 3) {
           wrongOptions.push(correctAnswer);
       }


      // Combine and shuffle options
      const options = [correctAnswer, ...wrongOptions].sort(() => Math.random() - 0.5);

      return {
        character: char.char,
        options,
        correctAnswer,
        audioPath: char.audio // Assuming audio path is relative like './assets/audio/hiragana/a.mp3'
      };
    });
  }

  // Helper function to generate kanji quiz questions
  private generateKanjiQuizQuestions(kanjiData: KanjiChar[], count: number): QuizQuestion[] {
    // Shuffle the data array
    const shuffledData = [...kanjiData].sort(() => Math.random() - 0.5);
    
    // Take only the requested number of items
    const selectedKanji = shuffledData.slice(0, count);
    
    return selectedKanji.map(kanji => {
      // Create a set of options including the correct answer
      const correctAnswer = kanji.meaning;
      
      // Get 3 random wrong options from other kanji
      const wrongOptions = kanjiData
        .filter(k => k.meaning !== correctAnswer)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(k => k.meaning);
      
      // Combine and shuffle options
      const options = [correctAnswer, ...wrongOptions].sort(() => Math.random() - 0.5);
      
      return {
        character: kanji.char,
        options,
        correctAnswer,
        audioPath: kanji.audio
      };
    });
  }
}

// Export a singleton instance
export const scriptDataService = new ScriptDataService();