import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../common/Button';
import { useAnime } from '../../contexts/AnimeContext';
import { useSettings } from '../../contexts/SettingsContext';

export const RandomAnimeButton: React.FC = () => {
  const { animeList, getRandomAnime } = useAnime();
  const { settings } = useSettings();
  const [isSpinning, setIsSpinning] = useState(false);

  const handleRandomClick = () => {
    if (animeList.length === 0) return;
    
    setIsSpinning(true);
    
    // Play sound if enabled
    if (settings.soundEnabled) {
      const audio = new Audio('/sounds/spin.mp3');
      audio.volume = settings.volume;
      audio.play().catch(() => {});
    }

    // Simulate spinning animation
    setTimeout(() => {
      getRandomAnime();
      setIsSpinning(false);
      
      if (settings.soundEnabled) {
        const successAudio = new Audio('/sounds/success.mp3');
        successAudio.volume = settings.volume;
        successAudio.play().catch(() => {});
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        animate={isSpinning ? { rotate: 360 } : { rotate: 0 }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          repeat: isSpinning ? Infinity : 0,
        }}
      >
        <Button
          onClick={handleRandomClick}
          disabled={animeList.length === 0 || isSpinning}
          className="text-lg px-8 py-4 rounded-full"
          variant="primary"
        >
          {isSpinning ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Spinning...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Get Random Anime
            </span>
          )}
        </Button>
      </motion.div>
      
      {animeList.length === 0 && (
        <p className="text-sm text-gray-400">Loading anime list...</p>
      )}
    </div>
  );
};
