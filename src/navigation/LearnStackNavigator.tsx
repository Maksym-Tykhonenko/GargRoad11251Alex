import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  ArticleDetailScreen,
  LearnScreen,
} from '../screens/learn/LearnScreen';
import type {LearnStackParamList} from './types';

const Stack = createNativeStackNavigator<LearnStackParamList>();

export function LearnStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="LearnHome" component={LearnScreen} />
      <Stack.Screen name="ArticleDetail" component={ArticleDetailScreen} />
    </Stack.Navigator>
  );
}
