import {shuffle} from '../utils';
import {families} from '../instances/families';
import Gene from '../models/gene';

export default class Seed {
  constructor(familyName, givenCultivarName, genome = null) {
    let id = Math.floor(Math.random() * 10000);
    this.id = id;
    this.familyName = familyName;
    if (genome == null) {
      this.genomeFromCultivar(familyName, givenCultivarName);
    }
    else {
      this.genome = genome;
    }

    this.traitTotalDict = this.determineTraitsFromGenome(this.genome);
    this.stats = this.determineStatsFromTraits(this.traitTotalDict);
    this.cultivarName =
      this.determineCultivarNameFromTraits(this.traitTotalDict);
    this.adjectives =
      this.determineAdjectivesFromStats(this.stats, this.cultivarName);
    this.name = this.adjectives[0].word + ' ' + this.cultivarName;
  }

  genomeFromCultivar(familyName, cultivarName) {
    let family = families.getByProperty('nameScientific', familyName);
    let cultivar = family.cultivars.getByProperty('name', cultivarName);
    let genome = [];
    family.traits.getAll().map((trait) => {
      let minAndMax = getTraitMinAndMax(cultivar, trait);
      let alleleIndexes = [];
      for (let alleleIndex = 0; alleleIndex < (trait.loci*2); alleleIndex++) {
        alleleIndexes.push(alleleIndex);
      }
      alleleIndexes = shuffle(alleleIndexes);
      let alleles = [];
      for (let index = 0; index < minAndMax.min; index++) {
        alleles[alleleIndexes[index]] = true;
      }
      for (let index = minAndMax.min;
        index < (minAndMax.min + (trait.loci*2 - minAndMax.max)); index++) {
        alleles[alleleIndexes[index]] = false;
      }
      for (let index = (minAndMax.min + (trait.loci*2 - minAndMax.max));
        index < (trait.loci*2); index++) {
        if (Math.random() > 0.5) { alleles[alleleIndexes[index]] = true; }
        else { alleles[alleleIndexes[index]] = false; }
      }

      for (let index = 0; index < trait.loci; index++) {
        genome.push(new Gene(trait.name, index,
          [alleles[index], alleles[index+1]]));
      }
    });
    this.genome = genome;

    function getTraitMinAndMax(cultivar, trait) {
      let matchingTrait = null;
      if (cultivar.traitsDefinitional != null) {
        for (let index = 0; index < cultivar.traitsDefinitional.length;
          index++) {
          let traitDef = cultivar.traitsDefinitional[index];
          if (traitDef.trait == trait.name) {
            matchingTrait = traitDef;
          }
        }
      }

      let min = 0;
      let max = (trait.loci*2);
      if (matchingTrait != null) {
        if (matchingTrait.comparitor == 'equals') {
          min = matchingTrait.values[0];
          max = matchingTrait.values[0];
        }
        else if (matchingTrait.comparitor == 'less than') {
          max = matchingTrait.values[0];
        }
        else if (matchingTrait.comparitor == 'greater than') {
          min = matchingTrait.values[0];
        }
        else if (matchingTrait.comparitor == 'between') {
          min = matchingTrait.values[0];
          max = matchingTrait.values[1];
        }
      }
      return {min: min, max: max};
    }
  }

  determineTraitsFromGenome(genome) {
    const family = families.getByProperty('nameScientific', this.familyName);
    return family.determineTraitsFromGenome(genome);
  }
  determineStatsFromTraits(traitTotalDict) {
    const family = families.getByProperty('nameScientific', this.familyName);
    return family.determineStatsFromTraits(traitTotalDict);
  }
  determineCultivarNameFromTraits(traits) {
    const family = families.getByProperty('nameScientific', this.familyName);
    return family.determineCultivarNameFromTraits(traits);
  }
  determineAdjectivesFromStats(stats, cultivarName) {
    const family = families.getByProperty('nameScientific', this.familyName);
    return family.determineAdjectivesFromStats(stats, cultivarName);
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
    const newSeed = new Seed(this.familyName, null, newGenome);
    return newSeed;
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
}
