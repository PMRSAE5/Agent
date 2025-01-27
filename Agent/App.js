import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from "./components/SplashScreen";
import Login from './components/Login';
import Home from "./components/Home";
import Profile from './components/Profile';
import Research from './components/Research';
import NavBar from "./components/Navbar";
import AssistanceForm from './components/AssistanceForm';
import ScannerQRCode from './components/scannerQRCode';
import ScannerQRCodeBagage from './components/ScannerQRCodeBagage';
import StartAssistance from './components/StartAssistance';
import StartAssistance2 from './components/StartAssistance2';
import StartAssistance3 from './components/StartAssistance3';
import StartAssistance4 from './components/StartAssistance4';

import TripInProgress from './components/TripInProgress';
import PhotoCapture from './components/PhotoCapture';
import EndAssistance from './components/EndAssistance';
import { ThemeProvider, ThemeContext } from "./ThemeContext";

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("SplashScreen");

  // Vérifier si l'utilisateur est connecté
  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        setIsLoggedIn(!!user);
      }
    };
    checkUser();
  }, []);

  // Empêche l'accès à la `NavBar` si l'utilisateur n'est pas connecté
  const shouldDisplayNavBar = isLoggedIn && currentScreen !== "Login";

  return (
    <ThemeProvider>
      <NavigationContainer
      onStateChange={(state) => {
        const currentRoute = state.routes[state.index];
        setCurrentScreen(currentRoute.name);
      }}
      >
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
            component={(props) => (
              <Login {...props} onLoginSuccess={() => setIsLoggedIn(true)} />
            )}
            options={{ headerShown: false }}
          />
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

          {/* StartAssistance3 */}
          <Stack.Screen
            name="StartAssistance3"
            component={StartAssistance3}
            options={{ headerShown: false }}
          />

          {/* PhotoCapture */}
          <Stack.Screen
            name="PhotoCapture"
            component={PhotoCapture}
            options={{ headerShown: false }}
          />

          {/* StartAssistance4 */}
          <Stack.Screen
            name="StartAssistance4"
            component={StartAssistance4}
            options={{ headerShown: false }}
          />

          {/* TripInProgress */}
          <Stack.Screen
            name="TripInProgress"
            component={TripInProgress}
            options={{ headerShown: false }}
          />

          {/* AssistanceForm */}
          <Stack.Screen
            name="AssistanceForm"
            component={AssistanceForm}
            options={{ headerShown: false }}
          />

          {/* EndAssistance */}
          <Stack.Screen
            name="EndAssistance"
            component={EndAssistance}
            options={{ headerShown: false }}
          />

          {/* Profile */}
          <Stack.Screen
            name="Profile"
            component={(props) => (
              <Profile
                {...props}
                onLogout={() => {
                  setIsLoggedIn(false);
                  props.navigation.replace("Login");
                }}
              />
            )}
            options={{ headerShown: false }}
          />     
        </Stack.Navigator>
        {/* NavBar: affichée uniquement si l'utilisateur est connecté */}
        {shouldDisplayNavBar && <NavBar />}
      </NavigationContainer>
    </ThemeProvider>
  );
}