export enum StorageKey {
  ACCOUNT = 'account',
}

export function save (key:StorageKey, data:any) {
  if (!data) return;

  if (typeof data === 'object') {
    localStorage.setItem(key, JSON.stringify(data));
  } else {
    localStorage.setItem(key, data);
  }
}

export function get (key:StorageKey):any|null {
  let valueToReturn;

  const stringValue = localStorage.getItem(key);
  try {
    valueToReturn = JSON.parse(stringValue || '');
  } catch (error) {
    valueToReturn = stringValue;
  }
  return valueToReturn;
}

export function remove (key:StorageKey) {
  localStorage.removeItem(key);
}

export function clearAll () {
  localStorage.clear();
}
