import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { buySeedAttempt } from '../../actions/economy';
import { setCard } from '../../actions/card';
import { addModal } from '../../actions/modal';
import { recordInDialogueHistory } from '../../actions/record_book';
import SeedDescription from '../seed/seed_description';
import BackButton from '../back_button';
import { utils } from '../../models/utils';

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
import { images } from '../../instances/images';

class TravelerCard extends Component {
  props: TravelerCardProps;
  dialogue: Dialogue;
  dialogueText: string;

  constructor(props: TravelerCardProps) {
    super(props);

    this.buySeed = this.buySeed.bind(this);
    this.viewDialogue = this.viewDialogue.bind(this);
  }

  buySeed(seed: Seed) {
    let matchingOffer: Offer = null;
    this.props.cast.members[this.props.cast.currentlyVisiting]
      .currentOffers.map((offer) => {
      if (offer.item.name == seed.name) {
        matchingOffer = offer;
      }
    });

    return this.props.buySeedAttempt(this.props.economy, this.props.homestead,
      this.props.cast, this.props.recordBook, matchingOffer, this.props.spot);
  }

  viewDialogue() {
    let traveler = this.props.cast.members[this.props.cast.currentlyVisiting];
    let dialogue: Dialogue = null;
    if (this.props.cast.currentDialogue == null) {
      dialogue = traveler.getNewDialogue({
        fields: this.props.fields,
        homestead: this.props.homestead,
        recordBook: this.props.recordBook,
        cast: this.props.cast,
        economy: this.props.economy
      }, false);
      this.props.recordInDialogueHistory(traveler.role, dialogue.index,
        this.props.recordBook);
    }
    else {
      dialogue = traveler.getDialogueByIndex(this.props.cast.currentDialogue);
    }
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
  }

  render() {
    let traveler = this.props.cast.members[this.props.cast.currentlyVisiting];
    if (this.props.cast.currentlyVisiting != null) {
      return (
        <div className="game-card field-card">
          <div className="game-card-body">
            <BackButton spot={this.props.spot} />
            <div>{this.renderDialogue()}</div>
            <div>{'Buy a seed:'}</div>
            <div className="option-container">
              {traveler.currentOffers.map((offer, index) => {
                let seed = offer.item;
                let confirmText = 'Sold';
                if (offer.sold == false) {
                  confirmText = ('Buy for ' + utils.formatMoney(offer.price))
                }
                return (
                  <SeedDescription key={index} seed={seed}
                    spot={this.props.spot}
                    onConfirmClick={this.buySeed}
                    confirmText={confirmText}
                    confirmDisabled={offer.sold} />
                );
              })}
            </div>
          </div>
          <img className="game-card-background"
            src={images.get('background')}></img>
        </div>
      );
    }
    else {
      return (
        <div className="game-card field-card">
          <div className="game-card-body">
            <BackButton spot={this.props.spot} />
            {'Sorry, had to go!'}
          </div>
          <img className="game-card-background"
            src={images.get('background')}></img>
        </div>
      );
    }
  }

  renderDialogue() {
    let traveler = this.props.cast.members[this.props.cast.currentlyVisiting];
    return (
      <button onClick={ () => this.viewDialogue() }>
        {'Talk to ' + traveler.name}
      </button>
    );
  }
}

interface TravelerCardProps {
  spot: number;

  fields: { [id: number] : Field };
  cast: Cast;
  homestead: Homestead;
  recordBook: RecordBook;
  economy: Economy;
  buySeedAttempt: (economy: Economy, homestead: Homestead, cast: Cast,
    recordBook: RecordBook, offer: Offer, spot: number) => any;
  setCard: (cards: Card) => any;
  recordInDialogueHistory: (travelerRole: string, dialogueId: number,
    recordBook: RecordBook) => any;
  addModal: (modal: Modal) => any;
}

function mapStateToProps({ fields, cast, homestead, economy, recordBook }) {
  return { fields, cast, homestead, economy, recordBook }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    buySeedAttempt, setCard, recordInDialogueHistory, addModal
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TravelerCard);
