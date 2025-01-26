import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Research from "./Research";
import ScannerQRCode from "./scannerQRCode";
import Profile from "./Profile"; // Remplacement de FiltragePAX par Profile
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const [activeComponent, setActiveComponent] = React.useState(null);
  const navigation = useNavigation();

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "Research":
        return <Research />;
      case "ScannerQRCode":
        return <ScannerQRCode />;
      case "Profile": // Remplacement ici également
        return <Profile />;
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

          {/* Bouton pour ouvrir la page Profile à la place de FiltragePAX */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => setActiveComponent("Profile")}
          >
            <Icon name="user" size={20} color="#FFFFFF" style={styles.icon} />
            <Text style={styles.buttonText}>Profil du PMR</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("AssistanceForm")}
          >
            <Icon name="edit" size={20} color="#FFFFFF" style={styles.icon} />
            <Text style={styles.buttonText}>
              Remplir le formulaire d'assistance
            </Text>
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
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
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
    fontWeight: "bold",
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
