import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCard } from '../../actions/card';

class ExperimentalGarden extends Component {
  componentDidMount() {
    this.emptyGardenClick = this.emptyGardenClick.bind(this);
    this.matureGardenClick = this.matureGardenClick.bind(this);
  }

  emptyGardenClick() {
    this.props.setCard({type: "seedBreedingA"}, this.props.spot);
  }

  matureGardenClick() {
    console.log('this.props.storehouseState.storehouse.seedsBred');
    console.log(this.props.storehouseState.storehouse.seedsBred);
  }

  render() {
    let storehouse = this.props.storehouseState.storehouse;
    if (storehouse.seedsBred.length > 0
      && storehouse.breedingTimeRemaining > 0) {
      return (
        <div className="home-card-option">
          <div>{'Experimental plants growing:'}</div>
          <div>{storehouse.breedingAgeLabel}</div>
        </div>
      );
    }
    else if (storehouse.seedsBred.length > 0
      && storehouse.breedingTimeRemaining == 0) {
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


function mapStateToProps({ storehouseState }) {
  return { storehouseState }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setCard
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)
  (ExperimentalGarden);
