export function setLocalStorages(fields, storehouse) {
  localStorage.setItem('fields', JSON.stringify(fields));
  localStorage.setItem('storehouse', JSON.stringify(storehouse));
}

export function getLocalStorages() {
  let localStoragesObj = {};
  const cNames = ['fields', 'storehouse'];
  let atLeastOnePresent = false;
  cNames.map((cName) => {
    let oneLocalStorage = localStorage.getItem(cName);
    if (oneLocalStorage != null) {
      localStoragesObj[cName] = JSON.parse(oneLocalStorage);
      atLeastOnePresent = true;
    }
  });
  if (!atLeastOnePresent) { return false; }
  return localStoragesObj;
}
