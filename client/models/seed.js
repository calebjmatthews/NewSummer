import {families} from '../instances/families';
import Gene from '../models/gene';

export default class Seed {
  constructor(id, familyName, genome) {
    this.id = id;
    this.familyName = familyName;
    this.genome = genome;

    this.traitTotalDict = this.determineTraitsFromGenome(this.genome);
    this.stats = this.determineStatsFromTraits(this.traitTotalDict);
    this.cultivarName = this.determineCultivarNameFromStats(this.stats);
    this.name =
      this.determineNameFromTraits(this.traitTotalDict, this.cultivarName);
  }

  getGeneByNameAndLocus(traitName, locusIndex) {
    let matchingGene = null;
    this.genome.map((gene) => {
      if (gene.traitName == traitName && gene.locusIndex == locusIndex) {
        matchingGene = gene;
      }
    })
    return matchingGene;
  }

  determineTraitsFromGenome(genome) {
    const family = families.getByProperty('nameScientific', this.familyName);
    return family.determineTraitsFromGenome(genome);
  }
  determineStatsFromTraits(traitTotalDict) {
    const family = families.getByProperty('nameScientific', this.familyName);
    return family.determineStatsFromTraits(traitTotalDict);
  }
  determineCultivarNameFromStats(stats) {
    const family = families.getByProperty('nameScientific', this.familyName);
    return family.determineCultivarNameFromStats(stats);
  }
  determineNameFromTraits(traits, cultivarName) {
    const family = families.getByProperty('nameScientific', this.familyName);
    return family.determineNameFromTraits(traits, cultivarName);
  }

  breedWith(otherParent) {
    let newGenome = [];
    this.genome.map((gene) => {
      const otherGene =
        otherParent.getGeneByNameAndLocus(gene.traitName, gene.locusIndex);
      const newGene = new Gene(gene.traitName, gene.locusIndex,
        [gene.genotype[Math.floor(Math.random()*2)],
          otherGene.genotype[Math.floor(Math.random()*2)]]);
      newGenome.push(newGene);
    })
    const newSeed = new Seed(
      Math.floor(Math.random() * 10000),
      this.familyName,
      newGenome
    );
    return newSeed;
  }
}
