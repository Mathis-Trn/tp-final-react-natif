import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { BarcodeScanningResult } from 'expo-camera/build/Camera.types';
import { useRouter } from 'expo-router';
import { useMeals } from '../../../contexts/MealContext';
import { useRef } from 'react';

export default function Camera() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const router = useRouter();
  const { setScannedProduct } = useMeals();
  const scannedRef = useRef(false);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Nous autorisez vous à utiliser votre caméra ?</Text>
        <Button onPress={requestPermission} title="Modifier la permission" />
      </View>
    );
  }

   const handleBarCodeScanned = async ({ type, data }: BarcodeScanningResult) => {
    if (scannedRef.current) return;
    scannedRef.current = true;

    try {
      const APP_ID = process.env.EXPO_PUBLIC_EDAMAM_APP_ID;
      const APP_KEY = process.env.EXPO_PUBLIC_EDAMAM_APP_KEY;
      
      const response = await fetch(
        `https://api.edamam.com/api/food-database/v2/parser?app_id=${APP_ID}&app_key=${APP_KEY}&upc=${data}`
      );
      const productData = await response.json();
  
      if (productData.hints && productData.hints.length > 0) {
        const product = productData.hints[0].food;
        setScannedProduct({
          id: product.foodId,
          name: product.label,
          calories: product.nutrients.ENERC_KCAL
        });
        router.back()
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      scannedRef.current = false;
    }
  };

  return (
    <View style={styles.container}>
      <CameraView 
        style={styles.camera}
        barcodeScannerSettings={{
          barcodeTypes: ['ean13'],
        }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        <View style={styles.overlay}>
          <View style={styles.scanArea} />
          <Text style={styles.instructions}>Scannez le code-barres du produit</Text>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: 250,
    height: 100,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: 'transparent',
  },
  instructions: {
    color: '#fff',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
});