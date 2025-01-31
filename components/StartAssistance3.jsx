import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

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

export default function StartAssistance3({ navigation }) {
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

    if (!fontsLoaded) {
        return (
          <View style={styles.container}>
            <Text>Chargement en cours...</Text>
          </View>
        );
    }

    return (
        <View style={styles.container}>
          <Text style={styles.title}>Vérification d'identité</Text>
          
          <Image 
            source={require('../assets/idcard.png')} 
            style={styles.idIllustration}
            resizeMode="contain"
          />

          <Text style={styles.subtitle}>
            Avant de commencer l'accompagnement, veuillez :
          </Text>

          <View style={styles.stepsContainer}>
            <Text style={styles.stepText}>1. Scanner la carte d'identité du PMR</Text>
            <Text style={styles.stepText}>2. Prendre une photo du PMR</Text>
            <Text style={styles.stepText}>3. Vérifier la concordance des informations</Text>
          </View>

          <Text style={styles.note}>
            Ces informations sont nécessaires pour valider le début de la prise en charge et seront cryptées pour la protection des données.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("PhotoCapture")}
          >
            <Text style={styles.buttonText}>Commencer la vérification</Text>
          </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FFF6F1", // Fond légèrement orangé
      padding: 24,
    },
    title: {
      fontSize: 26,
      fontFamily: "RalewayExtraBold",
      color: "#EF4D20", // Orange vif pour le titre
      marginBottom: 24,
      textAlign: "center",
    },
    idIllustration: {
      width: 200,
      height: 130,
      marginBottom: 30,
    },
    subtitle: {
      fontSize: 18,
      fontFamily: "RalewayBold",
      color: "#555", // Texte gris foncé pour le sous-titre
      marginBottom: 20,
      textAlign: "center",
    },
    stepsContainer: {
      marginBottom: 30,
      width: '100%',
    },
    stepText: {
      fontSize: 16,
      fontFamily: "RalewayRegular",
      color: "#555", // Texte gris foncé pour les étapes
      marginBottom: 12,
      textAlign: "center",
    },
    note: {
      fontSize: 14,
      fontFamily: "RalewayRegular",
      color: "#777", // Texte gris pour la note
      textAlign: "center",
      marginBottom: 40,
      lineHeight: 20,
    },
    button: {
      backgroundColor: "#EF4D20", // Bouton orange vif
      paddingVertical: 16,
      paddingHorizontal: 40,
      borderRadius: 8,
      elevation: 2,
    },
    buttonText: {
      color: "white", // Texte blanc pour le bouton
      fontFamily: "RalewayExtraBold",
      fontSize: 16,
      letterSpacing: 0.5,
    },
});