import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from "./components/SplashScreen";
import Login from './components/Login';
import Home from "./components/Home";
import Profile from './components/Profile';
import Settings from './components/Settings';
import Research from './components/Research';
import NavBar from "./components/Navbar";
import scannerQRCode from './components/scannerQRCode';
import scannerQRCodeBaggage from './components/scannerQRCodeBaggage';
import FiltragePAX from './components/FiltragePAX';
import FaceRecognition from './components/FaceRecognition';
import { ThemeProvider } from "./ThemeContext";
import ScannerQRCodeBaggage from './components/scannerQRCodeBaggage';
import ScannerQRCode from './components/scannerQRCode';
import StartAssistance from './components/StartAssistance';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Research" component={Research} options={{ headerShown: false }} />
      <Tab.Screen name="StartAssistance" component={StartAssistance} options={{ headerShown: false }} />
      <Tab.Screen name="QRCode" component={scannerQRCode} options={{ headerShown: false }} />
      <Tab.Screen name="QRCodeBaggage" component={ScannerQRCodeBaggage} options={{ headerShown: false }} />
      <Tab.Screen name="FiltragePAX" component={FiltragePAX} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <Tab.Screen name="FaceRecognition" component={FaceRecognition} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Vérifier si l'utilisateur est connecté
  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        setIsLoggedIn(true);
      }
    };
    checkUser();
  }, []);

  // Fonction pour mettre à jour l'état de connexion
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
          {/* SplashScreen */}
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />

          {/* Login */}
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
          >
            {props => <Login {...props} onLoginSuccess={handleLoginSuccess} />}
          </Stack.Screen>

          {/* Home */}
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />

          {/* Research */}
          <Stack.Screen
            name="Research"
            component={Research}
            options={{ headerShown: false }}
          />

          {/* StartAssistance */}
          <Stack.Screen
            name="StartAssistance"
            component={StartAssistance}
            options={{ headerShown: false }}
          />

          {/* ScannerQRCode */}
          <Stack.Screen
            name="scannerQRCode"
            component={ScannerQRCode}
            options={{ headerShown: false }}
          />

          {/* ScannerQRCodeBaggage */}
          <Stack.Screen
            name="scannerQRCodeBaggage"
            component={ScannerQRCodeBaggage}
            options={{ headerShown: false }}
          />

          {/* Profile */}
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }}
          />

          {/* Settings */}
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>

        {/* NavBar: affichée uniquement si l'utilisateur est connecté */}
        {isLoggedIn && <NavBar />}
      </NavigationContainer>
    </ThemeProvider>
  );
}