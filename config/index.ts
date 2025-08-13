// Configuración general de la aplicación OMSA
export const APP_CONFIG = {
  name: 'OMSA Bus Tracker',
  version: '1.0.0',
  defaultLocation: {
    latitude: 18.4861,  // Santo Domingo
    longitude: -69.9312,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  },
  mapSettings: {
    minZoom: 10,
    maxZoom: 18,
    defaultZoom: 14,
  },
  api: {
    baseUrl: process.env.EXPO_PUBLIC_API_URL || 'https://api.omsa.gob.do',
    timeout: 10000,
  },
  features: {
    realTimeTracking: true,
    offlineMode: false,
    notifications: true,
  }
};

export const GOOGLE_MAPS_CONFIG = {
  apiKey: "AIzaSyAYXYowsrelmymaOhLFo8OKbSFjB073Jrw",
  center: {
    lat: 18.4861,
    lng: -69.9312,
  },
  zoom: 14,
  libraries: ["places", "geometry"] as const,
};

export default APP_CONFIG;
