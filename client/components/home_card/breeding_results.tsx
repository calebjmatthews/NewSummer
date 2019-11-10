import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { finishBreedingSeed } from '../../actions/homestead';
import { setCard } from '../../actions/card';
import SeedDescription from '../seed/seed_description';
import BackButton from '../back_button';

import Seed from '../../models/seed/seed';
import Homestead from '../../models/homestead';
import CardState from '../../models/card_state';
import RecordBook from '../../models/record_book';

class BreedingResultsHomeCard extends Component {
  props: BreedingResultsHomeCardProps;

  constructor(props: BreedingResultsHomeCardProps) {
    super(props);

    this.chooseSeed = this.chooseSeed.bind(this);
  }

  chooseSeed(seed: Seed) {
    this.props.finishBreedingSeed(
      this.props.homestead, this.props.recordBook, seed, this.props.spot);
  }

  render() {
    return (
      <div className="game-card field-card">
        <BackButton spot={this.props.spot} />
        {'Choose which seed to keep:'}
        <div className="option-container">
          {this.props.homestead.seedsBred.map((seed) => {
            return (
              <SeedDescription key={seed.name} seed={seed}
                spot={this.props.spot}
                onConfirmClick={this.chooseSeed}
                confirmText="Go" />
            );
          })}
        </div>
      </div>
    );
  }
}

interface BreedingResultsHomeCardProps {
  spot: number;

  homestead: Homestead;
  recordBook: RecordBook;
  cardState: CardState;
  finishBreedingSeed: Function;
}

function mapStateToProps({ homestead, recordBook, cardState }) {
  return { homestead, recordBook, cardState }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    finishBreedingSeed, setCard
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)
  (BreedingResultsHomeCard);
