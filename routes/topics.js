
/*
 * GET topic data.
 */

module.exports.topics = function(req, res){
	var json = {
		response: "ok",
		class: req.params.class
	};

	res.json(json);
};