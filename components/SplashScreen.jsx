import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function SplashScreen() {
  const navigation = useNavigation();

  // Références pour l'animation
  const rotateValue = useRef(new Animated.Value(0)).current;
  const fadeValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animation de rotation
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();

    // Animation d'apparition de l'image principale après 2 secondes
    setTimeout(() => {
      Animated.timing(fadeValue, {
        toValue: 1,
        duration: 1500, // 1.5 secondes pour que l'image devienne visible
        useNativeDriver: true,
      }).start();
    }, 2000);

    // Simuler un temps de chargement, puis naviguer vers la page principale
    const timer = setTimeout(() => {
      navigation.replace("Login"); // Naviguez vers la page suivante
    }, 4000); // 4 secondes

    return () => clearTimeout(timer);
  }, [rotateValue, fadeValue, navigation]);

  const rotateInterpolation = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      {/* Image principale */}
      <Animated.Image
        source={require("../assets/PMoveLogoAvecStyleSansLogo.png")} // Chemin vers l'image principale
        style={[styles.backgroundImage, { opacity: fadeValue }]}
        resizeMode="contain"
      />

      {/* Logo tournant */}
      <Animated.Image
        source={require("../assets/PMoveLogoSANSTITRE.png")} // Chemin vers le logo
        style={[styles.logo, { transform: [{ rotate: rotateInterpolation }] }]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
  },
  backgroundImage: {
    width: 300,
    height: 300,
    position: "absolute", // Position absolue pour superposition
  },
  logo: {
    width: 300,
    height: 300,
    position: "absolute", // Superpose le logo sur l'image
  },
});