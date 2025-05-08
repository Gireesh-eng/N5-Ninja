import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Import vocabulary data from a new file to make it available for searches
import { vocabCategories } from "./vocabulary-data";

// Import Firebase functions if not already imported
import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from './firebase'; // Assuming firebase.ts exports 'app'

// Define types for vocabulary entries
export type VocabularyWord = {
  japanese: string;
  romaji: string;
  english: string;
  example?: string;
  category?: string;
};

/**
 * Search vocabulary data for a term in any language (Japanese, romaji, or English)
 * @param query The search query
 * @returns Array of matching vocabulary items or empty array if none found
 */
export const searchVocabulary = (query: string) => {
  const lowercaseQuery = query.toLowerCase().trim();
  
  // Skip empty queries
  if (!lowercaseQuery) return [];
  
  const results: VocabularyWord[] = [];
  
  // Search through all vocabulary categories and words
  vocabCategories.forEach(category => {
    const matchingWords = category.words.filter(word => {
      const japaneseMatch = word.japanese && word.japanese.includes(lowercaseQuery);
      const romajiMatch = word.romaji && word.romaji.toLowerCase().includes(lowercaseQuery);
      const englishMatch = word.english && word.english.toLowerCase().includes(lowercaseQuery);
      return japaneseMatch || romajiMatch || englishMatch;
    });
    
    // Add matching words to results with their category
    if (matchingWords.length > 0) {
      results.push(...matchingWords.map(word => ({
        ...word,
        category: category.category
      })));
    }
  });
  
  return results;
};

/**
 * Fetches vocabulary information using the Gemini API for words not found in the local database
 * @param query The search query (Japanese word, romaji, or English term)
 * @returns A vocabulary object with Japanese, romaji, and English translation or null if not found
 */
export const getWordFromGeminiAPI = async (query: string): Promise<{ japanese: string; romaji: string; english: string; example?: string } | null> => {
  // First, try to find the word in our local vocabulary dataset
  const localResults = searchVocabulary(query);
  
  // If we found matches in our local data, return the first match
  if (localResults.length > 0) {
    return {
      japanese: localResults[0].japanese,
      romaji: localResults[0].romaji,
      english: localResults[0].english,
      example: localResults[0].example
    };
  }
  
  // If not found locally, continue with Cloud Function lookup
  try {
    const functions = getFunctions(app); // Get Firebase Functions instance
    const callGemini = httpsCallable(functions, 'callGeminiAPI'); // 'callGeminiAPI' is the name of your cloud function

    // Clean query to prevent potential injection or invalid characters
    const cleanQuery = query.trim().replace(/[^\\p{L}\\p{N}\\p{Z}\\p{P}]/gu, '');

    if (!cleanQuery) {
      return {
        japanese: `「${query}」`,
        romaji: query,
        english: "Invalid search query. Please try a different word."
      };
    }
    
    console.log(`Calling Firebase Function 'callGeminiAPI' for query: ${cleanQuery}`);
    // Pass necessary parameters to the cloud function.
    // The cloud function expects 'prompt' and optionally 'maxOutputTokens'.
    // We need to construct a similar detailed prompt as before for the cloud function.
    const promptForCloudFunction = `For the word "${cleanQuery}", please provide a translation with an example.
          
If the word is in English, translate it to Japanese.
If the word is in Japanese, translate it to English.

IMPORTANT: Please provide the Japanese example sentence in hiragana, not kanji.

Format your response as a clean JSON object with ONLY these four fields:
{
  "japanese": "The word in Japanese hiragana/kana",
  "romaji": "The romanized pronunciation",
  "english": "The English translation/meaning",
  "example": "A simple example sentence in hiragana - followed by English translation"
}

The example should demonstrate usage of the word in a common context.
Remember, use ONLY hiragana for any Japanese text in the example, even for words that would normally be written in kanji.
Do not include any additional text, explanations, or code blocks. Just return the JSON object.`;

    const response: any = await callGemini({ prompt: promptForCloudFunction, maxOutputTokens: 250 }); // Adjust maxOutputTokens if needed

    console.log("Received response from Firebase Function:", response);

    // The cloud function should return data in the format { data: { text: "JSON_STRING_OR_OBJECT" } }
    // Or directly the parsed object if you adjust the cloud function
    const responseDataText = response.data?.text;

    if (responseDataText) {
      try {
        const parsedResult = JSON.parse(responseDataText);
        if (parsedResult.japanese && parsedResult.romaji && parsedResult.english) {
          return {
            japanese: parsedResult.japanese,
            romaji: parsedResult.romaji,
            english: parsedResult.english,
            example: parsedResult.example
          };
        } else {
          console.warn("Incomplete response format from Cloud Function (parsed):", parsedResult);
          return {
            japanese: parsedResult.japanese || `「${query}」`,
            romaji: parsedResult.romaji || query,
            english: parsedResult.english || "Partial translation only. Some data was missing from Cloud Function.",
            example: parsedResult.example
          };
        }
      } catch (parseError) {
        console.error("Failed to parse response from Cloud Function as JSON. Raw text:", responseDataText, "Error:", parseError);
        // If parsing fails, but we have some text, we can try to use it directly if it's not JSON
        // This part depends on how you want to handle non-JSON plain text responses
        // For now, let's assume the Cloud Function is expected to return text that *is* JSON.
        return {
          japanese: `「${query}」`,
          romaji: query,
          english: "Error: Could not parse translation from Cloud Function.",
          example: `Raw: ${responseDataText.substring(0,100)}...`
        };
      }
    } else {
      console.error("No 'text' field in response data from Firebase Function or response.data is undefined:", response.data);
      return {
        japanese: `「${query}」`,
        romaji: query,
        english: "Failed to get a valid response from the translation service via Cloud Function."
      };
    }

  } catch (error) {
    console.error("Error calling Firebase Function 'callGeminiAPI':", error);
    // You might want to return a more specific error message based on the error type
    let errorMessage = "An error occurred while trying to get translation.";
    if (error.code === 'unavailable') {
        errorMessage = "Translation service is currently unavailable. Please try again later.";
    } else if (error.message) {
        // errorMessage = `Error: ${error.message}`; // This can expose too much detail
    }
    return {
      japanese: `「${query}」`,
      romaji: query,
      english: errorMessage
    };
  }
};

/**
 * Helper function to extract translation information from text when JSON parsing fails
 */
function extractTranslationFromText(query: string, text: string): VocabularyWord {
  const isJapanese = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf]/.test(query);
  
  // Try to extract information from the text response
  const lines = text.split('\n').filter(line => line.trim() !== "");
  let japanesePart = "";
  let romajiPart = "";
  let englishPart = "";
  let examplePart = "";
  
  // First pass: Look for clear labels
  for (const line of lines) {
    const lowerLine = line.toLowerCase();
    
    if ((lowerLine.includes("japanese") || lowerLine.includes("日本語")) && (line.includes(":") || line.includes("："))) {
      const parts = line.split(/[:：]/);
      if (parts.length > 1) {
        japanesePart = parts[1].trim().replace(/["""'']/g, '');
      }
    } 
    else if (lowerLine.includes("romaji") && (line.includes(":") || line.includes("："))) {
      const parts = line.split(/[:：]/);
      if (parts.length > 1) {
        romajiPart = parts[1].trim().replace(/["""'']/g, '');
      }
    }
    else if ((lowerLine.includes("english") || lowerLine.includes("英語")) && (line.includes(":") || line.includes("："))) {
      const parts = line.split(/[:：]/);
      if (parts.length > 1) {
        englishPart = parts[1].trim().replace(/["""'']/g, '');
      }
    }
    else if ((lowerLine.includes("example") || lowerLine.includes("例文")) && (line.includes(":") || line.includes("："))) {
      const parts = line.split(/[:：]/);
      if (parts.length > 1) {
        examplePart = parts[1].trim().replace(/["""'']/g, '');
      }
    }
  }
  
  // Second pass: Look for Japanese or English content if we haven't found it yet
  if (!japanesePart || !englishPart) {
    for (const line of lines) {
      const trimmedLine = line.trim();
      // If we haven't found Japanese yet and this line has Japanese characters
      if (!japanesePart && /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf]/.test(trimmedLine)) {
        japanesePart = trimmedLine.replace(/["""'']/g, '');
      }
      // If we haven't found English yet and this line doesn't have Japanese characters and isn't already used
      else if (!englishPart && 
              !/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf]/.test(trimmedLine) && 
              !trimmedLine.toLowerCase().includes("japanese") && 
              !trimmedLine.toLowerCase().includes("romaji") && 
              trimmedLine.length > 1) {
        englishPart = trimmedLine.replace(/["""'']/g, '');
      }
    }
  }
  
  // Try to extract example if not found yet but there are multiple lines
  if (!examplePart && lines.length > 3) {
    // Look for lines that might contain example sentences (typically longer and with particles)
    for (const line of lines) {
      const trimmedLine = line.trim();
      // If this line has Japanese characters and looks like a sentence (longer than the Japanese word)
      if (/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf]/.test(trimmedLine) && 
          trimmedLine.length > (japanesePart.length + 5) &&
          !trimmedLine.toLowerCase().includes("japanese:") &&
          !trimmedLine.toLowerCase().includes("romaji:") &&
          !trimmedLine.toLowerCase().includes("english:")) {
        
        // Try to find a corresponding English line that follows
        const lineIndex = lines.indexOf(line);
        if (lineIndex >= 0 && lineIndex < lines.length - 1) {
          const nextLine = lines[lineIndex + 1].trim();
          if (!/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf]/.test(nextLine) &&
              nextLine.length > 5) {
            examplePart = `${trimmedLine} - ${nextLine}`;
            break;
          }
        }
        
        // If no paired line found, just use this as an example
        if (!examplePart) {
          examplePart = trimmedLine;
        }
      }
    }
  }
  
  // Final check - if we're missing something, set reasonable defaults
  if (!japanesePart) {
    japanesePart = isJapanese ? query : `「${query}」`;
  }
  
  if (!romajiPart) {
    romajiPart = isJapanese ? "Romaji unavailable" : query;
  }
  
  if (!englishPart) {
    // If we at least have Japanese and the query isn't Japanese, we probably have some kind of translation
    if (japanesePart && !isJapanese && japanesePart !== `「${query}」`) {
      englishPart = "Translation available, but meaning could not be extracted clearly";
    } else {
      // Improved error message with suggestions instead of "Could not translate this term"
      englishPart = isJapanese 
        ? "Translation unavailable" 
        : "Translation failed. Try rephrasing your search or check your internet connection.";
    }
  }
  
  return {
    japanese: japanesePart,
    romaji: romajiPart,
    english: englishPart,
    example: examplePart || undefined
  };
}

/**
 * Fallback function to attempt a simpler translation if the primary method fails.
 * NOTE: This function currently also uses the API key directly and should be removed
 * or refactored if all Gemini access is through the Cloud Function.
 * For this refactor, we will assume the cloud function handles all attempts.
 */
// async function fallbackTranslation(query: string, apiKey: string): Promise<VocabularyWord> {
//   console.warn(\`Using fallback translation for query: ${query}\`);
//   // ... (implementation of fallback using apiKey - THIS NEEDS TO BE REMOVED/REFACTORED)
//   // For now, returning a generic error as this direct API call should not happen.
//   return {
//     japanese: \`「${query}」\`,
//     romaji: query,
//     english: "Fallback translation mechanism needs to be updated.",
//     example: ""
//   };
// }

// Function to extract translation data from plain text response.
// This might still be useful if the Cloud Function sometimes returns raw text that isn't perfectly formatted JSON.
// ... (keep extractTranslationFromText if you want to try to parse non-JSON text from the cloud function)
// ... existing code ...
