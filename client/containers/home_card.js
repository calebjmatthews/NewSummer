import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { buyFieldAttempt } from '../actions/economy';

class HomeCard extends Component {
  componentDidMount() {
    this.buyClick = this.buyClick.bind(this);
  }
  buyClick(toBuy) {
    if (toBuy == 'field') {
      this.props.buyFieldAttempt(this.props.economyState.economy,
        this.props.storehouseState.storehouse);
    }
  }
  render() {
    return (
      <div className="game-card" style={this.props.transStyle}>
        <div>{'A trader is visiting!'}</div>
        <div onClick={() => this.buyClick('field')}>
          {'Purchase a new field for $'
            + this.props.economyState.economy.getFieldPrice()}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ storehouseState, economyState }) {
  return { storehouseState, economyState }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    buyFieldAttempt
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeCard);
