import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { setCard } from '../actions/card';
import BackButton from './back_button';

class CultivarSelectCard extends Component {
  componentDidMount() {
    this.selectCultivar = this.selectCultivar.bind(this);
  }

  selectCultivar(cultivarName) {
    let oldCard = this.props.cardState.cards[this.props.spot];
    let newCard = {"type": this.props.nextType};
    if (cultivarName != 'all') {
      newCard.value = cultivarName;
    }
    else {
      newCard.value = null;
    }
    if (oldCard.type == 'cultivarSelectB') {
      newCard.parentA = oldCard.parentA;
    }
    this.props.setCard(newCard, this.props.spot);
  }

  render() {
    let storehouse = this.props.storehouseState.storehouse;
    return (
      <div className="game-card field-card" style={this.props.transStyle}>
        <BackButton spot={this.props.spot} />
        <div>{ 'Cultivars' }</div>
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

function mapStateToProps({ storehouseState, cardState }) {
  return { storehouseState, cardState }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setCard
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)
  (CultivarSelectCard);
