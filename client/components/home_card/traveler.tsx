import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { buySeedAttempt } from '../../actions/economy';
import { setCard } from '../../actions/card';
import SeedDescription from '../seed/seed_description';
import BackButton from '../back_button';
import { utils } from '../../models/utils';

import Cast from '../../models/traveler/cast';
import Homestead from '../../models/homestead';
import RecordBook from '../../models/record_book';
import Seed from '../../models/seed/seed';
import Offer from '../../models/traveler/offer';
import Economy from '../../models/economy';

class TravelerCard extends Component {
  props: TravelerCardProps;

  constructor(props: TravelerCardProps) {
    super(props);

    this.buySeed = this.buySeed.bind(this);
  }

  buySeed(seed: Seed) {
    let matchingOffer: Offer = null;
    this.props.cast.members[this.props.cast.currentlyVisiting]
      .currentOffers.map((offer) => {
      if (offer.item.name == seed.name) {
        matchingOffer = offer;
      }
    });

    return this.props.buySeedAttempt(this.props.economy, this.props.homestead,
      this.props.cast, this.props.recordBook, matchingOffer, this.props.spot);
  }

  render() {
    if (this.props.cast.currentlyVisiting != null) {
      return (
        <div className="game-card field-card">
          <BackButton spot={this.props.spot} />
          {'Buy a seed:'}
          <div className="option-container">
            {this.props.cast.members[this.props.cast.currentlyVisiting]
              .currentOffers.map((offer, index) => {
              let seed = offer.item;
              let confirmText = 'Sold';
              if (offer.sold == false) {
                confirmText = ('Buy for ' + utils.formatMoney(offer.price))
              }
              return (
                <SeedDescription key={index} seed={seed}
                  spot={this.props.spot}
                  onConfirmClick={this.buySeed}
                  confirmText={confirmText}
                  confirmDisabled={offer.sold} />
              );
            })}
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="game-card field-card">
          <BackButton spot={this.props.spot} />
          {'Sorry, had to go!'}
        </div>
      );
    }
  }
}

interface TravelerCardProps {
  spot: number;

  cast: Cast;
  homestead: Homestead;
  recordBook: RecordBook;
  economy: Economy;
  buySeedAttempt: Function;
  setCard: Function;
}

function mapStateToProps({ cast, homestead, economy, recordBook }) {
  return { cast, homestead, economy, recordBook }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    buySeedAttempt, setCard
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TravelerCard);
