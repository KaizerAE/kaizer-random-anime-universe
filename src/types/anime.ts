export interface Anime {
  mal_id: number;
  title: string;
  title_english?: string;
  title_japanese?: string;
  images: {
    jpg: {
      image_url: string;
      large_image_url: string;
    };
    webp: {
      image_url: string;
      large_image_url: string;
    };
  };
  score?: number;
  scored_by?: number;
  status: string;
  type?: string;
  episodes?: number;
  synopsis?: string;
  genres?: Genre[];
  url: string;
}

export interface UserAnimeListEntry {
  mal_id: number;
  title: string;
  images: Anime['images'];
  score: number;
  status: 'Watching' | 'Completed' | 'On-Hold' | 'Dropped' | 'Plan to Watch';
  episodes_watched: number;
  is_rewatching: boolean;
  url: string;
  anime: Anime;
}

export interface Genre {
  mal_id: number;
  name: string;
  type: string;
  url: string;
}

export interface JikanResponse<T> {
  data: T;
  pagination?: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
  };
}

export type AnimeStatus = 'Watching' | 'Completed' | 'On-Hold' | 'Dropped' | 'Plan to Watch';
export type AnimeType = 'TV' | 'Movie' | 'OVA' | 'Special' | 'ONA' | 'Music';
export type Theme = 'light' | 'dark' | 'cyber-neon';
export type AnimationIntensity = 'low' | 'medium' | 'high';
export type RandomSourceFilter = 'allExceptDropped' | 'completedOnly' | 'planToWatchOnly' | 'watchingAndOnHold';
