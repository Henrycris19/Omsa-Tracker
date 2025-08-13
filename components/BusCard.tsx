import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Bus as BusIcon, Users, Heart } from 'lucide-react-native';
import Animated, { FadeInUp, Layout } from 'react-native-reanimated';
import { Bus } from '@/types';
import { getOccupancyColor, formatTime } from '@/utils/calculations';

interface BusCardProps {
  bus: Bus;
  onPress?: () => void;
  showFavorite?: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function BusCard({
  bus,
  onPress,
  showFavorite = false,
  isFavorite = false,
  onToggleFavorite,
}: BusCardProps) {
  const occupancyColor = getOccupancyColor(bus.passengers, bus.capacity);
  const arrivalText = formatTime(bus.estimatedArrival);
  const isExpired = bus.estimatedArrival === 0;

  return (
    <AnimatedTouchableOpacity
      entering={FadeInUp.delay(100)}
      layout={Layout.springify()}
      style={[styles.container, isExpired && styles.expiredContainer]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.busInfo}>
          <View style={[styles.busIcon, { backgroundColor: occupancyColor }]}>
            <BusIcon size={20} color="#FFFFFF" />
          </View>
          <Text style={styles.busIdentifier}>{bus.identifier}</Text>
        </View>

        <View style={styles.occupancyContainer}>
          <Users size={16} color="#6B7280" />
          <Text style={styles.occupancyText}>
            {bus.passengers} / {bus.capacity}
          </Text>
        </View>

        <Text style={[
          styles.timeText,
          isExpired && styles.expiredText
        ]}>
          {arrivalText}
        </Text>

        {showFavorite && (
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
        )}
      </View>
    </AnimatedTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  expiredContainer: {
    opacity: 0.7,
    backgroundColor: '#FEF2F2',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  busInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  busIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  busIdentifier: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  occupancyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  occupancyText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#16A34A',
    minWidth: 60,
    textAlign: 'right',
  },
  expiredText: {
    color: '#EF4444',
  },
  favoriteButton: {
    marginLeft: 8,
    padding: 4,
  },
});