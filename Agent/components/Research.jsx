import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Modal, Alert, } from "react-native";

export default function Research({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTrajet, setSelectedTrajet] = useState(null);
  const [todayTrajets, setTodayTrajets] = useState([]); // Nouvel état pour les trajets du jour

  // // Charger les trajets du jour au montage du composant
  // useEffect(() => {
  //   const fetchTodayTrajets = async () => {
  //     try {
  //       const response = await fetch(`http://192.168.1.96:3000/traj/trajet/today`);
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch today's trajets");
  //       }
  //       const data = await response.json();
  //       setTodayTrajets(data);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   fetchTodayTrajets();
  // }, []);

  // Fonction pour gérer la recherche
  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://172.20.10.11:3001/traj/trajet/${searchQuery}`
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

  // Gérer la décision
  const handleDecision = async (id, decision) => {
    try {
      const response = await fetch(
        `http://192.168.1.96:3000/traj/trajet/${id}/decision`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ decision }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update trajet");
      }
      Alert.alert("Success", `Trajet ${decision}ed successfully`);
      handleSearch(); // Rafraîchir la liste
    } catch (err) {
      Alert.alert("Error", err.message);
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
        <Text style={styles.modalTitle}>Details du Trajet</Text>
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

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("QR")}
        >
          <Text style={styles.buttonText}>Scanner le QR Code</Text>
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
      <Text style={styles.subtitle}>Trajets du jour :</Text>
      <FlatList
        data={todayTrajets}
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
      <Text style={styles.subtitle}>Résultats de la recherche :</Text>
      <FlatList
        data={results}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Text style={styles.resultTitle}>
              Départ : {item.lieu_depart}, Arrivée : {item.lieu_arrivee}
            </Text>
            <Text style={styles.resultSubtitle}>
              {item.heure_depart} - {item.heure_arrivee}
            </Text>
            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.button, styles.acceptButton]}
                onPress={() => handleDecision(item.id, "accept")}
              >
                <Text style={styles.buttonText}>Accepter</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.rejectButton]}
                onPress={() => handleDecision(item.id, "reject")}
              >
                <Text style={styles.buttonText}>Refuser</Text>
              </TouchableOpacity>
            </View>
          </View>
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