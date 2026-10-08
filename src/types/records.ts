export type RecordTemplateId =
  | 'mileage'
  | 'fuel'
  | 'ev'
  | 'service'
  | 'tire'
  | 'repair'
  | 'inspection';

export type RecordTimeFilter = 'all' | '30' | '90';

export type RecordTypeFilter =
  | 'all'
  | RecordTemplateId;

export type ServiceType =
  | 'Oil & filter'
  | 'Major service'
  | 'Brakes'
  | 'A/C service'
  | 'Inspection';

export type TireType = 'Summer' | 'Winter' | 'All-season';

export type InspectionKind =
  | 'Technical inspection'
  | 'Insurance renewal'
  | 'Registration';

export type RecordTemplate = {
  id: RecordTemplateId;
  title: string;
  fieldsLabel: string;
  accent: string;
  iconBg: string;
  icon:
    | 'speed'
    | 'fuel'
    | 'bolt'
    | 'wrench'
    | 'tire'
    | 'build'
    | 'shield';
  uses: number;
  lastLabel: string;
};

export type GarageRecord = {
  id: string;
  templateId: RecordTemplateId;
  vehicleId: string;
  vehicleName: string;
  title: string;
  date: string;
  dateLabel: string;
  details: string;
  cost?: number;
  distanceKm?: number;
  amount?: number;
  unit?: string;
  notes?: string;
  serviceType?: ServiceType;
  tireType?: TireType;
  brandSize?: string;
  station?: string;
  provider?: string;
  validUntil?: string;
  inspectionKind?: InspectionKind;
  previousMileage?: number;
  currentMileage?: number;
  mileage?: number;
  fuelPrice?: number;
  energyPrice?: number;
};

export type NewRecordDraft = {
  templateId: RecordTemplateId;
  vehicleId: string;
  vehicleName: string;
  date: string;
  mileage?: number;
  previousMileage?: number;
  currentMileage?: number;
  fuelAmount?: number;
  fuelPrice?: number;
  energyCharged?: number;
  energyPrice?: number;
  station?: string;
  serviceType?: ServiceType;
  cost?: number;
  notes?: string;
  tireType?: TireType;
  brandSize?: string;
  repair?: string;
  inspectionKind?: InspectionKind;
  provider?: string;
  validUntil?: string;
};
