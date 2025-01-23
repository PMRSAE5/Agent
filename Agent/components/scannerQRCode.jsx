import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Camera, CameraView } from 'expo-camera';

const ScannerQRCode = ({ navigation }) => {
  // État pour vérifier la permission de la caméra et si un QR Code a été scanné
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  // Demander la permission d'utiliser la caméra
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Gestion du QR Code scanné
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log('QR Code scanné:', data);
    // Tu peux naviguer vers une autre page ou effectuer une autre action
    navigation.navigate('NextPage', { qrData: data });
  };

  // Si la permission de la caméra est en attente
  if (hasPermission === null) {
    return <Text>Demande de permission...</Text>;
  }

  // Si la permission est refusée
  if (hasPermission === false) {
    return <Text>Permission de la caméra refusée</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.topText}>Scanner un QR Code</Text>
      <CameraView
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject} // Pleine taille de l'écran
      />
       {scanned && (
        <TouchableOpacity style={styles.scanButton} onPress={() => setScanned(false)}>
          <Text style={styles.scanButtonText}>Scanner à nouveau</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  topText: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 16,
    color: "#EF4D20",
    textAlign: "center",
    marginBottom: 20,
  },
  scanButton: {
    position: "absolute",
    bottom: 50,
    backgroundColor: "#EF4D20",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  scanButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ScannerQRCode;