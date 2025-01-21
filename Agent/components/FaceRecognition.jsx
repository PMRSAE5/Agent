import React, { useEffect, useRef, useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import * as faceapi from 'face-api.js';

const FaceRecognition = () => {
  const cameraRef = useRef(null);
  const [faceDetected, setFaceDetected] = useState(false);
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    // Charger les modèles de reconnaissance faciale
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models').then(() => {
      console.log("Models loaded successfully");
    });
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const data = await cameraRef.current.takePictureAsync();
      setImageUri(data.uri);
      detectFace(data.uri);
    }
  };

  const detectFace = async (imageUri) => {
    const img = await faceapi.fetchImage(imageUri);
    const detections = await faceapi.detectAllFaces(img);

    if (detections.length > 0) {
      setFaceDetected(true);
      console.log("Face detected!");
    } else {
      setFaceDetected(false);
      console.log("No face detected.");
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.camera}
        type={RNCamera.Constants.Type.front}
        captureAudio={false}
      />
      <Button title="Capture Face" onPress={takePicture} />
      {faceDetected && <Text>Face Detected! Ready to proceed.</Text>}
      {imageUri && <Text>Captured Image: {imageUri}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
});

export default FaceRecognition;
