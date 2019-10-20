export default class Gene implements GeneInterface {
  traitName: string;
  completeDominance: boolean;
  locusIndex: number;
  genotype: boolean[];

  constructor(gene: GeneInterface) {
    Object.assign(this, gene);
  }
}

interface GeneInterface {
  traitName: string;
  completeDominance: boolean;
  locusIndex: number;
  genotype: boolean[];
}
