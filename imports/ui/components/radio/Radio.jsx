import React, { Component, PropTypes } from 'react';

export default class Radio extends Component{

  handleRadio() {
    this.props.handleRadioChange(this.props.name, this.props.label);
  }

  render() {
    return (
      <li key={this.props.label}>
        <label>
          <input  type="radio"
                  checked={this.props.check}
                  name={this.props.name}
                  value={this.props.label}
                  onChange={this.handleRadio.bind(this)} />
              &nbsp;{this.props.label}
        </label>
      </li>
    );
  }
}
