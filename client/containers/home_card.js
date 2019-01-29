import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class HomeCard extends Component {
  render() {
    return (
      <div className="game-card" style={this.props.transStyle}>
        <div>Home!</div>
      </div>
    );
  }
}

function mapStateToProps({ storehouseState }) {
  return { storehouseState }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeCard);
