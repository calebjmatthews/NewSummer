import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { buySeedAttempt } from '../../actions/economy';
import SeedDescription from '../seed_description';

class SeedTraderCard extends Component {
  componentDidMount() {
    this.seedBuyClick = this.seedBuyClick.bind(this);
    this.onClickConfirmToParent = this.onClickConfirmToParent.bind(this);
    this.onClickDetailToParent = this.onClickDetailToParent.bind(this);
  }

  seedBuyClick(seed) {
    // this.props.plantSeed(this.props.fieldsState.fields,
    //   this.props.field.id, seed);
    // this.props.updateSeedPlanting(false);
  }

  onClickConfirmToParent(seed) {
    return this.seedConfirmClick(seed);
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
            return (
              <SeedDescription key={seed.name} seed={seed}
                onClickConfirmToParent={this.onClickConfirmToParent}
                onClickDetailToParent={this.onClickDetailToParent} />
            );
          })}
        </div>
      </div>
    );
  }
}


function mapStateToProps({ fieldsState, castState }) {
  return { fieldsState, castState }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    buySeedAttempt
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)
  (SeedTraderCard);
