import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero'; 
import { motion } from 'framer-motion';
import { BookOpen, BarChart2, Users, Zap, CheckCircle, PenTool } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUser } from '@/contexts/UserContext';

const Index = () => {
  const { user } = useUser(); // Get the current user
  const navigate = useNavigate();
  
  // Handle Get Started button click
  const handleGetStarted = () => {
    // Check both the user object and localStorage for authentication
    const isAuthenticated = user || localStorage.getItem('auth_token');
    
    if (isAuthenticated) {
      // If user is already logged in, navigate to scripts page
      console.log("User is authenticated, navigating to scripts");
      navigate('/scripts');
    } else {
      // If not logged in, navigate to sign-in
      console.log("User is not authenticated, navigating to signin");
      navigate('/signin');
    }
  };

  // Update to use React Router's navigate instead of window.location
  const handleStudyCardClick = (path: string) => {
    navigate(path);
  };

  // Animation variants for staggering children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Stagger effect for child elements
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    },
  };

  const buttonHoverEffect = {
    scale: 1.05,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  };

  const cardHoverEffect = {
    scale: 1.03,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  };

  // Data for the study cards
  const studyResources = [
    { title: "Grammar Guide", description: "Master essential N5 grammar points.", icon: BookOpen, color: "indigo", path: "/grammar" },
    { title: "Kanji Practice", description: "Learn the fundamental 100 N5 kanji.", icon: Zap, color: "purple", path: "/scripts?tab=kanji" },
    { title: "Vocabulary Builder", description: "Build your core 800 N5 vocabulary.", icon: CheckCircle, color: "pink", path: "/vocabulary" },
    { title: "Listening Exercises", description: "Improve comprehension with audio.", icon: Users, color: "teal", path: "/listening" },
    { title: "Reading Comprehension", description: "Practice reading simple texts.", icon: BarChart2, color: "sky", path: "/reading" },
    { title: "Writing Practice", description: "Master Hiragana, Katakana and Kanji with interactive writing exercises.", icon: PenTool, color: "yellow", path: "/writing-practice" }
  ];


  return (
    <Layout>
      {/* --- Hero Section --- */}
      <Hero /> {/* Assuming this component exists and has its own animations */}

      {/* --- Study Resources Section --- */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.1 }}
        className="py-1 pt-10 bg-gradient-to-b from-white to-indigo-50 dark:from-gray-900 dark:to-indigo-950"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-indigo-900 dark:text-indigo-100 mb-8">
              Your JLPT N5 Study Hub
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12">
              Interactive resources designed to help you conquer the N5 exam.
              Click a section below to start learning.
            </p>
          </motion.div>

          {/* Study Cards Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-4"
          >
            {studyResources.map((resource, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={cardHoverEffect}
                whileTap={{ scale: 0.95 }}
                className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl border border-gray-100 dark:border-gray-700 cursor-pointer transform transition-all duration-300 flex flex-col items-center text-center h-full`}
                onClick={() => handleStudyCardClick(resource.path)}
                role="link"
                aria-label={`Go to ${resource.title}`}
                tabIndex={0}
                onKeyPress={(e) => { if (e.key === 'Enter') handleStudyCardClick(resource.path); }}
              >
                <motion.div
                  className={`w-16 h-16 rounded-full bg-${resource.color}-100 dark:bg-${resource.color}-900/50 flex items-center justify-center mb-5 border-2 border-${resource.color}-200 dark:border-${resource.color}-700`}
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <resource.icon className={`h-8 w-8 text-${resource.color}-600 dark:text-${resource.color}-400`} />
                </motion.div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">{resource.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 flex-grow">{resource.description}</p>
                <span className={`mt-4 text-xs text-${resource.color}-500 dark:text-${resource.color}-400 font-medium group-hover:underline`}>
                  Start Learning →
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Explore All Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <motion.div
              whileHover={buttonHoverEffect}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link
                to="/resources"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
              >
                Explore All Learning Materials
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

       {/* --- Why Choose Us Section --- */}
       <section className="py-20 bg-gradient-to-r from-purple-50 via-pink-50 to-white dark:from-purple-950 dark:via-pink-950 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-purple-900 dark:text-purple-100 mb-4">
              Features to Accelerate Your Learning
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-400 max-w-3xl mx-auto">
              Leverage our tools and community to reach your N5 goals faster.
            </p>
          </motion.div>

          <motion.div
             variants={containerVariants}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, amount: 0.2 }}
             className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { icon: BookOpen, title: "Structured Lessons", desc: "Clear explanations and examples for grammar and vocabulary.", color: "indigo" },
              { icon: BarChart2, title: "Progress Tracking", desc: "Monitor your learning journey and identify weak spots.", color: "purple" },
              { icon: Users, title: "Active Community", desc: "Connect with fellow learners, ask questions, and stay motivated.", color: "pink" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, boxShadow: "0 15px 25px rgba(0, 0, 0, 0.1)" }}
                className={`bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 text-center transition-all duration-300`}
              >
                <div className={`w-12 h-12 rounded-lg bg-${feature.color}-100 dark:bg-${feature.color}-900/50 flex items-center justify-center mx-auto mb-5 border border-${feature.color}-200 dark:border-${feature.color}-700`}>
                   <feature.icon className={`h-6 w-6 text-${feature.color}-600 dark:text-${feature.color}-400`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* --- About JLPT N5 Section (Enhanced Animations) --- */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 relative overflow-hidden">
        {/* Decorative elements (kept from original) */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-100 dark:bg-indigo-900/30 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-100 dark:bg-purple-900/30 rounded-full opacity-50 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-extrabold text-center mb-16"
          >
            <motion.span 
              className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-500 inline-block pb-2 border-b-2 border-indigo-200 dark:border-indigo-700" // Changed gradient to indigo-400/pink-500 and border to indigo
              whileHover={{ 
                scale: 1.05, 
                textShadow: "0 0 8px rgba(129, 140, 248, 0.5)", // Changed text shadow color to indigo-400
                borderBottomWidth: "4px",
                borderBottomColor: "#818cf8" // Changed border color to indigo-400
              }}
              transition={{
              type: "spring",
              stiffness: 300,
              damping: 10
              }}
  >
             Understanding JLPT N5
            </motion.span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
            {/* What You'll Learn Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 20px 30px -5px rgba(0, 0, 0, 0.1), 0 10px 15px -5px rgba(0, 0, 0, 0.05)"
              }}
            >
              <div className="flex items-center mb-6">
                <motion.div
                  className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mr-4 border border-indigo-200 dark:border-indigo-700"
                  whileHover={{ rotate: 360, scale: 1.2, backgroundColor: ["#E0E7FF", "#C7D2FE", "#A5B4FC"] }} // Enhanced hover bg
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">What You'll Learn</h3>
              </div>

              <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                The JLPT N5 is the first step, certifying basic Japanese understanding. It focuses on foundational skills needed for simple daily communication.
              </p>
              <p className="mb-4 font-semibold text-gray-800 dark:text-gray-100">
                N5 proficiency enables you to:
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Read simple sentences in Hiragana, Katakana, & basic Kanji.",
                  "Understand common greetings & everyday conversations.",
                  "Grasp short, familiar texts.",
                  "Recognize ~100 Kanji & ~800 vocabulary words."
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start group"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }} // Stagger list items
                    viewport={{ once: true }}
                  >
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mr-3 group-hover:bg-indigo-600 group-hover:text-white dark:group-hover:bg-indigo-400 dark:group-hover:text-gray-900 transition-all duration-300 scale-90 group-hover:scale-100">✓</span>
                    <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-300">{item}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 border-l-4 border-blue-500 dark:border-blue-400">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">JLPT N5 Competency</h4>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  The N5 level certifies that you can understand Japanese used in everyday situations to a certain degree, including basic greetings, simple conversations about topics regularly encountered in daily life, and classroom instruction.
                </p>
              </div>
            </motion.div>

            {/* Exam Structure Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
               whileHover={{
                scale: 1.03,
                boxShadow: "0 20px 30px -5px rgba(0, 0, 0, 0.1), 0 10px 15px -5px rgba(0, 0, 0, 0.05)"
              }}
            >
              <div className="flex items-center mb-6">
                <motion.div
                  className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mr-4 border border-purple-200 dark:border-purple-700"
                   whileHover={{ rotate: -360, scale: 1.2, backgroundColor: ["#E0E7FF", "#C7D2FE", "#A5B4FC"] }} // Enhanced hover bg
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /> {/* Added checkmark */}
                  </svg>
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Exam Structure</h3>
              </div>

              <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Section</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Duration</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Points</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {[
                      { section: "Language Knowledge (Vocabulary)", duration: "20 mins", points: "N/A*" }, // Updated N5 2020 timing
                      { section: "Language Knowledge (Grammar) & Reading", duration: "40 mins", points: "N/A*" }, // Updated N5 2020 timing
                      { section: "Listening", duration: "30 mins", points: "N/A*" }
                    ].map((row, index) => (
                      <motion.tr
                        key={index}
                        className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 ${index % 2 === 0 ? "bg-gray-50/50 dark:bg-gray-800/50" : "bg-white dark:bg-gray-800"}`}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 + 0.5 }} // Stagger rows slightly later
                        viewport={{ once: true }}
                      >
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{row.section}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{row.duration}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{row.points}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
               <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">*Scoring is combined: (Vocab/Grammar/Reading) section and Listening section. Total score needed.</p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
                className="mt-8 bg-indigo-50 dark:bg-indigo-900/40 rounded-lg p-4 border-l-4 border-indigo-500 dark:border-indigo-400"
              >
                <p className="text-sm text-indigo-900 dark:text-indigo-100">
                  <strong>Passing Score:</strong> Achieve 80/180 total points, AND at least 38/120 in Language Knowledge (Vocab/Grammar/Reading) AND 19/60 in Listening.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Interactive Learning Roadmap (Unique Feature) --- */}
      <section className="py-16 bg-gradient-to-b from-white to-indigo-50 dark:from-gray-900 dark:to-indigo-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-indigo-900 dark:text-indigo-100 mb-4">
              Your JLPT N5 Learning Path
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              A structured roadmap to guide you from beginner to N5 certification
            </p>
          </motion.div>

          {/* Learning Path Timeline */}
          <div className="relative">
            {/* Timeline connector (vertical line) */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-indigo-300 dark:bg-indigo-700 hidden md:block" 
                 style={{ transform: 'translateX(-50%)' }} />

            {/* Timeline Phases */}
            { [
              {
                phase: "Phase 1",
                title: "Building Foundations",
                description: "Master the Japanese writing systems and basic expressions",
                skills: [
                  "Learn all Hiragana and Katakana characters",
                  "Basic greetings and self-introduction",
                  "Simple sentence structure"
                ],
                icon: BookOpen,
                color: "indigo",
                weeks: "Weeks 1-4",
                link: "/scripts",
                image: "/public/assets/strokes/hiragana/あ.gif"
              },
              {
                phase: "Phase 2",
                title: "Grammar Essentials",
                description: "Develop core grammar knowledge needed for N5",
                skills: [
                  "Basic particles (は, が, を, に, で)",
                  "Present and past tense verb forms",
                  "Question formation and common expressions"
                ],
                icon: PenTool,
                color: "purple",
                weeks: "Weeks 5-8",
                right: true,
                link: "/grammar",
                image: "/public/placeholder.svg"
              },
              {
                phase: "Phase 3",
                title: "Vocabulary Building",
                description: "Expand your word bank with N5 essential vocabulary",
                skills: [
                  "Core 800 N5 vocabulary words",
                  "Numbers, time, and date expressions",
                  "Basic adjectives and adverbs"
                ],
                icon: CheckCircle,
                color: "pink",
                weeks: "Weeks 9-12",
                link: "/vocabulary",
                image: "/public/placeholder.svg"
              },
              {
                phase: "Phase 4",
                title: "Listening & Speaking",
                description: "Enhance your comprehension and conversation abilities",
                skills: [
                  "Understanding slow, clear speech",
                  "Basic conversational practice",
                  "Responding to common questions"
                ],
                icon: Users,
                color: "blue",
                weeks: "Weeks 13-16",
                right: true,
                link: "/listening",
                image: "/public/placeholder.svg"
              },
              {
                phase: "Phase 5",
                title: "Reading & Writing",
                description: "Develop literacy skills with simple texts and kanji",
                skills: [
                  "Recognize ~100 basic kanji",
                  "Read short, simple passages",
                  "Write basic sentences and messages"
                ],
                icon: BarChart2,
                color: "teal",
                weeks: "Weeks 17-18",
                link: "/reading",
                image: "/public/placeholder.svg"
              },
              {
                phase: "Final Phase",
                title: "Exam Preparation",
                description: "Review and practice for the JLPT N5 test",
                skills: [
                  "Mock exam practice",
                  "Review of weak areas",
                  "Test-taking strategies"
                ],
                icon: Zap,
                color: "emerald",
                weeks: "Weeks 19-20",
                right: true,
                link: "/quizzes",
                image: "/public/placeholder.svg"
              }
            ].map((phase, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className={`mb-16 relative`}
              >
                {/* Timeline node */}
                <div className="absolute left-1/2 top-8 w-6 h-6 bg-white dark:bg-gray-900 border-4 border-indigo-400 dark:border-indigo-600 rounded-full hidden md:block"
                     style={{ transform: 'translateX(-50%)' }} />
                
                {/* Card container */}
                <div className="grid md:grid-cols-2 gap-4 md:gap-8">
                  {/* Left side */}
                  <div className={`${phase.right ? 'md:order-2' : ''}`}>
                    <motion.div
                      whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)" }}
                      className={`bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 h-full`}
                    >
                      <div className="flex items-center mb-4">
                        <div className={`w-12 h-12 rounded-full bg-${phase.color}-100 dark:bg-${phase.color}-900/50 flex items-center justify-center mr-4 shrink-0`}>
                          <phase.icon className={`h-6 w-6 text-${phase.color}-600 dark:text-${phase.color}-400`} />
                        </div>
                        <div>
                          <h4 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium">
                            {phase.phase} • {phase.weeks}
                          </h4>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                            {phase.title}
                          </h3>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {phase.description}
                      </p>
                      
                      <ul className="space-y-2 mb-4">
                        {phase.skills.map((skill, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-green-500 dark:text-green-400 mr-2">✓</span>
                            <span className="text-gray-700 dark:text-gray-300 text-sm">{skill}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Link 
                        to={phase.link}
                        className={`mt-2 inline-flex items-center text-${phase.color}-600 dark:text-${phase.color}-400 text-sm font-medium hover:underline`}
                      >
                        Start learning
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    </motion.div>
                  </div>
                  
                  {/* Right side - Visual content */}
                  <div className={`${phase.right ? 'md:order-1' : ''}`}>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      className={`bg-gradient-to-br from-${phase.color}-50 to-${phase.color}-100 dark:from-${phase.color}-900/30 dark:to-${phase.color}-800/20 rounded-xl shadow-md p-6 border border-${phase.color}-200 dark:border-${phase.color}-800/50 h-full flex flex-col justify-center items-center`}
                    >
                      {index === 0 && (
                        <div className="text-center">
                          <div className="grid grid-cols-3 gap-3 mb-4">
                            {['あ', 'い', 'う'].map((char, i) => (
                              <motion.div 
                                key={i}
                                whileHover={{ scale: 1.1 }}
                                className="bg-white dark:bg-gray-800 rounded-lg p-2 shadow-sm flex items-center justify-center"
                              >
                                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{char}</span>
                              </motion.div>
                            ))}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Master Japanese scripts</p>
                          <div className="flex justify-center space-x-2">
                            <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded text-xs">Hiragana</span>
                            <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded text-xs">Katakana</span>
                          </div>
                        </div>
                      )}

                      {index === 1 && (
                        <div className="text-center">
                          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-md mb-4">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Japanese sentence structure:</p>
                            <div className="grid grid-cols-4 gap-2 mt-2">
                              <div className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded text-xs text-purple-800 dark:text-purple-200">Subject</div>
                              <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded text-xs text-blue-800 dark:text-blue-200">Object</div>
                              <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded text-xs text-green-800 dark:text-green-200">Verb</div>
                              <div className="bg-pink-100 dark:bg-pink-900/50 p-2 rounded text-xs text-pink-800 dark:text-pink-200">Particle</div>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Example: 私は本を読みます</p>
                        </div>
                      )}

                      {index === 2 && (
                        <div className="grid grid-cols-2 gap-3 w-full">
                          { [
                            { word: "水", reading: "みず", meaning: "water" },
                            { word: "食べる", reading: "たべる", meaning: "to eat" },
                            { word: "大きい", reading: "おおきい", meaning: "big" },
                            { word: "学校", reading: "がっこう", meaning: "school" }
                          ].map((vocab, i) => (
                            <motion.div
                              key={i}
                              whileHover={{ y: -3 }}
                              className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm"
                            >
                              <p className="font-bold text-lg text-pink-700 dark:text-pink-400">{vocab.word}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{vocab.reading}</p>
                              <p className="text-xs text-gray-600 dark:text-gray-300">{vocab.meaning}</p>
                            </motion.div>
                          ))}
                        </div>
                      )}

                      {index === 3 && (
                        <div className="text-center">
                          <div className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-md inline-flex items-center justify-center w-24 h-24 mb-4">
                            <motion.div
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ repeat: Infinity, duration: 2 }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                              </svg>
                            </motion.div>
                          </div>
                          <div className="space-y-2">
                            <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg text-sm text-blue-800 dark:text-blue-200">
                              "おはようございます"
                            </div>
                            <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg text-sm text-blue-800 dark:text-blue-200">
                              "ありがとうございます"
                            </div>
                          </div>
                        </div>
                      )}

                      {index === 4 && (
                        <div className="w-full">
                          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-md mb-3">
                            <div className="flex items-center justify-center space-x-2 mb-2">
                              {['木', '山', '川', '日'].map((kanji, i) => (
                                <span key={i} className="text-xl font-bold text-teal-700 dark:text-teal-400">{kanji}</span>
                              ))}
                            </div>
                            <div className="h-px bg-gray-200 dark:bg-gray-700 my-2"></div>
                            <p className="text-xs text-center text-gray-600 dark:text-gray-300">Learn basic kanji characters</p>
                          </div>
                          <div className="bg-white dark:bg-gray-800 rounded-lg p-2 shadow-md">
                            <p className="text-xs text-gray-500 dark:text-gray-400">Sample text:</p>
                            <p className="text-sm text-teal-800 dark:text-teal-200 mt-1">私は毎日日本語を勉強します。</p>
                          </div>
                        </div>
                      )}

                      {index === 5 && (
                        <div className="w-full text-center">
                          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md mb-3">
                            <div className="flex justify-center mb-3">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-500 dark:text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">JLPT N5 EXAM</p>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded text-xs text-emerald-800 dark:text-emerald-200">Grammar</div>
                            <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded text-xs text-emerald-800 dark:text-emerald-200">Vocabulary</div>
                            <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded text-xs text-emerald-800 dark:text-emerald-200">Listening</div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Final Call to Action Section --- */}
       <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl font-extrabold text-white mb-6"
            >
                Ready to Start Your N5 Journey?
            </motion.h2>
             <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-lg text-indigo-100 mb-10 max-w-2xl mx-auto"
            >
                Join hundreds of learners and gain the confidence to pass the JLPT N5. Access all resources and start learning today!
            </motion.p>
             <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 150 }}
                viewport={{ once: true }}
             >
                 <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "#ffffff", color: "#4f46e5" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleGetStarted}
                    className="px-10 py-4 bg-white text-indigo-600 font-semibold rounded-full shadow-xl text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white"
                 >
                     Get Started Now
                 </motion.button>
             </motion.div>
        </div>
       </section>

    </Layout>
  );
};

export default Index;