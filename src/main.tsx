import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Enhanced theme sync function
const syncTheme = () => {
  const theme = localStorage.getItem('theme') || 'system';
  const colorSchemeMetaTag = document.querySelector('meta[name="color-scheme"]');
  
  if (theme === 'dark' || 
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    colorSchemeMetaTag?.setAttribute('content', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    colorSchemeMetaTag?.setAttribute('content', 'light');
  }
};

// Initial theme sync
syncTheme();

// Listen for system theme changes
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
darkModeMediaQuery.addEventListener('change', syncTheme);

// Listen for storage changes (in case theme is changed in another tab)
window.addEventListener('storage', (e) => {
  if (e.key === 'theme') {
    syncTheme();
  }
});

// Create a MutationObserver to ensure dark mode persists through page transitions
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

// Start observing the document
observer.observe(document.documentElement, { 
  attributes: true,
  childList: true,
  subtree: true 
});

createRoot(document.getElementById("root")!).render(<App />);
