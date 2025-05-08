import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UISettingsContextType {
  showSplashCursor: boolean;
  toggleSplashCursor: () => void;
}

const UISettingsContext = createContext<UISettingsContextType | undefined>(undefined);

export const UISettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showSplashCursor, setShowSplashCursor] = useState(false); // Default is false

  const toggleSplashCursor = () => {
    setShowSplashCursor(prev => !prev);
  };

  return (
    <UISettingsContext.Provider value={{ showSplashCursor, toggleSplashCursor }}>
      {children}
    </UISettingsContext.Provider>
  );
};

export const useUISettings = () => {
  const context = useContext(UISettingsContext);
  if (context === undefined) {
    throw new Error('useUISettings must be used within a UISettingsProvider');
  }
  return context;
};
