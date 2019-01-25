import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {
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

export default connect(mapStateToProps)(App);
