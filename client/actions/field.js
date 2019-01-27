export const AGE_SEED = 'AGE_SEED';

import Field from '../models/field';

export function ageSeed(field) {
  field.ageSeed();
	return {
    type: AGE_SEED,
    field: field
  };
};
