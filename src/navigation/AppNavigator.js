// src/navigation/AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import HomeUsuario from '../screens/HomeUsuario'; // 👈 Importa correctamente

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        {/* Pantalla de Splash */}
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        {/* Pantalla de Inicio (sin título) */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }} // Ocultar el encabezado
        />
        {/* Pantalla de Usuario (sin título) */}
        <Stack.Screen
          name="HomeUsuario"
          component={HomeUsuario}
          options={{ headerShown: false }} // Ocultar el encabezado
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;