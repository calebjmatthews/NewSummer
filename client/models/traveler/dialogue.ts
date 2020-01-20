import Condition from './condition';
import ConditionalObject from './conditional_object';
import Field from '../../models/field';
import Homestead from '../../models/homestead';
import RecordBook from '../../models/record_book';
import Cast from '../../models/traveler/cast';
import Economy from '../../models/economy';

import { Comparitors } from '../enums/comparitors';

export default class Dialogue extends ConditionalObject implements DialogueInterface {
  index: number;
  conditions: Condition[];
  important: boolean;
  probability: number;
  text: string;

  constructor(dialogue: DialogueInterface) {
    super(dialogue);
    Object.assign(this, dialogue);
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
  index: number;
  conditions: Condition[];
  important: boolean;
  probability: number;
  text: string;
}
