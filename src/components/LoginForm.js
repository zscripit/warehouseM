// src/components/LoginForm.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const LoginForm = ({ onLogin }) => {
  const [correo, setCorreo] = useState('');
  const [contra, setContra] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!correo || !contra) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await fetch('http://dtai.uteq.edu.mx/~godmoi225/React-mobil/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, contra }),
      });

      const data = await response.json();

      if (data.success) {
        await AsyncStorage.setItem('userToken', data.user.token);
        Alert.alert('Éxito', data.message);
        onLogin(data.user);
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/warehouse.png')}
        style={styles.icon}
      />

      <Text style={styles.title}>Bienvenido</Text>
      <Text style={styles.subtitle}>Inicia sesión para continuar</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={correo}
          onChangeText={setCorreo}
          placeholder="Correo electrónico"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Ionicons name="mail-outline" size={20} color="#999" style={styles.inputIcon} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={contra}
          onChangeText={setContra}
          placeholder="Contraseña"
          placeholderTextColor="#999"
          secureTextEntry={!showPassword}
          autoCapitalize="none"
        />
        <Ionicons 
          name={showPassword ? "eye-off-outline" : "eye-outline"} 
          size={20} 
          color="#999" 
          style={styles.passwordIcon}
          onPress={() => setShowPassword(!showPassword)}
        />
        <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.inputIcon} />
      </View>

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleLogin}
        activeOpacity={0.9}
      >
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        Versión 1.0.0 • Sistema de Almacenes
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 30,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2A2A2A',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    position: 'relative',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 45,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  inputIcon: {
    position: 'absolute',
    left: 15,
    top: 15,
  },
  passwordIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
    zIndex: 1,
  },
  button: {
    width: 90,
    height: 50,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    color: '#999',
    fontSize: 12,
    position: 'absolute',
    bottom: 30,
  },
});

export default LoginForm;