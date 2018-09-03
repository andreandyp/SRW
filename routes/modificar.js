var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
	res.render("modificar");
});

module.exports = router;
