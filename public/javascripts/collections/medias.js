define(['backbone', 'models/media'], function(Backbone, Media){
	var MediasCollection = Backbone.Collection.extend({
		model: Media,
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
	
	return MediasCollection;
});