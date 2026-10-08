import React from 'react';

import {GarageProvider} from '../context/GarageContext';
import {AppShell} from './AppShell';
import {NavigationProvider} from './NavigationContext';

export function AppNavigator() {
  return (
    <NavigationProvider>
      <GarageProvider>
        <AppShell />
      </GarageProvider>
    </NavigationProvider>
  );
}
