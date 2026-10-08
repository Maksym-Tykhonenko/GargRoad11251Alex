import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {CalculatorScreen} from '../screens/calculators/CalculatorScreen';
import {CalculatorsScreen} from '../screens/calculators/CalculatorsScreen';
import {SavedCalculationsScreen} from '../screens/calculators/SavedCalculationsScreen';
import type {CalculatorsStackParamList} from './types';

const Stack = createNativeStackNavigator<CalculatorsStackParamList>();

export function CalculatorsStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="CalculatorsHome" component={CalculatorsScreen} />
      <Stack.Screen name="Calculator" component={CalculatorScreen} />
      <Stack.Screen name="SavedCalculations" component={SavedCalculationsScreen} />
    </Stack.Navigator>
  );
}
