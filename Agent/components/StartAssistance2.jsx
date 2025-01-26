import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

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

export default function StartAssistance2({ navigation, route }) {
    const qrData = route?.params?.qrData;

    if (!qrData) {
        return (
          <View style={styles.container}>
            <Text style={styles.title}>Erreur : Réservation et données du qr code introuvable !</Text>
          </View>
        );
      }

      // Charger la police Raleway PMove
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

      // Si les polices ne sont pas encore chargées, afficher un écran de chargement
      if (!fontsLoaded) {
        return (
          <View style={styles.container}>
            <Text>Chargement des polices...</Text>
          </View>
        );
      }

    return (
        <View style={styles.container}>
          <Text style={styles.title}>Passage au scan du QR Code Bagage</Text>
          <Text style={styles.subtitle}>
            Demandez maintenant au PMR de vous montrer son ou ses bagages ainsi que son ou leurs qr code dédiés.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("ScannerQRCodeBagage")}
            >
            <Text style={styles.buttonText}>Vérification</Text>
          </TouchableOpacity>
        </View>
      );    
}

// Styles
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FFF6F1",
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontFamily: "RalewayBold",
      color: "#EF4D20",
      marginBottom: 16,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 18,
      fontFamily: "RalewayRegular",
      color: "#555",
      textAlign: "center",
      marginBottom: 32,
    },
    button: {
      backgroundColor: "#EF4D20",
      padding: 15,
      borderRadius: 8,
      width: "60%",
      alignItems: "center",
    },
    buttonText: {
      color: "#FFFFFF",
      fontFamily: "RalewayExtraBold",
      fontSize: 16,
    },
  });