export default class Field implements FieldInterface {
  id: number;
  name: string;
  seedPlanted: any;
  seedsNameLabel: string;
  seedsAge: number;
  seedsAgeLabel: string;
  seedsGrowthStage: number;

  constructor(field: FieldInterface) {
    Object.assign(this, field);
  }
}

interface FieldInterface {
  id: number;
  name: string;
  seedPlanted: any;
  seedsNameLabel: string;
  seedsAge: number;
  seedsAgeLabel: string;
  seedsGrowthStage: number;
}
