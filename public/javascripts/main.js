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
	},
	shim: {
		'backbone-queryparams': ['backbone'],
	}
});

require([
 	'app'
], function(App) {
	App.initialize();
});