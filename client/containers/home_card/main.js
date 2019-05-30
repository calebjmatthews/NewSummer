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
import BreedingHomeCard from './breeding';
import CultivarSelectCard from '../cultivar_select';

class HomeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seedBreeding: false
    }
  }
  componentDidMount() {
    this.traderClick = this.traderClick.bind(this);
    this.breedingToggleClick = this.breedingToggleClick.bind(this);
  }

  traderClick(toBuy) {
    let cultivarsUnlocked =
      this.props.recordBookState.recordBook.getCultivarsUnlocked(POACEAE);
    let offers = cast.currentlyVisiting.genOffers(cultivarsUnlocked);
    let newOfferIds = this.props.genIdBatch
      (this.props.autoIncrementState, 'offer', offers.length).newIds;
    let newSeedIds = this.props.genIdBatch
      (this.props.autoIncrementState, 'seed', offers.length).newIds;

    offers.map((offer, index) => {
      offer.id = newOfferIds[index];
      offer.item.id = newSeedIds[index];
    });
    cast.currentlyVisiting.currentOffers = offers;
    this.props.setCard({type: 'seedBuying'}, this.props.spot);
  }

  breedingToggleClick() {
    const switchedBreeding = !this.state.seedBreeding;
    this.setState({ seedBreeding: switchedBreeding,
      seedA: null, seedB: null });
  }

  render() {
    let card = this.props.cardState.cards[this.props.spot];
    if (card == undefined || card == null) { card = {}; }
    if (card.type == 'cultivarSelectA') {
      return (
        <CultivarSelectCard transStyle={this.props.transStyle}
          spot={this.props.spot} nextType={'seedBreedingA'} />
      )
    }
    else if (card.type == 'cultivarSelectB') {
      return (
        <CultivarSelectCard transStyle={this.props.transStyle}
          spot={this.props.spot} nextType={'seedBreedingB'} />
      )
    }
    else if (card.type == 'seedBreedingA' || card.type == 'seedBreedingB') {
      return (
        <BreedingHomeCard transStyle={this.props.transStyle}
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
          <div className="home-card-option"
            onClick={() => this.traderClick('field')}>
            <div>{'A trader is visiting:'}</div>
            <div>{'Say hello!'}</div>
          </div>

          <ExperimentalGarden spot={this.props.spot}/>
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
