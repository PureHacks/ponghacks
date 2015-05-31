var router = require("express").Router();

var mockUsers = [
	{
		"userId": 1,
		"email": "matt.mcfadyen@razorfish.ca",
		"name": "Matt McFadyen",
		"mentionName": "matt",
		"avatarUrl": "http://www.placesheen.com/200/200",
    },
    {
		"userId": 2,
		"email": "Mike.Roelens@razorfish.ca",
		"name": "Mike Roelens",
		"mentionName": "Mike",
		"avatarUrl": "http://www.placecage.com/250/175",
    },
    {
		"userId": 3,
		"email": "Timothy.Lau@razorfish.ca",
		"name": "Timothy Lau",
		"mentionName": "Tim",
		"avatarUrl": "http://www.placekitten.com/g/200/300",
    },
    {
		"userId": 4,
		"email": "Wes.Cocks@razorfish.ca",
		"name": "Wes Cocks",
		"mentionName": "Wes",
		"avatarUrl": "http://www.placecage.com/200/200",
    },
    {
		"userId": 5,
		"email": "Jason.Matthews@razorfish.ca",
		"name": "Jason Matthews",
		"mentionName": "Jason",
		"avatarUrl": "http://www.placesheen.com/250/180",
    },
];

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