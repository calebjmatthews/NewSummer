import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fontAwesome } from '../../instances/font_awesome';

import Seed from '../../models/seed/seed';
import Card from '../../models/card';
import { families } from '../../instances/families';
import { utils } from '../../models/utils';
import { StatNames } from '../../models/enums/stat_names';
import { CardTypes } from '../../models/enums/card_types';

import Tooltip from '../tooltip';
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
    this.props.setCard({type: CardTypes.SEED_DETAIL, selectedSeed: seed,
      spot: this.props.spot}, this.props.spot);
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
              let iconStyle = calcIconStyle(description.iconStyle);
              let tooltipParent = (
                <div className="seed-icon" style={iconStyle}>
                  <FontAwesomeIcon icon={fontAwesome.get(description.icon)} />
                </div>
              );
              return (
                <Tooltip key={description.title} iconStyle={iconStyle}
                  description={description} parentElement={tooltipParent} />
              );
            })}
          </div>
        </div>
        <div>
          <div className="seed-value-container">
            <div>
              {utils.formatDuration(
                seed.statMap[StatNames.GROWING_TIME].value * 1000)}
            </div>
            <div>
              {utils.formatMoney(
                seed.determineIdealValueFromStats(seed.statMap))}
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

function calcIconStyle(iconStyle: string) {
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
  setCard: (card: Card, spot: number) => any;

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
