import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AgregarScreen from '../screens/AgregarScreen';
import RegistroScreen from '../screens/RegistroScreen';
import EditarScreen from '../screens/EditarScreen';
import ApiScreen from '../screens/ApiScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
    <Tab.Navigator>

        <Tab.Screen
        name="Agregar"
        component={AgregarScreen}
        />

        <Tab.Screen
        name="Registro"
        component={RegistroScreen}
        />

        <Tab.Screen
        name="Editar"
        component={EditarScreen}
        />

        <Tab.Screen
        name="API"
        component={ApiScreen}
        />
    
    </Tab.Navigator>
    );
}