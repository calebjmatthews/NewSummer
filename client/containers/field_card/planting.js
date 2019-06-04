import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { plantSeed } from '../../actions/field';
import { setCard } from '../../actions/card';
import SeedSelectCard from '../seed/seed_select';
import BackButton from '../back_button';

class PlantingFieldCard extends Component {
  componentDidMount() {
    this.seedConfirmPlanting = this.seedConfirmPlanting.bind(this);
  }

  seedConfirmPlanting(seed) {
    this.props.plantSeed(this.props.fieldsState.fields,
      this.props.field.id, seed);
    this.props.setCard(null, this.props.spot);
  }

  render() {
    let card = this.props.cardState.cards[this.props.spot];
    let cultivarSeeds = [];
    if (card.value != undefined && card.value != null) {
      cultivarSeeds = this.props.storehouseState.storehouse.seeds
        .getAllMatching('cultivarName', card.value);
    }
    else {
      cultivarSeeds = this.props.storehouseState.storehouse.seeds.getAll();
    }

    return (
      <div className="game-card field-card" style={this.props.transStyle}>
        <BackButton spot={this.props.spot} />
        {'Choose a seed to plant:'}
        <SeedSelectCard spot={this.props.spot}
          onClickConfirmToParent={this.seedConfirmPlanting}
          confirmText={'Plant'} />
      </div>
    );
  }
}

function mapStateToProps({ fieldsState, storehouseState, cardState }) {
  return { fieldsState, storehouseState, cardState }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    plantSeed, setCard
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)
  (PlantingFieldCard);