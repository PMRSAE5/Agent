import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const StartAssistance4 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Démarrons pour de bon le trajet !</Text>

      <Image
        source={require("../assets/start-journey.png")} // Remplacez par votre image
        style={styles.illustration}
        resizeMode="contain"
      />

      <Text style={styles.subtitle}>
        Vous êtes prêt à accompagner le PMR vers son point de destination.
      </Text>
      <Text style={styles.note}>
        Assurez-vous que le PMR est confortablement installé et que tous les bagages sont sécurisés.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("TripInProgress")} // Rediriger vers la page "Trajet en cours"
      >
        <Text style={styles.buttonText}>Commencer le trajet</Text>
      </TouchableOpacity>
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
    marginBottom: 24,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontFamily: "RalewayRegular",
    color: "#4A5568",
    textAlign: "center",
    marginBottom: 16,
  },
  note: {
    fontSize: 14,
    fontFamily: "RalewayRegular",
    color: "#718096",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 20,
  },
  illustration: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#EF4D20",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 8,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    fontFamily: "RalewayExtraBold",
    fontSize: 16,
    letterSpacing: 0.5,
  },
});

export default StartAssistance4;