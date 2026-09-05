import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InicioScreen from '../screens/InicioScreen';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>

      <Stack.Screen
        name="Inicio"
        component={InicioScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Principal"
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />

    </Stack.Navigator>
  );
}