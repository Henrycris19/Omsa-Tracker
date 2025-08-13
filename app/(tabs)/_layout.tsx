import { Tabs } from 'expo-router';
import { Heart, MapPin, Bus, Route } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#16A34A',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          paddingBottom: 8,
          paddingTop: 8,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favoritas',
          tabBarIcon: ({ size, color }) => (
            <Heart size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="nearby-stops"
        options={{
          title: 'Paradas',
          tabBarIcon: ({ size, color }) => (
            <MapPin size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="nearby-buses"
        options={{
          title: 'Autobuses',
          tabBarIcon: ({ size, color }) => (
            <Bus size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="routes"
        options={{
          title: 'Rutas',
          tabBarIcon: ({ size, color }) => (
            <Route size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}