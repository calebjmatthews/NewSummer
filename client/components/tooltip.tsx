import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fontAwesome } from '../instances/font_awesome';

import SeedDescription from '../models/seed/seed_description';

export default class Tooltip extends Component {
  props: TooltipProps;
  state: TooltipState;

  constructor(props: TooltipProps) {
    super(props);
    this.state = { classNameString: 'tooltip', currentMouseTimeout: null,
      currentFadeTimeout: null }

    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
  }

  onMouseOver(ev: any) {
    if (this.state.currentMouseTimeout != null) {
      clearTimeout(this.state.currentMouseTimeout);
    }
    this.setState({ currentMouseTimeout: setTimeout(() => this.makeAppear(), 10) });
  }

  makeAppear() {
    if (this.state.currentFadeTimeout != null) {
      clearTimeout(this.state.currentFadeTimeout);
    }
    this.setState({ classNameString: 'tooltip invisible' });
    this.setState({ currentFadeTimeout: setTimeout(() =>
      this.setState({ classNameString: 'tooltip visible' }), 10) });
    ;
  }

  onMouseOut(ev: any) {
    if (this.state.currentMouseTimeout != null) {
      clearTimeout(this.state.currentMouseTimeout);
    }
    this.setState({ currentMouseTimeout: setTimeout(() => this.makeFade(), 10) });
  }

  makeFade() {
    if (this.state.currentFadeTimeout != null) {
      clearTimeout(this.state.currentFadeTimeout);
    }
    this.setState({ classNameString: 'tooltip invisible' });
    this.setState({ currentFadeTimeout: setTimeout(() =>
      this.setState({ classNameString: 'tooltip' }), 400) });
    ;
  }

  render() {
    return (
      <div ref="tooltipparent" onMouseOver={(ev) => this.onMouseOver(ev)}
        onMouseOut={(ev) => this.onMouseOut(ev)}>
        {this.props.parentElement}
        <div className={this.state.classNameString}>
          <div className="seed-icon-large" style={this.props.iconStyle}>
            <FontAwesomeIcon icon={fontAwesome.get(this.props.description.icon)} />
          </div>
          <span>
            {this.props.description.title + ' : ' + this.props.description.description}
          </span>
        </div>
      </div>
    );
  }
}

interface TooltipProps {
  iconStyle: any;
  description: SeedDescription;
  parentElement: any;
}

interface TooltipState {
  classNameString: string;
  currentMouseTimeout: NodeJS.Timeout;
  currentFadeTimeout: NodeJS.Timeout;
}
