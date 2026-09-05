import React, { useState } from 'react';
import {  Alert, StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';

import { supabase } from '../service/supabase';

interface Producto {
  id: number;
  nombre: string;
  marca: string;
  categoria: string;
  precio: number;
  descripcion: string;
}

export default function EditarScreen() {

  const [idBuscar, setIdBuscar] = useState('');

  const [producto, setProducto] = useState<Producto | null>(null);

  const [nombre, setNombre] = useState('');
  const [marca, setMarca] = useState('');
  const [categoria, setCategoria] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');



  // BUSCAR FIGURA
  const buscarProducto = async () => {

    if (!idBuscar.trim()) {
      Alert.alert(
        'Aviso',
        'Ingrese el ID de la figura'
      );
      return;
    }

    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .eq('id', Number(idBuscar))

    if (error || !data) {

      Alert.alert(
        'No encontrado',
        'No existe una figura con ese ID'
      );

      setProducto(null);

      return;
    }

    setProducto(data[0]);

    setNombre(data[0].nombre);
    setMarca(data[0].marca);
    setCategoria(data[0].categoria);
    setPrecio(String(data[0].precio));
    setDescripcion(data[0].descripcion || '');

  };



  // EDITAR FIGURA

  const editarProducto = async () => {

    if (!producto) {
      Alert.alert(
        'Aviso',
        'Primero busque una figura'
      );
      return;
    }

    if (!nombre || !marca || !categoria || !precio) {

      Alert.alert(
        'Aviso',
        'Complete los campos obligatorios'
      );

      return;
    }

    const { error } = await supabase
      .from('productos')
      .update({
        nombre: nombre,
        marca: marca,
        categoria: categoria,
        precio: parseFloat(precio),
        descripcion: descripcion,
      })
      .eq('id', producto.id);

    if (error) {

      console.log(error);

      Alert.alert(
        'Error',
        'No se pudo editar la figura'
      );

      return;
    }

    Alert.alert(
      'Correcto',
      'La figura se ha editado correctamente'
    );

  };


  
  // ELIMINAR FIGURA
  const eliminarProducto = () => {

    if (!producto) {

      Alert.alert(
        'Aviso',
        'Primero busque una figura'
      );

      return;
    }

    Alert.alert(
      'Confirmar eliminación',
      `¿Desea eliminar "${producto.nombre}"?`,

      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },

        {
          text: 'Eliminar',
          style: 'destructive',

          onPress: async () => {

            const { error } = await supabase
              .from('productos')
              .delete()
              .eq('id', producto.id);

            if (error) {

              console.log(error);

              Alert.alert(
                'Error',
                'No se pudo eliminar la figura'
              );

              return;
            }

            Alert.alert(
              'Correcto',
              'La figura se ha eliminado correctamente'
            );

            // Limpiar formulario
            setProducto(null);
            setIdBuscar('');
            setNombre('');
            setMarca('');
            setCategoria('');
            setPrecio('');
            setDescripcion('');

          },
        },
      ]
    );

  };


  return (

    <View style={styles.container}>

      <Text style={styles.titulo}>
        Editar colección
      </Text>

      <Text style={styles.subtitulo}>
        Modifica o elimina una figura
      </Text>



      <View style={styles.buscarContainer}>

        <Text style={styles.label}>
          ID de la figura
        </Text>

        <View style={styles.fila}>

          <TextInput
            style={styles.inputId}
            placeholder="Ej: 1"
            value={idBuscar}
            onChangeText={setIdBuscar}
            keyboardType="numeric"
          />

          <TouchableOpacity
            style={styles.botonBuscar}
            onPress={buscarProducto}
          >

            <Text style={styles.textoBoton}>
              BUSCAR
            </Text>

          </TouchableOpacity>

        </View>

      </View>


      {/* FORMULARIO */}

      {producto && (

        <View style={styles.formulario}>

          <Text style={styles.label}>
            Nombre
          </Text>

          <TextInput
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
          />


          <Text style={styles.label}>
            Marca
          </Text>

          <TextInput
            style={styles.input}
            value={marca}
            onChangeText={setMarca}
          />


          <Text style={styles.label}>
            Categoría
          </Text>

          <TextInput
            style={styles.input}
            value={categoria}
            onChangeText={setCategoria}
          />


          <Text style={styles.label}>
            Precio
          </Text>

          <TextInput
            style={styles.input}
            value={precio}
            onChangeText={setPrecio}
            keyboardType="decimal-pad"
          />


          <Text style={styles.label}>
            Descripción
          </Text>

          <TextInput
            style={[styles.input, styles.descripcion]}
            value={descripcion}
            onChangeText={setDescripcion}
            multiline
          />


          {/* EDITAR */}

          <TouchableOpacity
            style={styles.botonEditar}
            onPress={editarProducto}
          >

            <Text style={styles.textoBoton}>
              GUARDAR CAMBIOS
            </Text>

          </TouchableOpacity>


          {/* ELIMINAR */}

          <TouchableOpacity
            style={styles.botonEliminar}
            onPress={eliminarProducto}
          >

            <Text style={styles.textoBoton}>
              ELIMINAR FIGURA
            </Text>

          </TouchableOpacity>

        </View>

      )}

    </View>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
  },

  subtitulo: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
  },

  buscarContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 3,
  },

  formulario: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 3,
  },

  label: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 6,
  },

  fila: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  inputId: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginRight: 10,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 15,
    backgroundColor: '#fafafa',
  },

  descripcion: {
    height: 90,
    textAlignVertical: 'top',
    paddingTop: 12,
  },

  botonBuscar: {
    height: 48,
    paddingHorizontal: 18,
    borderRadius: 10,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },

  botonEditar: {
    height: 50,
    borderRadius: 10,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },

  botonEliminar: {
    height: 50,
    borderRadius: 10,
    backgroundColor: '#777',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },

  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },

});