import { StyleSheet, Text, View } from 'react-native'
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
    
  )
}

const styles = StyleSheet.create({})