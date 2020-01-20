import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setCast, sayHello } from '../../actions/cast';
import { setCard } from '../../actions/card';
import { addModal } from '../../actions/modal';
import { recordInDialogueHistory } from '../../actions/record_book';

import Cast from '../../models/traveler/cast';
import Homestead from '../../models/homestead';
import RecordBook from '../../models/record_book';
import Seed from '../../models/seed/seed';
import Offer from '../../models/traveler/offer';
import Economy from '../../models/economy';
import Card from '../../models/card';
import Field from '../../models/field';
import Dialogue from '../../models/traveler/dialogue';
import Modal from '../../models/modal';
import { ModalTypes } from '../../models/enums/modal_types';
import { utils } from '../../models/utils';

class TravelerRest extends Component {
  props: TravelerRestProps;

  constructor(props: TravelerRestProps) {
    super(props);

    this.state = {
      currentlyVisiting: null
    }

    this.travelerRestClick = this.travelerRestClick.bind(this);
  }

  travelerRestClick() {
    if (this.props.cast.currentlyVisiting != null) {
      if (this.props.cast.saidHello == false) {
        this.displayDialogueIfImportant();
      }
      this.props.sayHello(this.props.cast);
      this.props.setCard({type: 'seedBuying', spot: this.props.spot}, this.props.spot);
    }
  }

  displayDialogueIfImportant() {
    let traveler = this.props.cast.members[this.props.cast.currentlyVisiting];
    let dialogue = traveler.getNewDialogue({
      fields: this.props.fields,
      homestead: this.props.homestead,
      recordBook: this.props.recordBook,
      cast: this.props.cast,
      economy: this.props.economy
    });

    if (dialogue.important == true) {
      this.props.addModal(new Modal({
        type: ModalTypes.ALERT,
        title: 'A traveler...',
        messages: [dialogue.parseDialogueText({
          fields: this.props.fields,
          homestead: this.props.homestead,
          recordBook: this.props.recordBook,
          cast: this.props.cast,
          economy: this.props.economy
        })]
      }));
      this.props.recordInDialogueHistory(traveler.role, dialogue.index,
        this.props.recordBook);
    }
  }

  render() {
    return (
      <div className="home-card-option"
        onClick={ () => this.travelerRestClick() }>
        {this.renderCurrentlyVisiting()}
      </div>
    );
  }

  renderCurrentlyVisiting() {
    let cast = this.props.cast;
    if (this.props.cast.currentlyVisiting != null
      && this.props.cast.saidHello == false) {
      return (
        <button>
          <div>{'A traveler is visiting,'}</div>
          <div>{'Say hello!'}</div>
        </button>
      );
    }
    else if (cast.currentlyVisiting != null && cast.saidHello == true) {
      let timeRemaining = '';
      timeRemaining = utils.formatDuration(cast.visitRemaining);
      return (
        <button>
          <div>{'A traveler is visiting,'}</div>
          <div>{'And leaving in ' + timeRemaining}</div>
        </button>
      );
    }
    return (
      <div>{'No one is visiting right now'}</div>
    );
  }
}

interface TravelerRestProps {
  spot: number;
  fields: { [id: number] : Field };
  cast: Cast;
  homestead: Homestead;
  recordBook: RecordBook;
  economy: Economy;

  setCard: (card: Card, spot: number) => any;
  sayHello: (cast: Cast) => any;
  addModal: (modal: Modal) => any;
  recordInDialogueHistory: (travelerRole: string, dialogueId: number,
    recordBook: RecordBook) => any;
}

function mapStateToProps({ fields, cast, homestead, economy, recordBook }) {
  return { fields, cast, homestead, economy, recordBook }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    setCard, sayHello, addModal, recordInDialogueHistory
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)
  (TravelerRest);
