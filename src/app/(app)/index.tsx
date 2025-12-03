import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../lib/auth/ctx';

// Helper function to get the icon based on the category string
const getIcon = (cat: string) => {
  if (cat === 'Food') return '🍔';
  if (cat === 'Transport') return '🚗';
  if (cat === 'Shopping') return '🛍️';
  return '📝'; // Default for 'Other' or unknown
};

// Helper to get time-based greeting
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
};

export default function Dashboard() {
  const { user, expenses, deleteExpense } = useAuth();
  
  const total = expenses.reduce((sum, item) => sum + parseFloat(item.amount), 0);

  // Calculate totals per category
  const categoryTotals = expenses.reduce((acc, item) => {
    const cat = item.category || 'Other';
    acc[cat] = (acc[cat] || 0) + parseFloat(item.amount);
    return acc;
  }, {} as Record<string, number>);

  const categories = ['Food', 'Transport', 'Shopping', 'Other'];

  return (
    <SafeAreaView className="flex-1 bg-gray-50 px-6 pt-4">
      {/* Header */}
      <View className="mb-6 flex-row justify-between items-center">
        <View>
          <Text className="text-lg font-bold text-gray-900">{getGreeting()}, {user?.name}</Text>
          <Text className="text-gray-500 text-sm">Welcome back</Text>
        </View>
      </View>

      {/* Balance Card */}
      <View className="bg-blue-600 p-6 rounded-3xl shadow-lg mb-6">
        <Text className="text-blue-100 text-sm mb-1">Total Spent</Text>
        <Text className="text-4xl font-bold text-white">${total.toFixed(2)}</Text>
      </View>

      {/* Category Breakdown (New Feature) */}
      <View className="mb-6">
        <Text className="text-lg font-bold text-gray-900 mb-3">Spending by Category</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-3">
          {categories.map((cat) => (
            <View key={cat} className="bg-white p-4 rounded-2xl border border-gray-100 min-w-[120px]">
              <View className="flex-row items-center gap-2 mb-2">
                <Text className="text-lg">{getIcon(cat)}</Text>
                <Text className="text-gray-500 font-medium">{cat}</Text>
              </View>
              <Text className="text-xl font-bold text-gray-900">
                ${(categoryTotals[cat] || 0).toFixed(2)}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Recent Transactions List */}
      <Text className="text-lg font-bold text-gray-900 mb-4">Recent Expenses</Text>
      
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View className="flex-row justify-between items-center p-4 bg-white rounded-2xl mb-3 border border-gray-100">
            <View className="flex-row items-center gap-4">
              {/* Category Icon Bubble */}
              <View className="w-12 h-12 bg-blue-50 rounded-full items-center justify-center">
                <Text className="text-xl">{getIcon(item.category || 'Other')}</Text>
              </View>
              
              {/* Text Info */}
              <View>
                <Text className="font-semibold text-gray-900">{item.title}</Text>
                <Text className="text-xs text-gray-500">{new Date(item.date).toLocaleDateString()}</Text>
              </View>
            </View>

            {/* Price & Delete Action */}
            <View className="flex-row items-center gap-3">
              <Text className="font-bold text-red-500">-${item.amount}</Text>
              <TouchableOpacity onPress={() => deleteExpense(item.id)}>
                <Text className="text-red-300 text-lg">🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text className="text-center text-gray-400 mt-10">No expenses yet</Text>
        }
      />
    </SafeAreaView>
  );
}