import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox"; // Import Checkbox
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Award, TimerIcon, Sparkles, ArrowRight, Loader2, Play } from 'lucide-react';
import confetti from 'canvas-confetti';
import { scriptDataService, QuizQuestion, CharacterCategory, IScriptDataService } from '@/lib/ScriptDataService'; // Import IScriptDataService type

// Assume scriptDataService has these methods (or adapt if structure is different)
// Combine base methods with new ones
interface ExtendedScriptDataService extends IScriptDataService { // Extend the imported type
  getHiraganaMainRows: () => Promise<string[]>;
  getHiraganaDakutenRows: () => Promise<string[]>;
  // Ensure methods from the base ScriptDataService are implicitly included or explicitly added if needed
  // For example, if ScriptDataService defines getHiraganaCategories, it should be available here.
  // If getHiraganaCategories is NOT part of the base ScriptDataService type, add it:
  getHiraganaCategories: () => Promise<CharacterCategory[]>;
  getHiraganaQuizQuestions: (category: CharacterCategory, selectedRows?: string[]) => Promise<QuizQuestion[]>; // Updated signature
}

const HiraganaQuiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CharacterCategory>('all');
  const [categories, setCategories] = useState<string[]>([]);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [mainRows, setMainRows] = useState<string[]>([]); // Add state for main rows
  const [dakutenRows, setDakutenRows] = useState<string[]>([]); // Add state for dakuten rows
  const [selectedRows, setSelectedRows] = useState<string[]>([]); // Add state for selected rows

  // Load available categories and rows
  useEffect(() => {
    async function loadInitialData() {
      setIsLoading(true);
      try {
        // Use the extended type assertion with unknown
        const service = scriptDataService as unknown as ExtendedScriptDataService;

        const [cats, main, dakuten] = await Promise.all([
          service.getHiraganaCategories(),
          service.getHiraganaMainRows(), // Fetch main rows
          service.getHiraganaDakutenRows() // Fetch dakuten rows
        ]);

        setCategories(['all', ...cats]);
        setMainRows(main);
        setDakutenRows(dakuten);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to load hiragana data:", err);
        setError("Failed to load categories or rows. Please refresh the page and try again.");
        setIsLoading(false);
      }
    }

    // Initialize audio
    const audioElement = new Audio();
    setAudio(audioElement);

    loadInitialData(); // Call the combined loading function

    return () => {
      if (audioElement) {
        audioElement.pause();
      }
    };
  }, []); // Keep dependency array empty

  // Handle row selection changes
  const handleRowSelectionChange = (row: string, checked: boolean | 'indeterminate') => {
    setSelectedRows(prev =>
      checked ? [...prev, row] : prev.filter(r => r !== row)
    );
  };

  // Reset selected rows when category changes
  useEffect(() => {
    setSelectedRows([]);
  }, [selectedCategory]);


  // Start quiz with selected category and rows
  const startQuiz = async () => {
    // Validation: Ensure rows are selected if category requires it
    if (['main', 'dakuten', 'combination'].includes(selectedCategory) && selectedRows.length === 0) {
      toast.error("Please select at least one character row to start the quiz.");
      return;
    }

    setIsLoading(true);
    try {
      // Use the extended type assertion with unknown
      const service = scriptDataService as unknown as ExtendedScriptDataService;
      // Pass selectedCategory and selectedRows to the updated service method
      const questions = await service.getHiraganaQuizQuestions(selectedCategory, selectedRows);

      if (questions.length === 0) {
        setError(`No hiragana characters found for the selected criteria. Please adjust your selection.`);
        setIsLoading(false);
        return;
      }

      setQuizQuestions(questions);
      setCurrentQuestionIndex(0);
      setScore(0);
      setSelectedAnswer(null);
      setIsChecked(false);
      setIsQuizComplete(false);
      setIsQuizStarted(true);
      setIsLoading(false);
    } catch (err) {
      console.error("Failed to load hiragana quiz data:", err);
      setError("Failed to load quiz data. Please refresh the page and try again.");
      setIsLoading(false);
    }
  };

  // Get current question
  const currentQuestion = quizQuestions[currentQuestionIndex];

  // Handle answer selection
  const handleSelectAnswer = (answer: string) => {
    if (isChecked) return; // Prevent changing answer after checking
    setSelectedAnswer(answer);
  };

  // Check answer
  const handleCheckAnswer = () => {
    if (!selectedAnswer || isChecked) return;

    setIsChecked(true);
    
    if (selectedAnswer === currentQuestion?.correctAnswer) {
      setScore(prevScore => prevScore + 1);
      toast.success("Correct! Great job!");
      
      // Play sound for the character
      if (audio && currentQuestion?.audioPath) {
        audio.src = currentQuestion.audioPath;
        audio.play().catch(e => console.error("Error playing audio:", e));
      }
    } else {
      toast.error(`Incorrect. The correct answer is: ${currentQuestion?.correctAnswer}`);
    }
  };

  // Move to next question
  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsChecked(false);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setIsQuizComplete(true);
      
      // Display confetti for good scores
      if (score >= Math.floor(quizQuestions.length * 0.7)) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  // Restart quiz
  const handleRestartQuiz = () => {
    setIsQuizStarted(false);
    setIsQuizComplete(false);
  };

  // Score feedback
  const getScoreFeedback = () => {
    const percentage = (score / quizQuestions.length) * 100;
    
    if (percentage >= 90) return "Excellent! You're a hiragana master!";
    if (percentage >= 70) return "Great job! You're getting good at hiragana!";
    if (percentage >= 50) return "Good effort! Keep practicing your hiragana.";
    return "You're on your way to learning hiragana. Keep practicing!";
  };

  // Category name formatter
  const formatCategoryName = (category: string) => {
    if (category === 'all') return 'All Hiragana';
    if (category === 'main') return 'Main Kana';
    if (category === 'dakuten') return 'Dakuten Kana';
    if (category === 'combination') return 'Combination Kana';
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  // Button for each character group
  // Ensure the category prop type matches CharacterCategory or string as appropriate
  const CategoryButton = ({ category }: { category: CharacterCategory | 'all' }) => (
    <Button
      variant={selectedCategory === category ? "default" : "outline"}
      className={`
        w-full text-lg py-6 font-medium transition-all duration-300 transform
        ${selectedCategory === category 
          ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md scale-105" 
          : "bg-white hover:bg-blue-50 text-blue-600 border-blue-200 hover:border-blue-300 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
        }
      `}
      onClick={() => setSelectedCategory(category)}
    >
      {formatCategoryName(category)}
    </Button>
  );

  // Helper to get rows to display based on category
  const getRowsForCategory = (category: CharacterCategory): string[] => {
    switch (category) {
      case 'main':
        return mainRows;
      case 'dakuten':
        return dakutenRows;
      case 'combination':
        return [...mainRows, ...dakutenRows];
      default:
        return [];
    }
  };

  // Display loading state
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
          <p className="text-lg text-gray-700 dark:text-gray-300">Loading Hiragana Quiz...</p>
        </div>
      </Layout>
    );
  }

  // Display error state
  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
          <Card className="max-w-md w-full bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
            <CardHeader>
              <CardTitle className="text-red-800 dark:text-red-300">Error</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-700 dark:text-red-400">{error}</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => {
                setError(null);
                setSelectedCategory('all');
              }} variant="outline" className="w-full">
                Try Again
              </Button>
            </CardFooter>
          </Card>
        </div>
      </Layout>
    );
  }

  // Category selection screen
  if (!isQuizStarted) {
    const rowsToDisplay = getRowsForCategory(selectedCategory);

    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="border-blue-100 dark:border-blue-900 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
                <h1 className="text-3xl font-bold text-white">Hiragana Quiz</h1>
                <p className="text-blue-100 mt-2">Test your hiragana knowledge!</p>
              </div>

              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                  1. Select Character Group
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {/* Cast category to the expected type for the button */}
                  {categories.map((category) => (
                    <CategoryButton key={category} category={category as CharacterCategory | 'all'} />
                  ))}
                </div>

                {/* Conditional Row Selection */}
                {rowsToDisplay.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-4"
                  >
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                      2. Select Rows for Quiz
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {rowsToDisplay.map((row) => (
                        <div key={row} className="flex items-center space-x-2 p-2 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                          <Checkbox
                            id={`row-${row}`}
                            checked={selectedRows.includes(row)}
                            onCheckedChange={(checked) => handleRowSelectionChange(row, checked)}
                          />
                          <Label htmlFor={`row-${row}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                            {`${row}-row`} {/* Display like 'a-row', 'ka-row' */}
                          </Label>
                        </div>
                      ))}
                    </div>
                     <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                      Select the specific rows you want to be quizzed on.
                    </p>
                  </motion.div>
                )}

                {/* Remove Number of Questions Section */}
                {/*
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-4">
                   ... Number of Questions UI removed ...
                </div>
                 */}
              </CardContent>

              <CardFooter className="bg-gray-50 dark:bg-gray-800/50 p-6 border-t border-gray-200 dark:border-gray-700">
                <Button
                  onClick={startQuiz}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
                  // Disable button if rows are required but none selected
                  disabled={rowsToDisplay.length > 0 && selectedRows.length === 0}
                >
                  <Play className="mr-2 h-5 w-5" />
                  Start Quiz {rowsToDisplay.length > 0 ? `with ${selectedRows.length} Row(s)` : `with ${formatCategoryName(selectedCategory)}`}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {!isQuizComplete ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="shadow-lg border-blue-100 dark:border-blue-900 overflow-hidden">
                <CardHeader className="text-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                  <Badge variant="outline" className="mb-2 mx-auto py-1 px-4 border-blue-200 text-blue-50 dark:border-blue-600 dark:text-blue-200">
                    {/* Display selected category or rows */}
                    {selectedCategory === 'all' ? formatCategoryName(selectedCategory) : `${selectedRows.length} Row(s) Selected`}
                  </Badge>
                  <CardTitle className="text-2xl mb-2 text-white">Hiragana Quiz</CardTitle>
                  <CardDescription className="text-md text-blue-100">
                    Question {currentQuestionIndex + 1} of {quizQuestions.length}
                  </CardDescription>
                  <div className="mt-2">
                    <Progress 
                      value={((currentQuestionIndex + 1) / quizQuestions.length) * 100} 
                      className="h-2 bg-blue-400/30" 
                    />
                  </div>
                </CardHeader>
                
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-8">
                    <motion.div 
                      className="text-7xl font-bold h-32 w-32 flex items-center justify-center bg-blue-50 dark:bg-blue-900/20 rounded-xl shadow-inner"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                      }}
                    >
                      {currentQuestion?.character}
                    </motion.div>
                  </div>
                  
                  <RadioGroup className="gap-4 mt-4">
                    <AnimatePresence>
                      {currentQuestion?.options.map((option, index) => (
                        <motion.div
                          key={`${currentQuestionIndex}-${index}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ 
                            duration: 0.3,
                            delay: index * 0.1
                          }}
                        >
                          <div
                            className={`flex items-center border rounded-lg p-4 cursor-pointer transition-all ${
                              selectedAnswer === option
                                ? isChecked
                                  ? selectedAnswer === currentQuestion.correctAnswer
                                    ? "bg-green-50 border-green-500 dark:bg-green-900/20 dark:border-green-500"
                                    : "bg-red-50 border-red-500 dark:bg-red-900/20 dark:border-red-500"
                                  : "bg-blue-50 border-blue-400 dark:bg-blue-900/20 dark:border-blue-400"
                                : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                            }`}
                            onClick={() => handleSelectAnswer(option)}
                          >
                            <RadioGroupItem
                              value={option}
                              id={`option-${index}`}
                              checked={selectedAnswer === option}
                              onClick={(e) => e.stopPropagation()}
                              className="mr-2"
                            />
                            <Label
                              htmlFor={`option-${index}`}
                              className="w-full cursor-pointer font-medium"
                            >
                              {option}
                            </Label>
                            {isChecked && option === currentQuestion.correctAnswer && (
                              <CheckCircle className="ml-auto h-5 w-5 text-green-500" />
                            )}
                            {isChecked && selectedAnswer === option && option !== currentQuestion.correctAnswer && (
                              <XCircle className="ml-auto h-5 w-5 text-red-500" />
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </RadioGroup>
                </CardContent>
                
                <CardFooter className="flex justify-between pt-6 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-muted-foreground">
                    Score: {score}/{currentQuestionIndex + (isChecked ? 1 : 0)}
                  </div>
                  <div className="flex gap-2">
                    {!isChecked ? (
                      <Button 
                        onClick={handleCheckAnswer} 
                        disabled={!selectedAnswer}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Check Answer
                      </Button>
                    ) : (
                      <Button 
                        onClick={handleNextQuestion}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {currentQuestionIndex < quizQuestions.length - 1 ? (
                          <>Next Question <ArrowRight className="ml-2 h-4 w-4" /></>
                        ) : (
                          <>Finish Quiz <CheckCircle className="ml-2 h-4 w-4" /></>
                        )}
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="shadow-lg border-blue-100 dark:border-blue-900 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: 0.2
                    }}
                    className="mx-auto bg-white dark:bg-gray-800 rounded-full w-20 h-20 flex items-center justify-center mb-4"
                  >
                    <Award className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                  </motion.div>
                  <CardTitle className="text-2xl text-white">Quiz Completed!</CardTitle>
                </div>
                
                <CardContent className="pt-8">
                  <motion.div
                    className="flex flex-col items-center justify-center space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <div className="text-5xl font-bold text-blue-600 dark:text-blue-400">
                      {score}/{quizQuestions.length}
                    </div>
                    <p className="text-xl font-medium text-gray-800 dark:text-gray-200">
                      {getScoreFeedback()}
                    </p>
                    <div className="w-full max-w-md mx-auto mt-4">
                      <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-full">
                        <motion.div
                          className="h-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                          style={{ width: '0%' }}
                          animate={{ width: `${(score / quizQuestions.length) * 100}%` }}
                          transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
                        ></motion.div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      {Math.round((score / quizQuestions.length) * 100)}% Accuracy
                    </p>
                  </motion.div>
                </CardContent>

                <CardFooter className="flex flex-col sm:flex-row gap-3 pt-6 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    onClick={startQuiz} // Re-uses startQuiz with the same selections
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
                    variant="default"
                  >
                    <Sparkles className="mr-2 h-4 w-4" /> Take Quiz Again
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleRestartQuiz} // Goes back to category selection
                    className="w-full sm:w-auto border-blue-200 text-blue-700 hover:bg-blue-50"
                  >
                    Choose Different Category/Rows
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HiraganaQuiz;