var router = require("express").Router();

router.get("/", function (req, res) {
	if (req.err){
		console.warn(err.message);
	}
	else {
		// layouts/public.html
		res.status(200).redirect("/index.html");
	}
})

module.exports = router;