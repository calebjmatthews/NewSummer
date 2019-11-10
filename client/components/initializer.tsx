import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addModal } from '../actions/modal';
import { addAndRecordSeed, ageBreeding } from '../actions/homestead';
import { ageAllSeeds } from '../actions/field';

import Modal from '../models/modal';
import Seed from '../models/seed/seed';
import Field from '../models/field';
import Homestead from '../models/homestead';
import RecordBook from '../models/record_book';
import { families } from '../instances/families';
import { ModalTypes } from '../models/enums/modal_types';
import { CultivarNames } from '../models/enums/cultivar_names';
import { FamilyNames } from '../models/enums/family_names';
import { AGE_INTERVAL } from '../constants';

class Initializer extends Component {
  props: InitializerProps;

  constructor(props: InitializerProps) {
    super(props);

    this.initialSeeds();
    this.initIntervals();
  }

  initialSeeds() {
    let newSeed0 = new Seed({id: 0, familyName: FamilyNames.POACEAE,
      methodObtained: 'Found', dateObtained: new Date(), parentsIds: [],
      cultivarName: CultivarNames.WILD_GRASS});
    newSeed0.build(families);
    this.props.addAndRecordSeed(
      newSeed0, this.props.homestead, this.props.recordBook)
    let newSeed1 = new Seed({id: 1, familyName: FamilyNames.POACEAE,
      methodObtained: 'Found', dateObtained: new Date(), parentsIds: [],
      cultivarName: CultivarNames.WILD_GRASS});
    newSeed1.build(families);
    this.props.addAndRecordSeed(newSeed1, this.props.homestead, this.props.recordBook);
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
    }, AGE_INTERVAL);
  }

  render() {
    return null;
  }
}

interface InitializerProps {
  homestead: Homestead;
  recordBook: RecordBook;
  fields: Map<number, Field>;

  addModal: Function;
  addAndRecordSeed: Function;
  ageAllSeeds: Function;
  ageBreeding: Function;
}

function mapStateToProps({ homestead, recordBook, fields }) {
  return { homestead, recordBook, fields }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    addModal, addAndRecordSeed, ageAllSeeds, ageBreeding
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Initializer);
