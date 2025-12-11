import { UserAnimeListEntry, JikanResponse } from '../types/anime';

const BASE_URL = 'https://api.jikan.moe/v4';
const MAL_USERNAME = 'KaizerAE';
const RATE_LIMIT_DELAY = 1000; // 1 second between requests

let lastRequestTime = 0;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const respectRateLimit = async () => {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  if (timeSinceLastRequest < RATE_LIMIT_DELAY) {
    await delay(RATE_LIMIT_DELAY - timeSinceLastRequest);
  }
  lastRequestTime = Date.now();
};

export const fetchUserAnimeList = async (): Promise<UserAnimeListEntry[]> => {
  const allAnime: UserAnimeListEntry[] = [];
  let currentPage = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    await respectRateLimit();

    try {
      const response = await fetch(
        `${BASE_URL}/users/${MAL_USERNAME}/animelist?page=${currentPage}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: JikanResponse<UserAnimeListEntry[]> = await response.json();
      
      if (data.data && data.data.length > 0) {
        allAnime.push(...data.data);
      }

      hasNextPage = data.pagination?.has_next_page || false;
      currentPage++;
    } catch (error) {
      console.error('Error fetching anime list:', error);
      throw error;
    }
  }

  return allAnime;
};

export const cacheAnimeList = (animeList: UserAnimeListEntry[]) => {
  try {
    const simplified = animeList.map(entry => ({
      mal_id: entry.mal_id,
      title: entry.title,
      images: entry.images,
      score: entry.score,
      status: entry.status,
      url: entry.url,
    }));
    localStorage.setItem('kaizer-anime-cache', JSON.stringify(simplified));
    localStorage.setItem('kaizer-anime-cache-time', Date.now().toString());
  } catch (error) {
    console.error('Error caching anime list:', error);
  }
};

export const getCachedAnimeList = (): UserAnimeListEntry[] | null => {
  try {
    const cached = localStorage.getItem('kaizer-anime-cache');
    const cacheTime = localStorage.getItem('kaizer-anime-cache-time');
    
    if (!cached || !cacheTime) return null;
    
    // Cache expires after 1 hour
    const oneHour = 60 * 60 * 1000;
    if (Date.now() - parseInt(cacheTime) > oneHour) {
      return null;
    }
    
    return JSON.parse(cached);
  } catch (error) {
    console.error('Error getting cached anime list:', error);
    return null;
  }
};
