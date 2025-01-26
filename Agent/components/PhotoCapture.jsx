import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const PhotoCapture = () => {
  const [photo, setPhoto] = useState(null); // Pour stocker l'URI de la photo
  const [isIdentityVerified, setIsIdentityVerified] = useState(false); // Gestion de la vérification
  const navigation = useNavigation();

  // Demander la permission d'accéder à la caméra
  const requestPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission refusée', 'Vous devez autoriser l\'accès à la caméra pour prendre une photo.');
      return false;
    }
    return true;
  };

  // Prendre une photo
  const takePhoto = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  // Gérer la vérification de l'identité
  const toggleIdentityVerification = () => {
    setIsIdentityVerified(!isIdentityVerified);
  };

  // Naviguer vers AssistanceForm
  const goToAssistanceForm = () => {
    navigation.navigate('StartAssistance4');
  };

  return (
    <View style={styles.container}>
      {photo ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: photo }} style={styles.previewImage} />

          <TouchableOpacity 
            style={[styles.checkboxContainer, isIdentityVerified && styles.checkedContainer]} 
            onPress={toggleIdentityVerification}
          >
            <View style={[styles.checkbox, isIdentityVerified && styles.checked]} />
            <Text style={styles.checkboxText}>J'atteste de l'identité de mon PMR</Text>
          </TouchableOpacity>

          {isIdentityVerified && (
            <View style={styles.validationContainer}>
              <View style={styles.greenCircle} />
              <Text style={styles.validationText}>Identité vérifiée</Text>
            </View>
          )}

          {isIdentityVerified && (
            <TouchableOpacity style={styles.nextButton} onPress={goToAssistanceForm}>
              <Text style={styles.nextButtonText}>Suivant</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
          <Text style={styles.captureButtonText}>Prendre une photo</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: 300,
    height: 400,
    resizeMode: 'contain',
    borderRadius: 10,
    marginBottom: 20,
  },
  captureButton: {
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  captureButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  checkedContainer: {
    borderColor: '#4CAF50',
  },
  checked: {
    backgroundColor: '#4CAF50',
  },
  checkboxText: {
    fontSize: 16,
  },
  validationContainer: {
    alignItems: 'center',
  },
  greenCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4CAF50',
    marginBottom: 10,
  },
  validationText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  nextButton: {
    padding: 15,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default PhotoCapture;
