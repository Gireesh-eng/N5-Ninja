import React, { useState, useEffect, useRef } from 'react';
import Layout from '@/components/Layout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence, animate, useMotionValue, useTransform } from "framer-motion";
import { CheckCircle, XCircle, Award, TimerIcon, Sparkles, BookOpen, ArrowRight, PenTool, ChevronRight, Lightbulb, RotateCcw, Trophy, Brain, Zap, Target } from 'lucide-react';
// Import confetti for celebration effects
import confetti from 'canvas-confetti';
// Import user context and tracking functions
import { useUser } from '@/contexts/UserContext';
import { trackQuizCompletion } from '@/lib/firebase';
// Import Magic UI components
import { AuroraText } from '@/components/ui/aurora-text';
import { ShineBorder } from '@/components/ui/shine-border';
import { AnimatedH1, AnimatedH2, AnimatedCardTitle, ShimmerText } from '@/components/ui/animated-text';
import { NeonGradientCard } from '@/components/ui/neon-gradient-card';

// Import the quiz data and interface
import { questionsByLesson, type QuizQuestion } from '../lib/quizData';

// --- Helper Component for Furigana ---
const RenderFurigana: React.FC<{ text: string }> = ({ text }) => {
  // Note: Added filtering for empty strings that can result from split
  const parts = text.split(/([\u4e00-\u9faf]+(?:\[.*?\])?)/g).filter(Boolean); // Split by Kanji potentially followed by furigana bracket
  return (
    <>
      {parts.map((part, index) => {
        const match = part.match(/([\u4e00-\u9faf]+)\[(.+?)\]/);
        if (match) {
          const [, kanji, furigana] = match;
          return (
            <ruby lang="ja" key={index}> {/* Added lang="ja" for accessibility */}
              {kanji}
              <rt>{furigana}</rt>
            </ruby>
          );
        }
        // Handle cases where Kanji might not have furigana provided but is split
        if (/[\u4e00-\u9faf]+/.test(part)) {
            return <span key={index} lang="ja">{part}</span>; // Render Kanji as is if no bracket follows
        }
        return <span key={index}>{part}</span>; // Render plain text parts
      })}
    </>
  );
};

// --- Moved Helper Functions and Derived Data ---

// Create a flat array of all grammar questions
// This should now use the imported questionsByLesson
export const allGrammarQuestions: QuizQuestion[] = Object.values(questionsByLesson)
  .flat()
  .filter((q): q is QuizQuestion => q && typeof q.question === 'string'); // Type guard for filtering

// Helper function to shuffle an array (Fisher-Yates Shuffle)
function shuffleArray<T>(array: T[]): T[] {
  let currentIndex = array.length;
  let randomIndex: number;
  const shuffledArray = [...array]; // Create a copy to avoid modifying the original

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex], shuffledArray[currentIndex]
    ];
  }

  return shuffledArray;
}

// --- Quiz Component ---
const Quizzes: React.FC = () => {
  // Combined state from both versions
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState<'grammar' | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [isChecked, setIsChecked] = useState(false); // Track if the current answer has been checked
  // New state for timer and question stats (stats not currently used beyond length)
  const [timer, setTimer] = useState<number>(0);
  const [timerActive, setTimerActive] = useState<boolean>(false);
   // Keep questionStats state if you plan to use it later, otherwise remove it
  const [questionStats, setQuestionStats] = useState<{
    correct: number[];
    incorrect: number[];
    timePerQuestion: number[];
  }>({ correct: [], incorrect: [], timePerQuestion: [] });
  // Removed startTime - we'll just use the main timer value at check/next

  // Ref for animated score - used by framer-motion's animate function
  const scoreRef = useRef<HTMLParagraphElement>(null);

  // Get user from context - This IS a Hook and must be at the top level
  const { user } = useUser();


  // Create motion values and transforms OUTSIDE of conditional rendering
  const circleProgress = useMotionValue(0);

  // This transform is correctly defined here
  const circleProgressColor = useTransform(
    circleProgress,
    [0, 50, 70, 100],
    ["#ef4444", "#f59e0b", "#3b82f6", "#10b981"] // Tailwind red, amber, blue, green
  );

  // Define the strokeDashoffset transform OUTSIDE the render function as well
   const circleStrokeDashoffset = useTransform(
        circleProgress,
        value => 251.2 - (251.2 * value) / 100 // 251.2 is the circumference of a circle with radius 40 (2 * pi * 40)
    );

  // --- Constant for the number of questions per session ---
  const QUESTIONS_MAX_PER_QUIZ = 20; // Now set to 20

  // --- Effect Hooks (ALL AT THE TOP LEVEL) ---

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (timerActive) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    } else if (interval) {
      // Clear interval if timerActive becomes false or component unmounts
      clearInterval(interval);
    }

    // Cleanup function to clear interval on unmount
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive]); // Dependency array ensures effect runs when timerActive changes

  // Effect to animate circle progress on results screen
  useEffect(() => {
    if (isQuizComplete) {
      setTimerActive(false); // Stop timer when quiz is complete
      const totalQuestions = quizQuestions.length;
      // Handle division by zero explicitly
      const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

      // Framer motion 'animate' function to animate the motion value
      const controls = animate(circleProgress, percentage, {
        duration: 1.5,
        ease: "easeOut"
      });

      // Trigger confetti for great scores
      if (percentage >= 80) {
        setTimeout(() => {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        }, 500);
      }

      // Cleanup animation on component unmount or state change
      return () => controls.stop();
    }
     // Removed currentQuiz dependency as it's implicitly handled by isQuizComplete
  }, [isQuizComplete, score, quizQuestions.length, circleProgress]); // Added circleProgress dependency

  // Animate score on results screen - using framer-motion's animate function
  useEffect(() => {
    if (isQuizComplete && scoreRef.current) {
      const node = scoreRef.current;
      const finalScore = score; // Target score

      // Framer motion 'animate' function to update the text content
      const controls = animate(0, finalScore, {
        duration: 1, // Animation duration in seconds
        ease: "easeOut",
        onUpdate(value) {
          // Ensure we display integers as the score increases
          node.textContent = Math.round(value).toString();
        },
         onComplete() {
             // Ensure the final score is set precisely at the end
             if (node) node.textContent = finalScore.toString();
         }
      });

      // Cleanup animation on component unmount or state change
      return () => controls.stop();
    }
  }, [isQuizComplete, score]); // Dependencies: run when quiz completes or score changes

  // --- Quiz Completion Tracking Effect (MOVED TO TOP LEVEL AND CORRECTED) ---
  // This effect will run whenever isQuizComplete or user?.uid changes.
  // The logic inside the effect checks if it's time to track the results.
  useEffect(() => {
    const trackQuizResults = async () => {
      // Calculate results needed for tracking inside the effect if they change
      const totalQuestions = quizQuestions.length;
      const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

      // Only track if user is logged in, quiz is complete, and there were questions
      if (user?.uid && isQuizComplete && totalQuestions > 0) {
        try {
          // Determine quiz category based on lesson number
          const quizType = selectedLesson
            ? `grammar_lesson_${selectedLesson}`
            : 'grammar_full';

          // Track quiz completion in Firestore
          await trackQuizCompletion(user.uid, {
            quizType,
            score: percentage, // Percentage score
            timeSpentMinutes: Math.ceil(timer / 60), // <-- CORRECTED: Use timeSpentMinutes
            totalQuestions,
            correctAnswers: score
            // Removed timestamp as it's not in the expected type
          });

          console.log('Quiz results tracked successfully');
        } catch (error) {
          console.error('Error tracking quiz results:', error);
        }
      }
    };

    // Call the tracking logic whenever the relevant state changes
    // The internal `if` condition prevents it from running unnecessarily
    // Ensure the dependencies are correct for when tracking should happen.
    // isQuizComplete, user?.uid, score, timer, totalQuestions, selectedLesson
    // quizQuestions.length is needed for totalQuestions calculation, so include it implicitly
    trackQuizResults();

  }, [isQuizComplete, user?.uid, score, timer, quizQuestions.length, selectedLesson]); // Dependencies for tracking effect


  // --- Handler Functions ---

  // Modified handleStartQuiz to accept an optional lesson number
  const handleStartQuiz = (lessonNumber?: number) => {
    let sourceQuestions: QuizQuestion[];
    let maxQuestionsForSession: number; // Renamed for clarity

    if (lessonNumber && questionsByLesson[lessonNumber] && questionsByLesson[lessonNumber].length > 0) {
      // Get questions for a specific lesson
      sourceQuestions = questionsByLesson[lessonNumber];
      setSelectedLesson(lessonNumber);
      // Use up to the max number of questions, or fewer if the lesson has less
      maxQuestionsForSession = Math.min(QUESTIONS_MAX_PER_QUIZ, sourceQuestions.length);
    } else if (lessonNumber && questionsByLesson[lessonNumber]?.length === 0) {
        toast.info(`No questions available for Lesson ${lessonNumber} yet.`);
        return; // Do not start if no questions
    }
    else {
      // Get all questions for a full quiz
      sourceQuestions = allGrammarQuestions;
      setSelectedLesson(null); // Reset selected lesson for full quiz
       // Ensure we don't try to take more questions than available
      maxQuestionsForSession = Math.min(QUESTIONS_MAX_PER_QUIZ, sourceQuestions.length);
    }

    if (sourceQuestions.length === 0 || maxQuestionsForSession === 0) {
         toast.info("No questions available to start this quiz.");
         return;
    }

    // Shuffle the chosen source questions and take the specified number
    const selectedQuestions = shuffleArray(sourceQuestions).slice(0, maxQuestionsForSession);

    // Reset quiz state
    setQuizQuestions(selectedQuestions);
    setCurrentQuiz('grammar'); // Only grammar quizzes now
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setIsQuizComplete(false);
    setIsChecked(false);
    // Reset timer and stats
    setTimer(0); // Reset timer display
    setTimerActive(true); // Start timer
    // Reset questionStats if needed for future features, currently not used in render/logic
    setQuestionStats({ correct: [], incorrect: [], timePerQuestion: [] }); // Reset stats on new quiz start
  };

  const handleAnswerSelect = (answer: string) => {
    // Only allow selection if the answer hasn't been checked yet
    if (!isChecked) {
      setSelectedAnswer(answer);
    }
  };

  const checkAnswer = () => {
    if (selectedAnswer === null) {
      toast.error("Please select an answer.");
      return;
    }

    const currentQuestion = quizQuestions[currentQuestionIndex];

    // Check if the selected answer matches the correct answer
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(prevScore => prevScore + 1);
      // Optional: Add correct question index to stats if needed for review features later
      // setQuestionStats(prevStats => ({ ...prevStats, correct: [...prevStats.correct, currentQuestionIndex] }));

      toast.success("Correct!", {
        duration: 1500,
        icon: "✅"
      });

      // Trigger confetti for correct answers (can be customized)
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
       // Optional: Add incorrect question index to stats if needed
       // setQuestionStats(prevStats => ({ ...prevStats, incorrect: [...prevStats.incorrect, currentQuestionIndex] }));

      toast.error(`Incorrect!`, {
        description: (
          <div className="japanese"> {/* Apply japanese font class */}
            Correct answer: <RenderFurigana text={currentQuestion.correctAnswer} />
          </div>
        ),
        duration: 2500, // Show error toast longer
        icon: "❌"
      });
    }

    setIsChecked(true); // Mark the answer as checked
  };

  const handleNextQuestion = () => {
    // Reset selection state for the next question
    setSelectedAnswer(null);
    setIsChecked(false);

    // Move to the next question or complete the quiz
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizComplete(true);
      // Timer stops via useEffect when isQuizComplete becomes true
    }
  };

  const handleQuitQuiz = () => {
    // Stop timer immediately when quitting
    setTimerActive(false);
    // Reset all relevant state to return to the selection screen
    setCurrentQuiz(null);
    setIsQuizComplete(false);
    setQuizQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedLesson(null); // Reset selected lesson
    setSelectedAnswer(null);
    setIsChecked(false);
    setTimer(0); // Reset timer display
    // Reset stats if they were used
    setQuestionStats({ correct: [], incorrect: [], timePerQuestion: [] }); // Reset stats on quit
  };

  // --- Render Helper Functions (DO NOT CALL HOOKS INSIDE THESE) ---

  // Render the quiz selection screen with options for full quiz or lesson-specific quiz
   const renderQuizSelection = () => (
    <div className="space-y-8">
      {/* Card for Full Quiz - uses Framer Motion for entrance animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-lg mx-auto w-full relative"
      >
        <Card className="overflow-hidden relative card-animate-shine card-shining-border shadow-lg hover:shadow-xl">
          {/* Magic UI Shine Border effect */}
          <ShineBorder 
            borderWidth={1.5}
            duration={12}
            shineColor={["rgba(99, 102, 241, 0.3)", "rgba(168, 85, 247, 0.3)"]}
            className="absolute inset-0"
          />
          <div className="absolute -top-5 right-5 w-16 h-16 bg-gradient-to-br from-pink-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:rotate-12 hover:scale-110">
            <span className="text-white text-2xl font-bold">N5</span>
          </div>
          <CardHeader className="pb-2 pt-8">
            <AnimatedCardTitle className="text-2xl font-bold" delay={0.2}>
              <AuroraText gradient="from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400" duration={6}>
                JLPT N5 Full Grammar Quiz
              </AuroraText>
            </AnimatedCardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Questions from MNN Lessons 1-25
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-4">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Test your overall N5 grammar knowledge. A random selection of up to {QUESTIONS_MAX_PER_QUIZ} questions covering all lessons.
            </p>
          </CardContent>
          <CardFooter className="pt-2 flex justify-center">
            <Button
              onClick={() => handleStartQuiz()}
              className={`
                h-14 text-sm sm:text-base font-medium rounded-lg transition-all duration-300 ease-in-out
                border-2 border-indigo-300 dark:border-indigo-800
                bg-gradient-to-tr from-indigo-100 via-white to-purple-100
                dark:from-indigo-900/40 dark:via-gray-800/90 dark:to-purple-900/40
                text-indigo-700 dark:text-indigo-300
                shadow-sm hover:shadow-md
                hover:border-indigo-400 hover:dark:border-purple-500
                hover:scale-105 hover:translate-y-[-2px] hover:bg-gradient-to-bl
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900
                disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:scale-100 disabled:hover:border-transparent
                disabled:hover:translate-y-0
              `}
              disabled={allGrammarQuestions.length === 0}
            >
              {/* Framer Motion keyframe animation on the arrow */}
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.1, 1] }} // Animation pulses scale from 1 to 1.1 and back
                transition={{
                  repeat: Infinity, // Repeat animation infinitely
                  duration: 2, // Each pulse cycle takes 2 seconds
                  repeatDelay: 1.5 // Wait 1.5 seconds before repeating the pulse
                }}
                className="mr-2 text-lg"
              >
                ▶️
              </motion.div>
              Start Full Quiz ({Math.min(QUESTIONS_MAX_PER_QUIZ, allGrammarQuestions.length)})
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Section for Lesson Selection - uses CSS animation */}
      <div className="mt-12 animate-fade-in p-6 rounded-lg bg-gray-100 dark:bg-gray-800 shadow-lg" style={{ animationDelay: '0.2s' }}>
        <AnimatedH2 className="text-2xl font-semibold mb-8 text-center" animation="shimmer" duration={0.7}>
          Or Select a Specific Lesson
        </AnimatedH2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
          {/* Generate buttons for lessons 1 to 25 */}
          {Array.from({ length: 25 }, (_, i) => i + 1).map(lesson => (
            <motion.div
              key={lesson}
              whileHover={questionsByLesson[lesson]?.length > 0 ? { scale: 1.05, y: -5 } : {}}
              whileTap={questionsByLesson[lesson]?.length > 0 ? { scale: 0.95 } : {}}
              className="relative"
            >
              <Button
                onClick={() => handleStartQuiz(lesson)}
                variant="outline"
                className={`
                  h-14 w-full text-sm sm:text-base font-medium rounded-lg transition-all duration-300 ease-in-out
                  border-2 ${questionsByLesson[lesson]?.length > 0 ? 'border-indigo-200 dark:border-pink-800' : 'border-gray-300 dark:border-gray-700'}
                  bg-gradient-to-tr from-blue-50 via-white to-teal-50
                  dark:from-blue-900/40 dark:via-gray-800/90 dark:to-teal-900/40
                  ${questionsByLesson[lesson]?.length > 0 ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-500 dark:text-gray-400 cursor-not-allowed'}
                  shadow-sm
                  ${questionsByLesson[lesson]?.length > 0 ? 'hover:bg-gradient-to-bl hover:shadow-lg card-shining-border' : ''}
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:scale-100 disabled:hover:border-transparent
                  relative overflow-hidden
                `}
                disabled={!questionsByLesson[lesson] || questionsByLesson[lesson].length === 0}
              >
                {questionsByLesson[lesson]?.length > 0 && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent shine-effect" />
                )}
                Lesson {lesson}
                <span className="text-xs ml-1 opacity-60">({questionsByLesson[lesson]?.length || 0})</span>
              </Button>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Lesson quizzes contain up to {QUESTIONS_MAX_PER_QUIZ} questions focused on that lesson's grammar. Grayed-out lessons have no questions yet.
        </p>
      </div>
    </div>
  );

  // Render the quiz questions with framer-motion animations
  const renderQuiz = () => {
    // Ensure we have questions before rendering the quiz
    if (!currentQuiz || quizQuestions.length === 0 || currentQuestionIndex >= quizQuestions.length) {
        console.error("Attempted to render quiz with invalid state.");
        return renderQuizSelection(); // Fallback
    }

    const currentQuestion = quizQuestions[currentQuestionIndex];
    // Calculate progress percentage for the bar
    const progressValue = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    const quizTitle = selectedLesson
      ? `Lesson ${selectedLesson} Grammar Quiz`
      : "Full Grammar Quiz";

    // Format timer display function
    const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs < 10 ? '0' + secs : secs}`;
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6">
        <AnimatePresence mode="wait" initial={false}> 
          <motion.div
            key={currentQuestion.question + currentQuestionIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full max-w-3xl"
          >
            <Card className="overflow-hidden card-animate-rainbow relative">
              {/* Magic UI Shine Border effect */}
              <ShineBorder 
                borderWidth={2}
                duration={14}
                shineColor={["rgba(99, 102, 241, 0.5)", "rgba(168, 85, 247, 0.5)"]}
                className="absolute inset-0 z-0 rounded-lg"
              />
              
              <CardHeader className="p-6 border-b border-indigo-100 dark:border-indigo-900/50 relative z-10">
                <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                  <div className="flex items-center">
                    <AnimatedCardTitle className="text-xl sm:text-2xl font-bold" delay={0.2}>
                      <AuroraText gradient="from-indigo-600 via-purple-600 to-indigo-600 dark:from-indigo-400 dark:via-purple-400 dark:to-indigo-400">
                        {quizTitle}
                      </AuroraText>
                    </AnimatedCardTitle>
                    <Badge variant="outline" className="ml-3 flex items-center gap-1 bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">
                      <TimerIcon className="h-3.5 w-3.5" />
                      <span>{formatTime(timer)}</span>
                    </Badge>
                  </div>
                  <Badge variant="secondary" className="text-sm px-3 py-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">Question {currentQuestionIndex + 1} / {quizQuestions.length}</Badge>
                </div>
                {/* Animated Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden shadow-inner">
                  <motion.div
                    className="bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-500 h-2.5 rounded-full"
                    initial={{ width: `${((currentQuestionIndex) / quizQuestions.length) * 100}%` }}
                    animate={{ width: `${progressValue}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
                {/* Question Text */}
                <div className="relative pt-6">
                  <CardDescription className="text-lg md:text-xl text-center font-medium text-gray-700 dark:text-gray-200 min-h-[3em] japanese">
                    <span className="absolute -left-2 -top-2 text-3xl text-indigo-300 dark:text-indigo-600 opacity-30">「</span>
                    <RenderFurigana text={currentQuestion.question} />
                    <span className="absolute -right-2 -bottom-2 text-3xl text-indigo-300 dark:text-indigo-600 opacity-30">」</span>
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="p-6 relative z-10">
                <RadioGroup
                  value={selectedAnswer ?? ""}
                  onValueChange={handleAnswerSelect}
                  className="space-y-4"
                >
                  {currentQuestion.options.map((option, index) => {
                    const isCorrect = option === currentQuestion.correctAnswer;
                    const isSelected = selectedAnswer === option;

                    let bgClass = 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750';
                    let borderClass = 'border-gray-300 dark:border-gray-600';
                    let textClass = 'text-gray-800 dark:text-gray-200';
                    let icon = null;

                    if (isChecked) {
                      if (isCorrect) {
                        bgClass = 'bg-green-50 dark:bg-green-900/20';
                        borderClass = 'border-green-400 dark:border-green-700 ring-2 ring-green-300 dark:ring-green-800 ring-offset-1 dark:ring-offset-gray-900';
                        textClass = 'text-green-900 dark:text-green-300 font-medium';
                        icon = <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 ml-auto" />;
                      } else if (isSelected && !isCorrect) {
                        bgClass = 'bg-red-50 dark:bg-red-900/20';
                        borderClass = 'border-red-400 dark:border-red-700 ring-2 ring-red-300 dark:ring-red-800 ring-offset-1 dark:ring-offset-gray-900';
                        textClass = 'text-red-900 dark:text-red-300 font-medium';
                        icon = <XCircle className="h-5 w-5 text-red-600 dark:text-red-500 ml-auto" />;
                      } else {
                        bgClass = 'bg-gray-50 dark:bg-gray-800';
                        borderClass = 'border-gray-300 dark:border-gray-600';
                        textClass = 'text-gray-500 dark:text-gray-400';
                      }
                    } else if (isSelected) {
                      bgClass = 'bg-indigo-50 dark:bg-indigo-900/30';
                      borderClass = 'border-indigo-400 dark:border-indigo-600 ring-2 ring-indigo-300 dark:ring-indigo-700 ring-offset-1 dark:ring-offset-gray-900';
                      textClass = 'text-indigo-800 dark:text-indigo-300';
                    }

                    return (
                      <motion.div
                        key={option + index}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 + 0.1, duration: 0.3, ease: "easeOut" }}
                        whileHover={{ scale: isChecked ? 1 : 1.02, y: isChecked ? 0 : -2 }}
                        whileTap={{ scale: isChecked ? 1 : 0.98 }}
                        className="relative overflow-hidden"
                      >
                        <Label
                          htmlFor={`option-${index}`}
                          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${bgClass} ${borderClass} ${textClass} ${isChecked ? 'cursor-default pointer-events-none' : 'hover:shadow-md'} japanese`}
                        >
                          {/* Shine effect for non-checked options */}
                          {!isChecked && !isSelected && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shine-effect pointer-events-none" />
                          )}
                          
                          <RadioGroupItem
                            value={option}
                            id={`option-${index}`}
                            className="mr-4 h-5 w-5 border-gray-400 data-[state=checked]:border-indigo-600 data-[state=checked]:bg-indigo-600 dark:border-gray-500 dark:data-[state=checked]:border-indigo-500 dark:data-[state=checked]:bg-indigo-500"
                            disabled={isChecked}
                          />
                          <span className="text-base md:text-lg flex-1">
                            <RenderFurigana text={option} />
                          </span>
                          {isChecked && icon}
                        </Label>
                      </motion.div>
                    );
                  })}
                </RadioGroup>

                <AnimatePresence>
                  {isChecked && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: '1.5rem' }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg text-blue-800 dark:text-blue-300 text-sm md:text-base shadow-sm japanese relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-blue-500/5 opacity-30 animate-pulse" />
                      <div className="relative z-10">
                        <AuroraText gradient="from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400" className="font-bold">Explanation:</AuroraText> <RenderFurigana text={currentQuestion.explanation} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>

              <CardFooter className="flex justify-between items-center p-6 border-t border-gray-200 dark:border-gray-700 relative z-10">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" onClick={handleQuitQuiz} className="text-gray-700 dark:text-gray-300 border-gray-400 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                    Quit Quiz
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  {!isChecked ? (
                    <Button
                      onClick={checkAnswer}
                      disabled={selectedAnswer === null}
                      className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      {!isChecked && selectedAnswer !== null && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shine-effect pointer-events-none" />
                      )}
                      Check Answer
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNextQuestion}
                      className="relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-2 shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shine-effect pointer-events-none" />
                      {currentQuestionIndex === quizQuestions.length - 1 ? 'Show Results' : 'Next Question'}
                    </Button>
                  )}
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  };

  // Render the quiz results with animations
  const renderResults = () => {
    const totalQuestions = quizQuestions.length;
    // Handle division by zero explicitly
    const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
    const quizTitle = selectedLesson ? `Lesson ${selectedLesson}` : "Full";

    // Result message based on score percentage
    let resultMessage = "Keep studying and try again! 頑張って！";
    let resultEmoji = "📚";
    let messageColor = "text-gray-700 dark:text-gray-300";
    let bgGradient = "from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-indigo-900";
    let icon = <BookOpen className="h-8 w-8 text-gray-500 dark:text-gray-400" />;

    if (percentage >= 90) {
      resultMessage = "Excellent work! 素晴らしい！";
      resultEmoji = "🎉🏆";
      messageColor = "text-green-700 dark:text-green-400";
      bgGradient = "from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-950";
      icon = <Award className="h-10 w-10 text-yellow-500 dark:text-yellow-400" />;
    } else if (percentage >= 70) {
      resultMessage = "Great job! Well done! よくできました！";
      resultEmoji = "👍✨";
      messageColor = "text-blue-700 dark:text-blue-400";
      bgGradient = "from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-950";
      icon = <Sparkles className="h-8 w-8 text-blue-500 dark:text-blue-400" />;
    } else if (percentage >= 50) {
      resultMessage = "Good effort! Keep practicing! その調子！";
      resultEmoji = "💪";
      messageColor = "text-orange-700 dark:text-orange-400";
      bgGradient = "from-orange-50 to-amber-50 dark:from-orange-900 dark:to-amber-950";
      icon = <PenTool className="h-8 w-8 text-orange-500 dark:text-orange-400" />;
    }

    // Format timer display function
    const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs < 10 ? '0' + secs : secs}`;
    };

    return (
      <div className={`flex flex-col items-center justify-center min-h-screen p-6`}>
        {/* Background with static gradient pattern */}
        <div className="absolute inset-0 bg-gradient-to-br ${bgGradient} -z-10 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-grid-pattern"></div>
          </div>
        </div>
        
        {/* Results Card Container - uses Framer Motion for entrance animation */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 15,
            delay: 0.1
          }}
          className="w-full max-w-xl relative"
        >
          <Card className="overflow-hidden shadow-xl text-center border-0 glass-card p-6 relative">
            {/* Magic UI Shine Border effect */}
            <ShineBorder 
              borderWidth={3}
              duration={10}
              shineColor={percentage >= 90 ? ["rgba(16, 185, 129, 0.6)", "rgba(59, 130, 246, 0.6)"] : 
                         percentage >= 70 ? ["rgba(59, 130, 246, 0.6)", "rgba(139, 92, 246, 0.6)"] : 
                         percentage >= 50 ? ["rgba(245, 158, 11, 0.6)", "rgba(236, 72, 153, 0.6)"] :
                         ["rgba(99, 102, 241, 0.6)", "rgba(139, 92, 246, 0.6)"]}
              className="absolute inset-0 rounded-lg z-0"
            />
            
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-10"></div>
            <motion.div 
              className="absolute top-3 right-3 z-10"
              initial={{ rotate: -30, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", delay: 0.5 }}
            >
              {icon}
            </motion.div>

            <CardHeader className="relative z-10">
              {/* Title animation */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <CardTitle className="text-3xl font-bold mb-1">
                  <AuroraText 
                    gradient="from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400"
                    duration={5}
                  >
                    Quiz Complete!
                  </AuroraText>
                </CardTitle>
                <CardDescription className="text-lg text-gray-600 dark:text-gray-400 pt-1">{quizTitle} Grammar Quiz Results</CardDescription>
              </motion.div>
            </CardHeader>

            <CardContent className="mt-4 flex flex-col items-center relative z-10">
              {/* Message animation */}
              <motion.div
                className={`text-xl font-semibold mb-6 ${messageColor}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <ShimmerText delay={0.5} className="inline-block">
                  {resultMessage} {resultEmoji}
                </ShimmerText>
              </motion.div>

              {/* Circular progress indicator container */}
              <motion.div
                className="relative w-52 h-52 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                {/* Background effects */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-white/10 dark:from-gray-700/30 dark:to-gray-700/10 blur-md"></div>
                
                <svg width="100%" height="100%" viewBox="0 0 100 100" className="transform -rotate-90 drop-shadow-lg">
                  {/* Background circle */}
                  <circle
                    cx="50" cy="50" r="40"
                    fill="none"
                    stroke="rgba(229, 231, 235, 0.6)" 
                    strokeWidth="8"
                    className="dark:stroke-gray-700/60"
                  />

                  {/* Progress circle - Uses framer-motion's motion value and transforms */}
                  <motion.circle
                    cx="50" cy="50" r="40"
                    fill="none"
                    stroke={circleProgressColor}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray="251.2"
                    strokeDashoffset={circleStrokeDashoffset}
                    className="drop-shadow-md"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  {/* Score count display with animated counter */}
                  <p ref={scoreRef} className="text-5xl font-bold text-gray-700 tabular-nums dark:text-gray-200">
                    0 {/* Initial value, will be animated by useEffect */}
                  </p>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">/ {totalQuestions}</p>
                  {/* Percentage display animation */}
                  <motion.p
                    className="text-xl font-medium mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    <AuroraText 
                      gradient={
                        percentage >= 90 ? "from-green-600 to-emerald-500 dark:from-green-400 dark:to-emerald-300" :
                        percentage >= 70 ? "from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300" :
                        percentage >= 50 ? "from-orange-600 to-amber-500 dark:from-orange-400 dark:to-amber-300" :
                        "from-gray-600 to-blue-500 dark:from-gray-400 dark:to-blue-300"
                      }
                    >
                      {percentage}%
                    </AuroraText>
                  </motion.p>
                </div>
              </motion.div>

              {/* Quiz stats animation */}
              <motion.div
                className="grid grid-cols-3 gap-6 mt-4 w-full max-w-sm mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <motion.div 
                  className="text-center p-3 bg-white/30 dark:bg-gray-800/30 rounded-lg backdrop-blur-sm border border-white/20 dark:border-gray-700/30"
                  whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}  
                >
                  <p className="text-green-600 font-bold text-xl dark:text-green-400">{score}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Correct</p>
                </motion.div>
                <motion.div 
                  className="text-center p-3 bg-white/30 dark:bg-gray-800/30 rounded-lg backdrop-blur-sm border border-white/20 dark:border-gray-700/30"
                  whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}  
                >
                  <p className="text-red-500 font-bold text-xl dark:text-red-400">{totalQuestions - score}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Incorrect</p>
                </motion.div>
                <motion.div 
                  className="text-center p-3 bg-white/30 dark:bg-gray-800/30 rounded-lg backdrop-blur-sm border border-white/20 dark:border-gray-700/30"
                  whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}  
                >
                  <p className="text-blue-600 font-bold text-xl dark:text-blue-400">{totalQuestions}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                </motion.div>
              </motion.div>

              {/* Time spent animation */}
              <motion.div
                className="mt-6 p-3 bg-white/30 dark:bg-gray-800/30 rounded-lg backdrop-blur-sm border border-white/20 dark:border-gray-700/30 text-gray-700 dark:text-gray-300 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="flex items-center justify-center gap-2">
                  <TimerIcon className="h-4 w-4" />
                  <p>Total Time: <span className="font-bold">{formatTime(timer)}</span></p>
                </div>
              </motion.div>
            </CardContent>

            {/* Footer button animations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="relative z-10"
            >
              <CardFooter className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                {/* Back button with hover effect */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    onClick={handleQuitQuiz} 
                    variant="outline" 
                    className="w-full sm:w-auto border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:shadow-md transition-all duration-300"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                    Back to Quiz Selection
                  </Button>
                </motion.div>
                
                {/* Try again button with gradient glow effect */}
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                  <Button
                    onClick={() => handleStartQuiz(selectedLesson ?? undefined)}
                    className="relative w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shine-effect pointer-events-none"></div>
                    Try Again ({Math.min(QUESTIONS_MAX_PER_QUIZ, (selectedLesson ? questionsByLesson[selectedLesson]?.length : allGrammarQuestions.length) || 0)})
                  </Button>
                </motion.div>
              </CardFooter>
            </motion.div>
            
            {/* Subtle confetti-like particles for visual flair */}
            {percentage >= 70 && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-10 left-0 w-full h-full">
                  <motion.div
                    className="w-1 h-1 bg-yellow-500 rounded-full absolute"
                    animate={{
                      y: [0, 300],
                      x: [0, 30, -20, 10],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "loop",
                      delay: Math.random() * 2,
                    }}
                    style={{ left: '10%' }}
                  />
                  <motion.div
                    className="w-1 h-1 bg-purple-500 rounded-full absolute"
                    animate={{
                      y: [0, 300],
                      x: [0, -30, 20, -10],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      repeatType: "loop",
                      delay: Math.random() * 2,
                    }}
                    style={{ left: '30%' }}
                  />
                  <motion.div
                    className="w-1 h-1 bg-pink-500 rounded-full absolute"
                    animate={{
                      y: [0, 300],
                      x: [0, 20, -30, 10],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2.7,
                      repeat: Infinity,
                      repeatType: "loop",
                      delay: Math.random() * 2,
                    }}
                    style={{ left: '50%' }}
                  />
                  <motion.div
                    className="w-1 h-1 bg-blue-500 rounded-full absolute"
                    animate={{
                      y: [0, 300],
                      x: [0, -20, 35, -15],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3.2,
                      repeat: Infinity,
                      repeatType: "loop",
                      delay: Math.random() * 2,
                    }}
                    style={{ left: '70%' }}
                  />
                  <motion.div
                    className="w-1 h-1 bg-green-500 rounded-full absolute"
                    animate={{
                      y: [0, 300],
                      x: [0, 15, -25, 5],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2.9,
                      repeat: Infinity,
                      repeatType: "loop",
                      delay: Math.random() * 2,
                    }}
                    style={{ left: '90%' }}
                  />
                </div>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    );
  };

  // Main component render logic
  return (
    <Layout>
      <div className="section-container px-4 py-8">
        <div className="mb-10 text-center">
          <AnimatedH1 className="text-[36px] font-bold font-['Poppins','Noto_Sans_JP',sans-serif] relative mx-auto" duration={0.8}>
            <AuroraText 
              gradient="from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400"
              duration={8}
              className="font-bold"
            >
              JLPT N5 Grammar Practice Quiz
            </AuroraText>
          </AnimatedH1>
          
          <div className="relative inline-block my-6">
            <ShimmerText delay={0.3} className="text-[18px] mb-2 font-['Poppins','Noto_Sans_JP',sans-serif] max-w-3xl mx-auto text-center">
              Based on Minna no Nihongo I (Lessons 1-25)
            </ShimmerText>
            <div className="w-32 h-1 bg-gradient-to-r from-indigo-500 to-pink-500 mx-auto rounded-full"></div>
          </div>
        </div>

        {/* Conditional Rendering Logic */}
        {/* Renders one of the three screens based on state */}
        {!currentQuiz && !isQuizComplete ? (
            renderQuizSelection() // Show lesson/full quiz selection
        ) : currentQuiz && !isQuizComplete ? (
            renderQuiz() // Show active quiz question
        ) : currentQuiz && isQuizComplete ? ( // isQuizComplete implies currentQuiz is not null if flow is correct
            renderResults() // Show results screen
        ) : (
             // Fallback: If state is somehow invalid, return to selection
             renderQuizSelection()
        )}


        {/* Styles - kept for CSS keyframe animation */}
        <style>{`
          .japanese {
            font-family: 'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'Meiryo', sans-serif;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          /* Optional: Add transition for card transforms */
          .card-animate {
             transition: transform 0.3s ease-in-out;
          }
           .card-animate:hover {
             transform: scale(1.02) translateY(-2px);
           }
        `}</style>
      </div>
    </Layout>
  );
};

export default Quizzes;
