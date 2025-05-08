import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Check, ChevronDown, ChevronUp, HelpCircle, BookOpenText, Sparkles,
    GraduationCap, Leaf, Sprout, Languages, ListChecks, X, Lightbulb, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Import the new data files and types
import { beginnerReadingExercises } from '../lib/beginnerReadingExercises';
import { intermediateReadingExercises } from '../lib/intermediateReadingExercises';
import { advancedReadingExercises } from '../lib/advancedReadingExercises';
import type { ReadingExercise, VocabularyItem, Question } from '../lib/readingTypes';

// --- Define Types ---
// VocabularyItem, Question, ReadingExercise are now imported.
// Local definitions for these three types are removed.

type ProgressState = { beginner: number; intermediate: number; advanced: number };
type AnsweredQuestionsState = { [key: string]: { selected: number; correct: boolean } };
type ShowInfoState = { [key: string]: boolean };
type Level = 'beginner' | 'intermediate' | 'advanced'; // Explicitly define Level enum/union type

// --- Framer Motion Variants ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const cardHoverVariants = {
    hover: { scale: 1.01, transition: { duration: 0.2 } },
};

// --- Helper function to render Japanese text with Furigana ---
function renderJapaneseWithFurigana(text: string): React.ReactNode[] {
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    const regex = /([^()\s]+)\(([^()]+)\)/g;
    let match;

    while ((match = regex.exec(text)) !== null) {
        const kanji = match[1];
        const reading = match[2];
        const startIndex = match.index;
        const endIndex = regex.lastIndex;

        if (startIndex > lastIndex) {
            parts.push(text.substring(lastIndex, startIndex));
        }

        parts.push(
            <ruby key={`ruby-${startIndex}-${kanji}-${reading}`}>
                {kanji}
                <rt>{reading}</rt>
            </ruby>
        );

        lastIndex = endIndex;
    }

    if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
    }

     if (parts.length === 0 && text.length > 0) {
         return [text];
     }
     if (text.length === 0) {
        return [''];
     }
    return parts;
}

// This is the new combined exercises object using imports
const readingExercises: Record<Level, ReadingExercise[]> = {
    beginner: beginnerReadingExercises,
    intermediate: intermediateReadingExercises,
    advanced: advancedReadingExercises,
};

const Reading: React.FC = () => {
    // --- State Initialization ---
    const [activeTab, setActiveTab] = useState<Level>('beginner');
    const [expandedText, setExpandedText] = useState<string | null>(null);
    const [showTranslation, setShowTranslation] = useState<ShowInfoState>({});
    const [showVocabulary, setShowVocabulary] = useState<ShowInfoState>({});
    // New state for toggling question/option translations per exercise
    const [showQuestionTranslation, setShowQuestionTranslation] = useState<ShowInfoState>({});
    const [answeredQuestions, setAnsweredQuestions] = useState<AnsweredQuestionsState>({});
    const [progress, setProgress] = useState<ProgressState>({ beginner: 0, intermediate: 0, advanced: 0 });

    // --- Level Icons ---
    const levelIcons: Record<Level, React.ReactNode> = {
        beginner: <Sprout className="mr-2 h-5 w-5 text-green-500 dark:text-green-400" />,
        intermediate: <Leaf className="mr-2 h-5 w-5 text-yellow-600 dark:text-yellow-500" />,
        advanced: <GraduationCap className="mr-2 h-5 w-5 text-indigo-600 dark:text-indigo-500" />,
    };

    // --- Helper function to toggle exercise section visibility ---
    const toggleTextExpansion = (id: string) => {
        setExpandedText(prev => (prev === id ? null : id));
         // Close other sections when expanding/collapsing the main text
        if (expandedText !== id) { // Only hide if a different one is being opened, or if this one is being closed
             setShowTranslation(prev => ({ ...prev, [id]: false }));
             setShowVocabulary(prev => ({ ...prev, [id]: false }));
             setShowQuestionTranslation(prev => ({ ...prev, [id]: false }));
        } else { // If collapsing the current one
             setShowTranslation(prev => ({ ...prev, [id]: false }));
             setShowVocabulary(prev => ({ ...prev, [id]: false }));
             setShowQuestionTranslation(prev => ({ ...prev, [id]: false }));
        }
    };

    // --- Helper function to toggle Translation, Vocabulary, or Question Translation visibility ---
    const toggleInfo = (id: string, type: 'translation' | 'vocabulary' | 'questionTranslation') => {
        if (type === 'translation') {
            setShowTranslation(prev => ({ ...prev, [id]: !prev[id] }));
        } else if (type === 'vocabulary') {
            setShowVocabulary(prev => ({ ...prev, [id]: !prev[id] }));
        } else if (type === 'questionTranslation') {
             // Toggle specifically for the question translation state
            setShowQuestionTranslation(prev => ({ ...prev, [id]: !prev[id] }));
        }
    };


    // --- Helper function to update progress for a specific level ---
    const updateProgress = (level: Level) => {
        const exercises = readingExercises[level];
        // Filter out exercises or questions that might not have questions defined
        const allLevelQuestions = exercises.flatMap(ex => ex.questions || []);
        const totalQuestions = allLevelQuestions.length;

        if (totalQuestions === 0) {
             setProgress(prev => ({ ...prev, [level]: 0 }));
             return;
        }

        let answeredCorrectlyCount = 0;
        allLevelQuestions.forEach(q => {
            if (answeredQuestions[q.id]?.correct) {
                answeredCorrectlyCount++;
            }
        });

        setProgress(prev => ({
            ...prev,
            [level]: Math.round((answeredCorrectlyCount / totalQuestions) * 100)
        }));
    };

    // --- Effect to update progress when answers or active tab change ---
    useEffect(() => {
        updateProgress(activeTab);
    }, [activeTab, answeredQuestions, readingExercises]); // Added readingExercises as dependency just in case, though it's static

     // --- Handle user answer selection ---
    const handleAnswer = (exerciseId: string, questionId: string, selectedOptionIndex: number, question: Question) => {
        // Prevent changing answer if already answered
        if (answeredQuestions[questionId] !== undefined) {
            return;
        }

        const isCorrect = selectedOptionIndex === question.answer;
        setAnsweredQuestions(prev => ({
            ...prev,
            [questionId]: { selected: selectedOptionIndex, correct: isCorrect }
        }));
         // No need to call updateProgress here, the useEffect will handle it.
    };

    // --- Component Render ---
    return (
        <Layout>
            <TooltipProvider>
                <motion.div
                    className="container mx-auto py-10 px-4"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    {/* Header */}
                    <motion.div variants={itemVariants} className="mb-8 text-center">
                        <div className="inline-flex items-center justify-center bg-gradient-to-r from-primary via-blue-500 to-purple-600 p-1 rounded-lg shadow-lg mb-4">
                            <BookOpenText className="h-10 w-10 text-white mx-3" />
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tight mb-2 text-gray-900 dark:text-gray-100">
                            Japanese Reading Practice
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            Improve your reading skills and boost your comprehension
                        </p>
                    </motion.div>

                    {/* Instructions */}
                    <motion.div variants={itemVariants} className="mb-8">
                        <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700">
                            <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            <AlertTitle className="text-blue-800 dark:text-blue-300">How to Use</AlertTitle>
                            <AlertDescription className="text-blue-700 dark:text-blue-400">
                                Select a level (Beginner, Intermediate, Advanced). Click on an exercise card title area to expand it. Read the text (now in Kana only), check vocabulary and text translation using the icons. For questions, answer by clicking an option. Use the globe icon next to the questions section to toggle question and option translations. Your progress is tracked per level.
                            </AlertDescription>
                        </Alert>
                    </motion.div>

                    {/* Main Content Area */}
                    <motion.div variants={itemVariants}>
                        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as Level)} className="w-full">
                            {/* Level Tabs */}
                            <TabsList className="grid w-full grid-cols-3 mb-8 rounded-lg p-1 bg-gray-100 dark:bg-gray-800 shadow-inner">
                                {(Object.keys(readingExercises) as Level[]).map((level) => (
                                    <TabsTrigger
                                        key={level}
                                        value={level}
                                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-2.5 text-sm sm:text-base font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md hover:bg-gray-200 dark:hover:bg-gray-700 data-[state=active]:hover:bg-primary/90"
                                    >
                                        {levelIcons[level]}
                                        <span className="capitalize mr-1">{level}</span>
                                        (<span className="text-xs">{progress[level]}%</span>)
                                    </TabsTrigger>
                                ))}

                            </TabsList>

                            {/* Tab Content */}
                            <AnimatePresence mode="wait">
                                {(Object.keys(readingExercises) as Level[]).map((level) => (
                                    activeTab === level && (
                                        <motion.div
                                            key={level}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="space-y-8"
                                        >
                                            {/* Level Progress Header */}
                                            <motion.div
                                                variants={itemVariants}
                                                className="flex flex-wrap items-center justify-between gap-4 mb-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-4 rounded-lg shadow"
                                            >
                                                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                                                    {levelIcons[level]}
                                                    {level === 'beginner' ? '初級レベル' : level === 'intermediate' ? '中級レベル' : '上級レベル'}
                                                    <span className="text-sm ml-2 capitalize text-gray-500 dark:text-gray-400">({level})</span>
                                                </h2>
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Progress:</span>
                                                    <Progress value={progress[level]} className="w-32 sm:w-48 h-2.5" />
                                                    <span className="text-sm font-bold text-primary dark:text-primary-light">{progress[level]}%</span>
                                                </div>
                                            </motion.div>

                                            {/* Exercise Cards */}
                                            {readingExercises[level].map((exercise) => (
                                                <motion.div
                                                    key={exercise.id}
                                                    variants={itemVariants}
                                                    whileHover="hover"
                                                >
                                                    <motion.div variants={cardHoverVariants}>
                                                        <Card className="overflow-hidden border dark:border-gray-700 shadow-sm hover:shadow-lg transition-shadow duration-300">
                                                            {/* Card Header - Made clickable to expand */}
                                                             <CardHeader className="bg-gray-50 dark:bg-gray-800/50 p-4 border-b dark:border-gray-700 cursor-pointer" onClick={() => toggleTextExpansion(exercise.id)}>
                                                                <div className="flex flex-wrap justify-between items-start gap-2">
                                                                    <div className="flex-grow mr-4">
                                                                        <CardTitle className="text-xl font-semibold text-pink-700 dark:text-pink-500 mb-1">{exercise.title}</CardTitle>
                                                                        <CardDescription className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                                            <Tooltip>
                                                                                <TooltipTrigger asChild>
                                                                                    <Badge variant="outline" className="mr-2 cursor-default border-pink-700/50 text-pink-700 dark:border-pink-500/50 dark:text-pink-500">
                                                                                        {exercise.level}
                                                                                    </Badge>
                                                                                </TooltipTrigger>
                                                                                <TooltipContent><p>{exercise.levelDescription} Level</p></TooltipContent>
                                                                            </Tooltip>
                                                                            JLPT {exercise.level} Equivalent
                                                                        </CardDescription>
                                                                    </div>
                                                                    {/* Toggle icons are now inside the expanded content, or removed from header if preferred */}
                                                                    {/* Removing icons from header to keep it cleaner and using the expansion click */}
                                                                     <div className="flex items-center flex-shrink-0 text-gray-500 dark:text-gray-400">
                                                                         {expandedText === exercise.id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                                                                     </div>
                                                                </div>
                                                            </CardHeader>

                                                            {/* Collapsible Content Area */}
                                                            <AnimatePresence>
                                                                {expandedText === exercise.id && (
                                                                    <motion.div
                                                                        initial={{ height: 0, opacity: 0 }}
                                                                        animate={{ height: 'auto', opacity: 1 }}
                                                                        exit={{ height: 0, opacity: 0 }}
                                                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                                                        className="overflow-hidden"
                                                                    >
                                                                        <CardContent className="p-5 space-y-6">
                                                                             {/* Text and Info Toggles */}
                                                                             <div className="flex flex-wrap items-center justify-end gap-2 mb-4">
                                                                                 <Tooltip>
                                                                                     <TooltipTrigger asChild>
                                                                                         <Button variant="outline" size="sm" className={`h-8 ${showTranslation[exercise.id] ? 'bg-blue-100 dark:bg-blue-900/50' : ''}`} onClick={() => toggleInfo(exercise.id, 'translation')}>
                                                                                             <Languages className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                                                                                             Translation
                                                                                         </Button>
                                                                                     </TooltipTrigger>
                                                                                     <TooltipContent><p>Toggle Text Translation</p></TooltipContent>
                                                                                 </Tooltip>
                                                                                 <Tooltip>
                                                                                     <TooltipTrigger asChild>
                                                                                         <Button variant="outline" size="sm" className={`h-8 ${showVocabulary[exercise.id] ? 'bg-green-100 dark:bg-green-900/50' : ''}`} onClick={() => toggleInfo(exercise.id, 'vocabulary')}>
                                                                                             <ListChecks className="mr-2 h-4 w-4 text-green-600 dark:text-green-400" />
                                                                                             Vocabulary
                                                                                         </Button>
                                                                                     </TooltipTrigger>
                                                                                     <TooltipContent><p>Toggle Vocabulary</p></TooltipContent>
                                                                                 </Tooltip>
                                                                             </div>

                                                                            {/* Reading Text */}
                                                                            <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none bg-gray-50 dark:bg-gray-800 p-4 rounded-md border-l-4 border-primary dark:border-primary-light">
                                                                              <p className="text-lg xl:text-xl leading-relaxed font-jp font-semibold" lang="ja" style={{ whiteSpace: 'pre-wrap' }}>
                                                                                    {/* Render text with Furigana - will output plain kana here */}
                                                                                    {renderJapaneseWithFurigana(exercise.text)}
                                                                                </p>
                                                                            </div>

                                                                            {/* Translation */}
                                                                            <AnimatePresence>
                                                                                {showTranslation[exercise.id] && (
                                                                                    <motion.div
                                                                                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
                                                                                        className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-md border border-blue-200 dark:border-blue-700"
                                                                                    >
                                                                                        <h4 className="font-semibold mb-2 text-blue-800 dark:text-blue-300 flex items-center"><Languages className="h-4 w-4 mr-2" />Translation</h4>
                                                                                        <p className="text-sm text-blue-700 dark:text-blue-400">{exercise.translation}</p>
                                                                                    </motion.div>
                                                                                )}
                                                                            </AnimatePresence>

                                                                            {/* Vocabulary */}
                                                                             <AnimatePresence>
                                                                                {showVocabulary[exercise.id] && (
                                                                                    <motion.div
                                                                                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
                                                                                        className="p-4 bg-green-50 dark:bg-green-900/30 rounded-md border border-green-200 dark:border-green-700"
                                                                                    >
                                                                                        <h4 className="font-semibold mb-3 text-green-800 dark:text-green-300 flex items-center"><ListChecks className="h-4 w-4 mr-2" />Vocabulary</h4>
                                                                                        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 text-sm">
                                                                                            {exercise.vocabulary.map((vocab, index) => (
                                                                                                <motion.li key={`${exercise.id}-vocab-${index}`}
                                                                                                    className="border-b border-green-200 dark:border-green-800 py-1"
                                                                                                    whileHover={{ x: 3, color: 'rgb(22 163 74)' }} // Tailwind green-600 equivalent
                                                                                                >
                                                                                                    <span className="font-medium text-green-700 dark:text-green-300">{vocab.word}</span> ({vocab.reading})
                                                                                                    <span className="text-green-600 dark:text-green-400"> – {vocab.meaning}</span>
                                                                                                </motion.li>
                                                                                            ))}
                                                                                        </ul>
                                                                                    </motion.div>
                                                                                )}
                                                                             </AnimatePresence>

                                                                            {/* Comprehension Questions */}
                                                                            {(exercise.questions && exercise.questions.length > 0) && (
                                                                                <div className="mt-6 bg-white dark:bg-gray-800/60 p-4 rounded-lg shadow-inner">
                                                                                    <div className="flex items-center justify-between mb-4">
                                                                                        <h3 className="text-lg font-medium flex items-center text-gray-800 dark:text-gray-200">
                                                                                            <HelpCircle className="mr-2 h-5 w-5 text-primary dark:text-primary-light" />
                                                                                            Comprehension Check (理解度チェック)
                                                                                        </h3>
                                                                                        {/* Question/Option Translation Toggle Button */}
                                                                                        <Tooltip>
                                                                                            <TooltipTrigger asChild>
                                                                                                <Button variant="ghost" size="icon" className={`h-8 w-8 text-purple-600 hover:bg-purple-100 dark:text-purple-400 dark:hover:bg-purple-900/50 ${showQuestionTranslation[exercise.id] ? 'bg-purple-100 dark:bg-purple-900/50' : ''}`} onClick={() => toggleInfo(exercise.id, 'questionTranslation')}>
                                                                                                    <Languages className="h-5 w-5" />
                                                                                                </Button>
                                                                                            </TooltipTrigger>
                                                                                            <TooltipContent><p>Toggle Question/Option Translation</p></TooltipContent>
                                                                                        </Tooltip>
                                                                                    </div>
                                                                                    {/* Removed defaultValue to prevent auto-opening the first question */}
                                                                                    <Accordion type="single" collapsible className="w-full">
                                                                                        {exercise.questions.map((question, qIndex) => {
                                                                                            const answerState = answeredQuestions[question.id];
                                                                                            const isAnswered = answerState !== undefined;

                                                                                            return (
                                                                                                <AccordionItem key={question.id} value={question.id} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                                                                                                    <AccordionTrigger className="text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 px-3 py-3 rounded-md text-base [&[data-state=open]]:bg-gray-50 dark:[&[data-state=open]]:bg-gray-700/50">
                                                                                                        <div className="flex items-center justify-between w-full">
                                                                                                            {/* Question text */}
                                                                                                            <span className="font-semibold"> {/* Apply boldness here */}
                                                                                                                {`Q${qIndex + 1}: `}
                                                                                                                {/* Render question text with Furigana */}
                                                                                                                {renderJapaneseWithFurigana(question.question)}
                                                                                                                {/* Conditionally render English translation */}
                                                                                                                {showQuestionTranslation[exercise.id] && question.question_en && (
                                                                                                                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 font-normal">({question.question_en})</span>
                                                                                                                )}
                                                                                                            </span>
                                                                                                            {/* Icon indicating answer status */}
                                                                                                            {isAnswered && (
                                                                                                                answerState.correct ?
                                                                                                                    <Check className="ml-2 h-5 w-5 text-green-500 flex-shrink-0" /> :
                                                                                                                    <X className="ml-2 h-5 w-5 text-red-500 flex-shrink-0" />
                                                                                                            )}
                                                                                                        </div>
                                                                                                    </AccordionTrigger>
                                                                                                    <AccordionContent className="px-3 pt-3 pb-4">
                                                                                                        <div className="space-y-2">
                                                                                                            {question.options.map((option, optionIndex) => {
                                                                                                                const isAnswered = answeredQuestions[question.id] !== undefined;
                                                                                                                const answerState = answeredQuestions[question.id];
                                                                                                                const isSelected = isAnswered && answerState.selected === optionIndex;
                                                                                                                const isCorrectAnswer = optionIndex === question.answer;

                                                                                                                let buttonVariant: "default" | "destructive" | "outline" | "secondary" = "outline";
                                                                                                                let buttonClass = "justify-start w-full text-left h-auto py-2 px-3 whitespace-normal flex items-center text-sm sm:text-base";
                                                                                                                let IconComponent = null;

                                                                                                                if (isAnswered) {
                                                                                                                    if (isSelected) {
                                                                                                                        buttonVariant = isCorrectAnswer ? "default" : "destructive";
                                                                                                                        buttonClass += isCorrectAnswer
                                                                                                                            ? " bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-800 border-transparent"
                                                                                                                            : " bg-red-600 hover:bg-red-700 text-white dark:bg-red-700 dark:hover:bg-red-800 border-transparent";
                                                                                                                        IconComponent = isCorrectAnswer ? <Check className="h-4 w-4 mr-2 flex-shrink-0"/> : <X className="h-4 w-4 mr-2 flex-shrink-0"/>;
                                                                                                                    } else if (isCorrectAnswer) {
                                                                                                                        buttonVariant = "outline";
                                                                                                                        buttonClass += " border-green-500 text-green-700 dark:border-green-600 dark:text-green-400 bg-green-50/50 dark:bg-green-900/20";
                                                                                                                        IconComponent = <Check className="h-4 w-4 mr-2 text-green-500 flex-shrink-0"/>;
                                                                                                                    } else {
                                                                                                                        buttonClass += " text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 opacity-70";
                                                                                                                        buttonVariant = "outline";
                                                                                                                    }
                                                                                                                } else {
                                                                                                                    buttonClass += " hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-primary transition-colors duration-150"
                                                                                                                    buttonVariant = "outline";
                                                                                                                }

                                                                                                                return (
                                                                                                                    <Button
                                                                                                                        key={`${question.id}-opt-${optionIndex}`}
                                                                                                                        variant={buttonVariant}
                                                                                                                        className={buttonClass}
                                                                                                                        disabled={isAnswered}
                                                                                                                        onClick={() => handleAnswer(exercise.id, question.id, optionIndex, question)}
                                                                                                                    >
                                                                                                                        {IconComponent}
                                                                                                                        <span className="flex-1 font-semibold"> {/* Apply boldness here */}
                                                                                                                            {/* Render option text with Furigana */}
                                                                                                                            {renderJapaneseWithFurigana(option)}
                                                                                                                            {/* Conditionally render English translation */}
                                                                                                                            {showQuestionTranslation[exercise.id] && question.options_en && question.options_en[optionIndex] && (
                                                                                                                                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 font-normal">({question.options_en[optionIndex]})</span>
                                                                                                                            )}
                                                                                                                        </span>
                                                                                                                    </Button>
                                                                                                                );
                                                                                                            })}
                                                                                                        </div>
                                                                                                        {/* Explanation Area */}
                                                                                                        <AnimatePresence>
                                                                                                            {isAnswered && (
                                                                                                                <motion.div
                                                                                                                    initial={{ opacity: 0, y: 10 }}
                                                                                                                    animate={{ opacity: 1, y: 0 }}
                                                                                                                    exit={{ opacity: 0, y: 10 }}
                                                                                                                    transition={{ duration: 0.2 }}
                                                                                                                >
                                                                                                                    <Alert className={`mt-4 ${answerState.correct ? 'border-green-200 bg-green-50 dark:border-green-700 dark:bg-green-900/30' : 'border-red-200 bg-red-50 dark:border-red-700 dark:bg-red-900/30'}`}>
                                                                                                                        <Lightbulb className={`h-4 w-4 ${answerState.correct ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} />
                                                                                                                        <AlertTitle className={`${answerState.correct ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}`}>
                                                                                                                            {answerState.correct ? 'Correct!' : 'Incorrect'}
                                                                                                                        </AlertTitle>
                                                                                                                        <AlertDescription className={`text-sm ${answerState.correct ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                                                                                                                            {/* Use pre-wrap to respect \n for multi-line explanations */}
                                                                                                                            {/* Ensure explanation is rendered with furigana */}
                                                                                                                            <p style={{ whiteSpace: 'pre-wrap' }}>
                                                                                                                                {question.explanation ?
                                                                                                                                    renderJapaneseWithFurigana(question.explanation)
                                                                                                                                    : (answerState.correct ? 'Well done!' : `The correct answer was: ${renderJapaneseWithFurigana(question.options[question.answer])}`)
                                                                                                                                }
                                                                                                                            </p>
                                                                                                                        </AlertDescription>
                                                                                                                    </Alert>
                                                                                                                </motion.div>
                                                                                                            )}
                                                                                                        </AnimatePresence>
                                                                                                    </AccordionContent>
                                                                                                </AccordionItem>
                                                                                            );
                                                                                        })}
                                                                                    </Accordion>
                                                                                </div>
                                                                            )}
                                                                        </CardContent>
                                                                    </motion.div>
                                                                )}
                                                            </AnimatePresence>

                                                            {/* Card Footer - Remains the expand/collapse button */}
                                                            <CardFooter className="bg-gray-50 dark:bg-gray-800/50 p-3 border-t dark:border-gray-700 flex justify-end">
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="text-sm text-pink-700 hover:bg-pink-700/10 dark:text-pink-500 dark:hover:bg-pink-700/20"
                                                                    onClick={() => toggleTextExpansion(exercise.id)}
                                                                >
                                                                    {expandedText === exercise.id ? '閉じる (Close)' : '続きを読む (Read More)'}
                                                                    {expandedText === exercise.id ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
                                                                </Button>
                                                            </CardFooter>
                                                        </Card>
                                                    </motion.div>
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    )
                                ))}
                            </AnimatePresence>

                        </Tabs>
                    </motion.div>
                </motion.div>
            </TooltipProvider>
        </Layout>
    );
};

export default Reading;