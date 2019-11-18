import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SeedDetailCard from '../seed/seed_detail';
import ExperimentalGarden from './experimental_garden';
import BreedingPairHomeCard from './breeding_pair';
import BreedingResultsHomeCard from './breeding_results';
import SeedReplaceCard from '../seed/seed_replace';
import TravelerRest from './traveler_rest';
import TravelerCard from './traveler';

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
      return <SeedReplaceCard spot={this.props.spot} reason={"buy"} />
    }
    else if (card.type == CardTypes.SEED_REPLACE_BREED) {
      return <SeedReplaceCard spot={this.props.spot} reason={'breed'} />;
    }
    else if (card.type == CardTypes.SEED_DETAIL) {
      return <SeedDetailCard spot={this.props.spot} />
    }
    else if (card.type == CardTypes.SEED_BUYING) {
      return <TravelerCard spot={this.props.spot} />
    }
    else {
      return (
        <div className="game-card">
          <TravelerRest spot={0}/>
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

export default connect(mapStateToProps)(HomeCard);
