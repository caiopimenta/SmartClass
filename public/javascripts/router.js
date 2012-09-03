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
      'report/realtime': 'realTime',
      'report/period'  : 'period',
      'medias/medias-list'  : 'mediasList',

      // Default
      '*actions': 'defaultAction'
    },
    realTime: function(params) {
      var self = this;
      self.loadCss("/stylesheets/libs/960grid/reset.css");
      self.loadCss("/stylesheets/libs/960grid/text.css");
      self.loadCss("/stylesheets/libs/960grid/grid.css");
      self.loadCss("/stylesheets/libs/jquery-ui/jquery-ui-1.8.16.custom.css");
      self.loadCss("/stylesheets/libs/jqplot/jquery.jqplot.css");
      self.loadCss("/stylesheets/modules/main/screen.css");

      if(!params) {
    	  self.defaultAction();
    	  return false;
      }
      
      if(this.currentView)
    	  this.currentView.close();
      
      require(['views/report/realtime'], function(RealTimeView){
    	  var realTimeView = new RealTimeView(params);
    	  self.currentView = realTimeView;
      });
    },
    period: function(params) {
    	var self = this;

	      self.loadCss("/stylesheets/libs/960grid/reset.css");
	      self.loadCss("/stylesheets/libs/960grid/text.css");
	      self.loadCss("/stylesheets/libs/960grid/grid.css");
	      self.loadCss("/stylesheets/libs/jquery-ui/jquery-ui-1.8.16.custom.css");
	      self.loadCss("/stylesheets/libs/jqplot/jquery.jqplot.css");
	      self.loadCss("/stylesheets/modules/main/screen.css");


    	if(!params) {
    		 self.defaultAction();
       	  return false;
    	}
    	
    	if(this.currentView)
      	  this.currentView.close();
    	
    	require(['views/report/period'], function(PeriodView){
      	  var periodView = new PeriodView(params);
      	  self.currentView = periodView;
        });
    },
    
    mediasList: function(params){
      var self = this;
      self.loadCss("/stylesheets/modules/page-medias.css");

      if(!params) {
         self.defaultAction();
         return false;
      }
      
      if(this.currentView)
          this.currentView.close();

      require(['views/medias/medias-list'], function(MediasView){
        var mediasView = new MediasView(params);
        self.currentView = mediasView;
      });
    },

    defaultAction: function(){
      var self = this;
      self.loadCss("/stylesheets/libs/960grid/reset.css");
      self.loadCss("/stylesheets/libs/960grid/text.css");
      self.loadCss("/stylesheets/libs/960grid/grid.css");
      self.loadCss("/stylesheets/libs/jquery-ui/jquery-ui-1.8.16.custom.css");
      self.loadCss("/stylesheets/libs/jqplot/jquery.jqplot.css");
      self.loadCss("/stylesheets/modules/main/screen.css");

      if(this.currentView)
            this.currentView.close();
      $('#main-content').html("<h2>Rota não existente</h2>");
      // We have no matching route, lets just log what the URL was
    },

    
    loadCss : function (url, type) {
      var link = document.createElement("link");
      link.type = "text/css";
      link.rel = (type == "less") ? "stylesheet/less" : "stylesheet";
      link.href = url;
      document.getElementsByTagName("head")[0].appendChild(link);
    }
  });

  

  var initialize = function(){
    window.app_router = new AppRouter();
    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});