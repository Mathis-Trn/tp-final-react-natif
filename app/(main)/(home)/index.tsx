import { SignedIn, SignedOut } from '@clerk/clerk-expo';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Stack, useRouter, Redirect } from 'expo-router';

export default function Page() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      
      <SignedIn>
        <Redirect href="./home" />
      </SignedIn>
      
      <SignedOut>
        <View style={styles.authContainer}>
          <Text style={styles.title}>Bienvenue sur</Text>
          <Text style={styles.title}>Bon App'</Text>
          <Text style={styles.subtitle}>L'application de gestion de votre alimentation</Text>
          
          <View style={styles.buttonContainer}>
            <Text style={styles.subtitle}>Veuillez vous connecter ou créer un compte</Text>
            <TouchableOpacity 
              style={styles.button}
              onPress={() => router.push('/sign-in')}
            >
              <Text style={styles.buttonText}>Connexion</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, styles.secondaryButton]}
              onPress={() => router.push('/sign-up')}
            >
              <Text style={[styles.buttonText, styles.secondaryButtonText]}>
                Créer un compte
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SignedOut>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  authContainer: {
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
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: 15,
    paddingTop: 40,
  },
  button: {
    backgroundColor: '#000',
    padding: 18,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
  },
  secondaryButtonText: {
    color: '#000',
  }
});