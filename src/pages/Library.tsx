import React, { useState, useMemo } from 'react';
import { Container } from '../components/layout/Container';
import { AnimeGrid } from '../components/anime/AnimeGrid';
import { AnimeFilters } from '../components/anime/AnimeFilters';
import { AnimeDetails } from '../components/anime/AnimeDetails';
import { Loading } from '../components/common/Loading';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { useAnime } from '../contexts/AnimeContext';
import { Anime } from '../types';

export const Library: React.FC = () => {
  const { animeList, loading, error, filters } = useAnime();
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);

  // Filter anime based on current filters
  const filteredAnime = useMemo(() => {
    let result = [...animeList];

    // Filter by status
    if (filters.status && filters.status !== 'all') {
      result = result.filter(
        (anime) => anime.my_list_status?.status === filters.status
      );
    }

    // Filter by genre
    if (filters.genre) {
      result = result.filter((anime) =>
        anime.genres?.some((g) => g.name === filters.genre)
      );
    }

    // Filter by search query
    if (filters.search) {
      const query = filters.search.toLowerCase();
      result = result.filter(
        (anime) =>
          anime.title.toLowerCase().includes(query) ||
          anime.alternative_titles?.en?.toLowerCase().includes(query) ||
          anime.alternative_titles?.ja?.toLowerCase().includes(query)
      );
    }

    // Sort anime
    if (filters.sortBy) {
      result.sort((a, b) => {
        switch (filters.sortBy) {
          case 'title':
            return a.title.localeCompare(b.title);
          case 'rating':
            return (b.mean || 0) - (a.mean || 0);
          case 'episodes':
            return (b.num_episodes || 0) - (a.num_episodes || 0);
          case 'score':
            return (
              (b.my_list_status?.score || 0) - (a.my_list_status?.score || 0)
            );
          default:
            return 0;
        }
      });
    }

    return result;
  }, [animeList, filters]);

  if (loading) {
    return (
      <Container>
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loading size="large" />
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage message={error} />
      </Container>
    );
  }

  return (
    <Container>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">Anime Library</h1>
          <p className="text-gray-400">
            Browse your complete anime collection ({filteredAnime.length} anime)
          </p>
        </div>

        {/* Filters */}
        <AnimeFilters />

        {/* Grid */}
        {filteredAnime.length > 0 ? (
          <AnimeGrid
            animeList={filteredAnime}
            onAnimeClick={setSelectedAnime}
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">No anime found</p>
            <p className="text-sm text-gray-500 mt-2">
              Try adjusting your filters
            </p>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedAnime && (
        <AnimeDetails
          anime={selectedAnime}
          onClose={() => setSelectedAnime(null)}
        />
      )}
    </Container>
  );
};
