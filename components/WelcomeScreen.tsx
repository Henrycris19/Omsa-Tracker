import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { MapPin, Navigation, AlertCircle } from 'lucide-react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useGoogleMaps } from '@/hooks/useGoogleMaps';
import { useResponsive } from '../hooks/useResponsive';

interface WelcomeScreenProps {
  onLocationPermission: () => void;
  onManualSearch: () => void;
}

export default function WelcomeScreen({
  onLocationPermission,
  onManualSearch,
}: WelcomeScreenProps) {
  const { requestLocationPermission, isLoading } = useGoogleMaps();
  const { isSmallScreen } = useResponsive();

  const handleLocationPermission = async () => {
    try {
      const granted = await requestLocationPermission();
      if (granted) {
        onLocationPermission();
      } else {
        Alert.alert(
          'Permiso de ubicación requerido',
          'Para encontrar paradas de autobuses cercanas, necesitamos acceso a tu ubicación.',
          [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Configuración', onPress: () => {} }
          ]
        );
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
      Alert.alert(
        'Error',
        'No se pudo obtener el permiso de ubicación. Inténtalo de nuevo.',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View 
        entering={FadeInUp.delay(300)}
        style={styles.content}
      >
        <View style={styles.illustration}>
          <View style={styles.phone}>
            <View style={styles.mapIcon}>
              <MapPin size={60} color="#16A34A" />
            </View>
          </View>
          <View style={styles.person}>
            <View style={styles.personHead} />
            <View style={styles.personBody} />
          </View>
        </View>

        <Animated.View 
          entering={FadeInUp.delay(500)}
          style={styles.textContainer}
        >
          <Text style={styles.title}>
            Activar la ubicación para encontrar paradas de autobuses cercanos
          </Text>
          {!isSmallScreen && (
            <Text style={styles.subtitle}>
              Con Google Maps podrás ver tu ubicación exacta y las paradas más cercanas
            </Text>
          )}
        </Animated.View>

        <Animated.View 
          entering={FadeInDown.delay(700)}
          style={styles.buttonsContainer}
        >
          <TouchableOpacity
            style={[styles.primaryButton, isLoading && styles.disabledButton]}
            onPress={handleLocationPermission}
            activeOpacity={0.8}
            disabled={isLoading}
          >
            <Navigation size={20} color="#FFFFFF" style={styles.buttonIcon} />
            <Text style={styles.primaryButtonText}>
              {isLoading ? 'Activando...' : 'Activar Ubicación'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={onManualSearch}
            activeOpacity={0.7}
          >
            <Text style={styles.secondaryButtonText}>Buscaré manualmente</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View 
          entering={FadeInUp.delay(900)}
          style={styles.logoContainer}
        >
          <View style={styles.logo}>
            <View style={styles.busLogo}>
              <Text style={styles.omsaText}>OMSA</Text>
            </View>
            <Text style={styles.logoText}>
              OFICINA METROPOLITANA DE{'\n'}SERVICIOS DE AUTOBUSES
            </Text>
          </View>
        </Animated.View>

        {!isSmallScreen && (
          <Animated.View 
            entering={FadeInUp.delay(1100)}
            style={styles.featuresContainer}
          >
            <View style={styles.feature}>
              <MapPin size={16} color="#16A34A" />
              <Text style={styles.featureText}>Ubicación en tiempo real</Text>
            </View>
            <View style={styles.feature}>
              <Navigation size={16} color="#16A34A" />
              <Text style={styles.featureText}>Navegación integrada</Text>
            </View>
            <View style={styles.feature}>
              <AlertCircle size={16} color="#16A34A" />
              <Text style={styles.featureText}>Alertas de llegada</Text>
            </View>
          </Animated.View>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  illustration: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 60,
  },
  phone: {
    width: 180,
    height: 320,
    backgroundColor: '#F3F4F6',
    borderRadius: 30,
    borderWidth: 6,
    borderColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  mapIcon: {
    marginBottom: 20,
  },
  person: {
    alignItems: 'center',
  },
  personHead: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FCA5A5',
    marginBottom: 8,
  },
  personBody: {
    width: 60,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#D1D5DB',
  },
  textContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: '#1F2937',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
  },
  buttonsContainer: {
    width: '100%',
    marginBottom: 60,
  },
  primaryButton: {
    backgroundColor: '#FDE047',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  disabledButton: {
    opacity: 0.7,
  },
  buttonIcon: {
    marginRight: 8,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  secondaryButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    color: '#6B7280',
    textDecorationLine: 'underline',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  busLogo: {
    width: 60,
    height: 40,
    backgroundColor: '#16A34A',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  omsaText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  logoText: {
    fontSize: 12,
    color: '#1F2937',
    fontWeight: '600',
    textAlign: 'left',
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 40,
  },
  feature: {
    alignItems: 'center',
    width: '30%',
  },
  featureText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
  },
});