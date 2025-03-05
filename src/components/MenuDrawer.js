// src/components/MenuDrawer.js
import React from 'react';
import { TouchableOpacity, Animated, View, StyleSheet } from 'react-native';
import { Portal, Menu, Divider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Para manejar el token

const MenuDrawer = ({ visible, closeMenu, slideAnim, navigation }) => {
  const handleLogout = async () => {
    try {
      // Obtener el correo del usuario almacenado localmente
      const userCorreo = await AsyncStorage.getItem('userCorreo');

      if (!userCorreo) {
        console.error('No se encontró el correo del usuario.');
        return;
      }

      // Llamar al endpoint para borrar el token en la base de datos
      const response = await fetch('http://dtai.uteq.edu.mx/~godmoi225/React-mobil/logout.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo: userCorreo }),
      });

      const data = await response.json();

      if (data.success) {
        console.log(data.message); // Token eliminado correctamente en la base de datos

        // Borrar el token almacenado localmente
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userCorreo'); // También puedes borrar el correo si lo guardaste

        // Redirigir al usuario a la pantalla de inicio de sesión
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      } else {
        console.error(data.message); // No se encontró el usuario o hubo un error
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <Portal>
      {visible && (
        <Animated.View
          style={[
            styles.menuContainer,
            { transform: [{ translateX: slideAnim }] }, // Animación de desplazamiento horizontal
          ]}
        >
          <TouchableOpacity style={styles.overlay} onPress={closeMenu} />
          <View style={styles.menuContent}>
            <Menu.Item
              onPress={() => {
                console.log('Ver Perfil');
                closeMenu();
              }}
              title="Ver Perfil"
              icon="account"
              titleStyle={styles.menuItemTitle}
            />
            <Divider />
            <Menu.Item
              onPress={() => {
                console.log('Configuración');
                closeMenu();
              }}
              title="Configuración"
              icon="cog"
              titleStyle={styles.menuItemTitle}
            />
            <Divider />
            <Menu.Item
              onPress={handleLogout}
              title="Cerrar Sesión"
              icon="logout"
              titleStyle={styles.menuItemTitle}
            />
          </View>
        </Animated.View>
      )}
    </Portal>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: '70%', // Ancho del menú
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro semi-transparente
  },
  overlay: {
    flex: 1,
  },
  menuContent: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    padding: 20,
    elevation: 5,
  },
  menuItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default MenuDrawer;