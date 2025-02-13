import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return <Redirect href={'/'} />
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerBackVisible: false,
      }}
    >
      <Stack.Screen
        name="sign-in"
        options={{
          title: "Se connecter"
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          title: "S'inscrire"
        }}
      />
    </Stack>
  )
}