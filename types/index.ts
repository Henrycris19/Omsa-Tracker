export interface BusStop {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  routeIds: string[];
}

export interface Bus {
  id: string;
  routeId: string;
  identifier: string;
  latitude: number;
  longitude: number;
  passengers: number;
  capacity: number;
  nextStopId: string;
  estimatedArrival: number; // minutes
  direction: 'north' | 'south' | 'east' | 'west';
}

export interface BusRoute {
  id: string;
  name: string;
  color: string;
  stops: string[];
  coordinates: Array<{
    latitude: number;
    longitude: number;
  }>;
}

export interface UserLocation {
  latitude: number;
  longitude: number;
}