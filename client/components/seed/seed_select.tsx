import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Field from '../../models/field';
import Seed from '../../models/seed/seed';
import Homestead from '../../models/homestead';
import CardState from '../../models/card_state';
import RecordBook from '../../models/record_book';
import Card from '../../models/card';

import SeedDescription from './seed_description';
import { setCard } from '../../actions/card';
import { plantSeed } from '../../actions/field';

class SeedSelectCard extends Component {
  props: SeedSelectCardProps;
  state: SeedSelectCardState;

  constructor(props: SeedSelectCardProps) {
    super(props);
    this.state = {
      cultivarName: 'All'
    }
  }

  componentDidMount() {
    this.selectCultivar = this.selectCultivar.bind(this);
  }

  selectCultivar(cultivarName: string) {
    this.setState({ cultivar: cultivarName });
  }

  render() {
    let cultivarSeeds: Seed[] = []
    let cultivarNames: string[] = ['All'];
    this.props.recordBook.getCultivarNames().map((cultivarName) => {
      cultivarNames.push(cultivarName);
    });
    let cultivarLabel: string = '';
    if (this.state.cultivarName != 'All') {
      cultivarSeeds = this.props.homestead
        .getAllMatchingSeeds(this.state.cultivarName, this.props.recordBook.seedMap);
      cultivarLabel = (this.state.cultivarName + ' ('
        + this.props.homestead.getCultivarCount(this.state.cultivarName, this.props.recordBook.seedMap)
        + '/' + this.props.homestead.maxSeeds + ')');
    }
    else {
      cultivarSeeds = this.props.homestead.getAllSeeds(this.props.recordBook.seedMap);
      cultivarLabel = ('All (' + cultivarSeeds.length  + ')');
    }

    return (
      <div className="seed-select-container">
        <div>{ cultivarLabel }</div>
        <div className="option-container">
          {cultivarSeeds.map((seed) => {
            return (
              <SeedDescription key={seed.id} seed={seed}
                spot={this.props.spot}
                onConfirmClick={this.props.onConfirmClick}
                confirmText={this.props.confirmText} />
            );
          })}
        </div>
        <div className="cultivar-bar">
          { cultivarNames.map((cultivarName) => {
            return (
              <button key={cultivarName} className="cultivar-bar-option"
                onClick={ () => this.selectCultivar(cultivarName) }>
                <div>{ cultivarName.slice(0,3) }</div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}

class SeedSelectCardProps {
  homestead: Homestead;
  cardState: CardState;
  recordBook: RecordBook;

  setCard: (card: Card, spot: number) => any;

  spot: number;
  onConfirmClick: Function;
  confirmText: string;
}

class SeedSelectCardState {
  cultivarName: string;
}

function mapStateToProps({ homestead, cardState, recordBook }) {
  return { homestead, cardState, recordBook }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({
    setCard
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)
  (SeedSelectCard);
