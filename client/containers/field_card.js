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
    if (this.props.fieldState.field.seedPlanted == null) {
      this.setState({seedChoosing: true});
    }
    else {
      if (this.props.fieldState.field.seedIsMature() == true) {
        this.props.harvestSeed(
          this.props.fieldState.field,
          this.props.storehouseState.storehouse
        );
      }
    }
  }

  seedPlantClick(seed) {
    this.props.plantSeed(this.props.fieldState.field, seed);
    this.setState({seedChoosing: false});
  }

  render() {
    if (this.state.seedChoosing == true) {
      return (
        <div className="game-card" style={this.props.transStyle}
          onClick={() => this.fieldCardClick()}>
          Choose a seed:
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
            {this.props.fieldState.field.getSeedName()}
          </div>
          <div>
            {this.props.fieldState.field.getSeedsState() + ' '}
            {this.props.fieldState.field.getSeedsAge()}
          </div>
        </div>
      )
    }
  }
}

function mapStateToProps({ fieldState, storehouseState }) {
  return { fieldState, storehouseState }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    harvestSeed, plantSeed
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldCard);
