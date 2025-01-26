import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from "react-native-vector-icons/FontAwesome";

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

export default function Login({ navigation, onLoginSuccess }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const [fontsLoaded] = useFonts({
    RalewayThin: Raleway_100Thin,
    RalewayExtraLight: Raleway_200ExtraLight,
    RalewayLight: Raleway_300Light,
    RalewayRegular: Raleway_400Regular,
    RalewayMedium: Raleway_500Medium,
    RalewaySemiBold: Raleway_600SemiBold,
    RalewayBold: Raleway_700Bold,
    RalewayExtraBold: Raleway_800ExtraBold,
    RalewayBlack: Raleway_900Black,
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const { name, password, agentId, affiliation } = JSON.parse(userData);
          setName(name);
          setPassword(password);
          setStayLoggedIn(true);
          console.log("Nom :", name, "Mot de passe :", password, "Affiliation :", affiliation);
        } else {
          const agentIdData = await AsyncStorage.getItem('agentId');
          if (agentIdData) {
            const { agentId } = JSON.parse(agentIdData);
            console.log("Loaded agentId:", agentId);
          }
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données utilisateur :", error);
      }
    };

    loadUserData();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const handleLogin = async () => {
    setLoginError(null);

    if (!name || !password) {
      setLoginError("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const response = await axios.post('http://172.20.10.11:3000/ag/login', { name, password });
      console.log("Response from login:", response.data);

      if (response.status === 200) {
        const agentIdResponse = await axios.get(`http://172.20.10.11:3000/ag/agentId/${name}`);
        const agentId = agentIdResponse.data[0].ID_Agent;
        console.log("Agent ID response:", agentIdResponse.data);

        await AsyncStorage.setItem('agentId', JSON.stringify({ agentId }));

        if (stayLoggedIn) {
          await AsyncStorage.setItem('user', JSON.stringify({ name, password, agentId }));
        } else {
          await AsyncStorage.removeItem('user');
        }
        navigation.replace("Home");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setLoginError("Identifiants incorrects. Vérifiez vos informations.");
    }
  };

  const handleForgotPassword = () => {
    Alert.alert(
      "Mot de passe oublié ?",
      "Veuillez vous diriger vers PMove Support pour récupérer votre mot de passe lié à votre ID Agent."
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/PMoveLogoSANSTITRE.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>Bienvenue</Text>
      <Text style={styles.subtitle}>Connectez-vous pour continuer</Text>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nom d'utilisateur"
          value={name}
          onChangeText={(text) => {
            setName(text);
            setLoginError(null);
          }}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setLoginError(null);
          }}
          secureTextEntry
        />

        {loginError && (
          <View style={styles.errorContainer}>
            <Icon name="exclamation-circle" size={16} color="#EF4D20" />
            <Text style={styles.errorText}>{loginError}</Text>
          </View>
        )}

        <View style={styles.checkboxSection}>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity onPress={() => setStayLoggedIn(!stayLoggedIn)}>
              <Text style={styles.checkbox}>{stayLoggedIn ? "☑" : "☐"}</Text>
            </TouchableOpacity>
            <Text style={styles.label}>Rester connecté</Text>
          </View>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={handleLogin}
        >
          <Text style={styles.buttonTextPrimary}>Se connecter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF6F1",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  title: {
    fontSize: 27,
    fontFamily: "RalewayBold",
    color: "#EF4D20",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontFamily: "RalewayRegular",
    color: "#333",
    marginBottom: 30,
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    paddingHorizontal: 16,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#EF4D20",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF",
    fontSize: 16,
    color: "#000",
    borderRadius: 8,
  },
  checkboxSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  checkbox: {
    fontSize: 18,
    marginRight: 6,
  },
  label: {
    fontSize: 16,
    color: "#555",
  },
  forgotPassword: {
    fontSize: 14,
    color: "#EF4D20",
    textDecorationLine: "underline",
  },
  buttonPrimary: {
    backgroundColor: "#EF4D20",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonTextPrimary: {
    color: "#FFFFFF",
    fontFamily: "RalewayBold",
    fontSize: 16,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE8E1',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  errorText: {
    color: '#EF4D20',
    marginLeft: 8,
    fontFamily: 'RalewayMedium',
    fontSize: 14,
  },
});