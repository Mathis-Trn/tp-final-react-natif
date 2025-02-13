import { useUser } from '@clerk/clerk-expo';
import { Text, View, StyleSheet } from 'react-native';

export default function Home() {
  const { user } = useUser();

  return (
    <View style={styles.welcomeContainer}>
      <Text style={styles.title}>Bienvenue</Text>
      <Text style={styles.emailText}>{user?.emailAddresses[0].emailAddress}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
  }
});