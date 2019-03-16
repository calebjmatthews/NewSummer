import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SeedDescription extends Component {

  seedConfirmClick(seed) {
    this.props.onClickConfirmToParent(seed);
  }

  seedDetailClick(seed) {
    this.props.onClickDetailToParent(seed);
  }

  render() {
    let seed = this.props.seed;
    return (
      <div className="seed-option" key={seed.id}>
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
          <button>
            Detail
          </button>
          <button onClick={() => this.seedConfirmClick(seed)}>
            Confirm
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

export default SeedDescription;
