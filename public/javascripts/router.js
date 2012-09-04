/*Teste new router*/

// Filename: router.js
define(['jquery', 'backbone', 'backbone-queryparams'],function($, Backbone){

  var AppRouter = Backbone.Router.extend({
	initialize: function(options) {
		// setando a marcação do undercore para se comportar como a do mustache
		  _.templateSettings = {
		      evaluate : /\{\[([\s\S]+?)\]\}/g,
		      interpolate : /\{\{([\s\S]+?)\}\}/g
		  };	  

	},  
    routes: {
      // Define some URL routes
      'class/:query' : 'class',
  

      // Default
      '*actions': 'defaultAction'
    },
    class: function(query) {
      var self = this;
      var classID = query;

      if(!query) {
    	  self.defaultAction();
    	  return false;
      }
      
      if(this.currentView)
    	  this.currentView.close();
      
      require(['views/class'], function(ClassView){
    	  var ClassView = new ClassView(classID);
    	  self.currentView = ClassView;
      });
    },
    defaultAction: function(){
      var self = this;

      if(this.currentView)
            this.currentView.close();
      $('#main').html("<h2>Rota não existente</h2>");
      // We have no matching route, lets just log what the URL was
    },    
  });

  

  var initialize = function(){
    window.app_router = new AppRouter();
    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});