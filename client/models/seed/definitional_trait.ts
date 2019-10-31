export default class DefinitionalTrait implements DefinitionalTraitInterface {
  traitName: string;
  comparitor: string;
  values: number[];

  constructor(definitionalTrait: DefinitionalTraitInterface) {
    Object.assign(this, definitionalTrait);
  }
}

interface DefinitionalTraitInterface {
  traitName: string;
  comparitor: string;
  values: number[];
}
