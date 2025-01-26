import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Research from "./Research";
import ScannerQRCode from "./scannerQRCode";
import Profile from "./Profile";
import AssistanceForm from "./AssistanceForm";
import { useNavigation } from '@react-navigation/native';

import {
  useFonts,
  Raleway_100Thin,
  Raleway_200ExtraLight,
  Raleway_300Light,
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_600SemiBold,
  Raleway_700Bold,
  Raleway_800ExtraBold,
  Raleway_900Black,
} from "@expo-google-fonts/raleway";

export default function Home() {
  const [activeComponent, setActiveComponent] = React.useState(null);
  const navigation = useNavigation(); // Hook de navigation

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "Research":
        return <Research />;
      case "ScannerQRCode":
        return <ScannerQRCode />;
      default:
        return null;
    }
  };

  const [fontsLoaded] = useFonts({
    Raleway_100Thin,
    Raleway_200ExtraLight,
    Raleway_300Light,
    RalewayRegular: Raleway_400Regular,
    Raleway_500Medium,
    Raleway_600SemiBold,
    RalewayBold: Raleway_700Bold,
    RalewayExtraBold: Raleway_800ExtraBold,
    RalewayBlack: Raleway_900Black,
  });

  const handleAlert = (message, component) => {
    Alert.alert(
      "Recommandation",
      message,
      [
        {
          text: "Annuler",
          onPress: () => setActiveComponent(component),
          style: "default",
        },
        {
          text: "Continuer",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  // Si un composant est actif, afficher uniquement ce composant avec une icône pour revenir en arrière
  if (activeComponent) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setActiveComponent(null)}
        >
          <Icon name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.componentContainer}>{renderActiveComponent()}</View>
      </View>
    );
  }

  // Affichage initial avec les boutons centrés
  return (
    <View style={styles.container}>
      <View style={styles.centeredContent}>
        {/* Logo Pmove Pro */}
        <Image
          source={require("../assets/PMoveLogoAvecStyle.png")}
          style={styles.logo}
        />
        <Text style={styles.welcomeText}>Bon retour parmi nous !</Text>

        <View style={styles.buttonsContainer}>
          {/* Bouton pour accéder à la recherche de trajets */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => setActiveComponent("Research")}
          >
            <Icon name="search" size={20} color="#FFFFFF" style={styles.icon} />
            <Text style={styles.buttonText}>
              Recherche de trajets pour gérer un PMR
            </Text>
          </TouchableOpacity>
          {/* Bouton pour accéder au scanner de QR Code */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleAlert(
              "Il est recommandé de rechercher le trajet associé au PMR avant de scanner le QR Code du PMR.", setActiveComponent("ScannerQRCode"))}
          >
            <Icon name="qrcode" size={20} color="#FFFFFF" style={styles.icon} />
            <Text style={styles.buttonText}>
              Scanner le QR Code PAX du PMR
            </Text>
          </TouchableOpacity>
          {/* Bouton pour accéder au profil */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Profile")} // Redirection vers la page Profile
          >
            <Icon name="user" size={20} color="#FFFFFF" style={styles.icon} />
            <Text style={styles.buttonText}>Accéder à mon profil</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF6F1",
    padding: 16,
  },
  centeredContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 300, // Largeur de l'image
    height: 300, // Hauteur de l'image
    resizeMode: "contain", // Ajuste l'image pour qu'elle soit bien contenue
    marginBottom: -30, // Espacement sous l'image
  },
  welcomeText: {
    fontSize: 24,
    fontFamily: "RalewayBold",
    color: "#EF4D20",
    marginBottom: 32,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "column",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EF4D20",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    width: 300,
  },
  buttonText: {
    color: "#FFFFFF",
    fontFamily: "RalewayExtraBold",
    fontSize: 16,
    textAlign: "center",
    flex: 1,
  },
  icon: {
    marginRight: 10,
  },
  componentContainer: {
    flex: 1,
    marginTop: 16,
  },
  backButton: {
    position: "absolute",
    bottom: 7,
    left: 25,
    backgroundColor: "#EF4D20",
    padding: 12,
    borderRadius: 50,
    elevation: 5,
    zIndex: 9999,
  },
});