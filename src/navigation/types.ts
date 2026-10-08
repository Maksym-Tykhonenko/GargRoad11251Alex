import type {RecordTemplateId} from '../types/records';

export type AppPhase = 'Loader' | 'Onboarding' | 'Setup' | 'Main';

export type RootStackParamList = {
  LoaderScreen: undefined;
  OnboardingScreen: undefined;
  SetupNavigator: undefined;
  MainNavigator: undefined;
};

export type RootTabParamList = {
  GarageTab: undefined;
  CalculatorsTab: undefined;
  RecordsTab: undefined;
  LearnTab: undefined;
  KnowledgeTab: undefined;
};

export type SetupStackParamList = {
  SetupCount: undefined;
  SetupVehicle: {index: number};
  SetupPreparing: undefined;
};

export type GarageStackParamList = {
  GarageHome: undefined;
  AddVehicle: undefined;
  VehicleDetail: {vehicleId: string};
};

export type CalculatorToolId =
  | 'tripFuel'
  | 'fuelConsumption'
  | 'fuelCost'
  | 'motoHours'
  | 'lpg'
  | 'ev'
  | 'hybrid';

export type CalculatorsStackParamList = {
  CalculatorsHome: undefined;
  Calculator: {toolId: CalculatorToolId; savedId?: string};
  SavedCalculations: undefined;
};

export type RecordsStackParamList = {
  RecordsHome: undefined;
  NewRecord: {templateId: RecordTemplateId};
};

export type KnowledgeStackParamList = {
  KnowledgeHome: undefined;
  KnowledgeCard: {cardId?: string};
};

export type LearnStackParamList = {
  LearnHome: undefined;
  ArticleDetail: {articleId: string};
};
