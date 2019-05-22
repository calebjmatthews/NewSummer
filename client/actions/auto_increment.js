export const SET_ID = 'SET_ID';
export function genId(autoIncrement, fieldName) {
  let newId = 0;
  if (autoIncrement[fieldName] != undefined) {
    newId = autoIncrement[fieldName];
    newId++;
  }
  return {
    type: SET_ID,
    fieldName: fieldName,
    newId: newId
  }
}

export function genIdBatch(autoIncrement, fieldName, count) {
  let newId = 0;
  if (autoIncrement[fieldName] != undefined) {
    newId = autoIncrement[fieldName];
  }
  let newIds = [];
  for (let loop = 0; loop < count; loop++) {
    newIds.push(newId);
    newId++;
  }
  return {
    type: SET_ID,
    fieldName: fieldName,
    newId: newId,
    newIds: newIds
  }
}

export const IMPORT_AUTO_INCREMENT = 'IMPORT_AUTO_INCREMENT';
export function importAutoIncrement(autoIncrement) {
  return {
    type: IMPORT_AUTO_INCREMENT,
    autoIncrement: autoIncrement
  }
}
