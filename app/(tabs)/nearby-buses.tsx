import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronUp } from 'lucide-react-native';
import Animated, { FadeInDown, Layout } from 'react-native-reanimated';
import { useBusData } from '@/hooks/useBusData';
import MapView from '@/components/MapView';
import BusCard from '@/components/BusCard';
import { userLocation } from '@/data/mockData';
import { Bus } from '@/types';
import { useResponsive } from '../../hooks/useResponsive';

export default function NearbyBusesScreen() {
  const [selectedBus, setSelectedBus] = useState<string | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const { buses, stops, routes, isLoading, refreshData } = useBusData();
  const { isSmallScreen } = useResponsive();

  // Group buses by route
  const groupedBuses = (buses || []).reduce((acc, bus) => {
    const route = (routes || []).find(r => r.id === bus.routeId);
    if (route) {
      if (!acc[route.name]) {
        acc[route.name] = [];
      }
      acc[route.name].push(bus);
    }
    return acc;
  }, {} as Record<string, Bus[]>);

  const handleBusPress = (bus: Bus) => {
    setSelectedBus(bus.id === selectedBus ? null : bus.id);
  };

  const toggleRoute = (routeName: string) => {
    setSelectedRoute(selectedRoute === routeName ? null : routeName);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapSection}>
        <MapView
          buses={buses}
          stops={stops}
          userLocation={userLocation}
          focusBusId={selectedBus || undefined}
          onBusPress={handleBusPress}
        />
      </View>

      <Animated.View 
        entering={FadeInDown.delay(200)}
        style={styles.bottomSheet}
      >
        <View style={styles.handle} />
        
        <Text style={styles.sectionTitle}>Autobuses Cercanos</Text>
        
        <ScrollView
          style={styles.busesContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={refreshData}
              tintColor="#16A34A"
            />
          }
        >
          {Object.entries(groupedBuses).map(([routeName, routeBuses]) => (
            <Animated.View
              key={routeName}
              layout={Layout.springify()}
              style={styles.routeGroup}
            >
              <TouchableOpacity
                style={[
                  styles.routeHeader,
                  selectedRoute === routeName && styles.routeHeaderExpanded
                ]}
                onPress={() => toggleRoute(routeName)}
                activeOpacity={0.7}
              >
                <Text style={styles.routeName}>{routeName}</Text>
                {!isSmallScreen && (
                  <Text style={styles.routeSubtitle}>
                    {routeBuses[0]?.nextStopId ? 
                      stops.find(s => s.id === routeBuses[0].nextStopId)?.name || 'Parada desconocida'
                      : 'En ruta'
                    }
                  </Text>
                )}
                <Animated.View
                  style={[
                    styles.expandIcon,
                    selectedRoute === routeName && { transform: [{ rotate: '180deg' }] }
                  ]}
                >
                  <ChevronUp size={20} color="#6B7280" />
                </Animated.View>
              </TouchableOpacity>

              {(selectedRoute === routeName || selectedRoute === null) && (
                <Animated.View
                  entering={FadeInDown.delay(100)}
                  style={styles.busesListContainer}
                >
                  {routeBuses
                    .sort((a, b) => a.estimatedArrival - b.estimatedArrival)
                    .map((bus) => (
                      <BusCard
                        key={bus.id}
                        bus={bus}
                        onPress={() => handleBusPress(bus)}
                      />
                    ))}
                </Animated.View>
              )}
            </Animated.View>
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
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  busesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  routeGroup: {
    marginBottom: 16,
  },
  routeHeader: {
    backgroundColor: '#FDE047',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  routeHeaderExpanded: {
    backgroundColor: '#FEF3C7',
  },
  routeName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginRight: 12,
  },
  routeSubtitle: {
    flex: 1,
    fontSize: 14,
    color: '#4B5563',
  },
  expandIcon: {
    marginLeft: 8,
  },
  busesListContainer: {
    gap: 8,
  },
});