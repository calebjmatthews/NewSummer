import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { finishBreedingSeed } from '../../actions/storehouse';
import { setCard } from '../../actions/card';
import SeedDescription from '../seed/seed_description';
import BackButton from '../back_button';

class BreedingResultsHomeCard extends Component {
  componentDidMount() {
    this.chooseSeed = this.chooseSeed.bind(this);
  }

  chooseSeed(seed) {
    this.props.finishBreedingSeed(
      this.props.storehouseState.storehouse,
      this.props.recordBookState.recordBook,
      seed);
    this.props.setCard({type: null}, this.props.spot);
  }

  render() {
    let storehouse = this.props.storehouseState.storehouse;
    return (
      <div className="game-card field-card" style={this.props.transStyle}>
        <BackButton spot={this.props.spot} />
        {'Choose which seed to keep:'}
        <div className="option-container">
          {storehouse.seedsBred.map((seed) => {
            return (
              <SeedDescription key={seed.name} seed={seed}
                spot={this.props.spot}
                onClickConfirmToParent={this.chooseSeed}
                confirmText="Go" />
            );
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ storehouseState, autoIncrementState,
  recordBookState, cardState }) {
  return { storehouseState, autoIncrementState, recordBookState, cardState }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    finishBreedingSeed, setCard
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)
  (BreedingResultsHomeCard);
