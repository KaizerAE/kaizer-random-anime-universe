import React from 'react';
import { Link } from 'react-router-dom';
import { Anime } from '../../types/anime';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { cn } from '../../utils/helpers';

interface AnimeCardProps {
  anime: Anime;
  variant?: 'default' | 'compact' | 'detailed';
  showStatus?: boolean;
  onClick?: () => void;
  className?: string;
}

export const AnimeCard: React.FC<AnimeCardProps> = ({
  anime,
  variant = 'default',
  showStatus = true,
  onClick,
  className,
}) => {
  const statusColors: Record<string, any> = {
    watching: 'info',
    completed: 'success',
    on_hold: 'warning',
    dropped: 'danger',
    plan_to_watch: 'purple',
  };

  if (variant === 'compact') {
    return (
      <Card
        variant="bordered"
        padding="sm"
        hover
        onClick={onClick}
        className={cn('cursor-pointer', className)}
      >
        <div className="flex items-center gap-3">
          <img
            src={anime.main_picture?.medium || '/placeholder-anime.jpg'}
            alt={anime.title}
            className="w-16 h-20 object-cover rounded"
            loading="lazy"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm text-gray-900 dark:text-white truncate">
              {anime.title}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <Badge size="sm" variant="purple">
                {anime.media_type || 'TV'}
              </Badge>
              {anime.mean && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  ⭐ {anime.mean}
                </span>
              )}
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      variant="default"
      padding="none"
      hover
      onClick={onClick}
      className={cn('overflow-hidden group cursor-pointer', className)}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={anime.main_picture?.large || anime.main_picture?.medium || '/placeholder-anime.jpg'}
          alt={anime.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        {/* Score Overlay */}
        {anime.mean && (
          <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg">
            <span className="text-yellow-400 font-bold text-sm">
              ⭐ {anime.mean}
            </span>
          </div>
        )}
        {/* Status Badge */}
        {showStatus && anime.my_list_status && (
          <div className="absolute bottom-2 left-2">
            <Badge variant={statusColors[anime.my_list_status.status] || 'default'} size="sm">
              {anime.my_list_status.status.replace('_', ' ')}
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
          {anime.title}
        </h3>

        {variant === 'detailed' && anime.synopsis && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {anime.synopsis}
          </p>
        )}

        <div className="flex items-center gap-2 flex-wrap">
          <Badge size="sm" variant="purple">
            {anime.media_type || 'TV'}
          </Badge>
          {anime.num_episodes && (
            <Badge size="sm" variant="default">
              {anime.num_episodes} eps
            </Badge>
          )}
          {anime.genres && anime.genres.length > 0 && (
            <Badge size="sm" variant="pink">
              {anime.genres[0].name}
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
};

AnimeCard.displayName = 'AnimeCard';
