import React, { Component, PropTypes } from 'react';

export default class CheckBox extends Component {

  handleCheckbox() {
    this.props.handleCheckboxChange(this.props.name, this.props.label);
  }

  render() {
    return (
      <li>
        <label>
          <input  type="checkbox"
                  checked={this.props.check}
                  name={this.props.label}
                  value={this.props.label}
                  onChange={this.handleCheckbox.bind(this)} />
          &nbsp;{this.props.label}
        </label>
      </li>
    );
  }
}
