import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";


export default function StartAssistance({ navigation, route }) {
  const reservationId = route?.params?.reservationId;
  // const navigation = useNavigation();


  if (!reservationId) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Erreur : Réservation introuvable</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Commencement de l'accompagnement</Text>
      <Text style={styles.subtitle}>
        Rendez-vous au point de départ PMR pour commencer le trajet.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ScannerQRCode", { reservationId })}
        >
        <Text style={styles.buttonText}>Vérification</Text>
      </TouchableOpacity>
    </View>
  );
}


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