import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { startBreedingSeeds } from '../../actions/homestead';
import { setCard } from '../../actions/card';
import { revertCard } from '../../actions/card';
import SeedSelectCard from '../seed/seed_select';
import SeedDescription from '../seed/seed_description';
import BackButton from '../back_button';

import Seed from '../../models/seed/seed';
import Homestead from '../../models/homestead';
import CardState from '../../models/card_state';
import RecordBook from '../../models/record_book';
import Card from '../../models/card';
import { images } from '../../instances/images';
import { CardTypes } from '../../models/enums/card_types';

class BreedingPairHomeCard extends Component {
  props: BreedingPairHomeCardProps;

  constructor(props: BreedingPairHomeCardProps) {
    super(props);

    this.seedSelectBreeding = this.seedSelectBreeding.bind(this);
  }

  seedSelectBreeding(seed: Seed) {
    let card = this.props.cardState.cards[this.props.spot];
    if (card.type == CardTypes.SEED_BREEDING_A) {
      this.props.setCard({type: CardTypes.SEED_BREEDING_B, parentA: seed,
        spot: this.props.spot},
        this.props.spot);
    }
    else if (card.type == CardTypes.SEED_BREEDING_B) {
      this.props.setCard({type: CardTypes.SEED_BREEDING_CONFIRM,
        parentA: card.parentA, parentB: seed, spot: this.props.spot},
        this.props.spot);
    }
    else {
      this.props.startBreedingSeeds(this.props.homestead, card.parentA, card.parentB);
      this.props.setCard(null, this.props.spot);
    }
  }

  render() {
    let card = this.props.cardState.cards[this.props.spot];

    if (card.type == CardTypes.SEED_BREEDING_A) {
      return (
        <div className="game-card">
        <div className="game-card-body">
          <BackButton spot={this.props.spot} />
          {'Choose a seed to breed:'}
          <SeedSelectCard spot={this.props.spot}
            onConfirmClick={this.seedSelectBreeding}
            confirmText={'Go'} />
        </div>
          <img className="game-card-background"
            src={images.get('background')}></img>
        </div>
      );
    }
    else if (card.type == CardTypes.SEED_BREEDING_B) {
      return (
        <div className="game-card">
          <div className="game-card-body">
            <BackButton spot={this.props.spot} />
            {'Breed ' + card.parentA.name + ' with:'}
            <SeedSelectCard spot={this.props.spot}
              onConfirmClick={this.seedSelectBreeding}
              confirmText={'Go'} />
          </div>
          <img className="game-card-background"
            src={images.get('background')}></img>
        </div>
      );
    }
    else if (card.type == CardTypes.SEED_BREEDING_CONFIRM) {
      return (
        <div className="game-card">
          <div className="game-card-body">
            {'Breed these two plants?'}
            <div className="option-container">
              <SeedDescription seed={card.parentA} spot={this.props.spot} />
              <SeedDescription seed={card.parentB} spot={this.props.spot} />
            </div>
            <button onClick={() => this.seedSelectBreeding(null)}>
              {'Confirm'}
            </button>
            <button onClick={() => this.props.revertCard(this.props.spot)}>
              {'Cancel'}
            </button>
          </div>
          <img className="game-card-background"
            src={images.get('background')}></img>
        </div>
      )
    }
  }
}

interface BreedingPairHomeCardProps {
  spot: number;

  homestead: Homestead;
  recordBook: RecordBook;
  cardState: CardState;
  startBreedingSeeds: (homestead: Homestead, seedA: Seed, seedB: Seed) => any;
  setCard: (card: Card, spot: number) => any;
  revertCard: (spot: number) => any;
}

function mapStateToProps({ homestead, recordBook, cardState }) {
  return { homestead, recordBook, cardState }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    startBreedingSeeds, setCard, revertCard
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)
  (BreedingPairHomeCard);
