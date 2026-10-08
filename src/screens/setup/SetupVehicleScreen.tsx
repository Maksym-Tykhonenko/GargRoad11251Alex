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

import {useSetup} from '../../context/SetupContext';
import {SETUP_VEHICLE_TYPES} from '../../data/setup';
import {FUEL_TYPES} from '../../data/vehicles';
import {AppIcon} from '../../components/icons/AppIcon';
import {SetupIcon} from '../../components/setup/SetupIcon';
import {colors, fonts} from '../../constants/theme';
import type {SetupStackParamList} from '../../navigation/types';

type Props = NativeStackScreenProps<SetupStackParamList, 'SetupVehicle'>;

export function SetupVehicleScreen({navigation, route}: Props) {
  const insets = useSafeAreaInsets();
  const {drafts, updateDraft, vehicleCount} = useSetup();
  const index = Math.min(route.params.index, drafts.length - 1);
  const draft = drafts[index];
  const [basicOpen, setBasicOpen] = useState(true);
  const isLast = index >= vehicleCount - 1;

  const previewModel = useMemo(
    () => `${draft.year || '—'} ${draft.model || 'Vehicle'}`,
    [draft.model, draft.year],
  );

  const goNext = () => {
    if (isLast) {
      navigation.navigate('SetupPreparing');
      return;
    }
    navigation.push('SetupVehicle', {index: index + 1});
  };

  if (!draft) {
    return <View style={styles.SetupChassis} />;
  }

  return (
    <View style={styles.SetupChassis}>
      <View style={[styles.SetupHeader, {paddingTop: insets.top + 8}]}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.SetupBackCircle}
          hitSlop={8}>
          <SetupIcon name="back" color={colors.cream} size={22} />
        </Pressable>
        <Text style={styles.SetupHeaderTitle}>
          Vehicle {index + 1} of {vehicleCount}
        </Text>
        <View style={styles.SetupHeaderSpacer} />
      </View>

      <View style={styles.SetupProgressRow}>
        <View style={styles.SetupProgressTrack}>
          <View style={[styles.SetupProgressSeg, styles.SetupProgressSegOn]} />
          <View
            style={[
              styles.SetupProgressSeg,
              styles.SetupProgressSegOn,
              {opacity: 0.85},
            ]}
          />
          <View style={styles.SetupProgressSeg} />
        </View>
        <Text style={styles.SetupStepLabel}>2 of 3</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.SetupTabsScroll}
        contentContainerStyle={styles.SetupTabs}>
        {drafts.slice(0, vehicleCount).map((item, tabIndex) => {
          const active = tabIndex === index;
          return (
            <Pressable
              key={`${item.name}-${tabIndex}`}
              onPress={() =>
                navigation.navigate('SetupVehicle', {index: tabIndex})
              }
              style={[
                styles.SetupTab,
                active && {borderColor: item.accent},
              ]}>
              <Text
                style={[
                  styles.SetupTabLabel,
                  active && {color: item.accent},
                ]}>
                {item.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: Math.max(insets.bottom, 16) + 110,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View style={styles.SetupPreview}>
          <View
            style={[
              styles.SetupPreviewIcon,
              {backgroundColor: `${draft.accent}22`},
            ]}>
            <SetupIcon name="car" color={draft.accent} size={26} />
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.SetupPreviewName}>{draft.name}</Text>
            <Text style={styles.SetupPreviewModel}>{previewModel}</Text>
          </View>
        </View>

        <Text style={styles.SetupLabel}>Vehicle name</Text>
        <TextInput
          value={draft.name}
          onChangeText={value => updateDraft(index, {name: value})}
          style={styles.SetupInput}
          placeholderTextColor="rgba(235,238,245,0.35)"
        />

        <Text style={styles.SetupLabel}>Vehicle type</Text>
        <View style={styles.SetupChips}>
          {SETUP_VEHICLE_TYPES.map(item => {
            const active = item === draft.type;
            return (
              <Pressable
                key={item}
                onPress={() => updateDraft(index, {type: item})}
                style={[
                  styles.SetupChip,
                  active && {
                    borderColor: draft.accent,
                  },
                ]}>
                <Text
                  style={[
                    styles.SetupChipLabel,
                    active && {color: draft.accent},
                  ]}>
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.SetupLabel}>Fuel / powertrain</Text>
        <View style={styles.SetupFuelGrid}>
          {FUEL_TYPES.map(item => {
            const active = item.id === draft.fuel;
            return (
              <Pressable
                key={item.id}
                onPress={() => updateDraft(index, {fuel: item.id})}
                style={[
                  styles.SetupFuelCard,
                  active && {
                    borderColor: draft.accent,
                  },
                ]}>
                <SetupIcon
                  name={
                    item.id === 'Electric' ||
                    item.id === 'Hybrid' ||
                    item.id === 'Plug-in Hybrid'
                      ? 'bolt'
                      : 'fuel'
                  }
                  color={active ? draft.accent : colors.label}
                  size={20}
                />
                <Text style={styles.SetupFuelTitle}>{item.label}</Text>
                <Text style={styles.SetupFuelSubtitle}>{item.subtitle}</Text>
              </Pressable>
            );
          })}
        </View>

        <Pressable
          onPress={() => setBasicOpen(value => !value)}
          style={styles.SetupAccordion}>
          <Text style={styles.SetupAccordionLabel}>Basic info — optional</Text>
          <AppIcon
            name="chevronRight"
            color="rgba(235,238,245,0.55)"
            size={18}
            style={{transform: [{rotate: basicOpen ? '-90deg' : '90deg'}]}}
          />
        </Pressable>

        {basicOpen ? (
          <View style={styles.SetupBasic}>
            <TextInput
              value={draft.model}
              onChangeText={value => updateDraft(index, {model: value})}
              style={styles.SetupInput}
              placeholder="Model"
              placeholderTextColor="rgba(235,238,245,0.35)"
            />
            <View style={styles.SetupBasicRow}>
              <TextInput
                value={draft.year}
                onChangeText={value => updateDraft(index, {year: value})}
                style={[styles.SetupInput, styles.SetupInputHalf]}
                placeholder="Year"
                keyboardType="number-pad"
                placeholderTextColor="rgba(235,238,245,0.35)"
              />
              <TextInput
                value={draft.mileage}
                onChangeText={value => updateDraft(index, {mileage: value})}
                style={[styles.SetupInput, styles.SetupInputHalf]}
                placeholder="Mileage"
                keyboardType="number-pad"
                placeholderTextColor="rgba(235,238,245,0.35)"
              />
            </View>
            <TextInput
              value={draft.plate}
              onChangeText={value => updateDraft(index, {plate: value})}
              style={styles.SetupInput}
              placeholder="Plate"
              autoCapitalize="characters"
              placeholderTextColor="rgba(235,238,245,0.35)"
            />
          </View>
        ) : null}
      </ScrollView>

      <View
        style={[
          styles.SetupFooter,
          {paddingBottom: Math.max(insets.bottom, 12) + 8},
        ]}>
        <Pressable onPress={goNext}>
          <LinearGradient
            colors={[colors.buttonGradientStart, colors.buttonGradientEnd]}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}
            style={styles.SetupButton}>
            <View style={styles.SetupButtonInner}>
              <Text style={styles.SetupButtonLabel}>
                {isLast ? 'Finish setup' : 'Next vehicle'}
              </Text>
            </View>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  SetupChassis: {
    backgroundColor: colors.background,
    flex: 1,
  },
  SetupHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
  SetupBackCircle: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },

  SetupHeaderTitle: {
    color: colors.cream,
    flex: 1,
    fontFamily: fonts.sansSemiBold,
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
  },
  SetupHeaderSpacer: {
    width: 40,
  },

  SetupProgressRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  SetupProgressTrack: {
    flex: 1,
    flexDirection: 'row',
    gap: 6,
  },

  SetupProgressSeg: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 2,
    flex: 1,
    height: 4,
  },
  SetupProgressSegOn: {
    backgroundColor: colors.orange,
  },
  SetupStepLabel: {
    color: colors.label,
    fontFamily: fonts.sansRegular,
    fontSize: 13,
  },

  SetupTabsScroll: {
    flexGrow: 0,
    marginBottom: 12,
    minHeight: 40,
  },
  SetupTabs: {
    alignItems: 'center',
    gap: 8,
    minHeight: 40,
    paddingLeft: 16,
    paddingRight: 16,
  },

  SetupTab: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderColor: 'transparent',
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 34,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  SetupTabLabel: {
    color: 'rgba(235,238,245,0.72)',
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    includeFontPadding: false,
    lineHeight: 18,
    textAlignVertical: 'center',
  },

  SetupPreview: {
    alignItems: 'center',
    backgroundColor: 'rgba(18,22,32,0.92)',
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
    padding: 14,
  },
  SetupPreviewIcon: {
    alignItems: 'center',
    borderRadius: 14,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },

  SetupPreviewName: {
    color: colors.cream,
    fontFamily: fonts.sansBold,
    fontSize: 18,
  },
  SetupPreviewModel: {
    color: colors.label,
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    marginTop: 2,
  },

  SetupLabel: {
    color: colors.label,
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    marginBottom: 8,
    marginTop: 4,
  },
  SetupInput: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 14,
    borderWidth: 1,
    color: colors.cream,
    fontFamily: fonts.sansRegular,
    fontSize: 16,
    marginBottom: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  SetupChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },

  SetupChip: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderColor: 'transparent',
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  SetupChipLabel: {
    color: colors.cream,
    fontFamily: fonts.sansRegular,
    fontSize: 13,
  },

  SetupFuelGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 8,
  },
  SetupFuelCard: {
    backgroundColor: 'rgba(18,22,32,0.92)',
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
    width: '47.5%',
  },

  SetupFuelTitle: {
    color: colors.cream,
    fontFamily: fonts.sansBold,
    fontSize: 14,
    marginTop: 6,
  },
  SetupFuelSubtitle: {
    color: colors.label,
    fontFamily: fonts.sansRegular,
    fontSize: 12,
    marginTop: 2,
  },

  SetupAccordion: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingVertical: 10,
  },
  SetupAccordionLabel: {
    color: colors.cream,
    fontFamily: fonts.sansSemiBold,
    fontSize: 15,
    fontWeight: '600',
  },

  SetupBasic: {
    marginBottom: 8,
  },
  SetupBasicRow: {
    flexDirection: 'row',
    gap: 10,
  },

  SetupInputHalf: {
    flex: 1,
  },
  SetupFooter: {
    borderTopColor: 'rgba(255,255,255,0.06)',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 16,
    paddingTop: 12,
  },

  SetupButton: {
    borderRadius: 18,
    overflow: 'hidden',
  },
  SetupButtonInner: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 22,
    paddingVertical: 16,
  },
  SetupButtonLabel: {
    color: colors.buttonText,
    fontFamily: fonts.sansBold,
    fontSize: 17,
    fontWeight: '700',
  },
});
