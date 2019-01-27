export default class Gene {
  constructor(traitName, locusIndex, genotype) {
    this.traitName = traitName;
    this.locusIndex = locusIndex;
    this.genotype = genotype.slice();
  }
}
