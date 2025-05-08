import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Papa from 'papaparse'; // Import papaparse
import Layout from '@/components/Layout'; // Adjust path if needed
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Check, Volume2, RotateCcw, BookOpen, Play, Pause, Loader2, RefreshCw, ArrowUp, ArrowUpCircle } from "lucide-react"; // Added ArrowUp, ArrowUpCircle
import { useUser } from "@/contexts/UserContext"; // Import useUser hook
// Add Firebase imports
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// --- Helper Function to get Static Image Path ---
const getStaticImagePath = (gifPath) => {
  if (!gifPath) return '';
  return gifPath.replace(/\.gif$/, '.png');
};

// Define interfaces for type safety (optional but recommended with TypeScript)
interface KanaChar {
  char: string;
  romaji: string;
  strokeOrder: string;
  audio: string;
}

interface KanjiChar {
  char: string;
  meaning: string;
  onyomi: string;
  kunyomi: string;
  example: string;
  strokeOrder: string;
  audio: string;
}

// Interface for tracking learned characters
interface LearnedCharacters {
  hiragana: Set<string>;
  katakana: Set<string>;
  kanji: Set<string>;
}

const Scripts = () => {
  const location = useLocation(); // Use useLocation hook
  const [activeTab, setActiveTab] = useState("hiragana");
  const [showStroke, setShowStroke] = useState(false);
  const [playingGifs, setPlayingGifs] = useState({});
  const [loadingImages, setLoadingImages] = useState({});
  
  // States for the custom reset confirmation dialog
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [resetType, setResetType] = useState<keyof typeof learnedChars | null>(null);
  const [isResetting, setIsResetting] = useState(false);
  
  // New state for tracking scroll position
  const [isScrolled, setIsScrolled] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);
  
  // Get user context and progress update function
  const { user, updateUserProgress, recordActivity, updateUserProfile } = useUser();

  // Track learned characters by their unique identifiers
  const [learnedChars, setLearnedChars] = useState<LearnedCharacters>({
    hiragana: new Set<string>(),
    katakana: new Set<string>(),
    kanji: new Set<string>()
  });

  // Initialize progress from user data if available
  const [progress, setProgress] = useState({
    hiragana: user?.progress?.hiragana || 0,
    katakana: user?.progress?.katakana || 0,
    kanji: user?.progress?.kanji || 0
  });

  // Update local progress state when user data changes
  useEffect(() => {
    if (user?.progress) {
      setProgress({
        hiragana: user.progress.hiragana || 0,
        katakana: user.progress.katakana || 0,
        kanji: user.progress.kanji || 0
      });
      
      // Load learned characters from user profile if available
      if (user.learnedCharacters) {
        setLearnedChars({
          hiragana: new Set(user.learnedCharacters.hiragana || []),
          katakana: new Set(user.learnedCharacters.katakana || []),
          kanji: new Set(user.learnedCharacters.kanji || [])
        });
      }
    }
  }, [user?.progress, user?.learnedCharacters]);

  useEffect(() => {
    if (user?.learnedCharacters) {
      console.log("Initializing learned characters from Firestore:", user.learnedCharacters);
      setLearnedChars({
        hiragana: new Set(user.learnedCharacters.hiragana || []),
        katakana: new Set(user.learnedCharacters.katakana || []),
        kanji: new Set(user.learnedCharacters.kanji || [])
      });
    }
  }, [user?.learnedCharacters]);

  // --- State for holding fetched data ---
  const [hiraganaData, setHiraganaData] = useState<KanaChar[]>([]); // Use interface type
  const [katakanaData, setKatakanaData] = useState<KanaChar[]>([]); // Use interface type
  const [kanjiData, setKanjiData] = useState<KanjiChar[]>([]);   // Use interface type
  const [isLoadingData, setIsLoadingData] = useState(true); // Loading state for CSV data
  const [errorLoadingData, setErrorLoadingData] = useState<string | null>(null); // Error state

  // --- Fetch and Parse CSV Data ---
  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingData(true);
      setErrorLoadingData(null);
      try {
        // Use relative paths starting with a dot to ensure proper resolution
        const hiraganaPromise = fetch('./data/hiragana.csv')
          .then(response => {
            if (!response.ok) {
              throw new Error(`Failed to fetch hiragana data: ${response.status}`);
            }
            return response.text();
          });

        const katakanaPromise = fetch('./data/katakana.csv')
          .then(response => {
            if (!response.ok) {
              throw new Error(`Failed to fetch katakana data: ${response.status}`);
            }
            return response.text();
          });
          
        const kanjiPromise = fetch('./data/kanji.csv')
          .then(response => {
            if (!response.ok) {
              throw new Error(`Failed to fetch kanji data: ${response.status}`);
            }
            return response.text();
          });

        const [hiraganaCsv, katakanaCsv, kanjiCsv] = await Promise.all([
          hiraganaPromise,
          katakanaPromise,
          kanjiPromise
        ]);

        // Parse using PapaParse
        const parseOptions = { header: true, skipEmptyLines: true };
        const hiraganaResult = Papa.parse<KanaChar>(hiraganaCsv, parseOptions);
        const katakanaResult = Papa.parse<KanaChar>(katakanaCsv, parseOptions);
        const kanjiResult = Papa.parse<KanjiChar>(kanjiCsv, parseOptions);

        // Check for parsing errors
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

        // Update state with parsed data
        setHiraganaData(hiraganaResult.data.filter(d => d.char));
        setKatakanaData(katakanaResult.data.filter(d => d.char));
        setKanjiData(kanjiResult.data.filter(d => d.char));

        console.log(`Successfully loaded: ${hiraganaResult.data.length} hiragana, ${katakanaResult.data.length} katakana, and ${kanjiResult.data.length} kanji characters`);
        
      } catch (error) {
        console.error("Failed to fetch or parse script data:", error);
        setErrorLoadingData(
          error instanceof Error 
            ? `Failed to load script data: ${error.message}` 
            : "Failed to load script data. Please check the data files or try again later."
        );
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Update learnedChars when data is loaded and calculate accurate progress
  useEffect(() => {
    if (!isLoadingData && user?.learnedCharacters) {
      // Calculate and update progress based on actual data and learned characters
      updateProgressFromLearnedChars();
    }
  }, [hiraganaData, katakanaData, kanjiData, user?.learnedCharacters]);
  
  // Calculate progress based on how many characters are marked as learned
  const updateProgressFromLearnedChars = () => {
    // Calculate percentages based on learned characters vs total characters
    const newProgress = {
      hiragana: hiraganaData.length > 0 ? Math.round((learnedChars.hiragana.size / hiraganaData.length) * 100) : 0,
      katakana: katakanaData.length > 0 ? Math.round((learnedChars.katakana.size / katakanaData.length) * 100) : 0,
      kanji: kanjiData.length > 0 ? Math.round((learnedChars.kanji.size / kanjiData.length) * 100) : 0
    };
    
    // Update local state
    setProgress(newProgress);
    
    // Ensure Firebase has latest progress values
    if (user) {
      Object.entries(newProgress).forEach(([type, value]) => {
        if (user?.progress?.[type] !== value) {
          updateUserProgress(type, value);
        }
      });
    }
  };

  useEffect(() => {
    console.log("Learned characters updated:", learnedChars);
    updateProgressFromLearnedChars();
  }, [learnedChars]);

  // --- Enhanced Toggle Play/Pause State for a specific GIF ---
  const togglePlayPause = (identifier: string) => {
    setLoadingImages(prev => ({
      ...prev,
      [identifier]: false // Mark as loading (image will re-render)
    }));
    setPlayingGifs(prev => ({
      ...prev,
      [identifier]: !prev[identifier]
    }));
  };

  // Placeholder: Load/Save progress (consider loading *after* data is fetched)
  useEffect(() => {
    // Load progress after data is available if needed
    // const savedProgress = localStorage.getItem('scriptProgress');
    // if (savedProgress) setProgress(JSON.parse(savedProgress));
  }, [isLoadingData]); // Depend on isLoadingData if progress relates to data size

  useEffect(() => {
    // Save progress
    // localStorage.setItem('scriptProgress', JSON.stringify(progress));
  }, [progress]);

  // Handle URL tab parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get('tab');
    if (tabParam && ['hiragana', 'katakana', 'kanji'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [location]); // location is already stable from useLocation

  // Add scroll event listener to track when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled past a threshold (e.g., 300px)
      const scrollThreshold = 300;
      if (window.scrollY > scrollThreshold) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check in case page is already scrolled on load
    handleScroll();
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Animation variants (remain the same)
  const containerVariants = { /* ... */ };
  const itemVariants = { /* ... */ };

  // --- Play Audio ---
  const playAudio = (audioPath: string | undefined) => {
    if (!audioPath) return;
    const audio = new Audio(audioPath);
    audio.play().catch(e => console.error("Error playing audio:", e));
  };

  // --- Enhanced Mark as Learned function with rate limiting ---
  const [savingChars, setSavingChars] = useState(false);
  const [pendingChars, setPendingChars] = useState<{type: keyof typeof progress, index: number}[]>([]);

  // Process the queue of characters waiting to be saved
  useEffect(() => {
    const processQueue = async () => {
      if (savingChars || pendingChars.length === 0) return;
      
      setSavingChars(true);
      const { type, index } = pendingChars[0];
      
      try {
        await saveCharacterToFirestore(type, index);
        // Remove the processed character from the queue
        setPendingChars(prev => prev.slice(1));
      } catch (error) {
        console.error("Error processing character queue:", error);
      } finally {
        // Set a small delay before processing the next character (helps avoid rate limiting)
        setTimeout(() => setSavingChars(false), 500);
      }
    };
    
    processQueue();
  }, [savingChars, pendingChars]);

  const markAsLearned = (type: keyof typeof progress, index: number) => {
    const dataMap = {
      hiragana: hiraganaData,
      katakana: katakanaData,
      kanji: kanjiData
    };
    const currentData = dataMap[type];

    if (!currentData.length || index >= currentData.length) {
      console.error("Invalid index or empty data array");
      return;
    }

    const itemData = currentData[index];
    // Create consistent ID format for character identification
    const charId = type === 'kanji' ? 
      `${itemData.char}-${(itemData as KanjiChar).meaning}` : 
      `${itemData.char}-${(itemData as KanaChar).romaji}`;

    console.log(`Attempting to mark character as learned:`, { type, index, charId, char: itemData.char });

    // First check if this character is already learned
    if (learnedChars[type].has(charId) || learnedChars[type].has(itemData.char)) {
      console.log(`Character ${charId} is already marked as learned.`);
      return;
    }

    // Update local state first for immediate UI feedback
    setLearnedChars(prev => {
      const updatedSet = new Set(prev[type]);
      updatedSet.add(charId);
      console.log(`Adding ${charId} to ${type} set, new size: ${updatedSet.size}`);
      return {
        ...prev,
        [type]: updatedSet
      };
    });

    // Add this character to the queue for Firestore update
    setPendingChars(prev => [...prev, { type, index }]);
  };

  // Function to actually save the character to Firestore
  const saveCharacterToFirestore = async (type: keyof typeof progress, index: number) => {
    const dataMap = {
      hiragana: hiraganaData,
      katakana: katakanaData,
      kanji: kanjiData
    };
    const currentData = dataMap[type];
    const itemData = currentData[index];
    const charId = type === 'kanji' ? 
      `${itemData.char}-${(itemData as KanjiChar).meaning}` : 
      `${itemData.char}-${(itemData as KanaChar).romaji}`;

    if (!user || !user.uid) {
      console.error("User not authenticated. Cannot save learned characters.");
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);
      console.log(`Updating Firestore for user ${user.uid} with new learned character:`, charId);

      // First, get the current user data to have the most up-to-date learnedCharacters
      const currentUserData = { ...user };
      
      // Make sure learnedCharacters exists and has the needed array
      if (!currentUserData.learnedCharacters) {
        currentUserData.learnedCharacters = {
          hiragana: [],
          katakana: [],
          kanji: []
        };
      }
      
      // Create the array if it doesn't exist
      if (!Array.isArray(currentUserData.learnedCharacters[type])) {
        currentUserData.learnedCharacters[type] = [];
      }
      
      // Check if the character is already in the array to avoid duplicates
      if (!currentUserData.learnedCharacters[type].includes(charId)) {
        // Add the new character to the array
        currentUserData.learnedCharacters[type].push(charId);
      }
      
      // Update the Firestore document with the new learned character
      // This direct approach ensures the learnedCharacters field is updated properly
      await updateDoc(userRef, {
        [`learnedCharacters.${type}`]: currentUserData.learnedCharacters[type],
        updatedAt: serverTimestamp()
      });
      
      console.log(`Successfully saved learned character ${charId} to Firestore`);
      
      // After successful Firestore update, also record this as an activity
      recordActivity({
        type: 'scripts',
        title: `Learned ${type} character: ${itemData.char} (${type === 'kanji' ? (itemData as KanjiChar).meaning : (itemData as KanaChar).romaji})`,
        details: {
          character: itemData.char,
          scriptType: type
        }
      });
      
      // Update user progress for the script type
      const newProgress = Math.round((currentUserData.learnedCharacters[type].length / currentData.length) * 100);
      await updateUserProgress(type, newProgress);
      
      // Update progress percentage in local state to reflect changes
      setProgress(prev => ({
        ...prev,
        [type]: newProgress
      }));
      
      return true;
    } catch (error) {
      console.error(`Error saving learned character to Firestore:`, error);
      // If Firestore update fails, revert the local state change to maintain consistency
      setLearnedChars(prev => {
        const updatedSet = new Set(prev[type]);
        updatedSet.delete(charId);
        return {
          ...prev,
          [type]: updatedSet
        };
      });
      
      alert("Failed to save progress. Please try again.");
      throw error;
    }
  };

  // Function to handle resetting progress for a specific script type
  const handleResetProgress = async (scriptType: keyof typeof learnedChars) => {
    if (!user?.uid) {
      alert("You need to be logged in to reset your progress.");
      return;
    }

    // Show the custom reset dialog instead of browser alert
    setResetType(scriptType);
    setShowResetDialog(true);
  };

  // Function to actually perform the reset when confirmed through the dialog
  const performReset = async () => {
    if (!resetType || !user?.uid) return;
    
    try {
      setIsResetting(true);
      const scriptType = resetType;

      // Reset local state first for immediate UI feedback
      setLearnedChars(prev => {
        // Create a new Set object to ensure React detects the change
        const newLearnedChars = {
          ...prev,
          [scriptType]: new Set<string>()
        };
        console.log(`Reset local learned chars for ${scriptType}`, newLearnedChars);
        return newLearnedChars;
      });

      // Update progress to 0
      setProgress(prev => {
        const newProgress = {
          ...prev,
          [scriptType]: 0
        };
        console.log(`Reset progress for ${scriptType} to 0`);
        return newProgress;
      });

      // Update Firestore - reset the learnedCharacters array for this script type
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        [`learnedCharacters.${scriptType}`]: [],
        updatedAt: serverTimestamp()
      });
      console.log(`Successfully cleared ${scriptType} from database`);

      // Update user progress in Firestore to 0 for this script type
      await updateUserProgress(scriptType, 0);
      
      // Record this action as an activity
      recordActivity({
        type: 'scripts',
        title: `Reset ${scriptType} progress`,
        details: {
          scriptType: scriptType,
          action: 'reset'
        }
      });

      // Force a re-render to update the UI with checkmarks removed
      // Update the user object to reflect the changes in learned characters
      if (user && user.learnedCharacters) {
        const updatedLearnedCharacters = {
          ...user.learnedCharacters,
          [scriptType]: []
        };
        
        // Update local user object
        updateUserProfile({
          learnedCharacters: updatedLearnedCharacters
        });
      }

      console.log(`Successfully reset ${scriptType} progress`);
      setShowResetDialog(false);
      
    } catch (error) {
      console.error(`Error resetting ${resetType} progress:`, error);
      setShowResetDialog(false);
    } finally {
      setIsResetting(false);
      setResetType(null);
    }
  };

  // Check if a character has been learned (Updated to handle both ID formats)
  const isCharacterLearned = (type: keyof typeof learnedChars, char: KanaChar | KanjiChar): boolean => {
    // Generate the consistent character ID format used for storing
    const charId = type === 'kanji' ?
      `${char.char}-${(char as KanjiChar).meaning}` :
      `${char.char}-${(char as KanaChar).romaji}`;

    // Check for the character ID format in the learned characters set
    if (learnedChars[type].has(charId)) {
      return true;
    }

    // As a fallback, also check for just the character itself
    // This handles cases where older data might be stored differently
    if (learnedChars[type].has(char.char)) {
      return true;
    }

    // Additionally, check if the character appears in any ID within the Set
    // This handles cases where the same character with different meanings/pronunciations is saved
    for (const savedId of learnedChars[type]) {
      if (savedId.startsWith(`${char.char}-`)) {
        return true;
      }
    }

    return false;
  };

  // --- Get current character set based on active tab and fetched data ---
  const getCurrentChars = () => {
    switch (activeTab) {
      case 'hiragana': return hiraganaData;
      case 'katakana': return katakanaData;
      case 'kanji': return kanjiData;
      default: return [];
    }
  };

  // --- Render Loading/Error States ---
  if (isLoadingData) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <Loader2 className="h-12 w-12 animate-spin text-indigo-600" />
          <span className="ml-4 text-lg text-gray-700">Loading Scripts...</span>
        </div>
      </Layout>
    );
  }

  if (errorLoadingData) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen px-4">
          <Card className="bg-red-50 border-red-200">
             <CardHeader>
                 <CardTitle className="text-red-800">Error Loading Data</CardTitle>
            </CardHeader>
            <CardContent className="text-red-700">
                {errorLoadingData}
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  // --- Main Component Render (when data is loaded) ---
  return (
    <Layout>
      <div className="py-12 bg-gradient-to-b from-gray-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950 min-h-screen" ref={mainContentRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
           >
             <h1 className="text-[36px] font-bold mb-3 font-['Poppins','Noto_Sans_JP',sans-serif] relative inline-block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
               Japanese Scripts
             </h1>
             <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
               Master Hiragana, Katakana, and essential N5 Kanji. View static strokes, then click play to animate.
             </p>
           </motion.div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-sm">
              <TabsTrigger value="hiragana" className="text-base sm:text-lg py-2 data-[state=active]:bg-indigo-100 dark:data-[state=active]:bg-indigo-900/50 data-[state=active]:text-indigo-800 dark:data-[state=active]:text-indigo-200 data-[state=active]:shadow-inner rounded-l-md text-gray-600 dark:text-gray-300">
                Hiragana
                <span className="ml-2 hidden sm:inline-block text-xs bg-indigo-200 dark:bg-indigo-800 text-indigo-900 dark:text-indigo-100 px-2 py-0.5 rounded-full">
                  {progress.hiragana.toFixed(0)}%
                </span>
              </TabsTrigger>
              <TabsTrigger value="katakana" className="text-base sm:text-lg py-2 data-[state=active]:bg-indigo-100 dark:data-[state=active]:bg-indigo-900/50 data-[state=active]:text-indigo-800 dark:data-[state=active]:text-indigo-200 data-[state=active]:shadow-inner text-gray-600 dark:text-gray-300">
                Katakana
                <span className="ml-2 hidden sm:inline-block text-xs bg-indigo-200 dark:bg-indigo-800 text-indigo-900 dark:text-indigo-100 px-2 py-0.5 rounded-full">
                  {progress.katakana.toFixed(0)}%
                </span>
              </TabsTrigger>
              <TabsTrigger value="kanji" className="text-base sm:text-lg py-2 data-[state=active]:bg-indigo-100 dark:data-[state=active]:bg-indigo-900/50 data-[state=active]:text-indigo-800 dark:data-[state=active]:text-indigo-200 data-[state=active]:shadow-inner rounded-r-md text-gray-600 dark:text-gray-300">
                Kanji (N5)
                <span className="ml-2 hidden sm:inline-block text-xs bg-indigo-200 dark:bg-indigo-800 text-indigo-900 dark:text-indigo-100 px-2 py-0.5 rounded-full">
                  {progress.kanji.toFixed(0)}%
                </span>
              </TabsTrigger>
            </TabsList>

             {/* Shared Controls Card (remains the same, uses progress state) */}
             <div className="mb-6 px-1">
                 <Card className="bg-white/90 dark:bg-gray-800/70 backdrop-blur-sm shadow border dark:border-gray-700/50">
                     <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-3 pb-3 pt-4 px-4">
                          <div>
                             <CardTitle className="text-xl capitalize text-gray-800 dark:text-gray-200">{activeTab} Learning</CardTitle>
                             <CardDescription className="text-gray-600 dark:text-gray-400">
                                 {activeTab === 'hiragana' && 'Used for native Japanese words and grammar.'}
                                 {activeTab === 'katakana' && 'Used for foreign loanwords and emphasis.'}
                                 {activeTab === 'kanji' && 'Logographic characters representing concepts.'}
                             </CardDescription>
                         </div>
                         <div className="flex items-center gap-2 w-full sm:w-auto">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowStroke(!showStroke)}
                                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex-grow sm:flex-grow-0"
                              >
                                  {showStroke ? <Check className="h-4 w-4 mr-1" /> : <Pencil className="h-4 w-4 mr-1" />}
                                  {showStroke ? "Hide Strokes" : "Show Strokes"}
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-red-300 dark:border-red-700 text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 flex-grow sm:flex-grow-0"
                                onClick={() => handleResetProgress(activeTab as keyof typeof learnedChars)}
                              >
                                <RefreshCw className="h-4 w-4 mr-1" />
                                Reset Progress
                              </Button>
                          </div>
                     </CardHeader>
                     <CardContent className="px-4 pb-4">
                         <Progress value={progress[activeTab as keyof typeof progress]} className="h-2 bg-indigo-100 dark:bg-indigo-900/50 [&>div]:bg-indigo-500 dark:[&>div]:bg-indigo-400"/>
                         <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">{progress[activeTab as keyof typeof progress].toFixed(0)}% Complete</p>
                     </CardContent>
                 </Card>
             </div>


            {/* --- Hiragana Content (Uses hiraganaData) --- */}
            <TabsContent value="hiragana">
               <motion.div
                    className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    key="hiragana-grid"
                >
                    {/* --- Map over hiraganaData --- */}
                    {hiraganaData.map((char, index) => {
                      const identifier = `hiragana-${char.romaji || index}`;
                      const uniqueKey = `${identifier}-${index}`; // Ensure unique key by appending index
                      const strokePath = char.strokeOrder;
                      const isPlaying = playingGifs[identifier] || false;
                      const imageSrc = isPlaying ? strokePath : getStaticImagePath(strokePath);
                      const isLearned = isCharacterLearned('hiragana', char);

                      return (
                        <motion.div
                            key={uniqueKey} // Use the unique key here
                            variants={itemVariants}
                            whileHover={{ scale: 1.05, boxShadow: "0px 4px 15px rgba(0,0,0,0.1)" }}
                            className="relative rounded-lg overflow-hidden"
                        >
                          <Card className={`overflow-hidden h-full ${isLearned ? 'bg-green-50 dark:bg-green-900/20' : 'bg-white dark:bg-gray-800'} shadow-sm hover:shadow-md transition-shadow duration-200`}>
                            <CardContent className="p-3 sm:p-4 text-center flex flex-col justify-between h-full">
                               <div className="aspect-square flex items-center justify-center mb-2 relative">
                                  {showStroke && strokePath ? (
                                    <>
                                      <img
                                        key={`${identifier}-${isPlaying ? 'animated' : 'static'}-${imageSrc}`} // More unique key
                                        src={imageSrc}
                                        alt={`Stroke order for ${char.char} (${char.romaji})`}
                                        className="max-h-full max-w-full object-contain"
                                        onError={(e) => {
                                          (e.target as HTMLImageElement).style.display = 'none';
                                          setLoadingImages(prev => ({...prev, [identifier]: false })); // Mark as failed
                                          // Consider showing fallback immediately
                                          const fallback = (e.target as HTMLImageElement).nextSibling as HTMLElement;
                                          if (fallback) fallback.style.display = 'flex';
                                        }}
                                        onLoad={() => {
                                            setLoadingImages(prev => ({...prev, [identifier]: true }));
                                             // Hide fallback if it was shown
                                            const fallback = document.getElementById(`fallback-${identifier}`);
                                            if (fallback) fallback.style.display = 'none';
                                        }}
                                        loading="lazy" // Still useful
                                      />
                                      {/* Fallback character - Use ID for potential direct manipulation */}
                                      <div
                                        id={`fallback-${identifier}`}
                                        className="absolute inset-0 flex items-center justify-center text-5xl sm:text-6xl font-japanese text-indigo-900 dark:text-indigo-200"
                                        style={{ display: loadingImages[identifier] === false ? 'flex' : 'none' }} // Show if loading failed explicitly
                                      >
                                        {char.char}
                                      </div>

                                      <button
                                        onClick={() => togglePlayPause(identifier)}
                                        className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-md"
                                        aria-label={isPlaying ? `Pause stroke animation for ${char.romaji}` : `Play stroke animation for ${char.romaji}`}
                                        title={isPlaying ? `Pause Animation` : `Play Animation`}
                                      >
                                        {isPlaying ? <Pause className="h-8 w-8 text-white" /> : <Play className="h-8 w-8 text-white" />}
                                      </button>
                                    </>
                                  ) : (
                                    <div className="text-5xl sm:text-6xl font-japanese text-indigo-900 dark:text-indigo-200">{char.char}</div>
                                  )}
                                  {isLearned && (
                                    <div className="absolute top-1 right-1 bg-green-500 rounded-full w-5 h-5 flex items-center justify-center">
                                      <Check className="h-3 w-3 text-white" />
                                    </div>
                                  )}
                                </div>
                              <div className="text-base sm:text-lg font-medium text-gray-800 dark:text-gray-300 mb-2">{char.romaji}</div>
                              <div className="flex justify-center items-center space-x-1">
                                  <Button variant="ghost" size="icon" onClick={() => playAudio(char.audio)} className="h-7 w-7 text-gray-600 dark:text-gray-400 hover:text-indigo-700 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/50" aria-label={`Play audio for ${char.romaji}`}>
                                    <Volume2 className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => markAsLearned('hiragana', index)}
                                    disabled={isLearned}
                                    className={`h-7 w-7 ${
                                      isLearned 
                                        ? 'text-green-300 dark:text-green-700 cursor-default' 
                                        : 'text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/50'
                                    }`}
                                    aria-label={`Mark ${char.romaji} as learned`}
                                  >
                                    <Check className="h-4 w-4" />
                                  </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                </motion.div>
                 {hiraganaData.length === 0 && !isLoadingData && ( // Show only if not loading and empty
                    <p className="text-center text-gray-500 mt-8">No Hiragana characters found.</p>
                 )}
            </TabsContent>

            {/* --- Katakana Content (Uses katakanaData) --- */}
            <TabsContent value="katakana">
               <motion.div
                    className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    key="katakana-grid"
                >
                    {/* --- Map over katakanaData --- */}
                    {katakanaData.map((char, index) => {
                        const identifier = `katakana-${char.romaji || index}`;
                        const uniqueKey = `${identifier}-${index}`; // Ensure unique key by appending index
                        const strokePath = char.strokeOrder;
                        const isPlaying = playingGifs[identifier] || false;
                        const imageSrc = isPlaying ? strokePath : getStaticImagePath(strokePath);
                        const isLearned = isCharacterLearned('katakana', char);

                        return (
                            <motion.div /* ... */ key={uniqueKey} variants={itemVariants} whileHover={{ scale: 1.05, boxShadow: "0px 4px 15px rgba(0,0,0,0.1)" }} className="relative rounded-lg overflow-hidden">
                                <Card className={`overflow-hidden h-full ${isLearned ? 'bg-green-50 dark:bg-green-900/20' : 'bg-white dark:bg-gray-800'} shadow-sm hover:shadow-md transition-shadow duration-200`}>
                                    <CardContent className="p-3 sm:p-4 text-center flex flex-col justify-between h-full">
                                        <div className="aspect-square flex items-center justify-center mb-2 relative">
                                        {showStroke && strokePath ? (
                                            <>
                                                <img
                                                    key={`${identifier}-${isPlaying ? 'animated' : 'static'}-${imageSrc}`} // More unique key
                                                    src={imageSrc}
                                                    alt={`Stroke order for ${char.char} (${char.romaji})`}
                                                    className="max-h-full max-w-full object-contain"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).style.display = 'none';
                                                        setLoadingImages(prev => ({...prev, [identifier]: false }));
                                                        const fallback = (e.target as HTMLImageElement).nextSibling as HTMLElement;
                                                        if (fallback) fallback.style.display = 'flex';
                                                    }}
                                                    onLoad={() => {
                                                        setLoadingImages(prev => ({...prev, [identifier]: true }));
                                                        const fallback = document.getElementById(`fallback-${identifier}`);
                                                        if (fallback) fallback.style.display = 'none';
                                                    }}
                                                    loading="lazy"
                                                />
                                                {/* Fallback character */}
                                                <div
                                                    id={`fallback-${identifier}`}
                                                    className="absolute inset-0 flex items-center justify-center text-5xl sm:text-6xl font-japanese text-purple-900 dark:text-purple-200"
                                                    style={{ display: loadingImages[identifier] === false ? 'flex' : 'none' }}
                                                >
                                                    {char.char}
                                                </div>
                                                <button
                                                    onClick={() => togglePlayPause(identifier)}
                                                    className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-md"
                                                    aria-label={isPlaying ? `Pause stroke animation for ${char.romaji}` : `Play stroke animation for ${char.romaji}`}
                                                    title={isPlaying ? `Pause Animation` : `Play Animation`}
                                                >
                                                    {isPlaying ? <Pause className="h-8 w-8 text-white" /> : <Play className="h-8 w-8 text-white" />}
                                                </button>
                                            </>
                                        ) : (
                                            <div className="text-5xl sm:text-6xl font-japanese text-purple-900 dark:text-purple-200">{char.char}</div>
                                        )}
                                        {isLearned && (
                                          <div className="absolute top-1 right-1 bg-green-500 rounded-full w-5 h-5 flex items-center justify-center">
                                            <Check className="h-3 w-3 text-white" />
                                          </div>
                                        )}
                                        </div>
                                        <div className="text-base sm:text-lg font-medium text-gray-800 dark:text-gray-300 mb-2">{char.romaji}</div>
                                        <div className="flex justify-center items-center space-x-1">
                                            <Button variant="ghost" size="icon" onClick={() => playAudio(char.audio)} className="h-7 w-7 text-gray-600 dark:text-gray-400 hover:text-purple-700 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/50" aria-label={`Play audio for ${char.romaji}`}>
                                                <Volume2 className="h-4 w-4" />
                                            </Button>
                                            <Button
                                              variant="ghost"
                                              size="icon"
                                              onClick={() => markAsLearned('katakana', index)}
                                              disabled={isLearned}
                                              className={`h-7 w-7 ${
                                                isLearned 
                                                  ? 'text-green-300 dark:text-green-700 cursor-default' 
                                                  : 'text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/50'
                                              }`}
                                              aria-label={`Mark ${char.romaji} as learned`}
                                            >
                                              <Check className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </motion.div>
                 {katakanaData.length === 0 && !isLoadingData && ( // Show only if not loading and empty
                    <p className="text-center text-gray-500 mt-8">No Katakana characters found.</p>
                 )}
            </TabsContent>

            {/* --- Kanji Content (Uses kanjiData) --- */}
            <TabsContent value="kanji">
               <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    key="kanji-grid"
                >
                     {/* --- Map over kanjiData --- */}
                    {kanjiData.map((kanji, index) => {
                        const identifier = `kanji-${kanji.char}-${index}`; // More unique ID
                        const isPlaying = playingGifs[identifier] || false;
                        const strokePath = kanji.strokeOrder;
                        const imageSrc = isPlaying ? strokePath : getStaticImagePath(strokePath);
                        const isLearned = isCharacterLearned('kanji', kanji);

                        return (
                            <motion.div key={identifier} variants={itemVariants} whileHover={{ scale: 1.03, boxShadow: "0px 6px 20px rgba(0,0,0,0.1)" }} className="relative rounded-lg overflow-hidden">
                                <Card className={`overflow-hidden h-full ${isLearned ? 'bg-green-50 dark:bg-green-900/20' : 'bg-white dark:bg-gray-800'} shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col`}>
                                    <CardContent className="p-3 sm:p-4 flex flex-col md:flex-row items-center md:items-start gap-4 flex-1">
                                        <div className="aspect-square w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 flex items-center justify-center relative mb-2 md:mb-0">
                                            {showStroke && strokePath ? (
                                                <>
                                                    <img
                                                        key={`${identifier}-${isPlaying ? 'animated' : 'static'}-${imageSrc}`} // More unique key
                                                        src={imageSrc}
                                                        alt={`Stroke order for ${kanji.char} (${kanji.meaning})`}
                                                        className="max-h-full max-w-full object-contain"
                                                        onError={(e) => {
                                                             (e.target as HTMLImageElement).style.display = 'none';
                                                            setLoadingImages(prev => ({...prev, [identifier]: false }));
                                                            const fallback = (e.target as HTMLImageElement).nextSibling as HTMLElement;
                                                            if (fallback) fallback.style.display = 'flex';
                                                        }}
                                                        onLoad={() => {
                                                            setLoadingImages(prev => ({...prev, [identifier]: true }));
                                                            const fallback = document.getElementById(`fallback-${identifier}`);
                                                            if (fallback) fallback.style.display = 'none';
                                                        }}
                                                        loading="lazy"
                                                    />
                                                    {/* Fallback character */}
                                                    <div
                                                        id={`fallback-${identifier}`}
                                                        className="absolute inset-0 flex items-center justify-center text-6xl sm:text-7xl font-japanese text-red-900 dark:text-red-200"
                                                        style={{ display: loadingImages[identifier] === false ? 'flex' : 'none' }}
                                                    >
                                                        {kanji.char}
                                                    </div>
                                                    <button
                                                        onClick={() => togglePlayPause(identifier)}
                                                        className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-md"
                                                        aria-label={isPlaying ? `Pause stroke animation for ${kanji.meaning}` : `Play stroke animation for ${kanji.meaning}`}
                                                        title={isPlaying ? `Pause Animation` : `Play Animation`}
                                                    >
                                                        {isPlaying ? <Pause className="h-8 w-8 text-white" /> : <Play className="h-8 w-8 text-white" />}
                                                    </button>
                                                </>
                                            ) : (
                                                <div className="text-6xl sm:text-7xl font-japanese text-red-900 dark:text-red-200">{kanji.char}</div>
                                            )}
                                            {isLearned && (
                                              <div className="absolute top-1 right-1 bg-green-500 rounded-full w-5 h-5 flex items-center justify-center">
                                                <Check className="h-3 w-3 text-white" />
                                              </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0 text-center md:text-left">
                                            <h3 className="font-bold text-lg sm:text-xl text-gray-900 dark:text-gray-100">{kanji.meaning}</h3>
                                            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                                                <div><span className="font-semibold text-gray-700 dark:text-gray-300">On:</span> {kanji.onyomi || 'N/A'}</div>
                                                <div><span className="font-semibold text-gray-700 dark:text-gray-300">Kun:</span> {kanji.kunyomi || 'N/A'}</div>
                                                <div className="mt-2"><span className="font-semibold text-gray-700 dark:text-gray-300">Ex:</span> <span className="font-japanese text-gray-800 dark:text-gray-200">{kanji.example || 'N/A'}</span></div>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-end items-center space-x-1 pt-2 pb-3 px-4 bg-gray-50 dark:bg-gray-800/50 border-t dark:border-gray-700">
                                        <Button variant="ghost" size="icon" onClick={() => playAudio(kanji.audio)} className="h-7 w-7 text-gray-600 dark:text-gray-400 hover:text-red-700 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50" aria-label={`Play audio for ${kanji.meaning}`}>
                                            <Volume2 className="h-4 w-4" />
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="icon" 
                                          onClick={() => markAsLearned('kanji', index)} 
                                          disabled={isLearned}
                                          className={`h-7 w-7 ${
                                            isLearned 
                                              ? 'text-green-300 dark:text-green-700 cursor-default' 
                                              : 'text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/50'
                                          }`}
                                          aria-label={`Mark ${kanji.meaning} as learned`}
                                        >
                                            <Check className="h-4 w-4" />
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        );
                    })}
                </motion.div>
                 {kanjiData.length === 0 && !isLoadingData && ( // Show only if not loading and empty
                    <p className="text-center text-gray-500 mt-8">No Kanji characters found.</p>
                 )}
            </TabsContent>

            {/* Common Practice/Quiz Footer (remains the same) */}
            {/* ... */}
            <div className="mt-8 text-center">
               <CardFooter className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6 border-t dark:border-gray-700 bg-white/50 dark:bg-gray-800/30 p-4 rounded-b-lg">
                   <Button 
                     variant="outline" 
                     size="lg" 
                     className="w-full sm:w-auto border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                     onClick={() => window.location.href = "/writing-practice"}
                   >
                        <Pencil className="h-5 w-5 mr-2" /> Practice Writing {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                    </Button>
                    <Button 
                      size="lg" 
                      className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                      onClick={() => {
                        if (activeTab === 'hiragana') {
                          window.location.href = "/hiragana-quiz";
                        } else if (activeTab === 'katakana') {
                          window.location.href = "/katakana-quiz";
                        } else if (activeTab === 'kanji') {
                          window.location.href = "/kanji-quiz";
                        }
                      }}
                    >
                        <BookOpen className="h-5 w-5 mr-2" /> Quiz Me on {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                    </Button>
               </CardFooter>
            </div>

          </Tabs>

          {/* Floating Progress Indicator and Scroll-To-Top */}
          <AnimatePresence>
            {isScrolled && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="fixed bottom-6 left-6 right-6 z-50 flex justify-between items-center"
              >
                {/* Progress Indicator */}
                <motion.div 
                  className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg rounded-full py-2 px-4 flex items-center border border-indigo-100 dark:border-indigo-800"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="mr-3 text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200">
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}:
                  </div>
                  <div className="w-24 sm:w-32 mr-2">
                    <Progress value={progress[activeTab as keyof typeof progress]} className="h-2 bg-indigo-100 dark:bg-indigo-900/50 [&>div]:bg-indigo-500 dark:[&>div]:bg-indigo-400"/>
                  </div>
                  <div className="text-xs font-medium text-indigo-700 dark:text-indigo-300">
                    {progress[activeTab as keyof typeof progress].toFixed(0)}%
                  </div>
                </motion.div>

                {/* Scroll To Top Button */}
                <motion.button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="bg-indigo-600 dark:bg-indigo-500 text-white p-2 rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none w-10 h-10"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Scroll to top"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m18 15-6-6-6 6"/>
                  </svg>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Interactive Learning Tools Section (remains the same) */}
           {/* ... */}


          {/* Custom Reset Confirmation Dialog */}
          {showResetDialog && resetType && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
              <div 
                className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden animate-fadeIn"
                role="alertdialog" 
                aria-modal="true"
                aria-labelledby="reset-dialog-title"
              >
                <div className="p-6">
                  <div className="mb-4 text-center">
                    <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                      <RefreshCw className="h-6 w-6 text-red-600 dark:text-red-400" />
                    </div>
                    <h3 
                      id="reset-dialog-title"
                      className="text-lg font-medium text-gray-900 dark:text-gray-100"
                    >
                      Reset {resetType.charAt(0).toUpperCase() + resetType.slice(1)} Progress
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Are you sure you want to reset your {resetType} progress? 
                      This will remove all your learned {resetType} characters and reset your progress to 0%.
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 mt-6">
                    <button
                      onClick={() => setShowResetDialog(false)}
                      className="py-2 px-4 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md font-medium transition-colors sm:w-1/2"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={performReset}
                      disabled={isResetting}
                      className="py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium transition-colors sm:w-1/2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isResetting ? (
                        <span className="flex items-center justify-center">
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Resetting...
                        </span>
                      ) : (
                        "Yes, Reset Progress"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Success Toast for Reset */}
          {resetType === null && (
            <div id="resetSuccessToast" className="fixed bottom-4 right-4 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 px-4 py-3 rounded-lg shadow-lg z-50 flex items-center animate-slideInUp" style={{ display: 'none' }}>
              <Check className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
              <p className="text-sm font-medium">Progress reset successfully!</p>
            </div>
          )}

          <style>
            {`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(-10px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes slideInUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-fadeIn {
              animation: fadeIn 0.3s ease-out forwards;
            }
            .animate-slideInUp {
              animation: slideInUp 0.3s ease-out forwards;
            }
            `}
          </style>
        </div>
      </div>
    </Layout>
  );
};

export default Scripts;