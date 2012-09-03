define(['backbone'], function(Backbone){
	
	var defaultsMediaModel = {

        "id": "a420b72c0a9ebd21d15cc2e5135cb62e",
        "status": "ACTIVE",
        "qualifier": "VIDEO",
        "title": "Nina conta o que aprendeu na escola",
        "description": "Nina conta o que aprendeu na escola",
        "channelName": "A Praça é Nossa",
        "channelId": "94",
        "postDate": "2012-07-12T16:43:06-03:00",
        "lastModified": "2012-07-12T18:01:53-03:00",
        "publishDate": "2012-07-13T00:57:00-03:00",
        "published": "true",
        "highlighted": "true",
        "restricted": "false",
        "secondUrl": "12/07/12",
        "numberOfViews": "692",
        "numberOfComments": "0",
        "numberOfRatings": "0",
        "files": [
            {
                "id": "4b23c342f61b01b3f6b263e19d6c1bf4",
                "fileName": "praca120712nina.6.mp4",
                "mimeType": "video/quicktime",
                "output": {
                    "name": "HD_BBTV"
                },
                "videoInfo": {
                    "audioChannels": "2",
                    "audioCodec": "aac",
                    "audioSampleRate": "44100",
                    "bitrate": "1082368",
                    "duration": "285000",
                    "framerate": "29.92",
                    "height": "480",
                    "videoCodec": "H264",
                    "width": "860"
                }
            },
            {
                "fileName": "praca120712nina.5.mp4",
                "id": "89f6d3cfa8d76ce81f0dbe1338052762",
                "mimeType": "video/quicktime",
                "output": {
                    "name": "360p"
                },
                "videoInfo": {
                    "audioChannels": "2",
                    "audioCodec": "aac",
                    "audioSampleRate": "44100",
                    "bitrate": "675840",
                    "duration": "285000",
                    "framerate": "29.92",
                    "height": "360",
                    "videoCodec": "H264",
                    "width": "644"
                }
            },
            {
                "fileName": "praca120712nina.6.mp4",
                "id": "7a7c792babe4ea282cc9d0deb27160b9",
                "mimeType": "video/quicktime",
                "output": {
                    "name": "_RAW"
                },
                "videoInfo": {
                    "audioChannels": "2",
                    "audioCodec": "aac",
                    "audioSampleRate": "44100",
                    "bitrate": "1082368",
                    "duration": "285000",
                    "framerate": "29.92",
                    "height": "480",
                    "videoCodec": "H264",
                    "width": "860"
                }
            },
            {
                "fileName": "praca120712nina.8.mp4",
                "id": "6cf94867ff7629930d8449a7dc94226e",
                "mimeType": "video/quicktime",
                "output": {
                    "name": "AUDIO_ONLY"
                },
                "videoInfo": {
                    "audioChannels": "1",
                    "audioCodec": "aac",
                    "audioSampleRate": "44100",
                    "bitrate": "388096",
                    "duration": "285000",
                    "framerate": "29.92",
                    "height": "300",
                    "videoCodec": "H264",
                    "width": "538"
                }
            }
        ],
        "tags": [
            "sbt",
            "12/07/12",
            "nina",
            "a praça é nossa"
        ],
        "thumbs": [
            {
                "height": "250",
                "size": "13730",
                "url": "http://webcast.sambatech.com.br/80245F/origin1/account/37/2/2012-07-12/thumbnail/d711fcdfa3cac5835eb8c029e9119f0d/praca120712nina6mp4_300x250.jpg",
                "width": "300"
            },
            {
                "height": "79",
                "size": "5458",
                "url": "http://webcast.sambatech.com.br/80245F/origin1/account/37/2/2012-07-12/thumbnail/90c862f8322ec06a0e281e6240fd6fed/praca120712nina6mp4_140x79.jpg",
                "width": "140"
            },
            {
                "height": "360",
                "size": "22528",
                "url": "http://webcast.sambatech.com.br/80245F/origin1/account/37/2/2012-07-12/thumbnail/613b4c3f6fb958aaf5c3ad31469ed3d5/praca120712nina6mp4_480x360.jpg",
                "width": "480"
            },
            {
                "height": "96",
                "size": "4460",
                "url": "http://webcast.sambatech.com.br/80245F/origin1/account/37/2/2012-07-12/thumbnail/291d901efa8d56a64a45a1438b623455/praca120712nina6mp4_128x96.jpg",
                "width": "128"
            },
            {
                "height": "349",
                "size": "30173",
                "url": "http://webcast.sambatech.com.br/80245F/origin1/account/37/2/2012-07-12/thumbnail/0fa2972d0bb7b4d26c806fbc4e90453a/praca120712nina6mp4_620x349.jpg",
                "width": "620"
            }
        ]

	};
	
	var MediaModel = Backbone.Model.extend({
		defaults: defaultsMediaModel,
		fetch: function() {
			this.trigger("fetch", this);
			this.xhr = Backbone.Model.prototype.fetch.apply( this, arguments );
			return this.xhr;
		},
	    abortFetch: function() {
	    	this.xhr.abort();
	    }
	});
	
	return MediaModel;
});