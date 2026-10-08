import React, {useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {PrimaryButton} from '../components/buttons/PrimaryButton';
import {PaginationDots} from '../components/nav/PaginationDots';
import {colors, fonts, layout} from '../constants/theme';
import {ONBOARDING_STEPS} from '../data/onboarding';
import {useAppNavigation} from '../navigation/NavigationContext';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'OnboardingScreen'>;

export function OnboardingScreen({navigation}: Props) {
  const insets = useSafeAreaInsets();
  const {setupDone} = useAppNavigation();
  const [stepIndex, setStepIndex] = useState(0);

  const step = ONBOARDING_STEPS[stepIndex];
  const isLastStep = stepIndex === ONBOARDING_STEPS.length - 1;

  // First run → Setup; once setup has been completed → straight to Main.
  const finishOnboarding = () =>
    navigation.navigate(setupDone ? 'MainNavigator' : 'SetupNavigator');

  const handleNext = () => {
    if (isLastStep) {
      finishOnboarding();
      return;
    }
    setStepIndex(prev => prev + 1);
  };

  return (
    <View style={styles.OnboardingScreenChassis}>
      <ScrollView
        style={styles.OnboardingScreenScroll}
        contentContainerStyle={styles.OnboardingScreenScrollContent}
        showsVerticalScrollIndicator={false}
        bounces>
        <View style={styles.OnboardingScreenHero}>
          <Image
            source={step.hero}
            style={styles.OnboardingScreenHeroImage}
            resizeMode="cover"
          />
        </View>

        <View
          style={[
            styles.OnboardingScreenBottom,
            {paddingBottom: Math.max(insets.bottom, 16) + 12},
          ]}>
          <Text style={styles.OnboardingScreenLabel}>{step.label}</Text>
          <Text style={styles.OnboardingScreenTitle}>{step.title}</Text>
          <Text style={styles.OnboardingScreenDescription}>
            {step.description}
          </Text>

          <View style={styles.OnboardingScreenFooter}>
            <PaginationDots
              total={ONBOARDING_STEPS.length}
              activeIndex={stepIndex}
            />
            <PrimaryButton label={step.buttonLabel} onPress={handleNext} />
          </View>
        </View>
      </ScrollView>

      <Pressable
        onPress={finishOnboarding}
        style={[
          styles.OnboardingScreenSkip,
          {top: Math.max(insets.top, 12) + 10},
        ]}
        hitSlop={12}>
        <Text style={styles.OnboardingScreenSkipLabel}>Skip</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  OnboardingScreenChassis: {
    backgroundColor: colors.background,
    flex: 1,
  },

  OnboardingScreenScroll: {
    flex: 1,
  },
  OnboardingScreenScrollContent: {
    flexGrow: 1,
  },

  OnboardingScreenHero: {
    minHeight: layout.heroImageHeight,
    overflow: 'hidden',
    width: '100%',
  },
  OnboardingScreenHeroImage: {
    height: layout.heroImageHeight,
    width: '100%',
  },

  OnboardingScreenSkip: {
    backgroundColor: colors.skipBg,
    borderColor: colors.border,
    borderRadius: 17,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 7,
    position: 'absolute',
    right: 18,
    zIndex: 2,
  },
  OnboardingScreenSkipLabel: {
    color: colors.skip,
    fontFamily: fonts.sansRegular,
    fontSize: 14,
  },

  OnboardingScreenBottom: {
    backgroundColor: colors.background,
    paddingHorizontal: layout.screenPadding,
    paddingTop: 8,
  },
  OnboardingScreenLabel: {
    color: colors.orange,
    fontFamily: fonts.sansBold,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.4,
    marginBottom: 10,
    textTransform: 'uppercase',
  },

  OnboardingScreenTitle: {
    color: colors.cream,
    fontFamily: fonts.sansBold,
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.6,
    lineHeight: 36,
    marginBottom: 14,
  },
  OnboardingScreenDescription: {
    color: colors.body,
    fontFamily: fonts.sansRegular,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 28,
  },
  OnboardingScreenFooter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
