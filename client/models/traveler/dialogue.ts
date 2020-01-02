import DialogueCondition from './dialogue_condition';
import Field from '../../models/field';
import Homestead from '../../models/homestead';
import RecordBook from '../../models/record_book';
import Cast from '../../models/traveler/cast';
import Economy from '../../models/economy';

import { Comparitors } from '../enums/comparitors';

export default class Dialogue implements DialogueInterface {
  id: number;
  conditions: DialogueCondition[];
  important: boolean;
  probability: number;
  text: string;

  constructor(dialogue: DialogueInterface) {
    Object.assign(this, dialogue);
  }

  dialogueValid(gameState: {
    fields: { [id: number] : Field },
    homestead: Homestead,
    recordBook: RecordBook,
    cast: Cast,
    economy: Economy
  }): boolean {
    let valid = true;
    this.conditions.map((condition) => {
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

  parseDialogueText(gameState: {
    fields: { [id: number] : Field },
    homestead: Homestead,
    recordBook: RecordBook,
    cast: Cast,
    economy: Economy
  }): string {
    let pText = '';
    let splitText = this.text.split('|');
    splitText.map((piece, index) => {
      if (index % 2 == 0) {
        pText += (piece);
      }
      else if (index % 2 == 1) {
        pText += parseDeepValue(gameState, piece.split(','));
      }
    });
    return pText;
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
        objectLayer = objectLayer[functionName].call(params);
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

interface DialogueInterface {
  id: number;
  conditions: DialogueCondition[];
  important: boolean;
  probability: number;
  text: string;
}
