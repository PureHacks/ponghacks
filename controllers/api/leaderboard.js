var router = require("express").Router();

var getLeaderboard = function(req, res) {
	console.log("get that leaderboard", req.body);

	if (req.err){
		console.warn(err.message);
	}
	else {
		// layouts/public.html
		res.status(200).redirect("/layouts/partials/leaderboard.html");
	};
};
router.get("/", getLeaderboard);

module.exports = router;