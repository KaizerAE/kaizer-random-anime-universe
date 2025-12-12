import React from 'react';
import { Anime } from '../../types/anime';
import { AnimeCard } from './AnimeCard';
import { Loading } from '../common/Loading';
import { ErrorMessage } from '../common/ErrorMessage';
import { cn } from '../../utils/helpers';

interface AnimeGridProps {
  anime: Anime[];
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  onAnimeClick?: (anime: Anime) => void;
  variant?: 'default' | 'compact' | 'detailed';
  emptyMessage?: string;
  className?: string;
}

export const AnimeGrid: React.FC<AnimeGridProps> = ({
  anime,
  isLoading = false,
  error = null,
  onRetry,
  onAnimeClick,
  variant = 'default',
  emptyMessage = 'No anime found',
  className,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loading size="lg" text="Loading anime..." />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={onRetry}
      />
    );
  }

  if (anime.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="text-6xl">🎌</div>
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            No Anime Found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {emptyMessage}
          </p>
        </div>
      </div>
    );
  }

  const gridClasses = {
    default: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4',
    compact: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3',
    detailed: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6',
  };

  return (
    <div className={cn(gridClasses[variant], className)}>
      {anime.map((item) => (
        <AnimeCard
          key={item.id}
          anime={item}
          variant={variant}
          onClick={() => onAnimeClick?.(item)}
        />
      ))}
    </div>
  );
};

AnimeGrid.displayName = 'AnimeGrid';
