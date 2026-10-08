import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {SetupProvider} from '../context/SetupContext';
import {colors} from '../constants/theme';
import {SetupCountScreen} from '../screens/setup/SetupCountScreen';
import {SetupPreparingScreen} from '../screens/setup/SetupPreparingScreen';
import {SetupVehicleScreen} from '../screens/setup/SetupVehicleScreen';
import type {SetupStackParamList} from './types';

const Stack = createNativeStackNavigator<SetupStackParamList>();

export function SetupNavigator() {
  return (
    <SetupProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {backgroundColor: colors.background},
        }}>
        <Stack.Screen name="SetupCount" component={SetupCountScreen} />
        <Stack.Screen name="SetupVehicle" component={SetupVehicleScreen} />
        <Stack.Screen
          name="SetupPreparing"
          component={SetupPreparingScreen}
          options={{gestureEnabled: false}}
        />
      </Stack.Navigator>
    </SetupProvider>
  );
}
