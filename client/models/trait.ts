export default class Trait implements TraitInterface {
  name: string;
  loci: number;
  completeDominance: boolean;
  statNames: string[];
  statModifiers: number[];
  
  constructor(trait: TraitInterface) {
    Object.assign(this, trait);
  }
}

interface TraitInterface {
  name: string;
  loci: number;
  completeDominance: boolean;
  statNames: string[];
  statModifiers: number[];
}
