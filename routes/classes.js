
/*
 * GET class data.
 */

module.exports.classes = function(req, res){
	var json = require('../public/mocks/test-class.json');

	res.json(json);
};