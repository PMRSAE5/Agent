import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Switch,
  Animated,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useFonts, Raleway_400Regular, Raleway_700Bold } from "@expo-google-fonts/raleway";

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
    affiliation: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
    Raleway_700Bold,
  });

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        const storedFontSize = await AsyncStorage.getItem("fontSize");

        console.log("Données récupérées depuis AsyncStorage :", JSON.parse(user));

        if (user) {
          const { name, surname, agentId, affiliation } = JSON.parse(user);
          setUserInfo({ name, surname, agentId, affiliation });
        }
      } catch (error) {
        console.error("Erreur lors du chargement des informations utilisateur :", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserInfo();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("agentId");
    console.log("Déconnexion réussie");
    navigation.replace("Login");
  };

  if (!fontsLoaded || isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[
        { flex: 1 },
        form.darkMode ? styles.darkContainer : styles.lightContainer,
      ]}
    >
      <Animated.View style={{ opacity: fadeAnim }}>
        <View style={styles.profile}>
          <LottieView
            source={require("../assets/icon_user_agent.json")}
            autoPlay
            loop
            style={styles.animation}
          />
          <View>
            <Text style={[styles.profileName, { fontFamily: "Raleway_700Bold" }]}>
              {userInfo.name} {userInfo.surname}
            </Text>
            <Text style={[styles.profileId, { fontFamily: "Raleway_400Regular" }]}>
              Agent ID: {userInfo.agentId}
            </Text>
            <Text style={[styles.profileAffiliation, { fontFamily: "Raleway_400Regular" }]}>
              Affiliation : {userInfo.affiliation || "Non spécifiée"}
            </Text>
          </View>
        </View>

        <ScrollView>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { fontFamily: "Raleway_700Bold" }]}>
              Préférences
            </Text>

            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: "#007afe" }]}>
                <FeatherIcon color="#fff" name="moon" size={20} />
              </View>
              <Text style={[styles.rowLabel, { fontFamily: "Raleway_400Regular" }]}>
                Mode sombre
              </Text>
              <View style={styles.rowSpacer} />
              <Switch
                onValueChange={(darkMode) => setForm({ ...form, darkMode })}
                value={form.darkMode}
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: "#38C959" }]}>
                <FeatherIcon color="#fff" name="at-sign" size={20} />
              </View>
              <Text style={[styles.rowLabel, { fontFamily: "Raleway_400Regular" }]}>
                Notifications par email
              </Text>
              <View style={styles.rowSpacer} />
              <Switch
                onValueChange={(emailNotifications) =>
                  setForm({ ...form, emailNotifications })
                }
                value={form.emailNotifications}
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: "#38C959" }]}>
                <FeatherIcon color="#fff" name="bell" size={20} />
              </View>
              <Text style={[styles.rowLabel, { fontFamily: "Raleway_400Regular" }]}>
                Notifications push
              </Text>
              <View style={styles.rowSpacer} />
              <Switch
                onValueChange={(pushNotifications) =>
                  setForm({ ...form, pushNotifications })
                }
                value={form.pushNotifications}
              />
            </View>
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={[styles.logoutButtonText, { fontFamily: "Raleway_700Bold" }]}>
            Déconnexion
          </Text>
        </TouchableOpacity>
      </Animated.View>
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
  container: {
    flex: 1,
    backgroundColor: "#FFF6F1",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 20,
    color: "#EF4D20",
    fontWeight: "bold",
  },
});