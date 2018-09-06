var LocalStrategy = require("passport-local").Strategy;
var Usuario = require("../modelos/Usuario");

module.exports = function(passport) {
	var config = {usernameField: "email", passwordField: "contrasenia", passReqToCallback: true};
	
	passport.serializeUser(function(datos, done){
		done(null, datos._id);
	});

	passport.deserializeUser(function(id, done){
		Usuario.buscarPorNick(id, done);
	});

	passport.use("registrar", new LocalStrategy(config, 
		function(req, email, contrasenia, done){
			Usuario.registrar(email, contrasenia, req.body.tipo, done);
		}
	));

	passport.use("iniciar", new LocalStrategy(config,
		function(req, email, contrasenia, done){
			Usuario.iniciarSesion(email, contrasenia, done);
		}
	));
};