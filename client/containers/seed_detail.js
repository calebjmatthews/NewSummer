import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { plantSeed } from '../actions/field';

class SeedDetailCard extends Component {
  componentDidMount() {
    this.seedConfirmClick = this.seedConfirmClick.bind(this);
  }

  seedConfirmClick(seed) {
    this.props.plantSeed(this.props.fieldsState.fields,
      this.props.field.id, seed);
    this.props.updateSeedPlanting(false);
    this.props.updateSeedDetail(false);
  }

  render() {
    let seed = this.props.seed;
    return (
      <div className="game-card" style={this.props.transStyle}
        key={seed.id}>
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
        <div>
          <button onClick={() => this.seedConfirmClick(seed)}>
            Confirm
          </button>
          <button onClick={() => this.props.updateSeedDetail(false)}>
            Cancel
          </button>
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

function mapStateToProps({ fieldsState }) {
  return { fieldsState }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    plantSeed
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SeedDetailCard);
