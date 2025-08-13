import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useBusData } from '@/hooks/useBusData';
import { useFavorites } from '@/hooks/useFavorites';
import StopCard from '@/components/StopCard';
import { Bus } from '@/types';

export default function FavoritesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedStops, setExpandedStops] = useState<Record<string, boolean>>({});
  const { buses, stops, isLoading, refreshData } = useBusData();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const favoriteStops = (stops || []).filter(stop => 
    (favorites || []).some(fav => fav.data && fav.data.id === stop.id)
  );
  
  const filteredStops = (favoriteStops || []).filter(stop =>
    stop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stop.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedStops = (filteredStops || []).reduce((acc, stop) => {
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
  };

  const handleBusPress = (bus: Bus) => {
    // Navigate to bus route detail
    console.log('Bus pressed:', bus.identifier);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View 
        entering={FadeInDown.delay(100)}
        style={styles.header}
      >
        <Text style={styles.title}>Paradas Favoritas</Text>
        
        <View style={styles.searchContainer}>
          <Search size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar paradas"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>
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
        {Object.entries(groupedStops).length > 0 ? (
          Object.entries(groupedStops).map(([routeId, { stop, buses }]) => (
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
          ))
        ) : (
          <Animated.View 
            entering={FadeInDown.delay(300)}
            style={styles.emptyState}
          >
            <Text style={styles.emptyText}>
              {favorites.length === 0
                ? 'No tienes paradas favoritas aún'
                : 'No se encontraron paradas favoritas'}
            </Text>
            <Text style={styles.emptySubtext}>
              Agrega paradas a favoritos desde las otras secciones
            </Text>
          </Animated.View>
        )}
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
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});