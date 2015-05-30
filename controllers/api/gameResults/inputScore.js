var router = require("express").Router();

var inputScore = function(req, res) {
	console.log(req.files,req.body);
	
};


router.post("/", inputScore);

module.exports = router;