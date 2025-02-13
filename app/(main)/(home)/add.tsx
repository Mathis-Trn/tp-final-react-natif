import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useMeals } from '../../../contexts/MealContext';

export default function Add() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const isEditing = !!params.mealId;
  const { addMeal, updateMeal, meals, scannedProduct, setScannedProduct } = useMeals();
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (isEditing) {
      const meal = meals.find(m => m.id === params.mealId);
      if (meal) {
        setName(meal.name);
        setIngredients(meal.ingredients);
      }
    }
  }, [params.mealId]);

  useEffect(() => {
    if (scannedProduct) {
      setIngredients([...ingredients, scannedProduct]);
      setScannedProduct(null); 
    }
  }, [scannedProduct]);

  const searchFood = async (query: string) => {
    const APP_ID = process.env.EXPO_PUBLIC_EDAMAM_APP_ID;
    const APP_KEY = process.env.EXPO_PUBLIC_EDAMAM_APP_KEY;
    
    try {
      const response = await fetch(
        `https://api.edamam.com/api/food-database/v2/parser?app_id=${APP_ID}&app_key=${APP_KEY}&ingr=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setSearchResults(data.hints || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBack = () => {
    if (isEditing) {
      router.push(`/${params.mealId}`);
    } else {
      router.push('/home');
    }
  };

  const saveMeal = () => {
    const meal = {
      id: isEditing ? params.mealId as string : Date.now().toString(),
      name,
      ingredients,
    };

    if (isEditing) {
      updateMeal(params.mealId as string, meal);
    } else {
      addMeal(meal);
    }
    handleBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.nameInput}
        value={name}
        onChangeText={setName}
        placeholder="Nom du menu"
      />

      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.searchInput, { flex: 1 }]}
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            if (text.length > 2) searchFood(text);
          }}
          placeholder="Rechercher un ingrédient..."
        />
        <TouchableOpacity 
          style={styles.cameraButton}
          onPress={() => router.push('/camera')}
        >
          <Ionicons name="barcode-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {searchQuery.length > 0 && (
        <ScrollView style={styles.searchResults}>
          {searchResults.map((result: any, index) => (
            <TouchableOpacity
              key={index}
              style={styles.searchItem}
              onPress={() => {
                setIngredients([...ingredients, {
                  id: result.food.foodId,
                  name: result.food.label,
                  calories: result.food.nutrients.ENERC_KCAL
                }]);
                setSearchQuery('');
                setSearchResults([]);
              }}
            >
              <Text>{result.food.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <Text style={styles.subtitle}>Ingrédients sélectionnés</Text>
      <ScrollView style={[styles.ingredientsList, !searchQuery.length && { flex: 1 }]}>
        {ingredients.map((ingredient, index) => (
          <View key={index} style={styles.ingredientItem}>
            <Text>{ingredient.name}</Text>
            <TouchableOpacity onPress={() => {
              setIngredients(ingredients.filter((_, i) => i !== index));
            }}>
              <Ionicons name="close-circle" size={24} color="red" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.saveButton} onPress={saveMeal}>
        <Text style={styles.saveButtonText}>
          {isEditing ? 'Modifier' : 'Créer'} le repas
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  nameInput: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  searchResults: {
    maxHeight: 200,
  },
  searchItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  ingredientsList: {
    flex: 1,
  },
  ingredientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  saveButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  cameraButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});