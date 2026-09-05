import React from 'react';
import {  StyleSheet, Text, View,Button,
} from 'react-native';

export default function InicioScreen({ navigation }: any) {

    return (
    <View style={styles.container}>

        <Text style={styles.nombre}>
        TU NOMBRE
        </Text>

    <Text style={styles.titulo}>
        Aplicaciones Móviles II
        </Text>

        <Text style={styles.bienvenida}>
        Bienvenido
        </Text>

        <Button
        title="Ingresar"
        onPress={() => navigation.navigate('Principal')}
        />

    </View>
    );
}

const styles = StyleSheet.create({

    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    },

    nombre: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    },

    titulo: {
    fontSize: 20,
    marginBottom: 20,
    },

    bienvenida: {
    fontSize: 24,
    marginBottom: 30,
    },

});