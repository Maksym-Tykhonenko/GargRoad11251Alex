import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AddVehicleScreen} from '../screens/AddVehicleScreen';
import {GarageScreen} from '../screens/GarageScreen';
import {VehicleDetailScreen} from '../screens/VehicleDetailScreen';
import type {GarageStackParamList} from './types';

const Stack = createNativeStackNavigator<GarageStackParamList>();

export function GarageStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="GarageHome" component={GarageScreen} />
      <Stack.Screen name="AddVehicle" component={AddVehicleScreen} />
      <Stack.Screen name="VehicleDetail" component={VehicleDetailScreen} />
    </Stack.Navigator>
  );
}
