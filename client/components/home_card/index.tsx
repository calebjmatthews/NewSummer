import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setCard } from '../../actions/card';
import SeedDetailCard from '../seed/seed_detail';
import ExperimentalGarden from './experimental_garden';
import BreedingPairHomeCard from './breeding_pair';

import CardState from '../../models/card_state';

class HomeCard extends Component {
  props: HomeCardProps;

  constructor(props: HomeCardProps) {
    super(props);
  }

  render() {
    let card = this.props.cardState.cards[this.props.spot];

    if (card.type == 'seedBreedingA' || card.type == 'seedBreedingB'
      || card.type == 'seedBreedingConfirm') {
      return <BreedingPairHomeCard spot={this.props.spot} />;
    }
    else if (card.type == 'breedingResults') {
      return null;
    }
    else if (card.type == 'seedReplaceBuy') {
      return null;
    }
    else if (card.type == 'seedReplaceBreed') {
      return null;
    }
    else if (card.type == 'seedDetail') {
      return null;
    }
    else if (card.type == 'seedBuying') {
      return null;
    }
    else {
      return (
        <div className="game-card">
          <div>Traveler's rest</div>
          <ExperimentalGarden spot={0}/>
        </div>
      );
    }
  }
}

interface HomeCardProps {
  spot: number;

  cardState: CardState;
}

function mapStateToProps({ storehouseState, economyState, fieldsState,
  cardNavState, recordBookState, cardState, autoIncrementState }) {
  return { storehouseState, economyState, fieldsState, cardNavState,
    recordBookState, cardState, autoIncrementState }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setCard
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeCard);
