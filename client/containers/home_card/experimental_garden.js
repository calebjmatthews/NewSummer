import React, { Component } from 'react';
import { connect } from 'react-redux';

class ExperimentalGarden extends Component {
  render() {
    return (
      <div className="home-card-option"
        onClick={ () => this.props.onClickToParent() }>
        <div>{'Experimental Garden:'}</div>
        <div>{'Breed two seeds together'}</div>
      </div>
    );
  }
}


function mapStateToProps({ storehouseState }) {
  return { storehouseState }
}

export default connect(mapStateToProps) (ExperimentalGarden);
