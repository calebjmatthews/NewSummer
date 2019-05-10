import Cache from './cache';

export default class Cast extends Cache {
  constructor(members, currentlyVisiting = null, visitRemaining = null) {
    super(members);
    this.currentlyVisiting = currentlyVisiting;
    this.visitRemaining = visitRemaining;

    this.currentlyVisiting = this.getByProperty('name', 'Susanna Pol');
  }

  checkForVisitStart() {

  }
}
