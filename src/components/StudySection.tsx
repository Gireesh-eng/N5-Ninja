import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, BookText, Languages, FlaskConical, MessageCircle, ArrowRight, PenTool } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedH2, AnimatedText } from '@/components/ui/animated-text';

const StudySection = () => {
  const studySections = [
    {
      title: "Grammar",
      description: "Learn essential N5 grammar patterns with clear explanations and examples.",
      icon: <BookOpen className="h-8 w-8 text-indigo" />,
      path: "/grammar",
      color: "border-indigo",
      bgColor: "bg-indigo/5",
      gradient: "from-indigo-500/20 to-indigo-600/5",
      variant: "shine"
    },
    {
      title: "Vocabulary",
      description: "Master the most common 800+ words required for the N5 level.",
      icon: <BookText className="h-8 w-8 text-sakura-dark" />,
      path: "/vocabulary",
      color: "border-sakura",
      bgColor: "bg-sakura/5",
      gradient: "from-sakura-dark/20 to-sakura/5",
      variant: "border"
    },
    {
      title: "Writing Systems",
      description: "Master Hiragana, Katakana, and essential Kanji characters with interactive tools.",
      icon: <PenTool className="h-8 w-8 text-purple-600" />,
      path: "/writing-systems",
      color: "border-purple-500",
      bgColor: "bg-purple-500/5",
      gradient: "from-purple-500/20 to-purple-600/5",
      variant: "rise"
    },
    {
      title: "Flashcards",
      description: "Practice and memorize vocabulary with interactive flashcards.",
      icon: <Languages className="h-8 w-8 text-matcha" />,
      path: "/flashcards",
      color: "border-matcha",
      bgColor: "bg-matcha/5",
      gradient: "from-matcha/20 to-matcha/5",
      variant: "glow"
    },
    {
      title: "Quizzes",
      description: "Test your knowledge with comprehensive quizzes covering all N5 topics.",
      icon: <FlaskConical className="h-8 w-8 text-indigo" />,
      path: "/quizzes",
      color: "border-indigo",
      bgColor: "bg-indigo/5",
      gradient: "from-indigo-500/20 to-indigo-600/5",
      variant: "3d"
    },
    {
      title: "Chat Assistant",
      description: "Ask questions and get explanations from our Japanese learning assistant.",
      icon: <MessageCircle className="h-8 w-8 text-sakura-dark" />,
      path: "/chat",
      color: "border-sakura",
      bgColor: "bg-sakura/5",
      gradient: "from-sakura-dark/20 to-sakura/5",
      variant: "rainbow"
    }
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="section-container relative z-10">
        <div>
          <AnimatedH2 className="section-title text-center mb-2" animation="fade-up">
            Study Resources
          </AnimatedH2>
          <div className="w-20 h-1 bg-indigo mx-auto mb-6 rounded-full"></div>
          <AnimatedText element="p" animation="fade-up" delay={0.2} className="text-lg mb-10 text-gray-700 text-center max-w-2xl mx-auto">
            Everything you need to prepare for the JLPT N5 exam in one place.
            Choose a resource below to start your learning journey.
          </AnimatedText>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {studySections.map((section, index) => (
            <motion.div 
              key={section.title} 
              variants={item}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card 
                variant={section.variant as any}
                className={`group h-full border-l-4 ${section.color} overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <CardHeader className="relative pb-2">
                  <div className="flex items-center gap-3 mb-2">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      className={`p-2 rounded-lg ${section.bgColor} group-hover:scale-110 transition-transform duration-300`}
                    >
                      {section.icon}
                    </motion.div>
                    <CardTitle className="text-xl font-bold">{section.title}</CardTitle>
                  </div>
                  <CardDescription className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                    {section.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="relative pt-2">
                  <div className="mt-4 flex justify-end">
                    <Button 
                      variant="ghost" 
                      className="group-hover:bg-white/80 group-hover:text-indigo-600 transition-all duration-300 rounded-full p-2" 
                      asChild
                    >
                      <Link to={section.path} className="flex items-center gap-1 font-medium">
                        Start Learning
                        <motion.div
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </motion.div>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-gray-500 mb-4">Not sure where to start?</p>
          <Button asChild variant="default" className="bg-indigo hover:bg-indigo-dark transition-colors">
            <Link to="/grammar">Begin with Grammar Basics</Link>
          </Button>
        </motion.div>
      </div>
      <style>{`
        .bg-grid-pattern {
          background-image: linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </section>
  );
};

export default StudySection;
