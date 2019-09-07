import Cache from './cache';
import Traveler from './traveler';
import { TRAVELER_DURATION, AGE_INTERVAL, CHECK_INTERVAL }
  from '../constants';

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

  // Checks whether a given traveler has arrived in the last interval
  //  (1 second by default). More common travelers are listed first in
  //  the members array, so if both travelers's rolls are below their
  //  "chance" probability, the less likely traveler visits. Can accept
  //  a duration of time the game has been closed, and calculates an
  //  adjusted (more likely) probability given this duration.
  checkForVisitStart(duration = null) {
    let rolls = 1;
    if (duration != null) {
      rolls += Math.floor(duration / CHECK_INTERVAL);
    }

    let visitorName = false;
    if (this.currentlyVisiting == null) {
      this.members.map((member) => {
        let chance = 1 / ((TRAVELER_DURATION / CHECK_INTERVAL)
          / member.frequency);

        if (rolls > 1) {
          let iterChance = 1 - chance;
          chance = 1 - (Math.pow(iterChance, rolls));
        }

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

  ageVisit(duration = null) {
    if (this.currentlyVisiting != null && this.saidHello == true) {
      if (duration != null) {
        this.visitRemaining -= duration;
      }
      else {
        this.visitRemaining -= AGE_INTERVAL;
      }
      if (this.visitRemaining <= 0) {
        this.endVisit();
      }
    }
  }
}
