import {families} from '../instances/families';

export default class Seed {
  constructor(id, familyName, genome) {
    this.id = id;
    this.familyName = familyName;
    this.genome = genome;

    this.name = this.determineNameFromGenome();
    this.traitTotalDict = this.determineTraitsFromGenome();
    this.stats = this.determineStatsFromTraits(this.traitTotalDict);
  }
  determineTraitsFromGenome() {
    let family = families.getByProperty('nameScientific', this.familyName);
    return family.determineTraitsFromGenome(this.genome);
  }
  determineNameFromGenome() {
    let family = families.getByProperty('nameScientific', this.familyName);
    return family.determineNameFromGenome(this.genome);
  }
  determineStatsFromTraits(traitTotalDict) {
    let family = families.getByProperty('nameScientific', this.familyName);
    return family.determineStatsFromTraits(traitTotalDict);
  }
}
