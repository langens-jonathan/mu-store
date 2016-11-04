import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
	new: function() {
	    this.transitionToRoute('new');
	},
	edit: function(m) {
	    this.transitionToRoute('edit', m.id);
	},
	delete: function(m) {
	    var microServiceProm = this.get('store').find('micro-service', m.id);
	    microServiceProm.then(function(microService)
				  {
				      microService.deleteRecord();
				      microService.save();
				  });
	}
    }
});
