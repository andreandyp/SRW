var express = require("express");
var router = express.Router();
var opciones = {
	root: "./public/"
};

router.get("/", function(req, res) {
	res.sendFile("index.html");
});

router.get("/login", function (req, res) {
	res.sendFile("login.html", opciones);
});

router.get("/registro", function (req, res) {
	res.sendFile("registro.html", opciones);
});

module.exports = router;
