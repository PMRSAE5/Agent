import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Modal } from "react-native";

export default function Research({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTrajet, setSelectedTrajet] = useState(null);

  // Fonction pour gérer la recherche
  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.97:3001/traj/trajet/${searchQuery}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setResults(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setResults([]);
    }
  };

  // Fonction pour afficher les détails du trajet
  const handleTrajetPress = (trajet) => {
    setSelectedTrajet(trajet);
    setModalVisible(true);
  };

  const renderTrajetDetails = () => {
    if (!selectedTrajet) return null;

    return (
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Trajet Details</Text>
        {selectedTrajet.trajet?.map((etape, index) => (
          <View key={index} style={styles.etapeContainer}>
            <Text style={styles.detailText}>Étape {etape.num_etape}</Text>
            <Text style={styles.detailText}>Départ : {etape.lieu_depart}</Text>
            <Text style={styles.detailText}>Heure de départ : {etape.heure_depart}</Text>
            <Text style={styles.detailText}>Arrivée : {etape.lieu_arrivee}</Text>
            <Text style={styles.detailText}>Heure d'arrivée : {etape.heure_arrivee}</Text>
            <Text style={styles.detailText}>Transporteur : {etape.transporteur}</Text>
          </View>
        ))}
        <TouchableOpacity
          style={styles.buttonClose}
          onPress={() => setModalVisible(false)}
        >
          <Text style={styles.buttonText}>Fermer</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rechercher un Trajet</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrez une gare ou un trajet"
        keyboardType="default"
        autoCapitalize="none"
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor="#A5A5A5"
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Rechercher</Text>
      </TouchableOpacity>
      {error && <Text style={styles.error}>{error}</Text>}
      <FlatList
        data={results}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.resultItem}
            onPress={() => handleTrajetPress(item)}
          >
            <Text style={styles.resultTitle}>
              Départ : {item.lieu_depart}, Arrivée : {item.lieu_arrivee}
            </Text>
            <Text style={styles.resultSubtitle}>
              {item.heure_depart} - {item.heure_arrivee}
            </Text>
          </TouchableOpacity>
        )}
      />
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        {renderTrajetDetails()}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF6F1",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#EF4D20",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#EF4D20",
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
    fontSize: 16,
    color: "#000",
  },
  button: {
    backgroundColor: "#EF4D20",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  error: {
    color: "#EF4D20",
    textAlign: "center",
    marginBottom: 16,
  },
  resultItem: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EF4D20",
    elevation: 2,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#EF4D20",
  },
  resultSubtitle: {
    fontSize: 14,
    color: "#555",
  },
  modalContent: {
    flex: 1,
    backgroundColor: "#FFF6F1",
    padding: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#EF4D20",
    marginBottom: 16,
  },
  detailText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  buttonClose: {
    backgroundColor: "#EF4D20",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
});