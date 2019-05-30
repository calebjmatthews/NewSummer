import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { addSeed } from '../../actions/storehouse';
import { gatherSeedFromEvent } from '../../actions/field';

class EventFieldCard extends Component {
  componentDidMount() {
    this.seedGather = this.seedGather.bind(this);
  }

  seedGather(seed) {
    this.props.addSeed(this.props.storehouseState.storehouse,
      this.props.recordBookState.recordBook, seed);
    this.props.gatherSeedFromEvent(this.props.fieldsState.fields,
      this.props.field.id, seed);
  }

  render() {
    let seeds = [];
    let text = '';
    if (this.props.field.currentEvent != null) {
      if (this.props.field.currentEvent.seeds != undefined) {
        seeds = this.props.field.currentEvent.seeds;
      }
      text = this.props.field.currentEvent.text
    }

    return (
      <div className="game-card field-card" style={this.props.transStyle}>
        { text }
        <div className="option-container">
          { seeds.map((seed) => {
            let optionClassName = "seed-option";
            if (this.props.field.currentEvent.gatheredDict[seed.id] == true) {
              optionClassName = "seed-option inactive";
            }
            return (
              <div className={optionClassName} key={seed.id}
                onClick={ () => this.seedGather(seed) }>
                <div>
                  <FontAwesomeIcon icon={'spa'} />
                </div>
                <div>
                  { seed.name }
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ fieldsState, storehouseState, recordBookState }) {
  return { fieldsState, storehouseState, recordBookState }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addSeed, gatherSeedFromEvent
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)
  (EventFieldCard);
