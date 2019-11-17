import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clearHarvestResult } from '../../actions/field';
import { utils } from '../../models/utils';

import Field from '../../models/field';

class HarvestResultFieldCard extends Component {
  props: HarvestResultFieldCardProps;

  constructor(props: HarvestResultFieldCardProps) {
    super(props);
    this.okClick = this.okClick.bind(this);
  }

  okClick() {
    this.props.clearHarvestResult(this.props.fields[this.props.fieldId]);
  }

  render() {
    let harvestResult = this.props.fields[this.props.fieldId].harvestResult;
    return (
      <div className="game-card field-card">
        <div className="harvest-body">
          <div className="harvest-comment">
            {harvestResult.comment}
          </div>
          <div>
            <div className="harvest-description-label">
              {'Base value:'}
            </div>
            <div className="harvest-description-value">
              {utils.formatMoney(harvestResult.baseValue)}
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
                    {harvestResult.descriptions[prop].result}
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
              {utils.formatMoney(harvestResult.value)}
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

interface HarvestResultFieldCardProps {
  fields: { [id: number] : Field };
  fieldId: number;

  clearHarvestResult: (field: Field) => any;
}

function mapStateToProps({ fields }) {
  return { fields }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators({ clearHarvestResult }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HarvestResultFieldCard);
