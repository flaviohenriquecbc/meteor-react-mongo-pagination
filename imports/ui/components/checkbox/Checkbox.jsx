import React, { Component, PropTypes } from 'react';

// Checkbox component - represents a checkbox
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

CheckBox.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  check: React.PropTypes.bool.isRequired,
  label: React.PropTypes.string.isRequired,
};
