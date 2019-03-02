export default class Cultivar {
  constructor(name, traitsDefinitional, variation, bonus) {
    this.name = name;
    if (Array.isArray(traitsDefinitional)) {
      this.traitsDefinitional = traitsDefinitional.slice();
    }
    else {
      this.traitsDefinitional = traitsDefinitional;
    }
    this.variation = variation;
    this.bonus = bonus;
  }

  areTraitsMatch(traits) {
    let isMatch = true;
    this.traitsDefinitional.map((defTrait) => {
      if (defTrait.comparitor == 'less than') {
        if (traits[defTrait.trait].numerator >= defTrait.values[0]) {
          isMatch = false;
        }
      }
      else if (defTrait.comparitor == 'greater than') {
        if (traits[defTrait.trait].numerator <= defTrait.values[0]) {
          isMatch = false;
        }
      }
      else if (defTrait.comparitor == 'equal to') {
        if (traits[defTrait.trait].numerator != defTrait.values[0]) {
          isMatch = false;
        }
      }
    })
    return isMatch;
  }
}
