import React from 'react';
import { Link } from 'react-router-dom';
import { AnimatedH1, ShimmerText } from "@/components/ui/animated-text";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

// Helper function to get the greeting based on the hour
const getGreetingForTime = (hour: number) => {
  if (hour >= 5 && hour < 12) { // 5:00 AM to 11:59 AM
    return {
      japanese: 'おはようございます',
      romaji: 'ohayou gozaimasu',
      english: 'Good morning',
    };
  } else if (hour >= 12 && hour < 17) { // 12:00 PM to 4:59 PM
    return {
      japanese: 'こんにちは',
      romaji: 'konnichiwa',
      english: 'Good afternoon / Hello',
    };
  } else if (hour >= 17 && hour < 22) { // 5:00 PM to 9:59 PM
    return {
      japanese: 'こんばんは',
      romaji: 'konbanwa',
      english: 'Good evening',
    };
  } else { // 10:00 PM to 4:59 AM
    return {
      japanese: 'おやすみなさい',
      romaji: 'oyasuminasai',
      english: 'Good night',
    };
  }
};


const Hero = () => {
  // Get the current hour (0-23)
  const currentHour = new Date().getHours();
  // Get the appropriate greeting object
  const greeting = getGreetingForTime(currentHour);

  return (
    // Enhanced background gradient only for dark mode, original light mode preserved
    <div className="bg-gradient-to-br from-white via-sakura-light to-sakura dark:from-blue-950 dark:via-indigo-900 dark:to-purple-900 min-h-[500px] flex items-center transition-colors duration-500">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* --- Left Side --- */}
          <div>
            <AnimatedH1 
              className="text-4xl md:text-5xl font-bold mb-4 text-indigo-dark dark:text-indigo-300 drop-shadow-sm"
              duration={0.8}
            >
              Master JLPT N5 Japanese
              <span className="block mt-2 text-sakura-dark dark:text-purple-300 japanese relative">
                <ShimmerText delay={0.3}>日本語を学びましょう！</ShimmerText>
                <span className="absolute -bottom-1 left-0 w-24 h-1 bg-gradient-to-r from-indigo to-sakura-dark dark:from-indigo-400 dark:to-purple-400"></span>
              </span>
            </AnimatedH1>
            
            {/* Original styling for light mode, enhanced for dark mode */}
            <p className="text-lg mb-6 text-gray-700 dark:text-gray-300 animate-fade-in animation-delay-400 leading-relaxed">
              Your complete preparation platform for passing the Japanese Language Proficiency Test N5 level with confidence.
            </p>
            {/* Restored original button style for light mode, enhanced for dark mode */}
            <div className="flex flex-wrap gap-4 animate-fade-in animation-delay-600">
                <Link
                  to="/scripts"
                  className={cn(
                    buttonVariants({ variant: "default", size: "lg" }),
                    "bg-sakura text-white hover:bg-sakura-dark dark:bg-purple-600 dark:hover:bg-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-md relative overflow-hidden group"
                  )}
                >
                  Start Learning
                  <span className="absolute inset-0 w-full h-full bg-white/20 dark:bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                </Link>
              <Link
                to="/quizzes"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-indigo text-indigo dark:border-indigo-400 dark:text-indigo-300 hover:bg-indigo-light/20 dark:hover:bg-indigo-900/30 transition-all duration-300 hover:scale-105 hover:shadow-sm relative overflow-hidden group"
                )}
              >
                Take a Quiz
                <span className="absolute inset-0 w-full h-full bg-indigo/10 dark:bg-indigo-400/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
              </Link>
            </div>
          </div>

          {/* --- Right Side with original light mode, enhanced dark mode --- */}
          <div className="hidden md:block">
            {/* Card with original light mode style, enhanced dark mode */}
            <div
              className="
                bg-white dark:bg-indigo-950 p-8 rounded-lg shadow-lg dark:shadow-indigo-900/30 transform rotate-2 animate-slide-in animation-delay-300
                transition-all duration-500 ease-in-out
                hover:scale-105 hover:rotate-1
                hover:shadow-xl dark:hover:shadow-indigo-900/50
                relative
                before:absolute before:inset-0 before:bg-gradient-to-br before:from-indigo/5 before:to-sakura/5 dark:before:from-indigo-400/10 dark:before:to-purple-400/10 before:rounded-lg
              "
            >
              {/* Original gradient for light mode, enhanced for dark mode */}
              <div className="bg-gradient-to-br from-sakura-light to-sakura-lighter dark:from-purple-900/40 dark:to-indigo-900/40 p-6 rounded-md relative z-10 backdrop-blur-sm border border-white/20 dark:border-white/5">
                <h3 className="font-bold mb-2 text-indigo-dark dark:text-indigo-300 flex items-center">
                  <span className="w-2 h-2 bg-sakura-dark dark:bg-purple-400 rounded-full mr-2 animate-pulse"></span>
                  Today's Phrase
                </h3>
                {/* Original styling for light mode, enhanced for dark mode */}
                <p className="text-xl mb-1 japanese relative inline-block dark:text-gray-100">
                  {greeting.japanese}
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-sakura-dark/30 dark:bg-purple-400/40"></span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 italic">{greeting.romaji}</p>
                <p className="text-indigo-dark dark:text-indigo-300 font-medium">{greeting.english}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
