import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext(null);

const STORAGE_KEY = 'wandr_favorites';
const load = () => { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { destinations: [], experiences: [] }; } catch { return { destinations: [], experiences: [] }; }};

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(load);

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites)); }, [favorites]);

  const toggleFavorite = (type, id) => {
    setFavorites(prev => {
      const list = prev[type] || [];
      const exists = list.includes(id);
      return { ...prev, [type]: exists ? list.filter(x => x !== id) : [...list, id] };
    });
  };

  const isFavorite = (type, id) => (favorites[type] || []).includes(id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);
