import { Stack } from 'expo-router';
import '../global.css'; // Ensure NativeWind is imported here
import { AuthProvider } from '../lib/auth/ctx';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="(app)" />
      </Stack>
    </AuthProvider>
  );
}