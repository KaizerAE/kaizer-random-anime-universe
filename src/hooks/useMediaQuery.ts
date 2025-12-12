import { useState, useEffect } from 'react';

/**
 * Custom hook for responsive media queries
 * @param query - The media query string (e.g., '(min-width: 768px)')
 * @returns Boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const getMatches = (query: string): boolean => {
    // Prevent SSR issues
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState<boolean>(getMatches(query));

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    // Triggered at the first client-side load and if query changes
    const handleChange = () => {
      setMatches(getMatches(query));
    };

    // Listen to matchMedia changes
    matchMedia.addEventListener('change', handleChange);
    handleChange();

    return () => {
      matchMedia.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}

/**
 * Predefined breakpoint hooks
 */
export const useIsSmallScreen = () => useMediaQuery('(max-width: 639px)');
export const useIsMediumScreen = () => useMediaQuery('(min-width: 640px) and (max-width: 767px)');
export const useIsLargeScreen = () => useMediaQuery('(min-width: 768px)');
export const useIsExtraLargeScreen = () => useMediaQuery('(min-width: 1024px)');
