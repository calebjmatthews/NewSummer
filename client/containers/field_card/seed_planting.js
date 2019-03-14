import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { plantSeed } from '../../actions/field';

class SeedPlantingFieldCard extends Component {
  componentDidMount() {
    this.seedPlantClick = this.seedPlantClick.bind(this);
  }

  seedPlantClick(seed) {
    this.props.plantSeed(this.props.fieldsState.fields,
      this.props.field.id, seed);
    this.props.updateSeedPlanting(false);
  }

  render() {
    return (
      <div className="game-card field-card" style={this.props.transStyle}>
        {'Choose a seed:'}
        {this.props.storehouseState.storehouse
          .seeds.getAll().map((seed) => {
          return (
            <div key={seed.id}
              onClick={() => this.seedPlantClick(seed)}>
              {seed.name}
            </div>
          )
        })}
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
