var router = require("express").Router();

var mockUsers = require("../../../mockData/users.js");

var getUsers = function(req, res) {
	if (req.err){
		console.warn(err.message);
	}
	else {
		res.status(200).send(mockUsers);
	};
};
router.get("/", getUsers);

module.exports = router;