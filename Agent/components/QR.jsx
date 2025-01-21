import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Composant principal QR qui affiche les informations utilisateur et scanne les QR codes
export default function QR({ navigation }) {
  // État pour stocker les informations utilisateur récupérées depuis AsyncStorage
  const [userInfo, setUserInfo] = useState(null);
  
  // État pour suivre l'autorisation d'accès à la caméra
  const [hasPermission, setHasPermission] = useState(null);
  
  // État pour savoir si un QR code a déjà été scanné
  const [scanned, setScanned] = useState(false);

  // Effet pour charger les données utilisateur depuis AsyncStorage au démarrage
  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Récupération des données utilisateur stockées localement
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          // Si les données existent, les parser et les stocker dans l'état
          setUserInfo(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Failed to load user data", error);
      }
    };

    loadUserData(); // Appeler la fonction pour charger les données
  }, []);

  // Effet pour demander la permission d'accéder à la caméra
  useEffect(() => {
    const getCameraPermission = async () => {
      // Demander l'autorisation pour la caméra
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted"); // Mettre à jour l'état selon la réponse
    };

    getCameraPermission(); // Appeler la fonction pour demander l'autorisation
  }, []);

  // Fonction appelée lorsque le scanner détecte un QR code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true); // Empêcher un nouveau scan tant que l'utilisateur n'a pas réinitialisé
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    // Vous pouvez ajouter du code ici pour traiter ou sauvegarder les données du QR code
  };

  // Si la permission de caméra n'a pas encore été donnée, afficher un message
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission...</Text>
      </View>
    );
  }

  // Si l'accès à la caméra a été refusé, afficher un message et un bouton pour réessayer
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
        <Button
          title="Allow Camera"
          onPress={() => BarCodeScanner.requestPermissionsAsync()} // Permet à l'utilisateur de redemander l'autorisation
        />
      </View>
    );
  }

  // Interface principale de l'application
  return (
    <View style={styles.container}>
      <Text style={styles.title}>QR Code Scanner</Text>
      {scanned ? (
        // Afficher un bouton pour réactiver le scanner après un scan
        <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />
      ) : (
        // Scanner de QR codes qui occupe tout l'écran
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} // Si scanné, désactiver temporairement le scanner
          style={StyleSheet.absoluteFillObject} // Le scanner occupe tout l'espace
        />
      )}
      {userInfo && (
        // Afficher les informations utilisateur si elles sont disponibles
        <View style={styles.infoContainer}>
          <Text>Name: {userInfo.name}</Text>
          <Text>Password: {userInfo.password}</Text>
          <Text>Agent ID: {userInfo.agentId}</Text>
        </View>
      )}
    </View>
  );
}

// Styles pour le composant
const styles = StyleSheet.create({
  container: {
    flex: 1, // Occupe tout l'espace disponible
    justifyContent: "center", // Centrer verticalement
    alignItems: "center", // Centrer horizontalement
    padding: 16, // Ajouter un peu d'espace autour
  },
  title: {
    fontSize: 24, // Taille de police du titre
    marginBottom: 24, // Espacement en dessous du titre
  },
  infoContainer: {
    marginTop: 16, // Ajouter un espacement au-dessus des informations utilisateur
    alignItems: "center", // Centrer horizontalement les informations
  },
});

