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
  const [name, setName] = useState(""); // Stocker le nom d'utilisateur
  const [password, setPassword] = useState(""); // Stocker le mot de passe

  useFonts({
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
    // Charger les infos de l'utilisateur depuis AsyncStorage
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const { name, password, agentId, affiliation } = JSON.parse(userData); // Inclure affiliation
          setName(name); // Pré remplir le nom
          setPassword(password); // Pré remplir le mot de passe
          // setStayLoggedIn(true); // Cocher "rester connecté"
          console.log("Nom :", name, "Mot de passe :", password, "Affiliation :", affiliation);
        } else {
          const agentIdData = await AsyncStorage.getItem('agentId');
          if (agentIdData) {
            const { agentId } = JSON.parse(agentIdData);
            console.log("Loaded agentId:", agentId); // Afficher l'ID de l'agent dans les logs
          }
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données utilisateur :", error);
      }
    };
  
    loadUserData();
  }, []);

  // Fonction pour gérer la connexion
  const handleLogin = async () => {
    // Vérifiez les valeurs avant d'envoyer la requête
    console.log("Nom d'utilisateur : ", name);
    console.log("Mot de passe : ", password);
    console.log("Connecting to: http://172.20.10.11:3000");

    try {
      if (!name || !password) {
        Alert.alert("Erreur", "Veuillez remplir tous les champs.");
        return;
      }

      const response = await axios.post('http://172.20.10.11:3000/ag/login', { name, password });
      console.log("Response from login:", response.data);

      if (response.status === 200) {
        // Récupérer l'ID de l'agent
        const agentIdResponse = await axios.get(`http://172.20.10.11:3000/ag/agentId/${name}`);
        console.log("Agent ID response:", agentIdResponse.data)

        if (!agentIdResponse.data || agentIdResponse.data.length === 0) {
          throw new Error("Aucun ID d'agent trouvé dans la réponse de l'API.");
        }  

        const agentId = agentIdResponse.data[0].ID_Agent; // Extraire l'ID de l'agent
        if (!agentId) {
          throw new Error("Propriété 'ID_Agent' manquante dans la réponse de l'API.");
        }
        console.log("Agent ID response:", agentIdResponse.data);

        // Extraire toutes les informations de l'agent
        const { surname, affiliation } = response.data.agent;

        // Toujours enregistrer l'ID de l'agent
        await AsyncStorage.setItem('agentId', JSON.stringify({ agentId }));

        // Enregistrer les infos de l'utilisateur dans AsyncStorage
        await AsyncStorage.setItem('user', JSON.stringify({ name, password, agentId, surname, affiliation }));
        onLoginSuccess(); // Appeler la fonction de succès
        navigation.replace("Home");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error.message);
      Alert.alert("Erreur du login", "Nom ou mot de passe invalide.");
    }
  };
  

  const handleForgotPassword = () => {
    Alert.alert(
      "Mot de passe oublié ?",
      "Veuillez vous diriger vers PMove Support pour récupérer votre mot de passe lié à votre ID Agent."
    ); // Pop-up adaptatif
  };

  return (
    <View style={styles.container}>
      {/* Logo au-dessus du formulaire */}
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
          onChangeText={setName}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <View style={styles.checkboxSection}>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
          </TouchableOpacity>
        </View>
        </View>

        {/* Bouton de connexion */}
        <View>
        <TouchableOpacity style={styles.buttonPrimary} onPress={handleLogin}>
          <Text style={styles.buttonTextPrimary}>Se connecter</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF6F1", // Fond de la page
    padding: 20,
    justifyContent: "center", // Centrer verticalement
    alignItems: "center", // Centrer horizontalement
  },
  logo: {
    width: 500, // Taille de l'image
    height: 300, // Taille de l'image
    marginBottom: -70, // Marge en bas
  },
  title: {
    fontSize: 27,
    fontFamily: "RalewayBold",
    color: "#EF4D20", // Couleur du titre
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
    borderColor: "#EF4D20", // Bordure des champs
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF",
    fontSize: 16,
    color: "#000", // Texte des champs
    borderRadius: 8,
  },
  checkboxSection: {
    flexDirection: "column", // Alignement horizontal
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 20,
    paddingHorizontal: 10,
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
    color: "#FF000",
    flex: 1,
    flexWrap: "wrap",
  },
  forgotPassword: {
    fontSize: 14,
    color: "#FF000", // Couleur du texte
    textDecorationLine: "underline",
    marginTop: 10,
  },
  buttonPrimary: {
    backgroundColor: "#EF4D20", // Couleur du bouton
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonTextPrimary: {
    color: "#FFFFFF", // Couleur du texte du bouton
    fontFamily: "RalewayBold",
    fontSize: 16,
  },
  error: {
    color: "#EF4D20",
    textAlign: "center",
    marginBottom: 16,
  },
});