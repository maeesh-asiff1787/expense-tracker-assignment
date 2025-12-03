import { router } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { storage } from '../storage';

type User = { email: string; name: string };
type Expense = { id: string; title: string; amount: string; date: string; category: string };
type Currency = 'USD' | 'MVR';

type AuthContextType = {
  user: User | null;
  expenses: Expense[];
  currency: Currency;
  signIn: (email: string) => void;
  signOut: () => void;
  addExpense: (expense: { title: string; amount: string; category: string; date: string }) => void;
  deleteExpense: (id: string) => void;
  toggleCurrency: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [currency, setCurrency] = useState<Currency>('USD');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [userData, expensesData, currencyData] = await Promise.all([
        storage.getItem('user'),
        storage.getItem('expenses'),
        storage.getItem('currency')
      ]);
      
      if (userData) setUser(userData);
      if (expensesData) setExpenses(expensesData);
      if (currencyData) setCurrency(currencyData);
    } catch (e) {
      console.error("Failed to load data", e);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = (email: string) => {
    const newUser = { email, name: email.split('@')[0] };
    setUser(newUser);
    storage.setItem('user', newUser);
    router.replace('/(app)');
  };

  const signOut = () => {
    setUser(null);
    storage.removeItem('user');
    router.replace('/login');
  };

  const addExpense = (newExpense: { title: string; amount: string; category: string; date: string }) => {
    const item = { 
      id: Date.now().toString(), 
      ...newExpense 
    };
    // Sort expenses by date (newest first)
    const updated = [item, ...expenses].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setExpenses(updated);
    storage.setItem('expenses', updated);
  };

  const deleteExpense = (id: string) => {
    const updated = expenses.filter(e => e.id !== id);
    setExpenses(updated);
    storage.setItem('expenses', updated);
  };

  const toggleCurrency = () => {
    const newCurrency = currency === 'USD' ? 'MVR' : 'USD';
    setCurrency(newCurrency);
    storage.setItem('currency', newCurrency);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      expenses, 
      currency, 
      signIn, 
      signOut, 
      addExpense, 
      deleteExpense, 
      toggleCurrency, 
      isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};