import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SeedDescription from './seed_description';
import { setCard } from '../../actions/card';

class SeedSelectCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cultivar: 'All'
    }
  }

  componentDidMount() {
    this.selectCultivar = this.selectCultivar.bind(this);
  }

  selectCultivar(cultivarName) {
    this.setState({ cultivar: cultivarName });
  }

  render() {
    let storehouse = this.props.storehouseState.storehouse;
    let cultivarNames = ['All'];
    storehouse.getCultivarNames().map((cultivarName) => {
      cultivarNames.push(cultivarName);
    });
    let cultivarSeeds = [];
    let cultivarLabel = '';
    if (this.state.cultivar != 'All') {
      cultivarSeeds = storehouse.seeds
        .getAllMatching('cultivarName', this.state.cultivar);
      cultivarLabel = (this.state.cultivar + ' ('
        + storehouse.getCultivarCount(this.state.cultivar)
        + '/' + storehouse.maxSeeds + ')');
    }
    else {
      cultivarSeeds = storehouse.seeds.getAll();
      cultivarLabel = ('All (' + storehouse.seeds.getLength()  + ')');
    }

    return (
      <div className="seed-select-container">
        <div>{ cultivarLabel }</div>
        <div className="option-container">
          {cultivarSeeds.map((seed) => {
            return (
              <SeedDescription key={seed.id} seed={seed}
                spot={this.props.spot}
                onClickConfirmToParent={this.props.onClickConfirmToParent}
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

function mapStateToProps({ storehouseState }) {
  return { storehouseState }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setCard
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)
  (SeedSelectCard);
