import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WelcomeScreen from '@/components/WelcomeScreen';
import NearbyStopsScreen from './nearby-stops';
import { useGoogleMaps } from '@/hooks/useGoogleMaps';

export default function HomeScreen() {
  const [showWelcome, setShowWelcome] = useState(true);
  const { userLocation, locationPermission } = useGoogleMaps();

  useEffect(() => {
    // Si ya tenemos ubicación o permisos, no mostrar pantalla de bienvenida
    if (userLocation || locationPermission) {
      setShowWelcome(false);
    }
  }, [userLocation, locationPermission]);

  const handleLocationPermission = () => {
    setShowWelcome(false);
  };

  const handleManualSearch = () => {
    setShowWelcome(false);
  };

  if (showWelcome) {
    return (
      <SafeAreaView style={styles.container}>
        <WelcomeScreen
          onLocationPermission={handleLocationPermission}
          onManualSearch={handleManualSearch}
        />
      </SafeAreaView>
    );
  }

  return <NearbyStopsScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});