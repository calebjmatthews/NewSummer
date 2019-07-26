import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { startBreedingSeeds } from '../../actions/storehouse';
import { setCard } from '../../actions/card';
import { revertCard } from '../../actions/card';
import SeedSelectCard from '../seed/seed_select';
import SeedDescription from '../seed/seed_description';
import BackButton from '../back_button';

class BreedingPairHomeCard extends Component {
  componentDidMount() {
    this.seedSelectBreeding = this.seedSelectBreeding.bind(this);
  }

  seedSelectBreeding(seed) {
    let card = this.props.cardState.cards[this.props.spot];
    if (card.type == 'seedBreedingA') {
      this.props.setCard({"type": "seedBreedingB", "parentA": seed},
        this.props.spot);
    }
    else if (card.type == 'seedBreedingB') {
      this.props.setCard({"type": "seedBreedingConfirm",
        "parentA": card.parentA, "parentB": seed},
        this.props.spot);
    }
    else {
      this.props.startBreedingSeeds(
        this.props.storehouseState.storehouse,
        this.props.autoIncrementState,
        this.props.recordBookState.recordBook,
        card.parentA,
        card.parentB);
      this.props.setCard({type: null}, this.props.spot);
    }
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

    if (card.type == 'seedBreedingA') {
      return (
        <div className="game-card" style={this.props.transStyle}>
          <BackButton spot={this.props.spot} />
          {'Choose a seed to breed:'}
          <SeedSelectCard spot={this.props.spot}
            onClickConfirmToParent={this.seedSelectBreeding}
            confirmText={'Go'} />
        </div>
      );
    }
    else if (card.type == 'seedBreedingB') {
      return (
        <div className="game-card" style={this.props.transStyle}>
          <BackButton spot={this.props.spot} />
          {'Breed ' + card.parentA.name + ' with:'}
          <SeedSelectCard spot={this.props.spot}
            onClickConfirmToParent={this.seedSelectBreeding}
            confirmText={'Go'} />
        </div>
      );
    }
    else if (card.type == 'seedBreedingConfirm') {
      return (
        <div className="game-card" style={this.props.transStyle}>
          {'Breed these two plants?'}
          <div className="option-container">
            <SeedDescription seed={card.parentA} spot={this.props.spot} />
            <SeedDescription seed={card.parentB} spot={this.props.spot} />
          </div>
          <button onClick={this.seedSelectBreeding}>
            {'Confirm'}
          </button>
          <button onClick={() => this.props.revertCard()}>
            {'Cancel'}
          </button>
        </div>
      )
    }
  }
}

function mapStateToProps({ storehouseState, autoIncrementState,
  recordBookState, cardState }) {
  return { storehouseState, autoIncrementState, recordBookState, cardState }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    startBreedingSeeds, setCard, revertCard
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)
  (BreedingPairHomeCard);
