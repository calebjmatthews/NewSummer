import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { buyFieldAttempt } from '../actions/economy';
import { breedSeeds } from '../actions/storehouse';

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
    this.buyClick = this.buyClick.bind(this);
    this.breedingToggleClick = this.breedingToggleClick.bind(this);
    this.breedClick = this.breedClick.bind(this);
  }

  buyClick(toBuy) {
    if (toBuy == 'field') {
      this.props.buyFieldAttempt(
        this.props.economyState.economy,
        this.props.storehouseState.storehouse,
        this.props.fieldsState.fields
      );
    }
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
              {'Seed 2:' +
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
          <div onClick={() => this.buyClick('field')}>
            <div>{'A trader is visiting:'}</div>
            <div>{'Purchase a new field for $'
              + this.props.economyState.economy.getFieldPrice()}</div>
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

function mapStateToProps({ storehouseState, economyState, fieldsState }) {
  return { storehouseState, economyState, fieldsState }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    buyFieldAttempt, breedSeeds
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeCard);
