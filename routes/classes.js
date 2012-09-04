
/*
 * GET class data.
 */

module.exports.classes = function(req, res){
	var json = {
		response: "ok",
		id: req.params.id
	};

	res.json(json);
};