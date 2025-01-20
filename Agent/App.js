import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "./components/Login";
import Home from "./components/Home";
import Research from "./components/Research";
import Profile from "./components/Profile";
import QR from "./components/QR";
import Settings from "./components/Settings";
import NavBar from "./components/Navbar";

const Stack = createStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState("Login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        setInitialRoute("Home");
        setIsLoggedIn(true);
      }
    };
    checkUser();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        {/* Login */}
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
        >
          {(props) => (
            <Login
              {...props}
              onLoginSuccess={() => {
                setIsLoggedIn(true);
                setInitialRoute("Home");
              }}
            />
          )}
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

        {/* QR */}
        <Stack.Screen
          name="QR"
          component={QR}
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
  );
}