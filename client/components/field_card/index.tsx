import React, { Component } from 'react';
import { connect } from 'react-redux';

import Field from '../../models/field';
import CardState from '../../models/card_state';
import { CardTypes } from '../../models/enums/card_types';

import PlantingFieldCard from './planting';
import StateDisplayFieldCard from './state_display';
import HarvestResultFieldCard from './harvest_result';
import SeedDetailCard from '../seed/seed_detail';

class FieldCard extends Component {
  props: FieldCardProps;

  constructor(props: FieldCardProps) {
    super(props);
  }

  render() {
    let field = this.props.fields.get(this.props.fieldId);
    let card = this.props.cardState.cards[this.props.spot];

    if (field.harvestResult != null) {
      return (
        <HarvestResultFieldCard fieldId={this.props.fieldId} spot={this.props.spot} />
      );
    }
    else if (card.type == CardTypes.SEED_DETAIL) {
      return (
        <SeedDetailCard spot={this.props.spot} />
      );
    }
    else if (card.type == CardTypes.SEED_PLANTING) {
      return (
        <PlantingFieldCard fieldId={this.props.fieldId} spot={this.props.spot} />
      );
    }
    else {
      return (
        <StateDisplayFieldCard fieldId={this.props.fieldId} spot={this.props.spot} />
      );
    }
  }
}

interface FieldCardProps {
  fields: Map<number, Field>;
  cardState: CardState;

  fieldId: number;
  spot: number;
}

function mapStateToProps({ fields, cardState }) {
  return { fields, cardState }
}

export default connect(mapStateToProps)(FieldCard);
