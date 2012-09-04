define(['backbone', 'models/class'], function(Backbone, Class){
	var ClassCollection = Backbone.Collection.extend({
		model: Class,
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
	
	return ClassCollection;
});