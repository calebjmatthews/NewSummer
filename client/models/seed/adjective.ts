export default class Adjective implements AdjectiveInterface {
  word: string;
  extent: number;

  constructor(adjective: AdjectiveInterface) {
    Object.assign(this, adjective);
  }
}

interface AdjectiveInterface {
  word: string;
  extent: number;
}
