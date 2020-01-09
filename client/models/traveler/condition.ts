export default class Condition implements ConditionInterface {
  props: any[];
  comparitor: string;
  values: string[];
  type: string;

  constructor(condition: ConditionInterface) {
    Object.assign(this, condition);
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

interface ConditionInterface {
  props: any[];
  comparitor: string;
  values: string[];
  type: string;
}
