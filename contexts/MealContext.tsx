import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Meal = {
  id: string;
  name: string;
  ingredients: any[];
};

type MealContextType = {
  meals: Meal[];
  scannedProduct: any | null;
  setScannedProduct: (product: any) => void;
  addMeal: (meal: Meal) => void;
  updateMeal: (id: string, meal: Meal) => void;
  deleteMeal: (id: string) => void;
};

const MealContext = createContext<MealContextType | undefined>(undefined);

export function MealProvider({ children }: { children: React.ReactNode }) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [scannedProduct, setScannedProduct] = useState<any | null>(null);

  useEffect(() => {
    loadMeals();
  }, []);

  const loadMeals = async () => {
    try {
      const storedMeals = await AsyncStorage.getItem('meals');
      if (storedMeals) {
        setMeals(JSON.parse(storedMeals));
      }
    } catch (error) {
      console.error('Error loading meals:', error);
    }
  };

  const saveMeals = async (newMeals: Meal[]) => {
    try {
      await AsyncStorage.setItem('meals', JSON.stringify(newMeals));
    } catch (error) {
      console.error('Error saving meals:', error);
    }
  };

  const addMeal = async (meal: Meal) => {
    const newMeals = [...meals, meal];
    setMeals(newMeals);
    await saveMeals(newMeals);
  };

  const updateMeal = async (id: string, updatedMeal: Meal) => {
    const newMeals = meals.map(meal => 
      meal.id === id ? updatedMeal : meal
    );
    setMeals(newMeals);
    await saveMeals(newMeals);
  };

  const deleteMeal = async (id: string) => {
    const newMeals = meals.filter(meal => meal.id !== id);
    setMeals(newMeals);
    await saveMeals(newMeals);
  };

  return (
    <MealContext.Provider value={{ 
      meals, 
      scannedProduct,
      setScannedProduct,
      addMeal, 
      updateMeal, 
      deleteMeal 
    }}>
      {children}
    </MealContext.Provider>
  );
}

export const useMeals = () => {
  const context = useContext(MealContext);
  if (context === undefined) {
    throw new Error('useMeals must be used within a MealProvider');
  }
  return context;
};