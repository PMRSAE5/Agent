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

const ScannerQRCodeBaggage = ({ navigation }) => {
      const [hasPermission, setHasPermission] = useState(null);
    

    useEffect(() => {
        (async () => {
          const { status } = await Camera.requestCameraPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
      }, []);

      const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        console.log('QR Code scanné:', data);


    if (hasPermission === null) {
        return <Text>Demande de permission...</Text>;
      }
    
      if (hasPermission === false) {
        return <Text>Permission de la caméra refusée</Text>;
      }

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
                  ></KeyboardAvoidingView>
                </Modal>
            </View>
          );
        };
    }

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
});

export default ScannerQRCodeBaggage;