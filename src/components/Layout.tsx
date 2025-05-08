import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, BookOpen, BookText, Languages, FlaskConical, MessageCircle, FileText, Menu, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import Logo from './Logo';
import Footer from './Footer'; // Import the Footer component
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useUser } from "@/contexts/UserContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface LayoutProps {
  children: React.ReactNode;
  hideFooter?: boolean; // Add optional prop to hide footer
}

const Layout = ({ children, hideFooter = false }: LayoutProps) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { user, logout } = useUser();
  
  // Use icon.jpg as the default for both logo and profile fallback
  const defaultLogoAndAvatarUrl = '/icon.jpg'; 
  
  // Check if current page is sign in page
  const isSignInPage = location.pathname.toLowerCase() === '/signin';
  
  // Function to handle theme toggling with proper class application
  const toggleTheme = () => {
    // Add transition class before theme change for smoother animation
    document.body.classList.add('theme-switching');
    
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    
    // Ensure the class is applied immediately for a smoother transition
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Store theme preference in localStorage for persistence
    localStorage.setItem('theme', newTheme);
    
    // Remove transition class after animation completes
    setTimeout(() => {
      document.body.classList.remove('theme-switching');
    }, 500);
  };
  
  // Enhanced theme sync on page load and route changes
  useEffect(() => {
    const syncTheme = () => {
      const currentTheme = localStorage.getItem('theme') || 'system';
      const isDark = currentTheme === 'dark' || 
          (currentTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      
      // Apply the theme class immediately
      if (isDark) {
        document.documentElement.classList.add('dark');
        if (resolvedTheme !== 'dark') setTheme('dark');
      } else {
        document.documentElement.classList.remove('dark');
        if (resolvedTheme !== 'light') setTheme('light');
      }
    };

    // Sync theme on mount
    syncTheme();
    
    // Sync theme on route changes
    return () => {
      // Ensure theme is applied correctly before unmounting
      syncTheme();
    };
  }, [location.pathname, resolvedTheme, setTheme]);
  
  const navItems = [
    { name: "Home", path: "/", icon: <Home className="h-5 w-5" /> },
    {name: "Scripts", path: "/scripts", icon: <FileText className="h-5 w-5" />},
    { name: "Vocabulary", path: "/vocabulary", icon: <BookText className="h-5 w-5" /> },
    { name: "Grammar", path: "/grammar", icon: <BookOpen className="h-5 w-5" /> },
    { name: "Flashcards", path: "/flashcards", icon: <Languages className="h-5 w-5" /> },
    { name: "Quizzes", path: "/quizzes", icon: <FlaskConical className="h-5 w-5" /> },
    { name: "Chat", path: "/chat", icon: <MessageCircle className="h-5 w-5" /> },
  ];
  
  // For sign-in page, render a simplified layout without header and footer
  if (isSignInPage) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-washi-light via-washi to-washi-dark dark:from-kachi-light dark:via-kachi dark:to-kachi-dark text-foreground transition-colors duration-300">
        <main className="flex-grow container mx-auto px-4 py-8 bg-background/70 text-foreground transition-colors duration-300 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    );
  }
  
  // For all other pages, render the complete layout with header and footer
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-washi-light via-washi to-washi-dark dark:from-kachi-light dark:via-kachi dark:to-kachi-dark text-foreground transition-colors duration-300">
      {/* Header */}
      <header className="bg-white/95 dark:bg-kachi-light/95 shadow-sm dark:shadow-black/30 sticky top-0 z-50 border-b border-asagi-dark/10 dark:border-kon-dark/30 transition-colors duration-300 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          {/* Left Section: Nav Buttons, Profile Icon/Logo */}
          <div className="flex items-center gap-2">
            {/* Back/Forward Buttons */}
            <Button
              variant="ghost"
              size="icon"
              className="nav-button nav-button-circle-animation"
              onClick={() => navigate(-1)}
              aria-label="Go back"
            >
              <ChevronLeft className="h-5 w-5 text-kon dark:text-asagi-light" />
              <span className="nav-button-tooltip">Go back</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="nav-button nav-button-circle-animation"
              onClick={() => navigate(1)}
              aria-label="Go forward"
            >
              <ChevronRight className="h-5 w-5 text-kon dark:text-asagi-light" />
              <span className="nav-button-tooltip">Go forward</span>
            </Button>

            {/* Profile Icon & Dropdown (acting as logo) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {/* Use Avatar as the trigger, displaying user pic or icon.jpg */}
                <Button variant="ghost" size="icon" className="ml-1 rounded-full p-0 h-9 w-9">
                  <Avatar className="h-9 w-9">
                    {/* Remove avatar image and only use fallback */}
                    <AvatarFallback className="bg-muted">
                      {user ? (user.name?.charAt(0)?.toUpperCase() || 'U') : <img src={defaultLogoAndAvatarUrl} alt="Logo" className="h-full w-full"/>}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              {/* Dropdown Content (only shown if user is logged in) */}
              {user && (
                <DropdownMenuContent align="start" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium truncate">{user.name || 'N5 Ninja User'}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              )}
               {/* Dropdown Content for logged out users (Sign In) */}
              {!user && (
                 <DropdownMenuContent align="start" className="w-40">
                   <DropdownMenuItem onClick={() => navigate('/signin')}>
                     <LogOut className="mr-2 h-4 w-4" />
                     <span>Sign In</span>
                   </DropdownMenuItem>
                 </DropdownMenuContent>
              )}
            </DropdownMenu>
            
            {/* N5 Ninja Text (Optional, can be removed if icon is enough) */}
            <Link to="/" className="ml-2 text-xl font-bold text-akane dark:text-akane-light hidden sm:inline-block">
              N5 Ninja
            </Link>
          </div>

          {/* Right Section: Desktop Navigation & Theme Toggle */}
          <nav className="hidden md:flex space-x-1 items-center">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={location.pathname === item.path ? "default" : "ghost"}
                  className={`flex items-center space-x-1 ${
                    location.pathname === item.path
                    ? 'bg-pink-500 text-white dark:bg-indigo-400 dark:text-white'
                    : 'hover:bg-pink-100 hover:text-pink-700 dark:hover:bg-indigo-700 dark:hover:text-indigo-200'
                  }`}
                >
                  <span className="mr-1.5">{item.icon}</span>
                  <span>{item.name}</span>
                </Button>
              </Link>
            ))}
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full border-asagi dark:border-kon-light hover:bg-asagi-light dark:hover:bg-kon transition-all ml-1"
              aria-label="Toggle dark mode"
            >
              {resolvedTheme === "dark" 
                ? <Sun className="h-5 w-5 text-moegi-light theme-toggle-icon" /> 
                : <Moon className="h-5 w-5 text-kon theme-toggle-icon" />
              }
            </Button>
          </nav>
          
          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden fixed top-4 right-4 z-50">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] sm:w-[300px] bg-background/95 backdrop-blur-sm flex flex-col p-4">
              {/* Mobile Sheet Header - Use icon.jpg as logo */}
              <SheetHeader className='p-0 border-b pb-3 mb-4'>
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex justify-between items-center">
                  <Link to="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                    <img src={defaultLogoAndAvatarUrl} alt="N5 Ninja Logo" className="h-8 w-8 rounded-full mr-2" />
                    <span className="text-lg font-bold text-indigo dark:text-indigo-400">N5 Ninja</span>
                  </Link>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleTheme}
                    className="rounded-full border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all mr-10"
                    aria-label="Toggle dark mode"
                  >
                    {resolvedTheme === "dark"
                      ? <Sun className="h-4 w-4 text-amber-300 theme-toggle-icon" />
                      : <Moon className="h-4 w-4 text-indigo-600 theme-toggle-icon" />
                    }
                  </Button>
                </div>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 flex-grow">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                  >
                    <Button
                      variant={location.pathname === item.path ? "default" : "ghost"}
                      className={`w-full justify-start ${
                        location.pathname === item.path
                        ? 'bg-pink-500 text-white dark:bg-indigo-400 dark:text-white'
                        : 'hover:bg-pink-100 hover:text-pink-700 dark:hover:bg-indigo-700 dark:hover:text-indigo-200'
                      }`}
                    >
                      <span className="mr-2">{item.icon}</span>
                      <span>{item.name}</span>
                    </Button>
                  </Link>
                ))}
              </nav>
              {/* Mobile Profile/Sign In Section - Uses Avatar with icon.jpg fallback */}
              <div className="mt-auto border-t pt-4">
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="w-full justify-start h-12 px-2">
                        <Avatar className="h-8 w-8 mr-2">
                          {/* Replace avatar image with just the fallback */}
                          <AvatarFallback>{user.name?.charAt(0)?.toUpperCase() || 'U'}</AvatarFallback>
                        </Avatar>
                        <div className="text-left">
                          <p className="text-sm font-medium truncate">{user.name || 'N5 Ninja User'}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="top" align="start" className="w-56 mb-1">
                      <DropdownMenuItem onClick={() => { navigate('/dashboard'); setIsOpen(false); }}>
                        <User className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => { navigate('/settings'); setIsOpen(false); }}>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => { logout(); setIsOpen(false); }}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link to="/signin" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 transition-colors duration-300 bg-white/60 dark:bg-kachi-light/40 backdrop-blur-sm rounded-lg my-6 shadow-lg">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>
      
      {/* Use the enhanced Footer component */}
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;
