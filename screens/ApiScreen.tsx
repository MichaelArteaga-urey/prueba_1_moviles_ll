import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList,Image, StyleSheet, Text,View,} from 'react-native';

interface Videojuego {
    titulo: string;
    plataforma: string[];
    genero: string[];
    desarrollador: string;
    precio: number;
    lanzamiento: string;
    descripcion: string;
    imagen: string;
}

export default function ApiScreen() {

  const [videojuegos, setVideojuegos] = useState<Videojuego[]>([]);
  const [cargando, setCargando] = useState(true);

  const API =
    'https://jritsqmet.github.io/web-api/video_juegos.json';

  const obtenerVideojuegos = async () => {

    try {

      const respuesta = await fetch(API);

      const datos = await respuesta.json();

      setVideojuegos(datos.videojuegos);

    } catch (error) {

      console.log('Error al consumir API:', error);

    } finally {

      setCargando(false);

    }

  };

  useEffect(() => {
    obtenerVideojuegos();
  }, []);


  const renderVideojuego = ({
    item,
  }: {
    item: Videojuego;
  }) => {

    return (

      <View style={styles.card}>

        <Image
          source={{ uri: item.imagen }}
          style={styles.imagen}
          resizeMode="cover"
        />

        <View style={styles.informacion}>

          <Text style={styles.tituloJuego}>
            {item.titulo}
          </Text>

          <Text style={styles.desarrollador}>
            {item.desarrollador}
          </Text>

          <View style={styles.fila}>

            <Text style={styles.etiqueta}>
              {item.genero.join(' • ')}
            </Text>

          </View>

          <Text style={styles.plataforma}>
            🎮 {item.plataforma.join(', ')}
          </Text>

          <Text style={styles.lanzamiento}>
            Lanzamiento: {item.lanzamiento}
          </Text>

          <Text
            style={styles.descripcion}
            numberOfLines={3}
          >
            {item.descripcion}
          </Text>

          <Text style={styles.precio}>
            ${item.precio.toFixed(2)}
          </Text>

        </View>

      </View>

    );
  };


  if (cargando) {

    return (

      <View style={styles.cargando}>

        <ActivityIndicator size="large" />

        <Text style={styles.textoCargando}>
          Cargando colección...
        </Text>

      </View>

    );

  }


  return (

    <View style={styles.container}>

      <Text style={styles.titulo}>
        Colección
      </Text>

      <Text style={styles.subtitulo}>
        Videojuegos disponibles
      </Text>

      <FlatList
        data={videojuegos}
        keyExtractor={(item, index) =>
          `${item.titulo}-${index}`
        }
        renderItem={renderVideojuego}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.lista}
      />

    </View>

  );

}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 18,
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 15,
  },

  subtitulo: {
    fontSize: 16,
    color: '#777',
    marginBottom: 18,
  },

  lista: {
    paddingBottom: 30,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 18,
    overflow: 'hidden',

    elevation: 4,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 5,
  },

  imagen: {
    width: '100%',
    height: 200,
    backgroundColor: '#ddd',
  },

  informacion: {
    padding: 15,
  },

  tituloJuego: {
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  desarrollador: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },

  fila: {
    marginBottom: 8,
  },

  etiqueta: {
    fontSize: 13,
    color: '#555',
  },

  plataforma: {
    fontSize: 13,
    color: '#555',
    marginBottom: 5,
  },

  lanzamiento: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },

  descripcion: {
    fontSize: 13,
    color: '#666',
    lineHeight: 19,
  },

  precio: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },

  cargando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textoCargando: {
    marginTop: 12,
    color: '#777',
  },

});