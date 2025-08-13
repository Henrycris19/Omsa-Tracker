import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useBusData } from '@/hooks/useBusData';
import { useFavorites } from '@/hooks/useFavorites';
import { useGoogleMaps } from '@/hooks/useGoogleMaps';
import GoogleMapView from '@/components/MapView';
import StopCard from '@/components/StopCard';
import { Bus } from '@/types';
import { useResponsive } from '../../hooks/useResponsive';

export default function NearbyStopsScreen() {
  const [expandedStops, setExpandedStops] = useState<Record<string, boolean>>({});
  const [selectedStopId, setSelectedStopId] = useState<string | null>(null);
  const [selectedBusId, setSelectedBusId] = useState<string | null>(null);
  const { buses, stops, isLoading, refreshData } = useBusData();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { userLocation, locationPermission, requestLocationPermission } = useGoogleMaps();
  const { isSmallScreen } = useResponsive();

  // Usar ubicación del usuario si está disponible, sino usar ubicación por defecto
  const currentUserLocation = userLocation || {
    latitude: 18.4838,
    longitude: -69.9286,
  };

  useEffect(() => {
    if (!locationPermission) {
      requestLocationPermission();
    }
  }, [locationPermission, requestLocationPermission]);

  // Group stops by route for better organization
  const groupedStops = (stops || []).reduce((acc, stop) => {
    const route = (stop.routeIds && stop.routeIds[0]) || 'default';
    if (!acc[route]) {
      acc[route] = { stop, buses: [] };
    }
    acc[route].buses = (buses || []).filter(bus => bus.nextStopId === stop.id);
    return acc;
  }, {} as Record<string, { stop: any; buses: Bus[] }>);

  const toggleExpanded = (stopId: string) => {
    setExpandedStops(prev => ({
      ...prev,
      [stopId]: !prev[stopId],
    }));
    // Actualizar la parada seleccionada para autofocus
    setSelectedStopId(expandedStops[stopId] ? null : stopId);
  };

  const handleBusPress = (bus: Bus) => {
    // Seleccionar el bus para enfocar en el mapa y abrir su info window
    setSelectedBusId(prev => (prev === bus.id ? null : bus.id));
  };

  const handleStopPress = (stop: any) => {
    Alert.alert(
      stop.name,
      `Dirección: ${stop.address}\nRutas: ${stop.routeIds.join(', ')}`,
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapSection}>
        <GoogleMapView
          stops={stops}
          buses={buses}
          userLocation={currentUserLocation}
          onStopPress={handleStopPress}
          onBusPress={handleBusPress}
          focusStopId={selectedStopId}
          focusBusId={selectedBusId || undefined}
        />
      </View>

      <Animated.View 
        entering={FadeInDown.delay(200)}
        style={styles.bottomSheet}
      >
        <View style={styles.handle} />
        
        <View style={styles.headerSection}>
          <Text style={styles.sectionTitle}>Paradas Cercanas</Text>
          {userLocation && !isSmallScreen && (
            <Text style={styles.locationText}>
              📍 Ubicación activa
            </Text>
          )}
        </View>
        
        <ScrollView
          style={styles.stopsContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={refreshData}
              tintColor="#16A34A"
            />
          }
        >
          {Object.entries(groupedStops).map(([routeId, { stop, buses }]) => (
            <StopCard
              key={stop.id}
              stop={stop}
              buses={buses}
              isFavorite={isFavorite(stop.id)}
              isExpanded={expandedStops[stop.id]}
              onToggleFavorite={() => toggleFavorite(stop.id)}
              onToggleExpanded={() => toggleExpanded(stop.id)}
              onBusPress={handleBusPress}
            />
          ))}
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  mapSection: {
    flex: 0.6,
  },
  bottomSheet: {
    flex: 0.4,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#D1D5DB',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
  },
  locationText: {
    fontSize: 14,
    color: '#4B5563',
  },
  stopsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});