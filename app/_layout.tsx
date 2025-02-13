import { tokenCache } from '../cache'
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'
import { Slot } from 'expo-router'
import { SafeAreaView } from 'react-native'
import { MealProvider } from '../contexts/MealContext';

export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

  if (!publishableKey) {
    throw new Error('Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env')
  }

  return (
    <SafeAreaView style={{ flex: 1}}>
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <ClerkLoaded>
          <MealProvider>
            <Slot />
          </MealProvider>
        </ClerkLoaded>
      </ClerkProvider>
    </SafeAreaView>
  )
}