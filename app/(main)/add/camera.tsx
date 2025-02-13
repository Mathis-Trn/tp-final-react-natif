// import React, { useState, useEffect } from 'react';
// import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
// import { Camera } from 'expo-camera';
// import { BarCodeScanner } from 'expo-barcode-scanner';
// import { useRouter } from 'expo-router';

// export default function CameraScreen() {
//   const [hasPermission, setHasPermission] = useState<boolean | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

//   const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
//     // Handle the scanned barcode data
//     console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
//     router.back();
//   };

//   if (hasPermission === null) {
//     return <View />;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <Camera
//         style={styles.camera}
//         type={Camera.Constants.Type.back}
//         barCodeScannerSettings={{
//           barCodeTypes: [BarCodeScanner.Constants.BarCodeType.ean13],
//         }}
//         onBarCodeScanned={handleBarCodeScanned}
//       >
//         <View style={styles.overlay}>
//           <View style={styles.scanArea} />
//         </View>
//       </Camera>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   camera: {
//     flex: 1,
//   },
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   scanArea: {
//     width: 200,
//     height: 200,
//     borderWidth: 2,
//     borderColor: '#fff',
//     backgroundColor: 'transparent',
//   },
// });