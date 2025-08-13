import { BusStop, Bus, BusRoute } from '@/types';

export const busStops: BusStop[] = [
  // Línea 1 - Centro hacia Zona Colonial
  {
    id: 'parada-001',
    name: 'Plaza de la Cultura',
    address: 'Plaza de la Cultura, Santo Domingo',
    latitude: 18.4680,
    longitude: -69.9312,
    routeIds: ['linea-1', 'linea-3'],
  },
  {
    id: 'parada-002',
    name: 'Zona Colonial - Calle El Conde',
    address: 'Calle El Conde, Zona Colonial',
    latitude: 18.4733,
    longitude: -69.8850,
    routeIds: ['linea-1'],
  },
  {
    id: 'parada-003',
    name: 'Parque Independencia',
    address: 'Parque Independencia, Santo Domingo',
    latitude: 18.4675,
    longitude: -69.8945,
    routeIds: ['linea-1', 'linea-2'],
  },
  
  // Línea 2 - Malecón y Puerto (Malecón Centro eliminado)
  // Puerto de Santo Domingo eliminado
  // Terminal de Cruceros eliminado

  // Línea 3 - Universidad y Hospitales
  {
    id: 'parada-007',
    name: 'Universidad Autónoma UASD',
    address: 'UASD, Alma Mater',
    latitude: 18.4889,
    longitude: -69.9154,
    routeIds: ['linea-3'],
  },
  {
    id: 'parada-008',
    name: 'Hospital Dr. Salvador B. Gautier',
    address: 'Hospital Gautier',
    latitude: 18.4923,
    longitude: -69.9087,
    routeIds: ['linea-3'],
  },
  {
    id: 'parada-009',
    name: 'Hospital General Plaza de la Salud',
    address: 'Plaza de la Salud',
    latitude: 18.4756,
    longitude: -69.9342,
    routeIds: ['linea-3', 'linea-4'],
  },

  // Línea 4 - Zona Norte y Centros Comerciales
  {
    id: 'parada-010',
    name: 'Centro Comercial Agora Mall',
    address: 'Agora Mall, Av. Kennedy',
    latitude: 18.4698,
    longitude: -69.9134,
    routeIds: ['linea-4'],
  },
  {
    id: 'parada-011',
    name: 'Blue Mall',
    address: 'Blue Mall, Av. Winston Churchill',
    latitude: 18.4865,
    longitude: -69.9512,
    routeIds: ['linea-4'],
  },
  {
    id: 'parada-012',
    name: 'Metro Centro',
    address: 'Metro Centro, Av. Tiradentes',
    latitude: 18.4789,
    longitude: -69.9456,
    routeIds: ['linea-4', 'linea-5'],
  },

  // Línea 5 - Aeropuerto y Hoteles
  {
    id: 'parada-013',
    name: 'Aeropuerto Las Américas - Terminal',
    address: 'Aeropuerto Internacional Las Américas',
    latitude: 18.4297,
    longitude: -69.6686,
    routeIds: ['linea-5'],
  },
  {
    id: 'parada-014',
    name: 'Hotel Jaragua',
    address: 'Hotel Jaragua, Malecón',
    latitude: 18.4634,
    longitude: -69.9145,
    routeIds: ['linea-5'],
  },
  {
    id: 'parada-015',
    name: 'Hotel Hilton',
    address: 'Hotel Hilton, Malecón',
    latitude: 18.4587,
    longitude: -69.9087,
    routeIds: ['linea-5'],
  },

  // Líneas Express - Conexiones rápidas
  {
    id: 'parada-016',
    name: 'Terminal de Autobuses Caribe Tours',
    address: 'Terminal Caribe Tours',
    latitude: 18.4934,
    longitude: -69.9287,
    routeIds: ['express-1'],
  },
  {
    id: 'parada-017',
    name: 'Palacio Nacional',
    address: 'Palacio Nacional',
    latitude: 18.4702,
    longitude: -69.8834,
    routeIds: ['express-1'],
  },
  {
    id: 'parada-018',
    name: 'Catedral Primada',
    address: 'Catedral Primada de América',
    latitude: 18.4725,
    longitude: -69.8823,
    routeIds: ['express-1'],
  },

  // Paradas adicionales en zonas clave
  // Parque Mirador del Este eliminado
  {
    id: 'parada-020',
    name: 'Faro a Colón',
    address: 'Faro a Colón',
    latitude: 18.4765,
    longitude: -69.8445,
    routeIds: ['linea-2'],
  },
];

export const buses: Bus[] = [
  // Línea 1 - Centro hacia Zona Colonial
  {
    id: 'bus-001',
    routeId: 'linea-1',
    identifier: 'L1-340',
    latitude: 18.4695, // En la calle, entre paradas
    longitude: -69.9200,
    passengers: 45,
    capacity: 160,
    nextStopId: 'parada-002',
    estimatedArrival: 2,
    direction: 'east',
  },
  {
    id: 'bus-002',
    routeId: 'linea-1',
    identifier: 'L1-341',
    latitude: 18.4700, // Circulando por Av. Duarte
    longitude: -69.9050,
    passengers: 78,
    capacity: 160,
    nextStopId: 'parada-003',
    estimatedArrival: 8,
    direction: 'east',
  },

  // Línea 2 - Malecón y Puerto (L2-450 eliminado)
  // L2-451 eliminado

  // Línea 3 - Universidad y Hospitales
  {
    id: 'bus-005',
    routeId: 'linea-3',
    identifier: 'L3-220',
    latitude: 18.4850, // En Av. Abraham Lincoln
    longitude: -69.9200,
    passengers: 34,
    capacity: 140,
    nextStopId: 'parada-008',
    estimatedArrival: 3,
    direction: 'north',
  },
  {
    id: 'bus-006',
    routeId: 'linea-3',
    identifier: 'L3-221',
    latitude: 18.4720, // Circulando por Av. 27 de Febrero
    longitude: -69.9300,
    passengers: 89,
    capacity: 140,
    nextStopId: 'parada-001',
    estimatedArrival: 7,
    direction: 'west',
  },

  // Línea 4 - Zona Norte y Centros Comerciales
  {
    id: 'bus-007',
    routeId: 'linea-4',
    identifier: 'L4-560',
    latitude: 18.4720, // En Av. Kennedy, entre centros comerciales
    longitude: -69.9180,
    passengers: 145,
    capacity: 200,
    nextStopId: 'parada-011',
    estimatedArrival: 6,
    direction: 'north',
  },
  {
    id: 'bus-008',
    routeId: 'linea-4',
    identifier: 'L4-561',
    latitude: 18.4830, // Circulando por Av. Winston Churchill
    longitude: -69.9450,
    passengers: 178,
    capacity: 200,
    nextStopId: 'parada-012',
    estimatedArrival: 9,
    direction: 'east',
  },

  // Línea 5 - Aeropuerto y Hoteles
  {
    id: 'bus-009',
    routeId: 'linea-5',
    identifier: 'L5-800',
    latitude: 18.4297,
    longitude: -69.6686,
    passengers: 67,
    capacity: 240,
    nextStopId: 'parada-012',
    estimatedArrival: 45,
    direction: 'west',
  },
  {
    id: 'bus-010',
    routeId: 'linea-5',
    identifier: 'L5-801',
    latitude: 18.4620, // En el Malecón, circulando
    longitude: -69.9080,
    passengers: 198,
    capacity: 240,
    nextStopId: 'parada-015',
    estimatedArrival: 3,
    direction: 'south',
  },

  // Express 1 - Conexiones rápidas
  {
    id: 'bus-011',
    routeId: 'express-1',
    identifier: 'EX1-100',
    latitude: 18.4880, // En Av. Máximo Gómez
    longitude: -69.9250,
    passengers: 89,
    capacity: 160,
    nextStopId: 'parada-017',
    estimatedArrival: 5,
    direction: 'south',
  },
  {
    id: 'bus-012',
    routeId: 'express-1',
    identifier: 'EX1-101',
    latitude: 18.4690, // Circulando por Av. Bolívar
    longitude: -69.8900,
    passengers: 134,
    capacity: 160,
    nextStopId: 'parada-018',
    estimatedArrival: 2,
    direction: 'east',
  },

  // Autobuses adicionales en diferentes ubicaciones
  // L1-342 eliminado
  {
    id: 'bus-014',
    routeId: 'linea-2',
    identifier: 'L2-452',
    latitude: 18.4740, // En la calle hacia Zona Colonial
    longitude: -69.8650,
    passengers: 167,
    capacity: 180,
    nextStopId: 'parada-003',
    estimatedArrival: 18,
    direction: 'west',
  },
  {
    id: 'bus-015',
    routeId: 'linea-4',
    identifier: 'L4-562',
    latitude: 18.4750, // En Av. Tiradentes
    longitude: -69.9400,
    passengers: 112,
    capacity: 200,
    nextStopId: 'parada-009',
    estimatedArrival: 11,
    direction: 'south',
  },
];

export const busRoutes: BusRoute[] = [
  {
    id: 'linea-1',
    name: 'Línea 1 - Centro/Zona Colonial',
    color: '#16A34A',
    stops: ['parada-001', 'parada-002', 'parada-003'],
    coordinates: [
      { latitude: 18.4680, longitude: -69.9312 },
      { latitude: 18.4733, longitude: -69.8850 },
      { latitude: 18.4675, longitude: -69.8945 },
    ],
  },
  {
    id: 'linea-2',
    name: 'Línea 2 - Malecón/Puerto',
    color: '#2563EB',
    stops: ['parada-003', 'parada-020'],
    coordinates: [
      { latitude: 18.4675, longitude: -69.8945 },
      { latitude: 18.4765, longitude: -69.8445 },
    ],
  },
  {
    id: 'linea-3',
    name: 'Línea 3 - Universidad/Hospitales',
    color: '#DC2626',
    stops: ['parada-001', 'parada-007', 'parada-008', 'parada-009'],
    coordinates: [
      { latitude: 18.4680, longitude: -69.9312 },
      { latitude: 18.4889, longitude: -69.9154 },
      { latitude: 18.4923, longitude: -69.9087 },
      { latitude: 18.4756, longitude: -69.9342 },
    ],
  },
  {
    id: 'linea-4',
    name: 'Línea 4 - Centros Comerciales',
    color: '#7C3AED',
    stops: ['parada-009', 'parada-010', 'parada-011', 'parada-012'],
    coordinates: [
      { latitude: 18.4756, longitude: -69.9342 },
      { latitude: 18.4698, longitude: -69.9134 },
      { latitude: 18.4865, longitude: -69.9512 },
      { latitude: 18.4789, longitude: -69.9456 },
    ],
  },
  {
    id: 'linea-5',
    name: 'Línea 5 - Aeropuerto/Hoteles',
    color: '#EA580C',
    stops: ['parada-012', 'parada-013', 'parada-014', 'parada-015'],
    coordinates: [
      { latitude: 18.4789, longitude: -69.9456 },
      { latitude: 18.4297, longitude: -69.6686 },
      { latitude: 18.4634, longitude: -69.9145 },
      { latitude: 18.4587, longitude: -69.9087 },
    ],
  },
  {
    id: 'express-1',
    name: 'Express 1 - Conexiones Rápidas',
    color: '#F59E0B',
    stops: ['parada-016', 'parada-017', 'parada-018'],
    coordinates: [
      { latitude: 18.4934, longitude: -69.9287 },
      { latitude: 18.4702, longitude: -69.8834 },
      { latitude: 18.4725, longitude: -69.8823 },
    ],
  },
];

export const favoriteStops = ['parada-001', 'parada-010', 'parada-016'];

export const userLocation = {
  latitude: 18.4838,
  longitude: -69.9286,
};