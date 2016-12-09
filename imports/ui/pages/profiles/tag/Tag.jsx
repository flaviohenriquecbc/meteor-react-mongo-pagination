import React, { Component, PropTypes } from 'react';

//represents the tag on the topbar
export default class Tag extends Component{

  handleRemoveTag() {
    this.props.handleRemoveTag(this.props.name, this.props.label);
  }

  render() {
    return (
      <li key={this.props.label} className="tag">
        <span>{this.props.label}</span>
        <span className="tag-close" onClick={this.handleRemoveTag.bind(this)}>x</span>
      </li>
    );
  }
}

Tag.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  label: React.PropTypes.string.isRequired,
};
