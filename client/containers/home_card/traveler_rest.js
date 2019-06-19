import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCast, sayHello } from '../../actions/cast';
import { setCard } from '../../actions/card';
import { formatDuration } from '../../functions/utils';

class TravelerRest extends Component {
  componentDidMount() {
    this.travelerRestClick = this.travelerRestClick.bind(this);
  }

  travelerRestClick() {
    this.props.sayHello(this.props.castState.cast);
    this.props.setCard({type: 'seedBuying'}, this.props.spot);
  }

  render() {
    let cast = this.props.castState.cast;
    if (cast.currentlyVisiting == null) {
      return (
        <div className="home-card-option">
          <div>{'No one is visiting right now'}</div>
        </div>
      );
    }
    else if (cast.currentlyVisiting != null && cast.saidHello == false) {
      return (
        <div className="home-card-option"
          onClick={ () => this.travelerRestClick() }>
          <div>{'A traveler is visiting,'}</div>
          <div>{'Say hello!'}</div>
        </div>
      );
    }
    else {
      let timeRemaining = '';
      timeRemaining = formatDuration(cast.visitRemaining);
      return (
        <div className="home-card-option"
          onClick={ () => this.travelerRestClick() }>
          <div>{'A traveler is visiting,'}</div>
          <div>{'And leaving in ' + timeRemaining}</div>
        </div>
      );
    }
  }
}


function mapStateToProps({ castState }) {
  return { castState }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setCard, sayHello
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)
  (TravelerRest);
