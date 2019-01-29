import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ageSeed, harvestSeed, plantSeed } from '../actions/field';

const TIME_STEP = (0.025 * 1000);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seedChoosing: false
    }
  }
  componentDidMount() {
    setInterval(() => {
      this.props.ageSeed(this.props.fieldState.field);
    }, TIME_STEP);

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

  renderFieldCardContents() {
    if (this.state.seedChoosing == true) {
      return (
        <div>
          Choose a seed:
          {this.props.storehouseState.storehouse.seeds.getAll().map((seed) => {
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
        <div>
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

  render() {
    return (
      <div className="container-main">
        <div className="header">
          {this.props.storehouseState.storehouse.dollars + '$'}
        </div>
  			<div className="field-card"
          onClick={() => this.fieldCardClick()}>
          {this.renderFieldCardContents()}
  			</div>
      </div>
    )
  }
}

function mapStateToProps({ fieldState, storehouseState }) {
  return { fieldState, storehouseState }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ageSeed, harvestSeed, plantSeed
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
