import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Research from "./Research";
import ScannerQRCode from "./scannerQRCode";
import FiltragePAX from "./FiltragePAX";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const [activeComponent, setActiveComponent] = React.useState(null);
  const navigation = useNavigation()

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "Research":
        return <Research />;
      case "ScannerQRCode":
        return <ScannerQRCode />;
      case "FiltragePAX":
        return <FiltragePAX />;
      default:
        return null;
    }
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
          <TouchableOpacity
            style={styles.button}
            onPress={() => setActiveComponent("Research")}
          >
            <Icon name="search" size={20} color="#FFFFFF" style={styles.icon} />
            <Text style={styles.buttonText}>
              Recherche de trajets pour gérer un PMR
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setActiveComponent("ScannerQRCode")}
          >
            <Icon name="qrcode" size={20} color="#FFFFFF" style={styles.icon} />
            <Text style={styles.buttonText}>
              Scanner le QR Code PAX du PMR
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setActiveComponent("FiltragePAX")}
          >
            <Icon
              name="filter"
              size={20}
              color="#FFFFFF"
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Filtrage PAX du PMR</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("AssistanceForm")}
          >
            <Icon name="edit" size={20} color="#FFFFFF" style={styles.icon} />
            <Text style={styles.buttonText}>Remplir le formulaire d'assistance</Text>
          </TouchableOpacity>
          {/* Bouton pour tester la page PhotoCapture */}
          <TouchableOpacity
  style={styles.button}
  onPress={() => navigation.navigate("PhotoCapture")}
>
  <Icon name="camera" size={20} color="#FFFFFF" style={styles.icon} />
  <Text style={styles.buttonText}>Tester la capture de photo</Text>
</TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF6F1",
    padding: 16,
  },
  centeredContent: {
    flex: 1,
    justifyContent: "center", // Centrer verticalement
    alignItems: "center", // Centrer horizontalement
  },
  logo: {
    width: 200, // Largeur de l'image
    height: 200, // Hauteur de l'image
    resizeMode: "contain", // Ajuste l'image pour qu'elle soit bien contenue
    marginBottom: 10, // Espacement sous l'image
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#EF4D20",
    marginBottom: 32, // Espacement plus grand entre le texte et les boutons
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "column",
  },
  button: {
    flexDirection: "row", // Affiche l'icône et le texte côte à côte
    alignItems: "center",
    backgroundColor: "#EF4D20",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16, // Espacement vertical entre les boutons
    width: 300, // Largeur des boutons
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    flex: 1, // Pour centrer le texte dans le bouton
  },
  icon: {
    marginRight: 10, // Espacement entre l'icône et le texte
  },
  componentContainer: {
    flex: 1,
    marginTop: 16,
  },
  backButton: {
    position: "absolute",
    bottom: 7, // Déplace le bouton vers le haut
    left: 25, // Déplace le bouton vers la gauche
    backgroundColor: "#EF4D20",
    padding: 12,
    borderRadius: 50,
    elevation: 5,
    zIndex: 9999,
  },
});