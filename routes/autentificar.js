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

	router.post("/iniciar", function(req, res){
		passport.authenticate("iniciar", function(error, usuario){
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

	/*router.get("/info", async (req, res)  {
		if (!req.user) {
			return res.status(403).send("No tienes permiso para acceder aquí");
		}
		res.send(await Alumno.obtenerInfo(req.user._id));
	});*/

	return router;
};