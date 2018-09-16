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
	Persona.obtenerInfo(req.user.nick_u).then(respuesta => {
		res.status(respuesta.status).send(respuesta.mensaje);
	});
	
});

router.post("/persona", function (req, res) {
	Persona.añadirInfo(req.user.nick_u, req.user.nick_l, req.body).then(respuesta => {
		res.status(respuesta.status).send(respuesta.mensaje);
	});
	
});

router.put("/persona", function (req, res) {
	Persona.actualizarInfo(req.user.nick_u, req.body).then(respuesta => {
		res.status(respuesta.status).send(respuesta.mensaje);
	});
});

router.get("/direccion", function (req, res){
	Direccion.obtenerDirecciones(req.user.nick_u).then(respuesta => {
		res.status(respuesta.status).send(respuesta.mensaje);
	});
});

router.post("/direccion", function (req, res) {
	Direccion.añadirDireccion(req.user.nick_u, req.body).then(respuesta => {
		res.status(respuesta.status).send(respuesta.mensaje);
	});
});

router.put("/direccion", function (req, res) {
	Direccion.actualizarDireccion(req.body).then(respuesta =>  {
		res.status(respuesta.status).send(respuesta.mensaje);
	});
});

router.delete("/direccion", function(req, res){
	Direccion.eliminarDireccion(req.user.nick_u, req.body.idDir).then(respuesta =>  {
		res.status(respuesta.status).send(respuesta.mensaje);
	});
});

module.exports = router;
