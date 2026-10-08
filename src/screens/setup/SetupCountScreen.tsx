import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useSetup} from '../../context/SetupContext';
import {SETUP_COUNT_OPTIONS} from '../../data/setup';
import {SetupIcon} from '../../components/setup/SetupIcon';
import {colors, fonts} from '../../constants/theme';
import type {
  RootStackParamList,
  SetupStackParamList,
} from '../../navigation/types';

type Props = NativeStackScreenProps<SetupStackParamList, 'SetupCount'>;

export function SetupCountScreen({navigation}: Props) {
  const insets = useSafeAreaInsets();
  const {userName, setUserName, vehicleCount, setVehicleCount} = useSetup();

  const returnToOnboarding = () =>
    navigation
      .getParent<NativeStackNavigationProp<RootStackParamList>>()
      ?.navigate('OnboardingScreen');

  return (
    <View style={styles.SetupChassis}>
      <View style={[styles.SetupTop, {paddingTop: insets.top + 8}]}>
        <Pressable
          onPress={returnToOnboarding}
          style={styles.SetupBackCircle}
          hitSlop={8}>
          <SetupIcon name="back" color={colors.cream} size={22} />
        </Pressable>
        <View style={styles.SetupProgressTrack}>
          <View style={[styles.SetupProgressSeg, styles.SetupProgressSegOn]} />
          <View style={styles.SetupProgressSeg} />
          <View style={styles.SetupProgressSeg} />
        </View>
        <Text style={styles.SetupStepLabel}>1 of 3</Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: Math.max(insets.bottom, 16) + 100,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <Text style={styles.SetupTitle}>
          How many vehicles would you like to track?
        </Text>
        <Text style={styles.SetupSubtitle}>
          You can add or remove vehicles any time from your garage.
        </Text>

        <Text style={styles.SetupLabel}>What should we call you?</Text>
        <View style={styles.SetupNameField}>
          <SetupIcon name="person" color={colors.label} size={22} />
          <TextInput
            value={userName}
            onChangeText={setUserName}
            placeholder="Your name"
            placeholderTextColor="rgba(235,238,245,0.35)"
            style={styles.SetupNameInput}
          />
        </View>

        <View style={styles.SetupGrid}>
          {SETUP_COUNT_OPTIONS.map(option => {
            const active = option.count === vehicleCount;
            return (
              <Pressable
                key={option.count}
                onPress={() => setVehicleCount(option.count)}
                style={[
                  styles.SetupCountCard,
                  active && styles.SetupCountCardActive,
                ]}>
                {active ? (
                  <View style={styles.SetupCheck}>
                    <SetupIcon name="check" color={colors.orange} size={24} />
                  </View>
                ) : null}
                <Text
                  style={[
                    styles.SetupCountNumber,
                    active && styles.SetupCountNumberActive,
                  ]}>
                  {option.count}
                </Text>
                <Text
                  style={[
                    styles.SetupCountTitle,
                    active && styles.SetupCountTitleActive,
                  ]}>
                  {option.title}
                </Text>
                <Text style={styles.SetupCountSubtitle}>{option.subtitle}</Text>
                <View style={styles.SetupCountIcons}>
                  {option.accents.map((accent, index) => (
                    <SetupIcon
                      key={`${option.count}-${index}`}
                      name="car"
                      color={accent}
                      size={18}
                    />
                  ))}
                </View>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.SetupInfo}>
          <SetupIcon name="info" color="#3d9bff" size={24} />
          <Text style={styles.SetupInfoText}>
            Each vehicle gets its own checklists, records and road readiness
            score.
          </Text>
        </View>
      </ScrollView>

      <View
        style={[
          styles.SetupFooter,
          {paddingBottom: Math.max(insets.bottom, 12) + 8},
        ]}>
        <Pressable onPress={() => navigation.navigate('SetupVehicle', {index: 0})}>
          <LinearGradient
            colors={[colors.buttonGradientStart, colors.buttonGradientEnd]}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}
            style={styles.SetupButton}>
            <View style={styles.SetupButtonInner}>
              <Text style={styles.SetupButtonLabel}>Continue</Text>
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
  SetupTop: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    paddingBottom: 12,
    paddingHorizontal: 20,
  },
  SetupBackCircle: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    width: 40,
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
    width: 42,
  },
  SetupTitle: {
    color: colors.cream,
    fontFamily: fonts.sansBold,
    fontSize: 30,
    letterSpacing: -0.5,
    lineHeight: 34,
    marginBottom: 10,
  },

  SetupSubtitle: {
    color: colors.bodyMuted,
    fontFamily: fonts.sansRegular,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 22,
  },
  SetupLabel: {
    color: colors.bodyMuted,
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    marginBottom: 8,
  },

  SetupNameField: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 10,
    height: 52,
    marginBottom: 18,
    paddingHorizontal: 14,
  },
  SetupNameInput: {
    color: colors.cream,
    flex: 1,
    fontFamily: fonts.sansRegular,
    fontSize: 16,
    paddingVertical: 0,
  },
  SetupGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 14,
  },

  SetupCountCard: {
    backgroundColor: 'rgba(18,22,32,0.92)',
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 22,
    borderWidth: 1.5,
    minHeight: 150,
    padding: 16,
    width: '47.5%',
  },
  SetupCountCardActive: {
    borderColor: 'rgba(255,178,63,0.9)',
  },
  SetupCheck: {
    position: 'absolute',
    right: 10,
    top: 10,
  },

  SetupCountNumber: {
    color: colors.cream,
    fontFamily: fonts.condensedBoldItalic,
    fontSize: 52,
    fontStyle: 'italic',
    lineHeight: 52,
  },
  SetupCountNumberActive: {
    color: colors.orange,
  },
  SetupCountTitle: {
    color: colors.cream,
    fontFamily: fonts.sansBold,
    fontSize: 16,
    marginTop: 4,
  },

  SetupCountTitleActive: {
    color: colors.orange,
  },
  SetupCountSubtitle: {
    color: colors.label,
    fontFamily: fonts.sansRegular,
    fontSize: 12.5,
    marginTop: 4,
  },
  SetupCountIcons: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 12,
  },

  SetupInfo: {
    alignItems: 'flex-start',
    backgroundColor: 'rgba(61,155,255,0.08)',
    borderColor: 'rgba(61,155,255,0.2)',
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  SetupInfoText: {
    color: 'rgba(235,238,245,0.75)',
    flex: 1,
    fontFamily: fonts.sansRegular,
    fontSize: 13.5,
    lineHeight: 19,
  },
  SetupFooter: {
    borderTopColor: 'rgba(255,255,255,0.06)',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 20,
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
