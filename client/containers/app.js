import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ageSeed, harvestSeed, plantSeed } from '../actions/field';
import FieldCard from './field_card';
import HomeCard from './home_card';

const TIME_STEP = (0.025 * 1000);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spotCurrent: 1,
      spotQuantity: 2
    }
  }
  componentDidMount() {
    setInterval(() => {
      this.props.ageSeed(this.props.fieldState.field);
    }, TIME_STEP);
    this.navLeftClick = this.navLeftClick.bind(this);
    this.navRightClick = this.navRightClick.bind(this);
  }

  navLeftClick() {
    if (this.state.spotCurrent > 0) {
      const newSpot = this.state.spotCurrent - 1;
      this.setState({spotCurrent: newSpot});
    }
    else {
      const newSpot = this.state.spotQuantity - 1;
      this.setState({spotCurrent: newSpot});
    }
  }

  navRightClick() {
    if (this.state.spotCurrent <= (this.state.spotQuantity-2)) {
      const newSpot = this.state.spotCurrent + 1;
      this.setState({spotCurrent: newSpot});
    }
    else {
      this.setState({spotCurrent: 0});
    }
  }

  getCardStyle(thisIndex) {
    let position = (this.state.spotCurrent - thisIndex) * -1;
    let cardStyle = {
      transform: ('translateX(' + (110 * position) + '%)')
    };
    return cardStyle;
  }

  render() {
    return (
      <div className="container-main">
        <div className="header">
          {this.props.storehouseState.storehouse.dollars + '$'}
        </div>
        <div className="game-card-wrapper">
          <div className="nav-button nav-button-left"
            onClick={() => this.navLeftClick()}>
            <div>{'<'}</div>
          </div>
          <div className="nav-button nav-button-right"
            onClick={() => this.navRightClick()}>
            <div>{'>'}</div>
          </div>
          <HomeCard transStyle={this.getCardStyle(0)} />
          <FieldCard transStyle={this.getCardStyle(1)} />
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
    ageSeed
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
