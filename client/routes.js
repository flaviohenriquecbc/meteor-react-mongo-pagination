import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '../imports/ui/pages/profiles/index/App.jsx';

Meteor.startup(() => {

  //redirects all the traffic to the profile page
  Router.route('/', function () {
      this.redirect('/profiles/0');
  });

  //redirects all the traffic to the first page of the profiles
  Router.route('/profiles', function () {
      this.redirect('/profiles/0');
  });

  //get the profiles
  Router.route('/profiles/:page', function () {
      render(<App page={this.params.page} params={this.params.query} />, document.getElementById('render-target'));
  });
});
