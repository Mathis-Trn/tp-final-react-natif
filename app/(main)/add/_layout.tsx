import { Stack } from 'expo-router/stack'

export default function AddLayout() {
  return <Stack 
    screenOptions={{
      headerShown: true,
      headerBackVisible: true,
    }}
  >
    <Stack.Screen
        name="add"
        options={{
          title: "Ajouter un aliment"
        }}
      />
    </Stack>
}