import {createChecklists} from './checklists';
import type {Vehicle} from '../types/vehicle';

export const SEED_VEHICLES: Vehicle[] = [
  {
    id: 'sunset',
    name: 'Sunset GT',
    model: 'BMW 330i',
    year: 2020,
    type: 'Sedan',
    fuel: 'Petrol',
    plate: 'GR 330',
    mileage: 84210,
    accent: '#ffb23f',
    lastActivityLabel: 'Fuel fill-up',
    lastActivityWhen: '2 days ago',
    checklists: createChecklists('sunset', 'Petrol', {
      preTrip: 8,
      seasonal: 3,
      longTrip: 5,
    }),
  },
  {
    id: 'volt',
    name: 'Volt Runner',
    model: 'Hyundai Ioniq 5',
    year: 2023,
    type: 'SUV',
    fuel: 'Electric',
    plate: 'EV 5120',
    mileage: 21480,
    accent: '#3d9bff',
    lastActivityLabel: 'EV charging',
    lastActivityWhen: 'Yesterday',
    checklists: createChecklists('volt', 'Electric', {
      preTrip: 11,
      seasonal: 8,
      longTrip: 9,
      usedCar: 4,
    }),
  },
  {
    id: 'wagon',
    name: 'Weekend Wagon',
    model: 'Škoda Octavia Combi',
    year: 2016,
    type: 'Wagon',
    fuel: 'Diesel',
    plate: 'WK 1629',
    mileage: 162900,
    accent: '#2fd3c6',
    lastActivityLabel: 'Service record',
    lastActivityWhen: '12 days ago',
    checklists: createChecklists('wagon', 'Diesel', {
      preTrip: 4,
      longTrip: 5,
    }),
  },
];

export const VEHICLE_TYPES: Vehicle['type'][] = [
  'Sedan',
  'Hatchback',
  'SUV',
  'Wagon',
  'Coupe',
  'Convertible',
  'Pickup',
  'Van',
  'Motorcycle',
  'Other',
];

export const FUEL_TYPES: Array<{
  id: Vehicle['fuel'];
  label: string;
  subtitle: string;
}> = [
  {id: 'Petrol', label: 'Petrol', subtitle: 'Gasoline engine'},
  {id: 'Diesel', label: 'Diesel', subtitle: 'Compression ignition'},
  {id: 'LPG', label: 'LPG', subtitle: 'Autogas system'},
  {id: 'Hybrid', label: 'Hybrid', subtitle: 'Petrol + electric'},
  {id: 'Plug-in Hybrid', label: 'Plug-in Hybrid', subtitle: 'Chargeable hybrid'},
  {id: 'Electric', label: 'Electric', subtitle: 'Battery EV'},
];
