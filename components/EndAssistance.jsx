import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

const EndAssistance = () => {
    const navigation = useNavigation();
    useEffect(() => {
      const timer = setTimeout(() => {
        navigation.navigate("Home"); // Remplacez "Accueil" par le nom de votre page d'accueil
      }, 5000);
  
      return () => clearTimeout(timer); // Nettoyage du timer
    }, [navigation]);
  
    return (
      <View style={styles.container}>
        <LottieView
          source={require("../assets/profile_agent_icon.json")}
          autoPlay
          loop={false}
          style={{ width: 300, height: 300 }}
        />
        <Text style={styles.message}>L'accompagnement du PMR a été réalisé avec succès !</Text>
        <Text style={styles.subMessage}>
          Vous allez être redirigé vers l'accueil dans quelques secondes...
        </Text>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      backgroundColor: "#f9f9f9",
    },
    message: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 20,
    },
    subMessage: {
      fontSize: 16,
      textAlign: "center",
      color: "#555",
    },
  });

export default EndAssistance;