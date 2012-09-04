define(['jquery', 
        'backbone', 
        'collections/class',
        'models/class',
        'models/topic',
], function($, Backbone, ClassCollection, ClassModel, TopicModel) {
        
        
        var ClassView = Backbone.View.extend({
            
            template: $("#template-class"),

            initialize: function(classID) {
               var self = this;

               self.classID = classID;

               self.metadataModel = new TopicModel({
                    url: "api/topics/"+self.classID
               });

               self.classCollection = new ClassCollection({
                    url: "api/classes/"+self.classID
               });

               $.when(self.metadataModel.fetch(), self.classCollection.fetch()).then(self.fetchSucesss, self.fetchError.error);
            },

            fetchSucesss: function(metadata, classes) { 
                var self = this;
                //console.info(medias[2].getResponseHeader("mediasCount"));
                // self.mediasCount = medias[2].getResponseHeader("mediasCount");
                // self.nPages = Math.round(self.mediasCount / self.itensPerPage);
                // self.render();
                console.info(metadata);
                console.info(classes);

            },

            fetchError : function(){
                var self = this;
                //$('#main-content div.box-loader').addClass('hidden');
                //$('#service-down, #main-content div.error-message').removeClass('hidden');
                //$("#main-content div.warning-message").addClass("hidden").hide();
                console.info("error");
            },

            render: function() {
                var self = this;
                //$(this.el).html( _.template(ChannelsTemplate, {itens: this.collection.toJSON()}));                 
                return this;
            },
        }); 
        
    
        return ClassView;
});