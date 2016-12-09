import React, { Component, PropTypes } from 'react';

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
