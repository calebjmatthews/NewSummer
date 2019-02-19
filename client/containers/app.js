import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ageAllSeeds } from '../actions/field';
import { cardNavStep, cardNavStartRight, cardNavStartLeft }
  from '../actions/animation/card_nav';
import FieldCard from './field_card';
import HomeCard from './home_card';
import { pixiHandler } from '../instances/pixi/handler';
import { SEED_AGE_INTERVAL, FRAMES_PER_SECOND } from '../constants';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spotCurrent: 1,
      cardAnchor: 0,
      cardOriginPosition: 0
    }
  }
  componentDidMount() {
    setInterval(() => {
      this.props.ageAllSeeds(this.props.fieldsState.fields);
    }, SEED_AGE_INTERVAL);
    setInterval(() => {
      if (this.props.cardNavState.animating == true) {
        this.props.cardNavStep(this.props.cardNavState);
      }
    }, (1000 / FRAMES_PER_SECOND));

    let eles = document.getElementsByClassName('game-card');
    let poss = [];
    let cardOriginPosition = 0;
    Object.keys(eles).map((index) => {
      let pos = eles[index].getBoundingClientRect();
      poss.push(pos);
    });
    this.setState({
      cardAnchor: poss[this.state.spotCurrent].x
    })

    pixiHandler.initPixi(1 + this.props.fieldsState.fields.getLength());

    this.navLeftClick = this.navLeftClick.bind(this);
    this.navRightClick = this.navRightClick.bind(this);
  }

  navLeftClick() {
    if (true) {

    }
    else {
      if (this.state.spotCurrent > 0) {
        const newSpot = this.state.spotCurrent - 1;
        this.setState({spotCurrent: newSpot});
      }
      else {
        const newSpot = this.props.fieldsState.fields.getLength();
        this.setState({spotCurrent: newSpot});
      }
    }
  }

  navRightClick() {
    let newSpot = 0;
    if (this.state.spotCurrent <=
      (this.props.fieldsState.fields.getLength()-1)) {
      newSpot = this.state.spotCurrent + 1;
    }
    // this.setState({spotCurrent: newSpot});

    let eles = document.getElementsByClassName('game-card');
    let poss = [];
    Object.keys(eles).map((index) => {
      poss.push(eles[index].getBoundingClientRect());
    })
    console.log('poss');
    console.log(poss);

    let cardStartingPositions = [];
    let cardEndingPositions = [];
    for (let index = 0; index < poss.length; index++) {
      cardStartingPositions.push(poss[index].x);
      let position = (newSpot - index) * -1;
      console.log('My index is ' + index + ', my position is ' + position);
      cardEndingPositions.push(
        this.state.cardAnchor + (poss[index].width * position * 1.1)
      );
    }
    console.log('cardStartingPositions');
    console.log(cardStartingPositions);
    console.log('cardEndingPositions');
    console.log(cardEndingPositions);
    console.log('this.state.cardAnchor');
    console.log(this.state.cardAnchor);
    this.props.cardNavStartRight(cardStartingPositions, cardEndingPositions,
      this.state.cardAnchor);
  }

  getCardStyle(thisIndex) {
    let cardStyle = {};
    if (this.props.cardNavState.animating == true) {
      cardStyle = {
        transform: ('translateX('
          + this.props.cardNavState.cardCurrentOffsets[thisIndex] + 'px)')
      };
    }
    else {
      let position = (this.state.spotCurrent - thisIndex) * -1;
      cardStyle = {
        transform: ('translateX(' + (110 * position) + '%)')
      };
    }
    return cardStyle;
  }

  render() {
    return (
      <div className="container-main">
        <div className="header">
          {'$' + this.props.storehouseState.storehouse.dollars}
        </div>
        <div className="game-card-wrapper">
          <div className="nav-button nav-button-left"
            onClick={() => this.navLeftClick()}>
            <div>{'<'}</div>
          </div>
          <div className="nav-button nav-button-right"
            onClick={() => this.navRightClick()}>
            <div>{'>'}</div>
          </div>
          <HomeCard transStyle={this.getCardStyle(0)} />
          {this.props.fieldsState.fields.getAll().map((field) => {
            return (
              <FieldCard key={field.id} field={field}
                transStyle={this.getCardStyle(field.index+1)} />
            );
          })}
        </div>
      </div>
    )
  }
}

function mapStateToProps({ fieldsState, storehouseState, cardNavState }) {
  return { fieldsState, storehouseState, cardNavState }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ageAllSeeds, cardNavStep, cardNavStartLeft, cardNavStartRight
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
