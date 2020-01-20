import Offer from './offer';
import Dialogue from './dialogue';
import Request from './request';
import Field from '../../models/field';
import Homestead from '../../models/homestead';
import RecordBook from '../../models/record_book';
import Cast from '../../models/traveler/cast';
import Economy from '../../models/economy';

export class Traveler implements TravelerInterface {
  role: string;
  frequency: number;
  dialogues: Dialogue[];
  requests: Request[];

  name: string
  affection: number;
  currentOffers: Offer[];
  gifts: any[];

  constructor(traveler: TravelerInterface) {
    Object.assign(this, traveler);
  }

  genOffers(args: any) {
    console.log('genOffers not defined.');
    return null;
  }

  getNewDialogue(gameState: {
    fields: { [id: number] : Field },
    homestead: Homestead,
    recordBook: RecordBook,
    cast: Cast,
    economy: Economy
  }, importantAllowed: boolean = true): Dialogue {
    let validDialogues: Dialogue[] = [];
    for (let index = 0; index < this.dialogues.length; index++) {
      let dialogue = this.dialogues[index];
      if (dialogue.isValid(gameState, dialogue.conditions) == true
        && (importantAllowed == true
        || (importantAllowed == false && dialogue.important == false))) {
        if (dialogue.probability == 1) {
          return dialogue;
        }
        else {
          validDialogues.push(dialogue);
        }
      }
    }

    return validDialogues[0];
  }

  getDialogueByIndex(index: number) {
    return this.dialogues[index];
  }
}

export interface TravelerInterface {
  role: string;
  frequency: number;
  dialogues: Dialogue[];
  requests: Request[];

  name: string
  affection: number;
  currentOffers: Offer[];
  gifts: any[];
}
