import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";
import { useFonts, Raleway_400Regular, Raleway_700Bold } from "@expo-google-fonts/raleway";

export default function Home() {
  const navigation = useNavigation();
  const [agentInfo, setAgentInfo] = useState({ name: "", surname: "" });
  const [isLoading, setIsLoading] = useState(true);
  const fadeAnim = useState(new Animated.Value(0))[0];

  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
    Raleway_700Bold,
  });

  // Animation au chargement de la page
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  // Charger les informations de l'agent depuis AsyncStorage
  useEffect(() => {
    const loadAgentInfo = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        console.log("Données récupérées depuis AsyncStorage :", storedUser);

        if (storedUser) {
          const { name, surname } = JSON.parse(storedUser);
          setAgentInfo({ name, surname });
        } else {
          console.warn("Aucune information d'agent trouvée.");
        }
      } catch (error) {
        console.error("Erreur lors du chargement des informations de l'agent :", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAgentInfo();
  }, []);

  if (!fontsLoaded || isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Logo en haut */}
      <Animated.View style={{ opacity: fadeAnim, alignSelf: 'center', marginTop: 10 }}>
        <Image
          source={require("../assets/PMoveLogoAvecStyle2.png")}
          style={styles.logo}
        />
      </Animated.View>

      {/* Message de bienvenue */}
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Animated.Text style={[styles.welcomeText, { opacity: fadeAnim }]}>
          Bonjour, {agentInfo.name} {agentInfo.surname} !
        </Animated.Text>
      </TouchableOpacity>

      {/* Animation Lottie au milieu */}
      <Animated.View style={{ opacity: fadeAnim, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
        <LottieView
          source={require("../assets/home.json")} // Chemin vers votre fichier Lottie
          autoPlay
          loop
          style={styles.lottieAnimation}
        />
      </Animated.View>

      {/* Bouton en bas, juste en dessous de l'animation Lottie */}
      <Animated.View style={{ opacity: fadeAnim, alignSelf: 'center', marginTop: 10 }}>
        <TouchableOpacity
          style={styles.mainButton}
          onPress={() => navigation.navigate("Research")}
        >
          <Icon name="search" size={24} color="#FFFFFF" style={styles.icon} />
          <Text style={styles.mainButtonText}>Trouver un PMR à proximité</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF6F1",
    justifyContent: "flex-start", // Aligner le contenu en haut
    alignItems: "center", // Centrer horizontalement
    padding: 16,
    paddingBottom: 100, // Ajouter un padding en bas pour éviter que la NavBar ne cache le contenu
  },
  logo: {
    width: 200, // Taille d'origine du logo
    height: 200,
    resizeMode: "contain",
    marginBottom: 5, // Espacement réduit après le logo
  },
  welcomeText: {
    fontSize: 24, // Taille d'origine du texte
    fontWeight: "bold",
    color: "#EF4D20",
    marginBottom: 5, // Espacement réduit après le texte
    textAlign: "center",
    fontFamily: "Raleway_700Bold",
  },
  mainButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EF4D20",
    padding: 16, // Padding d'origine
    borderRadius: 12,
    width: 300, // Largeur fixe pour le bouton
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  mainButtonText: {
    color: "#FFFFFF",
    fontSize: 18, // Taille d'origine du texte
    marginLeft: 10,
    fontFamily: "Raleway_400Regular",
  },
  icon: {
    marginRight: 10,
  },
  loadingText: {
    fontSize: 20,
    color: "#EF4D20",
    fontWeight: "bold",
    fontFamily: "Raleway_700Bold",
  },
  lottieAnimation: {
    width: 350, // Taille légèrement réduite de l'animation
    height: 350,
  },
});