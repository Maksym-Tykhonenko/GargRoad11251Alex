import AsyncStorage from '@react-native-async-storage/async-storage';

export const storageKeys = {
  appPhase: '@grrh/appPhase',
  setupDone: '@grrh/setupDone',
  vehicles: '@grrh/vehicles',
  records: '@grrh/records',
  calculations: '@grrh/calculations',
  learnBookmarks: '@grrh/learnBookmarks',
  learnLastRead: '@grrh/learnLastRead',
  userName: '@grrh/userName',
} as const;

export async function loadJson<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) {
      return fallback;
    }
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function saveJson<T>(key: string, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore persistence failures; in-memory state remains usable.
  }
}

export async function loadString(
  key: string,
  fallback: string | null = null,
): Promise<string | null> {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

export async function saveString(key: string, value: string): Promise<void> {
  try {
    await AsyncStorage.setItem(key, value);
  } catch {
    // Ignore persistence failures.
  }
}

export async function removeKey(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch {
    // Ignore persistence failures.
  }
}
