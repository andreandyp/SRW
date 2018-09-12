var express = require("express"),
	router = express.Router();
var Persona = require("../modelos/Persona"),
	Direccion = require("../modelos/Direccion");

function checarAuth(req, res, next){
	if (req.isAuthenticated()) {
		next();
	}
	else {
		res.redirect("/");
	}
}

router.use("/", checarAuth);

router.get("/persona", function (req, res) {
	Persona.obtenerInfo(req.user).then(function(respuesta){
		res.status(respuesta.status).send(respuesta.mensaje);
	});
	
});

router.post("/persona", function (req, res) {
	Persona.añadirInfo(req.user, req.body).then(function(respuesta){
		res.status(respuesta.status).send(respuesta.mensaje);
	});
	
});

router.put("/persona", function (req, res) {
	Persona.actualizarInfo(req.user, req.body).then(function(respuesta){
		res.status(respuesta.status).send(respuesta.mensaje);
	});
});

router.get("/direccion", function (req, res){
	Direccion.obtenerDirecciones(req.user).then(function(respuesta){
		res.status(respuesta.status).send(respuesta.mensaje);
	});
});

router.post("/direccion", function (req, res) {
	Direccion.añadirDireccion(req.user, req.body).then(function(respuesta){
		res.status(respuesta.status).send(respuesta.mensaje);
	});
});

router.put("/direccion", function (req, res) {
	Direccion.actualizarDireccion(req.user, req.body).then(function (respuesta) {
		res.status(respuesta.status).send(respuesta.mensaje);
	});
});

router.delete("/direccion", function(req, res){
	Direccion.eliminarDireccion(req.user, req.body.idDir).then(function (respuesta) {
		res.status(respuesta.status).send(respuesta.mensaje);
	});
});

module.exports = router;
