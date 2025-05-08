import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Mail, ExternalLink } from 'lucide-react'; // Import social media icons

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-indigo-dark to-indigo-darker text-indigo-lightest py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold text-white mb-4">N5 Ninja</h3>
            <p className="text-indigo-lighter text-sm leading-relaxed">
              Master the JLPT N5 with our comprehensive learning tools and resources.
            </p>
          </div>

          {/* Study Resources */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Study</h3>
            <ul className="space-y-3">
              <li><Link to="/scripts" className="hover:text-sakura transition-colors duration-200 text-sm">Scripts</Link></li>
              <li><Link to="/grammar" className="hover:text-sakura transition-colors duration-200 text-sm">Grammar</Link></li>
              <li><Link to="/vocabulary" className="hover:text-sakura transition-colors duration-200 text-sm">Vocabulary</Link></li>
              <li><Link to="/flashcards" className="hover:text-sakura transition-colors duration-200 text-sm">Flashcards</Link></li>
              <li><Link to="/quizzes" className="hover:text-sakura transition-colors duration-200 text-sm">Quizzes</Link></li>
              <li><Link to="/chat" className="hover:text-sakura transition-colors duration-200 text-sm">AI Chat</Link></li>
            </ul>
          </div>

          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">About</h3>
            <ul className="space-y-3">
              <li><a href="https://www.jlpt.jp/e/about/levelsummary.html" target="_blank" rel="noopener noreferrer" className="hover:text-sakura transition-colors duration-200 text-sm">JLPT Levels</a></li>
              <li><a href="mailto:support@n5ninja.com" className="hover:text-sakura transition-colors duration-200 text-sm">Contact Us</a></li>
            </ul>
            <p className="text-indigo-lighter mt-4 text-xs">
              The JLPT is a standardized test evaluating Japanese proficiency. N5 is the foundational level.
            </p>
          </div>

          {/* Connect Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-indigo-lighter hover:text-sakura transition-colors duration-200">
                <Github size={20} />
              </a>
              <a href="#" className="text-indigo-lighter hover:text-sakura transition-colors duration-200">
                <Twitter size={20} />
              </a>
              <a href="mailto:support@n5ninja.com" className="text-indigo-lighter hover:text-sakura transition-colors duration-200">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-indigo-darker pt-8 text-center">
          <p className="text-indigo-lighter text-sm">© {new Date().getFullYear()} N5 Ninja. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
