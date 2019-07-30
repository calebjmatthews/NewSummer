import Cache from './cache';
import Traveler from './traveler';
import { TRAVELER_DURATION, AGE_INTERVAL } from '../constants';

export default class Cast extends Cache {
  constructor(membersOrCast, currentlyVisiting = null, saidHello = false,
    visitRemaining = null, everVisited = false) {
    if (Array.isArray(membersOrCast) == false) {
      super(membersOrCast.members);
      this.currentlyVisiting = membersOrCast.currentlyVisiting;
      this.visitRemaining = membersOrCast.visitRemaining;
      this.saidHello = membersOrCast.saidHello;
      this.everVisited = membersOrCast.everVisited;
    }
    else {
      super(membersOrCast);
      this.currentlyVisiting = currentlyVisiting;
      this.visitRemaining = visitRemaining;
      this.saidHello = saidHello;
      this.everVisited = everVisited;
    }
  }

  // By default, this function is run every second
  checkForVisitStart() {
    let visitorName = false;
    if (this.currentlyVisiting == null) {
      this.members.map((member) => {
        let chance = 1 / ((TRAVELER_DURATION / 100000) / member.frequency);
        let roll = Math.random();
        if (roll < chance) {
          visitorName = member.name;
        }
      });
    }
    return visitorName;
  }

  startVisit(travelerName, info) {
    this.everVisited = true;
    this.currentlyVisiting = travelerName;
    this.visitRemaining = TRAVELER_DURATION;
    this.saidHello = false;
  }

  endVisit() {
    this.currentlyVisiting = null;
    this.visitRemaining = null;
  }

  ageVisit() {
    if (this.currentlyVisiting != null && this.saidHello == true) {
      this.visitRemaining -= AGE_INTERVAL;
      if (this.visitRemaining <= 0) {
        this.endVisit();
      }
    }
  }
}
