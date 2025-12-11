hooks/useAnimeCache.tsimport { useState, useEffect } from 'react';
import { Anime } from '../types';

interface CacheEntry {
  data: Anime;
  timestamp: number;
}

const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes
const CACHE_KEY = 'kaizer-anime-cache';

export function useAnimeCache() {
  const [cache, setCache] = useState<Map<number, CacheEntry>>(() => {
    try {
      const stored = localStorage.getItem(CACHE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return new Map(parsed);
      }
    } catch (error) {
      console.error('Error loading anime cache:', error);
    }
    return new Map();
  });

  useEffect(() => {
    try {
      const serialized = JSON.stringify(Array.from(cache.entries()));
      localStorage.setItem(CACHE_KEY, serialized);
    } catch (error) {
      console.error('Error saving anime cache:', error);
    }
  }, [cache]);

  const get = (malId: number): Anime | null => {
    const entry = cache.get(malId);
    if (!entry) return null;
    
    const isExpired = Date.now() - entry.timestamp > CACHE_DURATION;
    if (isExpired) {
      remove(malId);
      return null;
    }
    
    return entry.data;
  };

  const set = (malId: number, data: Anime) => {
    setCache(prev => new Map(prev).set(malId, {
      data,
      timestamp: Date.now(),
    }));
  };

  const remove = (malId: number) => {
    setCache(prev => {
      const newCache = new Map(prev);
      newCache.delete(malId);
      return newCache;
    });
  };

  const clear = () => {
    setCache(new Map());
    localStorage.removeItem(CACHE_KEY);
  };

  const size = cache.size;

  return { get, set, remove, clear, size };
}

export default useAnimeCache;
