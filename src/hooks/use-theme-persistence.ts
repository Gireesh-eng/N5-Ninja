import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from 'next-themes';

/**
 * Custom hook to ensure theme persists across page navigation
 * Should be used in the top-level App component
 */
export const useThemePersistence = () => {
  const location = useLocation();
  const { theme, setTheme, resolvedTheme } = useTheme();

  // Sync theme on route changes and initialization
  useEffect(() => {
    const syncTheme = () => {
      const savedTheme = localStorage.getItem('theme') || 'system';
      const isDark = savedTheme === 'dark' || 
          (savedTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      
      // Apply the theme class immediately
      if (isDark) {
        document.documentElement.classList.add('dark');
        if (resolvedTheme !== 'dark') setTheme('dark');
      } else {
        document.documentElement.classList.remove('dark');
        if (resolvedTheme !== 'light') setTheme('light');
      }
    };

    // Initial sync
    syncTheme();
    
    // Create a MutationObserver to monitor DOM changes during route transitions
    const observer = new MutationObserver(() => {
      const currentTheme = localStorage.getItem('theme') || 'system';
      const isDark = currentTheme === 'dark' || 
        (currentTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      
      if (isDark && !document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.add('dark');
      } else if (!isDark && document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
      }
    });

    // Start observing
    observer.observe(document.documentElement, { 
      attributes: true,
      childList: true,
      subtree: true 
    });
    
    return () => {
      // Clean up observer on unmount
      observer.disconnect();
    };
  }, [location.pathname, resolvedTheme, setTheme]);

  return { theme, setTheme, resolvedTheme };
};