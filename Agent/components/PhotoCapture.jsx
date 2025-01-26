import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const PhotoCapture = () => {
  const [photos, setPhotos] = useState({
    person: null,
    idCard: null
  });
  const [selectedType, setSelectedType] = useState('person');
  const [isVerified, setIsVerified] = useState(false);
  const navigation = useNavigation();

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission refusée', 'L\'accès à la caméra est nécessaire');
      return false;
    }
    return true;
  };

  const takePhoto = async (type) => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: type === 'person' ? [3, 4] : [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhotos(prev => ({...prev, [type]: result.assets[0].uri}));
    }
  };

  const getMissingPhotoMessage = () => {
    if (!photos.person && photos.idCard) return "Veuillez prendre le portrait du PMR en photo";
    if (photos.person && !photos.idCard) return "Veuillez prendre la carte d'identité en photo";
    return null;
  };

  const toggleVerification = () => setIsVerified(!isVerified);

  const goToNext = () => navigation.navigate('StartAssistance4');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vérification d'identité</Text>

      <View style={styles.selectorContainer}>
        <TouchableOpacity 
          style={[styles.typeButton, selectedType === 'person' && styles.activeType]}
          onPress={() => setSelectedType('person')}>
          <Text style={[styles.typeButtonText, selectedType === 'person' && styles.activeTypeText]}>Portrait</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.typeButton, selectedType === 'idCard' && styles.activeType]}
          onPress={() => setSelectedType('idCard')}>
          <Text style={[styles.typeButtonText, selectedType === 'idCard' && styles.activeTypeText]}>Pièce d'identité</Text>
        </TouchableOpacity>
      </View>

      {/* Message d'avertissement déplacé ici */}
      {getMissingPhotoMessage() && (
        <Text style={styles.warningText}>{getMissingPhotoMessage()}</Text>
      )}

      <View style={styles.photoContainer}>
        {photos[selectedType] ? (
          <View style={styles.previewWrapper}>
            <View style={styles.idFrame}>
              <Image 
                source={{ uri: photos[selectedType] }} 
                style={styles.previewImage} 
                resizeMode="contain"
              />
              <TouchableOpacity
                style={styles.retakeButton}
                onPress={() => takePhoto(selectedType)}>
                <Text style={styles.retakeText}>Reprendre</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.centeredContent}>
            <View style={styles.idFrame}>
              <Text style={styles.helperText}>
                {selectedType === 'person' 
                  ? 'Alignez le visage dans le cadre' 
                  : 'Cadrez la pièce d\'identité'}
              </Text>

              {/* Ajout du message d'avertissement pour le portrait */}
              {selectedType === 'person' && !photos.person && (
                <Text style={styles.privacyWarning}>
                    ⚠️ Attention : Conformément à notre politique de confidentialité,{'\n'} 
                    l'image du PMR ne sera pas conservée après traitement de la demande.
                </Text>
                )}

              <View style={styles.overlay}>
                <View style={styles.guidelineHorizontal} />
                <View style={styles.guidelineVertical} />
              </View>
            </View>
          </View>
        )}

        {!(photos.person && photos.idCard) && (
            <TouchableOpacity 
            style={styles.captureButton} 
            onPress={() => takePhoto(selectedType)}
            activeOpacity={0.7}>
            <Text style={styles.buttonText}>Prendre la photo</Text>
            </TouchableOpacity>
        )}
      </View>

      {photos.person && photos.idCard && (
        <View style={styles.verificationSection}>
          <TouchableOpacity 
            style={[styles.checkboxContainer, isVerified && styles.checkedContainer]} 
            onPress={toggleVerification}
            activeOpacity={0.7}>
            <View style={[styles.checkbox, isVerified && styles.checked]} />
            <Text style={styles.checkboxText}>Je certifie l'authenticité des documents et de l'identité client.</Text>
          </TouchableOpacity>

          {isVerified && (
            <>
              <View style={styles.validationContainer}>
                <View style={styles.validationIcon}>
                  <Text style={styles.validationCheck}>✓</Text>
                </View>
                <Text style={styles.validationText}>Identité validée</Text>
              </View>

              <TouchableOpacity 
                style={styles.nextButton} 
                onPress={goToNext}
                activeOpacity={0.7}>
                <Text style={styles.nextButtonText}>Valider et continuer</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF6F1',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#EF4D20',
    textAlign: 'center',
    marginVertical: 20,
  },
  selectorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  typeButton: {
    padding: 12,
    marginHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#F8D5CC',
  },
  activeType: {
    backgroundColor: '#EF4D20',
  },
  typeButtonText: {
    color: '#333',
    fontWeight: '500',
  },
  activeTypeText: {
    color: '#FFF',
  },
  photoContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  idFrame: {
    width: 250,
    height: 350,
    borderWidth: 2,
    borderColor: '#EF4D20',
    borderRadius: 4,
    backgroundColor: '#fff',
    overflow: 'hidden',
    position: 'relative',
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  helperText: {
    position: 'absolute',
    bottom: 20,
    color: '#EF4D20',
    fontSize: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 8,
    borderRadius: 4,
    textAlign: 'center',
    width: '80%',
  },
  captureButton: {
    backgroundColor: '#EF4D20',
    padding: 18,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  verificationSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    width: '90%',
  },
  checkedContainer: {
    borderColor: '#EF4D20',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    marginRight: 15,
  },
  checked: {
    backgroundColor: '#EF4D20',
    borderColor: '#EF4D20',
  },
  checkboxText: {
    fontSize: 16,
    color: '#555',
    flex: 1,
  },
  nextButton: {
    backgroundColor: '#EF4D20', // Changé depuis '#2196F3'
    padding: 15,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  retakeButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 8,
    borderRadius: 4,
  },
  retakeText: {
    color: 'white',
    fontSize: 12,
  },
  validationContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  validationIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  validationCheck: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  validationText: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  warningText: {
    color: '#EF4D20',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 15,
    width: '100%',
  },
  previewWrapper: {
    alignItems: 'center',
  },
  privacyWarning: {
  position: 'absolute',
  top: '50%', // Centre verticalement
  left: 0,
  right: 0,
  transform: [{ translateY: -50 }], // Ajustement précis du centrage
  color: '#EF4D20',
  fontSize: 12,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  padding: 10,
  borderRadius: 4,
  textAlign: 'center',
  marginHorizontal: 20,
  lineHeight: 16,
},
});

export default PhotoCapture;