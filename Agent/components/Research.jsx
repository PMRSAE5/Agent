import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, FlatList, TouchableOpacity, Modal } from "react-native";

export default function Home({ navigation }) {
  const [searchQuery, setSearchQuery] = useState(""); // Stocker la requête de recherche
  const [results, setResults] = useState([]); // Stocker les résultats de la recherche
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTrajet, setSelectedTrajet] = useState(null); // Stocker le trajet sélectionné pour afficher les détails

  // Fonction pour gérer la recherche
  const handleSearch = async () => {
    try {
      const response = await fetch(`http://192.168.1.97:3001/traj/trajet/${searchQuery}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setResults(data); // Mettre à jour les résultats
      setError(null);
    } catch (err) {
      setError(err.message);
      setResults([]);
    }
  };

// Fonction pour afficher les détails du trajet
  const handleTrajetPress = (trajet) => {
    setSelectedTrajet(trajet); // Mettre à jour le trajet sélectionné
    setModalVisible(true); // Afficher le modal
  };

  const renderTrajetDetails = () => {
    if (!selectedTrajet) return null;

    return (
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Détails du Trajet</Text>
        {selectedTrajet.trajet && selectedTrajet.trajet.map((etape, index) => (
          <View key={index} style={styles.etapeContainer}>
            <Text>{`Étape ${etape.num_etape}`}</Text>
            <Text>{`Départ: ${etape.lieu_depart}`}</Text>
            <Text>{`Heure de départ: ${etape.heure_depart}`}</Text>
            <Text>{`Arrivée: ${etape.lieu_arrivee}`}</Text>
            <Text>{`Heure d'arrivée: ${etape.heure_arrivee}`}</Text>
            <Text>{`Transporteur: ${etape.transporteur}`}</Text>
          </View>
        ))}
        <Text style={styles.modalSubtitle}>Bagages</Text>
        {selectedTrajet.bagage && selectedTrajet.bagage.map((bag, index) => (
          <View key={index} style={styles.bagageContainer}>
            <Text>{`ID Bagage: ${bag.id_bagage}`}</Text>
          </View>
        ))}
        <Text style={styles.modalSubtitle}>Papiers</Text>
        {selectedTrajet.papier && selectedTrajet.papier.map((paper, index) => (
          <View key={index} style={styles.papierContainer}>
            <Text>{`Catégorie: ${paper.categorie}`}</Text>
          </View>
        ))}
        <Button title="Fermer" onPress={() => setModalVisible(false)} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Rechercher"
        keyboardType="default"
        autoCapitalize="none"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Button title="Search" onPress={handleSearch} />
      {error && <Text style={styles.error}>{error}</Text>}
      <FlatList
        data={results}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleTrajetPress(item)}>
            <View style={styles.resultItem}>
              <Text>{`Départ: ${item.lieu_depart}, Arrivée: ${item.lieu_arrivee}`}</Text>
              <Text>{`Heure de départ: ${item.heure_depart}, Heure d'arrivée: ${item.heure_arrivee}`}</Text>
            </View>
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
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  input: {
    width: "100%",
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 16,
  },
  error: {
    color: "red",
    marginBottom: 16,
  },
  resultItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  modalContent: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 16,
  },
  modalSubtitle: {
    fontSize: 18,
    marginTop: 16,
    marginBottom: 8,
  },
  etapeContainer: {
    marginBottom: 16,
  },
  bagageContainer: {
    marginBottom: 8,
  },
  papierContainer: {
    marginBottom: 8,
  },
});