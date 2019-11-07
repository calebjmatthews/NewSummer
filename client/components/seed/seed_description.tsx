import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fontAwesome } from '../../instances/font_awesome';

import Seed from '../../models/seed/seed';
import { families } from '../../instances/families';
import { utils } from '../../models/utils';
import { StatNames } from '../../models/enums/stat_names';
import { CardTypes } from '../../models/enums/card_types';

import { setCard } from '../../actions/card';

class SeedDescription extends Component {
  props: SeedDescriptionProps;

  constructor(props: SeedDescriptionProps) {
    super(props);

    this.seedConfirmClick = this.seedConfirmClick.bind(this);
    this.seedDetailClick = this.seedDetailClick.bind(this);
  }

  seedConfirmClick(seed: Seed) {
    this.props.onConfirmClick(seed);
  }

  seedDetailClick(seed: Seed) {
    this.props.setCard({type: CardTypes.SEED_DETAIL, selectedSeed: seed},
      this.props.spot);
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
              let  transStyle = calcTransStyle(description.iconStyle);
              return (
                <div key={description.title} className="seed-icon"
                  style={transStyle}>
                  <FontAwesomeIcon icon={fontAwesome.get(description.icon)} />
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div className="seed-value-container">
            <div>
              {utils.formatDuration(
                seed.statMap.get(StatNames.GROWING_TIME).value * 1000)}
            </div>
            <div>
              {utils.formatMoney(
                seed.determineIdealValueFromStats(seed.statMap, families))}
            </div>
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

class SeedDescriptionProps {
  setCard: Function;

  spot: number;
  seed: Seed;
  confirmText: string;
  descriptionClassName: string;
  confirmDisabled: boolean;
  onConfirmClick: Function;
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({ setCard }, dispatch)
}

export default connect(null, mapDispatchToProps) (SeedDescription);
