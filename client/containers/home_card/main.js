import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { buyFieldAttempt, SET_ECONOMY } from '../../actions/economy';
import { initNavCards } from '../../actions/animation/card_nav';
import { setCard } from '../../actions/card';
import { pixiHandler } from '../../instances/pixi/handler';
import { cast } from '../../instances/cast';
import { POACEAE } from '../../instances/families';
import SeedTraderCard from './seed_trader';
import SeedDetailCard from '../seed/seed_detail';
import SeedReplaceCard from '../seed/seed_replace';
import { genIdBatch } from '../../actions/auto_increment';
import ExperimentalGarden from './experimental_garden'
import BreedingPairHomeCard from './breeding_pair';
import CultivarSelectCard from '../cultivar_select';
import BreedingResultsHomeCard from './breeding_results';
import TravelerRest from './traveler_rest';

class HomeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seedBreeding: false
    }
  }

  render() {
    let card = this.props.cardState.cards[this.props.spot];
    if (card == undefined || card == null) { card = {}; }
    if (card.type == 'seedBreedingA' || card.type == 'seedBreedingB'
      || card.type == 'seedBreedingConfirm') {
      return (
        <BreedingPairHomeCard transStyle={this.props.transStyle}
          spot={this.props.spot} />
      );
    }
    else if (card.type == 'breedingResults') {
      return (
        <BreedingResultsHomeCard transStyle={this.props.transStyle}
          spot={this.props.spot} />
      );
    }
    else if (card.type == 'seedReplace') {
      return (
        <SeedReplaceCard transStyle={this.props.transStyle}
          spot={this.props.spot} />
      );
    }
    else if (card.type == 'seedDetail') {
      return (
        <SeedDetailCard transStyle={this.props.transStyle}
          spot={this.props.spot} seed={this.state.seedDetail} />
      );
    }
    else if (card.type == 'seedBuying') {
      return (
        <SeedTraderCard transStyle={this.props.transStyle}
          spot={this.props.spot} />
      );
    }
    else {
      return (
        <div className="game-card" style={this.props.transStyle}>
          <TravelerRest spot={this.props.spot} />
          <ExperimentalGarden spot={this.props.spot} />
        </div>
      );
    }
  }
}

function mapStateToProps({ storehouseState, economyState, fieldsState,
  cardNavState, recordBookState, cardState, autoIncrementState }) {
  return { storehouseState, economyState, fieldsState, cardNavState,
    recordBookState, cardState, autoIncrementState }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    buyFieldAttempt, initNavCards, setCard, genIdBatch
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeCard);
