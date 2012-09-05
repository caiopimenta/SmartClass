define(['backbone'], function(Backbone){
	
	var defaultsClassModel = {

	};
	
	var ClassModel = Backbone.Model.extend({
		defaults: defaultsClassModel,
		initialize: function(properties){
			if(properties)
				this.url = properties.url;
	    },
		fetch: function() {
			this.trigger("fetch", this);
			this.xhr = Backbone.Model.prototype.fetch.apply( this, arguments );
			return this.xhr;
		},
	    abortFetch: function() {
	    	this.xhr.abort();
	    }
	});
	
	return ClassModel;
});