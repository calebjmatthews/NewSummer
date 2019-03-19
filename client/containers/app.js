import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ageAllSeeds, setFields } from '../actions/field';
import { initNavCards, cardNavStep, cardNavStartRight, cardNavStartLeft }
  from '../actions/animation/card_nav';
import { setStorehouse } from '../actions/storehouse';
import FieldCard from './field_card/main';
import HomeCard from './home_card';
import { pixiHandler } from '../instances/pixi/handler';
import { getLocalStorages, setLocalStorages }
  from '../functions/local_storage';
import { SEED_AGE_INTERVAL, FRAMES_PER_SECOND, COOKIE_SET_INTERVAL }
  from '../constants';
import Cache from '../models/cache';
import Field from '../models/field';
import Storehouse from '../models/storehouse';

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
    setInterval(() => {
      setLocalStorages(this.props.fieldsState.fields,
        this.props.storehouseState.storehouse)
    }, COOKIE_SET_INTERVAL);

    let localStorages = getLocalStorages();
    let localStoragePromises = [];
    if (localStorages != false) {
      let fields = new Cache([]);
      localStorages.fields.members.map((field) => {
        let newField = new Field(field.id, field.index, field.name);
        Object.keys(field).map((key) => {
          newField[key] = field[key];
        })
        fields.add(newField);
      });
      localStoragePromises.push(this.props.setFields(fields));
      let storehouse = new Storehouse(localStorages.storehouse);
      localStoragePromises.push(this.props.setStorehouse(storehouse));
    }
    Promise.all(localStoragePromises)
    .then((res) => {
      let eles = document.getElementsByClassName('game-card');
      let poss = [];
      Object.keys(eles).map((index) => {
        let pos = eles[index].getBoundingClientRect();
        poss.push(pos);
      });
      this.props.initNavCards(poss[this.props.cardNavState.spotCurrent].x,
        this.props.cardNavState.spotCurrent, eles.length);

      pixiHandler.initPixi(1 + this.props.fieldsState.fields.getLength());

      this.props.fieldsState.fields.getAll().map((field) => {
        field.restoreSeedState();
      })
    });

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
    cardNavStartRight, setFields, setStorehouse
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
