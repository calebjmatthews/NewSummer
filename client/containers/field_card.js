import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { harvestSeed, plantSeed } from '../actions/field';

class FieldCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seedChoosing: false
    }
  }
  componentDidMount() {
    this.fieldCardClick = this.fieldCardClick.bind(this);
    this.seedPlantClick = this.seedPlantClick.bind(this);
  }

  fieldCardClick() {
    if (this.props.field.seedPlanted == null) {
      this.setState({seedChoosing: true});
    }
    else {
      if (this.props.field.seedIsMature() == true) {
        this.props.harvestSeed(
          this.props.fieldsState.fields,
          this.props.storehouseState.storehouse,
          this.props.field.id
        );
      }
    }
  }

  seedPlantClick(seed) {
    this.props.plantSeed(this.props.fieldsState.fields,
      this.props.field.id, seed);
    this.setState({seedChoosing: false});
  }

  render() {
    if (this.state.seedChoosing == true) {
      return (
        <div className="game-card field-card" style={this.props.transStyle}
          onClick={() => this.fieldCardClick()}>
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
      )
    }
    else {
      return (
        <div className="game-card" style={this.props.transStyle}
          onClick={() => this.fieldCardClick()}>
          <div>
            {this.props.field.seedsName}
          </div>
          <div>
            {this.props.field.seedsState + ' '}
            {this.props.field.seedsAgeLabel}
          </div>
        </div>
      )
    }
  }
}

function mapStateToProps({ fieldsState, storehouseState }) {
  return { fieldsState, storehouseState }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    harvestSeed, plantSeed
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldCard);
