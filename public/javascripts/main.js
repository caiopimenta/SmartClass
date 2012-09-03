/*
 * Teste
*/

//Configurando as dependencias para o Requirejs

require.config({
	paths: {
		'jquery': 'libs/jquery/jquery-min',
		'underscore': 'libs/underscore/underscore-min',
		'backbone': 'libs/backbone/backbone-min',
		'backbone-queryparams' : 'libs/backbone/plugins/backbone.queryparams',
		'text': 'libs/requirejs/text',
		'templates': '../templates',
		'jquery-jqplot': 'libs/jquery/plugins/jquery.jqplot.min',
		'jquery-jqplot-highlighter': 'libs/jquery/plugins/jqplot.highlighter.min',
		'jquery-jqplot-cursor': 'libs/jquery/plugins/jqplot.cursor.min',
		'jquery-jqplot-dateAxisRenderer': 'libs/jquery/plugins/jqplot.dateAxisRenderer.min',
		'jquery-tooltipsy': 'libs/jquery/plugins/tooltipsy.min',
		'jquery-ui': 'libs/jquery/plugins/jquery-ui',
		'jquery-ui-custon': 'libs/jquery/plugins/jquery-ui-1.8.20.custom.min',
		'jquery-scrollbar': 'libs/jquery/plugins/jScrollbar.jquery.min',
		'jquery-mousewheel': 'libs/jquery/plugins/jquery-mousewheel',
		'bootstrap': 'libs/bootstrap/bootstrap.min',
		'bootstrap-transition': 'libs/bootstrap/bootstrap-transition',
		'bootstrap-dropdown': 'libs/bootstrap/bootstrap-dropdown',
		'bootstrap-scrollspy': 'libs/bootstrap/bootstrap-scrollspy',
		'bootstrap-tooltip': 'libs/bootstrap/bootstrap-tooltip',
		'less': 'libs/less/less-1.3.0.min',
	},
	shim: {
		'jquery-jqplot': ['jquery'],
		'jquery-jqplot-highlighter': ['jquery-jqplot'],
		'jquery-jqplot-cursor': ['jquery-jqplot'],
		'jquery-jqplot-dateAxisRenderer': ['jquery-jqplot'],
		'jquery-tooltip': ['jquery'],
		'jquery-ui': ['jquery'],
		'jquery-scrollbar': ['jquery'],
		'jquery-mousewheel': ['jquery'],
		'backbone-queryparams': ['backbone'],
		'bootstrap-dropdown': ['bootstrap-transition'],
		'bootstrap-scrollspy': ['bootstrap-transition'],
		'bootstrap-tooltip': ['bootstrap-transition']
	}
});

require([
 	'app'
], function(App) {
	App.initialize();
});