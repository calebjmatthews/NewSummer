const storageNames = ['fields', 'storehouse', 'recordBook'];

export function setLocalStorages(storages) {
  storageNames.map((storageName) => {
    localStorage.setItem(storageName, JSON.stringify(storages[storageName]));
  });
}

export function getLocalStorages() {
  let localStoragesObj = {};
  const storageNames = ['fields', 'storehouse', 'recordBook'];
  let atLeastOnePresent = false;
  storageNames.map((cName) => {
    let oneLocalStorage = localStorage.getItem(cName);
    if (oneLocalStorage != null) {
      localStoragesObj[cName] = JSON.parse(oneLocalStorage);
      atLeastOnePresent = true;
    }
  });
  if (!atLeastOnePresent) { return false; }
  return localStoragesObj;
}
