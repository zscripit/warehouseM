// src/screens/SplashScreen.js
import React, { useEffect, useRef } from 'react';
import { View, Image, Animated, StyleSheet, Dimensions } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Valor inicial de opacidad: 0

  useEffect(() => {
    // Animación de entrada
    Animated.timing(fadeAnim, {
      toValue: 1, // Opacidad final: 1
      duration: 2000, // Duración de la animación en milisegundos
      useNativeDriver: true, // Mejora el rendimiento
    }).start(() => {
      // Después de la animación, navegar a la siguiente pantalla
      setTimeout(() => {
        navigation.replace('Home'); // Reemplaza 'Home' con el nombre de tu pantalla principal
      }, 1000); // Espera 1 segundo antes de navegar
    });
  }, [fadeAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../assets/warehouse.png')} // Ruta de tu imagen
        style={[styles.image, { opacity: fadeAnim }]} // Aplicar la animación de opacidad
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Color de fondo
  },
  image: {
    width: Dimensions.get('window').width * 0.7, // Tamaño de la imagen (70% del ancho de la pantalla)
    height: undefined,
    aspectRatio: 1, // Mantener proporciones de la imagen
  },
});

export default SplashScreen;