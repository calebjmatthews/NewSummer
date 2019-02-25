import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ageAllSeeds } from '../actions/field';
import { initNavCards, cardNavStep, cardNavStartRight, cardNavStartLeft }
  from '../actions/animation/card_nav';
import FieldCard from './field_card';
import HomeCard from './home_card';
import { pixiHandler } from '../instances/pixi/handler';
import { SEED_AGE_INTERVAL, FRAMES_PER_SECOND } from '../constants';

class App extends Component {
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
    Object.keys(eles).map((index) => {
      let pos = eles[index].getBoundingClientRect();
      poss.push(pos);
    });
    this.props.initNavCards(poss[this.props.cardNavState.spotCurrent].x,
      this.props.cardNavState.spotCurrent);

    pixiHandler.initPixi(1 + this.props.fieldsState.fields.getLength());

    this.navLeftClick = this.navLeftClick.bind(this);
    this.navRightClick = this.navRightClick.bind(this);
  }

  navLeftClick() {
    this.props.cardNavStartLeft(this.props.cardNavState);
  }

  navRightClick() {
    this.props.cardNavStartRight(this.props.cardNavState);
  }

  getCardStyle(thisIndex) {
    let cardStyle = {
      transform: ('translateX('
        + this.props.cardNavState.cardCurrentOffsets[thisIndex] + 'px)')
    };
    if (this.props.cardNavState.animating == true) {

    }
    else {
      let position = (this.props.cardNavState.spotCurrent - thisIndex) * -1;
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
          <HomeCard transStyle={this.props.cardNavState.cardStyles[0]} />
          {this.props.fieldsState.fields.getAll().map((field) => {
            return (
              <FieldCard key={field.id} field={field}
                transStyle={this.props.cardNavState.cardStyles[field.index+1]}
                />
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
    ageAllSeeds, initNavCards, cardNavStep, cardNavStartLeft,
    cardNavStartRight
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
