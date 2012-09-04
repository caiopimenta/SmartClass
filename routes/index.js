
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

//API
exports.classes = require('./classes').classes;
exports.topics = require('./topics').topics;