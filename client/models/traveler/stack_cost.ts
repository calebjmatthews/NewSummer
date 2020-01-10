export default class StackCost implements StackCostInterface {
  family?: string;
  cultivar?: string;
  quality?: string;
  stat?: string;
  trait?: string;
  comparitor?: string;
  values?: string[];
  quantity: number;

  constructor(stackCost: StackCostInterface) {
    Object.assign(this, stackCost);
  }
}

interface StackCostInterface {
  family?: string;
  cultivar?: string;
  quality?: string;
  stat?: string;
  trait?: string;
  comparitor?: string;
  values?: string[];
  quantity: number;
}
