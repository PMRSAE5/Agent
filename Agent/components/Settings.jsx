import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Settings() {

  return (
    <View style={styles.container}>
        <Text style={styles.welcomeText}>
          Paramètres de l'application Agent
        </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#EF4D20",
  },
});