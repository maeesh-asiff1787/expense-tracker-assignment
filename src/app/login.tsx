import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../lib/auth/ctx';

export default function Login() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-white justify-center p-8">
      <View className="items-center mb-10">
        <View className="w-16 h-16 bg-blue-600 rounded-2xl items-center justify-center mb-4">
          <Text className="text-3xl text-white">💰</Text>
        </View>
        <Text className="text-2xl font-bold text-gray-900">Expensify</Text>
        <Text className="text-gray-500">Track your spending</Text>
      </View>

      <View className="w-full">
        <Text className="mb-2 font-medium text-gray-700">Email Address</Text>
        <TextInput
          className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl mb-6"
          placeholder="john@example.com"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity 
          className="w-full bg-blue-600 p-4 rounded-xl items-center"
          onPress={() => signIn(email)}
        >
          <Text className="text-white font-bold text-lg">Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
