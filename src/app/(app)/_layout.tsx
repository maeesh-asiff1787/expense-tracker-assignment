import { Redirect, Tabs } from 'expo-router';
import { Text, View } from 'react-native';
import { useAuth } from '../../lib/auth/ctx';

export default function AppLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <Text>Loading...</Text>;
  if (!user) return <Redirect href="/login" />;

  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: '#2563eb' }}>
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Home',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>🏠</Text>
        }} 
      />
      <Tabs.Screen 
        name="add" 
        options={{ 
          title: 'Add',
          tabBarIcon: ({ color }) => <View className="bg-blue-600 p-2 rounded-full"><Text style={{ color: 'white', fontSize: 20 }}>➕</Text></View>
        }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{ 
          title: 'Profile',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>👤</Text>
        }} 
      />
    </Tabs>
  );
}
