import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Field from '../../models/field';
import Homestead from '../../models/homestead';
import RecordBook from '../../models/record_book';
import Card from '../../models/card';
import Seed from '../../models/seed/seed';
import Family from '../../models/seed/family';
import { families } from '../../instances/families';
import { CardTypes } from '../../models/enums/card_types';

import { setCard } from '../../actions/card';
import { harvestSeed } from '../../actions/field';

class StateDisplayFieldCard extends Component {
  props: FieldCardProps;

  constructor(props: FieldCardProps) {
    super(props);
  }

  componentDidMount() {
    this.fieldCardClick = this.fieldCardClick.bind(this);
  }

  fieldCardClick() {
    let field = this.props.fields[this.props.fieldId];
    if (field.seedPlantedId == null) {
      this.props.setCard({type: CardTypes.SEED_PLANTING, spot: this.props.spot},
        this.props.spot);
    }
    else {
      if (field.seedMature == true) {
        this.props.harvestSeed(field, this.props.homestead,
          this.props.recordBook.seedMap, families);
      }
    }
  }

  render() {
    let field = this.props.fields[this.props.fieldId];

    if (field.seedPlantedId != null && field.seedMature == false) {
      return (
        <div className="game-card field-card">
          <div className="field-card-body">
            <div>{field.seedsNameLabel}</div>
            <div>{field.seedsAgeLabel}</div>
          </div>
        </div>
      );
    }

    else {
      return (
        <div className="game-card field-card">
          <div className="field-card-body">
            <button onClick={() => this.fieldCardClick()}>
              <div>{field.seedsNameLabel}</div>
              <div>{field.seedsAgeLabel}</div>
            </button>
          </div>
        </div>
      );
    }

  }
}

interface FieldCardProps {
  fields: { [id: number] : Field };
  homestead: Homestead;
  recordBook: RecordBook;
  fieldId: number;
  spot: number;

  setCard: (card: Card, spot: number) => any;
  harvestSeed: (field: Field, homestead: Homestead,
    seedMap: { [id: number] : Seed }, families: Map<string, Family>) => any;
}

function mapStateToProps({ fields, homestead, recordBook }) {
  return { fields, homestead, recordBook }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    setCard, harvestSeed
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)
  (StateDisplayFieldCard);
