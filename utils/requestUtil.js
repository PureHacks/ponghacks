var exports = module.exports = {};

exports.jsonResponse = function(req, res, obj) {
	if (req.err){
		console.warn(err.message);
	}
	else {
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify(obj));
	}
};
