import {shuffle} from '../functions/utils';
import Gene from '../models/gene';
import {families} from '../instances/families';

export default class Seed {
  constructor(idOrSeed, familyName = null, givenCultivarName = null,
    methodObtained = null,
    dateObtained = new Date(Date.now()), variation = 0,
    parentsIds = [null, null], genome = null) {
    if (typeof(idOrSeed) == 'object' && idOrSeed != null) {
      this.id = idOrSeed.id;
      this.familyName = idOrSeed.familyName;
      this.methodObtained = idOrSeed.methodObtained;
      this.dateObtained = idOrSeed.dateObtained;
      this.parentsIds = idOrSeed.parentsIds;
      this.genome = idOrSeed.genome;
    }
    else {
      this.id = idOrSeed;
      this.familyName = familyName;
      this.methodObtained = methodObtained;
      this.dateObtained = dateObtained;
      this.parentsIds = parentsIds;

      if (genome == null) {
        this.genomeFromCultivar(familyName, givenCultivarName);
      }
      else {
        this.genome = genome;
      }
    }

    this.traitTotalDict = this.determineTraitsFromGenome(this.genome);
    this.cultivarName =
      this.determineCultivarNameFromGenome(this.genome);

    this.stats =
      this.determineStatsFromTraits(this.traitTotalDict);
    this.adjectives =
      this.determineAdjectivesFromStats(this.stats, this.cultivarName);
    this.stats =
      this.applyCultivarToStats(this.stats, this.cultivarName);

    this.name = this.adjectives[0].word + ' ' + this.cultivarName;

    this.idealValue = this.determineIdealValueFromStats(this.stats);
    this.descriptions =
      this.describeFromTraitsAndStats(this.traitTotalDict, this.stats);
  }

  genomeFromCultivar(familyName, cultivarName, variation) {
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
      for (let index = 0; index < (trait.loci*2); index+=2) {
        genome.push(new Gene(trait.name, trait.completeDominance, index,
          [alleles[index], alleles[index+1]]));
      }
    });
    genome = variateGenome(genome, cultivar, variation);
    this.genome = genome;

    function getTraitMinAndMax(cultivar, trait) {
      let matchingTrait = null;
      let traitsToUse = [];
      if (cultivar.traitsForCreation != null) {
        traitsToUse = cultivar.traitsForCreation;
      }
      else if (cultivar.traitsDefinitional != null) {
        traitsToUse = cultivar.traitsDefinitional;
      }
      for (let index = 0; index < traitsToUse.length;
        index++) {
        let traitDef = traitsToUse[index];
        if (traitDef.trait == trait.name) {
          matchingTrait = traitDef;
        }
      }

      let min = 0;
      let max = (trait.loci*2);
      if (matchingTrait != null) {
        if (matchingTrait.comparitor == 'equal to') {
          min = matchingTrait.values[0];
          max = matchingTrait.values[0];
        }
        else if (matchingTrait.comparitor == 'less than') {
          max = (matchingTrait.values[0] - 1);
        }
        else if (matchingTrait.comparitor == 'greater than') {
          min = (matchingTrait.values[0] + 1);
        }
        else if (matchingTrait.comparitor == 'between') {
          min = matchingTrait.values[0];
          max = matchingTrait.values[1];
        }
      }
      return {min: min, max: max};
    }

    function variateGenome(genome, cultivar, variation) {
      for (let loop = 0; loop < variation; loop++) {
        let index = Math.floor(Math.random() * genome.length);
        let alleles = [(Math.random() > 0.5), (Math.random() > 0.5)];
        genome[index].genotype = alleles;
      }
      return genome;
    }
  }

  determineTraitsFromGenome(genome) {
    const family = families.getByProperty('nameScientific', this.familyName);
    return family.determineTraitsFromGenome(genome);
  }
  determineCultivarNameFromGenome(genome) {
    const family = families.getByProperty('nameScientific', this.familyName);
    return family.determineCultivarNameFromGenome(genome);
  }
  determineStatsFromTraits(traitTotalDict) {
    const family = families.getByProperty('nameScientific', this.familyName);
    return family.determineStatsFromTraits(traitTotalDict);
  }
  determineAdjectivesFromStats(stats, cultivarName = this.cultivarName) {
    const family = families.getByProperty('nameScientific', this.familyName);
    return family.determineAdjectivesFromStats(stats, cultivarName);
  }
  applyCultivarToStats(stats, cultivarName = this.cultivarName) {
    const family = families.getByProperty('nameScientific', this.familyName);
    return family.applyCultivarToStats(stats, cultivarName);
  }
  determineIdealValueFromStats(stats) {
    const family = families.getByProperty('nameScientific', this.familyName);
    return family.determineIdealValueFromStats(stats);
  }
  determineRealValue(stats, temperature, moisture, fertility, pests,
    disease) {
    let cultivarName = this.cultivarName;
    const family = families.getByProperty('nameScientific', this.familyName);
    return family.determineRealValue(stats, temperature, moisture, fertility,
      pests, disease);
  }
  describeFromTraitsAndStats(traitTotalDict, stats) {
    const family = families.getByProperty('nameScientific', this.familyName);
    return family.describeFromTraitsAndStats(traitTotalDict, stats);
  }

  breedWith(otherParent) {
    let newGenome = [];
    this.genome.map((gene) => {
      const otherGene =
        otherParent.getGeneByNameAndLocus(gene.traitName, gene.locusIndex);
      const newGenotype = [gene.genotype[Math.floor(Math.random()*2)],
        otherGene.genotype[Math.floor(Math.random()*2)]];
      const newGene = new Gene(gene.traitName, gene.completeDominance,
        gene.locusIndex, newGenotype);
      newGenome.push(newGene);
    })

    const newSeed = new Seed(null, this.familyName, null, 'Bred',
      new Date(Date.now()), null, [this.id, otherParent.id], newGenome);
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
  debugGenome(genome) {
    let genomeTotalDict = {};
    genome.map((gene) => {
      if (genomeTotalDict[gene.traitName] == undefined) {
        genomeTotalDict[gene.traitName] = 0;
      }
      if (gene.genotype[0] == true) { genomeTotalDict[gene.traitName]++; }
      if (gene.genotype[1] == true) { genomeTotalDict[gene.traitName]++; }
    });
    Object.keys(genomeTotalDict).map((traitName) => {
      console.log(traitName + ': ' + genomeTotalDict[traitName]);
    });
  }
}
