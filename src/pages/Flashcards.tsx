import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Layout from '@/components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, RotateCw, Keyboard, Check, X, Lightbulb, Shuffle, Volume2, CheckCircle, XCircle, RotateCcw as RotateCcwIcon } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { FlashcardItem, FlashcardSetCollection, flashcardSets, flashcardCategories } from '@/lib/flashcardData'; // Added flashcardCategories
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AnimatedH1, AnimatedText, ShimmerText } from "@/components/ui/animated-text";
import { ShineBorder } from "@/components/ui/shine-border";
import { AuroraText } from "@/components/ui/aurora-text";

const FlashcardsPage: React.FC = () => {
  const [flipped, setFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("essential-phrases-greetings");
  const [studyMode, setStudyMode] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false); // Still relevant for study mode logic
  const [progress, setProgress] = useState(0);
  const [reviewedCards, setReviewedCards] = useState<{[key: number]: 'correct' | 'incorrect' | null}>({});
  const [isMounted, setIsMounted] = useState(false); // State to control intro animation

  const currentCards = flashcardSets[selectedCategory as keyof typeof flashcardSets] || [];
  const currentCard = currentCards[currentIndex];

  // --- Effects ---

  // Intro animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 100); // Short delay before starting animation
    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);


  // Update progress when cards are reviewed
  useEffect(() => {
    if (currentCards.length === 0) {
      setProgress(0);
      return;
    }
    const reviewedCount = Object.keys(reviewedCards).length;
    const progressValue = (reviewedCount / currentCards.length) * 100;
    setProgress(progressValue);
  }, [reviewedCards, currentCards.length]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent shortcuts from firing while typing in inputs/selects etc.
      if ((e.target as HTMLElement)?.tagName === 'INPUT' || (e.target as HTMLElement)?.tagName === 'SELECT' || (e.target as HTMLElement)?.tagName === 'TEXTAREA') {
        return;
      }

      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault(); // Prevent spacebar scrolling
        handleFlip();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (studyMode && (e.key === 'y' || e.key === 'Y' || e.key === 'n' || e.key === 'N')) {
        if (flipped) {
          const status = (e.key === 'y' || e.key === 'Y') ? 'correct' : 'incorrect';
          markCard(status);
          // Automatically move to next card after marking
          const timer = setTimeout(handleNext, 300);
          return () => clearTimeout(timer); // Cleanup if component unmounts quickly
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [flipped, studyMode, currentIndex, currentCards.length, reviewedCards]); // Added dependencies

  // --- Handlers ---

  const handleFlip = () => {
    setFlipped(!flipped);
    if (studyMode && !flipped) {
      setShowAnswer(true); // Show answer immediately when flipping in study mode
    }
  };

  const handleNext = () => {
    setFlipped(false);
    setShowAnswer(false);
    // Find the next *unreviewed* card in study mode if progress isn't 100%
    if (studyMode && progress < 100) {
        let nextIndex = (currentIndex + 1) % currentCards.length;
        let attempts = 0;
        while (reviewedCards[nextIndex] && attempts < currentCards.length) {
            nextIndex = (nextIndex + 1) % currentCards.length;
            attempts++;
        }
         // If all remaining cards are reviewed, just cycle normally
        if (attempts === currentCards.length - Object.keys(reviewedCards).length) {
             setCurrentIndex((prevIndex) => (prevIndex + 1) % currentCards.length);
        } else {
            setCurrentIndex(nextIndex);
        }
    } else {
        // Normal mode or all cards reviewed: just go to the next sequential card
        setCurrentIndex((prevIndex) => (prevIndex + 1) % currentCards.length);
    }
  };

  const handlePrev = () => {
    setFlipped(false);
    setShowAnswer(false);
     // In study mode, previous might not make sense if focusing on unreviewed,
     // but for simplicity let's keep the standard sequential behavior.
    setCurrentIndex((prevIndex) => (prevIndex - 1 + currentCards.length) % currentCards.length);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentIndex(0);
    setFlipped(false);
    setShowAnswer(false);
    setReviewedCards({});
    setProgress(0);
    // Optionally reset mount state to re-trigger animation on category change, though usually not desired
    // setIsMounted(false);
    // setTimeout(() => setIsMounted(true), 50);
  };

  const markCard = (status: 'correct' | 'incorrect') => {
     // Only mark if the card hasn't been marked yet OR allow re-marking
     // Let's allow re-marking for simplicity
    setReviewedCards(prev => ({
      ...prev,
      [currentIndex]: status
    }));
  };

  const resetProgress = () => {
    setReviewedCards({});
    setProgress(0);
    setCurrentIndex(0); // Go back to the first card
    setFlipped(false);
    setShowAnswer(false);
  };

  // --- Helper Functions ---
  const getCategoryDisplayName = (key: string) => {
     // Keep your existing getCategoryDisplayName logic
    const names: {[key: string]: string} = {
      'essential-phrases-greetings': 'Essential Phrases & Greetings',
      'question-words-pronouns': 'Question Words & Pronouns',
      // Add display names for other categories as you add them
      'people-family-titles': 'People, Family & Titles',
      'numbers-counters-money': 'Numbers, Counters & Money',
      'time-dates-frequency': 'Time, Dates & Frequency',
      'location-direction': 'Location & Direction',
      'common-verbs': 'Common Verbs',
      'common-adjectives': 'Common Adjectives',
      'food-drink': 'Food & Drink',
      'everyday-objects': 'Everyday Objects',
      'home-living': 'Home & Living',
      'places-buildings-public': 'Places & Buildings (Public)',
      'transportation': 'Transportation',
      'school-study': 'School & Study',
      'hobbies-art-media': 'Hobbies, Art & Media',
      'clothing-accessories': 'Clothing & Accessories',
      'body-health': 'Body & Health',
      'nature-weather': 'Nature & Weather',
      'language-communication': 'Language & Communication',
      'other-useful-words': 'Other Useful Words',
    };
    return names[key] || key.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };
  // --- Render ---
  return (
    <Layout>
      <div className={`section-container transition-opacity duration-700 ease-in ${isMounted ? 'opacity-100' : 'opacity-0'}`}>

        {/* Centered Title and Description */}
        <div className="text-center mb-8 relative">
          <AnimatedH1 className="text-[33px] mb-2 tracking-tight">
            <AuroraText 
              gradient="from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400" 
              duration={6}
              className="font-bold"
            >
              Flashcards
            </AuroraText>
          </AnimatedH1>
          
          <p className="text-[18px] mb-8 font-['Poppins','Noto_Sans_JP',sans-serif] max-w-3xl mx-auto animate-fade-in-up animation-delay-200 text-gray-700 dark:text-gray-300">
            Practice and memorize Japanese vocabulary with our interactive flashcards.
            Click on a card to flip and see the translation.
          </p>
        </div>

        {/* Animate Controls Section */}
        <div className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 transition-all duration-500 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} delay-300`}>
          <div className="w-full md:w-1/2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Select Category
            </label>
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(flashcardSets).map(key => (
                   <SelectItem key={key} value={key}>
                     {getCategoryDisplayName(key)}
                   </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2 pt-4 md:pt-0 self-start md:self-center">
            <Switch
              id="study-mode"
              checked={studyMode}
              onCheckedChange={(checked) => {
                setStudyMode(checked);
                // Reset flip state when toggling study mode for consistency
                setFlipped(false);
                setShowAnswer(false);
              }}
            />
            <Label htmlFor="study-mode">Study Mode</Label>
          </div>
        </div>

        {/* Animate Progress Bar Section */}
        <div className={`mb-4 transition-all duration-500 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} delay-[400ms]`}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Progress</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">{currentCards.length > 0 ? `${Object.keys(reviewedCards).length} / ${currentCards.length}` : '0 / 0'} ({Math.round(progress)}%)</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Animate Flashcard Area */}
        <div className={`flex flex-col items-center justify-center mb-8 transition-all duration-700 ease-out ${isMounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'} delay-[500ms]`}>
          {currentCards.length > 0 && currentCard ? (
            <div className="w-full max-w-md h-64 perspective-1000 my-4">
              <div
                className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d cursor-pointer ${flipped ? 'rotate-y-180' : ''}`}
                onClick={handleFlip}
                role="button" // Accessibility
                aria-label={flipped ? `Showing back: ${currentCard.back}` : `Showing front: ${currentCard.front}. Click to flip.`}
                tabIndex={0} // Make it focusable
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleFlip(); }} // Keyboard activation
              >
                {/* Front of the card with shine border */}
                <div className="absolute w-full h-full backface-hidden rounded-lg overflow-hidden">
                  <ShineBorder 
                    borderWidth={2}
                    duration={8}
                    shineColor={["#4f46e5", "#ec4899", "#8b5cf6", "#3b82f6"]}
                    className="z-10"
                  />
                  <div className={`absolute inset-0 bg-white dark:bg-gray-800 border-2 ${reviewedCards[currentIndex] === 'correct' ? 'border-green-500' : reviewedCards[currentIndex] === 'incorrect' ? 'border-red-500' : 'border-sakura dark:border-indigo-light'} rounded-lg flex flex-col items-center justify-center p-6 shadow-lg text-center ${flipped ? 'invisible' : ''}`}>
                    <p className="text-4xl mb-4 japanese text-gray-900 dark:text-gray-100">{currentCard.front}</p>
                    <p className="text-gray-500 dark:text-gray-400 italic">{currentCard.romaji}</p>
                    <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-gray-500 dark:text-gray-400">
                      Click or press Space/Enter to flip
                    </div>
                  </div>
                </div>

                {/* Back of the card with shine border */}
                <div className="absolute w-full h-full backface-hidden rounded-lg overflow-hidden rotate-y-180">
                  <ShineBorder 
                    borderWidth={2}
                    duration={10}
                    shineColor={["#f472b6", "#ec4899", "#be185d", "#db2777"]}
                    className="z-10"
                  />
                  <div className={`absolute inset-0 bg-pink-100/80 dark:bg-pink-100/80 text-gray-800 dark:text-gray-800 border-2 ${reviewedCards[currentIndex] === 'correct' ? 'border-green-500' : reviewedCards[currentIndex] === 'incorrect' ? 'border-red-500' : 'border-pink-200 dark:border-pink-700'} rounded-lg flex flex-col items-center justify-center p-6 shadow-lg text-center ${!flipped ? 'invisible' : ''}`}>
                    <p className="text-2xl mb-2 font-semibold">{currentCard.back}</p>
                    <p className="text-xl japanese mb-1">{currentCard.front}</p>
                    <p className="text-gray-600 dark:text-gray-400 italic mb-4">{currentCard.romaji}</p>

                    {studyMode && flipped && (
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4 px-2">
                        <TooltipProvider delayDuration={100}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                className="bg-green-500/20 border-green-500 text-black hover:bg-green-600/30 px-3 py-1 h-auto text-xs sm:text-sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markCard('correct');
                                  setTimeout(handleNext, 300);
                                }}
                              >
                                <Check className="h-4 w-4 mr-1" /> Correct (Y)
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Mark as Correct (Press Y)</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider delayDuration={100}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                className="bg-red-500/20 border-red-500 text-black hover:bg-red-600/30 px-3 py-1 h-auto text-xs sm:text-sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markCard('incorrect');
                                  setTimeout(handleNext, 300);
                                }}
                              >
                                <X className="h-4 w-4 mr-1" /> Incorrect (N)
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Mark as Incorrect (Press N)</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    )}

                    {!studyMode && (
                      <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-gray-600 dark:text-gray-600">
                        Click or press Space/Enter to flip back
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Navigation Controls - Fixed alignment and overlapping issues */}
              <div className="flex flex-col items-center justify-center gap-4 mt-8">
                <div className="flex items-center justify-center gap-4">
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button onClick={handlePrev} size="sm" variant="outline" aria-label="Previous Card" className="h-10 w-10 flex items-center justify-center">
                          <ChevronLeft className="h-5 w-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Previous Card (Left Arrow)</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <div className="text-sm text-gray-500 dark:text-gray-400 font-medium tabular-nums w-20 text-center">
                    {currentIndex + 1} / {currentCards.length}
                  </div>

                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button onClick={handleNext} size="sm" variant="outline" aria-label="Next Card" className="h-10 w-10 flex items-center justify-center">
                          <ChevronRight className="h-5 w-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Next Card (Right Arrow)</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button onClick={resetProgress} size="sm" variant="outline" aria-label="Reset Progress" className="h-10 w-10 flex items-center justify-center">
                          <RotateCcwIcon className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Reset Progress for this category</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                
                {/* Keyboard Hint - Positioned above the navigation */}
                <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center ">
                  <Keyboard className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="text-center">Shortcuts: Space/Enter (flip), ←/→ (nav), Y/N (mark)</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400 my-10">
              <p>No cards available in this category.</p>
              <p>Please select another category.</p>
            </div>
          )}

          {/* Single instance of keyboard hint - removed duplicates */}
        </div>

        {/* CSS for 3D flip effect (Keep this) */}
        <style>{`
          .perspective-1000 { perspective: 1000px; }
          .transform-style-preserve-3d { transform-style: preserve-3d; }
          .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
          .rotate-y-180 { transform: rotateY(180deg); }
          .invisible { visibility: hidden; }
          .japanese { font-family: 'Noto Sans JP', sans-serif; /* Example Japanese font */ }
        `}</style>
      </div>
    </Layout>
  );
};

export default FlashcardsPage;