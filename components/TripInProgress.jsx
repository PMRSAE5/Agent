import React from "react";
import { View, Text, StyleSheet, ActivityIndicator, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";

// Obtenir les dimensions de l'écran
const { width } = Dimensions.get("window");

const TripInProgress = ({ navigation }) => {
  // Simuler un délai avant la redirection vers le formulaire d'assistance
  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("AssistanceForm"); // Rediriger vers le formulaire d'assistance
    }, 5000); // 5 secondes de délai

    return () => clearTimeout(timer); // Nettoyer le timer
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trajet en cours</Text>
      <Text style={styles.subtitle}>
        Vous accompagnez actuellement le PMR vers le point demandé.
      </Text>

      {/* Indicateur de chargement stylisé */}
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#EF4D20" />
        <Text style={styles.loadingText}>En route...</Text>
      </View>

      {/* Animation Lottie */}
      <LottieView
        source={require("../assets/wheelchair.json")} // Remplacez par votre fichier JSON Lottie
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF6F1",
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontFamily: "RalewayExtraBold",
    color: "#EF4D20",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontFamily: "RalewayRegular",
    color: "#4A5568",
    textAlign: "center",
    marginBottom: 40,
  },
  loadingContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  loadingText: {
    fontSize: 16,
    fontFamily: "RalewayRegular",
    color: "#EF4D20",
    marginTop: 10,
  },
  animation: {
    width: width, // Largeur de l'écran
    height: width, // Même hauteur pour un carré
  },
});

export default TripInProgress;
