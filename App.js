import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Login.js"; // Reemplaza con la ruta correcta de tu LoginScreen
import HomeScreen from "./Home.js";
import DeviceDetail from "./DeviceDetail.js";
import DeviceForm from "./DeviceForm.js";
// Reemplaza con la ruta correcta de tu HomeScreen

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Iniciar Sesion" component={LoginScreen} />
        <Stack.Screen name="Inicio" component={HomeScreen} />
        <Stack.Screen name="Alta de Dispositivo" component={DeviceForm} />
        <Stack.Screen
          name="DeviceDetail"
          component={DeviceDetail}
          options={({ route }) => ({ title: `Device ID: ${route.params.id}` })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
