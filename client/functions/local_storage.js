const storageNames = ['fields', 'storehouse', 'recordBook', 'autoIncrement'];

export function setLocalStorages(storages) {
  storageNames.map((storageName) => {
    let sStorage = storages[storageName];
    if (sStorage != undefined) {
      localStorage.setItem(storageName,
        JSON.stringify(storages[storageName]));
    }
  });
}

export function getLocalStorages() {
  let localStoragesObj = {};
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
