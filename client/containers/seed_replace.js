import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { setCard } from '../actions/card';
import { seedBuyCancel } from '../actions/economy';
import { replaceSeed } from '../actions/storehouse';
import SeedDescription from './seed_description';

class SeedReplaceCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seedSelected: null
    }
  }
  componentDidMount() {
    this.cancelClick = this.cancelClick.bind(this);
    this.existingSeedSelect = this.existingSeedSelect.bind(this);
  }

  cancelClick() {
    this.props.seedBuyCancel(this.props.economyState.economy,
      this.props.storehouseState.storehouse, this.props.spot);
  }

  replaceClick() {
    let oldSeed = this.props.storehouseState.storehouse.seeds
      .getByProperty('id', this.state.seedSelected);
    this.props.replaceSeed(this.props.storehouseState.storehouse,
      oldSeed, this.props.storehouseState.storehouse.intermediateSeed);
    this.props.setCard({type: null}, this.props.spot);
  }

  existingSeedSelect(seed) {
    if (this.state.seedSelected != seed.id) {
      this.setState({ seedSelected: seed.id });
    }
    else {
      this.setState({ seedSelected: null });
    }
  }

  render() {
    let newSeed = this.props.storehouseState.storehouse.intermediateSeed;
    if (newSeed == undefined || newSeed == null) {
      return <div></div>;
    }
    return (
      <div className="game-card field-card" style={this.props.transStyle}>
        {'New:'}
        <div className="seed-option-container">
          <SeedDescription key={newSeed.id} seed={newSeed}
            spot={this.props.spot}
            confirmText={null} />
        </div>
        {'Discard an old seed:'}
        <div className="seed-option-container">
          {this.props.storehouseState.storehouse
            .seeds.getAll().map((seed) => {
            let descriptionClassName = "seed-option";
            if (this.state.seedSelected == seed.id) {
              descriptionClassName = "seed-option selected";
            }
            return (
              <SeedDescription key={seed.id} seed={seed}
                spot={this.props.spot}
                onClickConfirmToParent={this.existingSeedSelect}
                confirmText={'Select'}
                descriptionClassName={descriptionClassName} />
            );
          })}
        </div>
        <div>
          <button onClick={ () => this.replaceClick() }
            disabled={this.state.seedSelected == null}>
            {'Discard seed'}
          </button>
          <button onClick={ () => this.cancelClick() }>
            {'Cancel'}
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ fieldsState, storehouseState, cardState,
  economyState }) {
  return { fieldsState, storehouseState, cardState, economyState }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setCard, seedBuyCancel, replaceSeed
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)
  (SeedReplaceCard);
