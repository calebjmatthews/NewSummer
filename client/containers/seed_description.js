import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GROWING_TIME } from '../instances/stats';
import { setCard } from '../actions/card';

class SeedDescription extends Component {
  componentDidMount() {
    this.seedConfirmClick = this.seedConfirmClick.bind(this);
    this.seedDetailClick = this.seedDetailClick.bind(this);
  }

  seedConfirmClick(seed) {
    this.props.onClickConfirmToParent(seed);
  }

  seedDetailClick(seed) {
    this.props.setCard({type: "seedDetail", value: seed}, this.props.spot);
  }

  render() {
    let seed = this.props.seed;

    let confirmText = 'Confirm';
    if (this.props.confirmText != undefined) {
      confirmText = this.props.confirmText;
    }

    let descriptionClassName = "seed-option";
    if (this.props.descriptionClassName != undefined) {
      descriptionClassName = this.props.descriptionClassName;
    }

    return (
      <div className={descriptionClassName}>
        <div>
          {seed.name}
          <div className="seed-icon-container">
            {seed.descriptions.map((description) => {
              description.transStyle = calcTransStyle(description.iconStyle);
              return (
                <div key={description.title} className="seed-icon"
                  style={description.transStyle}>
                  <FontAwesomeIcon icon={description.icon} />
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div className="seed-value-container">
            <div>{Math.round(seed.stats[GROWING_TIME].value) + 's'}</div>
            <div>{'$' + seed.determineIdealValueFromStats(seed.stats)}</div>
          </div>
          <button onClick={() => this.seedDetailClick(seed)}>
            Detail
          </button>
          <button onClick={() => this.seedConfirmClick(seed)}
            disabled={this.props.confirmDisabled}
            hidden={this.props.confirmText == null}>
            {confirmText}
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setCard }, dispatch)
}

export default connect(null, mapDispatchToProps) (SeedDescription);
