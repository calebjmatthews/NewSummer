import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { setCard } from '../actions/card';
import BackButton from './back_button';

class SeedDetailCard extends Component {
  render() {
    let seed = this.props.cardState.cards[this.props.spot].value;
    return (
      <div className="game-card" style={this.props.transStyle}
        key={seed.id}>
        <BackButton spot={this.props.spot} />
        <div>
          <div className="seed-detail-name">{seed.name}</div>
          <div className="seed-detail-container">
            {seed.descriptions.map((description) => {
              description.transStyle = calcTransStyle(description.iconStyle);
              return (
                <div key={description.title} >
                  <div className="seed-detail-line">
                    <div className="seed-icon"
                      style={description.transStyle}>
                      <FontAwesomeIcon icon={description.icon} />
                    </div>
                    <div className="seed-detail-description">
                      <div className="seed-detail-title">{description.title}</div>
                      <div>{description.description}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

function calcTransStyle(iconStyle) {
  if (iconStyle == 'positive') {
    return { background: '#25821b' };
  }
  else if (iconStyle == 'negative') {
    return { background: '#7f2f19' };
  }
  else if (iconStyle == 'neutral') {
    return { background: '#173d7a' };
  }
}

function mapStateToProps({ cardState }) {
  return { cardState }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setCard
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SeedDetailCard);
