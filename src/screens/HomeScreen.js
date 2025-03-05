// src/screens/HomeScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // 👈 Importa useNavigation
import LoginForm from '../components/LoginForm';

const HomeScreen = () => {
  const navigation = useNavigation(); // 👈 Usa el hook

  const handleLogin = (user) => {
    navigation.navigate('HomeUsuario', { user }); // 👈 Nombre exacto de la pantalla
  };

  return (
    <View style={styles.container}>
      <LoginForm onLogin={handleLogin} />
    </View>
  );
};

// 👇 Define los estilos aquí
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default HomeScreen;