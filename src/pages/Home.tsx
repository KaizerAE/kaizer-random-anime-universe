pages/Home.tsximport { useState, useEffect } from 'react';
import { Anime } from '../types';
import { getCachedAnimeList, getRandomAnime } from '../api/malClient';
import { useFavorites } from '../contexts/FavoritesContext';
import { motion } from 'framer-motion';

export default function Home() {
  const [randomAnime, setRandomAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const handleGetRandom = async () => {
    setLoading(true);
    setError(null);
    try {
      const anime = await getRandomAnime();
      setRandomAnime(anime);
    } catch (err) {
      setError('Failed to fetch random anime. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = () => {
    if (!randomAnime) return;
    if (isFavorite(randomAnime.mal_id)) {
      removeFavorite(randomAnime.mal_id);
    } else {
      addFavorite(randomAnime);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
            🎌 Kaizer's Random Anime Universe
          </h1>
          <p className="text-xl text-purple-200">
            Discover random anime from KaizerAE's MyAnimeList
          </p>
        </motion.div>

        <div className="flex justify-center mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGetRandom}
            disabled={loading}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-12 py-4 rounded-full text-xl font-bold shadow-2xl hover:shadow-purple-500/50 transition-all disabled:opacity-50"
          >
            {loading ? '🎲 Rolling...' : '🎲 Get Random Anime'}
          </motion.button>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 px-6 py-4 rounded-lg mb-8 text-center">
            {error}
          </div>
        )}

        {randomAnime && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-black/40 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl border border-purple-500/30"
          >
            <div className="grid md:grid-cols-3 gap-8 p-8">
              <div className="md:col-span-1">
                <img
                  src={randomAnime.images.webp.large_image_url || randomAnime.images.jpg.large_image_url}
                  alt={randomAnime.title}
                  className="w-full rounded-lg shadow-xl"
                />
                <button
                  onClick={toggleFavorite}
                  className={`w-full mt-4 px-6 py-3 rounded-lg font-semibold transition-all ${
                    isFavorite(randomAnime.mal_id)
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-purple-500 hover:bg-purple-600 text-white'
                  }`}
                >
                  {isFavorite(randomAnime.mal_id) ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
                </button>
              </div>

              <div className="md:col-span-2 space-y-4">
                <h2 className="text-4xl font-bold text-white">{randomAnime.title}</h2>
                
                {randomAnime.title_english && (
                  <p className="text-xl text-purple-300">{randomAnime.title_english}</p>
                )}

                <div className="flex flex-wrap gap-2">
                  {randomAnime.genres.map((genre) => (
                    <span
                      key={genre.mal_id}
                      className="bg-purple-500/30 text-purple-200 px-3 py-1 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  {randomAnime.score && (
                    <div className="bg-blue-500/20 rounded-lg p-3">
                      <div className="text-2xl font-bold text-blue-300">⭐ {randomAnime.score}</div>
                      <div className="text-xs text-gray-400">Score</div>
                    </div>
                  )}
                  {randomAnime.episodes && (
                    <div className="bg-green-500/20 rounded-lg p-3">
                      <div className="text-2xl font-bold text-green-300">📺 {randomAnime.episodes}</div>
                      <div className="text-xs text-gray-400">Episodes</div>
                    </div>
                  )}
                  {randomAnime.type && (
                    <div className="bg-purple-500/20 rounded-lg p-3">
                      <div className="text-2xl font-bold text-purple-300">{randomAnime.type}</div>
                      <div className="text-xs text-gray-400">Type</div>
                    </div>
                  )}
                  {randomAnime.year && (
                    <div className="bg-pink-500/20 rounded-lg p-3">
                      <div className="text-2xl font-bold text-pink-300">📅 {randomAnime.year}</div>
                      <div className="text-xs text-gray-400">Year</div>
                    </div>
                  )}
                </div>

                {randomAnime.synopsis && (
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Synopsis</h3>
                    <p className="text-gray-300 leading-relaxed">{randomAnime.synopsis}</p>
                  </div>
                )}

                <a
                  href={randomAnime.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
                >
                  View on MyAnimeList →
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
