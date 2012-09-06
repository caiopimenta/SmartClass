define(['backbone'], function(Backbone){
	
	var defaultsModel = {

	};
	
	var PlayerModel = Backbone.Model.extend({
		defaults: defaultsModel,

		initialize: function(properties) {
			this.view = properties.view;
	    },

	    player: '',

	    check: false,

	    topics: undefined,

	    playerFn: function(id, name, params) {
	    	// alert('id: '+id+', name: '+name+',params: '+params);
	    	switch(name) { 
			 	case 'onPlayerReady': 
			 		this.player = document.getElementById(id); 
			 		break; 
			 	case 'onPause':
			 		this.check = false;
			 		break;
			 	case 'onPlay':
			 		this.check = true;
			 		this.checkPlayer();
			 		break;
			 	default: 
			 		//console.info(name); 
			 		break; 
			} 
	    },

	    playerMethods: function(fn, i, get) { 
			var i = i || ''; 
			
			if(get) { 
				alert(this.player[fn]()); 
			} else if(i) { 
				this.player[fn](i); 
			} else { 
				this.player[fn](); 
			} 
		}, 

		checkPlayer: function() {
			var self = this;
			this.timeout = setTimeout(function() { 
				//console.info(self.player.getCurrentTime());
				var pct = self.player.getCurrentTime();
				var view = self.view;

				for(var i = 0; i < view.topics.length; i++) {
					if(view.topics[i]/1000 == pct){ 
						view.renderTopic(i);
					}
				}

				if(self.check != false) self.checkPlayer();
			}, 1000); 
		},

		pause: function() {
			this.player.doPause();
		},

		play: function() {
			this.player.doPlay();
		},

		seek: function(seconds) {
			this.player.setTimeToSeek(seconds);
		}
	});
	
	return PlayerModel;
});
