export default class Traveler {
  constructor(nameOrInstance, frequency, affection, currentOffers, dialogues,
    gifts) {
    if (typeof(nameOrInstance) == 'object') {
      Object.keys(nameOrInstance).map((propName) => {
        this[propName] = nameOrInstance[propName];
      });
    }
    else {
      this.name = nameOrInstance;
      this.frequency = frequency;
      this.affection = affection;
      this.currentOffers = currentOffers;
      this.dialogues = dialogues;
      this.gifts = gifts;
    }
  }

  genOffers() {
    console.log('genOffers not defined.');
    return null;
  }
}
