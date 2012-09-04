
/*
 * GET topic data.
 */

module.exports.topics = function(req, res){
	var json = require('../public/mocks/test-topics.json');

	res.json(json);
};