import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fontAwesome } from '../../instances/font_awesome';

import CardState from '../../models/card_state';
import { images } from '../../instances/images';

import BackButton from '../back_button';

class SeedDetailCard extends Component {
  props: SeedDetailCardProps;

  constructor(props: SeedDetailCardProps) {
    super(props);
  }

  render() {
    let seed = this.props.cardState.cards[this.props.spot].selectedSeed;
    return (
      <div className="game-card" key={seed.id}>
        <div className="game-card-body">
          <BackButton spot={this.props.spot} />
          <div>
            <div className="seed-detail-name">{seed.name}</div>
            <div className="seed-detail-container">
              {seed.descriptions.map((description) => {
                let transStyle = calcTransStyle(description.iconStyle);
                return (
                  <div key={description.title} >
                    <div className="seed-detail-line">
                      <div className="seed-icon"
                        style={transStyle}>
                        <FontAwesomeIcon icon={fontAwesome.get(description.icon)} />
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
        <img className="game-card-background"
          src={images.get('background')}></img>
      </div>
    );
  }
}

function calcTransStyle(iconStyle: string) {
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

interface SeedDetailCardProps {
  spot: number;

  cardState: CardState;
}

function mapStateToProps({ cardState }) {
  return { cardState }
}

export default connect(mapStateToProps)(SeedDetailCard);
