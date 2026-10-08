export type KnowledgeCategory =
  | 'Engine'
  | 'Electrical'
  | 'Cooling'
  | 'Fuel Systems'
  | 'Diesel'
  | 'Exhaust'
  | 'Emissions'
  | 'Braking'
  | 'Suspension'
  | 'Drivetrain'
  | 'Transmission'
  | 'Electric'
  | 'Comfort'
  | 'Steering'
  | 'Hybrid';

export type KnowledgeIcon =
  | 'gear'
  | 'bolt'
  | 'swirl'
  | 'drop'
  | 'wind'
  | 'battery'
  | 'chip'
  | 'wrench'
  | 'flame';

export type KnowledgeStatus = 'deck' | 'known' | 'learn';

export type KnowledgeCard = {
  id: string;
  title: string;
  category: KnowledgeCategory;
  icon: KnowledgeIcon;
  what: string;
  does: string;
  custom?: boolean;
};

export const KNOWLEDGE_CATEGORIES: KnowledgeCategory[] = [
  'Engine',
  'Braking',
  'Electrical',
  'Drivetrain',
  'Electric',
  'Hybrid',
  'Exhaust',
  'Cooling',
  'Fuel Systems',
  'Diesel',
  'Emissions',
  'Suspension',
  'Transmission',
  'Comfort',
  'Steering',
];

export const KNOWLEDGE_ICONS: KnowledgeIcon[] = [
  'gear',
  'bolt',
  'swirl',
  'drop',
  'wind',
  'battery',
  'chip',
  'wrench',
  'flame',
];
