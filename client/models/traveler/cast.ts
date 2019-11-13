import { Traveler } from './traveler';
import { TRAVELER_DURATION, AGE_INTERVAL, CHECK_INTERVAL }
  from '../../constants';

export default class Cast implements CastInterface {
  members: Map<string, Traveler>;
  currentlyVisiting: string;
  visitRemaining: number;
  saidHello: boolean;

  constructor(cast: CastInterface = null) {
    if (cast != null) {
      Object.assign(this, cast);
    }
  }

  // Checks whether a given traveler has arrived in the last interval
  //  (1 second by default). More common travelers are listed first in
  //  the members array, so if both travelers's rolls are below their
  //  "chance" probability, the less likely traveler visits. Can accept
  //  a duration of time the game has been closed, and calculates an
  //  adjusted (commensurately more likely) probability given this duration.
  checkForVisitStart(duration: number = null): string {
    let rolls = 1;
    if (duration != null) {
      rolls += Math.floor(duration / CHECK_INTERVAL);
    }

    let visitorRole: string = null;
    if (this.currentlyVisiting == null) {
      this.members.forEach((member) => {
        let chance = 1 / ((TRAVELER_DURATION / CHECK_INTERVAL)
          / member.frequency);

        if (rolls > 1) {
          let iterChance = 1 - chance;
          chance = 1 - (Math.pow(iterChance, rolls));
        }

        let roll = Math.random();
        if (roll < chance) {
          visitorRole = member.role;
        }
      });
    }
    return visitorRole;
  }

  startVisit(travelerName: string): void {
    this.currentlyVisiting = travelerName;
    this.visitRemaining = TRAVELER_DURATION;
    this.saidHello = false;
  }

  endVisit(): void {
    this.currentlyVisiting = null;
    this.visitRemaining = null;
  }

  ageVisit(duration = null): void {
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

interface CastInterface {
  members: Map<string, Traveler>;
  currentlyVisiting: string;
  visitRemaining: number;
  saidHello: boolean;
}
