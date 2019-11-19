import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { setCard } from '../../actions/card';
import { replaceSeed } from '../../actions/homestead';
import SeedDescription from './seed_description';

import Seed from '../../models/seed/seed';
import Field from '../../models/field';
import Homestead from '../../models/homestead';
import CardState from '../../models/card_state';
import RecordBook from '../../models/record_book';
import Card from '../../models/card';
import { images } from '../../instances/images';

class SeedReplaceCard extends Component {
  props: SeedReplaceCardProps;
  state: SeedReplaceCardState;

  constructor(props: SeedReplaceCardProps) {
    super(props);

    this.state = {
      seedSelected: null
    }
    this.cancelClick = this.cancelClick.bind(this);
    this.existingSeedSelect = this.existingSeedSelect.bind(this);
  }

  cancelClick() {
    if (this.props.reason == 'breed') {
      this.props.setCard(null, this.props.spot);
    }
  }

  replaceClick() {
    let oldSeed: Seed = this.props.recordBook.seedMap[this.state.seedSelected];
    this.props.replaceSeed(this.props.homestead, oldSeed,
      this.props.homestead.intermediateSeed, this.props.recordBook, this.props.reason);
    this.props.setCard(null, this.props.spot);
  }

  existingSeedSelect(seed: Seed) {
    if (this.state.seedSelected != seed.id) {
      this.setState({ seedSelected: seed.id });
    }
    else {
      this.setState({ seedSelected: null });
    }
  }

  render() {
    let newSeed: Seed = this.props.homestead.intermediateSeed;
    if (newSeed == undefined || newSeed == null) {
      return <div></div>;
    }
    let cultivarSeeds: Seed[] = this.props.homestead
      .getAllMatchingSeeds(newSeed.cultivarName, this.props.recordBook.seedMap);
    return (
      <div className="game-card field-card">
        <div className="game-card-body">
          {'New:'}
          <div className="option-container">
            <SeedDescription key={newSeed.id} seed={newSeed}
              spot={this.props.spot}
              confirmText={null} />
          </div>
          {'Discard an old seed:'}
          <div className="option-container">
            {cultivarSeeds.map((seed) => {
              let descriptionClassName: string = "seed-option";
              if (this.state.seedSelected == seed.id) {
                descriptionClassName = "seed-option selected";
              }
              return (
                <SeedDescription key={seed.id} seed={seed}
                  spot={this.props.spot}
                  onConfirmClick={this.existingSeedSelect}
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
        <img className="game-card-background"
          src={images.get('images/background.png')}></img>
      </div>
    );
  }
}

interface SeedReplaceCardProps {
  spot: number;
  reason: string;

  fields: { [id: number] : Field };
  homestead: Homestead;
  cardState: CardState;
  recordBook: RecordBook;
  setCard: (card: Card, spot: number) => any;
  replaceSeed: (homestead: Homestead, oldSeed: Seed, newSeed: Seed,
    recordBook: RecordBook, reason: string) => any;
}

interface SeedReplaceCardState {
  seedSelected: number;
}

function mapStateToProps({ fields, homestead, cardState, recordBook }) {
  return { fields, homestead, cardState, recordBook }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    setCard, replaceSeed
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)
  (SeedReplaceCard);
