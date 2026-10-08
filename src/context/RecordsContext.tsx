import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {RECORD_TEMPLATES, formatDateLabel} from '../data/records';
import {loadJson, saveJson, storageKeys} from '../storage/persist';
import type {
  GarageRecord,
  NewRecordDraft,
  RecordTemplate,
  RecordTemplateId,
  RecordTimeFilter,
  RecordTypeFilter,
} from '../types/records';

type RecordsContextValue = {
  templates: RecordTemplate[];
  records: GarageRecord[];
  addRecord: (draft: NewRecordDraft) => void;
  deleteRecord: (id: string) => void;
  duplicateRecord: (id: string) => void;
  getTemplate: (id: RecordTemplateId) => RecordTemplate | undefined;
  filterRecords: (params: {
    vehicleId: string | 'all';
    type: RecordTypeFilter;
    time: RecordTimeFilter;
  }) => GarageRecord[];
  getStats: (list: GarageRecord[]) => {
    count: number;
    spent: number;
    kmLogged: number;
  };
};

const RecordsContext = createContext<RecordsContextValue | null>(null);

const DEMO_RECORD_IDS = new Set([
  'r1',
  'r2',
  'r3',
  'r4',
  'r5',
  'r6',
  'r7',
  'r8',
  'r9',
  'r10',
]);

function daysAgo(iso: string) {
  const now = new Date('2026-09-25T12:00:00');
  const date = new Date(`${iso}T12:00:00`);
  return Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
}

export function RecordsProvider({children}: {children: React.ReactNode}) {
  const [records, setRecords] = useState<GarageRecord[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const saved = await loadJson<GarageRecord[] | null>(
        storageKeys.records,
        null,
      );
      if (!mounted) {
        return;
      }
      if (saved) {
        setRecords(saved.filter(record => !DEMO_RECORD_IDS.has(record.id)));
      }
      setHydrated(true);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }
    void saveJson(storageKeys.records, records);
  }, [hydrated, records]);

  const getTemplate = useCallback(
    (id: RecordTemplateId) => RECORD_TEMPLATES.find(item => item.id === id),
    [],
  );

  const addRecord = useCallback(
    (draft: NewRecordDraft) => {
      const template = RECORD_TEMPLATES.find(
        item => item.id === draft.templateId,
      );
      if (!template) {
        return;
      }

      let details = '';
      let cost = draft.cost;
      let distanceKm: number | undefined;
      let title = template.title;

      if (draft.templateId === 'mileage') {
        const prev = draft.previousMileage ?? 0;
        const current = draft.currentMileage ?? 0;
        distanceKm = current - prev;
        details = `Previous ${prev.toLocaleString('en-US')} · Current ${current.toLocaleString('en-US')}`;
      } else if (draft.templateId === 'fuel') {
        const amount = draft.fuelAmount ?? 0;
        const price = draft.fuelPrice ?? 0;
        cost = amount * price;
        details = `${amount} L · €${price.toFixed(2)}/L`;
      } else if (draft.templateId === 'ev') {
        const amount = draft.energyCharged ?? 0;
        const price = draft.energyPrice ?? 0;
        cost = amount * price;
        details = `${amount} kWh${draft.station ? ` · ${draft.station}` : ''}`;
      } else if (draft.templateId === 'service') {
        details = `${draft.serviceType ?? 'Service'}${draft.notes ? ` · ${draft.notes}` : ''}`;
      } else if (draft.templateId === 'tire') {
        details = `${draft.tireType ?? 'Tires'}${draft.brandSize ? ` · ${draft.brandSize}` : ''}`;
      } else if (draft.templateId === 'repair') {
        details = draft.repair || draft.notes || 'Repair';
      } else if (draft.templateId === 'inspection') {
        details = `${draft.inspectionKind ?? 'Inspection'}${draft.validUntil ? ` · Valid until ${draft.validUntil}` : ''}`;
      }

      const next: GarageRecord = {
        id: `record-${Date.now()}`,
        templateId: draft.templateId,
        vehicleId: draft.vehicleId,
        vehicleName: draft.vehicleName,
        title,
        date: draft.date,
        dateLabel: formatDateLabel(draft.date),
        details,
        cost,
        distanceKm,
        amount: draft.fuelAmount ?? draft.energyCharged,
        unit:
          draft.templateId === 'fuel'
            ? 'L'
            : draft.templateId === 'ev'
              ? 'kWh'
              : undefined,
        notes: draft.notes || draft.repair,
        serviceType: draft.serviceType,
        tireType: draft.tireType,
        brandSize: draft.brandSize,
        station: draft.station,
        provider: draft.provider,
        validUntil: draft.validUntil,
        inspectionKind: draft.inspectionKind,
        previousMileage: draft.previousMileage,
        currentMileage: draft.currentMileage,
        mileage: draft.mileage ?? draft.currentMileage,
        fuelPrice: draft.fuelPrice,
        energyPrice: draft.energyPrice,
      };

      setRecords(current => [next, ...current]);
    },
    [],
  );

  const deleteRecord = useCallback((id: string) => {
    setRecords(current => current.filter(item => item.id !== id));
  }, []);

  const duplicateRecord = useCallback((id: string) => {
    setRecords(current => {
      const source = current.find(item => item.id === id);
      if (!source) {
        return current;
      }
      return [
        {
          ...source,
          id: `record-${Date.now()}`,
          date: '2026-09-25',
          dateLabel: formatDateLabel('2026-09-25'),
        },
        ...current,
      ];
    });
  }, []);

  const filterRecords = useCallback(
    ({
      vehicleId,
      type,
      time,
    }: {
      vehicleId: string | 'all';
      type: RecordTypeFilter;
      time: RecordTimeFilter;
    }) => {
      return records.filter(item => {
        if (vehicleId !== 'all' && item.vehicleId !== vehicleId) {
          return false;
        }
        if (type !== 'all' && item.templateId !== type) {
          return false;
        }
        if (time === '30' && daysAgo(item.date) > 30) {
          return false;
        }
        if (time === '90' && daysAgo(item.date) > 90) {
          return false;
        }
        return true;
      });
    },
    [records],
  );

  const getStats = useCallback((list: GarageRecord[]) => {
    return list.reduce(
      (acc, item) => {
        acc.count += 1;
        acc.spent += item.cost ?? 0;
        acc.kmLogged += item.distanceKm ?? 0;
        return acc;
      },
      {count: 0, spent: 0, kmLogged: 0},
    );
  }, []);

  const value = useMemo(
    () => ({
      templates: RECORD_TEMPLATES,
      records,
      addRecord,
      deleteRecord,
      duplicateRecord,
      getTemplate,
      filterRecords,
      getStats,
    }),
    [
      records,
      addRecord,
      deleteRecord,
      duplicateRecord,
      getTemplate,
      filterRecords,
      getStats,
    ],
  );

  return (
    <RecordsContext.Provider value={value}>{children}</RecordsContext.Provider>
  );
}

export function useRecords() {
  const context = useContext(RecordsContext);
  if (!context) {
    throw new Error('useRecords must be used within RecordsProvider');
  }
  return context;
}
