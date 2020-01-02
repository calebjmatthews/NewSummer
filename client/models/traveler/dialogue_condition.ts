export default class DialogueCondition {
  props: any[];
  comparitor: string;
  values: string[];
  type: string;

  constructor(dialogueCondition: DialogueConditionInterface) {
    Object.assign(this, dialogueCondition);
  }

  getValues(): any[] {
    let expValues: any = [];
    this.values.map((value) => {
      if (value == 'undefined') {
        expValues.push(undefined);
      }
      else if (parseFloat(value) == NaN) {
        expValues.push(value);
      }
      else if (parseFloat(value) % 1 != 0) {
        expValues.push(parseFloat(value));
      }
      else if (parseInt(value) != NaN) {
        expValues.push(parseInt(value));
      }
      else {
        console.log('Unexpected dialogue comparison value:');
        console.log(value);
        expValues.push(null);
      }
    });
    return expValues;
  }
}

interface DialogueConditionInterface {
  props: any[];
  comparitor: string;
  values: string[];
  type: string;
}
