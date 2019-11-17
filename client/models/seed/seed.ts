import Family from './family';
import Trait from './trait';
import TraitTotal from './trait_total';
import DefinitionalTrait from './definitional_trait';
import Cultivar from './cultivar';
import Gene from './gene';
import Stat from './stat';
import Adjective from './adjective';
import SeedDescription from './seed_description';
import { utils } from '../utils';
import { Comparitors } from '../enums/comparitors';

export default class Seed implements SeedInterface {
  id: number;
  familyName: string;
  methodObtained: string;
  dateObtained: Date;
  parentsIds: number[];
  numeral: string;
  cultivarName: string;
  genome: Gene[];

  traitTotalMap: Map<string, TraitTotal>;
  statMap: { [id: string] : Stat };
  adjectives: Adjective[];
  name: string;
  idealValue: number;
  descriptions: SeedDescription[];

  constructor(seed: SeedInterface = null) {
    Object.assign(this, seed);
  }

  build(families: Map<string, Family>): Seed {
    if (this.genome == undefined) {
      this.genome = this.genomeFromCultivar(this.familyName, this.cultivarName,
        0, families);
    }

    this.traitTotalMap = this.determineTraitsFromGenome(this.genome, families);
    this.cultivarName = this.determineCultivarNameFromGenome(this.genome, families);

    this.statMap = this.determineStatsFromTraits(this.traitTotalMap, families);
    this.adjectives = this.determineAdjectivesFromStats(this.statMap, this.cultivarName,
      families);
    this.statMap = this.applyCultivarToStats(this.statMap, this.cultivarName, families);

    this.name = this.adjectives[0].word + ' ' + this.cultivarName
      + (this.numeral != undefined ? this.numeral : '');

    this.idealValue = this.determineIdealValueFromStats(this.statMap, families);
    this.descriptions = this.describeFromTraitsAndStats(this.traitTotalMap,
      this.statMap, families);
    return this;
  }

  genomeFromCultivar(familyName: string, cultivarName: string, variation: number,
    families: Map<string, Family>): Gene[] {
    let family = families.get(familyName);
    let cultivar: Cultivar = null;
    family.cultivars.map((aCultivar) => {
      if (aCultivar.name == cultivarName) {
        cultivar = aCultivar;
      }
    });
    let genome = [];
    family.traitsMap.forEach((trait) => {
      let minAndMax = getTraitMinAndMax(cultivar, trait);
      let alleleIndexes: number[] = [];
      for (let alleleIndex = 0; alleleIndex < (trait.loci*2); alleleIndex++) {
        alleleIndexes.push(alleleIndex);
      }
      alleleIndexes = utils.shuffle(alleleIndexes);
      let alleles: boolean[] = [];
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
        genome.push(new Gene({traitName: trait.name,
          completeDominance: trait.completeDominance,  locusIndex: index,
          genotype: [alleles[index], alleles[index+1]]}));
      }
    });
    return variateGenome(genome, cultivar, variation);

    function getTraitMinAndMax(cultivar: Cultivar, trait: Trait) {
      let matchingTrait: DefinitionalTrait = null;
      let traitsToUse: DefinitionalTrait[] = [];
      if (cultivar.traitsForCreation != null) {
        traitsToUse = cultivar.traitsForCreation;
      }
      else if (cultivar.definitionalTraits != null) {
        traitsToUse = cultivar.definitionalTraits;
      }
      traitsToUse.map((traitDef) => {
        if (traitDef.traitName == trait.name) {
          matchingTrait = traitDef;
        }
      });

      let min = 0;
      let max = (trait.loci*2);
      if (matchingTrait != null) {
        if (matchingTrait.comparitor == Comparitors.EQUAL_TO) {
          min = matchingTrait.values[0];
          max = matchingTrait.values[0];
        }
        else if (matchingTrait.comparitor == Comparitors.LESS_THAN) {
          max = (matchingTrait.values[0] - 1);
        }
        else if (matchingTrait.comparitor == Comparitors.GREATER_THAN) {
          min = (matchingTrait.values[0] + 1);
        }
        else if (matchingTrait.comparitor == Comparitors.BETWEEN) {
          min = matchingTrait.values[0];
          max = matchingTrait.values[1];
        }
      }
      return {min: min, max: max};
    }

    function variateGenome(genome: Gene[], cultivar: Cultivar, variation: number):
      Gene[] {
      for (let loop = 0; loop < variation; loop++) {
        let index = Math.floor(Math.random() * genome.length);
        let alleles = [(Math.random() > 0.5), (Math.random() > 0.5)];
        genome[index].genotype = alleles;
      }
      return genome;
    }
  }

  determineTraitsFromGenome(genome: Gene[], families: Map<string, Family>):
    Map<string, TraitTotal> {
    const family = families.get(this.familyName);
    return family.determineTraitsFromGenome(genome);
  }
  determineCultivarNameFromGenome(genome: Gene[], families: Map<string, Family>):
    string {
    const family = families.get(this.familyName);
    return family.determineCultivarNameFromGenome(genome);
  }
  determineStatsFromTraits(traitTotalMap: Map<string, TraitTotal>,
    families: Map<string, Family>): { [id: string] : Stat } {
    const family = families.get(this.familyName);
    return family.determineStatsFromTraits(traitTotalMap);
  }
  determineAdjectivesFromStats(statMap: { [id: string] : Stat },
    cultivarName = this.cultivarName, families: Map<string, Family>): Adjective[] {
    const family = families.get(this.familyName);
    return family.determineAdjectivesFromStats(statMap, cultivarName);
  }
  applyCultivarToStats(statMap: { [id: string] : Stat }, cultivarName = this.cultivarName,
    families: Map<string, Family>): { [id: string] : Stat } {
    const family = families.get(this.familyName);
    return family.applyCultivarToStats(statMap, cultivarName);
  }
  determineIdealValueFromStats(statMap: { [id: string] : Stat },
    families: Map<string, Family>): number {
    const family = families.get(this.familyName);
    return family.determineIdealValueFromStats(statMap);
  }
  determineRealValue(statMap: { [id: string] : Stat }, temperature: number, moisture: number,
    fertility: number, pests: number, disease: number, families: Map<string, Family>) {
    let cultivarName = this.cultivarName;
    const family = families.get(this.familyName);
    return family.determineRealValue(statMap, temperature, moisture, fertility,
      pests, disease);
  }
  describeFromTraitsAndStats(traitTotalMap: Map<string, TraitTotal>,
    statMap: { [id: string] : Stat }, families: Map<string, Family>): SeedDescription[] {
    const family = families.get(this.familyName);
    return family.describeFromTraitsAndStats(traitTotalMap, statMap);
  }

  breedWith(otherParent: Seed): Seed {
    let newGenome = [];
    this.genome.map((gene: Gene) => {
      const otherGene =
        otherParent.getGeneByNameAndLocus(gene.traitName, gene.locusIndex);
      const newGenotype: boolean[] = [gene.genotype[Math.floor(Math.random()*2)],
        otherGene.genotype[Math.floor(Math.random()*2)]];
      const newGene = new Gene({traitName: gene.traitName,
        completeDominance: gene.completeDominance, locusIndex: gene.locusIndex,
        genotype: newGenotype});
      newGenome.push(newGene);
    });

    const newSeed = new Seed({id: null, familyName: this.familyName,
      methodObtained:'Bred', dateObtained: new Date(Date.now()),
      parentsIds: [this.id, otherParent.id], numeral: '', genome: newGenome});
    return newSeed;
  }

  getGeneByNameAndLocus(traitName: string, locusIndex: number): Gene {
    let matchingGene = null;
    this.genome.map((gene) => {
      if (gene.traitName == traitName && gene.locusIndex == locusIndex) {
        matchingGene = gene;
      }
    })
    return matchingGene;
  }
  debugGenome(genome: Gene[]): void {
    let genomeTotalDict = {};
    genome.map((gene: Gene) => {
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

interface SeedInterface {
  id: number;
  familyName: string;
  methodObtained: string;
  dateObtained: Date;
  parentsIds: number[];
  numeral?: string;
  cultivarName?: string;
  genome?: Gene[];

  traitTotalMap?: Map<string, TraitTotal>;
  statMap?: { [id: string] : Stat };
  adjectives?: Adjective[];
  name?: string;
  idealValue?: number;
  descriptions?: SeedDescription[];
}
