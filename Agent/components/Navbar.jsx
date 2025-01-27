import React, { useState, useRef } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Animated, Easing } from "react-native";
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
  const [activeIndex, setActiveIndex] = useState(0);

  const animationRefs = [
    {
      scaleIcon: useRef(new Animated.Value(1)).current,
      translateYIcon: useRef(new Animated.Value(0)).current,
    },
    {
      scaleIcon: useRef(new Animated.Value(1)).current,
      translateYIcon: useRef(new Animated.Value(0)).current,
    },
  ];

  const handleNavigation = (index, route) => {
    setActiveIndex(index);

    // Animation des boutons
    animationRefs.forEach((ref, i) => {
      const isActive = i === index;

      Animated.timing(ref.scaleIcon, {
        toValue: isActive ? 1.5 : 1,
        duration: 400,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();

      Animated.timing(ref.translateYIcon, {
        toValue: isActive ? -5 : 0, // Ajusté pour rester dans les limites
        duration: 400,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
    });

    navigation.navigate(route);
  };

  // Charger les polices
  useFonts({
    RalewayRegular: Raleway_400Regular,
    RalewayBold: Raleway_700Bold,
    RalewayExtraBold: Raleway_800ExtraBold,
    Raleway_600SemiBold: Raleway_600SemiBold,
    RalewayBlack: Raleway_900Black,
  });

  return (
    <View style={styles.navbarContainer}>
      {/* Bouton Home */}
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => handleNavigation(0, "Home")}
      >
        <Animated.View
          style={{
            transform: [
              { scale: animationRefs[0].scaleIcon },
              { translateY: animationRefs[0].translateYIcon },
            ],
          }}
        >
          <Icon
            name="home"
            size={24}
            color={activeIndex === 0 ? "#FFFFFF" : "#FFD6C1"}
          />
        </Animated.View>
        <Text style={[styles.navText, activeIndex === 0 && styles.activeText]}>
          Accueil
        </Text>
      </TouchableOpacity>

      {/* Bouton Profile */}
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => handleNavigation(1, "Profile")}
      >
        <Animated.View
          style={{
            transform: [
              { scale: animationRefs[1].scaleIcon },
              { translateY: animationRefs[1].translateYIcon },
            ],
          }}
        >
          <Icon
            name="user"
            size={24}
            color={activeIndex === 1 ? "#FFFFFF" : "#FFD6C1"}
          />
        </Animated.View>
        <Text style={[styles.navText, activeIndex === 1 && styles.activeText]}>
          Profil
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#EF4D20", // Couleur principale
    paddingVertical: 15, // Augmentation de la hauteur
    paddingHorizontal: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  navButton: {
    alignItems: "center",
    flex: 1,
  },
  navText: {
    fontFamily: "RalewayRegular",
    marginTop: 5,
    color: "#FFD6C1",
    fontSize: 12,
  },
  activeText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});