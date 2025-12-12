import React, { useMemo } from 'react';
import { Container } from '../components/layout/Container';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Loading } from '../components/common/Loading';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { useAnime } from '../contexts/AnimeContext';

export const Stats: React.FC = () => {
  const { animeList, loading, error } = useAnime();

  const stats = useMemo(() => {
    if (animeList.length === 0) return null;

    // Calculate statistics
    const statusCounts = animeList.reduce((acc, anime) => {
      const status = anime.my_list_status?.status || 'plan_to_watch';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const totalEpisodes = animeList.reduce((sum, anime) => {
      return sum + (anime.my_list_status?.num_episodes_watched || 0);
    }, 0);

    const averageScore = animeList.reduce((sum, anime) => {
      const score = anime.my_list_status?.score || 0;
      return sum + (score > 0 ? score : 0);
    }, 0) / animeList.filter(a => (a.my_list_status?.score || 0) > 0).length;

    const genreCounts = animeList.reduce((acc, anime) => {
      anime.genres?.forEach(genre => {
        acc[genre.name] = (acc[genre.name] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    const topGenres = Object.entries(genreCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    const scoreDistribution = animeList.reduce((acc, anime) => {
      const score = anime.my_list_status?.score || 0;
      if (score > 0) {
        const range = Math.floor(score);
        acc[range] = (acc[range] || 0) + 1;
      }
      return acc;
    }, {} as Record<number, number>);

    return {
      total: animeList.length,
      statusCounts,
      totalEpisodes,
      averageScore: averageScore.toFixed(2),
      topGenres,
      scoreDistribution,
    };
  }, [animeList]);

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

  if (!stats) {
    return (
      <Container>
        <div className="text-center py-12">
          <p className="text-xl text-gray-400">No statistics available</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">Statistics</h1>
          <p className="text-gray-400">Your anime watching insights and trends</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-1">Total Anime</p>
              <p className="text-4xl font-bold text-blue-500">{stats.total}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-1">Episodes Watched</p>
              <p className="text-4xl font-bold text-green-500">{stats.totalEpisodes}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-1">Average Score</p>
              <p className="text-4xl font-bold text-yellow-500">{stats.averageScore}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-1">Completed</p>
              <p className="text-4xl font-bold text-purple-500">
                {stats.statusCounts.completed || 0}
              </p>
            </div>
          </Card>
        </div>

        {/* Status Distribution */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">Watching Status</h2>
          <div className="space-y-3">
            {Object.entries(stats.statusCounts).map(([status, count]) => {
              const percentage = (count / stats.total) * 100;
              return (
                <div key={status}>
                  <div className="flex justify-between mb-1">
                    <span className="capitalize text-sm">
                      {status.replace('_', ' ')}
                    </span>
                    <span className="text-sm text-gray-400">
                      {count} ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Top Genres */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">Top Genres</h2>
          <div className="flex flex-wrap gap-2">
            {stats.topGenres.map(([genre, count]) => (
              <Badge key={genre} variant="primary" className="text-base px-4 py-2">
                {genre} ({count})
              </Badge>
            ))}
          </div>
        </Card>

        {/* Score Distribution */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">Score Distribution</h2>
          <div className="space-y-2">
            {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((score) => {
              const count = stats.scoreDistribution[score] || 0;
              const maxCount = Math.max(...Object.values(stats.scoreDistribution));
              const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
              return (
                <div key={score} className="flex items-center gap-3">
                  <span className="w-8 text-right font-mono">{score}</span>
                  <div className="flex-1 bg-gray-700 rounded-full h-6">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-6 rounded-full flex items-center justify-end px-2 transition-all"
                      style={{ width: `${percentage}%` }}
                    >
                      {count > 0 && (
                        <span className="text-xs font-semibold">{count}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </Container>
  );
};
