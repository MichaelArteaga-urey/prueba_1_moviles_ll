import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { supabase } from '../service/supabase';
import Informacion from '../components/informacion';



interface Producto {
    id: number;
    nombre: string;
    marca: string;
    categoria: string;
    precio: number;
    descripcion: string;
}

export default function RegistroScreen() {
const [productos, setProductos] = useState<Producto[]>([]);
const [idBuscar, setIdBuscar] = useState('');
const [buscando, setBuscando] = useState(false);

// TRAER LOS PRODUCTOS 

const obtenerProductos = async () => {

    const { data, error } = await supabase
        .from('productos')
        .select('*')
        .order('id', { ascending: false });

    if (error) {
        console.log(error);

        Alert.alert(
        'Error',
        'No se pudieron cargar las figuras'
        );

        return;
    }

    setProductos(data || []);
    };

    // BUSCAR PRODUCTO POR ID

    const buscarPorId = async () => {
        if (!idBuscar) {
            Alert.alert(
                'Aviso',
                'Ingrese un ID para buscar'
            );
            return;
        }
        setBuscando(true);
        const { data, error } = await supabase
            .from('productos')
            .select('*')
            .eq('id', Number(idBuscar));
            
            setBuscando(false);
            if (error) {
                console.log(error);
                Alert.alert(
                    'Error',
                    'No se pudo buscar el producto'
                );
                return;
            }
            mostrarInformacion(data[0]);
        };

        const mostrarInformacion = (item: Producto) => {
            Alert.alert(
                item.nombre,
                `Marca: ${item.marca}\n
                Categoría: ${item.categoria}\n
                Precio: $${item.precio.toFixed(2)}\n
                Descripción: ${item.descripcion}`
            );
        };
        //cargar pantalla al iniciar
        useEffect(() => {
            obtenerProductos();
        }, []);

         return (

    <View style={styles.container}>

      <Text style={styles.titulo}>
        Mi Colección
      </Text>

      <Text style={styles.subtitulo}>
        Figuras de colección
      </Text>


      {/* =====================================
          BUSCAR POR ID
      ===================================== */}

      <View style={styles.busqueda}>

        <Text style={styles.seccion}>
          Buscar figura
        </Text>

        <View style={styles.fila}>

          <TextInput
            style={styles.input}
            placeholder="ID de la figura"
            value={idBuscar}
            onChangeText={setIdBuscar}
            keyboardType="numeric"
          />

          <TouchableOpacity
            style={styles.boton}
            onPress={buscarPorId}
            disabled={buscando}
          >
            <Text style={styles.textoBoton}>
              {buscando ? '...' : 'BUSCAR'}
            </Text>
          </TouchableOpacity>

        </View>

      </View>


      {/* =====================================
          LISTA
      ===================================== */}

      <Text style={styles.seccion}>
        Colección
      </Text>

      <FlatList
        data={productos}
        renderItem={({ item }) => (

          <Informacion
            item={item}
            onPress={mostrarInformacion}
          />

        )}

        showsVerticalScrollIndicator={false}

        contentContainerStyle={{
          paddingBottom: 20,
        }}

        ListEmptyComponent={

          <Text style={styles.vacio}>
            No hay figuras registradas
          </Text>

        }
      />

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

  busqueda: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,

    elevation: 3,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  seccion: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  fila: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginRight: 10,
    backgroundColor: '#fafafa',
  },

  boton: {
    height: 48,
    paddingHorizontal: 18,
    borderRadius: 10,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },

  vacio: {
    textAlign: 'center',
    color: '#888',
    marginTop: 30,
  },

});
