import { router } from 'expo-router';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../lib/auth/ctx';

const CATEGORIES = [
  { id: 'Food', icon: '🍔', label: 'Food' },
  { id: 'Transport', icon: '🚗', label: 'Transport' },
  { id: 'Shopping', icon: '🛍️', label: 'Shopping' },
  { id: 'Other', icon: '📝', label: 'Other' },
];

export default function AddExpense() {
  // Destructure currency from useAuth to display it
  const { addExpense, currency } = useAuth();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Other');
  // Default to today's date (YYYY-MM-DD)
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSave = () => {
    if (!title || !amount || !date) return;
    
    // Validate date or fallback to today if invalid
    const dateObj = new Date(date);
    const validDate = isNaN(dateObj.getTime()) ? new Date().toISOString() : dateObj.toISOString();

    addExpense({ 
      title, 
      amount, 
      category, 
      date: validDate 
    });
    
    setTitle('');
    setAmount('');
    setCategory('Other');
    setDate(new Date().toISOString().split('T')[0]);
    router.push('/(app)'); // Return to dashboard
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-6">
      <Text className="text-2xl font-bold mb-6">Add Expense</Text>
      
      <View className="space-y-4">
        {/* Title Input */}
        <View>
          <Text className="mb-2 text-gray-600 font-medium">What is this for?</Text>
          <TextInput
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl"
            placeholder="Groceries, Uber, etc."
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* Amount Input with Currency Indicator */}
        <View>
          <Text className="mb-2 text-gray-600 font-medium">How much? ({currency})</Text>
          <TextInput
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl"
            placeholder="0.00"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
        </View>

        {/* Date Input */}
        <View>
          <Text className="mb-2 text-gray-600 font-medium">Date (YYYY-MM-DD)</Text>
          <TextInput
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl"
            placeholder="YYYY-MM-DD"
            value={date}
            onChangeText={setDate}
          />
        </View>

        {/* Category Selection */}
        <View>
          <Text className="mb-2 text-gray-600 font-medium">Category</Text>
          <View className="flex-row flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                onPress={() => setCategory(cat.id)}
                className={`px-4 py-3 rounded-xl border ${
                  category === cat.id 
                    ? 'bg-blue-600 border-blue-600' 
                    : 'bg-white border-gray-200'
                }`}
              >
                <Text className={`${category === cat.id ? 'text-white' : 'text-gray-600'} font-medium`}>
                  {cat.icon} {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity 
          className="bg-blue-600 p-4 rounded-xl items-center mt-6"
          onPress={handleSave}
        >
          <Text className="text-white font-bold text-lg">Save Expense</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}