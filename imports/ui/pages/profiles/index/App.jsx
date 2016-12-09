import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Profiles } from '../../../../api/profiles/profiles.js';

import TopBar   from '../../../pages/profiles/topbar/TopBar.jsx';
import Profile  from '../../../pages/profiles/profile/Profile.jsx';
import Pager    from '../../../components/pager/Pager.jsx';

const PROFILES_PER_PAGE   = 20;
const VISIBLE_PAGES_PAGER = 3;

// App component - represents the whole app
export default class App extends Component {

  constructor(props) {
    super(props);

    //get the next 12 months
    let startMonths = [];
    for(let i = 0; i <= 12; i++){
      startMonths.push(moment().add(i, 'months').format("MMM YYYY"));
    }

    //define values of the filters
    let filters = [{
        name: 'studyField',
        values : ['s1', 's2', 's3', 's4', 's5', 's6', 's7'],
        type: 'checkbox',
        label: 'Study Field'
    },
    {
        name: 'startMonth',
        values : startMonths,
        type: 'radio',
        label: 'Start Month'
    }];

    //init
    this.state = {
      profiles: [],
      numberOfResults: undefined,
      numberTotalOfResults: 0,
      filters: filters
    };

    Meteor.call('profiles.getTotal', (error, result) => {
        if(!error){
            this.setState({
              numberTotalOfResults: result
            })
        }
    });

    this.getProfiles(this.props.page, this.sanitize(this.props.params));
  }

  //this function gets an object and serialize it returing an url params
  objectSerializer(chosenFilters){
    //serialize the object into a list parameter (url)
    let parameters = Object.keys(chosenFilters).reduce((result, key) => {
        if(chosenFilters[key].length > 0)
          result.push(key + '=' + chosenFilters[key]);
        return result;
    }, []);
    if(parameters.length == 0)
      return '';
    else
      return '?' + parameters.join('&');
  }

  //this function removes all the filters from the url that are not valid
  sanitize(objFromUrl){
    //deserialize object
    let chosenFilters = {};
    for(let filter in this.state.filters){
      //get params from the url that is a filter (ignore non filters params)
      let param = objFromUrl[this.state.filters[filter].name]
      chosenFilters[this.state.filters[filter].name] = [];
      if(param != null){
        let possibleFiltersValue = param.split(",");
        //ignore values that are not valid values from filter
        for(let key in possibleFiltersValue){
          if(this.state.filters[filter].values.indexOf(possibleFiltersValue[key]) != -1)
            chosenFilters[this.state.filters[filter].name].push(possibleFiltersValue[key]);
        }
      }
    }
    return chosenFilters;
  }

  handleFiltersChanged(chosenFilters){
    this.goPage(0, chosenFilters);
  }

  handlePageChanged(pageNumber){
    this.goPage(pageNumber, this.sanitize(this.props.params));
  }

  componentWillUpdate(nextProps, nextState){
    let urlBefore = this.props.page + this.objectSerializer(this.props.params);
    let urlAfter = nextProps.page + this.objectSerializer(nextProps.params);
    if(urlBefore != urlAfter)
      this.getProfiles(nextProps.page, this.sanitize(nextProps.params));
  }

  goPage(pageNumber, chosenFilters){
      Router.go('/profiles/' + pageNumber + this.objectSerializer(chosenFilters));
  }

  getProfiles(page, chosenFilters){
    let skip = page * PROFILES_PER_PAGE;
    let limit = PROFILES_PER_PAGE;
    handler = Meteor.subscribe("profiles", chosenFilters, skip, limit, {
      onReady: () => {

        let profiles = Profiles.find().fetch();

        Meteor.call('profiles.getTotalFiltered', chosenFilters, (error, result) => {
            if(!error){
                this.setState({
                  numberOfResults: result
                })
            }
        });

        this.setState({
          profiles: profiles
        });

        handler.stop();
      }
    });
  }

  renderTotalResults(){
    if(this.state.numberTotalOfResults == 0){
      return (<div>No profiles to show</div>);
    }else if(this.state.numberTotalOfResults == undefined){
      return (<div>Loading...</div>);
    }else{
      return (<div>Showing {this.state.numberOfResults} from a total of {this.state.numberTotalOfResults}</div>);
    }
  }

  renderProfiles() {
    //check if the users didnt force invalid valid on the url (?page=)
    if(this.props.page > Math.ceil(this.state.numberOfResults / PROFILES_PER_PAGE)){
      return (<div className="no-result">Error: Invalid number of page</div>)
    }else if(this.state.numberOfResults == 0){
      return (<div className="no-result">No profiles to show</div>);
    }else if(this.state.numberOfResults == undefined){
      return (<div className="loading"><img src="/img/loading.gif" alt="Loading..." /></div>);
    }else{
      return this.state.profiles.map((profile) => (
        <Profile key={profile._id} profile={profile} />
      ));
    }
  }

  renderPager(){
    //check if there is enough pages and if the users didnt force invalid valid on the url (?page=)
    if(Math.ceil(this.state.numberOfResults / PROFILES_PER_PAGE) > 1
          && this.props.page <= Math.ceil(this.state.numberOfResults / PROFILES_PER_PAGE)){
      return (
              <Pager
                  total={Math.ceil(this.state.numberOfResults / PROFILES_PER_PAGE)}
                  current={parseInt(this.props.page)}
                  visiblePages={VISIBLE_PAGES_PAGER}
                  titles={{ first: '<|', last: '>|' }}
                  onPageChanged={this.handlePageChanged.bind(this)}
              />
            );
    }else{
      return (<div></div>);
    }
  }

  renderTopBar() {
    let chosenFilters = this.sanitize(this.props.params);
    return <TopBar filters={this.state.filters} chosenFilters={chosenFilters} handleFiltersChanged={this.handleFiltersChanged.bind(this)}/>
  }

  render() {
    return (
      <div id="profiles-page" className="container">
        {this.renderTopBar()}
        <div className="content blur">
          <h2 className="totalProfiles">{this.renderTotalResults()}</h2>
          <ul>
            {this.renderProfiles()}
          </ul>
          <div className="pages">
            {this.renderPager()}
          </div>
        </div>
      </div>
    );
  }
}
