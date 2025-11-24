const Explorer = NativeModules?.ExplorerModule ?? {};

function explorerRead(key: string, fallback: string | null): string | null {
  try {
    if (typeof Explorer.readFromLocalStorage === 'function') {
      return Explorer.readFromLocalStorage(key);
    }
  } catch {
    return fallback;
  }
  return fallback;
}

function explorerSave(key: string, value: string): boolean {
  try {
    if (typeof Explorer.saveToLocalStorage === 'function') {
      Explorer.saveToLocalStorage(key, value);
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

export { explorerRead, explorerSave };
