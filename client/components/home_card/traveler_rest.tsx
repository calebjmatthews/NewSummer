import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setCast, sayHello } from '../../actions/cast';
import { setCard } from '../../actions/card';

import Cast from '../../models/traveler/cast';
import Card from '../../models/card';
import { utils } from '../../models/utils';

class TravelerRest extends Component {
  props: TravelerRestProps;

  constructor(props: TravelerRestProps) {
    super(props);

    this.state = {
      currentlyVisiting: null
    }

    this.travelerRestClick = this.travelerRestClick.bind(this);
  }

  travelerRestClick() {
    if (this.props.cast.currentlyVisiting != null) {
      this.props.sayHello(this.props.cast);
      this.props.setCard({type: 'seedBuying', spot: this.props.spot}, this.props.spot);
    }
  }

  render() {
    return (
      <div className="home-card-option"
        onClick={ () => this.travelerRestClick() }>
        {this.renderCurrentlyVisiting()}
      </div>
    );
  }

  renderCurrentlyVisiting() {
    let cast = this.props.cast;
    if (this.props.cast.currentlyVisiting != null
      && this.props.cast.saidHello == false) {
      return (
        <div>
          <div>{'A traveler is visiting,'}</div>
          <div>{'Say hello!'}</div>
        </div>
      );
    }
    else if (cast.currentlyVisiting != null && cast.saidHello == true) {
      let timeRemaining = '';
      timeRemaining = utils.formatDuration(cast.visitRemaining);
      return (
        <div>
          <div>{'A traveler is visiting,'}</div>
          <div>{'And leaving in ' + timeRemaining}</div>
        </div>
      );
    }
    return (
      <div>{'No one is visiting right now'}</div>
    );
  }
}

interface TravelerRestProps {
  spot: number;

  cast: Cast;
  setCard: (card: Card, spot: number) => any;
  sayHello: (cast: Cast) => any;
}

function mapStateToProps({ cast }) {
  return { cast }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    setCard, sayHello
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)
  (TravelerRest);
