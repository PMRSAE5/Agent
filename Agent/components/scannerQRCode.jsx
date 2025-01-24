import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Camera, CameraView } from 'expo-camera';

const ScannerQRCode = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log('QR Code scanné:', data);

    try {
      const url = new URL(data);
      const params = new URLSearchParams(url.search);

      const qrInfo = {
        nom: params.get('nom'),
        prenom: params.get('prenom'),
        reservation: params.get('reservation'),
        depart: params.get('depart'),
        arrivee: params.get('arrivee'),
        bagages: params.get('bagages'),
        fauteuilRoulant: params.get('fauteuilRoulant'),
      };

      setQrData(qrInfo);
      setModalVisible(true);

      
    } catch (error) {
      console.error("Erreur lors de l'analyse du QR Code :", error);
      Alert.alert("Erreur", "Le QR Code scanné n'est pas valide.");
    }
  };

  if (hasPermission === null) {
    return <Text>Demande de permission...</Text>;
  }

  if (hasPermission === false) {
    return <Text>Permission de la caméra refusée</Text>;
  }

  const handleConfirm = () => {
    setModalVisible(false);
    navigation.navigate('scannerQRCodeBaggage', { qrData });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.topText}>Scanner un QR Code</Text>
      <CameraView
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Overlay for QR Code Detection Box */}
      <View style={styles.overlay}>
          <View style={styles.rectangle} />
      </View>

      {scanned && (
        <TouchableOpacity style={styles.scanButton} onPress={() => setScanned(false)}>
          <Text style={styles.scanButtonText}>Scanner à nouveau</Text>
        </TouchableOpacity>
      )}

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
        transparent={true}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Informations du QR Code du PMR</Text>

            {qrData && (
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>Nom: {qrData.nom}</Text>
                <Text style={styles.modalText}>Prénom: {qrData.prenom}</Text>
                <Text style={styles.modalText}>Réservation: {qrData.reservation}</Text>
                <Text style={styles.modalText}>Départ: {qrData.depart}</Text>
                <Text style={styles.modalText}>Arrivée: {qrData.arrivee}</Text>
                <Text style={styles.modalText}>Bagages: {qrData.bagages}</Text>
                <Text style={styles.modalText}>Fauteuil roulant: {qrData.fauteuilRoulant}</Text>
              </View>
            )}

            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
              <Text style={styles.confirmButtonText}>Confirmer</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  topText: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 16,
    color: "#EF4D20",
    textAlign: "center",
    marginBottom: 20,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rectangle: {
    width: 250,
    height: 250,
    borderWidth: 4,
    borderColor: "#EF4D20",
    backgroundColor: "transparent",
    borderRadius: 15,
  },
  scanButton: {
    position: "absolute",
    bottom: 50,
    backgroundColor: "#EF4D20",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  scanButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#FFF6F1",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#EF4D20",
    marginBottom: 20,
    textAlign: "center",
  },
  modalContent: {
    width: "100%",
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
  },
  confirmButton: {
    backgroundColor: "#EF4D20",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#CCCCCC",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#333",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ScannerQRCode;