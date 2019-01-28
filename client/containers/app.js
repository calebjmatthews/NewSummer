import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ageSeed, harvestSeed } from '../actions/field';

const TIME_STEP = (0.025 * 1000);

class App extends Component {
  componentDidMount() {
    setInterval(() => {
      this.props.ageSeed(this.props.fieldState.field);
    }, TIME_STEP);

    this.fieldCardClick = this.fieldCardClick.bind(this);
  }

  fieldCardClick(ev) {
    if (this.props.fieldState.field.seedIsMature() == true) {
      this.props.harvestSeed(
        this.props.fieldState.field,
        this.props.storehouseState.storehouse
      );
    }
  }

  render() {
    return (
      <div className="container-main">
        <div className="header">
          {this.props.storehouseState.storehouse.dollars + '$'}
        </div>
  			<div className="field-card"
          onClick={(ev) => this.fieldCardClick(ev)}>
          <div>
            {this.props.fieldState.field.getSeedName()}
          </div>
          <div>
            {this.props.fieldState.field.getSeedsState() + ' '}
            {this.props.fieldState.field.getSeedsAge()}
          </div>
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
    ageSeed, harvestSeed
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
