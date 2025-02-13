import * as React from 'react'
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { useRouter, Link } from 'expo-router'

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')
  const [error, setError] = React.useState('')

  const onSignUpPress = async () => {
    if (!isLoaded) return
    setError('')

    try {
      await signUp.create({
        emailAddress,
        password,
      })
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setPendingVerification(true)
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'L\'inscription a échouée')
    }
  }

  const onVerifyPress = async () => {
    if (!isLoaded) return
    setError('')

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {
        setError('Vérification incomplète. Veuillez réessayer.')
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'La vérification a échouée')
    }
  }

  if (pendingVerification) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Verifiez votre email</Text>
        
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TextInput
          style={styles.input}
          value={code}
          placeholder="Entrez le code de vérification"
          onChangeText={setCode}
        />
        
        <TouchableOpacity 
          style={styles.button}
          onPress={onVerifyPress}
        >
          <Text style={styles.buttonText}>Vérifier l'email</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bonne inscription'</Text>
      
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Adresse email"
        onChangeText={setEmailAddress}
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder="Mot de passe"
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      
      <TouchableOpacity 
        style={styles.button}
        onPress={onSignUpPress}
      >
        <Text style={styles.buttonText}>S'incrire</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Vous avez déja un compte ? </Text>
        <Link href="/sign-in">
          <Text style={styles.link}>Connexion</Text>
        </Link>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#666',
  },
  link: {
    color: '#000',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 15,
    textAlign: 'center',
  },
})