export default class StatDefinition implements StatDefinitionInterface {
  comparitor: string;
  values: number[];
  adjective: string;
  bonus: number;
  description: string;
  iconType: string;
  icon: string;
  iconStyle: string;

  constructor(statDefinition: StatDefinitionInterface) {
    Object.assign(this, statDefinition);
  }
}

interface StatDefinitionInterface {
  comparitor: string;
  values: number[];
  adjective: string;
  bonus: number;
  description: string;
  iconType: string;
  icon: string;
  iconStyle: string;
}
