import { useState, useEffect } from 'react';

export function useFrameworkReady() {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeFramework = async () => {
      try {
        // Simular inicialización del framework
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Verificar que los recursos necesarios estén disponibles
        if (typeof window !== 'undefined') {
          setIsReady(true);
        }
      } catch (err) {
        console.error('Error initializing framework:', err);
        setError('Error inicializando el framework');
      }
    };

    initializeFramework();
  }, []);

  return {
    isReady,
    error,
  };
}
