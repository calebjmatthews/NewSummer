import Condition from './condition';
import Field from '../../models/field';
import Homestead from '../../models/homestead';
import RecordBook from '../../models/record_book';
import Cast from '../../models/traveler/cast';
import Economy from '../../models/economy';

import { Comparitors } from '../enums/comparitors';

export default class ConditionalObject {
  constructor(conditionalObject: any) {
    Object.assign(this, conditionalObject);
  }

  isValid(gameState: {
    fields: { [id: number] : Field },
    homestead: Homestead,
    recordBook: RecordBook,
    cast: Cast,
    economy: Economy
  }, conditions: Condition[]): boolean {
    let valid = true;
    conditions.map((condition) => {
      let stateValue = parseDeepValue(gameState, condition.props);
      switch(condition.comparitor) {
        case Comparitors.EQUAL_TO:
        if (stateValue != condition.getValues()[0]) {
          valid = false;
        }
        break;

        case Comparitors.LESS_THAN:
        if (stateValue > condition.getValues()[0]) {
          valid = false;
        }
        break;

        case Comparitors.GREATER_THAN:
        if (stateValue < condition.getValues()[0]) {
          valid = false;
        }
        break;

        case Comparitors.BETWEEN:
        let expValues = condition.getValues();
        if (stateValue < expValues[0] || stateValue > expValues[1]) {
          valid = false;
        }
        break;
      }
    });
    return valid;
  }
}

function parseDeepValue(object: any, propsSought: any[]) {
  let objectLayer = object[propsSought[0]];
  propsSought.slice(1).map((propSought) => {
    if (propSought.includes('(')) {
      let functionName = propSought.split('(')[0];
      let paramSplit = propSought.split('(')[1].replace(')', '');
      let params = paramSplit.split(',');
      objectLayer[functionName] = objectLayer[functionName].bind(objectLayer);
      if (params[0].length > 0) {
        objectLayer = objectLayer[functionName].call(objectLayer, ...params);
      }
      else {
        objectLayer = objectLayer[functionName].call();
      }
    }
    else {
      objectLayer = objectLayer[propSought];
    }
  });
  return objectLayer;
}
