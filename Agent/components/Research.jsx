import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts, Raleway_400Regular, Raleway_700Bold } from "@expo-google-fonts/raleway";

// Importez les images
const ratpImage = require("../assets/RATP.png");
const sncfImage = require("../assets/SNCF.png");
const airFranceImage = require("../assets/AirFrance.png");

export default function Research() {
  const navigation = useNavigation();

  const [role, setRole] = useState(null); // Rôle de l'agent (RATP, SNCF, AirFrance)
  const [searchQuery, setSearchQuery] = useState(""); // Terme de recherche
  const [reservations, setReservations] = useState([]); // Liste des réservations
  const [selectedTrajet, setSelectedTrajet] = useState(null); // Trajet sélectionné
  const [modalVisible, setModalVisible] = useState(false); // Visibilité de la modal

  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
    Raleway_700Bold,
  });

  // Récupérer les réservations correspondant au lieu de départ
  const handleSearch = async (query) => {
    try {
      const response = await fetch(
        `http://172.20.10.5:3000/reservation/getByPoint?pmr_point_id=${query}`
      );
      const data = await response.json();

      console.log("Data fetched from API:", data);

      if (response.ok) {
        setReservations(data);
      } else {
        Alert.alert("Erreur", data.message || "Aucune réservation trouvée pour ce lieu.");
        setReservations([]);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des réservations :", error);
      Alert.alert("Erreur", "Une erreur est survenue lors de la récupération des réservations.");
    }
  };

  // Gérer la décision de refuser une réservation
  const handleRefuse = (reservationId) => {
    setReservations((prevReservations) =>
      prevReservations.filter((reservation) => reservation.id !== reservationId)
    );
    Alert.alert("Succès", "Réservation refusée avec succès.");
  };

  // Gérer la décision de valider une réservation
  const handleAccept = async (reservationId) => {
    try {
      const response = await fetch(
        `http://172.20.10.5:3000/reservation/getById?id=${reservationId}`
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erreur serveur :", errorText);
        Alert.alert("Erreur", "Impossible de récupérer les détails de la réservation.");
        return;
      }

      const { reservation } = await response.json();

      // Afficher les informations détaillées dans un Alert ou rediriger vers une page dédiée
      Alert.alert(
        "Détails de la réservation",
        `Nom : ${reservation.name}
        Prénom : ${reservation.surname}
        Téléphone : ${reservation.phone}
        Lieu de départ : ${reservation.lieu_depart}
        Lieu d'arrivée : ${reservation.lieu_arrivee}
        Heure de départ : ${reservation.heure_depart}
        Type de handicap : ${reservation.handicap_type}
        Nombre de bagages : ${reservation.numBags}`,
        [
          {
            text: "Commencer l'accompagnement",
            onPress: () => navigation.navigate("StartAssistance", { reservationId }),
          },
        ]
      );
    } catch (error) {
      console.error("Erreur lors de la récupération des détails de la réservation :", error);
      Alert.alert("Erreur", "Une erreur est survenue lors de la récupération des détails de la réservation.");
    }
  };

  // Afficher les détails du trajet dans une modal
  const renderTrajetDetails = () => {
    if (!selectedTrajet) return null;

    return (
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Détails du Trajet</Text>
        <Text style={styles.detailText}>Point de récupération : {selectedTrajet.trajet.point}</Text>
        <Text style={styles.detailText}>Heure : {selectedTrajet.trajet.heure}</Text>
        <Text style={styles.detailText}>Nom : {selectedTrajet.client_name}</Text>
        <Text style={styles.detailText}>Prénom : {selectedTrajet.client_surname}</Text>
        <Text style={styles.detailText}>Téléphone : {selectedTrajet.client_phone}</Text>
        <Text style={styles.detailText}>Type de handicap : {selectedTrajet.handicap_type}</Text>
        <Text style={styles.detailText}>Nombre de bagages : {selectedTrajet.baggage_count}</Text>
        <TouchableOpacity style={styles.buttonClose} onPress={() => setModalVisible(false)}>
          <Text style={styles.buttonText}>Fermer</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Chargement des polices...</Text>
      </View>
    );
  }

  if (!role) {
    return (
      <View style={styles.roleSelectionContainer}>
        <Text style={styles.roleSelectionTitle}>Type d'Agent :</Text>
        <TouchableOpacity style={styles.roleButton} onPress={() => setRole("RATP")}>
          <Image source={ratpImage} style={styles.roleImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.roleButton} onPress={() => setRole("SNCF")}>
          <Image source={sncfImage} style={styles.roleImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.roleButton} onPress={() => setRole("AirFrance")}>
          <Image source={airFranceImage} style={styles.roleImage} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Rechercher un lieu de départ..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          onSubmitEditing={() => handleSearch(searchQuery)}
          placeholderTextColor="#A5A5A5"
        />
      </View>

      <FlatList
        data={reservations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Text style={styles.resultTitle}>Réservation #{item.id}</Text>
            <TouchableOpacity style={styles.trajetContainer} onPress={() => setSelectedTrajet(item)}>
              <Text style={styles.resultSubtitle}>
                Point de récupération : {item.trajet.point} - Heure : {item.trajet.heure}
              </Text>
            </TouchableOpacity>
            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.button, styles.acceptButton]}
                onPress={() => handleAccept(item.id)}
              >
                <Text style={styles.buttonText}>Valider</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.rejectButton]}
                onPress={() => handleRefuse(item.id)}
              >
                <Text style={styles.buttonText}>Refuser</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Modal visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
        {renderTrajetDetails()}
      </Modal>
    </KeyboardAvoidingView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF6F1",
    paddingTop: 80,
  },
  roleSelectionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF6F1",
  },
  roleSelectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#EF4D20",
    marginBottom: 20,
    fontFamily: "Raleway_700Bold", // Appliquer la police Raleway
  },
  roleButton: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    width: "45%",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#EF4D20",
    justifyContent: "center",
  },
  roleImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  searchContainer: {
    width: "80%",
    padding: 16,
    backgroundColor: "#FFF6F1",
    borderBottomWidth: 1,
    borderBottomColor: "#EF4D20",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  input: {
    width: "100%",
    height: 50,
    padding: 12,
    borderWidth: 1,
    borderColor: "#EF4D20",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    fontSize: 16,
    color: "#000",
    fontFamily: "Raleway_400Regular", // Appliquer la police Raleway
  },
  resultItem: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EF4D20",
    elevation: 2,
    width: "90%",
    alignSelf: "center",
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#EF4D20",
    textAlign: "center",
    fontFamily: "Raleway_700Bold", // Appliquer la police Raleway
  },
  resultSubtitle: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    fontFamily: "Raleway_400Regular", // Appliquer la police Raleway
  },
  trajetContainer: {
    marginTop: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  acceptButton: {
    backgroundColor: "green",
  },
  rejectButton: {
    backgroundColor: "red",
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
    fontFamily: "Raleway_700Bold", // Appliquer la police Raleway
  },
  detailText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
    fontFamily: "Raleway_400Regular", // Appliquer la police Raleway
  },
  buttonClose: {
    backgroundColor: "#EF4D20",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "Raleway_700Bold", // Appliquer la police Raleway
  },
  loadingText: {
    fontSize: 20,
    color: "#EF4D20",
    fontWeight: "bold",
    fontFamily: "Raleway_700Bold", // Appliquer la police Raleway
  },
});