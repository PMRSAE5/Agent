import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './components/Login';
import Research from './components/Research';
import Profile from './components/Profile';
import QR from './components/QR';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Research" component={Research} options={{ headerShown: false }} />
      <Tab.Screen name="QR" component={QR} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [initialRoute, setInitialRoute] = React.useState("Login");

  React.useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        setInitialRoute("Research");
      }
    };
    checkUser();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Research"
          component={Tabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}