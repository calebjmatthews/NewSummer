import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setCard } from '../../actions/card';
import SeedDetailCard from '../seed/seed_detail';
import ExperimentalGarden from './experimental_garden';
import BreedingPairHomeCard from './breeding_pair';
import BreedingResultsHomeCard from './breeding_results';

import CardState from '../../models/card_state';
import { CardTypes } from '../../models/enums/card_types';

class HomeCard extends Component {
  props: HomeCardProps;

  constructor(props: HomeCardProps) {
    super(props);
  }

  render() {
    let card = this.props.cardState.cards[this.props.spot];

    if (card.type == CardTypes.SEED_BREEDING_A || card.type == CardTypes.SEED_BREEDING_B
      || card.type == CardTypes.SEED_BREEDING_CONFIRM) {
      return <BreedingPairHomeCard spot={this.props.spot} />
    }
    else if (card.type == CardTypes.BREEDING_RESULTS) {
      return <BreedingResultsHomeCard spot={this.props.spot} />
    }
    else if (card.type == CardTypes.SEED_REPLACE_BUY) {
      return null;
    }
    else if (card.type == CardTypes.SEED_REPLACE_BREED) {
      return null;
    }
    else if (card.type == CardTypes.SEED_DETAIL) {
      return <SeedDetailCard spot={this.props.spot} />
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

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    setCard
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeCard);
