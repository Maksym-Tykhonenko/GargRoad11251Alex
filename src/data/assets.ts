import type {ImageSourcePropType} from 'react-native';

import type {CalculatorToolId} from '../navigation/types';

export const icons = {
  loaderBg: require('../assets/garage-road-ready-loader-bg.png') as ImageSourcePropType,
  loaderLogo: require('../assets/garage-road-ready-loader-logo.png') as ImageSourcePropType,
};

export const onboardingHeroes = {
  step1: require('../assets/garage-road-ready-onboarding-hero-1.png') as ImageSourcePropType,
  step2: require('../assets/garage-road-ready-onboarding-hero-2.png') as ImageSourcePropType,
  step3: require('../assets/garage-road-ready-onboarding-hero-3.png') as ImageSourcePropType,
  step4: require('../assets/garage-road-ready-onboarding-hero-4.png') as ImageSourcePropType,
};

export const calculatorIcons: Record<CalculatorToolId, ImageSourcePropType> = {
  tripFuel: require('../assets/garage-road-ready-calc-trip-fuel.png') as ImageSourcePropType,
  fuelConsumption: require('../assets/garage-road-ready-calc-fuel-consumption.png') as ImageSourcePropType,
  fuelCost: require('../assets/garage-road-ready-calc-fuel-cost.png') as ImageSourcePropType,
  motoHours: require('../assets/garage-road-ready-calc-moto-hours.png') as ImageSourcePropType,
  lpg: require('../assets/garage-road-ready-calc-lpg.png') as ImageSourcePropType,
  ev: require('../assets/garage-road-ready-calc-ev.png') as ImageSourcePropType,
  hybrid: require('../assets/garage-road-ready-calc-hybrid.png') as ImageSourcePropType,
};

export const calculatorUiIcons = {
  saved: require('../assets/garage-road-ready-calc-saved.png') as ImageSourcePropType,
  car: require('../assets/garage-road-ready-calc-car.png') as ImageSourcePropType,
  calculate: require('../assets/garage-road-ready-calc-calculate.png') as ImageSourcePropType,
  pin: require('../assets/garage-road-ready-calc-pin.png') as ImageSourcePropType,
  bookmark: require('../assets/garage-road-ready-calc-bookmark.png') as ImageSourcePropType,
  share: require('../assets/garage-road-ready-calc-share.png') as ImageSourcePropType,
  redo: require('../assets/garage-road-ready-calc-redo.png') as ImageSourcePropType,
  delete: require('../assets/garage-road-ready-calc-delete.png') as ImageSourcePropType,
  empty: require('../assets/garage-road-ready-calc-empty.png') as ImageSourcePropType,
};

export const tabIcons = {
  garage: require('../assets/garage-road-ready-tab-garage.png') as ImageSourcePropType,
  calculators: require('../assets/garage-road-ready-tab-calculators.png') as ImageSourcePropType,
  records: require('../assets/garage-road-ready-tab-records.png') as ImageSourcePropType,
  learn: require('../assets/garage-road-ready-tab-learn.png') as ImageSourcePropType,
  knowledge: require('../assets/garage-road-ready-tab-knowledge.png') as ImageSourcePropType,
};

export const setupIcons = {
  back: require('../assets/setup/garage-road-ready-back.png') as ImageSourcePropType,
  person: require('../assets/setup/garage-road-ready-person.png') as ImageSourcePropType,
  car: require('../assets/setup/garage-road-ready-car.png') as ImageSourcePropType,
  check: require('../assets/setup/garage-road-ready-check.png') as ImageSourcePropType,
  info: require('../assets/setup/garage-road-ready-info.png') as ImageSourcePropType,
  taskProfiles: require('../assets/setup/garage-road-ready-task-profiles.png') as ImageSourcePropType,
  taskChecklist: require('../assets/setup/garage-road-ready-task-checklist.png') as ImageSourcePropType,
  taskCalculators: require('../assets/setup/garage-road-ready-task-calculators.png') as ImageSourcePropType,
  taskCards: require('../assets/setup/garage-road-ready-task-cards.png') as ImageSourcePropType,
};
