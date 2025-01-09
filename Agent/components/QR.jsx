import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function QR({ navigation }) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUserInfo(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Failed to load user data", error);
      }
    };

    loadUserData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>QR</Text>
      {userInfo ? (
        <View>
          <Text>Name: {userInfo.name}</Text>
          <Text>Password: {userInfo.password}</Text>
          <Text>Agent ID: {userInfo.agentId}</Text> {/* Afficher l'ID de l'agent */}
        </View>
      ) : (
        <Text>No user data found</Text>
      )}
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
});