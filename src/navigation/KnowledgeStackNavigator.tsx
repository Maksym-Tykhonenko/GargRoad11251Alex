import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {KnowledgeCardScreen} from '../screens/knowledge/KnowledgeCardScreen';
import {KnowledgeScreen} from '../screens/knowledge/KnowledgeScreen';
import type {KnowledgeStackParamList} from './types';

const Stack = createNativeStackNavigator<KnowledgeStackParamList>();

export function KnowledgeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="KnowledgeHome" component={KnowledgeScreen} />
      <Stack.Screen name="KnowledgeCard" component={KnowledgeCardScreen} />
    </Stack.Navigator>
  );
}
