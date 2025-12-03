import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../lib/auth/ctx';
import { storage } from '../../lib/storage';

export default function Profile() {
  const { user, signOut, expenses } = useAuth();

  const handleClearData = async () => {
    Alert.alert(
      "Reset App",
      "Are you sure you want to delete all data?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive", 
          onPress: async () => {
            await storage.removeItem('expenses');
            // Force a reload or just sign out to clear state effectively for this simple app
            signOut(); 
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 items-center p-6">
      {/* Profile Header */}
      <View className="w-full bg-white p-6 rounded-3xl shadow-sm mb-6 items-center border border-gray-100">
        <View className="w-20 h-20 bg-blue-100 rounded-full items-center justify-center mb-4">
          <Text className="text-3xl">👤</Text>
        </View>
        <Text className="text-xl font-bold text-gray-900">{user?.name}</Text>
        <Text className="text-gray-500">{user?.email}</Text>
      </View>

      {/* Stats Grid */}
      <View className="w-full flex-row gap-4 mb-8">
        <View className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 items-center">
          <Text className="text-2xl font-bold text-blue-600">{expenses.length}</Text>
          <Text className="text-xs text-gray-400 font-medium uppercase tracking-wider">Transactions</Text>
        </View>
        <View className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 items-center">
          <Text className="text-2xl font-bold text-green-600">Active</Text>
          <Text className="text-xs text-gray-400 font-medium uppercase tracking-wider">Status</Text>
        </View>
      </View>
      
      {/* Actions */}
      <View className="w-full gap-3">
        <TouchableOpacity 
          className="bg-white border border-gray-200 p-4 rounded-xl flex-row items-center justify-center"
          onPress={signOut}
        >
          <Text className="text-gray-900 font-semibold">Sign Out</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="bg-red-50 p-4 rounded-xl flex-row items-center justify-center"
          onPress={handleClearData}
        >
          <Text className="text-red-600 font-semibold">Reset All Data</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}