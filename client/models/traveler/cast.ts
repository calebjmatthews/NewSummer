import Seed from '../seed/seed';
import Offer from './offer';
import { SeedTrader } from '../../instances/travelers/seed_trader';
import { TravelerRoles } from '../enums/traveler_roles';
import { TRAVELER_DURATION, AGE_INTERVAL, CHECK_INTERVAL }
  from '../../constants';

export default class Cast implements CastInterface {
  members: { [role: string] : any };
  currentlyVisiting: string;
  visitRemaining: number;
  saidHello: boolean;

  constructor(cast: CastInterface = null) {
    if (cast != null) {
      Object.assign(this, cast);
      this.members = {};
      Object.keys(cast.members).map((memberRole) => {
        let rawMember = cast.members[memberRole];
        let offers: Offer[] = [];
        if (memberRole == TravelerRoles.SEED_TRADER) {
          rawMember.currentOffers.map((rawOffer) => {
            let seed = new Seed(rawOffer.item);
            offers.push(new Offer({...rawOffer, item: seed}));
          });
          this.members[memberRole] =
            new SeedTrader({...rawMember, currentOffers: offers});
        }
      });
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

    let travelerRole: string = null;
    if (this.currentlyVisiting == null) {
      Object.keys(this.members).map((memberRole) => {
        let member = this.members[memberRole];
        let chance = 1 / ((TRAVELER_DURATION / CHECK_INTERVAL)
          / member.frequency);

        if (rolls > 1) {
          let iterChance = 1 - chance;
          chance = 1 - (Math.pow(iterChance, rolls));
        }

        let roll = Math.random();
        if (roll < chance) {
          travelerRole = member.role;
        }
      });
    }

    return travelerRole;
  }

  startVisit(travelerRole: string): void {
    this.currentlyVisiting = travelerRole;
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
        console.log(this.visitRemaining);
        this.visitRemaining -= (duration);
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
  members: { [role: string] : any };
  currentlyVisiting: string;
  visitRemaining: number;
  saidHello: boolean;
}
