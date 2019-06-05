import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ageAllSeeds, setFields, startFieldEvent } from '../actions/field';
import { initNavCards, cardNavStep, cardNavStartRight, cardNavStartLeft }
  from '../actions/animation/card_nav';
import { setStorehouse, ageBreeding } from '../actions/storehouse';
import FieldCard from './field_card/main';
import { setRecordBook } from '../actions/record_book';
import HomeCard from './home_card/main';
import { pixiHandler } from '../instances/pixi/handler';
import { getLocalStorages, setLocalStorages }
  from '../functions/local_storage';
import { AGE_INTERVAL, FRAMES_PER_SECOND, COOKIE_SET_INTERVAL }
  from '../constants';
import Cache from '../models/cache';
import Field from '../models/field';
import Seed from '../models/seed';
import Storehouse from '../models/storehouse';
import RecordBook from '../models/record_book';
import { cast } from '../instances/cast';
import { setAllCards } from '../actions/card';
import { importAutoIncrement, genId } from '../actions/auto_increment';

class App extends Component {
  componentDidMount() {
    setInterval(() => {
      this.props.ageAllSeeds(this.props.fieldsState.fields);
      this.props.ageBreeding(this.props.storehouseState.storehouse);
    }, AGE_INTERVAL);
    setInterval(() => {
      if (this.props.cardNavState.animating == true) {
        this.props.cardNavStep(this.props.cardNavState);
      }
    }, (1000 / FRAMES_PER_SECOND));
    setInterval(() => {
      this.setActiveLocalStorages();
    }, COOKIE_SET_INTERVAL);

    let cards = [{type: null}, {type: null}, {type: null}];
    this.props.setAllCards(cards);

    let localStorages = getLocalStorages();
    let localStoragePromises = [];
    if (localStorages == false) {
      this.props.startFieldEvent(this.props.fieldsState.fields,
      this.props.autoIncrementState, 0, 'welcomeSeeds');
    }
    else {

      let fields = new Cache([]);
      localStorages.fields.members.map((field) => {
        let newField = new Field(field.id, field.index, field.name,
          field.temperature, field.moisture, field.fertility);
        Object.keys(field).map((key) => {
          newField[key] = field[key];
        })
        fields.add(newField);
      });
      localStoragePromises.push(this.props.setFields(fields));

      let storehouse = new Storehouse(localStorages.storehouse);
      localStoragePromises.push(this.props.setStorehouse(storehouse));

      let familyDict = JSON.parse(localStorage.recordBook).familyDict;
      let recordBook = new RecordBook(familyDict);
      localStoragePromises.push(this.props.setRecordBook(recordBook));

      localStoragePromises.push(this.props
        .importAutoIncrement(localStorages.autoIncrement));
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
        if (field.seedPlanted != null) {
          let seed = field.seedPlanted;

          field.seedPlanted = new Seed(seed.id, seed.familyName,
            null, seed.methodObtained, seed.dateObtained,
            null, seed.parentsIds, seed.genome);
          field.restoreSeedState();
        }
      })
    });

    this.navLeftClick = this.navLeftClick.bind(this);
    this.navRightClick = this.navRightClick.bind(this);
  }

  setActiveLocalStorages() {
    let localStorages = {};
    let fields = this.props.fieldsState.fields;
    if (Object.keys(this.props.autoIncrementState).length > 0) {
      setLocalStorages({
        fields: this.props.fieldsState.fields,
        storehouse: this.props.storehouseState.storehouse,
        recordBook: this.props.recordBookState.recordBook,
        autoIncrement: this.props.autoIncrementState
      });
    }
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
          <HomeCard transStyle={this.props.cardNavState.cardStyles[0]}
            spot={0} />
          {this.props.fieldsState.fields.getAll().map((field) => {
            return (
              <FieldCard key={field.id} fieldId={field.id}
                spot={field.index+1}
                transStyle={this.props.cardNavState.cardStyles[field.index+1]}
                />
            );
          })}
        </div>
      </div>
    )
  }
}

function mapStateToProps({ fieldsState, storehouseState, recordBookState,
  cardNavState, autoIncrementState }) {
  return { fieldsState, storehouseState, recordBookState, cardNavState,
    autoIncrementState }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ageAllSeeds, initNavCards, cardNavStep, cardNavStartLeft,
    cardNavStartRight, setFields, setStorehouse, setRecordBook, setAllCards,
    importAutoIncrement, genId, startFieldEvent, ageBreeding
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
