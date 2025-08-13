// Configuración específica para Google Maps
export const GOOGLE_MAPS_CONFIG = {
  apiKey: "AIzaSyAYXYowsrelmymaOhLFo8OKbSFjB073Jrw",
  center: {
    lat: 18.4861,  // Santo Domingo
    lng: -69.9312,
  },
  zoom: 14,
  libraries: ["places", "geometry"] as const,
  defaultLocation: {
    latitude: 18.4861,
    longitude: -69.9312,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  },
  mapSettings: {
    minZoom: 10,
    maxZoom: 18,
    defaultZoom: 14,
    mapTypeId: 'roadmap',
    styles: [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
      },
      {
        featureType: 'transit',
        elementType: 'labels',
        stylers: [{ visibility: 'simplified' }]
      }
    ]
  }
};

export default GOOGLE_MAPS_CONFIG;
