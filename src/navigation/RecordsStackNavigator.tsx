import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {NewRecordScreen} from '../screens/records/NewRecordScreen';
import {RecordsScreen} from '../screens/records/RecordsScreen';
import type {RecordsStackParamList} from './types';

const Stack = createNativeStackNavigator<RecordsStackParamList>();

export function RecordsStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="RecordsHome" component={RecordsScreen} />
      <Stack.Screen name="NewRecord" component={NewRecordScreen} />
    </Stack.Navigator>
  );
}
