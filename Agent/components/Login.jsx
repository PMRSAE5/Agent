import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Login({ navigation }) {
  const [name, setName] = useState(""); // Sotcker le nom d'utilisateur
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
    try {
      // Envoyer la requête de connexion
      const response = await axios.post('http://192.168.1.96:3000/ag/login', { name, password }); // ip config dans la machine
      if (response.status === 200) {
        // Récupérer l'ID de l'agent
        const agentIdResponse = await axios.get(`http://192.168.1.96:3000/ag/agentId/${name}`); // ip config dans la machine
        const agentId = agentIdResponse.data[0].ID_Agent; // Extraire l'ID de l'agent

        // Toujours enregistrer l'ID de l'agent
        await AsyncStorage.setItem('agentId', JSON.stringify({ agentId }));

        if (stayLoggedIn) {
          // Enregistrer les infos de l'utilisateur dans AsyncStorage si "rester connecté" est coché
          await AsyncStorage.setItem('user', JSON.stringify({ name, password, agentId }));
        } else {
          await AsyncStorage.removeItem('user');
        }
        navigation.replace("Research"); // Rediriger vers la page de recherche
      }
    } catch (error) {
      Alert.alert("Erreur du login", "Nom invalide ou le mdp");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agent</Text>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
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
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
  },
  formContainer: {
    width: "100%",
    paddingHorizontal: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
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
  },
  buttonPrimary: {
    backgroundColor: "#007BFF",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonTextPrimary: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});