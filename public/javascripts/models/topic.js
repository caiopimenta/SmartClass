define(['backbone'], function(Backbone){
	
	var defaultsModel = {

	};
	
	var TopicModel = Backbone.Model.extend({
		defaults: defaultsModel,
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
	
	return TopicModel;
});