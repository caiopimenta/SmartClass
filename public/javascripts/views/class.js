define(['jquery', 
        'backbone', 
        'collections/topics',
        'models/topic',
        'models/class',
], function($, Backbone, TopicsCollection, TopicModel, ClassModel) {
        
        
        var ClassView = Backbone.View.extend({
            el: $('#main-content'),

            classTemplate: _.template($("#template-class").html()),

            initialize: function(classID) {
               _.bindAll(this, 'render');
               _.bindAll(this, 'dataSuccessCallback');
               var self = this;


               self.classID = classID;

               self.classModel = new ClassModel({
                    url: "api/classes/"+self.classID
               });

               self.topicsCollection = new TopicsCollection({
                    url: "api/topics/"+self.classID
               });

               $.when(self.classModel.fetch(), self.topicsCollection.fetch()).then(self.dataSuccessCallback, self.fetchError.error);
            },

            dataSuccessCallback: function(classes, topics) { 
                var self = this;
                //console.info(medias[2].getResponseHeader("mediasCount"));
                // self.mediasCount = medias[2].getResponseHeader("mediasCount");
                // self.nPages = Math.round(self.mediasCount / self.itensPerPage);
                $('#main-container div.box-loader').addClass('hidden');
                // console.info(classes);
                // console.info(topics);
                self.render();

            },

            fetchError : function(){
                var self = this;
                $('#main-container div.box-loader').addClass('hidden');
                $('#service-down, #main-container div.error-message').removeClass('hidden');
                $("#main-container div.warning-message").addClass("hidden").hide();
                console.info("error");
            },

            render: function() {
                var self = this;
                var data = self.classModel.toJSON();

                $(this.el).html(self.classTemplate(data));
                self.embedPlayer();

                self.renderTopic(self.topicsCollection.models[1]);
                return this;
            },

            renderTopic: function(topic){
                var self = this;
                topic.set('time', self.getTimer(topic.get('time')));
                var type = topic.get('type');
                var template = _.template($("#template-timeline-" + type).html());
                
                $(this.el).after(template(topic.toJSON()));


            },

            embedPlayer: function(){
                var self = this;
                
                var box = document.getElementById('box-video');
                var playerEmbed = document.createElement('script');
                playerEmbed.setAttribute('src', self.classModel.get('embed'));
                box.appendChild(playerEmbed);
            },

            getTimer: function(value){
                milliSecs = value;

                msSecs = (1000);
                msMins = (msSecs * 60);
                msHours = (msMins * 60);
                numHours = Math.floor(milliSecs/msHours);
                numMins = Math.floor((milliSecs - (numHours * msHours)) / msMins);
                numSecs = Math.floor((milliSecs - (numHours * msHours) - (numMins * msMins))/ msSecs);


                if (numSecs < 10){
                  numSecs = "0" + numSecs.toString();
                }
                if (numMins < 10){
                  numMins = "0" + numMins.toString();
                }
                if (numHours < 10){
                  numHours = "0" + numHours.toString();
                }

                resultString = (numHours > 0) ? numHours + ":" + numMins + ":" + numSecs : numMins + ":" + numSecs ;

                return resultString;
            }
        }); 
        
    
        return ClassView;
});