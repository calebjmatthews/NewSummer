import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { plantSeed } from '../../actions/field';
import { setCard } from '../../actions/card';
import SeedDescription from '../seed_description';

class SeedPlantingFieldCard extends Component {
  componentDidMount() {
    this.seedConfirmPlanting = this.seedConfirmPlanting.bind(this);
    this.openSeedDetail = this.openSeedDetail.bind(this);
  }

  seedConfirmPlanting(seed) {
    this.props.plantSeed(this.props.fieldsState.fields,
      this.props.field.id, seed);
    this.props.setCard(null, this.props.spot);
  }

  openSeedDetail(seed) {
    this.props.setCard({ type: 'seedDetail', value: seed }, this.props.spot);
  }

  render() {
    return (
      <div className="game-card field-card" style={this.props.transStyle}>
        {'Choose a seed:'}
        <div className="seed-option-container">
          {this.props.storehouseState.storehouse
            .seeds.getAll().map((seed) => {
            return (
              <SeedDescription key={seed.id} seed={seed}
                onClickConfirmToParent={this.seedConfirmPlanting}
                onClickDetailToParent={this.openSeedDetail}
                confirmText={'Plant'} />
            );
          })}
        </div>
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
  (SeedPlantingFieldCard);
