define(['jquery', 
        'backbone', 
        'collections/medias',
        'models/media',
        'text!templates/medias/medias-list.html',
        'text!templates/medias/media-item.html',
        'models/channel',
        'collections/channels',
        'text!templates/medias/channels-list.html',
        'bootstrap-transition',
        'bootstrap-dropdown',
        'bootstrap-tooltip',
        'jquery-ui',
        'jquery-scrollbar',
        'jquery-mousewheel'
], function($, Backbone, MediasCollection, MediaModel, MediaListTemplate, MediaItemTemplate, ChannelModel, ChannelsCollection, ChannelsTemplate) {
        
        var ChannelsListView = Backbone.View.extend({
            initialize: function(params) {
                //this.updateData();                
            },
            render: function() {
                var self = this;
                $(this.el).html( _.template(ChannelsTemplate, {itens: this.collection.toJSON()}));                 
                return this;
            },
        });

	    var MediaView = Backbone.View.extend({

            tagName: "li",

            initialize: function(params) {
                
            },

            events: {
                'click .bt-edit'        :   'showEdit',
                'click .bt-activate'    :   'active',
                'click .bt-embed'       :   'getEmbed',
                'click .bt-preview'     :   'preview',
                'click .bt-delete'      :   'remove'
            },

            updateData: function (){
                var self = this;
                var duration = (this.model.get("files")[0].fileInfo.duration) ? self.getTimer(this.model.get("files")[0].fileInfo.duration) : undefined;

                this.model.set({
                    "duration" : duration
                });
            },
   
            render: function() {
                this.updateData();
                //  console.info("sucesso do render");  
                //$(this.el).html("teste");
                $(this.el).html( _.template(MediaItemTemplate, this.model.toJSON()));
                return this;

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
            },

            showEdit: function () {console.info("clicou em editar")},

            active: function () {console.info("clicou em ativar")},

            getEmbed: function () {console.info("clicou em embed")},

            preview: function () {console.info("clicou em preview")},

                remove: function () {console.info("clicou em remover")},
        });

        var MediasListView = Backbone.View.extend({
            el: $("#main-content"),

            initialize: function (params) {
                
                //console.info("start view"); 
                var self = this;
                var clientId = self.clientId = params.cid || 1;
                var projectId = self.projectId = params.pid || 1;
                var itensPerPage = self.itensPerPage = params.ipp  || 25;
                var currentPage = self.currentPage = params.start || 0;

                var compiledTemplate = _.template(MediaListTemplate, {numberOfPages: undefined});
                self.$el.html(compiledTemplate);

                this.collection = new MediasCollection({
                    //url: "/test/medias/mock-medias.json" //mock
                    url: "/medias?prj_id="+projectId+"&start="+currentPage+"&limit="+itensPerPage+"&cli_id="+clientId
                });

                var channelsCollection = self.channelsCollection = new ChannelsCollection({
                    url: "/test/medias/mock-channels.json" //mock
                    //url: "/medias?prj_id="+projectId+"&start="+currentPage+"&limit="+itensPerPage+"&cli_id="+clientId

                });

                $.when(this.collection.fetch(), channelsCollection.fetch()).then(function(medias, channels) {  
                    //console.info(medias[2].getResponseHeader("mediasCount"));
                    self.mediasCount = medias[2].getResponseHeader("mediasCount");
                    self.nPages = Math.round(self.mediasCount / self.itensPerPage);
                    self.render();
                    //console.info("canais: "+self.channelsCollection);

                }, function(){
                    //$('#main-content div.box-loader').addClass('hidden');
                    //$('#service-down, #main-content div.error-message').removeClass('hidden');
                    //$("#main-content div.warning-message").addClass("hidden").hide();
                    console.info("error");
                });

                // _.bindAll(this, 'render');
                // this.collection.bind('reset', this.render);
                // this.collection.bind('add', this.render);
                // this.collection.bind('remove', this.render);
                // this.collection.bind('change', this.render);
            },
            renderItem: function (item) {
                
                var mView = new MediaView({model:item});
                $('#medias-list').append(mView.render().el);
                $("[rel=tooltip]").tooltip();
            },
            render: function () {
                var self = this;
                // console.info("n pages" + this.nPages);
                var compiledTemplate = _.template(MediaListTemplate, {numberOfPages: this.nPages, currentPage: this.currentPage});
                this.$el.html(compiledTemplate);

                $('#medias-list').empty();                
                this.collection.each(this.renderItem);

                var channelsList = new ChannelsListView({collection:self.channelsCollection});
                $('#sidebar').append(channelsList.render().el);
                self.startScroll();
                
                return this;
            },

            startScroll: function(){
                $(".jScrollbar").jScrollbar({
                  allowMouseWheel : true,
                  scrollStep : 1,
                  showOnHover : true,
                  position : 'right',
                  marginPos : 0
                });
            }
        });
        
    
        return MediasListView;
});