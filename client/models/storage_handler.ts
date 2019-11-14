const storageNames: string[] = ['fields', 'homestead', 'recordBook', 'cast'];

export default class StorageHandler {
  setLocalStorages(storages: Object): void {
    storageNames.map((storageName) => {
      let sStorage = storages[storageName];
      if (sStorage != undefined) {
        localStorage.setItem(storageName,
          JSON.stringify(storages[storageName]));
      }
    });
  }

  getLocalStorages(): Object {
    let localStoragesObj: any = {};
    let atLeastOnePresent = false;
    storageNames.map((cName) => {
      let oneLocalStorage = localStorage.getItem(cName);
      if (oneLocalStorage != null) {
        localStoragesObj[cName] = JSON.parse(oneLocalStorage);
        atLeastOnePresent = true;
      }
    });
    if (!atLeastOnePresent) { return null; }
    return localStoragesObj;
  }
}
