import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { buySeedAttempt } from '../../actions/economy';
import { setCard } from '../../actions/card';
import SeedDescription from '../seed/seed_description';
import BackButton from '../back_button';

class SeedTraderCard extends Component {
  componentDidMount() {
    this.buySeed = this.buySeed.bind(this);
  }

  buySeed(seed) {
    let matchingOffer = null;
    this.props.castState.cast.currentlyVisiting.currentOffers.map((offer) => {
      if (offer.item.name == seed.name) {
        matchingOffer = offer;
      }
    });

    return this.props.buySeedAttempt(this.props.economyState.economy,
      this.props.storehouseState.storehouse,
      this.props.castState.cast,
      this.props.recordBookState.recordBook, matchingOffer, this.props.spot);
  }

  render() {
    return (
      <div className="game-card field-card" style={this.props.transStyle}>
        <BackButton spot={this.props.spot} />
        {'Buy a seed:'}
        <div className="option-container">
          {this.props.castState.cast.currentlyVisiting.currentOffers.map((offer) => {
            let seed = offer.item;
            let confirmText = 'Sold';
            if (offer.sold == false) {
              confirmText = ('Buy for $' + offer.price)
            }
            return (
              <SeedDescription key={seed.name} seed={seed}
                spot={this.props.spot}
                onClickConfirmToParent={this.buySeed}
                confirmText={confirmText}
                confirmDisabled={offer.sold} />
            );
          })}
        </div>
      </div>
    );
  }
}


function mapStateToProps({ fieldsState, castState, storehouseState,
  economyState, recordBookState }) {
  return { fieldsState, castState, storehouseState, economyState,
    recordBookState }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    buySeedAttempt, setCard
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)
  (SeedTraderCard);
