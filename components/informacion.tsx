import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

interface Props {
  
    item:{
        id: number;
        nombre: string;
        marca: string;
        categoria: string;
        precio: number;
        descripcion: string;
    };
    onPress: (item: any) => void;
    
}
export default function informacion({ item, onPress }: Props) {
 return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(item)}
    >

      <View style={styles.circulo}>
        <Text style={styles.icono}></Text>
      </View>

      <View style={styles.informacion}>

        <Text style={styles.nombre}>
          {item.nombre}
        </Text>

        <Text style={styles.marca}>
          {item.marca}
        </Text>

        <Text style={styles.categoria}>
          {item.categoria}
        </Text>

      </View>

      <View style={styles.precioContainer}>

        <Text style={styles.precio}>
          ${Number(item.precio).toFixed(2)}
        </Text>

      </View>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,

    // Sombra Android
    elevation: 3,
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  circulo: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: '#eeeeee',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  icono: {
    fontSize: 25,
  },

  informacion: {
    flex: 1,
  },

  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  marca: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
  },

  categoria: {
    fontSize: 13,
    color: '#888',
  },

  precioContainer: {
    marginLeft: 10,
  },

  precio: {
    fontSize: 16,
    fontWeight: 'bold',
  },

});