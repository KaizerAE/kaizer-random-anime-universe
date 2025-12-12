import React from 'react';
import { motion } from 'framer-motion';
import { Anime } from '../../types';
import { Badge } from '../common/Badge';
import { Card } from '../common/Card';

interface AnimeDetailsProps {
  anime: Anime;
  onClose: () => void;
}

export const AnimeDetails: React.FC<AnimeDetailsProps> = ({ anime, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <Card className="p-0">
          {/* Header with Image */}
          <div className="relative h-64 md:h-96">
            <img
              src={anime.main_picture?.large || anime.main_picture?.medium}
              alt={anime.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {anime.title}
              </h2>
              {anime.alternative_titles?.en && (
                <p className="text-lg text-gray-300">{anime.alternative_titles.en}</p>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Quick Stats */}
            <div className="flex flex-wrap gap-2">
              {anime.mean && (
                <Badge variant="primary">
                  ⭐ {anime.mean.toFixed(1)}
                </Badge>
              )}
              {anime.media_type && (
                <Badge variant="secondary">
                  {anime.media_type.toUpperCase()}
                </Badge>
              )}
              {anime.status && (
                <Badge variant="outline">
                  {anime.status.replace('_', ' ').toUpperCase()}
                </Badge>
              )}
              {anime.num_episodes && (
                <Badge variant="outline">
                  {anime.num_episodes} Episodes
                </Badge>
              )}
            </div>

            {/* Synopsis */}
            {anime.synopsis && (
              <div>
                <h3 className="text-xl font-semibold mb-2">Synopsis</h3>
                <p className="text-gray-300 leading-relaxed">{anime.synopsis}</p>
              </div>
            )}

            {/* Genres */}
            {anime.genres && anime.genres.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-2">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {anime.genres.map((genre) => (
                    <Badge key={genre.id} variant="primary">
                      {genre.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {anime.start_season && (
                <div>
                  <h4 className="font-semibold text-gray-400 mb-1">Season</h4>
                  <p>
                    {anime.start_season.season} {anime.start_season.year}
                  </p>
                </div>
              )}
              {anime.source && (
                <div>
                  <h4 className="font-semibold text-gray-400 mb-1">Source</h4>
                  <p className="capitalize">{anime.source.replace('_', ' ')}</p>
                </div>
              )}
              {anime.rating && (
                <div>
                  <h4 className="font-semibold text-gray-400 mb-1">Rating</h4>
                  <p className="capitalize">{anime.rating.replace('_', ' ')}</p>
                </div>
              )}
              {anime.studios && anime.studios.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-400 mb-1">Studios</h4>
                  <p>{anime.studios.map((s) => s.name).join(', ')}</p>
                </div>
              )}
            </div>

            {/* User List Status */}
            {anime.my_list_status && (
              <div className="border-t border-gray-700 pt-4">
                <h3 className="text-xl font-semibold mb-3">Your Status</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-400 mb-1">Status</h4>
                    <p className="capitalize">
                      {anime.my_list_status.status.replace('_', ' ')}
                    </p>
                  </div>
                  {anime.my_list_status.score > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-400 mb-1">Your Score</h4>
                      <p>{anime.my_list_status.score}/10</p>
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold text-gray-400 mb-1">Episodes Watched</h4>
                    <p>
                      {anime.my_list_status.num_episodes_watched}
                      {anime.num_episodes && ` / ${anime.num_episodes}`}
                    </p>
                  </div>
                  {anime.my_list_status.updated_at && (
                    <div>
                      <h4 className="font-semibold text-gray-400 mb-1">Last Updated</h4>
                      <p>{new Date(anime.my_list_status.updated_at).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <a
                href={`https://myanimelist.net/anime/${anime.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-center font-medium transition-colors"
              >
                View on MyAnimeList
              </a>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};
