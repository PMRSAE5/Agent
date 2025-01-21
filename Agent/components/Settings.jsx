import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";

export default function Settings({ navigation }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState("fr");

  // Gestion du mode clair/sombre
  const toggleDarkMode = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    await AsyncStorage.setItem("darkMode", JSON.stringify(newMode));
  };

  // Gestion de la taille de la police
  const handleFontSizeChange = async (value) => {
    setFontSize(value);
    await AsyncStorage.setItem("fontSize", JSON.stringify(value));
  };

  // Gestion des notifications
  const toggleNotifications = async () => {
    const newStatus = !notificationsEnabled;
    setNotificationsEnabled(newStatus);
    await AsyncStorage.setItem("notificationsEnabled", JSON.stringify(newStatus));
  };

  // Gestion de la langue
  const handleLanguageChange = async (lang) => {
    setLanguage(lang);
    await AsyncStorage.setItem("language", lang);
  };

  // Charger les paramètres stockés
  useEffect(() => {
    const loadSettings = async () => {
      const storedDarkMode = await AsyncStorage.getItem("darkMode");
      const storedFontSize = await AsyncStorage.getItem("fontSize");
      const storedNotifications = await AsyncStorage.getItem("notificationsEnabled");
      const storedLanguage = await AsyncStorage.getItem("language");

      if (storedDarkMode !== null) setIsDarkMode(JSON.parse(storedDarkMode));
      if (storedFontSize !== null) setFontSize(JSON.parse(storedFontSize));
      if (storedNotifications !== null) setNotificationsEnabled(JSON.parse(storedNotifications));
      if (storedLanguage !== null) setLanguage(storedLanguage);
    };
    loadSettings();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? "#1E1E1E" : "#FFFFFF" }]}>
      <Text style={[styles.welcomeText, { color: isDarkMode ? "#FFFFFF" : "#EF4D20", fontSize }]}>
        Paramètres de l'application Agent
      </Text>

      {/* Mode clair/sombre */}
      <View style={styles.settingRow}>
        <Text style={[styles.label, { color: isDarkMode ? "#FFFFFF" : "#000000" }]}>Mode sombre</Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          trackColor={{ false: "#D9D9D9", true: "#EF4D20" }}
          thumbColor={isDarkMode ? "#FFFFFF" : "#EF4D20"}
        />
      </View>

      {/* Taille de la police */}
      <View style={styles.settingRow}>
        <Text style={[styles.label, { color: isDarkMode ? "#FFFFFF" : "#000000" }]}>Taille de la police</Text>
        <Slider
          style={styles.slider}
          minimumValue={12}
          maximumValue={24}
          step={1}
          value={fontSize}
          onValueChange={handleFontSizeChange}
          minimumTrackTintColor="#EF4D20"
          maximumTrackTintColor="#D9D9D9"
          thumbTintColor="#EF4D20"
        />
        <Text style={[styles.fontSizeValue, { color: isDarkMode ? "#FFFFFF" : "#000000" }]}>{fontSize}px</Text>
      </View>

      {/* Notifications */}
      <View style={styles.settingRow}>
        <Text style={[styles.label, { color: isDarkMode ? "#FFFFFF" : "#000000" }]}>Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
          trackColor={{ false: "#D9D9D9", true: "#EF4D20" }}
          thumbColor={notificationsEnabled ? "#FFFFFF" : "#EF4D20"}
        />
      </View>

      {/* Langue */}
      <View style={styles.settingRow}>
        <Text style={[styles.label, { color: isDarkMode ? "#FFFFFF" : "#000000" }]}>Langue</Text>
        <Picker
          selectedValue={language}
          style={styles.picker}
          onValueChange={(itemValue) => handleLanguageChange(itemValue)}
        >
          <Picker.Item label="Français" value="fr" />
          <Picker.Item label="Anglais" value="en" />
          <Picker.Item label="Espagnol" value="es" />
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
  },
  slider: {
    width: 200,
  },
  fontSizeValue: {
    fontSize: 16,
  },
  picker: {
    width: 150,
  },
});