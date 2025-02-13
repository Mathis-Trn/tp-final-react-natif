import { Stack } from 'expo-router/stack'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

export default function Layout() {
  const router = useRouter()

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackVisible: false
      }}
    >
      <Stack.Screen
        name="home"
        options={{
          title: "Mes anciens menu",
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerLeft: () => (
            <TouchableOpacity 
              onPress={() => router.back()}
              style={{ marginLeft: 10 }}
            >
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          )
        }}
      />
      <Stack.Screen
        name="add"
        options={{
          title: "Ajouter un menu",
          headerLeft: () => (
            <TouchableOpacity 
              onPress={() => router.back()}
              style={{ marginLeft: 10 }}
            >
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          )
        }}
      />
      <Stack.Screen
        name="camera"
        options={{
          title: "Scanner un code-barres",
          headerLeft: () => (
            <TouchableOpacity 
              onPress={() => router.back()}
              style={{ marginLeft: 10 }}
            >
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          )
        }}
      />
    </Stack> 
  )
}