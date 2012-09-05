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
                return this;
            },

            embedPlayer: function(){
                var self = this;
                
                var box = document.getElementById('box-video');
                var playerEmbed = document.createElement('script');
                playerEmbed.setAttribute('src', self.classModel.get('embed'));
                box.appendChild(playerEmbed);
            }
        }); 
        
    
        return ClassView;
});