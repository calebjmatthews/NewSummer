export default class Gene {
  constructor(traitName, completeDominance, locusIndex, genotype) {
    this.traitName = traitName;
    this.completeDominance = completeDominance;
    this.locusIndex = locusIndex;
    this.genotype = genotype.slice();
  }
}
