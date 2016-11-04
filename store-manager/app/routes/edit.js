import Ember from 'ember';

export default Ember.Route.extend({
    microService: {},
    
    model: function(params) {
	var prom;
	prom = this.get('store').find('micro-service', params.ms_id);
	prom.then((function(_this) {
	    return function(res) {
		return _this.set("microService", res);
	    };
	})(this));
	return prom;
    }
});
