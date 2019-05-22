export default class Cultivar {
  constructor(name, traitsDefinitional, bonus, traitsForCreation = null) {
    this.name = name;
    if (Array.isArray(traitsDefinitional)) {
      this.traitsDefinitional = traitsDefinitional.slice();
    }
    else {
      this.traitsDefinitional = traitsDefinitional;
    }
    this.bonus = bonus;
    if (Array.isArray(traitsForCreation)) {
      this.traitsForCreation = traitsForCreation.slice();
    }
    else {
      this.traitsForCreation = traitsForCreation;
    }
  }

  isGenomeMatch(genome) {
    let isMatch = true;

    let genomeTotalDict = {}
    genome.map((gene) => {
      if (genomeTotalDict[gene.traitName] == undefined) {
        genomeTotalDict[gene.traitName] = 0;
      }
      if (gene.genotype[0] == true) { genomeTotalDict[gene.traitName]++; }
      if (gene.genotype[1] == true) { genomeTotalDict[gene.traitName]++; }
    });

    this.traitsDefinitional.map((defTrait) => {
      if (defTrait.comparitor == 'less than') {
        if (genomeTotalDict[defTrait.trait] >= defTrait.values[0]) {
          isMatch = false;
        }
      }
      else if (defTrait.comparitor == 'greater than') {
        if (genomeTotalDict[defTrait.trait] <= defTrait.values[0]) {
          isMatch = false;
        }
      }
      else if (defTrait.comparitor == 'equal to') {
        if (genomeTotalDict[defTrait.trait] != defTrait.values[0]) {
          isMatch = false;
        }
      }
    })
    return isMatch;
  }
}
