import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { supabase } from '../service/supabase';

export default function AgregarScreen() {

    const [nombre, setNombre] = React.useState(''); 
    const [marca, setMarca] = React.useState('');
    const [categoria, setCategoria] = React.useState('');
    const [precio, setPrecio] = React.useState('');
    const [descripcion, setDescripcion] = React.useState('');

    const registarProducto = async () => {
     
    
         // Verificar que los campos principales estén llenos
    if (!nombre || !marca || !categoria || !precio) {
      Alert.alert(
        'Aviso',
        'Complete todos los campos'
      );
      return;
    }

    const { error } = await supabase
      .from('productos')
      .insert({
        nombre: nombre,
        marca: marca,
        categoria: categoria,
        precio: parseFloat(precio),
        descripcion: descripcion,
      });

    if (error) {

      console.log(error);

      Alert.alert(
        'Error',
        'No se pudo registrar el producto'
      );

      return;
    }

    Alert.alert(
      'Correcto',
      'Producto agregado correctamente'
    );

    // Limpiar los campos
    setNombre('');
    setMarca('');
    setCategoria('');
    setPrecio('');
    setDescripcion('');
  };

 return (
    <View style={styles.container}>

      <Text style={styles.titulo}>
        Registrar Producto
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="Marca"
        value={marca}
        onChangeText={setMarca}
      />

      <TextInput
        style={styles.input}
        placeholder="Categoría"
        value={categoria}
        onChangeText={setCategoria}
      />

      <TextInput
        style={styles.input}
        placeholder="Precio"
        value={precio}
        onChangeText={setPrecio}
        keyboardType="decimal-pad"
      />

      <TextInput
        style={[styles.input, styles.descripcion]}
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
      />

      <TouchableOpacity
        style={styles.boton}
        onPress={registarProducto}
      >
        <Text style={styles.textoBoton}>
          REGISTRAR
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },

  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },

  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },

  descripcion: {
    height: 100,
    textAlignVertical: 'top',
  },

  boton: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },

  textoBoton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

});