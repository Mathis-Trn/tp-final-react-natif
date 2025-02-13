import { useUser } from '@clerk/clerk-expo';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useMeals } from '../../../contexts/MealContext';

export default function Home() {
  const { meals } = useMeals();
  const { user } = useUser();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes menus</Text>
      
      <ScrollView style={styles.mealsList}>
        {meals.map(meal => {
          const totalCalories = meal.ingredients.reduce(
            (sum, ing) => sum + ing.calories, 0
          );
          
          return (
            <TouchableOpacity
              key={meal.id}
              style={styles.mealItem}
              onPress={() => router.push(`/(main)/(home)/${meal.id}`)}
            >
              <Text style={styles.mealName}>{meal.name}</Text>
              <Text style={styles.mealCalories}>
                {Math.round(totalCalories)} kcal
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <TouchableOpacity 
        style={styles.fab}
        onPress={() => router.push('/(main)/add/add')}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  emailText: {
    fontSize: 18,
    color: '#666',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#000',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  mealsList: {
    flex: 1,
    padding: 20,
  },
  mealItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  mealName: {
    fontSize: 16,
    fontWeight: '500',
  },
  mealCalories: {
    color: '#666',
  },
});