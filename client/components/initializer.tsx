import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addModal } from '../actions/modal';
import { addAndRecordSeed } from '../actions/homestead';

import Modal from '../models/modal';
import Seed from '../models/seed';
import Homestead from '../models/homestead';
import RecordBook from '../models/record_book';
import { families } from '../instances/families';
import { ModalTypes } from '../models/enums/modal_types';
import { CultivarNames } from '../models/enums/cultivar_names';
import { FamilyNames } from '../models/enums/family_names';

class Initializer extends Component {
  props: InitializerProps;

  constructor(props: InitializerProps) {
    super(props);

    this.initialSeeds();
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
      messages: ['There are a couple seeds here. Better pick them up!',
        ('Gained ' + newSeed0.name + '.'),
        ('Gained ' + newSeed1.name + '.')]
    }));
  }

  render() {
    return null;
  }
}

interface InitializerProps {
  homestead: Homestead;
  recordBook: RecordBook;

  addModal: Function;
  addAndRecordSeed: Function;
}

function mapStateToProps({ homestead, recordBook }) {
  return { homestead, recordBook }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    addModal, addAndRecordSeed
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Initializer);
