import React, { Component, PropTypes } from 'react';

// Profile component - represents a single entry profile
export default class Profile extends Component {
  render() {
    return (
      <li className="timeline-item">
              <div className="item-photo col-xs-12 col-sm-2">
                <div></div>
              </div>
              <div className="col-xs-12 col-sm-10">
                <div className="item-btns">
                  <div className="item-btn-1"></div>
                  <div className="item-btn-1"></div>
                  <div className="item-name">
                    <span>{this.props.profile.name}</span>
                  </div>
                </div>
                <div className="items-others">
                  <div className="item-role"></div>
                  <div className="item-role"></div>
                  <div className="item-desc"></div>
                  <div className="item-desc-2"></div>
                  <div className="item-details">
                    <b>Study Field</b>: {this.props.profile.studyField} <b>Start Date</b>: {moment(this.props.profile.startDate).format("DD/MM/YYYY")}
                  </div>
                </div>
              </div>

      </li>
    );
  }
}

Profile.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  profile: React.PropTypes.object.isRequired,
};
