import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ageCrop } from '../actions/field';

class App extends Component {
  componentDidMount() {
    setInterval(() => {
      this.props.ageCrop(this.props.fieldState.field);
    }, 250)
  }
  render() {
    return (
      <div className="container-main">
  			<div>
  				<div className="field-card">
            Crop name: {this.props.fieldState.field.cropPlanted.name}
            Crop age: {this.props.fieldState.field.cropAge}
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
    ageCrop
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
