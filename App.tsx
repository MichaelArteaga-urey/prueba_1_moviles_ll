import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import StackNavigator from './navigation/StackNavigator';
import {supabase} from './service/supabase';

export default function App() {
  console.log('Supabase', supabase);
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}