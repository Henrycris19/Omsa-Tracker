import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Loader } from '@googlemaps/js-api-loader';
import { BusStop, Bus, UserLocation } from '@/types';
// import { GOOGLE_MAPS_CONFIG } from '@/config/googleMaps';
// import { useBusSimulation } from '@/hooks/useBusSimulation';

interface GoogleMapWebProps {
  stops: BusStop[];
  buses: Bus[];
  userLocation: UserLocation;
  onStopPress?: (stop: BusStop) => void;
  onBusPress?: (bus: Bus) => void;
  onRegionChange?: (region: any) => void;
  focusStopId?: string;
  focusBusId?: string;
}

declare global {
  interface Window {
    google: any;
  }
}

export default function GoogleMapWeb({
  stops,
  buses: initialBuses,
  userLocation,
  onStopPress,
  onBusPress,
  onRegionChange,
  focusStopId,
  focusBusId,
}: GoogleMapWebProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busMarkers, setBusMarkers] = useState<Map<string, any>>(new Map());
  const [stopMarkers, setStopMarkers] = useState<Map<string, any>>(new Map());
  const [userMarker, setUserMarker] = useState<any>(null);
  
  // Usar datos estáticos en lugar de simulación
  // const { buses } = useBusSimulation();
  const buses = initialBuses;

  useEffect(() => {
    const initMap = async () => {
      try {
        console.log('🚀 Inicializando Google Maps...');
        
        const loader = new Loader({
          apiKey: "AIzaSyAYXYowsrelmymaOhLFo8OKbSFjB073Jrw", // Tu API key de Google Maps
          version: "weekly",
          libraries: ["places", "geometry"]
        });

        await loader.load();
        console.log('✅ Google Maps API cargada');
        
        if (!mapRef.current) {
          console.error('❌ mapRef.current es null');
          return;
        }

        const googleMap = new window.google.maps.Map(mapRef.current, {
          center: {
            lat: 18.4861, // Centro de Santo Domingo
            lng: -69.9312
          },
          zoom: 14,
          mapTypeId: 'roadmap',
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'transit',
              elementType: 'labels',
              stylers: [{ visibility: 'simplified' }]
            }
          ]
        });

        console.log('✅ Mapa creado:', googleMap);
        setMap(googleMap);
        setIsLoaded(true);

        // Agregar listener para cambios de región
        googleMap.addListener('idle', () => {
          const center = googleMap.getCenter();
          const zoom = googleMap.getZoom();
          if (onRegionChange) {
            onRegionChange({
              latitude: center.lat(),
              longitude: center.lng(),
              latitudeDelta: 0.01 / zoom,
              longitudeDelta: 0.01 / zoom,
            });
          }
        });

      } catch (err) {
        console.error('❌ Error loading Google Maps:', err);
        setError('Error cargando el mapa: ' + err.message);
      }
    };

    initMap();
  }, []); // Solo ejecutar una vez al montar el componente

  // Marcador de usuario y paradas: sincronizar con cambios de props y remounts
  useEffect(() => {
    if (!map || !isLoaded) return;

    // Actualizar/crear marcador de usuario
    const userLatLng = {
      lat: (userLocation?.latitude ?? 18.4861),
      lng: (userLocation?.longitude ?? -69.9312),
    };

    if (!userMarker) {
      const newUserMarker = new window.google.maps.Marker({
        position: userLatLng,
        map: map,
        title: 'Tu ubicación',
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 15,
          fillColor: '#FF6B6B',
          fillOpacity: 1,
          strokeColor: '#FFFFFF',
          strokeWeight: 3,
        }
      });
      setUserMarker(newUserMarker);
    } else {
      userMarker.setPosition(userLatLng);
    }

    // Limpiar paradas anteriores
    stopMarkers.forEach(m => m.setMap(null));

    // Crear todas las paradas sin filtrar para garantizar visibilidad
    const allStops = (stops || []);

    const newStopMarkers = new Map<string, any>();

    allStops.forEach((stop) => {
      const stopMarker = new window.google.maps.Marker({
        position: { lat: stop.latitude, lng: stop.longitude },
        map: map,
        title: stop.name,
        icon: {
          url: 'https://i.imgur.com/mXfa1qk.png',
          scaledSize: new window.google.maps.Size(32, 32),
          anchor: new window.google.maps.Point(16, 32)
        }
      });

      const stopInfoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 12px; max-width: 250px;">
            <h3 style="margin: 0 0 8px 0; color: #1F2937; font-size: 18px; font-weight: bold;">${stop.name}</h3>
            <p style="margin: 0 0 8px 0; color: #6B7280; font-size: 14px;">${stop.address}</p>
            <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-top: 8px;">
              ${(stop.routeIds || []).map(route => `
                <span style="background: #2563EB; color: white; padding: 4px 8px; border-radius: 6px; font-size: 12px; font-weight: bold;">
                  ${route}
                </span>
              `).join('')}
            </div>
          </div>
        `
      });

      stopMarker.addListener('click', () => {
        stopInfoWindow.open(map, stopMarker);
        if (onStopPress) onStopPress(stop);
      });

      newStopMarkers.set(stop.id, stopMarker);
    });

    setStopMarkers(newStopMarkers);

    return () => {
      newStopMarkers.forEach(m => m.setMap(null));
    };
  }, [map, isLoaded, stops, userLocation]);

  // Autobuses: sincronizar marcadores con cambios en props
  useEffect(() => {
    if (!map || !isLoaded) return;

    // Usar todos los autobuses sin filtrar para garantizar visibilidad
    const visibleBuses = (buses || []);

    // Eliminar marcadores que ya no existen
    const current = new Map(busMarkers);
    current.forEach((marker, id) => {
      if (!visibleBuses.find(b => b.id === id)) {
        marker.setMap(null);
        current.delete(id);
      }
    });

    // Crear/actualizar existentes
    visibleBuses.forEach(bus => {
      const existing = current.get(bus.id);
      if (existing) {
        existing.setPosition({ lat: bus.latitude, lng: bus.longitude });
        existing.setIcon(getBusIcon(bus));
      } else {
        const marker = new window.google.maps.Marker({
          position: { lat: bus.latitude, lng: bus.longitude },
          map: map,
          title: `Autobús ${bus.identifier}`,
          icon: getBusIcon(bus)
        });

        const info = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 12px; max-width: 250px;">
              <h3 style="margin: 0 0 8px 0; color: #1F2937; font-size: 16px; font-weight: bold;">🚌 ${bus.identifier}</h3>
              <p style="margin: 0 0 4px 0; color: #6B7280; font-size: 14px;"><strong>Ruta:</strong> ${bus.routeId}</p>
              <p style="margin: 0 0 4px 0; color: #6B7280; font-size: 14px;"><strong>Pasajeros:</strong> ${bus.passengers}/${bus.capacity}</p>
              <p style="margin: 0 0 4px 0; color: #6B7280; font-size: 14px;"><strong>Llegada:</strong> ${bus.estimatedArrival} min</p>
              <p style="margin: 0 0 8px 0; color: #6B7280; font-size: 14px;"><strong>Dirección:</strong> ${bus.direction}</p>
            </div>
          `
        });

        marker.addListener('click', () => {
          info.open(map, marker);
          onBusPress?.(bus);
        });

        current.set(bus.id, marker);
      }
    });

    setBusMarkers(current);

    return () => {
      current.forEach(m => m.setMap(null));
    };
  }, [map, isLoaded, buses]);

  // Ajustar cámara para incluir todos los puntos (paradas, buses, usuario)
  useEffect(() => {
    if (!map || !isLoaded) return;
    const allPoints: Array<{ lat: number; lng: number }> = [];
    (stops || []).forEach(s => allPoints.push({ lat: s.latitude, lng: s.longitude }));
    (buses || []).forEach(b => allPoints.push({ lat: b.latitude, lng: b.longitude }));
    if (userLocation) allPoints.push({ lat: userLocation.latitude, lng: userLocation.longitude });

    if (allPoints.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      allPoints.forEach(p => bounds.extend(p as any));
      map.fitBounds(bounds, 60);
    }
  }, [map, isLoaded, stops, buses, userLocation]);

  // Enfocar marcador desde el exterior
  useEffect(() => {
    if (!map || !isLoaded || !focusStopId) return;
    
    const marker = stopMarkers.get(focusStopId);
    const stop = (stops || []).find(s => s.id === focusStopId);
    
    if (marker && stop) {
      map.panTo({ lat: stop.latitude, lng: stop.longitude });
      map.setZoom(16);
      window.google.maps.event.trigger(marker, 'click');
    }
  }, [focusStopId, stopMarkers, map, isLoaded, stops]);

  useEffect(() => {
    if (!map || !isLoaded) return;
    if (focusBusId && busMarkers.size > 0) {
      const bus = (buses || []).find(b => b.id === focusBusId);
      const marker = bus ? busMarkers.get(focusBusId) : null;
      if (bus && marker) {
        map.panTo({ lat: bus.latitude, lng: bus.longitude });
        map.setZoom(16);
        window.google.maps.event.trigger(marker, 'click');
      }
    }
  }, [focusBusId, busMarkers, map, isLoaded, buses]);

  const getBusColor = (bus: Bus): string => {
    if (bus.passengers >= bus.capacity * 0.9) return '#F59E0B'; // Amarillo para lleno
    if (bus.passengers >= bus.capacity * 0.7) return '#EF4444'; // Rojo para ocupado
    return '#10B981'; // Verde para disponible
  };

  const getBusIcon = (bus: Bus): any => {
    // Determinar qué icono usar según la ocupación
    let iconUrl;
    if (bus.passengers >= bus.capacity * 0.7) {
      // Autobús lleno/ocupado
      iconUrl = 'https://i.imgur.com/0qDZLA7.png';
    } else {
      // Autobús disponible
      iconUrl = 'https://i.imgur.com/U7RGUyI.png';
    }
    
    return {
      url: iconUrl,
      scaledSize: new window.google.maps.Size(32, 32),
      anchor: new window.google.maps.Point(16, 16)
    };
  };

  const getOccupancyText = (bus: Bus): string => {
    if (bus.passengers >= bus.capacity * 0.9) return 'Lleno';
    if (bus.passengers >= bus.capacity * 0.7) return 'Ocupado';
    return 'Disponible';
  };

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <div style={styles.errorText}>{error}</div>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <div
        ref={mapRef}
        style={{
          width: '100%',
          height: '100%',
          minHeight: '400px',
          borderRadius: '8px',
        }}
      />
      {!isLoaded && (
        <View style={styles.loadingContainer}>
          <div style={styles.loadingText}>Cargando mapa...</div>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 400,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
  },
  errorText: {
    fontSize: 16,
    color: '#DC2626',
    textAlign: 'center',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
});
