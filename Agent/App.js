import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './components/Login';
import Home from "./components/Home";
import Settings from "./components/Settings";
import Research from './components/Research';
import Profile from './components/Profile';
import NavBar from "./components/Navbar";
import QR from './components/QR';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Research" component={Research} options={{ headerShown: false }} />
      <Tab.Screen name="QR" component={QR} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <Tab.Screen name="FaceRecognition" component={FaceRecognition} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [initialRoute, setInitialRoute] = useState("Login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Vérifier si l'utilisateur est connecté
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
      <Stack.Navigator initialRouteName="SplashScreen">
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{ headerShown: false }}
            />
        
        
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
