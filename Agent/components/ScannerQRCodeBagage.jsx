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

import { Camera, CameraView } from 'expo-camera';
import { useNavigation } from "@react-navigation/native";

const ScannerQRCodeBagage = () => {
      const [hasPermission, setHasPermission] = useState(null);
      const [scanned, setScanned] = useState(false);
      const [qrDataBagage, setQrDataBagage] = useState(null);
      const [modalVisible, setModalVisible] = useState(false);
      const navigation = useNavigation();
      const [text, setText] = useState("Aucun QR Code scanné pour l'instant.");
    

      // Demande de permission pour la caméra
      const askForCameraPermission = () => {
        (async () => {
          const { status } = await Camera.requestCameraPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
      };

      useEffect(() => {
        askForCameraPermission();
      }, []);

      const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        console.log('QR Code scanné :', data);

        try {
          const url = new URL(data);
          if (!url.search) throw new Error("Le QR Code n'a pas de paramètres valides.");
    
          const params = new URLSearchParams(url.search);
          const qrInfoBagage = {
            poids: params.get("poids"),
            description: params.get("description"),
          };
    
          setQrDataBagage(qrInfoBagage);
          setModalVisible(true);
    
          setText(
            `Informations du QR Code scanné:\n\n` +
              `Poids: ${qrInfoBagage.poids || "Non défini"} kg\n` +
              `Description: ${qrInfoBagage.description || "Non définie"}`
          );
        } catch (error) {
          console.error("Erreur lors de l'analyse du QR Code :", error);
          Alert.alert("Erreur", "Le QR Code scanné n'est pas valide ou n'est pas une URL.");
          setText(`Données brutes : ${data}`);
        }
      };

      const handleConfirm = () => {
        setModalVisible(false);
        try {
          navigation.navigate("StartAssistance3", { qrDataBagage });
        } catch (error) {
          Alert.alert("Erreur", "Impossible de naviguer vers la page StartAssistance3.");
        }
      };

      const handleCancel = () => {
        setModalVisible(false);
      };

    if (hasPermission === null) {
      <View style={styles.container}>
        <Text>Demande de permission pour la caméra...</Text>
      </View>
    }
    
    if (hasPermission === false) {
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>Accès à la caméra refusé</Text>
        <TouchableOpacity onPress={askForCameraPermission} style={styles.permissionButton}>
          <Text style={styles.permissionButtonText}>Autoriser la caméra</Text>
        </TouchableOpacity>
      </View>
    }

    const [fontsLoaded] = useFonts({
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

    return (
        <View style={styles.container}>
          <Text style={styles.title}>Scanner le ou les QR Code du ou des bagages du PMR</Text>
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
            <Text style={styles.modalTitle}>Informations du QR Code du PMR scanné :</Text>

            {qrDataBagage && (
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>Poids : {qrDataBagage.poids} kg</Text>
                <Text style={styles.modalText}>Description : {qrDataBagage.description}</Text>
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
    };

    // Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 15, // Ajout de padding latéral
  },
  title: {
    fontSize: 20, // Taille réduite
    fontFamily: "RalewayBold",
    color: "#EF4D20",
    marginBottom: 10, // Marge réduite
    textAlign: "center",
    paddingHorizontal: 10, // Prévention du débordement
    lineHeight: 28, // Meilleure lisibilité
  },
  camera: {
    width: "100%",
    height: "40%", // Hauteur relative
    marginVertical: 10, // Espacement ajusté
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
      width: 250, // Taille augmentée
      height: 250,
      borderWidth: 4,
      borderColor: "#EF4D20",
      borderRadius: 10,
      marginTop: 20, // Ajustement position
    },
    resultText: {
      fontSize: 16, // Taille réduite
      color: "#333",
      textAlign: "center",
      marginVertical: 10, // Marge réduite
      paddingHorizontal: 5,
      lineHeight: 22, // Meilleure lisibilité
    },
    scanAgainButton: {
      backgroundColor: "#EF4D20",
      padding: 10, // Padding réduit
      borderRadius: 8,
      width: "80%", // Largeur augmentée
      marginVertical: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3, // Ombre plus subtile
      shadowRadius: 2,
      elevation: 3,
    },
    scanAgainButtonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontFamily: "RalewayExtraBold",
    },
    permissionButton: {
      backgroundColor: "#EF4D20",
      padding: 12,
      borderRadius: 8,
    },
    permissionButtonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontFamily: "RalewayBold",
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
      fontFamily: "RalewayBold",
      color: "#EF4D20",
      marginBottom: 20,
    },
    modalContent: {
      marginBottom: 20,
      textAlign: "center",
    },
    modalText: {
      fontSize: 18,
      fontFamily: "RalewayRegular",
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
      fontFamily: "RalewayExtraBold",
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
      fontFamily: "RalewayExtraBold",
    },
});

export default ScannerQRCodeBagage;