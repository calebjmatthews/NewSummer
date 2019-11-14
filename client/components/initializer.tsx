import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addModal } from '../actions/modal';
import { addAndRecordSeed, ageBreeding } from '../actions/homestead';
import { ageAllSeeds } from '../actions/field';
import { startVisit, ageVisit } from '../actions/cast';

import Modal from '../models/modal';
import Seed from '../models/seed/seed';
import Field from '../models/field';
import Homestead from '../models/homestead';
import RecordBook from '../models/record_book';
import Cast from '../models/traveler/cast';
import { families } from '../instances/families';
import { ModalTypes } from '../models/enums/modal_types';
import { CultivarNames } from '../models/enums/cultivar_names';
import { FamilyNames } from '../models/enums/family_names';
import { TravelerRoles } from '../models/enums/traveler_roles';
import { AGE_INTERVAL } from '../constants';

class Initializer extends Component {
  props: InitializerProps;

  constructor(props: InitializerProps) {
    super(props);

    this.initialSeeds();
    this.props.startVisit(TravelerRoles.SEED_TRADER, this.props.cast,
      this.props.recordBook);
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
}

function mapStateToProps({ homestead, recordBook, fields, cast }) {
  return { homestead, recordBook, fields, cast }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    addModal, addAndRecordSeed, ageAllSeeds, ageBreeding, startVisit, ageVisit
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Initializer);
