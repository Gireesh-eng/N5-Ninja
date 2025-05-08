import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Award, TimerIcon, Sparkles, ArrowRight, Loader2, Play, Volume2 } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import confetti from 'canvas-confetti';
import { scriptDataService, QuizQuestion, CharacterCategory } from '@/lib/ScriptDataService';

interface ExtendedQuizQuestion extends QuizQuestion {
  reading?: string;
}

const KanjiQuiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<ExtendedQuizQuestion[]>([]);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CharacterCategory>('N5');
  const [categories, setCategories] = useState<string[]>([]);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [quizCount, setQuizCount] = useState(10);

  // Load available categories
  useEffect(() => {
    async function loadCategories() {
      try {
        const cats = await scriptDataService.getKanjiCategories();
        setCategories(['all', ...cats]);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to load kanji categories:", err);
        setError("Failed to load categories. Please refresh the page and try again.");
        setIsLoading(false);
      }
    }

    // Initialize audio
    const audioElement = new Audio();
    setAudio(audioElement);

    loadCategories();

    return () => {
      if (audioElement) {
        audioElement.pause();
      }
    };
  }, []);

  // Start quiz with selected category
  const startQuiz = async () => {
    setIsLoading(true);
    try {
      const questions = await scriptDataService.getKanjiQuizQuestions(quizCount, selectedCategory);
      if (questions.length === 0) {
        setError(`No kanji characters found in the "${selectedCategory}" category. Please select a different category.`);
        setIsLoading(false);
        return;
      }
      
      // Enhance questions with readings from the kanji data
      const kanjiData = await scriptDataService.getKanji();
      const enhancedQuestions = questions.map(question => {
        const kanjiInfo = kanjiData.find(k => k.char === question.character);
        return {
          ...question,
          reading: kanjiInfo ? `${kanjiInfo.onyomi || ''} ${kanjiInfo.kunyomi || ''}`.trim() : undefined
        };
      });
      
      setQuizQuestions(enhancedQuestions);
      setCurrentQuestionIndex(0);
      setScore(0);
      setSelectedAnswer(null);
      setIsChecked(false);
      setIsQuizComplete(false);
      setIsQuizStarted(true);
      setIsLoading(false);
    } catch (err) {
      console.error("Failed to load kanji quiz data:", err);
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
      
      // Play sound for the character if available
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

  // Play audio for current kanji if available
  const playAudio = () => {
    if (audio && currentQuestion?.audioPath) {
      audio.src = currentQuestion.audioPath;
      audio.play().catch(e => console.error("Error playing audio:", e));
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
    
    if (percentage >= 90) return "Excellent! You're a kanji master!";
    if (percentage >= 70) return "Great job! You're getting good at kanji!";
    if (percentage >= 50) return "Good effort! Keep practicing your kanji.";
    return "You're on your way to learning kanji. Keep practicing!";
  };

  // Category name formatter
  const formatCategoryName = (category: string) => {
    if (category === 'all') return 'All Kanji';
    return category.toUpperCase();
  };

  // Button for each character group
  const CategoryButton = ({ category }: { category: string }) => (
    <Button
      variant={selectedCategory === category ? "default" : "outline"}
      className={`
        w-full text-lg py-6 font-medium transition-all duration-300 transform
        ${selectedCategory === category 
          ? "bg-red-600 hover:bg-red-700 text-white shadow-md scale-105" 
          : "bg-white hover:bg-red-50 text-red-600 border-red-200 hover:border-red-300"
        }
      `}
      onClick={() => setSelectedCategory(category)}
    >
      {formatCategoryName(category)}
    </Button>
  );

  // Display loading state
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-red-600 mb-4" />
          <p className="text-lg text-gray-700 dark:text-gray-300">Loading Kanji Quiz...</p>
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
                setSelectedCategory('N5');
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
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="border-red-100 dark:border-red-900 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-red-500 to-amber-600 p-6">
                <h1 className="text-3xl font-bold text-white">Kanji Quiz</h1>
                <p className="text-red-100 mt-2">Test your kanji knowledge with this interactive quiz!</p>
              </div>
              
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                  Select JLPT Level
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                  {categories.map((category) => (
                    <CategoryButton key={category} category={category} />
                  ))}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-4">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                    Quiz Options
                  </h2>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Number of Questions:
                    </label>
                    <div className="flex gap-3">
                      {[5, 10, 15, 20].map(num => (
                        <Button 
                          key={num} 
                          variant={quizCount === num ? "default" : "outline"}
                          onClick={() => setQuizCount(num)}
                          className={quizCount === num ? "bg-red-600" : ""}
                        >
                          {num}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="bg-gray-50 dark:bg-gray-800/50 p-6 border-t border-gray-200 dark:border-gray-700">
                <Button 
                  onClick={startQuiz} 
                  className="w-full bg-red-600 hover:bg-red-700 text-lg py-6"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Start Quiz with {formatCategoryName(selectedCategory)} Kanji
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
              <Card className="shadow-lg border-red-100 dark:border-red-900 overflow-hidden">
                <CardHeader className="text-center bg-gradient-to-r from-red-500 to-amber-600 text-white">
                  <Badge variant="outline" className="mb-2 mx-auto py-1 px-4 border-red-200 text-red-50">
                    {formatCategoryName(selectedCategory)} Level
                  </Badge>
                  <CardTitle className="text-2xl mb-2 text-white">Kanji Quiz</CardTitle>
                  <CardDescription className="text-md text-red-100">
                    Question {currentQuestionIndex + 1} of {quizQuestions.length}
                  </CardDescription>
                  <div className="mt-2">
                    <Progress 
                      value={((currentQuestionIndex + 1) / quizQuestions.length) * 100} 
                      className="h-2 bg-red-400/30" 
                    />
                  </div>
                </CardHeader>
                
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-8">
                    <motion.div 
                      className="text-8xl font-bold h-36 w-36 flex items-center justify-center bg-red-50 dark:bg-red-900/20 rounded-xl shadow-inner relative"
                      initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                      }}
                    >
                      {currentQuestion?.character}
                      {currentQuestion?.audioPath && (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="absolute -bottom-3 -right-3 bg-white dark:bg-gray-800 shadow hover:bg-red-100"
                          onClick={playAudio}
                        >
                          <Volume2 className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                        </Button>
                      )}
                    </motion.div>
                  </div>
                  
                  {currentQuestion?.reading && (
                    <motion.div 
                      className="text-center mb-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="text-sm inline-block bg-gray-100 dark:bg-gray-800 rounded-md px-3 py-1 text-gray-600 dark:text-gray-300 font-japanese">
                        Reading: {currentQuestion.reading}
                      </div>
                    </motion.div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-medium">What does this kanji mean?</h3>
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
                                  : "bg-red-50 border-red-400 dark:bg-red-900/20 dark:border-red-400"
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
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Check Answer
                      </Button>
                    ) : (
                      <Button 
                        onClick={handleNextQuestion}
                        className="bg-red-600 hover:bg-red-700"
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
              <Card className="shadow-lg border-red-100 dark:border-red-900 overflow-hidden">
                <div className="bg-gradient-to-r from-red-500 to-amber-600 p-6 text-center">
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
                    <Award className="h-10 w-10 text-red-600 dark:text-red-400" />
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
                    <div className="text-5xl font-bold text-red-600 dark:text-red-400">
                      {score}/{quizQuestions.length}
                    </div>
                    <p className="text-xl font-medium text-gray-800 dark:text-gray-200">
                      {getScoreFeedback()}
                    </p>
                    <div className="w-full max-w-md mx-auto mt-4">
                      <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-full">
                        <motion.div 
                          className="h-4 rounded-full bg-gradient-to-r from-red-500 to-amber-500" 
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
                    onClick={startQuiz} 
                    className="w-full sm:w-auto bg-red-600 hover:bg-red-700"
                    variant="default"
                  >
                    <Sparkles className="mr-2 h-4 w-4" /> Take Quiz Again
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleRestartQuiz}
                    className="w-full sm:w-auto border-red-200 text-red-700 hover:bg-red-50"
                  >
                    Choose Different Level
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

export default KanjiQuiz;