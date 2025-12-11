// Core Anime Types
export interface Anime {
  mal_id: number;
  url: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
    webp: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  trailer: {
    youtube_id: string | null;
    url: string | null;
    embed_url: string | null;
  };
  approved: boolean;
  titles: Array<{
    type: string;
    title: string;
  }>;
  title: string;
  title_english: string | null;
  title_japanese: string | null;
  type: 'TV' | 'Movie' | 'OVA' | 'Special' | 'ONA' | 'Music' | null;
  source: string | null;
  episodes: number | null;
  status: string | null;
  airing: boolean;
  aired: {
    from: string | null;
    to: string | null;
    prop: {
      from: { day: number | null; month: number | null; year: number | null };
      to: { day: number | null; month: number | null; year: number | null };
    };
    string: string | null;
  };
  duration: string | null;
  rating: string | null;
  score: number | null;
  scored_by: number | null;
  rank: number | null;
  popularity: number | null;
  members: number | null;
  favorites: number | null;
  synopsis: string | null;
  background: string | null;
  season: string | null;
  year: number | null;
  broadcast: {
    day: string | null;
    time: string | null;
    timezone: string | null;
    string: string | null;
  };
  producers: Array<{ mal_id: number; type: string; name: string; url: string }>;
  licensors: Array<{ mal_id: number; type: string; name: string; url: string }>;
  studios: Array<{ mal_id: number; type: string; name: string; url: string }>;
  genres: Array<{ mal_id: number; type: string; name: string; url: string }>;
  explicit_genres: Array<{ mal_id: number; type: string; name: string; url: string }>;
  themes: Array<{ mal_id: number; type: string; name: string; url: string }>;
  demographics: Array<{ mal_id: number; type: string; name: string; url: string }>;
}

// User Anime List Entry
export interface UserAnimeListEntry {
  mal_id: number;
  title: string;
  status: 'watching' | 'completed' | 'on_hold' | 'dropped' | 'plan_to_watch';
  score: number;
  episodes_watched: number;
  is_rewatching: boolean;
  start_date: string | null;
  finish_date: string | null;
  priority: number;
  tags: string[];
  comments: string;
  anime: Anime;
}

// Filter Options
export interface FilterOptions {
  genres: number[];
  type: string[];
  status: string[];
  rating: string[];
  score: { min: number; max: number };
  year: { min: number | null; max: number | null };
  season: string[];
}

// Theme Types
export type ThemeMode = 'light' | 'dark' | 'cyber' | 'neon';

export interface ThemeConfig {
  mode: ThemeMode;
  animations: boolean;
  glassEffect: boolean;
  backgroundGif: string | null;
}

// Settings
export interface AppSettings {
  theme: ThemeConfig;
  filters: FilterOptions;
  cacheEnabled: boolean;
  autoPlayTrailers: boolean;
  showSpoilers: boolean;
}

// Favorites
export interface FavoriteAnime extends Anime {
  addedAt: string;
  notes?: string;
}

// History
export interface HistoryEntry {
  anime: Anime;
  viewedAt: string;
  fromFilter?: Partial<FilterOptions>;
}

// API Response Types
export interface JikanPaginatedResponse<T> {
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
  data: T[];
}

export interface JikanResponse<T> {
  data: T;
}

// Context Types
export interface FavoritesContextType {
  favorites: FavoriteAnime[];
  addFavorite: (anime: Anime, notes?: string) => void;
  removeFavorite: (malId: number) => void;
  isFavorite: (malId: number) => boolean;
  updateNotes: (malId: number, notes: string) => void;
}

export interface ThemeContextType {
  theme: ThemeConfig;
  setTheme: (theme: Partial<ThemeConfig>) => void;
  toggleAnimations: () => void;
  toggleGlassEffect: () => void;
  setBackgroundGif: (url: string | null) => void;
}

// Component Props
export interface AnimeCardProps {
  anime: Anime;
  onClick?: () => void;
  showActions?: boolean;
}

export interface FilterPanelProps {
  filters: FilterOptions;
  onFilterChange: (filters: Partial<FilterOptions>) => void;
  onReset: () => void;
}

export interface RandomButtonProps {
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}

// Utility Types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface ApiError {
  message: string;
  status?: number;
  error?: string;
}
