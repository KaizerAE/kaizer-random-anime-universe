import React, { createContext, useContext, ReactNode } from 'react';
import { Anime, FavoriteAnime, FavoritesContextType } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useLocalStorage<FavoriteAnime[]>('kaizer-anime-favorites', []);

  const addFavorite = (anime: Anime, notes?: string) => {
    const favorite: FavoriteAnime = {
      ...anime,
      addedAt: new Date().toISOString(),
      notes,
    };
    setFavorites((prev) => [...prev.filter((f) => f.mal_id !== anime.mal_id), favorite]);
  };

  const removeFavorite = (malId: number) => {
    setFavorites((prev) => prev.filter((f) => f.mal_id !== malId));
  };

  const isFavorite = (malId: number): boolean => {
    return favorites.some((f) => f.mal_id === malId);
  };

  const updateNotes = (malId: number, notes: string) => {
    setFavorites((prev) =>
      prev.map((f) => (f.mal_id === malId ? { ...f, notes } : f))
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, updateNotes }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
}

export default FavoritesContext;
