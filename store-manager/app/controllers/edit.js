import Ember from 'ember';

export default Ember.Controller.extend({
    store: Ember.inject.service(),

    creating: false,

    cfName: "",

    cfLocation: "",

    cfType: "",

    addingEndpoint: false,

    epLocation: "",

    epDescription: "",

    addingVersion: false,

    verName: "",

    verTag: "",

    verDescription: "",

    actions: {
	startAddingVersion: function()
	{
	    this.set("addingVersion", true);
	},
	addVersion: function(microService)
	{
	    this.set("addingVersion", false);
	    var versions = Ember.get(microService, 'versions');
	    var version = this.get('store').createRecord('version', {
		"name": this.get('verName'),
		"tag": this.get('verTag'),
		"description": this.get('verDescription')
	    });
	    version.save().then(function(res)
				{
				    versions.pushObject(version);
				    microService.save();
				});
	    this.set('verName', "");
	    this.set('verTag', "");
	    this.set('verDescription', "");
	},
	cancelAddVersion: function()
	{
	    this.set("addingVersion", false);
	},	    
	startAddEndpoint: function()
	{
	    this.set("addingEndpoint", true);
	},
	addEndpoint: function(microService)
	{
	    this.set("addingEndpoint", false);
	    var endpoints = Ember.get(microService, 'endpoints');
	    var endpoint = this.get('store').createRecord('endpoint', {
		"location": this.get('epLocation'),
		"description": this.get('epDescription')
	    });
	    endpoint.save().then(function(res)
				 {
				     endpoints.pushObject(endpoint);
				     microService.save();
				 });

	    this.set('epDescription', "");
	    this.set('epLocation', "");
	},
	cancelAddEndpoint: function()
	{
	    this.set("addingEndpoint", false);
	},
	startAddConfigFile: function()
	{
	    this.set("creating", true);
	},

	addConfigFile: function(microService)
	{
	    this.set("creating", false);
	    var configFiles = Ember.get(microService, "configFiles");
	    var configFile = this.get('store').createRecord('configFile', {
		"name": this.get("cfName"),
		"location": this.get("cfLocation"),
		"type": this.get("cfType")});
	    configFile.save().then(function(res)
				   {
				       configFiles.pushObject(configFile);
				       microService.save();
				   });
	    this.set("cfName", "");
	    this.set("cfLocation", "");
	    this.set("cfType", "");
	},

	cancelAddConfigFile: function() {
	    this.set("creating", false);
	    Ember.Logger.log("cancelling creation");
	},
	
	create: function(microService) {
	    microService.save();
	
	return;
		
	},

	deleteVersion: function(version, microService)
	{
	    var model = this.model;
	    model.get('versions').removeObject(version);
	    model.save().then(function(res)
			      {
				  //version.destroyRecord();
			      }
			     );
	},

	deleteEndpoint: function(endpoint, microService)
	{
	    var model = this.model;
	    model.get('endpoints').removeObject(endpoint);
	    model.save().then(function(res)
			      {
				  //endpoint.destroyRecord();
			      }
			     );
	},

	deleteConfigFile: function(config, microService)
	{
	    var model = this.model;
	    model.get('configFiles').removeObject(config);
	    model.save().then(function(res)
			      {
				  //config.destroyRecord();
			      }
			     );
	}
    }
});
