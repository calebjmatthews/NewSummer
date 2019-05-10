import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { buyFieldAttempt, BUY_SUCCESS } from '../actions/economy';
import { breedSeeds } from '../actions/storehouse';
import { initNavCards } from '../actions/animation/card_nav';
import { pixiHandler } from '../instances/pixi/handler';
import { cast } from '../instances/cast';
import { POACEAE } from '../instances/families';

class HomeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seedBreeding: false,
      seedA: null,
      seedB: null
    }
  }
  componentDidMount() {
    this.traderClick = this.traderClick.bind(this);
    this.breedingToggleClick = this.breedingToggleClick.bind(this);
    this.breedClick = this.breedClick.bind(this);
  }

  traderClick(toBuy) {
    let cultivarsUnlocked =
      this.props.recordBookState.recordBook.getCultivarsUnlocked(POACEAE);
    let offers = cast.currentlyVisiting.createOffers(cultivarsUnlocked);
    console.log('offers');
    console.log(offers);
    cast.currentlyVisiting.currentOffers = offers;

    console.log('cast');
    console.log(cast);
  }
  breedingToggleClick() {
    const switchedBreeding = !this.state.seedBreeding;
    this.setState({ seedBreeding: switchedBreeding,
      seedA: null, seedB: null });
  }
  selectSeedClick(spot, seed) {
    let stateObj = {};
    stateObj[spot] = seed
    this.setState(stateObj);
  }
  breedClick() {
    this.props.breedSeeds(
      this.props.storehouseState.storehouse,
      this.state.seedA,
      this.state.seedB);
    this.breedingToggleClick();
  }

  render() {
    if (this.state.seedBreeding == true) {
      return (
        <div className="game-card" style={this.props.transStyle}>
          <div>{'Breed two seeds together:'}</div>
          <div>
            <div>
              {'Seed 1: ' +
                (this.state.seedA != null ? this.state.seedA.name : 'none')}
              {this.props.storehouseState.storehouse
                .seeds.getAll().map((seed) => {
                return (
                  <div key={seed.id}
                    onClick={() => this.selectSeedClick('seedA', seed)}>
                    {seed.name}
                  </div>
                )
              })}
            </div>
          </div>
          <div>
            <div>
              {'Seed 2: ' +
                (this.state.seedB != null ? this.state.seedB.name : 'none')}
              {this.props.storehouseState.storehouse
                .seeds.getAll().map((seed) => {
                return (
                  <div key={seed.id}
                    onClick={() => this.selectSeedClick('seedB', seed)}>
                    {seed.name}
                  </div>
                )
              })}
            </div>
          </div>
          <div onClick={() => this.breedClick()}>Go!</div>
          <div onClick={() => this.breedingToggleClick()}>Cancel</div>
        </div>
      );
    }
    else {
      return (
        <div className="game-card" style={this.props.transStyle}>
          <div onClick={() => this.traderClick('field')}>
            <div>{'A trader is visiting:'}</div>
            <div>{'Say hello!'}</div>
          </div>

          <div onClick={() => this.breedingToggleClick()}>
            <div>{'Experimental Garden:'}</div>
            <div>{'Breed two seeds together'}</div>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps({ storehouseState, economyState, fieldsState,
  cardNavState, recordBookState }) {
  return { storehouseState, economyState, fieldsState, cardNavState,
    recordBookState }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    buyFieldAttempt, breedSeeds, initNavCards
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeCard);
