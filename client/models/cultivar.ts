import DefinitionalTrait from './definitional_trait';
import Gene from './gene';
import Trait from './trait';
import { Comparitors } from './enums/comparitors';

export default class Cultivar implements CultivarInterface {
  name: string;
  definitionalTraits: DefinitionalTrait[];
  bonus: Trait;
  traitsForCreation: DefinitionalTrait[];

  constructor(cultivar: CultivarInterface) {
    Object.assign(this, cultivar);
  }

  isGenomeMatch(genome: Gene[]): boolean {
    let isMatch = true;

    let genomeTotalDict: { [traitName: string] : number } = {};
    genome.map((gene) => {
      if (genomeTotalDict[gene.traitName] == undefined) {
        genomeTotalDict[gene.traitName] = 0;
      }
      if (gene.genotype[0] == true) { genomeTotalDict[gene.traitName]++; }
      if (gene.genotype[1] == true) { genomeTotalDict[gene.traitName]++; }
    });

    this.definitionalTraits.map((defTrait) => {
      if (defTrait.comparitor == Comparitors.LESS_THAN) {
        if (genomeTotalDict[defTrait.traitName] >= defTrait.values[0]) {
          isMatch = false;
        }
      }
      else if (defTrait.comparitor == Comparitors.GREATER_THAN) {
        if (genomeTotalDict[defTrait.traitName] <= defTrait.values[0]) {
          isMatch = false;
        }
      }
      else if (defTrait.comparitor == Comparitors.EQUAL_TO) {
        if (genomeTotalDict[defTrait.traitName] != defTrait.values[0]) {
          isMatch = false;
        }
      }
    })
    return isMatch;
  }
}

interface CultivarInterface {
  name: string;
  definitionalTraits: DefinitionalTrait[];
  bonus: Trait;
  traitsForCreation?: DefinitionalTrait[];
}
