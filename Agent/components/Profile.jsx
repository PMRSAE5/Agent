import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Switch,
  Image,
  Modal,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { Picker } from '@react-native-picker/picker'; // Mise à jour de l'importation
import { useColorScheme } from "react-native"; // Importation de useColorScheme

export default function Profile() {
  const [form, setForm] = useState({
    darkMode: false,
    emailNotifications: true,
    pushNotifications: false,
    selectedLanguage: "en", // langue par défaut en anglais
  });

  const [isModalVisible, setModalVisible] = useState(false); // Pour la fenêtre modale de sélection de langue

  // Utilisation de useColorScheme pour détecter le mode sombre ou clair
  const systemDarkMode = useColorScheme() === 'dark';

  // Fonction pour gérer la sélection de la langue
  const handleLanguageChange = (language) => {
    setForm({ ...form, selectedLanguage: language });
    setModalVisible(false); // Ferme la fenêtre modale après sélection
  };

  // Déterminer si le mode sombre est activé, en priorisant l'état de `darkMode`
  const isDarkMode = form.darkMode || systemDarkMode;

  const handleLogout = () => {
    // Action de déconnexion
    console.log("Déconnexion effectuée !");
  };

  return (
    <SafeAreaView
      style={[
        { flex: 1 },
        isDarkMode ? styles.darkContainer : styles.lightContainer,
      ]}
    >
      <View style={styles.profile}>
        <TouchableOpacity onPress={() => {}}>
          <View style={styles.profileAvatarWrapper}>
            <Image
              alt=""
              source={{
                uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80",
              }}
              style={styles.profileAvatar}
            />

            <TouchableOpacity onPress={() => {}}>
              <View style={styles.profileAction}>
                <FeatherIcon color="#fff" name="edit-3" size={15} />
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <View>
          <Text style={styles.profileName}>Youssef Boughrara</Text>
          <Text style={styles.profileAddress}>
            123 Maple Street. Anytown, PA 17101
          </Text>
        </View>
      </View>

      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          {/* Langue */}
          <TouchableOpacity
            onPress={() => setModalVisible(true)} // Affiche la modale pour sélectionner la langue
            style={styles.row}
          >
            <View style={[styles.rowIcon, { backgroundColor: "#fe9400" }]}>
              <FeatherIcon color="#fff" name="globe" size={20} />
            </View>
            <Text style={styles.rowLabel}>Language</Text>
            <View style={styles.rowSpacer} />
            <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
          </TouchableOpacity>

          {/* Dark Mode */}
          <View style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: "#007afe" }]}>
              <FeatherIcon color="#fff" name="moon" size={20} />
            </View>
            <Text style={styles.rowLabel}>Dark Mode</Text>
            <View style={styles.rowSpacer} />
            <Switch
              onValueChange={(darkMode) => setForm({ ...form, darkMode })}
              value={form.darkMode}
            />
          </View>

          {/* Email Notifications */}
          <View style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: "#38C959" }]}>
              <FeatherIcon color="#fff" name="at-sign" size={20} />
            </View>
            <Text style={styles.rowLabel}>Email Notifications</Text>
            <View style={styles.rowSpacer} />
            <Switch
              onValueChange={(emailNotifications) =>
                setForm({ ...form, emailNotifications })
              }
              value={form.emailNotifications}
            />
          </View>

          {/* Push Notifications */}
          <View style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: "#38C959" }]}>
              <FeatherIcon color="#fff" name="bell" size={20} />
            </View>
            <Text style={styles.rowLabel}>Push Notifications</Text>
            <View style={styles.rowSpacer} />
            <Switch
              onValueChange={(pushNotifications) =>
                setForm({ ...form, pushNotifications })
              }
              value={form.pushNotifications}
            />
          </View>
        </View>
      </ScrollView>

      {/* Modale de sélection de la langue */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Language</Text>
            <Picker
              selectedValue={form.selectedLanguage}
              style={styles.picker}
              onValueChange={handleLanguageChange}
            >
              <Picker.Item label="English" value="en" />
              <Picker.Item label="Français" value="fr" />
              <Picker.Item label="Español" value="es" />
            </Picker>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Bouton de déconnexion */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Déconnexion</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  lightContainer: {
    backgroundColor: "#fff",
  },
  darkContainer: {
    backgroundColor: "#333",
  },
  profile: {
    padding: 24,
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  profileAvatarWrapper: {
    position: "relative",
  },
  profileAvatar: {
    width: 72,
    height: 72,
    borderRadius: 9999,
  },
  profileAction: {
    position: "absolute",
    right: -4,
    bottom: -10,
    alignItems: "center",
    justifyContent: "center",
    width: 28,
    height: 28,
    borderRadius: 9999,
    backgroundColor: "#007bff",
  },
  profileName: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: "600",
    color: "#414d63",
    textAlign: "center",
  },
  profileAddress: {
    marginTop: 5,
    fontSize: 16,
    color: "#989898",
    textAlign: "center",
  },
  section: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    paddingVertical: 12,
    fontSize: 12,
    fontWeight: "600",
    color: "#9e9e9e",
    textTransform: "uppercase",
    letterSpacing: 1.1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 50,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rowLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4c4c4c",
    flex: 1,
  },
  rowSpacer: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  picker: {
    height: 150,
    width: "100%",
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ff0000",
  },
  logoutButtonText: {
    color: "#ff0000",
    fontSize: 16,
    fontWeight: "600",
  },
});
