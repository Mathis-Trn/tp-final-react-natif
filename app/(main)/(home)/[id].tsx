import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useMeals } from '../../../contexts/MealContext';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';

export default function MealDetail() {
  const { id } = useLocalSearchParams();
  const { meals, deleteMeal } = useMeals();
  const router = useRouter();
  const navigation = useNavigation();

  const meal = meals.find(m => m.id === id);

  useEffect(() => {
    if(!meal) return;

    navigation.setOptions({
      title: meal.name
    });
  }, [meal]);

  if (!meal) return <Text>Redirection...</Text>;

  const handleDelete = () => {
    Alert.alert(
      "Supprimer le repas",
      "Êtes-vous sûr de vouloir supprimer ce repas ?",
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        {
          text: "Supprimer",
          onPress: () => {
            deleteMeal(id);
            router.back();
          },
          style: "destructive"
        }
      ]
    );
  };

  const totals = meal.ingredients.reduce((sum, ing) => ({
    calories: sum.calories + (ing.calories || 0),
    proteins: sum.proteins + (ing.proteins || 0),
    carbs: sum.carbs + (ing.carbs || 0),
    fats: sum.fats + (ing.fats || 0)
  }), {
    calories: 0,
    proteins: 0,
    carbs: 0,
    fats: 0
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{meal.name}</Text>
        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push({
              pathname: '/add',
              params: { mealId: id }
            })}
          >
            <Ionicons name="pencil" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleDelete}
          >
            <Ionicons name="trash" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.nutritionContainer}>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionLabel}>Calories</Text>
          <Text style={styles.nutritionValue}>{Math.round(totals.calories)} kcal</Text>
        </View>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionLabel}>Protéines</Text>
          <Text style={styles.nutritionValue}>{Math.round(totals.proteins)}g</Text>
        </View>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionLabel}>Glucides</Text>
          <Text style={styles.nutritionValue}>{Math.round(totals.carbs)}g</Text>
        </View>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionLabel}>Lipides</Text>
          <Text style={styles.nutritionValue}>{Math.round(totals.fats)}g</Text>
        </View>
      </View>

      <Text style={styles.subtitle}>Ingrédients</Text>
      <ScrollView style={styles.ingredientsList}>
        {meal.ingredients.map((ingredient, index) => (
          <View key={index} style={styles.ingredientItem}>
            <Text style={styles.ingredientName}>{ingredient.name}</Text>
            <View style={styles.ingredientNutrition}>
              <Text style={styles.ingredientValue}>{Math.round(ingredient.calories)} kcal</Text>
              <Text style={styles.ingredientValue}>{Math.round(ingredient.proteins)}g</Text>
              <Text style={styles.ingredientValue}>{Math.round(ingredient.carbs)}g</Text>
              <Text style={styles.ingredientValue}>{Math.round(ingredient.fats)}g</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  calories: {
    fontSize: 20,
    color: '#666',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  ingredientsList: {
    flex: 1,
  },
  ingredientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  ingredientName: {
    fontSize: 16,
  },
  ingredientCalories: {
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    gap: 15,
  },
  actionButton: {
    padding: 5,
  },
  nutritionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionLabel: {
    fontSize: 12,
    color: '#666',
  },
  nutritionValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ingredientNutrition: {
    flexDirection: 'row',
    gap: 10,
  },
  ingredientValue: {
    color: '#666',
    fontSize: 14,
    width: 50,
    textAlign: 'right',
  }
});