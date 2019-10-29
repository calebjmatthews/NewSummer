import StatDefinition from './stat_definition';

export default class Stat implements StatInterface {
  name: string;
  defaultValue: number;
  value: number;
  definitions: StatDefinition[];

  constructor(stat: StatInterface) {
    Object.assign(this, stat);
    if (stat.value == undefined) {
      this.value = stat.defaultValue;
    }
  }
}

interface StatInterface {
  name: string;
  defaultValue: number;
  value?: number;
  definitions: StatDefinition[];
}
