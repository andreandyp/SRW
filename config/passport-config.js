var LocalStrategy = require("passport-local").Strategy;
var Login = require("../modelos/Login");

module.exports = function(passport) {
	var config = {usernameField: "email", passwordField: "contrasenia", passReqToCallback: true};
	
	passport.serializeUser(function(datos, done){
		done(null, datos);
	});

	passport.deserializeUser(function(datos, done){
		done(null, datos);
	});

	passport.use("registrar", new LocalStrategy(config, 
		function(req, email, contrasenia, done){
			Login.registrar(email, contrasenia, req.body.tipo, done);
		}
	));

	passport.use("login", new LocalStrategy(config,
		function(req, email, contrasenia, done){
			Login.iniciarSesion(email, contrasenia, done);
		}
	));
};