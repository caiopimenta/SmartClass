define(['backbone', 'models/topic'], function(Backbone, Topic){
	var TopicsCollection = Backbone.Collection.extend({
		model: Topic,
		initialize: function(properties){
			if(properties)
				this.url = properties.url;
	    },
		fetch: function() {
			this.trigger("fetch", this);
			this.xhr = Backbone.Collection.prototype.fetch.apply( this, arguments );
			return this.xhr;
		},
	    abortFetch: function() {
	    	this.xhr.abort();
	    }
	});
	
	return TopicsCollection;
});