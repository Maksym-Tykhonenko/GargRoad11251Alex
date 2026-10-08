import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {createChecklists} from '../data/checklists';
import {SEED_VEHICLES} from '../data/vehicles';
import {loadJson, loadString, saveJson, saveString, storageKeys} from '../storage/persist';
import type {
  ChecklistCategoryId,
  FuelType,
  Vehicle,
  VehicleType,
} from '../types/vehicle';

type AddVehicleInput = {
  name: string;
  model: string;
  year: number;
  type: VehicleType;
  fuel: FuelType;
  plate: string;
  mileage: number;
};

type GarageContextValue = {
  vehicles: Vehicle[];
  userName: string;
  setUserName: (value: string) => void;
  editing: boolean;
  setEditing: (value: boolean) => void;
  getVehicle: (id: string) => Vehicle | undefined;
  addVehicle: (input: AddVehicleInput) => string;
  replaceVehicles: (vehicles: Vehicle[]) => void;
  deleteVehicle: (id: string) => void;
  toggleCheckItem: (
    vehicleId: string,
    categoryId: ChecklistCategoryId,
    itemId: string,
  ) => void;
  clearCategoryProgress: (
    vehicleId: string,
    categoryId: ChecklistCategoryId,
  ) => void;
  resetCategory: (vehicleId: string, categoryId: ChecklistCategoryId) => void;
  addCustomCheck: (
    vehicleId: string,
    categoryId: ChecklistCategoryId,
    title: string,
  ) => void;
};

const GarageContext = createContext<GarageContextValue | null>(null);

const DEMO_VEHICLE_IDS = new Set(['sunset', 'volt', 'wagon']);

export function GarageProvider({children}: {children: React.ReactNode}) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [userName, setUserNameState] = useState('');
  const [editing, setEditing] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const [saved, savedName] = await Promise.all([
        loadJson<Vehicle[] | null>(storageKeys.vehicles, null),
        loadString(storageKeys.userName, ''),
      ]);
      if (!mounted) {
        return;
      }
      if (saved && saved.length > 0) {
        const withoutDemo = saved.filter(
          vehicle => !DEMO_VEHICLE_IDS.has(vehicle.id),
        );
        setVehicles(current => {
          if (current.length > 0) {
            return current;
          }
          // Keep demo seeds if user has no personal vehicles yet
          return withoutDemo.length > 0 ? withoutDemo : saved;
        });
      } else if (!saved) {
        setVehicles(current =>
          current.length > 0 ? current : SEED_VEHICLES,
        );
      }
      if (savedName && savedName !== 'Alex') {
        setUserNameState(savedName);
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
    void saveJson(storageKeys.vehicles, vehicles);
  }, [hydrated, vehicles]);

  const setUserName = useCallback((value: string) => {
    const next = value.trim();
    setUserNameState(next);
    void saveString(storageKeys.userName, next);
  }, []);

  const getVehicle = useCallback(
    (id: string) => vehicles.find(vehicle => vehicle.id === id),
    [vehicles],
  );

  const addVehicle = useCallback((input: AddVehicleInput) => {
    const id = `vehicle-${Date.now()}`;

    setVehicles(current => [
      ...current,
      {
        id,
        name: input.name,
        model: input.model,
        year: input.year,
        type: input.type,
        fuel: input.fuel,
        plate: input.plate,
        mileage: input.mileage,
        accent: '#ffb23f',
        lastActivityLabel: 'Added to garage',
        lastActivityWhen: 'Just now',
        checklists: createChecklists(id, input.fuel),
      },
    ]);
    return id;
  }, []);

  const replaceVehicles = useCallback((next: Vehicle[]) => {
    setVehicles(next);
    void saveJson(storageKeys.vehicles, next);
  }, []);

  const deleteVehicle = useCallback((id: string) => {
    setVehicles(current => current.filter(vehicle => vehicle.id !== id));
  }, []);

  const updateCategory = useCallback(
    (
      vehicleId: string,
      categoryId: ChecklistCategoryId,
      updater: (
        items: Vehicle['checklists'][number]['items'],
      ) => Vehicle['checklists'][number]['items'],
    ) => {
      setVehicles(current =>
        current.map(vehicle => {
          if (vehicle.id !== vehicleId) {
            return vehicle;
          }
          return {
            ...vehicle,
            checklists: vehicle.checklists.map(category =>
              category.id === categoryId
                ? {...category, items: updater(category.items)}
                : category,
            ),
          };
        }),
      );
    },
    [],
  );

  const toggleCheckItem = useCallback(
    (vehicleId: string, categoryId: ChecklistCategoryId, itemId: string) => {
      updateCategory(vehicleId, categoryId, items =>
        items.map(item =>
          item.id === itemId ? {...item, done: !item.done} : item,
        ),
      );
    },
    [updateCategory],
  );

  const clearCategoryProgress = useCallback(
    (vehicleId: string, categoryId: ChecklistCategoryId) => {
      updateCategory(vehicleId, categoryId, items =>
        items.map(item => ({...item, done: false})),
      );
    },
    [updateCategory],
  );

  const resetCategory = useCallback(
    (vehicleId: string, categoryId: ChecklistCategoryId) => {
      const vehicle = vehicles.find(item => item.id === vehicleId);
      if (!vehicle) {
        return;
      }
      const fresh = createChecklists(vehicleId, vehicle.fuel).find(
        category => category.id === categoryId,
      );
      if (!fresh) {
        return;
      }
      updateCategory(vehicleId, categoryId, () => fresh.items);
    },
    [updateCategory, vehicles],
  );

  const addCustomCheck = useCallback(
    (vehicleId: string, categoryId: ChecklistCategoryId, title: string) => {
      const trimmed = title.trim();
      if (!trimmed) {
        return;
      }
      updateCategory(vehicleId, categoryId, items => [
        ...items,
        {
          id: `${vehicleId}-${categoryId}-custom-${Date.now()}`,
          title: trimmed,
          section: 'Custom',
          description: 'Custom check',
          done: false,
          custom: true,
        },
      ]);
    },
    [updateCategory],
  );

  const value = useMemo(
    () => ({
      vehicles,
      userName,
      setUserName,
      editing,
      setEditing,
      getVehicle,
      addVehicle,
      replaceVehicles,
      deleteVehicle,
      toggleCheckItem,
      clearCategoryProgress,
      resetCategory,
      addCustomCheck,
    }),
    [
      vehicles,
      userName,
      setUserName,
      editing,
      getVehicle,
      addVehicle,
      replaceVehicles,
      deleteVehicle,
      toggleCheckItem,
      clearCategoryProgress,
      resetCategory,
      addCustomCheck,
    ],
  );

  return (
    <GarageContext.Provider value={value}>{children}</GarageContext.Provider>
  );
}

export function useGarage() {
  const context = useContext(GarageContext);
  if (!context) {
    throw new Error('useGarage must be used within GarageProvider');
  }
  return context;
}
