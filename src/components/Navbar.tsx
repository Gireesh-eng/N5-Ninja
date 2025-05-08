import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, BookOpen, BookText, Languages, FlaskConical, MessageCircle, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { StickyNavbar } from "@/components/ui/sticky-navbar";
import { BorderBeam } from "@/components/ui/border-beam";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Grammar", path: "/grammar", icon: <BookOpen className="w-5 h-5" /> },
    { name: "Vocabulary", path: "/vocabulary", icon: <BookText className="w-5 h-5" /> },
    { name: "Flashcards", path: "/flashcards", icon: <Languages className="w-5 h-5" /> },
    { name: "Quizzes", path: "/quizzes", icon: <FlaskConical className="w-5 h-5" /> },
    { name: "Chat", path: "/chat", icon: <MessageCircle className="w-5 h-5" /> },
  ];

  return (
    <StickyNavbar className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-pink-500">N5</span>
              <span className="ml-1 font-medium">Ninja</span>
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.path}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-pink-50 hover:text-pink-500 transition-colors"
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </Link>
            ))}
          </div>
          
          <div className="flex items-center md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleMenu} 
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-pink-50 hover:text-pink-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <BorderBeam size={400} duration={12} delay={9} />
    </StickyNavbar>
  );
};

export default Navbar;
