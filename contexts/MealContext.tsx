import React, { createContext, useContext, useState } from 'react';

interface Ingredient {
  id: string;
  name: string;
  calories: number;
}

interface Meal {
  id: string;
  name: string;
  ingredients: Ingredient[];
}

interface MealContextType {
  meals: Meal[];
  addMeal: (meal: Meal) => void;
  updateMeal: (id: string, meal: Meal) => void;
  deleteMeal: (id: string) => void;
}

const MealContext = createContext<MealContextType | undefined>(undefined);

export function MealProvider({ children }: { children: React.ReactNode }) {
  const [meals, setMeals] = useState<Meal[]>([]);

  const addMeal = (meal: Meal) => {
    setMeals([...meals, meal]);
  };

  const updateMeal = (id: string, updatedMeal: Meal) => {
    setMeals(meals.map(meal => meal.id === id ? updatedMeal : meal));
  };

  const deleteMeal = (id: string) => {
    setMeals(meals.filter(meal => meal.id !== id));
  };

  return (
    <MealContext.Provider value={{ meals, addMeal, updateMeal, deleteMeal }}>
      {children}
    </MealContext.Provider>
  );
}

export const useMeals = () => {
  const context = useContext(MealContext);
  if (!context) throw new Error('useMeals must be used within a MealProvider');
  return context;
};