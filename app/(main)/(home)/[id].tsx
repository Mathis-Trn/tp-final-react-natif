import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMeals } from '../../../contexts/MealContext';
import { Ionicons } from '@expo/vector-icons';

export default function MealDetail() {
  const { id } = useLocalSearchParams();
  const { meals } = useMeals();
  const router = useRouter();

  const meal = meals.find(m => m.id === id);

  if (!meal) return <Text>Meal not found</Text>;

  const totalCalories = meal.ingredients.reduce((sum, ing) => sum + ing.calories, 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{meal.name}</Text>
        <TouchableOpacity 
          onPress={() => router.push({
            pathname: '/(main)/add/add',
            params: { mealId: id }
          })}
        >
          <Ionicons name="pencil" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <Text style={styles.calories}>{Math.round(totalCalories)} kcal</Text>

      <Text style={styles.subtitle}>Ingrédients</Text>
      <ScrollView style={styles.ingredientsList}>
        {meal.ingredients.map((ingredient, index) => (
          <View key={index} style={styles.ingredientItem}>
            <Text style={styles.ingredientName}>{ingredient.name}</Text>
            <Text style={styles.ingredientCalories}>
              {Math.round(ingredient.calories)} kcal
            </Text>
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
});