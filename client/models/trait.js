export default class Trait {
  constructor(traitName, loci) {
    this.traitName = traitName;
    this.loci = loci;
  }

  calcEffect() {
    let anEffect = {
      statProperty: 'EmptyProperty',
      statValue: 'EmptyValue'
    }
    return anEffect;
  }
}
