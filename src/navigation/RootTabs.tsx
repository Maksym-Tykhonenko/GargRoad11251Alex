import React from 'react';
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  type PressableProps,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { tabIcons } from '../data/assets';
import { colors, fonts } from '../constants/theme';
import { CalculatorsStackNavigator } from './CalculatorsStackNavigator';
import { GarageStackNavigator } from './GarageStackNavigator';
import { KnowledgeStackNavigator } from './KnowledgeStackNavigator';
import { LearnStackNavigator } from './LearnStackNavigator';
import { RecordsStackNavigator } from './RecordsStackNavigator';
import type { RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();

const TAB_ICON_SIZE = 24;
const TAB_GLOW_WIDTH = 52;
const TAB_GLOW_HEIGHT = 40;

type TabItemProps = {
  source: (typeof tabIcons)[keyof typeof tabIcons];
  label: string;
  focused: boolean;
};

function TabItem({ source, label, focused }: TabItemProps) {
  return (
    <View style={styles.TabItemChassis}>
      <View style={styles.TabItemIconSlot}>
        {focused ? <View style={styles.TabItemGlow} pointerEvents="none" /> : null}
        <Image
          source={source}
          style={[
            styles.TabItemIcon,
            focused ? styles.TabItemIconActive : styles.TabItemIconMuted,
          ]}
          resizeMode="contain"
        />
      </View>
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.85}
        style={[
          styles.TabItemLabel,
          focused ? styles.TabItemLabelActive : styles.TabItemLabelMuted,
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

function EqualTabButton(props: PressableProps & { children?: React.ReactNode }) {
  const { children, style, ...rest } = props;
  return (
    <Pressable
      {...rest}
      style={[
        styles.TabBarButton,
        typeof style === 'function' ? style({ pressed: false }) : style,
      ]}
    >
      {children}
    </Pressable>
  );
}

export function RootTabs() {
  const insets = useSafeAreaInsets();
  const floatingTabBarStyle = {
    ...styles.TabBar,
    bottom: Math.max(insets.bottom, 10) + 6,
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: floatingTabBarStyle,
        tabBarItemStyle: styles.TabBarItem,
        tabBarIconStyle: styles.TabBarIcon,
        tabBarButton: EqualTabButton,
        tabBarActiveTintColor: colors.orange,
        tabBarInactiveTintColor: 'rgba(235,238,245,0.55)',
      }}
    >
      <Tab.Screen
        name="GarageTab"
        component={GarageStackNavigator}
        options={({ route }) => {
          const focusedRoute =
            getFocusedRouteNameFromRoute(route) ?? 'GarageHome';
          const hideTabBar =
            focusedRoute === 'AddVehicle' || focusedRoute === 'VehicleDetail';

          return {
            title: 'Garage',
            tabBarStyle: hideTabBar ? { display: 'none' } : floatingTabBarStyle,
            tabBarIcon: ({ focused }) => (
              <TabItem
                source={tabIcons.garage}
                label="Garage"
                focused={focused}
              />
            ),
          };
        }}
      />
      <Tab.Screen
        name="CalculatorsTab"
        component={CalculatorsStackNavigator}
        options={({ route }) => {
          const focusedRoute =
            getFocusedRouteNameFromRoute(route) ?? 'CalculatorsHome';
          const hideTabBar = focusedRoute !== 'CalculatorsHome';

          return {
            title: 'Calculators',
            tabBarStyle: hideTabBar ? { display: 'none' } : floatingTabBarStyle,
            tabBarIcon: ({ focused }) => (
              <TabItem
                source={tabIcons.calculators}
                label="Calculators"
                focused={focused}
              />
            ),
          };
        }}
      />
      <Tab.Screen
        name="RecordsTab"
        component={RecordsStackNavigator}
        options={({ route }) => {
          const focusedRoute =
            getFocusedRouteNameFromRoute(route) ?? 'RecordsHome';
          const hideTabBar = focusedRoute !== 'RecordsHome';

          return {
            title: 'Records',
            tabBarStyle: hideTabBar ? { display: 'none' } : floatingTabBarStyle,
            tabBarIcon: ({ focused }) => (
              <TabItem
                source={tabIcons.records}
                label="Records"
                focused={focused}
              />
            ),
          };
        }}
      />
      <Tab.Screen
        name="LearnTab"
        component={LearnStackNavigator}
        options={({ route }) => {
          const focusedRoute =
            getFocusedRouteNameFromRoute(route) ?? 'LearnHome';
          const hideTabBar = focusedRoute !== 'LearnHome';

          return {
            title: 'Learn',
            tabBarStyle: hideTabBar ? { display: 'none' } : floatingTabBarStyle,
            tabBarIcon: ({ focused }) => (
              <TabItem source={tabIcons.learn} label="Learn" focused={focused} />
            ),
          };
        }}
      />
      <Tab.Screen
        name="KnowledgeTab"
        component={KnowledgeStackNavigator}
        options={({ route }) => {
          const focusedRoute =
            getFocusedRouteNameFromRoute(route) ?? 'KnowledgeHome';
          const hideTabBar = focusedRoute === 'KnowledgeCard';

          return {
            title: 'Knowledge',
            tabBarStyle: hideTabBar ? { display: 'none' } : floatingTabBarStyle,
            tabBarIcon: ({ focused }) => (
              <TabItem
                source={tabIcons.knowledge}
                label="Knowledge"
                focused={focused}
              />
            ),
          };
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  TabBar: {
    position: 'absolute',
    left: 14,
    right: 14,
    height: 68,
    borderRadius: 34,
    backgroundColor: 'rgba(24,28,40,0.92)',
    borderTopWidth: 0,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 4,
    paddingTop: 0,
    paddingBottom: 0,
    elevation: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.55,
    shadowRadius: 20,
    ...Platform.select({
      ios: {
        overflow: 'visible',
      },
      android: {
        overflow: 'hidden',
      },
    }),
  },
  TabBarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 0,
    margin: 0,
  },

  TabBarButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  TabBarIcon: {
    flex: 1,
    width: '100%',
    height: '100%',
    marginTop: 0,
    marginBottom: 0,
  },

  TabItemChassis: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  TabItemIconSlot: {
    width: TAB_GLOW_WIDTH,
    height: TAB_GLOW_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TabItemGlow: {
    position: 'absolute',
    width: TAB_GLOW_WIDTH,
    height: TAB_GLOW_HEIGHT,
    borderRadius: TAB_GLOW_HEIGHT / 2,
    backgroundColor: 'rgba(255,178,63,0.18)',
  },

  TabItemIcon: {
    width: TAB_ICON_SIZE,
    height: TAB_ICON_SIZE,
  },
  TabItemIconActive: {
    tintColor: colors.orange,
  },
  TabItemIconMuted: {
    opacity: 0.85,
    tintColor: 'rgba(235,238,245,0.55)',
  },

  TabItemLabel: {
    width: '100%',
    paddingHorizontal: 2,
    fontFamily: fonts.sansRegular,
    fontSize: 10,
    letterSpacing: 0.1,
    lineHeight: 12,
    textAlign: 'center',
  },
  TabItemLabelActive: {
    color: colors.orange,
  },
  TabItemLabelMuted: {
    color: 'rgba(235,238,245,0.55)',
  },
});
