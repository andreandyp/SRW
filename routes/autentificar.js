var express = require("express");
var router = express.Router();

module.exports = function(passport){
	router.post("/registrar", function(req, res, next){
		passport.authenticate("registrar", function(error, usuario){
			if (!usuario) {
				res.status(error ? error.status : 500).send(error ? error.mensaje : "Error en la BD");
			} else {
				req.logIn(usuario, function(){
					res.json(usuario);
				});
			}
		})(req, res, next);
	});

	router.post("/login", function(req, res){
		if(!req.body.email || !req.body.contrasenia){
			res.status(400).send("Falta el usuario o la contraseña");
		}
		passport.authenticate("login", function(error, usuario){
			if (!usuario) {
				res.status(error ? error.status : 500).send(error ? error.mensaje : "Error en la BD");
			} else {
				req.logIn(usuario, function() {
					res.json(usuario);
				});
			}
		})(req, res);
	});

	router.get("/salir", function(req, res){
		req.logout();
		req.session.destroy();
		res.end();
	});

	router.get("/activo", function(req, res){
		if (req.user) {
			res.send(req.user);
		} else {
			res.sendStatus(401);
		}
	});

	return router;
};