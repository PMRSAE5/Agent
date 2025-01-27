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
      <Animated.View style={{ opacity: fadeAnim, alignSelf: 'flex-start', marginTop: 20 }}>
        <Image
          source={require("../assets/PMoveLogoAvecStyle.png")}
          style={styles.logo}
        />
      </Animated.View>

      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Animated.Text style={[styles.welcomeText, { opacity: fadeAnim }]}>
          Bonjour, {agentInfo.name} {agentInfo.surname} !
        </Animated.Text>
      </TouchableOpacity>

      {/* Animation Lottie au milieu */}
      <Animated.View style={{ opacity: fadeAnim, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LottieView
          source={require("../assets/home.json")} // Chemin vers votre fichier Lottie
          autoPlay
          loop
          style={styles.lottieAnimation}
        />
      </Animated.View>

      {/* Bouton en bas */}
      <Animated.View style={{ opacity: fadeAnim, alignSelf: 'center', marginBottom: 20 }}>
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
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 16,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#EF4D20",
    marginBottom: 40,
    textAlign: "center",
    fontFamily: "Raleway_700Bold", // Appliquer la police Raleway
  },
  mainButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EF4D20",
    padding: 16,
    borderRadius: 12,
    width: "80%",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  mainButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    marginLeft: 10,
    fontFamily: "Raleway_400Regular", // Appliquer la police Raleway
  },
  icon: {
    marginRight: 10,
  },
  loadingText: {
    fontSize: 20,
    color: "#EF4D20",
    fontWeight: "bold",
    fontFamily: "Raleway_700Bold", // Appliquer la police Raleway
  },
  lottieAnimation: {
    width: 300, // Ajustez la taille selon vos besoins
    height: 300,
  },
});