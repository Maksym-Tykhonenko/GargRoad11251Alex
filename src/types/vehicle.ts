export type VehicleStatus = 'almostReady' | 'roadReady' | 'needsAttention';

export type FuelType =
  | 'Petrol'
  | 'Diesel'
  | 'LPG'
  | 'Hybrid'
  | 'Plug-in Hybrid'
  | 'Electric';

export type VehicleType =
  | 'Sedan'
  | 'Hatchback'
  | 'SUV'
  | 'Wagon'
  | 'Coupe'
  | 'Convertible'
  | 'Pickup'
  | 'Van'
  | 'Motorcycle'
  | 'Other';

export type ChecklistCategoryId =
  | 'preTrip'
  | 'seasonal'
  | 'longTrip'
  | 'usedCar';

export type ChecklistItem = {
  id: string;
  title: string;
  section: string;
  description?: string;
  done: boolean;
  custom?: boolean;
};

export type ChecklistCategory = {
  id: ChecklistCategoryId;
  label: string;
  items: ChecklistItem[];
};

export type Vehicle = {
  id: string;
  name: string;
  model: string;
  year: number;
  type: VehicleType;
  fuel: FuelType;
  plate: string;
  mileage: number;
  accent: string;
  lastActivityLabel: string;
  lastActivityWhen: string;
  checklists: ChecklistCategory[];
};

export function getCategoryProgress(category: ChecklistCategory) {
  const total = category.items.length;
  const done = category.items.filter(item => item.done).length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  return {done, total, percent};
}

export function getVehicleProgress(vehicle: Vehicle) {
  const allItems = vehicle.checklists.flatMap(category => category.items);
  const total = allItems.length;
  const done = allItems.filter(item => item.done).length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  return {done, total, percent};
}

export function getPreTripProgress(vehicle: Vehicle) {
  const preTrip = vehicle.checklists.find(category => category.id === 'preTrip');
  if (!preTrip) {
    return {done: 0, total: 0, percent: 0};
  }
  return getCategoryProgress(preTrip);
}

export function getStatusFromPercent(percent: number): VehicleStatus {
  if (percent >= 85) {
    return 'roadReady';
  }
  if (percent >= 50) {
    return 'almostReady';
  }
  return 'needsAttention';
}

export function getStatusLabel(status: VehicleStatus) {
  switch (status) {
    case 'roadReady':
      return 'Road Ready';
    case 'almostReady':
      return 'Almost Ready';
    default:
      return 'Needs Attention';
  }
}

export function getStatusColor(status: VehicleStatus) {
  switch (status) {
    case 'roadReady':
      return '#3ddc84';
    case 'almostReady':
      return '#ffb23f';
    default:
      return '#ff5a5f';
  }
}
