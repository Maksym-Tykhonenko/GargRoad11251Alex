import type {ImageSourcePropType} from 'react-native';

import {onboardingHeroes} from './assets';

export type OnboardingStep = {
  hero: ImageSourcePropType;
  label: string;
  title: string;
  description: string;
  buttonLabel: string;
};

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    hero: onboardingHeroes.step1,
    label: 'Garage',
    title: 'Your whole garage in one hub',
    description:
      'Add every car, bike or EV you drive and keep mileage, records and road readiness side by side.',
    buttonLabel: 'Next',
  },
  {
    hero: onboardingHeroes.step2,
    label: 'Checklists',
    title: 'Road ready before every trip',
    description:
      'Ready-made pre-trip, seasonal, long-trip and used-car checklists. Tick, customise and watch your readiness score climb.',
    buttonLabel: 'Next',
  },
  {
    hero: onboardingHeroes.step3,
    label: 'Records & Calculators',
    title: 'Track records. Run the numbers.',
    description:
      'Log fill-ups, services and repairs from templates, and use seven calculators for fuel, LPG, EV and hybrid costs.',
    buttonLabel: 'Next',
  },
  {
    hero: onboardingHeroes.step4,
    label: 'Learn',
    title: 'Understand how your car works',
    description:
      'Short articles and swipeable knowledge cards explain engines, brakes, batteries and more — from the very basics up.',
    buttonLabel: 'Get started',
  },
];
