import React, { Component, PropTypes } from 'react';

import Checkbox    from '../../../components/checkbox/Checkbox.jsx';
import Radio       from '../../../components/radio/Radio.jsx';
import Tag         from '../../../pages/profiles/tag/Tag.jsx';

// Topbar component - represents the element with the filters
export default class TopBar extends Component {

  handleFiltersChanged(chosenFilters){
    this.props.handleFiltersChanged(chosenFilters);
  }

  handleCheckbox(name, label) {
    let chosenFilters = this.props.chosenFilters;

    if(!chosenFilters[name])
      chosenFilters[name] = [];

    if (chosenFilters[name].indexOf(label) != -1) {
      chosenFilters[name] = chosenFilters[name].filter(item => item !== label);
    } else {
      chosenFilters[name].push(label);
    }

    this.handleFiltersChanged(chosenFilters);
  }

  handleRadio(name, label){
    let chosenFilters = this.props.chosenFilters;

    if(!chosenFilters[name])
      chosenFilters[name] = [];

    if(chosenFilters[name] && chosenFilters[name].indexOf(label) == -1){
      chosenFilters[name] = [];
      chosenFilters[name].push(label);
    }

    this.handleFiltersChanged(chosenFilters);
  }

  handleRemoveTag(name, label){
    let chosenFilters = this.props.chosenFilters;

    if(!chosenFilters[name])
      chosenFilters[name] = [];

    chosenFilters[name] = chosenFilters[name].filter(item => item !== label);

    this.handleFiltersChanged(chosenFilters);
  }

  renderFilters(){
    let filtersHTML = [];
    for(let i in this.props.filters){
      let filter = this.props.filters[i];
      let componentHTML;
      if(filter.type == 'checkbox')
        componentHTML = this.renderCheckboxes(filter.name, filter.values);
      else if(filter.type == 'radio')
        componentHTML = this.renderRadios(filter.name, filter.values);
      let filterHTML = (
          <div className="dropdown" key={filter.name}>
            <button className="btn btn-filter dropdown-toggle col-xs-12 col-sm-12" type="button" data-toggle="dropdown">{filter.label}&nbsp;
            <span className="caret"></span></button>
            <ul className="dropdown-menu">
              {componentHTML}
            </ul>
          </div>
      );
      filtersHTML = filtersHTML.concat(filterHTML);
    }
    return filtersHTML;
  }

  renderRadios(name, values) {
    return values.map((label) => (
      <Radio label={label} key={label} check={this.props.chosenFilters[name] && this.props.chosenFilters[name].indexOf(label) != -1} name={name} handleRadioChange={this.handleRadio.bind(this)} />
    ));
  }

  renderCheckboxes(name, values) {
    return values.map((label) => (
      <Checkbox label={label} key={label} check={this.props.chosenFilters[name] && this.props.chosenFilters[name].indexOf(label) != -1} name={name} handleCheckboxChange={this.handleCheckbox.bind(this)} />
    ));
  }

  renderHTMLTags(){
    //clone
    let tagsHTML = [];
    for(let chosenFilter in this.props.chosenFilters){
      var tags = this.props.chosenFilters[chosenFilter].map((label) => (
        <Tag label={label} key={label} name={chosenFilter} handleRemoveTag={this.handleRemoveTag.bind(this)} />
      ));
      tagsHTML = tagsHTML.concat(tags);
    }
    return tagsHTML;
  }

  render(){
    return (
      <nav id="top-bar" className="navbar blur">
          <form id="form-filter">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#filters-collapse" aria-expanded="false">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>
            <div className="navbar-collapse collapse" id="filters-collapse" aria-expanded="false" >
              <ul className="nav navbar-nav">
                {this.renderFilters()}
              </ul>
            </div>
            <div className="section-body collapse in" aria-expanded="true">
              <div className="tags-container">
                <ul id="filter-tags" className=" tag-list-input">
                  {this.renderHTMLTags()}
                </ul>
              </div>
            </div>
          </form>
      </nav>
    );
  }
}

TopBar.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  chosenFilters: React.PropTypes.object.isRequired,
  filters: React.PropTypes.array.isRequired,
};
