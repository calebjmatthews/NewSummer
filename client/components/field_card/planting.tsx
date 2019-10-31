import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Field from '../../models/field';
import Seed from '../../models/seed/seed';
import Homestead from '../../models/homestead';
import CardState from '../../models/card_state';
import RecordBook from '../../models/record_book';

import { plantSeed } from '../../actions/field';
import { setCard } from '../../actions/card';
import SeedSelectCard from '../seed/seed_select';

class PlantingFieldCard extends Component {
  props: PlantingProps;

  constructor(props: PlantingProps) {
    super(props);

    this.seedConfirmPlanting = this.seedConfirmPlanting.bind(this);
  }

  seedConfirmPlanting(seed: Seed) {
    this.props.plantSeed(this.props.fields.get(this.props.fieldId), seed,
      this.props.recordBook.seedMap);
    this.props.setCard(null, this.props.spot);
  }

  render() {
    return (
      <div className="game-card field-card">
        {'Choose a seed to plant:'}
        <SeedSelectCard spot={this.props.spot}
          onConfirmClick={this.seedConfirmPlanting}
          confirmText={'Plant'} />
      </div>
    );
  }
}

class PlantingProps {
  fields: Map<number, Field>;
  recordBook: RecordBook;

  plantSeed: Function;
  setCard: Function;

  fieldId: number;
  spot: number;
}

function mapStateToProps({ fields, recordBook }) {
  return { fields, recordBook }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    plantSeed, setCard
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)
  (PlantingFieldCard);
