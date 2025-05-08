import React from 'react';
import Layout from '@/components/Layout'; // Assuming Layout component path
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Assuming Shadcn UI path
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"; // Assuming Shadcn UI path
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"; // Assuming Shadcn UI path
import { motion, AnimatePresence } from 'framer-motion';
import { grammarPoints, type GrammarLesson, type GrammarPoint, type Example } from '@/lib/grammarData'; // Import data and types

// Helper component to render Japanese text with Furigana
// This prevents needing dangerouslySetInnerHTML everywhere
const JapaneseText = ({ children }: { children: string | string[] }) => {
  // Handle both string and array inputs
  if (Array.isArray(children)) {
    return (
      <>
        {children.map((text, idx) => (
          <JapaneseText key={idx}>{text}</JapaneseText>
        ))}
      </>
    );
  }
  
  // For string input, process as before
  const parts = children.split(/<ruby>|<\/ruby>/g);
  return (
    <>
      {parts.map((part, index) => {
        if (index % 2 === 1) { // Inside <ruby> tag
          const match = part.match(/<rb>(.*?)<\/rb><rt>(.*?)<\/rt>/);
          if (match) {
            return <ruby key={index}>{match[1]}<rt>{match[2]}</rt></ruby>;
          }
        }
        return part; // Regular text
      })}
    </>
  );
};

const Grammar = () => {
  // Grammar points data is now imported from @/lib/grammarData.ts

  // Enhanced animation variants (remain unchanged)
  const pageVariants = {
    initial: { opacity: 0, y: 50, scale: 0.98 },
    in: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
        staggerChildren: 0.15,
      }
    },
    out: {
      opacity: 0,
      y: -30,
      scale: 0.98,
      transition: { duration: 0.4, ease: "easeIn" }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    in: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -20, scale: 0.98 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
    },
    exit: {
      opacity: 0,
      x: 20,
      scale: 0.98,
      transition: { duration: 0.3, ease: "easeIn" }
    }
  };

  // Function to handle scrolling (remain unchanged)
   const handleAccordionTriggerClick = (event: React.MouseEvent<HTMLButtonElement>, itemId: string) => {
    setTimeout(() => {
      const itemElement = document.getElementById(itemId);
      if (itemElement) {
        setTimeout(() => {
            const currentItemElement = document.getElementById(itemId);
            if (currentItemElement && currentItemElement.getAttribute('data-state') === 'open') {
                 currentItemElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                 });
            }
        }, 50);
      }
    }, 100);
  };


  return (
    <Layout>
      <motion.div
        className="section-container p-4 md:p-8"
        variants={pageVariants}
        initial="initial"
        animate="in"
        exit="out"
      >
        {/* Stagger item: Title and Description */}
        <motion.div variants={itemVariants} className="mb-10 text-center"> {/* Changed to text-center */}
        <h1 className="text-[36px] font-bold mb-3 font-['Poppins','Noto_Sans_JP',sans-serif] relative inline-block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
            Grammar Guide
  {/* Remove the span that creates the underline */}
              </h1>
          <p className="text-[18px] text-gray-600 dark:text-gray-400 mb-8 font-['Poppins','Noto_Sans_JP',sans-serif] max-w-3xl mx-auto text-left md:text-center"> {/* Keep paragraph centered on larger screens, left on small */}
            Essential grammar patterns from Minna no Nihongo Shokyu I (Lessons 1-25), reviewed for JLPT N5 relevance, with furigana. Select a lesson to view its grammar points.
          </p>
        </motion.div>

        {/* Stagger item: Tabs Component */}
        <motion.div variants={itemVariants}>
          <Tabs defaultValue="lesson-1" className="w-full">
            <div className="overflow-x-auto pb-3 mb-6 border-b border-gray-200 dark:border-gray-700 styled-scrollbar">
              <TabsList className="inline-flex h-auto justify-start flex-nowrap px-1 space-x-2 bg-transparent">
                {grammarPoints.map((section) => (
                  <TabsTrigger
                    key={section.id}
                    value={section.id}
                    className="flex-shrink-0 px-4 py-2.5 text-sm md:text-base font-medium rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 dark:focus-visible:ring-offset-gray-900
                    transition-all duration-300 ease-in-out transform hover:scale-[1.03] hover:shadow-md
                    text-gray-500 dark:text-gray-400 hover:text-indigo-700 dark:hover:text-indigo-300 bg-white dark:bg-gray-800/50 shadow-sm border border-gray-200 dark:border-gray-700
                    data-[state=active]:text-white dark:data-[state=active]:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 dark:data-[state=active]:from-indigo-500 dark:data-[state=active]:to-purple-500
                    data-[state=active]:shadow-lg data-[state=active]:scale-[1.05]"
                  >
                    {section.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <AnimatePresence mode="wait">
              {grammarPoints.map((section) => (
                <TabsContent
                  key={section.id}
                  value={section.id}
                  className="mt-0 focus:outline-none"
                >
                  <motion.div
                    key={section.id + "-motion"}
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <Card className="border-t-4 border-indigo-500 dark:border-indigo-400 shadow-lg overflow-hidden bg-sky-100 dark:bg-sky-900/30 rounded-xl">
                      <CardHeader className="bg-gradient-to-r from-sky-200 to-sky-100 dark:from-sky-800/50 dark:to-sky-900/30 p-5 md:p-6 border-b dark:border-gray-700">
                        <CardTitle className="text-xl md:text-2xl font-semibold text-indigo-800 dark:text-indigo-200">{section.title}</CardTitle>
                        <CardDescription className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-1.5">
                          Key grammar points from this lesson
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 md:p-6">
                        <Accordion type="single" collapsible className="w-full space-y-3">
                          {section.points.map((point, index) => {
                            const itemId = `pattern-${section.id}-${index}`;
                            return (
                              <AccordionItem
                                key={itemId}
                                value={itemId}
                                id={itemId}
                                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-md bg-sky-50 dark:bg-sky-900/20"
                              >
                                <AccordionTrigger
                                  onClick={(e) => handleAccordionTriggerClick(e, itemId)}
                                  className="hover:bg-sky-100 dark:hover:bg-sky-800/50 px-4 py-3 text-left font-medium text-gray-800 dark:text-gray-100 rounded-t-md transition-colors w-full flex justify-between items-center group data-[state=open]:bg-sky-200 dark:data-[state=open]:bg-sky-700/40"
                                >
                                  <div className="flex items-center gap-3 text-left"> {/* Ensure trigger text aligns left */}
                                    <span className="flex-shrink-0 bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide">Pattern</span>
                                    {/* Use JapaneseText component for the pattern */}
                                    <span className="text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors japanese">
                                      <JapaneseText>{point.pattern}</JapaneseText>
                                    </span>
                                  </div>
                                  {/* Shadcn Accordion chevron */}
                                </AccordionTrigger>
                                <AccordionContent className="px-4 pb-4 pt-3 bg-sky-50 dark:bg-sky-900/20 border-t dark:border-gray-700">
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                  >
                                    <div className="space-y-4 mt-2">
                                      {/* Handle Single vs Multiple Examples */}
                                      {point.examples && Array.isArray(point.examples) ? (
                                        // Render main example first, then additional ones
                                        <>
                                          <div className="border-l-4 border-indigo-400 dark:border-indigo-500 pl-4 pr-3 py-3 bg-gradient-to-r from-white to-indigo-50 dark:from-gray-800 dark:to-indigo-900/20 rounded-r-lg shadow-sm transition-all duration-300 hover:shadow-md hover:border-indigo-500 dark:hover:border-indigo-400">
                                            <p className="mb-1 text-base md:text-lg japanese font-medium text-gray-900 dark:text-gray-50"><JapaneseText>{point.japanese}</JapaneseText></p>
                                            {point.romaji && <p className="mb-1 text-indigo-600 dark:text-indigo-300 italic text-sm">{point.romaji}</p>}
                                            {point.english && <p className="mb-0 font-medium text-sm text-gray-700 dark:text-gray-300">{point.english}</p>}
                                          </div>
                                          <div className="space-y-3">
                                            <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider ml-1">Additional Examples:</p>
                                            {point.examples.map((ex, i) => (
                                               <div key={i} className="border-l-4 border-gray-400 dark:border-gray-500 pl-4 pr-3 py-3 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900/20 rounded-r-lg shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-500 dark:hover:border-gray-400">
                                                  <p className="mb-1 text-base md:text-lg japanese font-medium text-gray-900 dark:text-gray-50"><JapaneseText>{ex.japanese}</JapaneseText></p>
                                                  {ex.romaji && <p className="mb-1 text-indigo-600 dark:text-indigo-300 italic text-sm">{ex.romaji}</p>}
                                                  {ex.english && <p className="mb-0 font-medium text-sm text-gray-700 dark:text-gray-300">{ex.english}</p>}
                                              </div>
                                            ))}
                                          </div>
                                        </>

                                      ) : Array.isArray(point.japanese) ? (
                                         // Handle multiple primary examples (like L8, L10 etc.)
                                        <div className="space-y-3">
                                          {point.japanese.map((jp, i) => (
                                            <div key={i} className="border-l-4 border-indigo-400 dark:border-indigo-500 pl-4 pr-3 py-3 bg-gradient-to-r from-white to-indigo-50 dark:from-gray-800 dark:to-indigo-900/20 rounded-r-lg shadow-sm transition-all duration-300 hover:shadow-md hover:border-indigo-500 dark:hover:border-indigo-400">
                                              <p className="mb-1 text-base md:text-lg japanese font-medium text-gray-900 dark:text-gray-50"><JapaneseText>{jp}</JapaneseText></p>
                                              {Array.isArray(point.romaji) && point.romaji[i] && <p className="mb-1 text-indigo-600 dark:text-indigo-300 italic text-sm">{point.romaji[i]}</p>}
                                              {Array.isArray(point.english) && point.english[i] && <p className="mb-0 font-medium text-sm text-gray-700 dark:text-gray-300">{point.english[i]}</p>}
                                            </div>
                                          ))}
                                        </div>
                                      ) : (
                                        // Handle single primary example
                                        <div className="border-l-4 border-indigo-400 dark:border-indigo-500 pl-4 pr-3 py-3 bg-gradient-to-r from-white to-indigo-50 dark:from-gray-800 dark:to-indigo-900/20 rounded-r-lg shadow-sm transition-all duration-300 hover:shadow-md hover:border-indigo-500 dark:hover:border-indigo-400">
                                          <p className="mb-1 text-base md:text-lg japanese font-medium text-gray-900 dark:text-gray-50"><JapaneseText>{point.japanese}</JapaneseText></p>
                                          {point.romaji && <p className="mb-1 text-indigo-600 dark:text-indigo-300 italic text-sm">{point.romaji}</p>}
                                          {point.english && <p className="mb-0 font-medium text-sm text-gray-700 dark:text-gray-300">{point.english}</p>}
                                        </div>
                                      )}

                                      {/* Explanation Box */}
                                      <div className="bg-amber-50 dark:bg-amber-900/40 p-4 rounded-lg border-l-4 border-amber-400 dark:border-amber-500 shadow-sm">
                                        <h4 className="text-amber-800 dark:text-amber-200 font-semibold mb-1.5 text-sm flex items-center">
                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0 text-amber-600 dark:text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                          </svg>
                                          Explanation
                                        </h4>
                                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{point.explanation}</p>
                                      </div>
                                    </div>
                                  </motion.div>
                                </AccordionContent>
                              </AccordionItem>
                            );
                          })}
                        </Accordion>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              ))}
            </AnimatePresence>

          </Tabs>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default Grammar;
