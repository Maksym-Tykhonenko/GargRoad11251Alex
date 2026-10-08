import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import type {CalculatorToolId} from '../navigation/types';
import {loadJson, saveJson, storageKeys} from '../storage/persist';

export type SavedCalculation = {
  id: string;
  toolId: CalculatorToolId;
  vehicleId: string;
  vehicleName: string;
  createdAt: number;
  summary: string;
  metricLabel: string;
  metricValue: string;
  accent: string;
  values: Record<string, string>;
  segment: string;
};

type CalculatorsContextValue = {
  saved: SavedCalculation[];
  saveCalculation: (input: Omit<SavedCalculation, 'id' | 'createdAt'>) => string;
  deleteCalculation: (id: string) => void;
};

const CalculatorsContext = createContext<CalculatorsContextValue | null>(null);

export function CalculatorsProvider({children}: {children: React.ReactNode}) {
  const [saved, setSaved] = useState<SavedCalculation[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const loaded = await loadJson<SavedCalculation[]>(
        storageKeys.calculations,
        [],
      );
      if (!mounted) {
        return;
      }
      setSaved(loaded);
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
    void saveJson(storageKeys.calculations, saved);
  }, [hydrated, saved]);

  const saveCalculation = useCallback(
    (input: Omit<SavedCalculation, 'id' | 'createdAt'>) => {
      const id = `calc-${Date.now()}`;
      setSaved(current => [{...input, id, createdAt: Date.now()}, ...current]);
      return id;
    },
    [],
  );

  const deleteCalculation = useCallback((id: string) => {
    setSaved(current => current.filter(item => item.id !== id));
  }, []);

  const value = useMemo(
    () => ({saved, saveCalculation, deleteCalculation}),
    [saved, saveCalculation, deleteCalculation],
  );

  return (
    <CalculatorsContext.Provider value={value}>
      {children}
    </CalculatorsContext.Provider>
  );
}

export function useCalculators() {
  const context = useContext(CalculatorsContext);
  if (!context) {
    throw new Error('useCalculators must be used within CalculatorsProvider');
  }
  return context;
}
