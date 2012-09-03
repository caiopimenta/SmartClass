// app.js
define(['jquery', 'backbone', 'router'], function($, Backbone, Router){
	Backbone.View.prototype.close = function () {
	    if (this.beforeClose) {
	        this.beforeClose();
	    }
	    //this.onClose();
	    this.undelegateEvents();
	    $(this).empty;
	};
	
    return {
        initialize: function(){
        	Router.initialize();
            // you can use $ and Backbone here with
            // dependencies loaded i.e. Underscore
        }
    };
});