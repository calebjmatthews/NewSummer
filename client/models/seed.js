import {families} from '../instances/families';

export default class Seed {
  constructor(seedId, familyName, genome) {
    this.seedId = seedId;
    this.familyName = familyName;
    this.genome = genome;

    this.name = this.determineNameFromGenome();
    this.traitTotalDict = this.determineTraitsFromGenome();
    this.stats = this.determineStatsFromTraits(this.traitTotalDict);
    console.log('seed this:');
    console.log(this);
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
