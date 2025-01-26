import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Switch,
  Modal,
} from "react-native";
import Slider from "@react-native-community/slider"; // Import Slider
import FeatherIcon from "react-native-vector-icons/Feather";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
  const [form, setForm] = useState({
    darkMode: false,
    emailNotifications: true,
    pushNotifications: false,
  });
  const [fontSize, setFontSize] = useState(16); // État pour la taille de police
  const [userInfo, setUserInfo] = useState({
    name: "",
    surname: "",
    agentId: "",
    affiliation: "", // Nouvelle clé pour l'affiliation
  });

  const navigation = useNavigation();

  // Charger les informations utilisateur et la taille de police
  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        const storedFontSize = await AsyncStorage.getItem("fontSize");
        if (user) {
          const { name, surname, agentId, affiliation } = JSON.parse(user);
          setUserInfo({ name, surname, agentId, affiliation });
        }
        if (storedFontSize) setFontSize(JSON.parse(storedFontSize));
      } catch (error) {
        console.error(
          "Erreur lors du chargement des informations utilisateur ou de la taille de police :",
          error
        );
      }
    };

    loadUserInfo();
  }, []);

  const handleFontSizeChange = async (value) => {
    setFontSize(value);
    await AsyncStorage.setItem("fontSize", JSON.stringify(value));
  };

  const handleLogout = async () => {
    // Action de déconnexion
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("agentId");
    console.log("Déconnexion réussie");
    navigation.replace("Login"); // Redirection vers la page Connexion
  };

  return (
    <SafeAreaView
      style={[
        { flex: 1 },
        form.darkMode ? styles.darkContainer : styles.lightContainer,
      ]}
    >
      <View style={styles.profile}>
        {/* Animation JSON pour l'avatar */}
        <LottieView
          source={require("../assets/icon_user_agent.json")} // Chemin vers l'animation JSON
          autoPlay
          loop
          style={styles.animation}
        />
        <View>
          <Text
            style={[
              styles.profileName,
              { fontSize }, // Appliquer la taille de police personnalisée
            ]}
          >
            {userInfo.name} {userInfo.surname}
          </Text>
          <Text
            style={[
              styles.profileId,
              { fontSize: fontSize - 2 }, // Taille de police légèrement réduite pour l'ID
            ]}
          >
            Agent ID: {userInfo.agentId}
          </Text>
          <Text
            style={[
              styles.profileAffiliation,
              { fontSize: fontSize - 2 }, // Taille de police légèrement réduite pour l'affiliation
            ]}
          >
            Affiliation: {userInfo.affiliation || "Non définie"}
          </Text>
        </View>
      </View>

      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          {/* Dark Mode */}
          <View style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: "#007afe" }]}>
              <FeatherIcon color="#fff" name="moon" size={20} />
            </View>
            <Text style={styles.rowLabel}>Dark Mode</Text>
            <View style={styles.rowSpacer} />
            <Switch
              onValueChange={(darkMode) => setForm({ ...form, darkMode })}
              value={form.darkMode}
            />
          </View>

          {/* Email Notifications */}
          <View style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: "#38C959" }]}>
              <FeatherIcon color="#fff" name="at-sign" size={20} />
            </View>
            <Text style={styles.rowLabel}>Email Notifications</Text>
            <View style={styles.rowSpacer} />
            <Switch
              onValueChange={(emailNotifications) =>
                setForm({ ...form, emailNotifications })
              }
              value={form.emailNotifications}
            />
          </View>

          {/* Push Notifications */}
          <View style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: "#38C959" }]}>
              <FeatherIcon color="#fff" name="bell" size={20} />
            </View>
            <Text style={styles.rowLabel}>Push Notifications</Text>
            <View style={styles.rowSpacer} />
            <Switch
              onValueChange={(pushNotifications) =>
                setForm({ ...form, pushNotifications })
              }
              value={form.pushNotifications}
            />
          </View>

          {/* Taille de la police */}
          <View style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: "#F39C12" }]}>
              <FeatherIcon color="#fff" name="text-height" size={20} />
            </View>
            <Text style={styles.rowLabel}>Taille de la police</Text>
            <View style={styles.rowSpacer} />
            <Slider
              style={{ width: 150 }}
              minimumValue={12}
              maximumValue={24}
              step={1}
              value={fontSize}
              onValueChange={handleFontSizeChange}
              minimumTrackTintColor="#F39C12"
              thumbTintColor="#F39C12"
            />
            <Text style={{ fontSize: 14, marginLeft: 8 }}>{fontSize}px</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bouton de déconnexion */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Déconnexion</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  lightContainer: {
    backgroundColor: "#FFF6F1",
  },
  darkContainer: {
    backgroundColor: "#333",
  },
  profile: {
    padding: 24,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  animation: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  profileName: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: "600",
    color: "#414d63",
    textAlign: "center",
  },
  profileId: {
    marginTop: 5,
    fontSize: 16,
    color: "#989898",
    textAlign: "center",
  },
  profileAffiliation: {
    marginTop: 5,
    fontSize: 16,
    color: "#505050",
    textAlign: "center",
    fontStyle: "italic",
  },
  section: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    paddingVertical: 12,
    fontSize: 12,
    fontWeight: "600",
    color: "#9e9e9e",
    textTransform: "uppercase",
    letterSpacing: 1.1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 50,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rowLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4c4c4c",
    flex: 1,
  },
  rowSpacer: {
    flex: 1,
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ff0000",
  },
  logoutButtonText: {
    color: "#ff0000",
    fontSize: 16,
    fontWeight: "600",
  },
});