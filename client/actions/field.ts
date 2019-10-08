import Field from '../models/field';

export const SET_FIELDS = 'SET_FIELDS';
export function setFields(fields: Map<number, Field>) {
  return {
    type: SET_FIELDS,
    fields: fields
  };
}
