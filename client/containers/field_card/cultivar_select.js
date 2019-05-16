import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { setCard } from '../../actions/card';

class CultivarSelectFieldCard extends Component {
  componentDidMount() {
    this.selectCultivar = this.selectCultivar.bind(this);
  }

  selectCultivar(cultivarName) {
    if (cultivarName != 'all') {
      this.props.setCard({type: 'seedPlanting', value: cultivarName},
        this.props.spot);
    }
    else {
      this.props.setCard({type: 'seedPlanting', value: null},
        this.props.spot);
    }
  }

  render() {
    let storehouse = this.props.storehouseState.storehouse;
    return (
      <div className="game-card field-card" style={this.props.transStyle}>
        <div className="option-container">
          <div className="cultivar-option"
            onClick={ () => this.selectCultivar('all') }>
            <FontAwesomeIcon icon={'expand-arrows-alt'} />
            <div>{ 'All' }</div>
            <div>{ storehouse.seeds.getLength() }</div>
          </div>
          { storehouse.getCultivarNames().map((cultivarName) => {
            return (
              <div className="cultivar-option" key={cultivarName}
                onClick={ () => this.selectCultivar(cultivarName) }>
                <FontAwesomeIcon icon={'seedling'} />
                <div>{ cultivarName }</div>
                <div>{ storehouse.getCultivarCount(cultivarName) + '/'
                  + storehouse.maxSeeds }</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ storehouseState }) {
  return { storehouseState }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setCard
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)
  (CultivarSelectFieldCard);
