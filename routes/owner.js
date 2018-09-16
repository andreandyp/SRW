var express = require("express"),
	router = express.Router();
var Servicio = require("../modelos/Servicio"),
	ZonaTrabajo = require("../modelos/ZonaTrabajo");

function checarAuth(req, res, next) {
	if (req.isAuthenticated() && req.user.tipo === 2) {
		next();
	}
	else {
		res.redirect("/");
	}
}

router.use("/", checarAuth);

router.get("/servicio", function (req, res) {
	Servicio.obtener(req.user.nick_u).then(respuesta =>  {
		res.status(respuesta.status).send(respuesta.mensaje);
	});

});

router.post("/servicio", function (req, res) {
	Servicio.añadir(req.user.nick_u, req.body).then(respuesta =>  {
		res.status(respuesta.status).send(respuesta.mensaje);
	});

});

router.put("/servicio", function (req, res) {
	Servicio.actualizar(req.user.nick_u, req.body).then(respuesta =>  {
		res.status(respuesta.status).send(respuesta.mensaje);
	});
});

router.delete("/servicio", (req, res) => {
	Servicio.eliminar(req.user.nick_u, req.body).then(respuesta => {
		res.status(respuesta.status).send(respuesta.mensaje);
	});
});

router.get("/zona-trabajo", function (req, res) {
	ZonaTrabajo.obtener(req.user.nick_u).then(respuesta =>  {
		res.status(respuesta.status).send(respuesta.mensaje);
	});
});

router.post("/zona-trabajo", function (req, res) {
	ZonaTrabajo.añadir(req.user.nick_u, req.body).then(respuesta =>  {
		res.status(respuesta.status).send(respuesta.mensaje);
	});

});

router.put("/zona-trabajo", function (req, res) {
	ZonaTrabajo.actualizar(req.user.nick_u, req.body).then(respuesta =>  {
		res.status(respuesta.status).send(respuesta.mensaje);
	});
});

router.delete("/zona-trabajo", (req, res) => {
	ZonaTrabajo.eliminar(req.user.nick_u, req.body).then(respuesta => {
		res.status(respuesta.status).send(respuesta.mensaje);
	});
});

module.exports = router;