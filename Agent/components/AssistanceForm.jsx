import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Alert,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated,
  Easing,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons"; // Pour les icônes

const AssistanceForm = () => {
  const navigation = useNavigation();

  // États pour le formulaire
  const [isLuggageDeposited, setIsLuggageDeposited] = useState(false); // Bagages déposés
  const [isPmrSeated, setIsPmrSeated] = useState(false); // PMR installé
  const [hasSpecificNeeds, setHasSpecificNeeds] = useState(null); // Besoins spécifiques
  const [specificNeeds, setSpecificNeeds] = useState(""); // Détails des besoins spécifiques
  const [isStaffInformed, setIsStaffInformed] = useState(false); // Personnel informé
  const [isFeedbackPositive, setIsFeedbackPositive] = useState(null); // Feedback positif ou négatif
  const [feedbackDetails, setFeedbackDetails] = useState(""); // Détails du feedback
  const [errors, setErrors] = useState({}); // Erreurs de validation
  
  const errorAnim = new Animated.Value(0); // Animation pour les erreurs

  // Fonction pour valider les champs obligatoires
  const validateFields = () => {
    const newErrors = {};

    if (!isLuggageDeposited) newErrors.isLuggageDeposited = "Champ obligatoire";
    if (!isPmrSeated) newErrors.isPmrSeated = "Champ obligatoire";
    if (hasSpecificNeeds === null) newErrors.hasSpecificNeeds = "Champ obligatoire";
    if (hasSpecificNeeds === true && !specificNeeds.trim()) newErrors.specificNeeds = "Champ obligatoire";
    if (hasSpecificNeeds === true && !isStaffInformed) newErrors.isStaffInformed = "Champ obligatoire";
    if (isFeedbackPositive === null) newErrors.isFeedbackPositive = "Champ obligatoire";

    setErrors(newErrors);

    // Animation des erreurs
    if (Object.keys(newErrors).length > 0) {
      Animated.sequence([
        Animated.timing(errorAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
        Animated.timing(errorAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start();
    }

    return Object.keys(newErrors).length === 0; // Retourne true si aucune erreur
  };

  // Fonction pour soumettre le formulaire
  const handleSubmit = () => {
    if (validateFields()) {
      const formData = {
        isLuggageDeposited,
        isPmrSeated,
        hasSpecificNeeds,
        specificNeeds,
        isStaffInformed,
        isFeedbackPositive,
        feedbackDetails,
      };

      console.log("Données du formulaire :", formData);

      // Redirection vers la page EndAssistance
      navigation.navigate("EndAssistance");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Clôturer l'accompagnement</Text>

      {/* Section : Validation de l'accompagnement */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Validation de l'accompagnement</Text>

        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setIsLuggageDeposited(!isLuggageDeposited)}
        >
          <MaterialIcons
            name={isLuggageDeposited ? "check-box" : "check-box-outline-blank"}
            size={24}
            color={isLuggageDeposited ? "#EF4D20" : "#4A5568"}
          />
          <Text style={styles.label}>Les bagages ont été déposés aux emplacements prévus.</Text>
        </TouchableOpacity>
        {errors.isLuggageDeposited && (
          <Animated.Text
            style={[styles.errorText, { opacity: errorAnim }]}
          >
            {errors.isLuggageDeposited}
          </Animated.Text>
        )}

        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setIsPmrSeated(!isPmrSeated)}
        >
          <MaterialIcons
            name={isPmrSeated ? "check-box" : "check-box-outline-blank"}
            size={24}
            color={isPmrSeated ? "#EF4D20" : "#4A5568"}
          />
          <Text style={styles.label}>Le PMR a été accompagné jusqu'à sa place.</Text>
        </TouchableOpacity>
        {errors.isPmrSeated && (
          <Animated.Text
            style={[styles.errorText, { opacity: errorAnim }]}
          >
            {errors.isPmrSeated}
          </Animated.Text>
        )}
      </View>

      {/* Section : Besoins spécifiques */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Besoins spécifiques</Text>

        <Text style={styles.label}>Le PMR avait-il des besoins spécifiques ?</Text>
        <View style={styles.yesNoContainer}>
          <TouchableOpacity
            style={[styles.yesNoButton, hasSpecificNeeds === true && styles.selectedButton]}
            onPress={() => setHasSpecificNeeds(true)}
          >
            <MaterialIcons name="check" size={20} color="#FFFFFF" />
            <Text style={styles.yesNoText}>Oui</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.yesNoButton, hasSpecificNeeds === false && styles.selectedButton]}
            onPress={() => setHasSpecificNeeds(false)}
          >
            <MaterialIcons name="close" size={20} color="#FFFFFF" />
            <Text style={styles.yesNoText}>Non</Text>
          </TouchableOpacity>
        </View>
        {errors.hasSpecificNeeds && (
          <Animated.Text
            style={[styles.errorText, { opacity: errorAnim }]}
          >
            {errors.hasSpecificNeeds}
          </Animated.Text>
        )}

        {hasSpecificNeeds === true && (
          <>
            <Text style={styles.label}>Détails des besoins spécifiques :</Text>
            <TextInput
              style={[styles.input, errors.specificNeeds && styles.errorInput]}
              value={specificNeeds}
              onChangeText={setSpecificNeeds}
              multiline
              placeholder="Exemple : Le PMR a besoin d'une assistance pour monter dans le train."
              placeholderTextColor="#A5A5A5"
            />
            {errors.specificNeeds && (
              <Animated.Text
                style={[styles.errorText, { opacity: errorAnim }]}
              >
                {errors.specificNeeds}
              </Animated.Text>
            )}

            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setIsStaffInformed(!isStaffInformed)}
            >
              <MaterialIcons
                name={isStaffInformed ? "check-box" : "check-box-outline-blank"}
                size={24}
                color={isStaffInformed ? "#EF4D20" : "#4A5568"}
              />
              <Text style={styles.label}>Le personnel a été informé des besoins spécifiques.</Text>
            </TouchableOpacity>
            {errors.isStaffInformed && (
              <Animated.Text
                style={[styles.errorText, { opacity: errorAnim }]}
              >
                {errors.isStaffInformed}
              </Animated.Text>
            )}
          </>
        )}
      </View>

      {/* Section : Feedback */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Feedback</Text>

        <Text style={styles.label}>L'accompagnement s'est-il bien déroulé ?</Text>
        <View style={styles.yesNoContainer}>
          <TouchableOpacity
            style={[styles.yesNoButton, isFeedbackPositive === true && styles.selectedButton]}
            onPress={() => setIsFeedbackPositive(true)}
          >
            <MaterialIcons name="check" size={20} color="#FFFFFF" />
            <Text style={styles.yesNoText}>Oui</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.yesNoButton, isFeedbackPositive === false && styles.selectedButton]}
            onPress={() => setIsFeedbackPositive(false)}
          >
            <MaterialIcons name="close" size={20} color="#FFFFFF" />
            <Text style={styles.yesNoText}>Non</Text>
          </TouchableOpacity>
        </View>
        {errors.isFeedbackPositive && (
          <Animated.Text
            style={[styles.errorText, { opacity: errorAnim }]}
          >
            {errors.isFeedbackPositive}
          </Animated.Text>
        )}

        {isFeedbackPositive === false && (
          <>
            <Text style={styles.label}>Détails du feedback :</Text>
            <TextInput
              style={[styles.input, errors.feedbackDetails && styles.errorInput]}
              value={feedbackDetails}
              onChangeText={setFeedbackDetails}
              multiline
              placeholder="Exemple : Le PMR a rencontré des difficultés pour accéder au train."
              placeholderTextColor="#A5A5A5"
            />
            {errors.feedbackDetails && (
              <Animated.Text
                style={[styles.errorText, { opacity: errorAnim }]}
              >
                {errors.feedbackDetails}
              </Animated.Text>
            )}
          </>
        )}
      </View>

      {/* Bouton de soumission */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Clôturer l'accompagnement</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF6F1",
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontFamily: "RalewayExtraBold",
    color: "#EF4D20",
    marginBottom: 16,
    textAlign: "center",
  },
  section: {
    width: "100%",
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "RalewayBold",
    color: "#EF4D20",
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontFamily: "RalewayRegular",
    color: "#4A5568",
    marginBottom: 8,
    marginLeft: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  yesNoContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  yesNoButton: {
    backgroundColor: "#EF4D20",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  selectedButton: {
    backgroundColor: "#FFA07A",
  },
  yesNoText: {
    color: "#FFFFFF",
    fontFamily: "RalewayBold",
    fontSize: 16,
    marginLeft: 5,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#EF4D20",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    backgroundColor: "#FFFFFF",
    fontFamily: "RalewayRegular",
    fontSize: 16,
    color: "#4A5568",
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    fontFamily: "RalewayRegular",
    marginBottom: 8,
  },
  submitButton: {
    backgroundColor: "#EF4D20",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontFamily: "RalewayExtraBold",
    fontSize: 16,
  },
});

export default AssistanceForm;