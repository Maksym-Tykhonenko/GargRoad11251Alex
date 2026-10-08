import type {FuelType, VehicleType} from '../types/vehicle';

export type SetupVehicleDraft = {
  name: string;
  model: string;
  year: string;
  mileage: string;
  plate: string;
  type: VehicleType;
  fuel: FuelType;
  accent: string;
};

export const SETUP_COUNT_OPTIONS = [
  {
    count: 1,
    title: 'Just one',
    subtitle: 'My daily driver',
    accents: ['#ffb23f'],
  },
  {
    count: 2,
    title: 'Two',
    subtitle: 'Car + second car',
    accents: ['#ffb23f', '#3d9bff'],
  },
  {
    count: 3,
    title: 'Three',
    subtitle: 'Family garage',
    accents: ['#ffb23f', '#3d9bff', '#2fd3c6'],
  },
  {
    count: 4,
    title: 'Four',
    subtitle: 'Enthusiast fleet',
    accents: ['#ffb23f', '#3d9bff', '#2fd3c6', '#ff7ab8'],
  },
] as const;

export const SETUP_VEHICLE_TYPES: VehicleType[] = [
  'Sedan',
  'Hatchback',
  'SUV',
  'Wagon',
  'Coupe',
  'Pickup',
  'Van',
  'Motorcycle',
];

const DRAFT_TYPES: VehicleType[] = ['Sedan', 'SUV', 'Wagon', 'Hatchback'];
const DRAFT_FUELS: FuelType[] = ['Petrol', 'Electric', 'Diesel', 'Hybrid'];
const DRAFT_ACCENTS = ['#ffb23f', '#3d9bff', '#2fd3c6', '#ff7ab8'];

export function createSetupDrafts(count: number): SetupVehicleDraft[] {
  return Array.from({length: count}, (_, index) => ({
    name: '',
    model: '',
    year: '',
    mileage: '',
    plate: '',
    type: DRAFT_TYPES[index] ?? 'Sedan',
    fuel: DRAFT_FUELS[index] ?? 'Petrol',
    accent: DRAFT_ACCENTS[index] ?? '#ffb23f',
  }));
}

export function buildPreparingTasks(drafts: SetupVehicleDraft[]) {
  const fuels = Array.from(new Set(drafts.map(item => item.fuel)));
  const fuelLabel = fuels.slice(0, 2).join(' & ') || 'your fleet';
  const checklistCount = drafts.length * 46;

  return [
    {
      id: 'profiles',
      label: `Creating ${drafts.length} vehicle profile${drafts.length === 1 ? '' : 's'}`,
      icon: 'taskProfiles' as const,
    },
    {
      id: 'checklists',
      label: `Loading ${checklistCount} checklist items`,
      icon: 'taskChecklist' as const,
    },
    {
      id: 'calculators',
      label: `Tuning calculators for ${fuelLabel}`,
      icon: 'taskCalculators' as const,
    },
    {
      id: 'knowledge',
      label: 'Shuffling 13 knowledge cards',
      icon: 'taskCards' as const,
    },
  ];
}
