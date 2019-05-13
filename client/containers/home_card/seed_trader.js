import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { buySeedAttempt } from '../../actions/economy';
import SeedDescription from '../seed_description';

class SeedTraderCard extends Component {
  componentDidMount() {
    this.buyOffer = this.buyOffer.bind(this);
    this.onClickConfirmToParent = this.onClickConfirmToParent.bind(this);
    this.onClickDetailToParent = this.onClickDetailToParent.bind(this);
  }

  buyOffer(offer) {
    return this.props.buySeedAttempt(this.props.economyState.economy,
      this.props.storehouseState.storehouse,
      this.props.castState.cast,  offer);
  }

  onClickConfirmToParent(seed) {
    let matchingOffer = null;
    this.props.castState.cast.currentlyVisiting.currentOffers.map((offer) => {
      if (offer.item.name == seed.name) {
        matchingOffer = offer;
      }
    });

    return this.buyOffer(matchingOffer);
  }

  onClickDetailToParent(seed) {
    return this.props.updateSeedDetail(seed);
  }

  render() {
    return (
      <div className="game-card field-card" style={this.props.transStyle}>
        {'Buy a seed:'}
        <div className="seed-option-container">
          {this.props.castState.cast.currentlyVisiting.currentOffers.map((offer) => {
            let seed = offer.item;
            let confirmText = 'Sold';
            if (offer.sold == false) {
              confirmText = ('Buy for $' + offer.price)
            }
            return (
              <SeedDescription key={seed.name} seed={seed}
                onClickConfirmToParent={this.onClickConfirmToParent}
                onClickDetailToParent={this.onClickDetailToParent}
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
  economyState }) {
  return { fieldsState, castState, storehouseState, economyState }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    buySeedAttempt
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)
  (SeedTraderCard);
