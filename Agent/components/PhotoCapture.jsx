import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';

const PhotoCapture = () => {
  const [hasPermission, setHasPermission] = useState(null); // Permission pour utiliser la caméra
  const [photo, setPhoto] = useState(null); // Photo capturée
  const [isValidated, setIsValidated] = useState(false); // État de validation
  const cameraRef = useRef(null); // Référence à la caméra

  // Demander la permission d'utiliser la caméra
  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Fonction pour capturer une photo
  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhoto(photo.uri); // Enregistrer l'URI de la photo
      setIsValidated(true); // Simuler une validation
    }
  };

  // Si la permission n'est pas accordée
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Accès à la caméra refusé</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Validation de l'identité du PMR</Text>

      {!photo ? (
        <Camera style={styles.camera} ref={cameraRef}>
          <View style={styles.cameraButtonContainer}>
            <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
              <Text style={styles.captureButtonText}>Prendre une photo</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <View style={styles.previewContainer}>
          <Image source={{ uri: photo }} style={styles.capturedImage} />
          {isValidated && (
            <View style={styles.validationContainer}>
              <View style={styles.greenCircle} />
              <Text style={styles.validationText}>Identité du PMR validé</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  camera: {
    width: '100%',
    height: '70%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cameraButtonContainer: {
    marginBottom: 20,
  },
  captureButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
  },
  captureButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  previewContainer: {
    alignItems: 'center',
  },
  capturedImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  validationContainer: {
    alignItems: 'center',
  },
  greenCircle: {
    width: 50,
    height: 50,
    backgroundColor: 'green',
    borderRadius: 25,
    marginBottom: 10,
  },
  validationText: {
    fontSize: 18,
    color: 'green',
  },
});

export default PhotoCapture;