import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
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

export default function NavBar() {
  const navigation = useNavigation();

  // Charger la police Raleway PMove
  const [fontsLoaded] = useFonts({
    RalewayRegular: Raleway_400Regular,
    RalewayBold: Raleway_700Bold,
    RalewayExtraBold: Raleway_800ExtraBold,
    RalewayBlack: Raleway_900Black,
  });

  if (!fontsLoaded) {
    return null; // ou un indicateur de chargement
  }

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
    fontFamily: "RalewayRegular",
    marginTop: 5,
    color: "#FFFFFF",
    fontSize: 12,
  },
});