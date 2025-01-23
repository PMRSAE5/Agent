import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Login({ navigation }) {
  const [name, setName] = useState(""); // Stocker le nom d'utilisateur
  const [password, setPassword] = useState(""); // Stocker le mot de passe
  const [stayLoggedIn, setStayLoggedIn] = useState(false); // Stocker "rester connecté"

  useEffect(() => {
    // Charger les infos de l'utilisateur depuis AsyncStorage
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const { name, password, agentId } = JSON.parse(userData);
          setName(name); // Pré remplir le nom
          setPassword(password); // Pré remplir le mot de passe
          setStayLoggedIn(true); // Cocher "rester connecté"
          console.log(name, password);
        } else {
          const agentIdData = await AsyncStorage.getItem('agentId');
          if (agentIdData) {
            const { agentId } = JSON.parse(agentIdData);
            console.log("Loaded agentId:", agentId); // Afficher l'ID de l'agent dans les logs
          }
        }
      } catch (error) {
        console.error("Failed to load user data", error);
      }
    };

    loadUserData();
  }, []);

  // Fonction pour gérer la connexion
  const handleLogin = async () => {
    // Vérifiez les valeurs avant d'envoyer la requête
    console.log("Nom d'utilisateur : ", name);
    console.log("Mot de passe : ", password);
    console.log("Connecting to: http://192.168.1.96:3000");

    try {
    // Vérifiez si les champs sont remplis avant d'envoyer la requête
    if (!name || !password) {
        Alert.alert("Erreur", "Veuillez remplir tous les champs.");
        return;
    }

      const response = await axios.post('http://192.168.1.96:3000/ag/login', { name, password });
      console.log("Response from login:", response.data);

      if (response.status === 200) {
        // Récupérer l'ID de l'agent
        const agentIdResponse = await axios.get(`http://192.168.1.96:3000/ag/agentId/${name}`);
        const agentId = agentIdResponse.data[0].ID_Agent; // Extraire l'ID de l'agent
        console.log("Agent ID response:", agentIdResponse.data);

        // Toujours enregistrer l'ID de l'agent
        await AsyncStorage.setItem('agentId', JSON.stringify({ agentId }));

        if (stayLoggedIn) {
        // Enregistrer les infos de l'utilisateur dans AsyncStorage si "rester connecté" est coché
          await AsyncStorage.setItem('user', JSON.stringify({ name, password, agentId }));
        } else {
          await AsyncStorage.removeItem('user');
        }
        navigation.replace("Home");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      Alert.alert("Erreur du login", "Nom ou mot de passe invalide.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo au-dessus du formulaire */}
      <Image
        source={require("../assets/PMoveLogoSANSTITRE.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>Connexion Agent</Text>

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
        <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={() => setStayLoggedIn(!stayLoggedIn)}>
            <Text style={styles.checkbox}>{stayLoggedIn ? "☑" : "☐"}</Text>
          </TouchableOpacity>
          <Text style={styles.label}>Rester connecté</Text>
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
    backgroundColor: "#FFF6F1", // Fond de la page
    padding: 16,
    justifyContent: "center", // Centrer verticalement
    alignItems: "center", // Centrer horizontalement
  },
  logo: {
    width: 200, // Taille de l'image
    height: 200, // Taille de l'image
    marginBottom: 0, // Espace sous l'image
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#EF4D20", // Couleur du titre
    marginBottom: 16,
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    paddingHorizontal: 16,
  },
  input: {
    height: 40,
    borderColor: "#EF4D20", // Bordure des champs
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: "#FFFFFF",
    fontSize: 16,
    color: "#000", // Texte des champs
    borderRadius: 8,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  checkbox: {
    fontSize: 18,
    marginRight: 8,
  },
  label: {
    fontSize: 16,
    color: "#555",
  },
  buttonPrimary: {
    backgroundColor: "#EF4D20", // Couleur du bouton
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonTextPrimary: {
    color: "#FFFFFF", // Couleur du texte du bouton
    fontWeight: "bold",
    fontSize: 16,
  },
  error: {
    color: "#EF4D20",
    textAlign: "center",
    marginBottom: 16,
  },
});