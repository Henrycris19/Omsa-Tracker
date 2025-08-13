import { useState, useEffect } from 'react';
import { Bus } from '@/types';
import { mockBuses } from '@/data/mockData';

export function useBusSimulation() {
  const [buses, setBuses] = useState<Bus[]>(mockBuses);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setBuses(currentBuses => 
        currentBuses.map(bus => ({
          ...bus,
          // Simular movimiento leve
          latitude: bus.latitude + (Math.random() - 0.5) * 0.001,
          longitude: bus.longitude + (Math.random() - 0.5) * 0.001,
          // Simular cambios en pasajeros
          passengers: Math.max(0, Math.min(bus.capacity, 
            bus.passengers + Math.floor((Math.random() - 0.5) * 3)
          )),
          // Actualizar tiempo de llegada
          estimatedArrival: Math.max(1, bus.estimatedArrival - 0.5),
        }))
      );
    }, 3000); // Actualizar cada 3 segundos

    return () => clearInterval(interval);
  }, [isRunning]);

  const startSimulation = () => setIsRunning(true);
  const stopSimulation = () => setIsRunning(false);
  const resetSimulation = () => {
    setBuses(mockBuses);
    setIsRunning(false);
  };

  return {
    buses,
    isRunning,
    startSimulation,
    stopSimulation,
    resetSimulation,
  };
}
