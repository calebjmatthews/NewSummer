import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setCard } from '../../actions/card';

import Homestead from '../../models/homestead';
import Card from '../../models/card';
import { CardTypes } from '../../models/enums/card_types';

class ExperimentalGarden extends Component {
  props: ExperimentalGardenProps;

  constructor(props: ExperimentalGardenProps) {
    super(props);

    this.emptyGardenClick = this.emptyGardenClick.bind(this);
    this.matureGardenClick = this.matureGardenClick.bind(this);
  }

  emptyGardenClick() {
    this.props.setCard({type: CardTypes.SEED_BREEDING_A, spot: this.props.spot},
      this.props.spot);
  }

  matureGardenClick() {
    this.props.setCard({type: CardTypes.BREEDING_RESULTS, spot: this.props.spot}, 
      this.props.spot);
  }

  render() {
    let homestead = this.props.homestead;
    if (homestead.seedsBred.length > 0
      && homestead.breedingTimeRemaining > 0) {
      return (
        <div className="home-card-option">
          <div>{'Experimental plants growing:'}</div>
          <div>{homestead.breedingAgeLabel}</div>
        </div>
      );
    }
    else if (homestead.seedsBred.length > 0
      && homestead.breedingTimeRemaining == 0) {
      return (
        <div className="home-card-option"
          onClick={ () => this.matureGardenClick() }>
          <div>{'Experimental plants are mature!'}</div>
          <div>{'Gather a new seed'}</div>
        </div>
      );
    }
    else {
      return (
        <div className="home-card-option"
          onClick={ () => this.emptyGardenClick() }>
          <div>{'Experimental Garden:'}</div>
          <div>{'Breed two seeds together'}</div>
        </div>
      );
    }
  }
}

interface ExperimentalGardenProps {
  spot: number;

  homestead: Homestead;
  setCard: (card: Card, spot: number) => any;
}

function mapStateToProps({ homestead }) {
  return { homestead }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    setCard
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)
  (ExperimentalGarden);
