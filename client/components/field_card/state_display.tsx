import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Field from '../../models/field';
import { CardTypes } from '../../models/enums/card_types';

import { setCard } from '../../actions/card';

class StateDisplayFieldCard extends Component {
  props: FieldCardProps;

  constructor(props: FieldCardProps) {
    super(props);
  }

  componentDidMount() {
    this.fieldCardClick = this.fieldCardClick.bind(this);
  }

  fieldCardClick() {
    let field = this.props.fields.get(this.props.fieldId);
    if (field.seedPlantedId == null) {
      this.props.setCard({type: CardTypes.SEED_PLANTING}, this.props.spot);
    }
    // else {
    //   if (this.props.field.seedIsMature() == true) {
    //     this.props.harvestSeed(
    //       this.props.fieldsState.fields,
    //       this.props.storehouseState.storehouse,
    //       this.props.field.id
    //     );
    //   }
    // }
  }

  render() {
    let field = this.props.fields.get(this.props.fieldId);

    return (
      <div className="game-card field-card">
        <div className="field-card-body" onClick={() => this.fieldCardClick()}>
          <div>{field.seedsNameLabel}</div>
          <div>{field.seedsAgeLabel}</div>
        </div>
      </div>
    );
  }
}

interface FieldCardProps {
  fields: Map<number, Field>;
  fieldId: number;
  spot: number;

  setCard: Function;
}

function mapStateToProps({ fields }) {
  return { fields }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    setCard
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)
  (StateDisplayFieldCard);
