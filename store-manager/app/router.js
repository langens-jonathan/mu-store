import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('microServices', function() {
  });

  this.route('new', function() {
  });
    this.route('edit', { path: 'edit/:ms_id' } );
});

export default Router;
