import React, { useState, useEffect, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Assuming shadcn/ui components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Layout from '@/components/Layout'; // Assuming your Layout component path
import { motion, AnimatePresence } from "framer-motion";
import {
    Volume2,
    Play,
    Pause,
    RotateCcw,
    Eye,
    EyeOff,
    CheckCircle,
    Languages, // Import Languages icon for translation
    AlertCircle,
    Check,
    X,
    ChevronUp,
    ChevronDown // Added for dropdown icon
} from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert"; // Assuming you have these components

// Import Dropdown Menu components from shadcn/ui
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Import data and types from the new module
import { listeningExercises, type ListeningExercises, type Exercise, type Question } from '@/lib/listeningData';


// --- MOCK DATA START (Updated for Consistency) ---
// Your mock data remains the same as provided in the prompt.
// ... (listeningExercises data as provided) ...


// --- MOCK DATA END ---

interface ProgressState {
  completed: Set<string>;
  total: number;
}

interface ProgressMap {
  [key: string]: ProgressState;
  beginner: ProgressState;
  intermediate: ProgressState;
  situational: ProgressState;
}

// --- Helper Component for Furigana ---
const FuriganaText = ({ text }: { text: string }) => {
  const result = [];
  // Updated regex to correctly capture Kanji and Furigana.
  // \p{Script=Han}+ - Matches one or more Kanji
  // \s* - Matches zero or more spaces
  // \[ - Matches the literal opening bracket
  // ([^\]]+) - Captures one or more characters that are NOT a closing bracket (the furigana)
  // \] - Matches the literal closing bracket
  // 'g' flag for global match, 'u' flag for Unicode support (\p{...})
  const regex = /(\p{Script=Han}+)\s*\[([^\]]+)\]/gu;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const fullMatch = match[0]; // e.g., "佐藤[さとう]"
    const kanji = match[1];      // e.g., "佐藤"
    const furigana = match[2];   // e.g., "さとう"
    const matchIndex = match.index; // Start index of the match

    // Add text before the current match
    if (matchIndex > lastIndex) {
      result.push(<React.Fragment key={`text-${lastIndex}`}>{text.substring(lastIndex, matchIndex)}</React.Fragment>);
    }

    // Add the ruby element for the current match
    result.push(
      <ruby key={`ruby-${matchIndex}`} className="ruby">
        {kanji}
        <rt className="rt">{furigana}</rt>
      </ruby>
    );

    // Update lastIndex to the end of the current match
    lastIndex = regex.lastIndex; // regex.lastIndex is updated automatically by exec() when using 'g' flag
  }

  // Add any remaining text after the last match
  if (lastIndex < text.length) {
    result.push(<React.Fragment key={`text-${lastIndex}`}>{text.substring(lastIndex)}</React.Fragment>);
  }

  // Handle cases where there are no furigana matches at all
  if (result.length === 0 && text.length > 0) {
      return <>{text}</>;
  }


  return <>{result}</>;
};


// Define speaker styles for transcript and translation
const speakerStyles = {
    transcript: {
        '（Ａ：）': { color: '#2563EB', fontWeight: 500 },
        '（サントス：）': { color: '#9333EA', fontWeight: 500 },
        '（Ｂ：）': { color: '#9333EA', fontWeight: 500 },
        '（ミラー：）': { color: '#9333EA', fontWeight: 500 },
        '（佐藤：）': { color: '#2563EB', fontWeight: 500 },
        '（店員[てんいん] Ａ：）': { color: '#2563EB', fontWeight: 500 },
        '（客[きゃく] Ｂ：）': { color: '#9333EA', fontWeight: 500 },
        '（客[きゃく] A：）': { color: '#2563EB', fontWeight: 500 },
        '（運転手[うんてんしゅ]：）': { color: '#9333EA', fontWeight: 500 },
        '（客[きゃく]：）': { color: '#2563EB', fontWeight: 500 },
        '（医者[いしゃ]：）': { color: '#2563EB', fontWeight: 500 },
        '（患者[かんじゃ]：）': { color: '#9333EA', fontWeight: 500 },
        '（係[かかり]：）': { color: '#9333EA', fontWeight: 500 },
        '（ターポン：）': { color: '#9333EA', fontWeight: 500 },
        '（松本[まつもと]：）': { color: '#2563EB', fontWeight: 500 },
        '（マリア：）': { color: '#9333EA', fontWeight: 500 },
        '（一同[いちどう]：）': { color: '#6366F1', fontWeight: 500 },
        // Add other Japanese speaker labels if needed
    },
    translation: {
        '(A:)': { fontWeight: 500 },
        '(Santos:)': { fontWeight: 500 },
        '(B:)': { fontWeight: 500 },
        '(Miller:)': { fontWeight: 500 },
        '(Sato:)': { fontWeight: 500 },
        '(Clerk A:)': { fontWeight: 500 },
        '(Customer B:)': { fontWeight: 500 },
        '(Customer A:)': { fontWeight: 500 },
        '(Driver:)': { fontWeight: 500 },
        '(Customer:)': { fontWeight: 500 },
        '(Doctor:)': { fontWeight: 500 },
        '(Patient:)': { fontWeight: 500 },
        '(Staff/Helper:)': { fontWeight: 500 },
        '(Tarpon:)': { fontWeight: 500 },
        '(Matsumoto:)': { fontWeight: 500 },
        '(Maria:)': { fontWeight: 500 },
        '(All together:)': { fontWeight: 500 },
         // Add other English speaker labels if needed
    }
};


// --- Main Component ---
const Listening: React.FC = () => {
  const [activeTab, setActiveTab] = useState<keyof ListeningExercises>('beginner');
  const [progress, setProgress] = useState<ProgressMap>({
    beginner: { completed: new Set(), total: 0 },
    intermediate: { completed: new Set(), total: 0 },
    situational: { completed: new Set(), total: 0 },
  });
  const [showDetails, setShowDetails] = useState<{ [key: string]: boolean }>({});
  const [showTranslation, setShowTranslation] = useState<{ [questionId: string]: boolean }>({}); // State for translation visibility per question
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [questionId: string]: number }>({}); // Tracks { 'exerciseId-qIndex': selectedOptionIndex }
  const [answersSubmitted, setAnswersSubmitted] = useState<{ [exerciseId: string]: boolean }>({}); // Tracks { 'exerciseId': true/false }
  const [answerResults, setAnswerResults] = useState<{ [questionId: string]: boolean }>({}); // Tracks { 'exerciseId-qIndex': true/false }
  const [exerciseScores, setExerciseScores] = useState<{ [exerciseId: string]: { correct: number, total: number } }>({}); // Tracks { 'exerciseId': { correct: X, total: Y } }
  const [showScrollTop, setShowScrollTop] = useState(false); // Track scroll position for showing scroll button

  // --- Playback Speed State and Options ---
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const speedOptions = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
  // ---------------------------------------


  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  useEffect(() => {
    // Initialize total counts for progress calculation
    const totals = {
      beginner: listeningExercises.beginner.length,
      intermediate: listeningExercises.intermediate.length,
      situational: listeningExercises.situational.length,
    };
    setProgress(prev => ({
      beginner: { ...prev.beginner, total: totals.beginner },
      intermediate: { ...prev.intermediate, total: totals.intermediate },
      situational: { ...prev.situational, total: totals.situational },
    }));

    // Cleanup audio element on component unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        // Remove event listeners explicitly during cleanup
        audioRef.current.removeEventListener('ended', handleAudioEnd);
        audioRef.current.removeEventListener('error', handleAudioError);
        audioRef.current = null;
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

   useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) { // Show button after scrolling down 300px
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

  const playAudio = (audioSrc: string) => {
    // Stop current audio if playing and it's the same source
    if (audioRef.current && currentAudio === audioSrc && isPlaying) {
      togglePlayPause();
      return;
    } else if (audioRef.current && currentAudio !== audioSrc) {
        audioRef.current.pause(); // Pause previous audio if different source
        setIsPlaying(false);
    }

    // If it's the same source and paused, just play
    if (audioRef.current && currentAudio === audioSrc && !isPlaying) {
        togglePlayPause();
        return;
    }

    // --- Create or update audio element ---
    if (!audioRef.current) {
      audioRef.current = new Audio();
      // Add listeners only once when creating the element
      audioRef.current.addEventListener('ended', handleAudioEnd);
      audioRef.current.addEventListener('error', handleAudioError);
    }
    const audio = audioRef.current;

    // --- Reset state and source if needed ---
    const currentBaseSrc = audio.src.split('?')[0];
    const newBaseSrc = audioSrc.split('?')[0];

    if (currentBaseSrc !== newBaseSrc) {
        audio.src = audioSrc;
        setCurrentAudio(audioSrc);
        setIsPlaying(false); // Ensure playing state is reset
        // Note: Listeners are added once on element creation now
    } else {
        // If source is the same, just ensure state is correct
        setCurrentAudio(audioSrc);
    }

    // --- Set playback speed BEFORE playing ---
    // This ensures the correct speed is applied when the audio starts
    audio.playbackRate = playbackSpeed;


    // --- Play the audio ---
    audio.play().then(() => {
      setIsPlaying(true);
    }).catch(handleAudioError);
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
    if (audioRef.current) {
       audioRef.current.currentTime = 0; // Reset time on end
    }
  };

  const handleAudioError = (e: any) => { // Use 'any' or a more specific Event type if possible
     console.error("Error playing audio:", e);
     alert(`Error loading or playing audio. Details: ${e.message || 'Unknown error'}. Please ensure the audio file path is correct: ${currentAudio}`);
     setIsPlaying(false);
     setCurrentAudio(null); // Reset current audio on error
     if (audioRef.current) {
        // Attempt to clean up if possible
        try {
            audioRef.current.pause();
            audioRef.current.removeAttribute('src'); // Remove source
            audioRef.current.load(); // Reset element state
        } catch (cleanupError) {
            console.error("Error during audio cleanup:", cleanupError);
        }
     }
  };

  const togglePlayPause = () => {
    if (!audioRef.current || !currentAudio) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Ensure current playback speed is applied before resuming
      audioRef.current.playbackRate = playbackSpeed; // Redundant if state is kept in sync, but safe
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(handleAudioError);
    }
  };

  const restartAudio = () => {
    if (!audioRef.current || !currentAudio) return;

    audioRef.current.currentTime = 0;
    // Ensure current playback speed is applied before restarting
    audioRef.current.playbackRate = playbackSpeed;
    audioRef.current.play().then(() => {
      setIsPlaying(true);
    }).catch(handleAudioError);
  };

  // --- Handler for changing playback speed ---
  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (audioRef.current && currentAudio) { // Only update if audio element exists and is playing/paused
      audioRef.current.playbackRate = speed;
    }
  };
  // ----------------------------------------

  const markAsCompleted = (tabKey: string, exerciseId: string) => {
    setProgress(prev => {
      const key = tabKey as keyof ProgressMap;
      const currentSet = prev[key].completed;
      if (!currentSet.has(exerciseId)) {
        const newSet = new Set(currentSet);
        newSet.add(exerciseId);
        return {
          ...prev,
          [key]: { ...prev[key], completed: newSet }
        };
      }
      return prev;
    });
  };

  const handleAnswerSelection = (exerciseId: string, questionIndex: number, selectedOptionIndex: number) => {
    // Only allow selection if not submitted
    if (answersSubmitted[exerciseId]) return;

    const questionId = `${exerciseId}-q${questionIndex}`;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: selectedOptionIndex
    }));
  };

  const submitAnswers = (exerciseId: string) => {
    const exercise = [...listeningExercises.beginner, ...listeningExercises.intermediate, ...listeningExercises.situational]
      .find(ex => ex.id === exerciseId);

    if (!exercise) return;

    const results: { [questionId: string]: boolean } = {};
    let correctCount = 0;

    exercise.questions.forEach((question, qIndex) => {
      const questionId = `${exercise.id}-q${qIndex}`;
      const isCorrect = selectedAnswers[questionId] === question.answer;
      results[questionId] = isCorrect;
      if (isCorrect) correctCount++;
    });

    setAnswerResults(prev => ({ ...prev, ...results }));
    setAnswersSubmitted(prev => ({ ...prev, [exerciseId]: true }));
    setExerciseScores(prev => ({
      ...prev,
      [exerciseId]: {
        correct: correctCount,
        total: exercise.questions.length
      }
    }));

    // Auto-mark as completed if score is good (e.g., 80% or better)
    if (exercise.questions.length > 0 && correctCount / exercise.questions.length >= 0.8) {
      const tabKey = Object.keys(listeningExercises).find(key =>
        listeningExercises[key as keyof typeof listeningExercises].some(ex => ex.id === exerciseId)
      );
      if (tabKey) {
        markAsCompleted(tabKey as string, exercise.id); // Cast to string needed for markAsCompleted
      }
    }
  };

  const resetAnswers = (exerciseId: string) => {
    const exercise = [...listeningExercises.beginner, ...listeningExercises.intermediate, ...listeningExercises.situational]
      .find(ex => ex.id === exerciseId);

    if (!exercise) return;

    // Clear selected answers, results, and score for this exercise
    const newSelectedAnswers = { ...selectedAnswers };
    const newAnswerResults = { ...answerResults };
    exercise.questions.forEach((_, qIndex) => {
      const questionId = `${exercise.id}-q${qIndex}`;
      delete newSelectedAnswers[questionId];
      delete newAnswerResults[questionId];
    });

    setSelectedAnswers(newSelectedAnswers);
    setAnswerResults(newAnswerResults);
    setAnswersSubmitted(prev => ({ ...prev, [exerciseId]: false }));
    // Optionally clear score too, or keep it for reference until next submit
    setExerciseScores(prev => {
       const newScores = { ...prev };
       delete newScores[exerciseId];
       return newScores;
    });
  };

  const calculateProgress = (tabKey: keyof typeof progress): number => {
    const level = progress[tabKey];
    if (!level || level.total === 0) return 0;
    return Math.round((level.completed.size / level.total) * 100);
  };

  const toggleShowDetails = (exerciseId: string) => {
    setShowDetails(prev => ({
      ...prev,
      [exerciseId]: !prev[exerciseId]
    }));
  };

  // --- Function to toggle translation visibility ---
  const toggleShowTranslation = (questionId: string) => {
    setShowTranslation(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  // Helper function to render content for each tab
  const renderTabContent = (tabKey: keyof typeof listeningExercises) => {
    const exercises = listeningExercises[tabKey];
    const currentProgress = calculateProgress(tabKey);

    return (
      <TabsContent value={tabKey} className="focus:outline-none">
         {/* Progress Card */}
         <div className="mb-6 px-1">
           <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow">
             <CardHeader className="flex flex-row items-center justify-between pb-3 pt-4 px-4">
               <div>
                 <CardTitle className="text-xl capitalize">{tabKey} Listening</CardTitle>
                 <CardDescription>
                   {tabKey === 'beginner' && 'MNN Lessons 1-12: Basic grammar, vocab, N5 focus.'}
                   {tabKey === 'intermediate' && 'MNN Lessons 13-25: Te-form, potential, conditionals, N5+/N4.'}
                   {tabKey === 'situational' && 'MNN Lessons 26-50: Keigo, advanced grammar, N4/N3 focus.'}
                    {/* Add descriptions for other levels if you expand data */}
                 </CardDescription>
               </div>
             </CardHeader>
             <CardContent className="px-4 pb-4">
               <Progress value={currentProgress} className="h-2 bg-teal-100 dark:bg-teal-900 [&>div]:bg-teal-500 dark:[&>div]:bg-teal-400"/>
               <p className="text-right text-xs font-semibold text-teal-700 dark:text-teal-300 mt-1.5">
                  {progress[tabKey].completed.size} / {progress[tabKey].total} Exercises Completed ({currentProgress}%)
               </p>
             </CardContent>
           </Card>
         </div>

        <motion.div
          key={tabKey} // Key for re-animation
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {exercises.map((exercise) => {
            const isSubmitted = answersSubmitted[exercise.id]; // Check if this exercise is submitted
            const score = exerciseScores[exercise.id];
            const allQuestionsAnswered = exercise.questions.every((_, qIndex) => selectedAnswers[`${exercise.id}-q${qIndex}`] !== undefined);

            // Function to render lines with speaker labels and content
            const renderLines = (text: string, type: 'transcript' | 'translation') => {
                const lines = text.split('\n').filter(line => line.trim() !== ''); // Filter out empty lines
                return lines.map((line, lineIndex) => {
                    // Regex to find speaker label at the start
                    // Handles: （...：） or (...):
                    const speakerMatch = line.match(/^(\（[^）]+：）|\([^)]+\):)\s*(.*)$/);

                    let speakerLabel = '';
                    let dialogue = line.trim();
                    let speakerStyle = {}; // Start with empty style
                    const dialogueColor = lineIndex % 2 === 0 ? '#1D4ED8' : '#7E22CE'; // Example colors for dialogue

                    if (speakerMatch) {
                        speakerLabel = speakerMatch[1].trim();
                        dialogue = speakerMatch[2].trim();

                        // Get speaker style based on the type (transcript or translation) and the matched label
                        if (type === 'transcript') {
                             // Find the specific style for the Japanese speaker label
                            speakerStyle = speakerStyles.transcript[speakerLabel as keyof typeof speakerStyles.transcript] || { color: 'inherit', fontWeight: 'normal' }; // Use default if not found
                        } else {
                             // Find the specific style for the English speaker label
                            speakerStyle = speakerStyles.translation[speakerLabel as keyof typeof speakerStyles.translation] || { fontWeight: 'normal' }; // Use default if not found
                        }
                    }

                    // Render the line
                    return (
                        <p key={lineIndex}>
                            {speakerLabel && (
                                // Apply speaker style here
                                <span style={speakerStyle}>{speakerLabel}</span>
                            )}
                            <span className={`ml-1 ${type === 'translation' ? 'italic' : ''}`} style={{ color: dialogueColor }}>
                                {type === 'transcript' ? <FuriganaText text={dialogue} /> : dialogue}
                            </span>
                        </p>
                    );
                });
            };


            return (
              <motion.div key={exercise.id} variants={itemVariants}>
                <Card className="h-full flex flex-col bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                     <div className="flex justify-between items-start">
                        <div>
                           <CardTitle className="text-xl text-teal-800 dark:text-teal-200 font-jp">{exercise.title}</CardTitle>
                           <CardDescription className="font-jp">{exercise.description}</CardDescription>
                        </div>
                        <Badge variant="secondary" className="whitespace-nowrap">Lesson {exercise.mnnLesson}</Badge>
                     </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    {/* Main Play Button */}
                    <div className="flex justify-center mb-4">
                      <div className="bg-teal-50 dark:bg-teal-900/30 p-3 rounded-full">
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`h-16 w-16 rounded-full transition-colors duration-200 ${
                            currentAudio === exercise.audioSrc && isPlaying
                              ? 'bg-teal-500 dark:bg-teal-600 text-white ring-2 ring-offset-2 ring-teal-500 dark:ring-offset-gray-800' // Active playing style
                              : 'bg-teal-100 dark:bg-teal-800 hover:bg-teal-200 dark:hover:bg-teal-700 text-teal-700 dark:text-teal-200' // Default style
                          }`}
                          onClick={() => playAudio(exercise.audioSrc)}
                          aria-label={`Play audio for ${exercise.title}`}
                        >
                          <Volume2 className="h-8 w-8" />
                        </Button>
                      </div>
                    </div>

                    {/* Play/Pause/Restart/Speed Controls */}
                    {currentAudio === exercise.audioSrc && (
                      <motion.div
                         initial={{ opacity: 0, height: 0 }}
                         animate={{ opacity: 1, height: 'auto' }}
                         exit={{ opacity: 0, height: 0 }}
                         transition={{ duration: 0.3 }}
                         className="flex justify-center items-center space-x-2 mb-4 overflow-hidden" // Added items-center
                       >
                        {/* Play/Pause Button */}
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center space-x-1"
                          onClick={togglePlayPause}
                          aria-label={isPlaying ? 'Pause audio' : 'Continue playing audio'}
                        >
                          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                          <span>{isPlaying ? 'Pause' : 'Play'}</span>
                        </Button>
                        {/* Restart Button */}
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center space-x-1"
                          onClick={restartAudio}
                          aria-label="Restart audio"
                        >
                          <RotateCcw className="h-4 w-4 mr-1" />
                          <span>Restart</span>
                        </Button>

                        {/* --- Playback Speed Control Dropdown --- */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                             <Button variant="outline" size="sm" className="flex items-center space-x-1">
                                {/* Display current speed, format to one or two decimal places */}
                                <span>{playbackSpeed.toFixed(playbackSpeed % 1 === 0 ? 1 : 2)}x</span>
                                <ChevronDown className="h-4 w-4 ml-1" />
                             </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            {speedOptions.map(speed => (
                              <DropdownMenuItem
                                key={speed}
                                onClick={() => handleSpeedChange(speed)}
                                // Highlight the currently active speed
                                className={speed === playbackSpeed ? "bg-accent text-accent-foreground font-semibold" : ""}
                              >
                                {speed.toFixed(speed % 1 === 0 ? 1 : 2)}x
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                        {/* -------------------------------------------- */}
                      </motion.div>
                    )}

                    {/* Transcript/Translation Section with Enhanced UI */}
                    {showDetails[exercise.id] && (
                      <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="mt-4 overflow-hidden"
                       >
                          <div className="bg-gradient-to-r from-indigo-50 via-white to-indigo-50 dark:from-indigo-900/30 dark:via-gray-800/90 dark:to-indigo-900/30 p-5 rounded-lg border border-indigo-100 dark:border-indigo-800/50 shadow-sm hover:shadow-md transition-all duration-300">
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1, duration: 0.3 }}
                            >
                              <h4 className="font-semibold text-gray-800 dark:text-indigo-200 flex items-center mb-2">
                                <span className="bg-indigo-100 dark:bg-indigo-800/50 p-1.5 rounded-full mr-2">
                                  <Volume2 className="h-4 w-4 text-indigo-600 dark:text-indigo-300" />
                                </span>
                                Transcript
                              </h4>
                              <div className="bg-white/80 dark:bg-gray-800/50 p-3 rounded-md border border-indigo-100 dark:border-indigo-800/30 mb-4">
                                <div className="space-y-2.5 font-jp">
                                  {/* Use renderLines function for transcript */}
                                  {renderLines(exercise.transcript, 'transcript')}
                                </div>
                              </div>
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2, duration: 0.3 }}
                            >
                              <h4 className="font-semibold text-gray-800 dark:text-indigo-200 flex items-center mb-2">
                                <span className="bg-indigo-100 dark:bg-indigo-800/50 p-1.5 rounded-full mr-2">
                                  <Languages className="h-4 w-4 text-indigo-600 dark:text-indigo-300" />
                                </span>
                                Translation
                              </h4>
                              <div className="bg-white/80 dark:bg-gray-800/50 p-3 rounded-md border border-indigo-100 dark:border-indigo-800/30">
                                <div className="space-y-2.5 font-jp">
                                   {/* Use renderLines function for translation */}
                                   {renderLines(exercise.translation, 'translation')}
                                </div>
                              </div>
                            </motion.div>
                          </div>
                       </motion.div>
                    )}

                    {/* Questions Section */}
                    <div className="mt-5 space-y-4">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-center mb-3">Questions:</h4>
                      {exercise.questions.map((q, qIndex) => {
                        const questionId = `${exercise.id}-q${qIndex}`;
                        const userSelectionIndex = selectedAnswers[questionId]; // The index the user actually selected
                        const isCorrectSelection = isSubmitted && answerResults[questionId]; // Was the user's selection correct?

                        return (
                          <div key={questionId} className={`bg-gray-50 dark:bg-gray-700/30 p-3 rounded-lg border ${
                              isSubmitted && answerResults[questionId] ? 'border-green-400 dark:border-green-600 ring-1 ring-green-400 dark:ring-green-600' : // Correct answer feedback
                              isSubmitted && !answerResults[questionId] && userSelectionIndex !== undefined ? 'border-red-400 dark:border-red-600 ring-1 ring-red-400 dark:ring-red-600' : // Wrong answer feedback
                              'border-gray-200 dark:border-gray-700' // Default border
                          }`}>
                            {/* Question Row with Translate Button */}
                            <div className="flex justify-between items-start mb-2 gap-2">
                              <p className="font-medium text-sm text-gray-800 dark:text-gray-200 flex-grow font-jp">
                                {qIndex + 1}. <FuriganaText text={q.questionJP} /> {/* Use questionJP */}
                              </p>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-gray-500 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400 flex-shrink-0" // Added flex-shrink-0
                                onClick={() => toggleShowTranslation(questionId)}
                                aria-label="Show/hide English translation"
                                title="Show/hide English translation" // Tooltip for clarity
                              >
                                <Languages className="h-4 w-4" />
                              </Button>
                            </div>

                            {/* Conditionally display English translation with animation */}
                            {showTranslation[questionId] && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                transition={{ duration: 0.2 }}
                                className="mb-2 overflow-hidden"
                              >
                                <p className="text-sm text-blue-600 dark:text-blue-400 italic bg-blue-50 dark:bg-blue-900/30 p-1.5 rounded">
                                  {q.questionEN} {/* Use questionEN */}
                                </p>
                              </motion.div>
                            )}

                            {/* Options */}
                            <div className="space-y-1.5">
                              {q.optionsJP.map((optionJP, oIndex) => { // Map over optionsJP
                                const isThisOptionSelected = userSelectionIndex === oIndex;
                                const isThisTheCorrectAnswer = q.answer === oIndex;
                                const showCorrectHighlight = isSubmitted && isThisTheCorrectAnswer;
                                const showWrongHighlight = isSubmitted && isThisOptionSelected && !isCorrectSelection;

                                return (
                                  <div key={oIndex} className={`flex items-center rounded p-1.5 transition-colors duration-150 ${
                                      showCorrectHighlight ? "bg-green-100 dark:bg-green-900/40" :
                                      showWrongHighlight ? "bg-red-100 dark:bg-red-900/40" :
                                      isThisOptionSelected && !isSubmitted ? "bg-blue-50 dark:bg-blue-900/20" : // Highlight selection before submit
                                      "hover:bg-gray-100 dark:hover:bg-gray-600/30" // Default hover
                                  }`}>
                                    <input
                                      type="radio"
                                      id={`${questionId}-o${oIndex}`}
                                      name={questionId} // Group radios by question
                                      value={oIndex} // Store index as value
                                      checked={userSelectionIndex === oIndex} // Check based on state
                                      onChange={() => handleAnswerSelection(exercise.id, qIndex, oIndex)} // Use new handler
                                      disabled={isSubmitted} // Disable after submit
                                      className={`mr-2 h-4 w-4 ${
                                        showCorrectHighlight ? "text-green-600 focus:ring-green-500" :
                                        showWrongHighlight ? "text-red-600 focus:ring-red-500" :
                                        "text-teal-600 focus:ring-teal-500"
                                      } border-gray-300 dark:border-gray-600 dark:bg-gray-700 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60`}
                                    />
                                    <label
                                      htmlFor={`${questionId}-o${oIndex}`}
                                      className={`text-sm flex-grow ${ // Added flex-grow
                                        showCorrectHighlight ? "text-green-800 dark:text-green-200 font-medium" :
                                        showWrongHighlight ? "text-red-800 dark:text-red-200" :
                                        "text-gray-700 dark:text-gray-300"
                                      } font-jp ${isSubmitted ? 'cursor-default' : 'cursor-pointer'}`}
                                    >
                                      <FuriganaText text={optionJP} /> {/* Use optionJP */}
                                      {/* Optionally display English option too, e.g., below or on hover */}
                                      {/* {q.optionsEN[oIndex] && <span className="text-xs text-gray-500 dark:text-gray-400 block">({q.optionsEN[oIndex]})</span>} */}
                                    </label>
                                    {/* Add icons for feedback after submission */}
                                    {isSubmitted && isThisTheCorrectAnswer && <Check className="h-4 w-4 text-green-500 ml-2 flex-shrink-0" />}
                                    {isSubmitted && isThisOptionSelected && !isCorrectSelection && <X className="h-4 w-4 text-red-500 ml-2 flex-shrink-0" />}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Submit/Score/Retry Section */}
                    <div className="mt-6">
                      {isSubmitted ? (
                        <>
                          <Alert className={`mb-4 ${score?.correct / score?.total >= 0.8
                            ? "bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200"
                            : "bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200"
                          }`}>
                            <AlertCircle className={`h-4 w-4 mr-2 ${score?.correct / score?.total >= 0.8 ? 'text-green-500' : 'text-amber-500'}`} />
                            <AlertDescription className="text-sm font-medium">
                              Score: {score?.correct}/{score?.total}
                              ({score?.total > 0 ? Math.round(score?.correct / score?.total * 100) : 0}%)
                              {score?.correct / score?.total >= 0.8 && " - Marked as Complete!"}
                            </AlertDescription>
                          </Alert>
                          <div className="flex justify-center">
                            <Button
                              variant="outline"
                              onClick={() => resetAnswers(exercise.id)}
                              className="text-sm"
                            >
                              <RotateCcw className="h-4 w-4 mr-1" />
                              Try Again
                            </Button>
                          </div>
                        </>
                      ) : (
                        <div className="flex justify-center">
                          <Button
                            variant="default"
                            onClick={() => submitAnswers(exercise.id)}
                            disabled={!allQuestionsAnswered} // Disable until all questions are answered
                            className="bg-teal-600 hover:bg-teal-700 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Submit Answers
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center border-t pt-4 mt-4 border-gray-200 dark:border-gray-700">
                    <Button
                       variant="outline"
                       size="sm"
                       className="flex items-center text-sm"
                       onClick={() => toggleShowDetails(exercise.id)}
                       title={showDetails[exercise.id] ? 'Hide transcript and translation' : 'Show transcript and translation'}
                     >
                       {showDetails[exercise.id] ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
                       {showDetails[exercise.id] ? 'Hide Details' : 'Show Transcript'}
                     </Button>
                    <Button
                      variant={progress[tabKey as keyof typeof progress].completed.has(exercise.id) ? "secondary" : "default"}
                      size="sm"
                      className={`text-sm transition-colors duration-200 ${progress[tabKey as keyof typeof progress].completed.has(exercise.id)
                           ? "bg-green-100 dark:bg-green-800/50 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-700 cursor-default hover:bg-green-100 dark:hover:bg-green-800/50" // Completed style
                           : "bg-teal-600 hover:bg-teal-700 text-white" // Default Mark Complete style
                       }`}
                      onClick={() => markAsCompleted(tabKey as string, exercise.id)}
                      disabled={progress[tabKey as keyof typeof progress].completed.has(exercise.id)}
                      aria-label={progress[tabKey as keyof typeof progress].completed.has(exercise.id) ? `${exercise.title} marked complete` : `Mark ${exercise.title} as complete`}
                      title={progress[tabKey as keyof typeof progress].completed.has(exercise.id) ? 'Already marked as completed' : 'Manually mark as completed'}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      {progress[tabKey as keyof typeof progress].completed.has(exercise.id) ? 'Completed' : 'Mark Complete'}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </TabsContent>
    );
  };

  function handleScrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

return (
    <Layout>
      <div className="py-12 bg-gradient-to-b from-gray-50 to-teal-50 dark:from-gray-900 dark:to-teal-950 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-teal-900 dark:text-teal-100 mb-4">Listening Practice</h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Sharpen your Japanese listening skills with exercises based on Minna no Nihongo lessons.
              Listen, optionally view the transcript/translation, and test your comprehension.
            </p>
          </motion.div>

          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as keyof ListeningExercises)} className="w-full">
            {/* Tabs List */}
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm p-1">
              {(['beginner', 'intermediate', 'situational'] as const).map((tabKey) => {
                const currentProgress = calculateProgress(tabKey);
                const levelData = progress[tabKey];
                return (
                     <TabsTrigger
                       key={tabKey}
                       value={tabKey}
                       className="text-sm sm:text-base py-2.5 data-[state=active]:bg-teal-100 dark:data-[state=active]:bg-teal-900 data-[state=active]:text-teal-800 dark:data-[state=active]:text-teal-100 data-[state=active]:shadow-inner rounded-md relative capitalize transition-colors duration-200 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5"
                       aria-label={`Switch to ${tabKey} level, ${currentProgress}% complete`}
                       >
                       <span>{tabKey}</span>
                       {levelData.total > 0 && ( // Only show progress if total is calculated
                           <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                             currentProgress === 100
                             ? 'bg-green-200 dark:bg-green-800 text-green-900 dark:text-green-100'
                             : 'bg-teal-200 dark:bg-teal-800/70 text-teal-900 dark:text-teal-100'
                           }`}>
                             {currentProgress}%
                           </span>
                       )}
                     </TabsTrigger>
                 )
              })}
            </TabsList>

            {/* Render Tab Content Dynamically */}
            {renderTabContent('beginner')}
            {renderTabContent('intermediate')}
            {renderTabContent('situational')}
          </Tabs>

          {/* Tips Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16"
          >
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-teal-900 dark:text-teal-100">Listening Practice Tips</CardTitle>
                <CardDescription>
                  Strategies to enhance your Japanese listening comprehension.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <Card className="bg-gradient-to-br from-teal-50 to-white dark:from-teal-900/30 dark:to-gray-800/80 hover:shadow-md transition-shadow rounded-lg border border-teal-100 dark:border-gray-700">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Listen Actively</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Focus on understanding the main idea first, then details. Don't worry if you miss some words initially. Replay as needed.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-teal-50 to-white dark:from-teal-900/30 dark:to-gray-800/80 hover:shadow-md transition-shadow rounded-lg border border-teal-100 dark:border-gray-700">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Use Details Wisely</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Try listening first without the transcript/translation. Use them later to check understanding, learn new words, and notice pronunciation.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-teal-50 to-white dark:from-teal-900/30 dark:to-gray-800/80 hover:shadow-md transition-shadow rounded-lg border border-teal-100 dark:border-gray-700">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Review & Repeat</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Mark exercises complete, but revisit them later. Repetition helps solidify vocabulary and grammar patterns in context.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Scroll to top button with animation */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed bottom-6 right-6 z-50"
            >
              <motion.button
                onClick={handleScrollToTop}
                className="bg-teal-600 dark:bg-teal-500 text-white p-3 rounded-full shadow-lg flex items-center justify-center hover:bg-teal-700 dark:hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:focus:ring-offset-gray-900"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Scroll to top"
              >
                <ChevronUp className="h-5 w-5" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

export default Listening;