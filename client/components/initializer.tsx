import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addModal } from '../actions/modal';
import { addAndRecordSeed, ageBreeding, setHomestead } from '../actions/homestead';
import { ageAllSeeds, setFields } from '../actions/field';
import { setRecordBook } from '../actions/record_book';
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
import { ModalTypes } from '../models/enums/modal_types';
import { CultivarNames } from '../models/enums/cultivar_names';
import { FamilyNames } from '../models/enums/family_names';
import { TravelerRoles } from '../models/enums/traveler_roles';
import { AGE_INTERVAL, STORAGE_SET_INTERVAL } from '../constants';

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
  }

  parseLocalStorages(localStorages: any) {
    this.props.setHomestead(new Homestead(localStorages.homestead));
    this.props.setFields(localStorages.fields);
    this.props.setRecordBook(new RecordBook(localStorages.recordBook));
    this.props.setCast(new Cast(localStorages.cast));
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
}

function mapStateToProps({ homestead, recordBook, fields, cast }) {
  return { homestead, recordBook, fields, cast }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    addModal, addAndRecordSeed, ageAllSeeds, ageBreeding, startVisit, ageVisit,
    setHomestead, setFields, setRecordBook, setCast
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Initializer);
