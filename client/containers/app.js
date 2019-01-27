import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ageSeed } from '../actions/field';

class App extends Component {
  componentDidMount() {
    setInterval(() => {
      this.props.ageSeed(this.props.fieldState.field);
    }, 250)
  }
  render() {
    return (
      <div className="container-main">
  			<div>
  				<div className="field-card">
            <div>
              Seed name: {this.props.fieldState.field.seedPlanted.seedName}
            </div>
            <div>
              Seed age: {this.props.fieldState.field.seedAge}
            </div>
  				</div>
  			</div>
      </div>
    )
  }
}

function mapStateToProps({ fieldState }) {
  return { fieldState  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ageSeed
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
