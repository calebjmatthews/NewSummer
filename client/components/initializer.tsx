import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addModal } from '../actions/modal';
import { addAndRecordSeed, ageBreeding, setHomestead, gainDollars }
  from '../actions/homestead';
import { ageAllSeeds, setFields } from '../actions/field';
import { setRecordBook, setLastTime } from '../actions/record_book';
import { startVisit, ageVisit, setCast } from '../actions/cast';

import Modal from '../models/modal';
import Seed from '../models/seed/seed';
import Field from '../models/field';
import Homestead from '../models/homestead';
import RecordBook from '../models/record_book';
import Cast from '../models/traveler/cast';
import StorageHandler from '../models/storage_handler';
const storageHandler = new StorageHandler();
import { families } from '../instances/families';
import { utils } from '../models/utils';
import { ModalTypes } from '../models/enums/modal_types';
import { CultivarNames } from '../models/enums/cultivar_names';
import { FamilyNames } from '../models/enums/family_names';
import { TravelerRoles } from '../models/enums/traveler_roles';
import { StatNames } from '../models/enums/stat_names';
import { AGE_INTERVAL, STORAGE_SET_INTERVAL, TIME_AWAY_INTERVAL } from '../constants';

class Initializer extends Component {
  props: InitializerProps;

  constructor(props: InitializerProps) {
    super(props);

    let localStorages = storageHandler.getLocalStorages();
    if (localStorages == null) {
      this.initialSeeds();
      this.props.startVisit(TravelerRoles.SEED_TRADER, this.props.cast,
        this.props.recordBook);
    }
    else {
      this.parseLocalStorages(localStorages);
    }

    this.checkTimeAway();
    this.initIntervals();
  }

  initialSeeds() {
    let newSeed0 = new Seed({id: 0, familyName: FamilyNames.POACEAE,
      methodObtained: 'Found', dateObtained: new Date(), parentsIds: [],
      cultivarName: CultivarNames.WILD_GRASS});
    newSeed0.build(families);
    this.props.addAndRecordSeed(newSeed0, this.props.recordBook)
    let newSeed1 = new Seed({id: 1, familyName: FamilyNames.POACEAE,
      methodObtained: 'Found', dateObtained: new Date(), parentsIds: [],
      cultivarName: CultivarNames.WILD_GRASS});
    newSeed1.build(families);
    this.props.addAndRecordSeed(newSeed1, this.props.recordBook);
    this.props.addModal(new Modal({
      type: ModalTypes.ALERT,
      title: 'What\s this?',
      messages: [('There are a couple seeds here, just asking to be planted. '
        + 'Better pick them up!'),
        ('Gained ' + newSeed0.name + '.'),
        ('Gained ' + newSeed1.name + '.')]
    }));
  }

  initIntervals() {
    setInterval(() => {
      this.props.ageAllSeeds(this.props.fields, null, this.props.recordBook.seedMap);
      this.props.ageBreeding(this.props.homestead);
      this.props.ageVisit(this.props.cast);
    }, AGE_INTERVAL);
    setInterval(() => {
      storageHandler.setLocalStorages({
        fields: this.props.fields,
        homestead: this.props.homestead,
        recordBook: this.props.recordBook,
        cast: this.props.cast
      });
    }, STORAGE_SET_INTERVAL);
    setInterval(() => {
      this.checkTimeAway();
    }, TIME_AWAY_INTERVAL)
  }

  parseLocalStorages(localStorages: any) {
    this.props.setHomestead(new Homestead(localStorages.homestead));
    this.props.setFields(localStorages.fields);
    this.props.setRecordBook(new RecordBook(localStorages.recordBook));
    this.props.setCast(new Cast(localStorages.cast));
  }

  checkTimeAway() {
    if (this.props == undefined) {
       return setTimeout(() => this.checkTimeAway(), 100);
    }
    let diff = new Date(Date.now()).valueOf() -
      this.props.recordBook.lastTime.valueOf();
    if (diff < (TIME_AWAY_INTERVAL / 2)) {
      return setTimeout(() => this.checkTimeAway(), 100);
    }
    if (diff > TIME_AWAY_INTERVAL * 10) {
      let applyLostTimeRes = this.applyLostTime(diff);
      let fields = applyLostTimeRes.fields;
      let messages = applyLostTimeRes.messages;
      if (messages.length == 0) {
        messages = ['Nothing much happened.'];
      }
      this.props.addModal(new Modal({
        type: ModalTypes.ALERT,
        title: 'You were away...',
        messages: [
          ('You were gone for ' + utils.formatDuration(diff, 0, true) + '.'),
          ('While you were away...'),
          ...messages
        ]
      }));
      this.props.setFields(fields);
      if (applyLostTimeRes.dollars > 0) {
        this.props.gainDollars(applyLostTimeRes.dollars, this.props.homestead);
      }
    }
    this.props.setLastTime();
  }

  applyLostTime(diff: number) {
    let messages: string[] = [];
    let fields: { [id: number] : Field } = {};
    let dollars = 0;
    Object.keys(this.props.fields).map((fieldId) => {
      let field = new Field(this.props.fields[fieldId]);
      if (field.seedPlantedId != null || field.harvestedSeedId != null) {
        let applyLostTimeToFieldRes = this.applyLostTimeToField(field, diff);
        field = applyLostTimeToFieldRes.field;
        if (applyLostTimeToFieldRes.message != null) {
          messages.push(applyLostTimeToFieldRes.message);
        }
        if (applyLostTimeToFieldRes.dollars != null) {
          dollars += applyLostTimeToFieldRes.dollars;
        }
      }
      fields[fieldId] = field;
    });
    return {fields: fields, messages: messages, dollars: dollars};
  }

  applyLostTimeToField(field: Field, diff: number) {
    let seed: Seed = null;
    if (field.seedPlantedId != null) {
      seed = this.props.recordBook.seedMap[field.seedPlantedId];
    }
    if (field.harvestedSeedId != null) {
      seed = this.props.recordBook.seedMap[field.harvestedSeedId];
    }

    let message = null;
    let dollars = null;
    let harvestCount = Math.floor((diff / 1000) /
      seed.statMap[StatNames.GROWING_TIME].value);
    if (harvestCount < 2) {
      let originallyMature = field.seedMature;
      if (!originallyMature) {
        field.ageSeed(diff, this.props.recordBook.seedMap);
        if (field.seedMature == true) {
          message = seed.name + ' matured!';
        }
        else if (field.seedPlantedId != null) {
          message = seed.name + ' grew.';
        }
      }
    }
    else {
      field.ageSeed(diff, this.props.recordBook.seedMap);
      let harvestValue = seed.determineRealValue(seed.statMap, field.temperature,
        field.moisture, field.fertility, field.pests, field.disease, families).value;
      dollars = harvestValue * harvestCount;
      message = (seed.name + ' had ' + harvestCount + ' harvests for a total of '
        + utils.formatMoney(dollars) + '.');
    }
    return {field: field, message: message, dollars: dollars};
  }

  render() {
    return null;
  }
}

interface InitializerProps {
  homestead: Homestead;
  recordBook: RecordBook;
  fields: { [id: number] : Field };
  cast: Cast;

  addModal: Function;
  addAndRecordSeed: Function;
  ageAllSeeds: Function;
  ageBreeding: Function;
  startVisit: Function;
  ageVisit: Function;
  setHomestead: Function;
  setFields: Function;
  setRecordBook: Function;
  setCast: Function;
  setLastTime: Function;
  gainDollars: Function;
}

function mapStateToProps({ homestead, recordBook, fields, cast }) {
  return { homestead, recordBook, fields, cast }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    addModal, addAndRecordSeed, ageAllSeeds, ageBreeding, startVisit, ageVisit,
    setHomestead, setFields, setRecordBook, setCast, setLastTime, gainDollars
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Initializer);
