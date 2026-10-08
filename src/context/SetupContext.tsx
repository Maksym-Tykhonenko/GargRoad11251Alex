import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import {createSetupDrafts, type SetupVehicleDraft} from '../data/setup';

type SetupContextValue = {
  userName: string;
  setUserName: (value: string) => void;
  vehicleCount: number;
  setVehicleCount: (count: number) => void;
  drafts: SetupVehicleDraft[];
  updateDraft: (index: number, patch: Partial<SetupVehicleDraft>) => void;
  ensureDrafts: (count: number) => void;
};

const SetupContext = createContext<SetupContextValue | null>(null);

export function SetupProvider({children}: {children: React.ReactNode}) {
  const [userName, setUserName] = useState('');
  const [vehicleCount, setVehicleCountState] = useState(1);
  const [drafts, setDrafts] = useState<SetupVehicleDraft[]>(() =>
    createSetupDrafts(2),
  );

  const ensureDrafts = useCallback((count: number) => {
    setDrafts(current => {
      if (current.length === count) {
        return current;
      }
      const next = createSetupDrafts(count);
      return next.map((draft, index) => ({
        ...draft,
        ...current[index],
        accent: draft.accent,
      }));
    });
  }, []);

  const setVehicleCount = useCallback(
    (count: number) => {
      setVehicleCountState(count);
      ensureDrafts(count);
    },
    [ensureDrafts],
  );

  const updateDraft = useCallback(
    (index: number, patch: Partial<SetupVehicleDraft>) => {
      setDrafts(current =>
        current.map((draft, draftIndex) =>
          draftIndex === index ? {...draft, ...patch} : draft,
        ),
      );
    },
    [],
  );

  const value = useMemo(
    () => ({
      userName,
      setUserName,
      vehicleCount,
      setVehicleCount,
      drafts,
      updateDraft,
      ensureDrafts,
    }),
    [
      userName,
      vehicleCount,
      setVehicleCount,
      drafts,
      updateDraft,
      ensureDrafts,
    ],
  );

  return (
    <SetupContext.Provider value={value}>{children}</SetupContext.Provider>
  );
}

export function useSetup() {
  const context = useContext(SetupContext);
  if (!context) {
    throw new Error('useSetup must be used within SetupProvider');
  }
  return context;
}
