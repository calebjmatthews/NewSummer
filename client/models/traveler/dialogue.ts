import Condition from './condition';
import ConditionalObject from './conditional_object';
import Field from '../../models/field';
import Homestead from '../../models/homestead';
import RecordBook from '../../models/record_book';
import Cast from '../../models/traveler/cast';
import Economy from '../../models/economy';

import { Comparitors } from '../enums/comparitors';
import { utils } from '../utils';

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
        pText += utils.parseDeepValue(gameState, piece.split(','));
      }
    });
    return pText;
  }
}

interface DialogueInterface {
  index: number;
  conditions: Condition[];
  important: boolean;
  probability: number;
  text: string;
}
