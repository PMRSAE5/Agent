import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Home() {

  return (
    <View style={styles.container}>
        <Text style={styles.welcomeText}>
          Bon retour parmi nous !
        </Text>
        {/*<Text style={styles.errorText}>Utilisateur non trouvé.</Text>*/}
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
  //errorText: {
    //fontSize: 20,
    //color: "red",
  //},
});