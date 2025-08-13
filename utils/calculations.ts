export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return distance * 1000; // Convert to meters
}

export function formatTime(minutes: number): string {
  if (minutes === 0) return 'Vencida';
  if (minutes === 1) return '1 min.';
  return `${minutes} min.`;
}

export function getOccupancyColor(passengers: number, capacity: number): string {
  const percentage = (passengers / capacity) * 100;
  if (percentage >= 90) return '#EF4444'; // Red
  if (percentage >= 70) return '#F59E0B'; // Orange
  if (percentage >= 50) return '#FDE047'; // Yellow
  return '#16A34A'; // Green
}

export function getOccupancyLevel(passengers: number, capacity: number): string {
  const percentage = (passengers / capacity) * 100;
  if (percentage >= 90) return 'Lleno';
  if (percentage >= 70) return 'Ocupado';
  if (percentage >= 50) return 'Medio';
  return 'Disponible';
}