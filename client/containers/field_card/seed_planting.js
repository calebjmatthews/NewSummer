import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { plantSeed } from '../../actions/field';
import SeedDescription from '../seed_description';

class SeedPlantingFieldCard extends Component {
  componentDidMount() {
    this.seedConfirmClick = this.seedConfirmClick.bind(this);
    this.onClickConfirmToParent = this.onClickConfirmToParent.bind(this);
  }

  seedConfirmClick(seed) {
    this.props.plantSeed(this.props.fieldsState.fields,
      this.props.field.id, seed);
    this.props.updateSeedPlanting(false);
  }

  seedPlant

  onClickConfirmToParent(seed) {
    return this.seedConfirmClick(seed);
  }

  onClickDetailToParent(seed) {
    return this.seed
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
                onClickConfirmToParent={this.onClickConfirmToParent} />
            );
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ fieldsState, storehouseState }) {
  return { fieldsState, storehouseState }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    plantSeed
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)
  (SeedPlantingFieldCard);
