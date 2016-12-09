import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
//import { Router, Route, hashHistory } from 'react-router'

import App from '../imports/ui/pages/profiles/index/App.jsx';

Meteor.startup(() => {

  Router.route('/', function () {
      this.redirect('/profiles');
  });

  Router.route('/profiles', function () {
      this.redirect('/profiles/0');
  });

  Router.route('/profiles/:page', function () {
      render(<App page={this.params.page} params={this.params.query} />, document.getElementById('render-target'));
  });
});
