import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function StartAssistance2({ navigation, route }) {
    const reservationId = route?.params?.reservationId;
    const qrData = route?.params?.qrData;

    if (!reservationId && !qrData) {
        return (
          <View style={styles.container}>
            <Text style={styles.title}>Erreur : Réservation et données du qr code introuvable !</Text>
          </View>
        );
      }

    return (
        <View style={styles.container}>
          <Text style={styles.title}>Passage au scan du QR Code</Text>
          <Text style={styles.subtitle}>
            Demandez maintenant au PMR de vous montrer son ou ses baggages ainsi que son ou leurs qr code dédiés.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("ScannerQRCodeBaggage", { reservationId })}
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
      fontWeight: "bold",
      color: "#EF4D20",
      marginBottom: 16,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 18,
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
      fontWeight: "bold",
      fontSize: 16,
    },
  });