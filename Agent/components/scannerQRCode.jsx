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
import { Camera, CameraView } from "expo-camera";
import { useNavigation } from "@react-navigation/native";

export default function ScannerQRCode() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [text, setText] = useState("Aucun QR Code scanné pour l'instant.");

  // Demande de permission pour la caméra
  const askForCameraPermission = () => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log("Type:", type);
    console.log("Data:", data);

    try {
      const url = new URL(data);
      if (!url.search) throw new Error("Le QR Code n'a pas de paramètres valides.");

      const params = new URLSearchParams(url.search);
      const qrInfo = {
        nom: params.get("nom"),
        prenom: params.get("prenom"),
        reservation: params.get("reservation"),
        depart: params.get("depart"),
        arrivee: params.get("arrivee"),
        bagages: params.get("bagages"),
        fauteuilRoulant: params.get("fauteuilRoulant"),
      };

      setQrData(qrInfo);
      setModalVisible(true);

      setText(
        'Informations du QR Code précédemment scanné:\n\n' +
        `Nom: ${qrInfo.nom || "Non défini"}
        Prénom: ${qrInfo.prenom || "Non défini"}
        Réservation: ${qrInfo.reservation || "Non défini"}
        Départ: ${qrInfo.depart || "Non défini"}
        Arrivée: ${qrInfo.arrivee || "Non défini"}
        Bagages: ${qrInfo.bagages || "Non défini"}
        Fauteuil Roulant: ${qrInfo.fauteuilRoulant || "Non défini"}
      `);
    } catch (error) {
      console.error("Erreur lors de l'analyse du QR Code :", error);
      Alert.alert("Erreur", "Le QR Code scanné n'est pas valide ou n'est pas une URL.");
      setText(`Données brutes : ${data}`);
    }
  };

  const handleConfirm = () => {
    setModalVisible(false);
    try {
      navigation.navigate("scannerQRCodeBaggage", { qrData });
    } catch (error) {
      Alert.alert("Erreur", "L'écran 'scannerQRCodeBaggage' est introuvable.");
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Demande de permission pour la caméra...</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>Accès à la caméra refusé</Text>
        <TouchableOpacity onPress={askForCameraPermission} style={styles.permissionButton}>
          <Text style={styles.permissionButtonText}>Autoriser la caméra</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scanner le QR Code du PMR</Text>
      <CameraView
        style={styles.camera}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeScannerSettings={{
          barCodeTypes: ["qr"],
        }}
      >
        {/* Overlay for QR Code Detection Box */}
        <View style={styles.overlay}>
          <View style={styles.rectangle} />
        </View>
      </CameraView>

      <Text style={styles.resultText}>{text}</Text>

      {scanned && (
        <TouchableOpacity style={styles.scanAgainButton} onPress={() => setScanned(false)}>
          <Text style={styles.scanAgainButtonText}>Scanner à nouveau</Text>
        </TouchableOpacity>
      )}

      {/* Modal */}
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
            <Text style={styles.modalTitle}>Informations du QR Code</Text>

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
              <Text style={styles.confirmButtonText}>Accepter</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF6F1",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#EF4D20",
    marginBottom: 20,
    textAlign: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  rectangle: {
    width: 200,
    height: 200,
    borderWidth: 4,
    borderColor: "#EF4D20",
    borderRadius: 10,
  },
  resultText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginVertical: 20,
  },
  scanAgainButton: {
    backgroundColor: "#EF4D20",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
  },
  scanAgainButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  permissionButton: {
    backgroundColor: "#EF4D20",
    padding: 12,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
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
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#EF4D20",
    marginBottom: 20,
  },
  modalContent: {
    marginBottom: 20,
    textAlign: "center",
  },
  modalText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  confirmButton: {
    backgroundColor: "#32CD32",
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
    backgroundColor: "#FF0000",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});