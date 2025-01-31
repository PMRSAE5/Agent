import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated, Easing } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";

export default function StartAssistance({ navigation, route }) {
  const reservationId = route?.params?.reservationId;

  // Animation pour le bouton
  const buttonScale = new Animated.Value(1);

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();
  };

  if (!reservationId) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Erreur : Réservation introuvable</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Animation Lottie */}
      <LottieView
        source={require("../assets/walking2.json")} // Remplacez par votre animation
        autoPlay
        loop
        style={styles.animation}
      />

      <Text style={styles.title}>Commencement de l'accompagnement</Text>
      <Text style={styles.subtitle}>
        Rendez-vous au point de départ PMR pour commencer le trajet.
      </Text>

      {/* Bouton animé */}
      <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            animateButton();
            navigation.navigate("ScannerQRCode", { reservationId });
          }}
        >
          <Text style={styles.buttonText}>Vérification</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF6F1",
    padding: 24,
  },
  animation: {
    width: 200,
    height: 200,
    marginBottom: 20,
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
    lineHeight: 24,
  },
  button: {
    backgroundColor: "#EF4D20",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 8,
    elevation: 2,
  },
  buttonText: {
    color: "#FFFFFF",
    fontFamily: "RalewayExtraBold",
    fontSize: 16,
    letterSpacing: 0.5,
  },
});