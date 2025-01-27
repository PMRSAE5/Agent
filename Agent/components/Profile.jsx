import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Switch,
} from "react-native";
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
  const [userInfo, setUserInfo] = useState({
    name: "",
    surname: "",
    agentId: "",
    affiliation: "", // Ajout de l'affiliation
  });

  const navigation = useNavigation();

  // Charger les informations utilisateur après la connexion
  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        // const storedFontSize = await AsyncStorage.getItem("fontSize");

        console.log("Données récupérées depuis AsyncStorage :", JSON.parse(user)); // Log pour vérifier
  
        if (user) {
          const { name, surname, agentId, affiliation } = JSON.parse(user);
          setUserInfo({ name, surname, agentId, affiliation });
        }
      } catch (error) {
        console.error("Erreur lors du chargement des informations utilisateur :", error);
      }
    };
  
    loadUserInfo();
  }, []);
  

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
          source={require("../assets/profile_agent_icon.json")} // Chemin vers l'animation JSON
          autoPlay
          loop
          style={styles.animation}
        />
        <View>
          <Text style={styles.profileName}>
            {userInfo.name} {userInfo.surname}
          </Text>
          <Text style={styles.profileId}>Agent ID: {userInfo.agentId || "Non trouvé"}</Text>
          <Text style={styles.profileAffiliation || "Non trouvé"}>
            Affiliation : {userInfo.affiliation || "Non spécifiée"}
          </Text>
        </View>
      </View>

      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Préférences</Text>

          {/* Dark Mode */}
          <View style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: "#EF4D20" }]}>
              <FeatherIcon color="#fff" name="moon" size={20} />
            </View>
            <Text style={styles.rowLabel}>Mode sombre</Text>
            <View style={styles.rowSpacer} />
            <Switch
              onValueChange={(darkMode) => setForm({ ...form, darkMode })}
              value={form.darkMode}
            />
          </View>

          {/* Email Notifications */}
          <View style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: "#EF4D20" }]}>
              <FeatherIcon color="#fff" name="at-sign" size={20} />
            </View>
            <Text style={styles.rowLabel}>Notifications par email</Text>
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
            <View style={[styles.rowIcon, { backgroundColor: "#EF4D20" }]}>
              <FeatherIcon color="#fff" name="bell" size={20} />
            </View>
            <Text style={styles.rowLabel}>Notifications push</Text>
            <View style={styles.rowSpacer} />
            <Switch
              onValueChange={(pushNotifications) =>
                setForm({ ...form, pushNotifications })
              }
              value={form.pushNotifications}
            />
          </View>
          <TouchableOpacity style={styles.row} onPress={handleLogout}>
        <View style={[styles.rowIcon, { backgroundColor: "#EF4D20" }]}>
          <FeatherIcon color="#fff" name="log-out" size={20} />
        </View>
        <Text style={[styles.rowLabel, { color: "#4c4c4c" }]}>Déconnexion</Text>
        <View style={styles.rowSpacer} />
      </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bouton de déconnexion
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Déconnexion</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  lightContainer: {
    backgroundColor: "#FFF6F1",
    flex: 1,
  },
  darkContainer: {
    backgroundColor: "#333",
    flex: 1,
  },
  profile: {
    padding: 24,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  animation: {
    width: 150,
    height: 150,
    marginBottom: 20,
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
    flex: 1,
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
    borderWidth: 1,
    borderColor: "#EF4D20",
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
    fontSize: 15,
    fontWeight: "600",
    color: "#4c4c4c",
    flex: 1,
  },
  rowSpacer: {
    flex: 1,
  },
});
