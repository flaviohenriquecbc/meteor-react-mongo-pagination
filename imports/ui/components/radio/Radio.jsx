import React, { Component, PropTypes } from 'react';

// Radio component - represents a checkbox
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

Radio.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  check: React.PropTypes.bool.isRequired,
  name: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
};
