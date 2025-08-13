import { useState, useEffect } from 'react';
import { Bus, BusStop } from '@/types';

export interface Favorite {
  id: string;
  type: 'bus' | 'stop' | 'route';
  data: Bus | BusStop | { id: string; name: string; };
  addedAt: Date;
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Cargar favoritos desde localStorage o datos mock
    const loadFavorites = () => {
      try {
        const stored = localStorage.getItem('omsa-favorites');
        if (stored) {
          setFavorites(JSON.parse(stored));
        } else {
          // Datos de ejemplo para favoritos
          setFavorites([
            {
              id: '1',
              type: 'route',
              data: { id: 'C1', name: 'Corredor Duarte' },
              addedAt: new Date()
            },
            {
              id: '2', 
              type: 'route',
              data: { id: 'C2', name: 'Corredor Independencia' },
              addedAt: new Date()
            }
          ]);
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
        setFavorites([]);
      }
    };

    loadFavorites();
  }, []);

  const addFavorite = (item: Bus | BusStop | { id: string; name: string; }, type: 'bus' | 'stop' | 'route') => {
    const newFavorite: Favorite = {
      id: Date.now().toString(),
      type,
      data: item,
      addedAt: new Date()
    };

    const updatedFavorites = [...favorites, newFavorite];
    setFavorites(updatedFavorites);
    
    try {
      localStorage.setItem('omsa-favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const removeFavorite = (id: string) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== id);
    setFavorites(updatedFavorites);
    
    try {
      localStorage.setItem('omsa-favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const isFavorite = (itemId: string, type: 'bus' | 'stop' | 'route' = 'stop') => {
    return favorites.some(fav => 
      fav.type === type && 
      (fav.data as any).id === itemId
    );
  };

  const toggleFavorite = (itemId: string, type: 'bus' | 'stop' | 'route' = 'stop') => {
    if (isFavorite(itemId, type)) {
      const favoriteToRemove = favorites.find(fav => 
        fav.type === type && (fav.data as any).id === itemId
      );
      if (favoriteToRemove) {
        removeFavorite(favoriteToRemove.id);
      }
    } else {
      // Crear un objeto básico para agregar como favorito
      const basicItem = { id: itemId, name: `${type} ${itemId}` };
      addFavorite(basicItem, type);
    }
  };

  const getFavoritesByType = (type: 'bus' | 'stop' | 'route') => {
    return favorites.filter(fav => fav.type === type);
  };

  return {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
    getFavoritesByType,
  };
}
