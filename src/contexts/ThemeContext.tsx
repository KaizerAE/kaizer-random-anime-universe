import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { ThemeConfig, ThemeMode, ThemeContextType } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const defaultTheme: ThemeConfig = {
  mode: 'dark',
  animations: true,
  glassEffect: true,
  backgroundGif: null,
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useLocalStorage<ThemeConfig>('kaizer-anime-theme', defaultTheme);

  useEffect(() => {
    // Apply theme class to document
    document.documentElement.className = theme.mode;
    
    // Apply animations preference
    if (!theme.animations) {
      document.documentElement.style.setProperty('--transition-speed', '0s');
    } else {
      document.documentElement.style.removeProperty('--transition-speed');
    }
    
    // Apply background GIF if set
    if (theme.backgroundGif) {
      document.body.style.backgroundImage = `url(${theme.backgroundGif})`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundAttachment = 'fixed';
    } else {
      document.body.style.backgroundImage = '';
    }
  }, [theme]);

  const setTheme = (updates: Partial<ThemeConfig>) => {
    setThemeState((prev) => ({ ...prev, ...updates }));
  };

  const toggleAnimations = () => {
    setTheme({ animations: !theme.animations });
  };

  const toggleGlassEffect = () => {
    setTheme({ glassEffect: !theme.glassEffect });
  };

  const setBackgroundGif = (url: string | null) => {
    setTheme({ backgroundGif: url });
  };

  return (
    <ThemeContext.Provider 
      value={{ theme, setTheme, toggleAnimations, toggleGlassEffect, setBackgroundGif }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

export default ThemeContext;
