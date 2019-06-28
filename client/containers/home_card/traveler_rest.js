import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCast, sayHello } from '../../actions/cast';
import { setCard } from '../../actions/card';
import { formatDuration } from '../../functions/utils';

class TravelerRest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentlyVisiting: null
    }
  }
  componentDidMount() {
    this.travelerRestClick = this.travelerRestClick.bind(this);
    // Fix for the visit start somehow not causing a rerender
    setInterval(() => {
      let cast = this.props.castState.cast;
      if (this.state.currentlyVisiting != cast.currentlyVisiting) {
        this.setState({currentlyVisiting: cast.currentlyVisiting});
      }
    }, 250);
  }

  travelerRestClick() {
    if (this.props.castState.cast.currentlyVisiting != null) {
      this.props.sayHello(this.props.castState.cast);
      this.props.setCard({type: 'seedBuying'}, this.props.spot);
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
    let cast = this.props.castState.cast;
    if (cast.currentlyVisiting != null && cast.saidHello == false) {
      return (
        <div>
          <div>{'A traveler is visiting,'}</div>
          <div>{'Say hello!'}</div>
        </div>
      );
    }
    else if (cast.currentlyVisiting != null && cast.saidHello == true) {
      let timeRemaining = '';
      timeRemaining = formatDuration(cast.visitRemaining);
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
