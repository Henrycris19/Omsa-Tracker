import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, Heart, ChevronUp } from 'lucide-react-native';
import Animated, { FadeInUp, Layout } from 'react-native-reanimated';
import { BusStop, Bus } from '@/types';
import BusCard from './BusCard';

interface StopCardProps {
  stop: BusStop;
  buses: Bus[];
  isFavorite?: boolean;
  isExpanded?: boolean;
  onToggleFavorite?: () => void;
  onToggleExpanded?: () => void;
  onBusPress?: (bus: Bus) => void;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function StopCard({
  stop,
  buses,
  isFavorite = false,
  isExpanded = false,
  onToggleFavorite,
  onToggleExpanded,
  onBusPress,
}: StopCardProps) {
  return (
    <Animated.View
      entering={FadeInUp.delay(100)}
      layout={Layout.springify()}
      style={styles.container}
    >
      <AnimatedTouchableOpacity
        style={styles.header}
        onPress={onToggleExpanded}
        activeOpacity={0.7}
      >
        <View style={styles.headerContent}>
          <View style={styles.stopIcon}>
            <MapPin size={20} color="#FFFFFF" />
          </View>
          <View style={styles.stopInfo}>
            <Text style={styles.stopName}>{stop.name}</Text>
            <Text style={styles.stopAddress}>{stop.address}</Text>
          </View>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity
            onPress={onToggleFavorite}
            style={styles.favoriteButton}
          >
            <Heart
              size={20}
              color={isFavorite ? "#EF4444" : "#9CA3AF"}
              fill={isFavorite ? "#EF4444" : "transparent"}
            />
          </TouchableOpacity>
          
          <Animated.View
            style={[
              styles.expandIcon,
              isExpanded && { transform: [{ rotate: '180deg' }] }
            ]}
          >
            <ChevronUp size={20} color="#6B7280" />
          </Animated.View>
        </View>
      </AnimatedTouchableOpacity>

      {isExpanded && (
        <Animated.View
          entering={FadeInUp.delay(200)}
          style={styles.busesContainer}
        >
          {buses.length > 0 ? (
            buses.map((bus) => (
              <BusCard
                key={bus.id}
                bus={bus}
                onPress={() => onBusPress?.(bus)}
              />
            ))
          ) : (
            <Text style={styles.noBusesText}>
              No hay autobuses disponibles en esta parada
            </Text>
          )}
        </Animated.View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    padding: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  stopIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#16A34A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stopInfo: {
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
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoriteButton: {
    padding: 8,
    marginRight: 4,
  },
  expandIcon: {
    padding: 4,
  },
  busesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  noBusesText: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 14,
    fontStyle: 'italic',
    paddingVertical: 20,
  },
});