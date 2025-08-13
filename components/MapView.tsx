import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Platform, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { BusStop, Bus, UserLocation } from '@/types';
import { GOOGLE_MAPS_CONFIG } from '@/config/googleMaps';
import { useResponsive } from '../hooks/useResponsive';

// Importar componente de Google Maps para web condicionalmente
let GoogleMapWeb: any = null;
if (Platform.OS === 'web') {
  try {
    GoogleMapWeb = require('./GoogleMapWeb').default;
  } catch (error) {
    console.log('Error loading GoogleMapWeb:', error);
  }
}

interface GoogleMapViewProps {
  stops: BusStop[];
  buses: Bus[];
  userLocation: UserLocation;
  onStopPress?: (stop: BusStop) => void;
  onBusPress?: (bus: Bus) => void;
  onRegionChange?: (region: any) => void;
  focusStopId?: string;
  focusBusId?: string;
}

export default function GoogleMapView({
  stops,
  buses,
  userLocation,
  onStopPress,
  onBusPress,
  onRegionChange,
  focusStopId,
  focusBusId,
}: GoogleMapViewProps) {
  const { isMobile, isSmallScreen } = useResponsive();
  // Renderizar Google Maps real en web
  if (Platform.OS === 'web' && GoogleMapWeb) {
    return (
      <GoogleMapWeb
        stops={stops}
        buses={buses}
        userLocation={userLocation}
        onStopPress={onStopPress}
        onBusPress={onBusPress}
        onRegionChange={onRegionChange}
        focusStopId={focusStopId}
        focusBusId={focusBusId}
      />
    );
  }

  // Fallback para web si no se puede cargar Google Maps
  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <View style={styles.webMapContainer}>
          <View style={styles.webMapHeader}>
            <MaterialIcons name="map" size={24} color="#16A34A" />
            <Text style={styles.webMapTitle}>Mapa de OMSA</Text>
          </View>
          <View style={styles.webMapContent}>
            {!isSmallScreen && (
              <>
                <Text style={styles.webMapText}>
                  🚌 {stops.length} paradas disponibles
                </Text>
                <Text style={styles.webMapText}>
                  🚐 {buses.length} autobuses en ruta
                </Text>
                <Text style={styles.webMapText}>
                  📍 Tu ubicación: {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}
                </Text>
              </>
            )}
          </View>
          <View style={styles.webMapLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: GOOGLE_MAPS_CONFIG.COLORS.SECONDARY }]} />
              <Text style={styles.legendText}>Paradas</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: GOOGLE_MAPS_CONFIG.COLORS.SUCCESS }]} />
              <Text style={styles.legendText}>Autobuses</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: GOOGLE_MAPS_CONFIG.COLORS.ACCENT }]} />
              <Text style={styles.legendText}>Tu ubicación</Text>
            </View>
          </View>
          <View style={styles.stopsList}>
            <Text style={styles.stopsListTitle}>Paradas cercanas:</Text>
            {stops.slice(0, 5).map((stop) => (
              <View key={stop.id} style={styles.stopItem}>
                <MaterialIcons name="directions-bus" size={16} color="#2563EB" />
                <Text style={styles.stopName}>{stop.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  }

  // Para móviles, mostrar mensaje de que se necesita configuración adicional
  return (
    <View style={styles.container}>
      <View style={styles.mobileMapContainer}>
        <View style={styles.webMapHeader}>
          <MaterialIcons name="map" size={24} color="#16A34A" />
          <Text style={styles.webMapTitle}>Mapa de OMSA</Text>
        </View>
        <View style={styles.webMapContent}>
          {!isSmallScreen && (
            <>
              <Text style={styles.webMapText}>
                📱 Funcionalidad de mapa disponible en móviles
              </Text>
              <Text style={styles.webMapText}>
                🚌 {stops.length} paradas disponibles
              </Text>
              <Text style={styles.webMapText}>
                🚐 {buses.length} autobuses en ruta
              </Text>
              <Text style={styles.webMapText}>
                📍 Tu ubicación: {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}
              </Text>
            </>
          )}
        </View>
        <View style={styles.stopsList}>
          <Text style={styles.stopsListTitle}>Paradas cercanas:</Text>
          {stops.slice(0, 5).map((stop) => (
            <View key={stop.id} style={styles.stopItem}>
              <MaterialIcons name="directions-bus" size={16} color="#2563EB" />
              <Text style={styles.stopName}>{stop.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webMapContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mobileMapContainer: {
    flex: 1,
    backgroundColor: '#E3F2FD',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webMapHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  webMapTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginLeft: 12,
  },
  webMapContent: {
    alignItems: 'center',
    marginBottom: 30,
  },
  webMapText: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 8,
    textAlign: 'center',
  },
  webMapLegend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  legendItem: {
    alignItems: 'center',
  },
  legendDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginBottom: 4,
  },
  legendText: {
    fontSize: 12,
    color: '#6B7280',
  },
  stopsList: {
    width: '100%',
    maxWidth: 400,
  },
  stopsListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  stopItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  stopName: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 8,
    flex: 1,
  },
});