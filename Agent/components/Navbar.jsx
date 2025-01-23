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

      {/* Profile */}
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("Profile")}
      >
        <Icon name="user" size={24} color="#FFFFFF" />
        <Text style={styles.navText}>Profile</Text>
      </TouchableOpacity>

      {/* Settings */}
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("Settings")}
      >
        <Icon name="cogs" size={24} color="#FFFFFF" />
        <Text style={styles.navText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EF4D20", // principal color of Agent application 
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