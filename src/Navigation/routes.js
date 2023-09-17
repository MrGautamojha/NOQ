import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../Screens/Login";
import PinScreen from "../Screens/PinScreen";
import DeviceSetting from "../Screens/DeviceSetting";
import FunctionalitySettings from "../Screens/FunctionalitiesSettings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "../Screens/SplashScreen";

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer
      theme={{ colors: { background: "#000" } }}
    >
      <Stack.Navigator
        initialRouteName={'splash'}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="splash" component={SplashScreen} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="pinScreen" component={PinScreen} />
        <Stack.Screen name="deviceScreen" component={DeviceSetting} />
        <Stack.Screen name="functionalitySettings" component={FunctionalitySettings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
