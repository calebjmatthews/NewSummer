import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ageSeed, harvestSeed, plantSeed } from '../actions/field';
import FieldCard from './field_card';

const TIME_STEP = (0.025 * 1000);

class App extends Component {
  componentDidMount() {
    setInterval(() => {
      this.props.ageSeed(this.props.fieldState.field);
    }, TIME_STEP);
  }

  render() {
    return (
      <div className="container-main">
        <div className="header">
          {this.props.storehouseState.storehouse.dollars + '$'}
        </div>
        <FieldCard />
      </div>
    )
  }
}

function mapStateToProps({ fieldState, storehouseState }) {
  return { fieldState, storehouseState }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ageSeed
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
