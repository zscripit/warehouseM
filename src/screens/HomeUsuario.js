// src/screens/HomeUsuario.js
import React, { useState, useEffect } from 'react'; // Añadir useEffect
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Provider as PaperProvider, IconButton } from 'react-native-paper';
import MenuDrawer from '../components/MenuDrawer'; // Importar el componente del menú
import AsyncStorage from '@react-native-async-storage/async-storage'; // Para manejar el token

const HomeUsuario = ({ route, navigation }) => {
  const { user } = route.params; // Recibe los parámetros
  const [menuVisible, setMenuVisible] = useState(false); // Estado para controlar el menú desplegable
  const slideAnim = new Animated.Value(300); // Animación inicial (fuera de la pantalla)

  // Almacenar el token y el correo en AsyncStorage al cargar la pantalla
  useEffect(() => {
    const storeUserData = async () => {
      try {
        await AsyncStorage.setItem('userToken', user.token); // Almacenar el token
        await AsyncStorage.setItem('userCorreo', user.correo); // Almacenar el correo
      } catch (error) {
        console.error('Error al almacenar datos del usuario:', error);
      }
    };

    storeUserData();
  }, [user]);

  const openMenu = () => {
    setMenuVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0, // Desplazar hacia la posición visible
      duration: 200, // Duración rápida para la animación
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: 300, // Desplazar fuera de la pantalla
      duration: 150, // Duración rápida para cerrar
      useNativeDriver: true,
    }).start(() => setMenuVisible(false));
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        {/* Encabezado con Ícono de Menú */}
        <View style={styles.header}>
          <IconButton
            icon="menu"
            size={30}
            onPress={openMenu}
            style={styles.menuIcon}
            color="#6200ee" // Color moderno para el ícono
          />
          <Text style={styles.title}>¡Bienvenido, {user.nombreUsuario}!</Text>
        </View>

        {/* Información del Usuario */}
        <View style={styles.userInfo}>
          <Text style={styles.subtitle}>Correo: {user.correo}</Text>
          <Text style={styles.subtitle}>Almacén: {user.almacen}</Text>
        </View>

        {/* Menú Desplegable */}
        <MenuDrawer
          visible={menuVisible}
          closeMenu={closeMenu}
          slideAnim={slideAnim}
          navigation={navigation}
        />
      </View>
    </PaperProvider>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuIcon: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default HomeUsuario;