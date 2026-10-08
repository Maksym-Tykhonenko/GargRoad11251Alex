import React, {useMemo, useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {AppIcon} from '../components/icons/AppIcon';
import {useGarage} from '../context/GarageContext';
import {FUEL_TYPES, VEHICLE_TYPES} from '../data/vehicles';
import {colors, fonts} from '../constants/theme';
import type {FuelType, VehicleType} from '../types/vehicle';
import type {GarageStackParamList} from '../navigation/types';

type Props = NativeStackScreenProps<GarageStackParamList, 'AddVehicle'>;

export function AddVehicleScreen({navigation}: Props) {
  const insets = useSafeAreaInsets();
  const {addVehicle} = useGarage();

  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [mileage, setMileage] = useState('');
  const [plate, setPlate] = useState('');
  const [type, setType] = useState<VehicleType>('Sedan');
  const [fuel, setFuel] = useState<FuelType>('Petrol');
  const [basicOpen, setBasicOpen] = useState(true);

  const previewModel = useMemo(
    () => `${year || '—'} ${model || 'Vehicle'}`,
    [model, year],
  );

  const handleSave = () => {
    const id = addVehicle({
      name: name.trim() || 'New vehicle',
      model: model.trim() || 'Unknown',
      year: Number(year) || new Date().getFullYear(),
      type,
      fuel,
      plate: plate.trim() || '—',
      mileage: Number(mileage) || 0,
    });
    navigation.replace('VehicleDetail', {vehicleId: id});
  };

  return (
    <View style={styles.AddVehicleChassis}>
      <View style={[styles.AddVehicleHeader, {paddingTop: insets.top + 8}]}>
        <Pressable
          onPress={() => navigation.goBack()}
          hitSlop={10}
          style={styles.AddVehicleBackRow}>
          <AppIcon name="back" color={colors.orange} size={20} />
          <Text style={styles.AddVehicleBack}>Garage</Text>
        </Pressable>
        <Text style={styles.AddVehicleTitle}>Add vehicle</Text>
        <View style={styles.AddVehicleHeaderSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.AddVehicleScroll,
          {paddingBottom: Math.max(insets.bottom, 16) + 100},
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.AddVehiclePreview}>
          <View style={styles.AddVehiclePreviewIcon}>
            <AppIcon name="car" color={colors.orange} size={22} />
          </View>
          <View>
            <Text style={styles.AddVehiclePreviewName}>
              {name || 'Vehicle name'}
            </Text>
            <Text style={styles.AddVehiclePreviewModel}>{previewModel}</Text>
          </View>
        </View>

        <Text style={styles.AddVehicleLabel}>Vehicle name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.AddVehicleInput}
          placeholderTextColor="rgba(235,238,245,0.35)"
          placeholder="Nickname"
        />

        <Text style={styles.AddVehicleLabel}>Vehicle type</Text>
        <View style={styles.AddVehicleChips}>
          {VEHICLE_TYPES.map(item => {
            const active = item === type;
            return (
              <Pressable
                key={item}
                onPress={() => setType(item)}
                style={[
                  styles.AddVehicleChip,
                  active && styles.AddVehicleChipActive,
                ]}>
                <Text
                  style={[
                    styles.AddVehicleChipLabel,
                    active && styles.AddVehicleChipLabelActive,
                  ]}>
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.AddVehicleLabel}>Fuel / powertrain</Text>
        <View style={styles.AddVehicleFuelGrid}>
          {FUEL_TYPES.map(item => {
            const active = item.id === fuel;
            return (
              <Pressable
                key={item.id}
                onPress={() => setFuel(item.id)}
                style={[
                  styles.AddVehicleFuelCard,
                  active && styles.AddVehicleFuelCardActive,
                ]}>
                <Text
                  style={[
                    styles.AddVehicleFuelTitle,
                    active && styles.AddVehicleFuelTitleActive,
                  ]}>
                  {item.label}
                </Text>
                <Text style={styles.AddVehicleFuelSubtitle}>{item.subtitle}</Text>
              </Pressable>
            );
          })}
        </View>

        <Pressable
          onPress={() => setBasicOpen(value => !value)}
          style={styles.AddVehicleAccordionHeader}>
          <Text style={styles.AddVehicleAccordionTitle}>
            Basic info • optional
          </Text>
          <Text style={styles.AddVehicleAccordionChevron}>
            <AppIcon
              name="chevronRight"
              color={colors.label}
              size={16}
              style={{transform: [{rotate: basicOpen ? '-90deg' : '90deg'}]}}
            />
          </Text>
        </Pressable>

        {basicOpen ? (
          <View style={styles.AddVehicleBasicBlock}>
            <TextInput
              value={model}
              onChangeText={setModel}
              style={styles.AddVehicleInput}
              placeholder="Model"
              placeholderTextColor="rgba(235,238,245,0.35)"
            />
            <View style={styles.AddVehicleRow}>
              <TextInput
                value={year}
                onChangeText={setYear}
                style={[styles.AddVehicleInput, styles.AddVehicleInputHalf]}
                placeholder="Year"
                keyboardType="number-pad"
                placeholderTextColor="rgba(235,238,245,0.35)"
              />
              <TextInput
                value={mileage}
                onChangeText={setMileage}
                style={[styles.AddVehicleInput, styles.AddVehicleInputHalf]}
                placeholder="Mileage"
                keyboardType="number-pad"
                placeholderTextColor="rgba(235,238,245,0.35)"
              />
            </View>
            <TextInput
              value={plate}
              onChangeText={setPlate}
              style={styles.AddVehicleInput}
              placeholder="Plate"
              autoCapitalize="characters"
              placeholderTextColor="rgba(235,238,245,0.35)"
            />
          </View>
        ) : null}
      </ScrollView>

      <View
        style={[
          styles.AddVehicleFooter,
          {paddingBottom: Math.max(insets.bottom, 12) + 8},
        ]}>
        <Pressable onPress={handleSave}>
          <LinearGradient
            colors={[colors.buttonGradientStart, colors.buttonGradientEnd]}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}
            style={styles.AddVehicleSave}>
            <View style={styles.AddVehicleSaveInner}>
              <Text style={styles.AddVehicleSaveLabel}>Save vehicle</Text>
            </View>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  AddVehicleChassis: {
    backgroundColor: colors.background,
    flex: 1,
  },
  AddVehicleHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },

  AddVehicleBackRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 2,
    width: 90,
  },
  AddVehicleBack: {
    color: colors.orange,
    fontFamily: fonts.sansRegular,
    fontSize: 17,
  },

  AddVehicleTitle: {
    color: colors.cream,
    fontFamily: fonts.sansSemiBold,
    fontSize: 17,
    fontWeight: '600',
  },
  AddVehicleHeaderSpacer: {
    width: 90,
  },
  AddVehicleScroll: {
    paddingHorizontal: 16,
  },

  AddVehiclePreview: {
    alignItems: 'center',
    backgroundColor: 'rgba(18,22,32,0.9)',
    borderRadius: 20,
    flexDirection: 'row',
    gap: 14,
    marginBottom: 22,
    padding: 14,
  },
  AddVehiclePreviewIcon: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,178,63,0.18)',
    borderRadius: 14,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },

  AddVehiclePreviewName: {
    color: colors.cream,
    fontFamily: fonts.sansBold,
    fontSize: 18,
    fontWeight: '700',
  },
  AddVehiclePreviewModel: {
    color: 'rgba(235,238,245,0.55)',
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    marginTop: 2,
  },

  AddVehicleLabel: {
    color: 'rgba(235,238,245,0.55)',
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    marginBottom: 8,
  },
  AddVehicleInput: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 14,
    borderWidth: 1,
    color: colors.cream,
    fontFamily: fonts.sansRegular,
    fontSize: 16,
    marginBottom: 16,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  AddVehicleChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 18,
  },

  AddVehicleChip: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderColor: 'transparent',
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  AddVehicleChipActive: {
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderColor: colors.orange,
  },

  AddVehicleChipLabel: {
    color: 'rgba(235,238,245,0.75)',
    fontFamily: fonts.sansRegular,
    fontSize: 13,
  },
  AddVehicleChipLabelActive: {
    color: colors.cream,
  },

  AddVehicleFuelGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 18,
  },
  AddVehicleFuelCard: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
    width: '48%',
  },
  AddVehicleFuelCardActive: {
    borderColor: colors.orange,
  },

  AddVehicleFuelTitle: {
    color: colors.cream,
    fontFamily: fonts.sansBold,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  AddVehicleFuelTitleActive: {
    color: colors.orange,
  },
  AddVehicleFuelSubtitle: {
    color: 'rgba(235,238,245,0.5)',
    fontFamily: fonts.sansRegular,
    fontSize: 12,
  },

  AddVehicleAccordionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  AddVehicleAccordionTitle: {
    color: 'rgba(235,238,245,0.7)',
    fontFamily: fonts.sansSemiBold,
    fontSize: 14,
    fontWeight: '600',
  },
  AddVehicleAccordionChevron: {
    color: 'rgba(235,238,245,0.55)',
    fontSize: 16,
  },

  AddVehicleBasicBlock: {
    marginBottom: 12,
  },
  AddVehicleRow: {
    flexDirection: 'row',
    gap: 10,
  },

  AddVehicleInputHalf: {
    flex: 1,
  },
  AddVehicleFooter: {
    backgroundColor: colors.background,
    borderTopColor: 'rgba(255,255,255,0.06)',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 16,
    paddingTop: 12,
  },

  AddVehicleSave: {
    borderRadius: 27,
    overflow: 'hidden',
  },
  AddVehicleSaveInner: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 22,
    paddingVertical: 16,
  },
  AddVehicleSaveLabel: {
    color: colors.buttonText,
    fontFamily: fonts.sansBold,
    fontSize: 17,
    fontWeight: '700',
  },
});
