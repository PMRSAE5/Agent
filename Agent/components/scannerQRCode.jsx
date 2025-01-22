import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Camera } from 'expo-camera';

const scannerQRCode = ({ navigation }) => {
  // État pour vérifier la permission de la caméra et si un QR Code a été scanné
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  // Demander la permission d'utiliser la caméra
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
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
      <Camera
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject} // Pleine taille de l'écran
      />
      {scanned && (
        <Button title={'Scanner à nouveau'} onPress={() => setScanned(false)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  topText: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 16,
    color: "#EF4D20",
  },
});

export default scannerQRCode;