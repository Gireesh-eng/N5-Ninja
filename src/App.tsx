import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { UserProvider } from '@/contexts/UserContext';
import { ThemeProvider } from 'next-themes';
import Layout from '@/components/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';
import ScrollToTop from '@/components/ScrollToTop';
import { useThemePersistence } from '@/hooks/use-theme-persistence';
import SplashCursor from '@/components/ui/splash-cursor'; // Import the SplashCursor component

// Regular imports for core pages
import Index from '@/pages/Index';
import SignIn from '@/pages/SignIn';

// Lazy load other pages
const NotFound = lazy(() => import('@/pages/NotFound'));
const Dashboard = lazy(() => import('@/pages/Dashboard')); // Import Dashboard from pages directory
const WritingPractice = lazy(() => import('@/pages/WritingPractice')); // Import WritingPractice page
const HiraganaQuiz = lazy(() => import('@/pages/HiraganaQuiz')); // Import HiraganaQuiz page
const KatakanaQuiz = lazy(() => import('@/pages/KatakanaQuiz')); // Import KatakanaQuiz page
const KanjiQuiz = lazy(() => import('@/pages/KanjiQuiz')); // Import KanjiQuiz page
const Analytics = lazy(() => import('@/pages/Analytics')); // Import Analytics page
const Scripts = lazy(() => import('@/pages/Scripts'));
const Vocabulary = lazy(() => import('@/pages/Vocabulary'));
const Grammar = lazy(() => import('@/pages/Grammar'));
const Listening = lazy(() => import('@/pages/Listening'));
const Reading = lazy(() => import('@/pages/Reading'));
const Quizzes = lazy(() => import('@/pages/Quizzes'));
const Flashcards = lazy(() => import('@/pages/Flashcards'));
const Chat = lazy(() => import('@/pages/Chat'));
const Resources = lazy(() => import('@/pages/Resources')); // Lazy load Resources
const Settings = lazy(() => import('@/pages/Settings')); // Lazy load ySettings

// Component to use the theme persistence hook
const ThemePersistenceManager = ({ children }) => {
  useThemePersistence();
  return <>{children}</>;
};

import { UISettingsProvider, useUISettings } from '@/contexts/UISettingsContext';

// ... rest of imports

const AppContent = () => {
  const { showSplashCursor } = useUISettings();

  return (
    <Router>
      <ScrollToTop />
      {showSplashCursor && <SplashCursor TRANSPARENT={false} />} {/* Use the context state */}
      <ThemePersistenceManager>
        <Suspense fallback={<Layout><div className="flex justify-center items-center h-screen">Loading...</div></Layout>}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/resources" element={<Resources />} /> {/* Add Resources route */}


            {/* Protected Routes */}
            {/* Add the Dashboard route */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            {/* ... other protected routes ... */}
            <Route path="/scripts" element={<ProtectedRoute><Scripts /></ProtectedRoute>} />
            <Route path="/vocabulary" element={<ProtectedRoute><Vocabulary /></ProtectedRoute>} />
            <Route path="/grammar" element={<ProtectedRoute><Grammar /></ProtectedRoute>} />
            <Route path="/listening" element={<ProtectedRoute><Listening /></ProtectedRoute>} />
            <Route path="/reading" element={<ProtectedRoute><Reading /></ProtectedRoute>} />
            <Route path="/quizzes" element={<ProtectedRoute><Quizzes /></ProtectedRoute>} />
            <Route path="/flashcards" element={<ProtectedRoute><Flashcards /></ProtectedRoute>} />
            <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
            <Route path="/writing-practice" element={<ProtectedRoute><WritingPractice /></ProtectedRoute>} />

            {/* Script Quiz Routes */}
            <Route path="/hiragana-quiz" element={<ProtectedRoute><HiraganaQuiz /></ProtectedRoute>} />
            <Route path="/katakana-quiz" element={<ProtectedRoute><KatakanaQuiz /></ProtectedRoute>} />
            <Route path="/kanji-quiz" element={<ProtectedRoute><KanjiQuiz /></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} /> {/* Add Analytics route */}
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} /> {/* Add Settings route */}

            {/* Catch-all Not Found Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ThemePersistenceManager>
      <Toaster />
    </Router>
  );
};

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="theme"
      forcedTheme={undefined}
      themes={['light', 'dark', 'system']}
    >
      <UserProvider>
        <UISettingsProvider>{/* Wrap with UISettingsProvider */}
          <AppContent />{/* New component to use the context */}
        </UISettingsProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
