import React, {useEffect, useMemo, useState} from 'react';
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

import {AppIcon} from '../../components/icons/AppIcon';
import {useGarage} from '../../context/GarageContext';
import {useRecords} from '../../context/RecordsContext';
import {formatMoney} from '../../data/records';
import {colors, fonts} from '../../constants/theme';
import type {RecordsStackParamList} from '../../navigation/types';
import type {
  InspectionKind,
  ServiceType,
  TireType,
} from '../../types/records';

type Props = NativeStackScreenProps<RecordsStackParamList, 'NewRecord'>;

const SERVICE_TYPES: ServiceType[] = [
  'Oil & filter',
  'Major service',
  'Brakes',
  'A/C service',
  'Inspection',
];

const TIRE_TYPES: TireType[] = ['Summer', 'Winter', 'All-season'];

const INSPECTION_KINDS: InspectionKind[] = [
  'Technical inspection',
  'Insurance renewal',
  'Registration',
];

function Field({
  label,
  value,
  onChangeText,
  unit,
  placeholder,
  keyboardType = 'default',
  multiline,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  unit?: string;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'decimal-pad';
  multiline?: boolean;
}) {
  return (
    <View style={styles.FieldBlock}>
      <Text style={styles.FieldLabel}>{label}</Text>
      <View style={[styles.FieldInputWrap, multiline && styles.FieldInputTall]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="rgba(235,238,245,0.35)"
          keyboardType={keyboardType}
          multiline={multiline}
          style={styles.FieldInput}
        />
        {unit ? <Text style={styles.FieldUnit}>{unit}</Text> : null}
      </View>
    </View>
  );
}

export function NewRecordScreen({navigation, route}: Props) {
  const insets = useSafeAreaInsets();
  const {vehicles} = useGarage();
  const {getTemplate, addRecord} = useRecords();
  const template = getTemplate(route.params?.templateId);

  const [vehicleId, setVehicleId] = useState('');
  const selectedVehicle =
    vehicles.find(item => item.id === vehicleId) ?? vehicles[0];

  useEffect(() => {
    if (vehicles.length === 0) {
      return;
    }
    const stillValid = vehicles.some(item => item.id === vehicleId);
    if (!vehicleId || !stillValid) {
      setVehicleId(vehicles[0].id);
    }
  }, [vehicles, vehicleId]);

  const [date, setDate] = useState(() => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${now.getFullYear()}-${month}-${day}`;
  });
  const [previousMileage, setPreviousMileage] = useState('');
  const [currentMileage, setCurrentMileage] = useState('');
  const [mileage, setMileage] = useState('');
  const [fuelAmount, setFuelAmount] = useState('');
  const [fuelPrice, setFuelPrice] = useState('');
  const [energyCharged, setEnergyCharged] = useState('');
  const [energyPrice, setEnergyPrice] = useState('');
  const [station, setStation] = useState('');
  const [serviceType, setServiceType] = useState<ServiceType>('Oil & filter');
  const [cost, setCost] = useState('');
  const [notes, setNotes] = useState('');
  const [tireType, setTireType] = useState<TireType>('Summer');
  const [brandSize, setBrandSize] = useState('');
  const [repair, setRepair] = useState('');
  const [inspectionKind, setInspectionKind] =
    useState<InspectionKind>('Technical inspection');
  const [provider, setProvider] = useState('');
  const [validUntil, setValidUntil] = useState('');

  useEffect(() => {
    if (!selectedVehicle) {
      return;
    }
    setMileage(String(selectedVehicle.mileage));
    setCurrentMileage(String(selectedVehicle.mileage));
    setPreviousMileage(String(Math.max(0, selectedVehicle.mileage - 250)));
  }, [selectedVehicle?.id]);

  const summary = useMemo(() => {
    if (!template) {
      return null;
    }
    if (template.id === 'mileage') {
      const distance =
        (Number(currentMileage) || 0) - (Number(previousMileage) || 0);
      return {
        label: 'Distance driven',
        value: `${distance.toLocaleString('en-US')} km`,
      };
    }
    if (template.id === 'fuel') {
      const total = (Number(fuelAmount) || 0) * (Number(fuelPrice) || 0);
      return {label: 'Total cost', value: formatMoney(total)};
    }
    if (template.id === 'ev') {
      const total = (Number(energyCharged) || 0) * (Number(energyPrice) || 0);
      return {label: 'Total cost', value: formatMoney(total)};
    }
    return null;
  }, [
    template,
    currentMileage,
    previousMileage,
    fuelAmount,
    fuelPrice,
    energyCharged,
    energyPrice,
  ]);

  if (!template) {
    return (
      <View style={styles.NewRecordEmpty}>
        <Text style={styles.NewRecordEmptyText}>Template unavailable</Text>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.NewRecordEmptyAction}>
          <Text style={styles.NewRecordEmptyActionLabel}>Back to Records</Text>
        </Pressable>
      </View>
    );
  }

  if (!selectedVehicle) {
    return (
      <View style={styles.NewRecordEmpty}>
        <Text style={styles.NewRecordEmptyText}>
          Add a vehicle in Garage first
        </Text>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.NewRecordEmptyAction}>
          <Text style={styles.NewRecordEmptyActionLabel}>Back to Records</Text>
        </Pressable>
      </View>
    );
  }

  const save = () => {
    addRecord({
      templateId: template.id,
      vehicleId: selectedVehicle.id,
      vehicleName: selectedVehicle.name,
      date,
      previousMileage: Number(previousMileage) || 0,
      currentMileage: Number(currentMileage) || 0,
      mileage: Number(mileage) || selectedVehicle.mileage,
      fuelAmount: Number(fuelAmount) || 0,
      fuelPrice: Number(fuelPrice) || 0,
      energyCharged: Number(energyCharged) || 0,
      energyPrice: Number(energyPrice) || 0,
      station,
      serviceType,
      cost: Number(cost) || 0,
      notes,
      tireType,
      brandSize,
      repair,
      inspectionKind,
      provider,
      validUntil,
    });
    navigation.goBack();
  };

  return (
    <View style={styles.NewRecordChassis}>
      <View style={[styles.NewRecordHeader, {paddingTop: insets.top + 8}]}>
        <Pressable
          onPress={() => navigation.goBack()}
          hitSlop={10}
          style={styles.NewRecordBackRow}>
          <AppIcon name="back" color={colors.orange} size={20} />
          <Text style={styles.NewRecordBack}>Records</Text>
        </Pressable>
        <Text style={styles.NewRecordTitle}>New record</Text>
        <Pressable onPress={save} hitSlop={10}>
          <Text style={styles.NewRecordSaveLink}>Save</Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.NewRecordScroll,
          {paddingBottom: Math.max(insets.bottom, 16) + 110},
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.NewRecordHero}>
          <View
            style={[styles.NewRecordHeroIcon, {backgroundColor: template.iconBg}]}>
            <AppIcon
              name={template.icon}
              color={template.accent}
              size={22}
            />
          </View>
          <View>
            <Text style={styles.NewRecordHeroTitle}>{template.title}</Text>
            <Text style={styles.NewRecordHeroSubtitle}>
              Entry #{template.uses + 1} from template
            </Text>
          </View>
        </View>

        <Text style={styles.SectionLabel}>Vehicle</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.VehicleScroll}
          contentContainerStyle={styles.VehicleRow}>
          {vehicles.map(vehicle => {
            const active = vehicle.id === vehicleId;
            return (
              <Pressable
                key={vehicle.id}
                onPress={() => {
                  setVehicleId(vehicle.id);
                  setMileage(String(vehicle.mileage));
                  setPreviousMileage(String(vehicle.mileage));
                }}
                style={[styles.VehicleChip, active && styles.VehicleChipActive]}>
                <AppIcon
                  name="car"
                  color={active ? colors.orange : 'rgba(235,238,245,0.75)'}
                  size={14}
                />
                <Text
                  style={[
                    styles.VehicleChipLabel,
                    active && styles.VehicleChipLabelActive,
                  ]}>
                  {vehicle.name}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.FormCard}>
          {template.id === 'mileage' ? (
            <>
              <Field
                label="Previous mileage"
                value={previousMileage}
                onChangeText={setPreviousMileage}
                unit="km"
                keyboardType="numeric"
              />
              <Field
                label="Current mileage"
                value={currentMileage}
                onChangeText={setCurrentMileage}
                unit="km"
                keyboardType="numeric"
              />
              <Field label="Date" value={date} onChangeText={setDate} />
            </>
          ) : null}

          {template.id === 'fuel' ? (
            <>
              <Field
                label="Mileage"
                value={mileage}
                onChangeText={setMileage}
                unit="km"
                keyboardType="numeric"
              />
              <Field
                label="Fuel amount"
                value={fuelAmount}
                onChangeText={setFuelAmount}
                unit="L"
                keyboardType="decimal-pad"
              />
              <Field
                label="Fuel price"
                value={fuelPrice}
                onChangeText={setFuelPrice}
                unit="€/L"
                keyboardType="decimal-pad"
              />
              <Field label="Date" value={date} onChangeText={setDate} />
            </>
          ) : null}

          {template.id === 'ev' ? (
            <>
              <Field
                label="Mileage"
                value={mileage}
                onChangeText={setMileage}
                unit="km"
                keyboardType="numeric"
              />
              <Field
                label="Energy charged"
                value={energyCharged}
                onChangeText={setEnergyCharged}
                unit="kWh"
                keyboardType="decimal-pad"
              />
              <Field
                label="Price"
                value={energyPrice}
                onChangeText={setEnergyPrice}
                unit="€/kWh"
                keyboardType="decimal-pad"
              />
              <Field
                label="Charging station"
                value={station}
                onChangeText={setStation}
                placeholder="Optional"
              />
              <Field label="Date" value={date} onChangeText={setDate} />
            </>
          ) : null}

          {template.id === 'service' ? (
            <>
              <Field
                label="Mileage"
                value={mileage}
                onChangeText={setMileage}
                unit="km"
                keyboardType="numeric"
              />
              <Text style={styles.FieldLabel}>Service type</Text>
              <View style={styles.OptionWrap}>
                {SERVICE_TYPES.map(item => {
                  const active = item === serviceType;
                  return (
                    <Pressable
                      key={item}
                      onPress={() => setServiceType(item)}
                      style={[
                        styles.OptionChip,
                        active && styles.OptionChipActive,
                      ]}>
                      <Text
                        style={[
                          styles.OptionChipLabel,
                          active && styles.OptionChipLabelActive,
                        ]}>
                        {item}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
              <Field
                label="Cost"
                value={cost}
                onChangeText={setCost}
                unit="€"
                keyboardType="decimal-pad"
              />
              <Field
                label="Notes"
                value={notes}
                onChangeText={setNotes}
                placeholder="Optional"
                multiline
              />
              <Field label="Date" value={date} onChangeText={setDate} />
            </>
          ) : null}

          {template.id === 'tire' ? (
            <>
              <Field
                label="Mileage"
                value={mileage}
                onChangeText={setMileage}
                unit="km"
                keyboardType="numeric"
              />
              <Text style={styles.FieldLabel}>Tire type</Text>
              <View style={styles.OptionWrap}>
                {TIRE_TYPES.map(item => {
                  const active = item === tireType;
                  return (
                    <Pressable
                      key={item}
                      onPress={() => setTireType(item)}
                      style={[
                        styles.OptionChip,
                        active && {
                          borderColor: template.accent,
                        },
                      ]}>
                      <Text
                        style={[
                          styles.OptionChipLabel,
                          active && {color: template.accent},
                        ]}>
                        {item}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
              <Field
                label="Brand & size"
                value={brandSize}
                onChangeText={setBrandSize}
                placeholder="Optional"
              />
              <Field label="Date" value={date} onChangeText={setDate} />
            </>
          ) : null}

          {template.id === 'repair' ? (
            <>
              <Field
                label="Mileage"
                value={mileage}
                onChangeText={setMileage}
                unit="km"
                keyboardType="numeric"
              />
              <Field
                label="Repair"
                value={repair}
                onChangeText={setRepair}
                placeholder="Optional"
              />
              <Field
                label="Cost"
                value={cost}
                onChangeText={setCost}
                unit="€"
                keyboardType="decimal-pad"
              />
              <Field
                label="Notes"
                value={notes}
                onChangeText={setNotes}
                placeholder="Optional"
              />
              <Field label="Date" value={date} onChangeText={setDate} />
            </>
          ) : null}

          {template.id === 'inspection' ? (
            <>
              <Text style={styles.FieldLabel}>Record type</Text>
              <View style={styles.OptionWrap}>
                {INSPECTION_KINDS.map(item => {
                  const active = item === inspectionKind;
                  return (
                    <Pressable
                      key={item}
                      onPress={() => setInspectionKind(item)}
                      style={[
                        styles.OptionChip,
                        active && {borderColor: template.accent},
                      ]}>
                      <Text
                        style={[
                          styles.OptionChipLabel,
                          active && {color: template.accent},
                        ]}>
                        {item}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
              <Field
                label="Provider"
                value={provider}
                onChangeText={setProvider}
                placeholder="Optional"
              />
              <Field
                label="Cost"
                value={cost}
                onChangeText={setCost}
                unit="€"
                keyboardType="decimal-pad"
              />
              <Field
                label="Valid until"
                value={validUntil}
                onChangeText={setValidUntil}
                placeholder="YYYY-MM-DD"
              />
              <Field label="Date" value={date} onChangeText={setDate} />
            </>
          ) : null}
        </View>

        {summary ? (
          <View style={styles.SummaryBar}>
            <View style={styles.SummaryLabelRow}>
              <AppIcon name="sum" color={colors.label} size={14} />
              <Text style={styles.SummaryLabel}>{summary.label}</Text>
            </View>
            <Text style={styles.SummaryValue}>{summary.value}</Text>
          </View>
        ) : null}
      </ScrollView>

      <View
        style={[
          styles.NewRecordFooter,
          {paddingBottom: Math.max(insets.bottom, 12) + 8},
        ]}>
        <Pressable onPress={save}>
          <LinearGradient
            colors={[colors.buttonGradientStart, colors.buttonGradientEnd]}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}
            style={styles.SaveButton}>
            <View style={styles.SaveButtonInner}>
              <Text style={styles.SaveButtonLabel}>Save record</Text>
            </View>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  NewRecordChassis: {
    backgroundColor: colors.background,
    flex: 1,
  },
  NewRecordEmpty: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
    gap: 16,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  NewRecordEmptyText: {
    color: colors.cream,
    fontFamily: fonts.sansSemiBold,
    fontSize: 17,
    textAlign: 'center',
  },

  NewRecordEmptyAction: {
    backgroundColor: 'rgba(255,178,63,0.16)',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  NewRecordEmptyActionLabel: {
    color: colors.orange,
    fontFamily: fonts.sansBold,
    fontSize: 15,
  },
  NewRecordHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingHorizontal: 16,
  },

  NewRecordBackRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 2,
    width: 90,
  },
  NewRecordBack: {
    color: colors.orange,
    fontSize: 17,
  },
  NewRecordTitle: {
    color: colors.cream,
    fontFamily: fonts.sansSemiBold,
    fontSize: 17,
    fontWeight: '600',
  },

  NewRecordSaveLink: {
    color: colors.orange,
    fontSize: 17,
    textAlign: 'right',
    width: 90,
  },
  NewRecordScroll: {
    paddingHorizontal: 16,
  },
  NewRecordHero: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    marginBottom: 18,
  },

  NewRecordHeroIcon: {
    alignItems: 'center',
    borderRadius: 16,
    height: 52,
    justifyContent: 'center',
    width: 52,
  },
  NewRecordHeroTitle: {
    color: colors.cream,
    fontFamily: fonts.sansBold,
    fontSize: 22,
    fontWeight: '700',
  },
  NewRecordHeroSubtitle: {
    color: 'rgba(235,238,245,0.5)',
    fontSize: 13,
    marginTop: 2,
  },

  SectionLabel: {
    color: 'rgba(235,238,245,0.55)',
    fontSize: 13,
    marginBottom: 8,
  },

  VehicleScroll: {
    marginBottom: 16,
    marginHorizontal: -16,
  },
  VehicleRow: {
    gap: 8,
    paddingLeft: 16,
    paddingRight: 0,
  },
  VehicleChip: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderColor: 'transparent',
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  VehicleChipActive: {
    borderColor: colors.orange,
  },
  VehicleChipLabel: {
    color: 'rgba(235,238,245,0.75)',
    fontSize: 14,
  },
  VehicleChipLabelActive: {
    color: colors.orange,
  },

  FormCard: {
    backgroundColor: 'rgba(18,22,32,0.92)',
    borderRadius: 20,
    marginBottom: 12,
    padding: 14,
  },

  FieldBlock: {
    marginBottom: 12,
  },
  FieldLabel: {
    color: 'rgba(235,238,245,0.55)',
    fontSize: 13,
    marginBottom: 8,
  },
  FieldInputWrap: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.28)',
    borderRadius: 14,
    flexDirection: 'row',
    minHeight: 48,
    paddingHorizontal: 12,
  },

  FieldInputTall: {
    alignItems: 'flex-start',
    minHeight: 84,
    paddingVertical: 10,
  },
  FieldInput: {
    color: colors.cream,
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
  },
  FieldUnit: {
    color: 'rgba(235,238,245,0.45)',
    fontSize: 14,
    marginLeft: 8,
  },

  OptionWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  OptionChip: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderColor: 'transparent',
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  OptionChipActive: {
    borderColor: colors.orange,
  },

  OptionChipLabel: {
    color: 'rgba(235,238,245,0.75)',
    fontSize: 13,
  },
  OptionChipLabelActive: {
    color: colors.orange,
  },

  SummaryBar: {
    alignItems: 'center',
    backgroundColor: 'rgba(18,22,32,0.92)',
    borderColor: 'rgba(255,178,63,0.35)',
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  SummaryLabelRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },

  SummaryLabel: {
    color: 'rgba(235,238,245,0.6)',
    fontSize: 14,
  },
  SummaryValue: {
    color: colors.cream,
    fontFamily: fonts.sansBold,
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight: '700',
  },
  NewRecordFooter: {
    backgroundColor: colors.background,
    borderTopColor: 'rgba(255,255,255,0.06)',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 16,
    paddingTop: 12,
  },

  SaveButton: {
    borderRadius: 27,
    overflow: 'hidden',
  },
  SaveButtonInner: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 22,
    paddingVertical: 16,
  },
  SaveButtonLabel: {
    color: colors.buttonText,
    fontFamily: fonts.sansBold,
    fontSize: 17,
    fontWeight: '700',
  },
});
