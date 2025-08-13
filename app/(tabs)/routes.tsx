import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Users, Clock } from 'lucide-react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useBusData } from '@/hooks/useBusData';
import MapView from '@/components/MapView';
import BusCard from '@/components/BusCard';
import { userLocation } from '@/data/mockData';
import { BusRoute, Bus } from '@/types';
import { formatTime } from '@/utils/calculations';

export default function RoutesScreen() {
  const [selectedRoute, setSelectedRoute] = useState<BusRoute | null>(null);
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const { buses, stops, routes, isLoading, refreshData } = useBusData();

  const handleRouteSelect = (route: BusRoute) => {
    setSelectedRoute(route);
    setSelectedBus(null);
  };

  const handleBusSelect = (bus: Bus) => {
    setSelectedBus(bus);
  };

  const handleBack = () => {
    if (selectedBus) {
      setSelectedBus(null);
    } else {
      setSelectedRoute(null);
    }
  };

  const routeBuses = selectedRoute 
    ? (buses || []).filter(bus => bus.routeId === selectedRoute.id)
    : [];

  const routeStops = selectedRoute
    ? (stops || []).filter(stop => (selectedRoute.stops || []).includes(stop.id))
    : [];

  if (selectedBus) {
    const currentRoute = (routes || []).find(r => r.id === selectedBus.routeId);
    const startIndex = Math.max(
      0,
      routeStops.findIndex(s => s.id === selectedBus.nextStopId)
    );
    const nextStops = (routeStops || []).slice(startIndex);
    
    return (
      <SafeAreaView style={styles.container}>
        <Animated.View 
          entering={FadeInUp.delay(100)}
          style={[styles.header, { backgroundColor: currentRoute?.color || '#FDE047' }]}
        >
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ArrowLeft size={24} color="#1F2937" />
          </TouchableOpacity>
          
          <View style={styles.busHeader}>
            <Text style={styles.busTitle}>🚌 Bus {selectedBus.identifier}</Text>
            <View style={styles.busStats}>
              <Users size={16} color="#1F2937" />
              <Text style={styles.busStatsText}>
                {selectedBus.passengers} / {selectedBus.capacity}
              </Text>
            </View>
          </View>
        </Animated.View>

        <ScrollView 
          style={styles.content}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={refreshData}
              tintColor="#16A34A"
            />
          }
        >
          {nextStops.map((stop, index) => {
            const estimatedTime = selectedBus.estimatedArrival + (index * 6);
            const isPassed = index === 0 && selectedBus.estimatedArrival === 0;
            
            return (
              <Animated.View
                key={stop.id}
                entering={FadeInDown.delay(index * 100)}
                style={[
                  styles.stopItem,
                  isPassed && styles.passedStop,
                  index === 0 && styles.currentStop
                ]}
              >
                <View style={styles.stopNumber}>
                  <Text style={styles.stopNumberText}>{stop.id.toUpperCase()}</Text>
                </View>
                
                <View style={styles.stopDetails}>
                  <Text style={[styles.stopName, isPassed && styles.passedText]}>
                    {stop.name}
                  </Text>
                  <Text style={[styles.stopAddress, isPassed && styles.passedText]}>
                    {stop.address}
                  </Text>
                </View>
                
                <View style={styles.timeContainer}>
                  <Clock size={14} color={isPassed ? "#9CA3AF" : "#16A34A"} />
                  <Text style={[
                    styles.timeText,
                    isPassed && styles.passedText,
                    index === 0 && styles.currentTimeText
                  ]}>
                    {isPassed ? 'Vencida' : formatTime(estimatedTime)}
                  </Text>
                </View>
              </Animated.View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (selectedRoute) {
    return (
      <SafeAreaView style={styles.container}>
        <Animated.View 
          entering={FadeInUp.delay(100)}
          style={[styles.header, { backgroundColor: selectedRoute.color }]}
        >
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <Text style={styles.routeTitle}>Ruta {selectedRoute.name}</Text>
        </Animated.View>

        <View style={styles.mapSection}>
          <MapView
            buses={routeBuses}
            stops={routeStops}
            userLocation={userLocation}
            onBusPress={handleBusSelect}
            focusBusId={selectedBus?.id || undefined}
          />
        </View>

        <Animated.View 
          entering={FadeInDown.delay(200)}
          style={styles.busesBottomSheet}
        >
          <View style={styles.handle} />
          <Text style={styles.sectionTitle}>Autobuses en Ruta</Text>
          
          <ScrollView style={styles.routeBusesContainer}>
            {routeBuses.map((bus) => (
              <BusCard
                key={bus.id}
                bus={bus}
                onPress={() => handleBusSelect(bus)}
              />
            ))}
          </ScrollView>
        </Animated.View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View 
        entering={FadeInDown.delay(100)}
        style={styles.header}
      >
        <Text style={styles.title}>Rutas de Autobuses</Text>
      </Animated.View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refreshData}
            tintColor="#16A34A"
          />
        }
      >
        {(routes || []).map((route, index) => {
          const routeBuses = (buses || []).filter(bus => bus.routeId === route.id);
          
          return (
            <Animated.View
              key={route.id}
              entering={FadeInDown.delay(index * 100)}
            >
              <TouchableOpacity
                style={[styles.routeCard, { borderLeftColor: route.color }]}
                onPress={() => handleRouteSelect(route)}
                activeOpacity={0.7}
              >
                <View style={styles.routeCardHeader}>
                  <Text style={styles.routeCardTitle}>Ruta {route.name}</Text>
                  <Text style={styles.activeBuses}>
                    {routeBuses.length} autobús{routeBuses.length !== 1 ? 'es' : ''} activo{routeBuses.length !== 1 ? 's' : ''}
                  </Text>
                </View>
                
                <View style={styles.routeStops}>
                  <Text style={styles.stopsTitle}>Paradas principales:</Text>
                  {(route.stops || []).slice(0, 3).map(stopId => {
                    const stop = (stops || []).find(s => s.id === stopId);
                    return stop ? (
                      <Text key={stopId} style={styles.stopText}>
                        • {stop.name}
                      </Text>
                    ) : null;
                  })}
                  {(route.stops?.length ?? 0) > 3 && (
                    <Text style={styles.moreStops}>
                      +{(route.stops?.length ?? 0) - 3} paradas más
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
    padding: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
  },
  routeTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    flex: 1,
  },
  busTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  busHeader: {
    flex: 1,
  },
  busStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  busStatsText: {
    fontSize: 14,
    color: '#1F2937',
    marginLeft: 4,
    fontWeight: '600',
  },
  mapSection: {
    flex: 0.5,
  },
  bottomSheet: {
    flex: 0.5,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 12,
  },
  busesBottomSheet: {
    flex: 0.4,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 12,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#D1D5DB',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  routeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  routeCardHeader: {
    marginBottom: 12,
  },
  routeCardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  activeBuses: {
    fontSize: 14,
    color: '#16A34A',
    fontWeight: '500',
  },
  routeStops: {
    marginTop: 8,
  },
  stopsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 8,
  },
  stopText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  moreStops: {
    fontSize: 14,
    color: '#9CA3AF',
    fontStyle: 'italic',
    marginTop: 4,
  },
  routeBusesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  stopItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  currentStop: {
    backgroundColor: '#F0FDF4',
    borderWidth: 2,
    borderColor: '#16A34A',
  },
  passedStop: {
    backgroundColor: '#F9FAFB',
    opacity: 0.7,
  },
  stopNumber: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#16A34A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  stopNumberText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  stopDetails: {
    flex: 1,
  },
  stopName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  stopAddress: {
    fontSize: 14,
    color: '#6B7280',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#16A34A',
    marginLeft: 4,
  },
  currentTimeText: {
    color: '#EF4444',
  },
  passedText: {
    color: '#9CA3AF',
  },
});