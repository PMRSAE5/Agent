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
import Research from './components/Research';
import NavBar from "./components/Navbar";
import AssistanceForm from './components/AssistanceForm';
import ScannerQRCode from './components/ScannerQRCode';
import ScannerQRCodeBagage from './components/ScannerQRCodeBagage';
import StartAssistance from './components/StartAssistance';
import StartAssistance2 from './components/StartAssistance2';
import PhotoCapture from './components/PhotoCapture';
import { ThemeProvider, ThemeContext } from "./ThemeContext";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Research" component={Research} options={{ headerShown: false }} />
      <Tab.Screen name="StartAssistance" component={StartAssistance} options={{ headerShown: false }} />
      <Tab.Screen name="QRCode" component={ScannerQRCode} options={{ headerShown: false }} />
      <Tab.Screen name="QRCodeBagage" component={ScannerQRCodeBagage} options={{ headerShown: false }} />
      <Tab.Screen name="StartAssistance2" component={StartAssistance2} options={{ headerShown: false }} />
      <Tab.Screen name="QRCodeBagage" component={ScannerQRCodeBagage} options={{ headerShown: false }} />
      <Tab.Screen name="PhotoCapture" component={PhotoCapture} options={{ headerShown: false }} />
      <Tab.Screen name="AssistanceForm" component={AssistanceForm} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
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
            component={Login}
            options={{ headerShown: false }}
          />
          {/* Home */}
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          {/* Tabs */}
          <Stack.Screen
            name="Tabs"
            component={Tabs}
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
            name="ScannerQRCode"
            component={ScannerQRCode}
            options={{ headerShown: false }}
          />

          {/* StartAssistance2 */}
          <Stack.Screen
            name="StartAssistance2"
            component={StartAssistance2}
            options={{ headerShown: false }}
          />

          {/* ScannerQRCodeBagage */}
          <Stack.Screen
            name="ScannerQRCodeBagage"
            component={ScannerQRCodeBagage}
            options={{ headerShown: false }}
          />

          {/* PhotoCapture */}
          <Stack.Screen
            name="PhotoCapture"
            component={PhotoCapture}
            options={{ headerShown: false }}
          />

          {/* AssistanceForm */}
          <Stack.Screen
            name="AssistanceForm"
            component={AssistanceForm}
            options={{ headerShown: false }}
          />

          {/* Profile */}
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }}
          />     
        </Stack.Navigator>
        {/* NavBar: affichée uniquement si l'utilisateur est connecté */}
        {isLoggedIn && <NavBar />}
      </NavigationContainer>
    </ThemeProvider>
  );
}