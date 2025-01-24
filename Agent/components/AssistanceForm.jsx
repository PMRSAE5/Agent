import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, Alert, StyleSheet, TouchableOpacity } from "react-native";

const AssistanceForm = ({ navigation }) => {
  const [currentSection, setCurrentSection] = useState(1); // État pour suivre la section actuelle
  const [pmrName, setPmrName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [luggageCount, setLuggageCount] = useState(0); // Nombre de bagages
  const [isIdentityVerified, setIsIdentityVerified] = useState(false);
  const [isLuggageCompliant, setIsLuggageCompliant] = useState(false);
  const [isLuggageDeposited, setIsLuggageDeposited] = useState(false);
  const [isPmrSeated, setIsPmrSeated] = useState(false);
  const [hasSpecificNeeds, setHasSpecificNeeds] = useState(null); // Oui/Non pour les besoins spécifiques
  const [specificNeeds, setSpecificNeeds] = useState(""); // Détails des besoins spécifiques
  const [isStaffInformed, setIsStaffInformed] = useState(false);
  const [isLuggageWeightCompliant, setIsLuggageWeightCompliant] = useState(false);
  const [errors, setErrors] = useState({}); // État pour gérer les erreurs de validation

  // Fonction pour valider les champs obligatoires
  const validateFields = () => {
    const newErrors = {};

    if (currentSection === 1) {
      if (!pmrName.trim()) newErrors.pmrName = "Champ obligatoire";
      if (!idNumber.trim()) newErrors.idNumber = "Champ obligatoire";
      if (!contactInfo.trim()) newErrors.contactInfo = "Champ obligatoire";
      if (luggageCount < 0) newErrors.luggageCount = "Nombre de bagages invalide";
      if (!isIdentityVerified) newErrors.isIdentityVerified = "Champ obligatoire";
      if (!isLuggageCompliant) newErrors.isLuggageCompliant = "Champ obligatoire";
      if (!isLuggageWeightCompliant) newErrors.isLuggageWeightCompliant = "Champ obligatoire";
    } else if (currentSection === 2) {
      if (!isLuggageDeposited) newErrors.isLuggageDeposited = "Champ obligatoire";
      if (!isPmrSeated) newErrors.isPmrSeated = "Champ obligatoire";
      if (hasSpecificNeeds === null) newErrors.hasSpecificNeeds = "Champ obligatoire";
      if (hasSpecificNeeds === true) {
        if (!specificNeeds.trim()) newErrors.specificNeeds = "Champ obligatoire";
        if (!isStaffInformed) newErrors.isStaffInformed = "Champ obligatoire";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retourne true si aucune erreur
  };

  // Fonction pour passer à la section suivante
  const handleNext = () => {
    if (validateFields()) {
      setCurrentSection(currentSection + 1);
    }
  };

  // Fonction pour soumettre le formulaire
  const handleSubmit = () => {
    if (validateFields()) {
      const formData = {
        pmrName,
        idNumber,
        contactInfo,
        luggageCount,
        isIdentityVerified,
        isLuggageCompliant,
        isLuggageDeposited,
        isPmrSeated,
        hasSpecificNeeds,
        specificNeeds,
        isStaffInformed,
        isLuggageWeightCompliant,
      };
      console.log("Données du formulaire :", formData);

      Alert.alert(
        "Merci !",
        "Merci d'avoir assisté nos PMR.",
        [
          {
            text: "Retour à de nouvelles aventures",
            onPress: () => navigation.navigate("Home"),
          },
        ],
        { cancelable: false }
      );
    }
  };

  // Fonction pour modifier le nombre de bagages
  const incrementLuggageCount = () => {
    setLuggageCount((prevCount) => prevCount + 1);
  };

  const decrementLuggageCount = () => {
    if (luggageCount > 0) {
      setLuggageCount((prevCount) => prevCount - 1);
    }
  };

  // Fonction pour afficher dynamiquement les sections
  const renderSection = () => {
    switch (currentSection) {
      case 1:
        return (
          <View>
            <Text style={styles.sectionTitle}>Section 1 : Identité</Text>
            <View style={styles.section}>
              <Text>Nom complet du PMR :</Text>
              <TextInput
                style={[styles.input, errors.pmrName && styles.errorInput]}
                value={pmrName}
                onChangeText={(text) => {
                  setPmrName(text);
                  setIsIdentityVerified(!!text.trim()); // Cocher automatiquement la case
                }}
              />
              {errors.pmrName && <Text style={styles.errorText}>{errors.pmrName}</Text>}

              <Text>Numéro de pièce d'identité :</Text>
              <TextInput
                style={[styles.input, errors.idNumber && styles.errorInput]}
                value={idNumber}
                onChangeText={(text) => {
                  setIdNumber(text);
                  setIsIdentityVerified(!!text.trim()); // Cocher automatiquement la case
                }}
              />
              {errors.idNumber && <Text style={styles.errorText}>{errors.idNumber}</Text>}

              <Text>Contact du PMR (téléphone/email) :</Text>
              <TextInput
                style={[styles.input, errors.contactInfo && styles.errorInput]}
                value={contactInfo}
                onChangeText={(text) => {
                  setContactInfo(text);
                  setIsIdentityVerified(!!text.trim()); // Cocher automatiquement la case
                }}
              />
              {errors.contactInfo && <Text style={styles.errorText}>{errors.contactInfo}</Text>}

              <Text>Nombre de bagages :</Text>
              <View style={styles.luggageContainer}>
                <TouchableOpacity onPress={decrementLuggageCount} style={styles.arrowButton}>
                  <Text style={styles.arrowText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.luggageCountText}>{luggageCount}</Text>
                <TouchableOpacity onPress={incrementLuggageCount} style={styles.arrowButton}>
                  <Text style={styles.arrowText}>+</Text>
                </TouchableOpacity>
              </View>
              {errors.luggageCount && <Text style={styles.errorText}>{errors.luggageCount}</Text>}

              <View style={styles.checkboxContainer}>
                <TouchableOpacity
                  style={[styles.checkbox, isIdentityVerified && styles.checked]}
                  onPress={() => setIsIdentityVerified(!isIdentityVerified)}
                />
                <Text>Je confirme avoir vérifié l'identité du PMR.</Text>
              </View>
              {errors.isIdentityVerified && <Text style={styles.errorText}>{errors.isIdentityVerified}</Text>}

              <View style={styles.checkboxContainer}>
                <TouchableOpacity
                  style={[styles.checkbox, isLuggageCompliant && styles.checked]}
                  onPress={() => setIsLuggageCompliant(!isLuggageCompliant)}
                />
                <Text>Je confirme que le nombre de bagages est conforme.</Text>
              </View>
              {errors.isLuggageCompliant && <Text style={styles.errorText}>{errors.isLuggageCompliant}</Text>}

              <View style={styles.checkboxContainer}>
                <TouchableOpacity
                  style={[styles.checkbox, isLuggageWeightCompliant && styles.checked]}
                  onPress={() => setIsLuggageWeightCompliant(!isLuggageWeightCompliant)}
                />
                <Text>Le poids des bagages est conforme à la réglementation.</Text>
              </View>
              {errors.isLuggageWeightCompliant && <Text style={styles.errorText}>{errors.isLuggageWeightCompliant}</Text>}
            </View>
          </View>
        );
      case 2:
        return (
          <View>
            <Text style={styles.sectionTitle}>Section 2 : Accompagnement</Text>
            <View style={styles.section}>
              <View style={styles.checkboxContainer}>
                <TouchableOpacity
                  style={[styles.checkbox, isLuggageDeposited && styles.checked]}
                  onPress={() => setIsLuggageDeposited(!isLuggageDeposited)}
                />
                <Text>J'ai déposé les bagages aux emplacements prévus.</Text>
              </View>
              {errors.isLuggageDeposited && <Text style={styles.errorText}>{errors.isLuggageDeposited}</Text>}

              <View style={styles.checkboxContainer}>
                <TouchableOpacity
                  style={[styles.checkbox, isPmrSeated && styles.checked]}
                  onPress={() => setIsPmrSeated(!isPmrSeated)}
                />
                <Text>J'ai accompagné le PMR jusqu'à sa place.</Text>
              </View>
              {errors.isPmrSeated && <Text style={styles.errorText}>{errors.isPmrSeated}</Text>}

              <Text>Besoins spécifiques ?</Text>
              <View style={styles.yesNoContainer}>
                <TouchableOpacity
                  style={[styles.yesNoButton, hasSpecificNeeds === true && styles.selectedButton]}
                  onPress={() => setHasSpecificNeeds(true)}
                >
                  <Text style={styles.yesNoText}>Oui</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.yesNoButton, hasSpecificNeeds === false && styles.selectedButton]}
                  onPress={() => setHasSpecificNeeds(false)}
                >
                  <Text style={styles.yesNoText}>Non</Text>
                </TouchableOpacity>
              </View>
              {errors.hasSpecificNeeds && <Text style={styles.errorText}>{errors.hasSpecificNeeds}</Text>}

              {hasSpecificNeeds === true && (
                <>
                  <Text>Détails des besoins spécifiques :</Text>
                  <TextInput
                    style={[styles.input, errors.specificNeeds && styles.errorInput]}
                    value={specificNeeds}
                    onChangeText={setSpecificNeeds}
                    multiline
                  />
                  {errors.specificNeeds && <Text style={styles.errorText}>{errors.specificNeeds}</Text>}

                  <View style={styles.checkboxContainer}>
                    <TouchableOpacity
                      style={[styles.checkbox, isStaffInformed && styles.checked]}
                      onPress={() => setIsStaffInformed(!isStaffInformed)}
                    />
                    <Text>J'ai informé le personnel des besoins spécifiques.</Text>
                  </View>
                  {errors.isStaffInformed && <Text style={styles.errorText}>{errors.isStaffInformed}</Text>}
                </>
              )}
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Formulaire d'Assistance</Text>
        {renderSection()}
        <View style={styles.navigationButtons}>
          {currentSection > 1 && (
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => setCurrentSection(currentSection - 1)}
            >
              <Text style={styles.navButtonText}>Précédent</Text>
            </TouchableOpacity>
          )}
          {currentSection < 2 && (
            <TouchableOpacity
              style={styles.navButton}
              onPress={handleNext}
            >
              <Text style={styles.navButtonText}>Suivant</Text>
            </TouchableOpacity>
          )}
          {currentSection === 2 && (
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Envoyer</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#FFF6F1",
    justifyContent: "center",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#EF4D20",
    marginBottom: 20,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#EF4D20",
    marginBottom: 10,
  },
  section: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#EF4D20",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  luggageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  arrowButton: {
    backgroundColor: "#EF4D20",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  arrowText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  luggageCountText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#EF4D20",
    borderRadius: 4,
    marginRight: 10,
  },
  checked: {
    backgroundColor: "#EF4D20",
  },
  yesNoContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  yesNoButton: {
    backgroundColor: "#EF4D20",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    flex: 1,
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#FFA07A", // Couleur différente pour le bouton sélectionné
  },
  yesNoText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  navButton: {
    backgroundColor: "#EF4D20",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  navButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#EF4D20",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default AssistanceForm;