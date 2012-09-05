define(['jquery', 
        'backbone', 
        'collections/topics',
        'models/topic',
        'models/class',
        'models/player',
], function($, Backbone, TopicsCollection, TopicModel, ClassModel, PlayerModel) {
        
        var TopicView = Backbone.View.extend({
            
            tagName: "article",

            className: "span5 topic alert-block",

            initialize: function(params) {
                //this.updateData(); 
                _.bindAll(this, 'answerValidation');               
            },

            events: {
                'click .bt-answer'          :   'answerValidation',
                'click .bt-continue'        :   'nextStep',
            },

            render: function() {
                var self = this;

                var type = self.model.get('type');
                self.template = _.template($("#template-timeline-" + type).html());              
                self.model.set('time', self.getTimer(self.model.get('time')));
                $(this.el).html(self.template(self.model.toJSON()));

                if(type == "radio" || type == "check") window.playerModel.pause();

                return this;
            },
            
            answerValidation: function(e){
                e.preventDefault();

                var self = this;
                var userAnswers = _.pluck($('.form-answers').serializeArray(), 'value'); //retorna um array contendo os valores do value dos objetos        
                var correctAnswers = self.model.get('content').correct_answser; //recebe as respostas
                var validationAnswers = _.isEqual(userAnswers, correctAnswers); //compara as respostas do usuário com as corretas
                
                if(validationAnswers){ 
                    $(this.el).append("")
                    $(this.el).removeClass('alert alert-error').addClass('alert alert-success');
                    $('.bt-answer', this.el).addClass('hidden');
                    $('.bt-continue', this.el).removeClass('hidden');
                    $('input', this.el).addClass('uneditable-input').attr({'disabled':'disabled'});
                    window.playerModel.play();
                }else{
                    $(this.el).removeClass('alert alert-success').addClass('alert alert-error');
                }
                

            },

            nextStep: function(){

                console.info("next step");
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

        var ClassView = Backbone.View.extend({
            el: $('#main-content'),

            classTemplate: _.template($("#template-class").html()),

            initialize: function(classID) {
               _.bindAll(this, 'render');
               _.bindAll(this, 'dataSuccessCallback');
               _.bindAll(this, 'renderTopic');
               var self = this;

               window.playerModel = new PlayerModel({view: self});

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
                
                self.topics = _.pluck(self.topicsCollection.toJSON(), 'time');

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

                self.renderTopic(1);
                return this;
            },

            renderTopic: function(key){
                var self = this;
                var tView = new TopicView({model:self.topicsCollection.models[key]});
                $("#box-metadata").after(tView.render().el);
            },

            embedPlayer: function(){
                var self = this;
                
                var box = document.getElementById('box-video');
                var playerEmbed = document.createElement('script');
                playerEmbed.setAttribute('src', self.classModel.get('embed'));
                box.appendChild(playerEmbed);
            },

            
        }); 
        
    
        return ClassView;
});