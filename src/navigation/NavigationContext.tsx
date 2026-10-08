import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {loadString, saveString, storageKeys} from '../storage/persist';

type NavigationContextValue = {
  ready: boolean;
  // True once the user has completed the initial Setup flow at least once.
  // Controls whether onboarding routes to Setup (first run) or straight to
  // Main (subsequent runs).
  setupDone: boolean;
  markSetupDone: () => void;
};

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function NavigationProvider({children}: {children: React.ReactNode}) {
  const [ready, setReady] = useState(false);
  const [setupDone, setSetupDone] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const saved = await loadString(storageKeys.setupDone, null);
      if (!mounted) {
        return;
      }
      setSetupDone(saved === 'true');
      setReady(true);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const markSetupDone = useCallback(() => {
    setSetupDone(true);
    void saveString(storageKeys.setupDone, 'true');
  }, []);

  const value = useMemo(
    () => ({ready, setupDone, markSetupDone}),
    [ready, setupDone, markSetupDone],
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useAppNavigation() {
  const context = useContext(NavigationContext);

  if (!context) {
    throw new Error('useAppNavigation must be used within NavigationProvider');
  }

  return context;
}
