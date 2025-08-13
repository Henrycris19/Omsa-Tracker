import { useState, useEffect } from 'react';
import { Bus, BusStop, BusRoute } from '@/types';
import { buses as mockBuses, busStops as mockStops, busRoutes as mockRoutes } from '@/data/mockData';

export function useBusData() {
  // Inicializar inmediatamente con datos mock para evitar pantallas vacías al cambiar de pestaña
  const [buses, setBuses] = useState<Bus[]>(mockBuses);
  const [stops, setStops] = useState<BusStop[]>(mockStops);
  const [routes, setRoutes] = useState<BusRoute[]>(mockRoutes);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // En este mock no hacemos llamadas; solo aseguramos estado limpio
    setBuses(mockBuses);
    setStops(mockStops);
    setRoutes(mockRoutes);
    setError(null);
    setLoading(false);
  }, []);

  const refreshData = async () => {
    // Refresco instantáneo en mock
    setBuses([...mockBuses]);
    setStops([...mockStops]);
    setRoutes([...mockRoutes]);
  };

  return {
    buses,
    stops,
    routes,
    loading,
    isLoading: loading, // Alias para compatibilidad
    error,
    refreshData,
  };
}
