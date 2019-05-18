import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SeedPlantingFieldCard from './seed_planting';
import SeedDisplayFieldCard from './seed_display';
import SeedDetailCard from '../seed_detail';
import CultivarSelectFieldCard from './cultivar_select';
import EventFieldCard from './event';
import { setCard } from '../../actions/card';

class FieldCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let card = this.props.cardState.cards[this.props.spot];
    if (card == undefined || card == null) { card = {}; }
    if (this.props.field.currentEvent != null) {
      return (
        <EventFieldCard transStyle={this.props.transStyle}
          field={this.props.field} />
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
          spot={this.props.spot} />
      );
    }
    else if (card.type == 'seedPlanting') {
      return (
        <SeedPlantingFieldCard transStyle={this.props.transStyle}
          spot={this.props.spot} field={this.props.field} />
      );
    }
    else {
      return (
        <SeedDisplayFieldCard transStyle={this.props.transStyle}
          spot={this.props.spot} field={this.props.field} />
      );
    }
  }
}

function mapStateToProps({ cardState }) {
  return { cardState }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setCard }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldCard);
