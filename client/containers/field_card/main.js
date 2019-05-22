import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SeedPlantingFieldCard from './seed_planting';
import SeedDisplayFieldCard from './seed_display';
import SeedDetailCard from '../seed_detail';
import CultivarSelectFieldCard from '../cultivar_select';
import EventFieldCard from './event';
import { setCard } from '../../actions/card';

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
      )
    }
    else if (card.type == 'seedDetail') {
      return (
        <SeedDetailCard transStyle={this.props.transStyle}
          spot={this.props.spot}
          seed={card.value} />
      )
    }
    else if (card.type == 'cultivarSelect') {
      return (
        <CultivarSelectFieldCard transStyle={this.props.transStyle}
          spot={this.props.spot} nextType={'seedPlanting'} />
      );
    }
    else if (card.type == 'seedPlanting') {
      return (
        <SeedPlantingFieldCard transStyle={this.props.transStyle}
          spot={this.props.spot} field={field} />
      );
    }
    else {
      return (
        <SeedDisplayFieldCard transStyle={this.props.transStyle}
          spot={this.props.spot} field={field} />
      );
    }
  }
}

function mapStateToProps({ fieldsState, cardState }) {
  return { fieldsState, cardState }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setCard }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldCard);
