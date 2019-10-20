export default class SeedDescription implements SeedDescriptionInterface {
  title: string;
  description: string;
  iconType: string;
  icon: string;
  iconStyle: string;
  extent: number;

  constructor(seedDescription: SeedDescriptionInterface) {
    Object.assign(this, seedDescription);
  }
}

interface SeedDescriptionInterface {
  title: string;
  description: string;
  iconType: string;
  icon: string;
  iconStyle: string;
  extent: number;
}
