import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { breedSeeds } from '../../actions/storehouse';
import { setCard } from '../../actions/card';
import SeedDescription from '../seed_description';
import BackButton from '../back_button';

class SeedBreedingHomeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seedA: null,
      seedB: null
    }
  }
  componentDidMount() {
    this.seedConfirmBreeding = this.seedConfirmBreeding.bind(this);
    this.breedClick = this.breedClick.bind(this);
  }

  seedConfirmBreeding(seed) {
    let card = this.props.cardState.cards[this.props.spot];
    if (card.type == 'seedBreedingA') {
      this.props.setCard({"type": "cultivarSelectB", "parentA": seed},
        this.props.spot);
    }
    else {
      this.props.breedSeeds(
        this.props.storehouseState.storehouse,
        this.props.autoIncrementState,
        this.props.recordBookState.recordBook,
        card.parentA,
        seed);
      this.props.setCard({type: null}, this.props.spot);
    }
  }

  breedClick() {
    this.props.breedSeeds(
      this.props.storehouseState.storehouse,
      this.props.autoIncrementState,
      this.props.recordBookState.recordBook,
      this.state.seedA,
      this.state.seedB);
    this.props.setCard({type: null}, this.props.spot);
  }

  render() {
    let card = this.props.cardState.cards[this.props.spot];
    let cultivarSeeds = [];
    if (card.value != undefined && card.value != null) {
      cultivarSeeds = this.props.storehouseState.storehouse.seeds
        .getAllMatching('cultivarName', card.value);
    }
    else {
      cultivarSeeds = this.props.storehouseState.storehouse.seeds.getAll();
    }

    return (
      <div className="game-card" style={this.props.transStyle}>
        <BackButton spot={this.props.spot} />
        {'Choose a seed to breed:'}
        <div className="option-container">
          {cultivarSeeds.map((seed) => {
            return (
              <SeedDescription key={seed.id} seed={seed}
                spot={this.props.spot}
                onClickConfirmToParent={this.seedConfirmBreeding}
                confirmText={'Select'} />
            );
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ storehouseState, autoIncrementState,
  recordBookState, cardState }) {
  return { storehouseState, autoIncrementState, recordBookState, cardState }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    breedSeeds, setCard
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)
  (SeedBreedingHomeCard);
