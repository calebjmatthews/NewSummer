import React, { Component } from 'react';
import { connect } from 'react-redux';

import PlantingFieldCard from './planting';
import StateDisplayFieldCard from './state_display';
import SeedDetailCard from '../seed/seed_detail';
import EventFieldCard from './event';
import HarvestResultFieldCard from './harvest_result';

class FieldCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let field = this.props.fieldsState.fields
      .getByProperty('id', this.props.fieldId);
    let card = this.props.cardState.cards[this.props.spot];
    if (card == undefined || card == null) { card = {}; }
    if (field.currentEvent != null) {
      return (
        <EventFieldCard transStyle={this.props.transStyle}
          field={field} />
      );
    }
    else if (card.type == 'seedDetail') {
      return (
        <SeedDetailCard transStyle={this.props.transStyle}
          spot={this.props.spot}
          seed={card.value} />
      );
    }
    else if (card.type == 'seedPlanting') {
      return (
        <PlantingFieldCard transStyle={this.props.transStyle}
          spot={this.props.spot} field={field} />
      );
    }
    else if (field.harvestResult != null) {
      return (
        <HarvestResultFieldCard transStyle={this.props.transStyle}
          fieldId={field.id} />
      )
    }
    else {
      return (
        <StateDisplayFieldCard transStyle={this.props.transStyle}
          spot={this.props.spot} field={field} />
      );
    }
  }
}

function mapStateToProps({ fieldsState, cardState }) {
  return { fieldsState, cardState }
}

export default connect(mapStateToProps)(FieldCard);
