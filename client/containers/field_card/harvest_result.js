import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clearHarvestResult } from '../../actions/field';
import { formatMoneyLong } from '../../functions/utils';

class HarvestResultFieldCard extends Component {
  componentDidMount() {
    this.okClick = this.okClick.bind(this);
  }

  okClick() {
    this.props.clearHarvestResult(this.props.fieldsState.fields,
      this.props.fieldId);
  }

  render() {
    let harvestResult = this.props.fieldsState.fields
      .getByProperty('id', this.props.fieldId).harvestResult;
    return (
      <div className="game-card field-card" style={this.props.transStyle}>
        <div className="harvest-body">
          <div className="harvest-comment">
            {harvestResult.comment}
          </div>
          <div>
            <div className="harvest-description-label">
              {'Base value:'}
            </div>
            <div className="harvest-description-value">
              {formatMoneyLong(harvestResult.baseValue)}
            </div>
            {Object.keys(harvestResult.descriptions).map((prop) => {
              return (
                <div key={prop}>
                  <div className={"harvest-description-label "
                    + harvestResult.descriptions[prop].sign}>
                    {harvestResult.descriptions[prop].message + ' : '
                      + harvestResult.descriptions[prop].value}
                  </div>
                  <div className={"harvest-description-value "
                    + harvestResult.descriptions[prop].sign}>
                    {formatMoneyLong(harvestResult.descriptions[prop].result)}
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <div className="harvest-description-value">
              {'Final value'}
            </div>
            <div className="harvest-value-final">
              {formatMoneyLong(harvestResult.value)}
            </div>
          </div>
        </div>
        <button onClick={() => this.okClick()}>
          {'OK'}
        </button>
      </div>
    );
  }
}

function mapStateToProps({ fieldsState }) {
  return { fieldsState }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ clearHarvestResult }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)
  (HarvestResultFieldCard);
