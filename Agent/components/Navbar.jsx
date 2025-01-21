import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

export default function NavBar() {
  const navigation = useNavigation();
  return (
    <View style={styles.navbar}>
      {/* Home */}
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Icon name="home" size={24} color="#FFFFFF" />
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>

      {/* Research */}
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("Research")}
      >
        <Icon name="search" size={24} color="#FFFFFF" />
        <Text style={styles.navText}>Rechercher</Text>
      </TouchableOpacity>

      {/* QR */}
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("QR")}
      >
        <Icon name="qrcode" size={24} color="#FFFFFF" />
        <Text style={styles.navText}>QR</Text>
      </TouchableOpacity>

      {/* Profile */}
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("Profile")}
      >
        <Icon name="user" size={24} color="#FFFFFF" />
        <Text style={styles.navText}>Profil</Text>
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Icon name="sign-out" size={24} color="#FFFFFF" />
        <Text style={styles.navText}>Déconnexion</Text>
      </TouchableOpacity>

      {/* Settings */}
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("Settings")}
      >
        <Icon name="cogs" size={24} color="#FFFFFF" />
        <Text style={styles.navText}>Paramètres</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EF4D20", // Couleur principale de l'application Agent
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  navButton: {
    alignItems: "center",
    flex: 1,
  },
  navText: {
    marginTop: 5,
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
});