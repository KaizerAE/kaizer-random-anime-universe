import React from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { cn } from '../../utils/helpers';

export interface AnimeFilterOptions {
  status?: string[];
  mediaType?: string[];
  genres?: string[];
  rating?: string[];
  sort?: string;
}

interface AnimeFiltersProps {
  filters: AnimeFilterOptions;
  onFilterChange: (filters: AnimeFilterOptions) => void;
  onReset: () => void;
  className?: string;
}

export const AnimeFilters: React.FC<AnimeFiltersProps> = ({
  filters,
  onFilterChange,
  onReset,
  className,
}) => {
  const statusOptions = [
    { value: 'watching', label: 'Watching', icon: '▶️' },
    { value: 'completed', label: 'Completed', icon: '✅' },
    { value: 'on_hold', label: 'On Hold', icon: '⏸️' },
    { value: 'dropped', label: 'Dropped', icon: '❌' },
    { value: 'plan_to_watch', label: 'Plan to Watch', icon: '📝' },
  ];

  const mediaTypeOptions = [
    { value: 'tv', label: 'TV' },
    { value: 'movie', label: 'Movie' },
    { value: 'ova', label: 'OVA' },
    { value: 'special', label: 'Special' },
  ];

  const sortOptions = [
    { value: 'title', label: 'Title' },
    { value: 'score', label: 'Score' },
    { value: 'episodes', label: 'Episodes' },
    { value: 'updated_at', label: 'Recently Updated' },
  ];

  const toggleArrayFilter = (key: keyof AnimeFilterOptions, value: string) => {
    const current = (filters[key] as string[]) || [];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    onFilterChange({ ...filters, [key]: updated });
  };

  const activeFilterCount = Object.values(filters).filter(
    value => Array.isArray(value) ? value.length > 0 : value
  ).length;

  return (
    <Card variant="bordered" className={className}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              🎯 Filters
            </h3>
            {activeFilterCount > 0 && (
              <Badge variant="purple" size="sm">
                {activeFilterCount}
              </Badge>
            )}
          </div>
          {activeFilterCount > 0 && (
            <Button variant="ghost" size="sm" onClick={onReset}>
              Reset All
            </Button>
          )}
        </div>

        {/* Status Filter */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Status
          </h4>
          <div className="flex flex-wrap gap-2">
            {statusOptions.map(option => (
              <Badge
                key={option.value}
                variant={filters.status?.includes(option.value) ? 'purple' : 'default'}
                className="cursor-pointer hover:scale-105 transition-transform"
                onClick={() => toggleArrayFilter('status', option.value)}
              >
                <span className="mr-1">{option.icon}</span>
                {option.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Media Type Filter */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Media Type
          </h4>
          <div className="flex flex-wrap gap-2">
            {mediaTypeOptions.map(option => (
              <Badge
                key={option.value}
                variant={filters.mediaType?.includes(option.value) ? 'pink' : 'default'}
                className="cursor-pointer hover:scale-105 transition-transform"
                onClick={() => toggleArrayFilter('mediaType', option.value)}
              >
                {option.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Sort By
          </h4>
          <select
            value={filters.sort || ''}
            onChange={(e) => onFilterChange({ ...filters, sort: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Default</option>
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Card>
  );
};

AnimeFilters.displayName = 'AnimeFilters';
