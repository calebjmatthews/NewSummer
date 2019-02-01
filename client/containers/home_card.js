import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { buyFieldAttempt } from '../actions/economy';

class HomeCard extends Component {
  componentDidMount() {
    this.buyClick = this.buyClick.bind(this);
    this.breedClick = this.breedClick.bind(this);
  }
  buyClick(toBuy) {
    if (toBuy == 'field') {
      this.props.buyFieldAttempt(
        this.props.economyState.economy,
        this.props.storehouseState.storehouse,
        this.props.fieldsState.fields
      );
    }
  }
  breedClick() {
    console.log('this');
    console.log(this);
    this.props.storehouseState.storehouse.seeds.members[0]
    .breedWith(this.props.storehouseState.storehouse.seeds.members[1]);
  }
  render() {
    return (
      <div className="game-card" style={this.props.transStyle}>
        <div>{'A trader is visiting!'}</div>
        <div onClick={() => this.buyClick('field')}>
          {'Purchase a new field for $'
            + this.props.economyState.economy.getFieldPrice()}
        </div>
        <div onClick={() => this.breedClick()}>
          {'Breed two seeds'}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ storehouseState, economyState, fieldsState }) {
  return { storehouseState, economyState, fieldsState }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    buyFieldAttempt
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeCard);
