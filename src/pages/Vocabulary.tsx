import React, { useState, useEffect, useRef } from 'react';
import Layout from '@/components/Layout';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, BookOpen, ChevronUp, Loader2, RefreshCw, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { getWordFromGeminiAPI, type VocabularyWord } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { vocabCategories } from '@/lib/vocabulary-data';
// Import Pagination components
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Enhanced animation styles with dark mode support
const animationStyles = `
  .section-container {
    width: 100%;
    max-width: 1600px; /* Increased from 1200px for wider content */
    margin: 0 auto;
    padding: 0 1rem; /* Reduced from 2rem to have less space at edges */
  }
  
  @media (max-width: 1680px) {
    .section-container {
      max-width: 100%;
      padding: 0 1rem;
    }
  }
  
  @media (max-width: 640px) {
    .section-container {
      padding: 0 0.75rem;
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes shine {
    0% {
      background-position: -100% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
  
  @keyframes pulseGlow {
    0% {
      box-shadow: 0 5px 15px rgba(99, 102, 241, 0.2);
    }
    50% {
      box-shadow: 0 10px 25px rgba(99, 102, 241, 0.5);
    }
    100% {
      box-shadow: 0 5px 15px rgba(99, 102, 241, 0.2);
    }
  }
  
  @keyframes floatCard {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-8px);
    }
    100% {
      transform: translateY(0px);
    }
  }
  
  @keyframes borderPulse {
    0% {
      border-color: rgba(99, 102, 241, 0.7);
    }
    50% {
      border-color: rgba(236, 72, 153, 0.7);
    }
    100% {
      border-color: rgba(99, 102, 241, 0.7);
    }
  }
  
  .animate-fadeInUp {
    animation: fadeInUp 0.6s ease-out forwards;
  }
  
  .card-hover-effect {
    transition: all 0.3s ease;
  }
  
  .card-hover-effect:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 20px -10px rgba(66, 71, 151, 0.15);
  }
  
  /* Dark mode support for card hover */
  .dark .card-hover-effect:hover {
    box-shadow: 0 12px 20px -10px rgba(66, 71, 151, 0.3);
  }
  
  .shine-effect {
    position: relative;
    overflow: hidden;
  }
  
  .shine-effect:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 100%;
    background: linear-gradient(
      90deg, 
      rgba(255,255,255, 0) 0%, 
      rgba(255,255,255, 0.4) 50%, 
      rgba(255,255,255, 0) 100%
    );
    transform: translateX(-100%);
  }
  
  /* Dark mode shine effect */
  .dark .shine-effect:after {
    background: linear-gradient(
      90deg, 
      rgba(255,255,255, 0) 0%, 
      rgba(255,255,255, 0.2) 50%, 
      rgba(255,255,255, 0) 100%
    );
  }
  
  .shine-effect:hover:after {
    animation: shine 1.5s ease-in-out;
  }
  
  .scroll-to-top {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 100;
    opacity: 0;
    visibility: hidden;
    transform: translateY(20px);
    transition: all 0.3s ease;
  }
  
  .scroll-to-top.visible {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  
  /* Improved flip card animation styles - Fixed to prevent hover interference with lightbulb icon */
  .flip-card {
    perspective: 1000px;
    height: 100%;
    min-height: 150px;
    width: 100%;
    transition: transform 0.3s ease; /* Only transition transform on the main card */
    position: relative; /* Ensure positioning context for the button */
  }
  
  .flip-card:hover {
    transform: translateY(-8px);
  }
  
  /* Apply inner card animations only when NOT hovering the button and card is NOT flipped */
  .flip-card:not(.flipped):not(:has(.lightbulb-btn:hover)):hover .flip-card-inner {
    box-shadow: 0 15px 30px -10px rgba(99, 102, 241, 0.3);
    transform: scale(1.03) translateY(2px);
    border-color: #818cf8;
    animation: pulseGlow 2s infinite; /* Apply glow animation here */
  }
  
  .dark .flip-card:not(.flipped):not(:has(.lightbulb-btn:hover)):hover .flip-card-inner {
    box-shadow: 0 15px 30px -10px rgba(99, 102, 241, 0.4);
  }
  
  .flip-card:not(.flipped):not(:has(.lightbulb-btn:hover)):hover .word-japanese {
    color: #4f46e5;
    transform: translateY(-2px);
    transition: all 0.3s ease;
  }
  
  .dark .flip-card:not(.flipped):not(:has(.lightbulb-btn:hover)):hover .word-japanese {
    color: #818cf8;
  }
  
  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 150px;
    transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s ease, border-color 0.3s ease;
    transform-style: preserve-3d;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    border-radius: 0.5rem;
  }
  
  .flip-card.flipped .flip-card-inner {
    transform: rotateY(180deg);
  }
  
  .flip-card-front,
  .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    min-height: 150px;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  
  .flip-card-back {
    transform: rotateY(180deg);
    overflow-y: auto;
  }
  
  .word-card-content {
    padding: 1.25rem;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .word-japanese {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    line-height: 1.3;
  }
  
  .word-romaji {
    font-size: 0.875rem;
    color: #6366f1;
    margin-bottom: 0.5rem;
    font-style: italic;
  }
  
  .word-english {
    font-size: 1rem;
    line-height: 1.4;
  }
  
  .example-container {
    padding: 1.25rem;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .example-title {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #ca8a04;
  }
  
  .example-text {
    font-size: 0.925rem;
    line-height: 1.5;
  }
  
  .japanese-text {
    font-weight: 500;
    color: #4338ca;
  }
  
  .english-text {
    margin-top: 0.5rem;
    color: #64748b;
    font-style: italic;
  }
  
  .sentence-divider {
    margin: 0 0.25rem;
    color: #94a3b8;
  }
  
  .highlight {
    background-color: rgba(236, 72, 153, 0.1);
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    color: #be185d;
  }
  
  .dark .japanese-text {
    color: #818cf8;
  }
  
  .dark .english-text {
    color: #94a3b8;
  }
  
  .dark .highlight {
    background-color: rgba(236, 72, 153, 0.2);
    color: #ec4899;
  }
  
  /* Fix for lightbulb button to ensure it remains clickable and visually distinct */
  .lightbulb-btn {
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 20; /* Increased z-index */
    transition: all 0.2s ease;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer; /* Ensure cursor indicates clickability */
  }
  
  .lightbulb-btn:hover {
    transform: scale(1.2); /* Scale button on its own hover */
    box-shadow: 0 0 10px rgba(234, 179, 8, 0.5);
  }
  
  /* Ensure lightbulb maintains proper visibility when card is hovered, but don't interfere with its own hover */
  .flip-card:hover .lightbulb-btn:not(:hover) {
    transform: scale(1.1);
  }

  @media (max-width: 640px) {
    .word-japanese {
      font-size: 1.25rem;
    }
    
    .word-romaji {
      font-size: 0.75rem;
    }
    
    .word-english {
      font-size: 0.875rem;
    }
  }
`;

const Vocabulary = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [contentInView, setContentInView] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [geminiResults, setGeminiResults] = useState<VocabularyWord[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [flippedCards, setFlippedCards] = useState<{[key: string]: boolean}>({});
  // Add pagination state for categories
  const [categoryPages, setCategoryPages] = useState<{ [categoryName: string]: number }>({});
  
  // To help abort ongoing API requests when the search query changes
  const abortControllerRef = useRef<AbortController | null>(null);
  // To track if a search is already in progress
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Define items per page for pagination
  const ITEMS_PER_PAGE = 12;

  // Initialize pagination state
  useEffect(() => {
    const initialPages: { [categoryName: string]: number } = {};
    vocabCategories.forEach(cat => {
        initialPages[cat.category] = 1;
    });
    setCategoryPages(initialPages);
  }, []);
  
  // Handle flipping a card
  const handleFlipCard = (id: string) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  // Track scroll position for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Set content to visible after a small delay to trigger entrance animation
    const timer = setTimeout(() => {
      setContentInView(true);
      setIsLoading(false);
    }, 300);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Handle page changes for a specific category
  const handlePageChange = (categoryName: string, newPage: number) => {
    setCategoryPages(prev => ({
        ...prev,
        [categoryName]: Math.max(1, newPage), // Ensure page doesn't go below 1
    }));
    // Scroll to the top of the category when changing pages
    setTimeout(() => {
      const categoryElement = document.getElementById(`category-${categoryName.replace(/\s+/g, '-').toLowerCase()}`);
      if (categoryElement) {
        const navHeight = 80; // Approximate header height
        const offsetPosition = categoryElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 10);
  };

  // Function to search for a word using Gemini API
  const searchWithGemini = async (query: string) => {
    if (!query.trim()) return;
    
    // Cancel any previous ongoing search
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
      searchTimeoutRef.current = null;
    }
    
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    
    setIsSearching(true);
    setSearchError(null);
    
    // Create a timeout that will set error if search takes too long
    searchTimeoutRef.current = setTimeout(() => {
      setIsSearching(false);
      setSearchError("Search timed out. Please try again or check your API key.");
      searchTimeoutRef.current = null;
    }, 15000); // 15 seconds timeout for the entire operation
    
    try {
      const result = await getWordFromGeminiAPI(query);
      
      // Clear the timeout since we got a response
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
        searchTimeoutRef.current = null;
      }
      
      if (result) {
        setGeminiResults([result]);
      } else {
        setSearchError("Couldn't find information about this word. Try a different search term.");
        setGeminiResults([]);
      }
    } catch (error) {
      console.error("Error searching with Gemini:", error);
      setSearchError("An error occurred while searching. Please try again later.");
      setGeminiResults([]);
    } finally {
      // Ensure we clear the timeout if it's still active
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
        searchTimeoutRef.current = null;
      }
      setIsSearching(false);
    }
  };

  // Function to handle manual retry
  const handleRetrySearch = () => {
    if (searchQuery.trim()) {
      searchWithGemini(searchQuery);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Your existing vocabulary data
  // vocabCategories is now imported from vocabulary-data.ts

  // Filter the vocabulary based on search
  const filteredVocab = searchQuery.trim() === ""
    ? vocabCategories
    : vocabCategories.map(category => {
        const wordsToFilter = Array.isArray(category.words) ? category.words : [];
        const filteredWords = wordsToFilter.filter(word => {
            const japaneseMatch = word?.japanese && typeof word.japanese === 'string' && word.japanese.includes(searchQuery);
            const romajiMatch = word?.romaji && typeof word.romaji === 'string' && word.romaji.toLowerCase().includes(searchQuery.toLowerCase());
            const englishMatch = word?.english && typeof word.english === 'string' && word.english.toLowerCase().includes(searchQuery.toLowerCase());
            return !!(japaneseMatch || romajiMatch || englishMatch);
        });
        return { ...category, words: filteredWords };
      }).filter(category => Array.isArray(category.words) && category.words.length > 0);
      
  // Check if no results found in local data, then search with Gemini API
  useEffect(() => {
    // Clear previous search results when query changes
    if (searchQuery.trim() === "") {
      setGeminiResults([]);
      setSearchError(null);
      // Reset pagination when search is cleared
      const initialPages: { [categoryName: string]: number } = {};
      vocabCategories.forEach(cat => { initialPages[cat.category] = 1; });
      setCategoryPages(initialPages);
      return;
    }
    
    const hasLocalResults = filteredVocab.length > 0;
    
    // Don't search with Gemini if there are local results
    if (hasLocalResults) {
      setGeminiResults([]);
      setSearchError(null);
      // Reset pagination when local results are found for a new search
      const initialPages: { [categoryName: string]: number } = {};
      filteredVocab.forEach(cat => { initialPages[cat.category] = 1; });
      setCategoryPages(prev => ({ ...prev, ...initialPages })); // Merge to keep state for non-filtered categories if needed
      return;
    }
    
    // Add slight delay before searching with API to avoid excessive API calls while typing
    const delayDebounceSearch = setTimeout(() => {
      if (!isSearching && searchQuery.trim() !== "" && !hasLocalResults) {
        // Reset pagination before triggering API search
        const initialPages: { [categoryName: string]: number } = {};
        vocabCategories.forEach(cat => { initialPages[cat.category] = 1; });
        setCategoryPages(initialPages);
        searchWithGemini(searchQuery);
      }
    }, 800); // 800ms delay
    
    return () => {
      clearTimeout(delayDebounceSearch);
    };
  }, [searchQuery, filteredVocab.length]); // Ensure filteredVocab.length is a dependency

  const totalResults = filteredVocab.reduce((total, category) => total + category.words.length, 0) + geminiResults.length;

  // Function to format example sentences in a more readable way
  const formatExample = (example: string) => {
    if (!example) return null;
    
    // For multi-line examples from Gemini API (Japanese, romaji, English)
    const lines = example.split('\n').filter(line => line.trim());
    if (lines.length >= 2) {
      const japaneseText = lines[0].trim();
      const romajiText = lines.length >= 2 ? lines[1].trim() : '';
      const englishText = lines.length >= 3 ? lines[2].trim() : '';
      
      return (
        <div className="example-text">
          <p className="japanese-text">{japaneseText}</p>
          <p className="romaji text-sm text-indigo-500 dark:text-indigo-400 italic mt-0.5">{romajiText}</p>
          {englishText && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{englishText}</p>}
        </div>
      );
    }
    
    // Handle conversation format with speaker prefixes like "A:" and "B:"
    if (example.includes('：') || example.includes(': ')) {
      // Check for conversation pattern with speakers and translations
      const conversationPattern = /([A-Za-z]+[：:]\s*[^()]+)(\([^)]+\))?/g;
      let match;
      const conversations = [];
      
      // Extract all conversation parts
      while ((match = conversationPattern.exec(example)) !== null) {
        const fullText = match[1].trim();
        const translation = match[2] ? match[2].trim() : null;
        
        // Split speaker and text
        const speakerMatch = fullText.match(/([A-Za-z]+[：:])\s*(.*)/);
        if (speakerMatch) {
          conversations.push({
            speaker: speakerMatch[1],
            text: speakerMatch[2],
            translation: translation
          });
        }
      }
      
      if (conversations.length > 0) {
        return (
          <div className="example-text space-y-3">
            {conversations.map((conv, i) => (
              <div key={i} className="mb-2">
                <div>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">{conv.speaker}</span>
                  <span className="japanese-text ml-1">{conv.text}</span>
                </div>
                {conv.translation && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic ml-5 mt-0.5">
                    {conv.translation}
                  </p>
                )}
              </div>
            ))}
          </div>
        );
      }
    }
    
    // Check if the example contains a Japanese/English pair (typically separated by a dash or hyphen)
    if (example.includes(' - ')) {
      const [japaneseText, englishText] = example.split(' - ');
      
      return (
        <div className="example-text">
          <p className="japanese-text">{japaneseText}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 italic mt-1">{englishText}</p>
        </div>
      );
    }
    
    // For examples with specific formatting (pattern with slashes for dialogues)
    if (example.includes(' / ')) {
      // This is likely a conversation format with Japanese / English pairs
      const parts = example.split(' / ');
      
      // Check if this might be a conversation with multiple speakers
      if (parts.length >= 2) {
        const formattedParts = [];
        
        for (let i = 0; i < parts.length; i += 2) {
          const japaneseText = parts[i];
          const englishText = i + 1 < parts.length ? parts[i + 1] : '';
          
          // Check if this part contains speaker notation
          const speakerMatch = japaneseText.match(/([A-Za-z]+[：:])\s*(.*)/);
          
          if (speakerMatch) {
            formattedParts.push(
              <div key={`part-${i}`} className="mb-3">
                <div>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">{speakerMatch[1]}</span>
                  <span className="japanese-text ml-1">{speakerMatch[2]}</span>
                </div>
                {englishText && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic ml-5 mt-0.5">{englishText}</p>
                )}
              </div>
            );
          } else {
            formattedParts.push(
              <div key={`part-${i}`} className="mb-3">
                <p className="japanese-text">{japaneseText}</p>
                {englishText && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic mt-0.5">{englishText}</p>
                )}
              </div>
            );
          }
        }
        
        return <div className="example-text space-y-1">{formattedParts}</div>;
      }
    }
    
    // Handle examples with parentheses (typically romaji explanations)
    if (example.includes('(') && example.includes(')')) {
      // Check if this is a multi-sentence example with translations
      if (example.includes(').') || example.includes('). ')) {
        const sentences = example.split(/(?<=\)\.)\s+/);
        const formattedSentences = sentences.map((sentence, index) => {
          const parts = sentence.match(/(.*?)\s*(\([^)]+\))/);
          if (parts) {
            return (
              <div key={index} className="mb-2">
                <p className="japanese-text">{parts[1].trim()}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 italic mt-0.5">{parts[2]}</p>
              </div>
            );
          }
          return <p key={index}>{sentence}</p>;
        });
        
        return <div className="example-text space-y-1">{formattedSentences}</div>;
      }
      
      // Try to highlight the main word being exemplified
      const highlightWord = (text: string) => {
        const wordToHighlight = text.match(/（(.+?)）/);
        if (wordToHighlight) {
          return text.replace(/（(.+?)）/, `<span class="highlight">$1</span>`);
        }
        return text;
      };
      
      // Split the Japanese text and translation
      const mainParts = example.split('(');
      const japaneseText = mainParts[0].trim();
      const translationPart = mainParts.slice(1).join('(');
      
      return (
        <div className="example-text">
          <p 
            className="japanese-text" 
            dangerouslySetInnerHTML={{ 
              __html: highlightWord(japaneseText) 
            }}
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 italic mt-1">
            ({translationPart}
          </p>
        </div>
      );
    }
    
    // Default case: just return the example text as is
    return <p className="example-text">{example}</p>;
  };

  return (
    <Layout>
      {/* Inject animation styles directly */}
      <style>{animationStyles}</style>

      <div className="section-container overflow-hidden">
        {/* Animated header section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
        <div className="text-center">
          <h1 className="text-[36px] font-bold mb-3 font-['Poppins','Noto_Sans_JP',sans-serif] relative inline-block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
              Vocabulary Guide
          </h1>
        </div>
          <p className="text-lg mb-6 text-center max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
            Essential Japanese vocabulary for the N5 level, organized by topic. Master these words to build your foundation in Japanese.
            <span className="block mt-2 text-sm font-medium text-indigo-500 dark:text-indigo-400">
              Click the <Lightbulb className="h-4 w-4 inline-block mx-1" /> icon on any word to see an example sentence.
            </span>
          </p>
        </motion.div>

        {/* Enhanced search bar */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative mb-10 max-w-xl mx-auto"
        >
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
          </div>
          <Input
            type="text"
            placeholder="Search vocabulary in Japanese, Romaji, or English..."
            className="pl-10 pr-10 py-6 w-full border-indigo-100 dark:border-indigo-800/50 focus:border-indigo-300 dark:focus:border-indigo-600 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-700/50 focus:ring-opacity-50 rounded-xl shadow-sm dark:bg-gray-800/70 dark:text-gray-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search vocabulary"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </motion.div>

        {/* Results counter when searching */}
        <AnimatePresence>
          {searchQuery.trim() !== "" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 text-center text-gray-600 dark:text-gray-400"
            >
              {isSearching ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Searching for "{searchQuery}"...
                </span>
              ) : (
                <span>{totalResults} results found for "{searchQuery}"</span>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Word categories from local data */}
        <div className="space-y-12">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-52 rounded-lg dark:bg-gray-800" />
              ))}
            </div>
          ) : (
            <>
              {/* Gemini API Results */}
              {geminiResults.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: contentInView ? 1 : 0, y: contentInView ? 0 : 30 }}
                  transition={{ duration: 0.7 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">🔍</span>
                    <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">
                      Gemini Results
                    </h2>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 ml-10 mb-6">
                    Results for the word.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {geminiResults.map((word, wordIndex) => {
                      const cardId = `gemini-${word.japanese}-${wordIndex}`;
                      const isFlipped = flippedCards[cardId] || false;
                      
                      return (
                        <motion.div
                          key={cardId}
                          initial={{ opacity: 0, y: 20, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ 
                            duration: 0.5, 
                            delay: 0.1 + (wordIndex * 0.04),
                            ease: "easeOut"
                          }}
                          className={`flip-card relative ${isFlipped ? 'flipped' : ''}`}
                        >
                          <button 
                            className="lightbulb-btn bg-yellow-100 dark:bg-yellow-900/70 p-1.5 rounded-full text-yellow-500 dark:text-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:focus:ring-yellow-600"
                            onClick={() => handleFlipCard(cardId)}
                            aria-label="Show example"
                          >
                            <Lightbulb className="h-4 w-4" />
                          </button>
                          
                          <div className="flip-card-inner">
                            {/* Front of the card */}
                            <div className="flip-card-front bg-white dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700/80 border-l-4 border-l-emerald-500 dark:border-l-emerald-600">
                              <div className="word-card-content">
                                <p className="word-japanese text-indigo-900 dark:text-indigo-300">{word.japanese ?? 'N/A'}</p>
                                <p className="word-romaji text-indigo-500 dark:text-indigo-400">{word.romaji ?? 'N/A'}</p>
                                <p className="word-english text-gray-700 dark:text-gray-300">{word.english ?? 'N/A'}</p>
                              </div>
                            </div>
                            
                            {/* Back of the card (example) */}
                            <div className="flip-card-back bg-white dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700/80 border-l-4 border-l-yellow-500 dark:border-l-yellow-600">
                              <div className="example-container">
                                <p className="example-title dark:text-yellow-400">Example</p>
                                {word.example ? (
                                  formatExample(word.example)
                                ) : (
                                  <div className="flex flex-col items-center justify-center h-full">
                                    <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                                      No example is available for this word.
                                      <br />
                                      <span className="text-xs text-indigo-500 dark:text-indigo-400 mt-2 block">
                                        Try searching for specific words to get examples.
                                      </span>
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
              
              {/* Show error if search failed with retry button */}
              {searchError && !isSearching && filteredVocab.length === 0 && geminiResults.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Alert variant="destructive" className="border-red-500/30 dark:border-red-700/30">
                    <AlertTitle className="flex items-center gap-2">
                      <X className="h-4 w-4" /> Search Error
                    </AlertTitle>
                    <AlertDescription className="flex flex-col gap-3">
                      <p>{searchError}</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="self-start border-red-500/50 text-red-600 hover:bg-red-50 dark:border-red-700/50 dark:text-red-400 dark:hover:bg-red-900/20"
                        onClick={handleRetrySearch}
                      >
                        <RefreshCw className="h-3.5 w-3.5 mr-2" /> Retry Search
                      </Button>
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}
              
              {/* Display the filtered vocabulary from local data with pagination */}
              {filteredVocab.length > 0 && filteredVocab.map((category, catIndex) => {
                  const wordsToPaginate = Array.isArray(category.words) ? category.words : [];
                  const currentPage = categoryPages[category.category] || 1;
                  const totalPages = Math.ceil(wordsToPaginate.length / ITEMS_PER_PAGE);
                  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
                  const endIndex = startIndex + ITEMS_PER_PAGE;
                  const paginatedWords = wordsToPaginate.slice(startIndex, endIndex);

                  // Don't render category if search filtered all words out and pagination resulted in empty slice
                  if (paginatedWords.length === 0 && searchQuery.trim() !== "") return null;
                  // Don't render category if it has no words initially
                  if (wordsToPaginate.length === 0) return null;

                  // Create ID for scrolling to categories when pagination changes
                  const categoryId = `category-${category.category.replace(/\s+/g, '-').toLowerCase()}`;

                  return (
                    <motion.div 
                      id={categoryId}
                      key={category.category}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: contentInView ? 1 : 0, y: contentInView ? 0 : 30 }}
                      transition={{ duration: 0.7, delay: catIndex * 0.1 }}
                      className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{category.icon}</span>
                        <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">
                          {category.category}
                        </h2>
                      </div>
                      
                      {/* Category description */}
                      {category.description && (
                        <p className="text-gray-600 dark:text-gray-400 ml-10 mb-6">{category.description}</p>
                      )}
                      
                      {/* Category stats and pagination info */}
                      <div className="flex flex-wrap justify-between items-center mb-4">
                        <p className="text-sm text-indigo-500 dark:text-indigo-400">
                          {wordsToPaginate.length} words • Showing {startIndex + 1}-{Math.min(endIndex, wordsToPaginate.length)} of {wordsToPaginate.length}
                        </p>
                        
                        {totalPages > 1 && (
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Page {currentPage} of {totalPages}
                          </p>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
                        {paginatedWords.map((word, wordIndex) => {
                          const cardId = `${category.category}-${word.japanese}-${startIndex + wordIndex}`; // Ensure unique ID across pages
                          const isFlipped = flippedCards[cardId] || false;
                          
                          return (
                            <motion.div
                              key={cardId}
                              initial={{ opacity: 0, y: 20, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{ 
                                duration: 0.5, 
                                delay: 0.1 + (wordIndex * 0.04),
                                ease: "easeOut"
                              }}
                              className={`flip-card relative ${isFlipped ? 'flipped' : ''}`}
                            >
                              <button 
                                className="lightbulb-btn bg-yellow-100 dark:bg-yellow-900/70 p-1.5 rounded-full text-yellow-500 dark:text-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:focus:ring-yellow-600"
                                onClick={() => handleFlipCard(cardId)}
                                aria-label="Show example"
                              >
                                <Lightbulb className="h-4 w-4" />
                              </button>
                              
                              <div className="flip-card-inner">
                                {/* Front of the card */}
                                <div className="flip-card-front bg-white dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700/80 border-l-4 border-l-pink-500 dark:border-l-pink-600">
                                  <div className="word-card-content">
                                    <p className="word-japanese text-indigo-900 dark:text-indigo-300">{word.japanese ?? 'N/A'}</p>
                                    <p className="word-romaji text-indigo-500 dark:text-indigo-400">{word.romaji ?? 'N/A'}</p>
                                    <p className="word-english text-gray-700 dark:text-gray-300">{word.english ?? 'N/A'}</p>
                                  </div>
                                </div>
                                
                                {/* Back of the card (example) */}
                                <div className="flip-card-back bg-white dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700/80 border-l-4 border-l-yellow-500 dark:border-l-yellow-600">
                                  <div className="example-container">
                                    {word.example ? (
                                      <>
                                        <p className="example-title dark:text-yellow-400">Example</p>
                                        {formatExample(word.example)}
                                      </>
                                    ) : (
                                      <div className="flex flex-col items-center justify-center h-full">
                                        <p className="text-gray-500 dark:text-gray-400 text-center">No example available</p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>

                      {/* Add pagination controls if needed */}
                      {totalPages > 1 && (
                        <Pagination>
                          <PaginationContent>
                            <PaginationItem>
                              <PaginationPrevious
                                href={currentPage > 1 ? "#" : undefined}
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (currentPage > 1) {
                                    handlePageChange(category.category, currentPage - 1);
                                  }
                                }}
                                className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
                              />
                            </PaginationItem>

                            {/* Show page numbers */}
                            {[...Array(totalPages)].map((_, pageIndex) => {
                              const pageNum = pageIndex + 1;
                              // Show first, last, current, and adjacent pages
                              const showPage = pageNum === 1 || pageNum === totalPages || 
                                              Math.abs(pageNum - currentPage) <= 1;
                              
                              // Show ellipsis when pages are skipped
                              if (pageNum === currentPage - 2 && currentPage > 3) {
                                return (
                                  <PaginationItem key={`ellipsis-prev-${pageNum}`}>
                                    <PaginationEllipsis />
                                  </PaginationItem>
                                );
                              }
                              
                              if (pageNum === currentPage + 2 && currentPage < totalPages - 2) {
                                return (
                                  <PaginationItem key={`ellipsis-next-${pageNum}`}>
                                    <PaginationEllipsis />
                                  </PaginationItem>
                                );
                              }
                              
                              if (showPage) {
                                return (
                                  <PaginationItem key={pageNum}>
                                    <PaginationLink 
                                      href="#"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handlePageChange(category.category, pageNum);
                                      }}
                                      isActive={currentPage === pageNum}
                                      aria-current={currentPage === pageNum ? "page" : undefined}
                                    >
                                      {pageNum}
                                    </PaginationLink>
                                  </PaginationItem>
                                );
                              }
                              
                              return null;
                            })}

                            <PaginationItem>
                              <PaginationNext 
                                href={currentPage < totalPages ? "#" : undefined}
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (currentPage < totalPages) {
                                    handlePageChange(category.category, currentPage + 1);
                                  }
                                }}
                                className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}
                              />
                            </PaginationItem>
                          </PaginationContent>
                        </Pagination>
                      )}
                    </motion.div>
                  );
              })}
              
              {/* No results message when not searching or waiting for API response */}
              {searchQuery.trim() !== "" && filteredVocab.length === 0 && geminiResults.length === 0 && !isSearching && !searchError && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <BookOpen className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    No vocabulary matching "{searchQuery}" found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                    Try a different search term or check your spelling.
                  </p>
                </motion.div>
              )}
            </>
          )}
        </div>

        {/* Scroll to top button */}
        <button
          onClick={handleScrollToTop}
          className={`scroll-to-top ${showScrollTop ? 'visible' : ''} bg-indigo-600 dark:bg-indigo-800 hover:bg-indigo-700 dark:hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg`}
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      </div>
    </Layout>
  );
};

export default Vocabulary;