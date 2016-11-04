import Ember from 'ember';

export default Ember.Controller.extend({
    store: Ember.inject.service(),

    title: "the title of the microservice",

    description: "here is where the short description for your microservice goes",

    dockerName: "the name of the docker",

    documentation: "",

    imageLocation: "",

    configureCommand: "",

    configFiles: [],

    endpoints: [],

    versions: [],

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
	addVersion: function()
	{
	    this.set("addingVersion", false);
	    var versions = this.get('versions');
	    versions.pushObject({
		"name": this.get('verName'),
		"tag": this.get('verTag'),
		"description": this.get('verDescription')
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
	addEndpoint: function()
	{
	    this.set("addingEndpoint", false);
	    var endpoints = this.get('endpoints');
	    endpoints.pushObject({
		"location": this.get('epLocation'),
		"description": this.get('epDescription')
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
	    Ember.Logger.log("we would start adding a config file");
	},

	addConfigFile: function()
	{
	    this.set("creating", false);
	    var configFiles = this.get("configFiles");
	    configFiles.pushObject({
		"name": this.get("cfName"),
		"location": this.get("cfLocation"),
		"type": this.get("cfType")});

	    this.set("cfName", "");
	    this.set("cfLocation", "");
	    this.set("cfType", "");
	    Ember.Logger.log("creating the config file");
	},

	cancelAddConfigFile: function() {
	    this.set("creating", false);
	    Ember.Logger.log("cancelling creation");
	},
	
	create: function() {
	    // var ms = this.get('store').createRecord('microService', {
	    // 	"title": this.get("title"),
	    // 	"description": this.get("description"),
	    // 	"dockerName": this.get("dockerName"),
	    // 	"imageLocation": this.get("imageLocation"),
	    // 	"configureCommand": this.get("configureCommand")
	    // });
	    // ms.save().then(function(mod) {
	    // 	Ember.Logger.log("CREATED");
	    // 	Ember.Logger.log(mod);
	    // });
	    
	    // Ember.Logger.log("you would create a new MS in the store!!");


	    //%%%%%%%%%%%%%%%%%%%%INSERTED

	    var ms = this.get('store').createRecord('microService', {
		'title': this.get('title'),
		'description': this.get('description'),
		'dockerName': this.get('dockerName'),
		'imageLocation': this.get('imageLocation'),
		'configureCommand': this.get('configureCommand'),
		'documentation': this.get('documentation')
	    });
	    
	    ms.save().then((function(_this) {
		return function(mod) {
		    _this.get('configFiles').forEach(function(item, index) {
			var configFile = _this.get('store').createRecord('configFile', {
			    'name': Ember.get(item, 'name'),
			    'location': Ember.get(item, 'location'),
			    'type': Ember.get(item, 'type')
			});
			
			mod.get('configFiles').pushObject(configFile);

			configFile.save().then(function(result) {
			    mod.save();
			});
		    });
		    

			
		    _this.get('endpoints').forEach(function(item, index) {
			var endpoint = _this.get('store').createRecord('endpoint', {
			    'location': Ember.get(item, 'location'),
			    'description': Ember.get(item, 'description')
			});
			
			mod.get('endpoints').pushObject(endpoint);

			endpoint.save().then(function(result) {
			    mod.save();
			});
		    });
		    

			
		    _this.get('versions').forEach(function(item, index) {
			var version = _this.get('store').createRecord('version', {
			    'name': Ember.get(item, 'name'),
			    'tag': Ember.get(item, 'tag'),
			    'description': Ember.get(item, 'description')
			});
			
			mod.get('versions').pushObject(version);

			version.save().then(function(result) {
			    mod.save();
			});
		    });
		};
	    })(this));
	
	Ember.Logger.log('you would create a new MS in the store!!');
	
	return;
	
	
	
	//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	
	
	}
    }
});
