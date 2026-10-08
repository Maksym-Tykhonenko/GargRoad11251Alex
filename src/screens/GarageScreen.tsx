import React, {useMemo, useState} from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {VehicleCard} from '../components/garage/VehicleCard';
import {useGarage} from '../context/GarageContext';
import {colors, fonts, layout} from '../constants/theme';
import type {GarageStackParamList} from '../navigation/types';

type Props = NativeStackScreenProps<GarageStackParamList, 'GarageHome'>;

export function GarageScreen({navigation}: Props) {
  const insets = useSafeAreaInsets();
  const {vehicles, userName, editing, setEditing, deleteVehicle} = useGarage();
  const [toast, setToast] = useState<string | null>(null);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    const name = userName.trim();
    const hello =
      hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    return name ? `${hello}, ${name}` : hello;
  }, [userName]);

  const confirmDelete = (id: string, name: string) => {
    Alert.alert(
      `Delete ${name}?`,
      'Its checklists and records will be removed from this device.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete vehicle',
          style: 'destructive',
          onPress: () => {
            deleteVehicle(id);
            setToast('Vehicle deleted');
            setTimeout(() => setToast(null), 1800);
          },
        },
      ],
    );
  };

  return (
    <View style={styles.GarageScreenChassis}>
      <ScrollView
        contentContainerStyle={[
          styles.GarageScreenScrollContent,
          {
            paddingTop: insets.top + 12,
            paddingBottom: Math.max(insets.bottom, 16) + 100,
          },
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.GarageScreenHeader}>
          <View style={styles.GarageScreenHeaderText}>
            <Text style={styles.GarageScreenGreeting}>{greeting}</Text>
            <Text style={styles.GarageScreenTitle}>My Garage</Text>
          </View>
          <Pressable
            onPress={() => setEditing(!editing)}
            style={styles.GarageScreenEditButton}>
            <Text style={styles.GarageScreenEditLabel}>
              {editing ? 'Done' : 'Edit'}
            </Text>
          </Pressable>
        </View>

        <Pressable
          onPress={() => navigation.navigate('AddVehicle')}
          style={styles.GarageScreenAddButton}>
          <Text style={styles.GarageScreenAddIcon}>+</Text>
          <Text style={styles.GarageScreenAddLabel}>Add vehicle</Text>
        </Pressable>

        {editing ? (
          <Text style={styles.GarageScreenMeta}>
            VEHICLES • {vehicles.length}
          </Text>
        ) : null}

        {vehicles.map(vehicle => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            editing={editing}
            onPress={() =>
              navigation.navigate('VehicleDetail', {vehicleId: vehicle.id})
            }
            onDeletePress={() => confirmDelete(vehicle.id, vehicle.name)}
          />
        ))}
      </ScrollView>

      {toast ? (
        <View style={[styles.GarageScreenToast, {top: insets.top + 8}]}>
          <Text style={styles.GarageScreenToastLabel}>{toast}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  GarageScreenChassis: {
    backgroundColor: colors.background,
    flex: 1,
  },
  GarageScreenScrollContent: {
    paddingHorizontal: layout.screenPadding - 8,
  },

  GarageScreenHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  GarageScreenHeaderText: {
    flex: 1,
    paddingRight: 12,
  },

  GarageScreenGreeting: {
    color: 'rgba(235,238,245,0.55)',
    fontFamily: fonts.sansMedium,
    fontSize: 14,
    marginBottom: 4,
  },
  GarageScreenTitle: {
    color: colors.cream,
    fontFamily: fonts.sansBold,
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: -0.6,
  },

  GarageScreenEditButton: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 17,
    marginTop: 18,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  GarageScreenEditLabel: {
    color: colors.orange,
    fontFamily: fonts.sansRegular,
    fontSize: 15,
  },

  GarageScreenAddButton: {
    alignItems: 'center',
    borderColor: 'rgba(255,178,63,0.45)',
    borderRadius: 22,
    borderStyle: 'dashed',
    borderWidth: 1.5,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    marginBottom: 18,
    paddingVertical: 14,
  },
  GarageScreenAddIcon: {
    color: colors.orange,
    fontSize: 20,
    fontWeight: '700',
  },
  GarageScreenAddLabel: {
    color: colors.orange,
    fontFamily: fonts.sansBold,
    fontSize: 16,
    fontWeight: '700',
  },

  GarageScreenMeta: {
    color: 'rgba(235,238,245,0.45)',
    fontFamily: fonts.sansRegular,
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 12,
  },

  GarageScreenToast: {
    alignSelf: 'center',
    backgroundColor: 'rgba(18,22,32,0.95)',
    borderColor: 'rgba(61,220,132,0.4)',
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    position: 'absolute',
  },
  GarageScreenToastLabel: {
    color: colors.success,
    fontFamily: fonts.sansSemiBold,
    fontSize: 13,
    fontWeight: '600',
  },
});
