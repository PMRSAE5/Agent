import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function Home({ navigation }) {
  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Rechercher"
        keyboardType="default"
        autoCapitalize="none"
      />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderColor: "black",
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
  },
  formContainer: {
    width: "100%",
    marginTop: "20%",
  },
});