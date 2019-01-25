export const AGE_CROP = 'AGE_CROP';

import Field from '../models/field';

export function ageCrop(field) {
  field.ageCrop();
	return {
    type: AGE_CROP,
    field: field
  };
};
