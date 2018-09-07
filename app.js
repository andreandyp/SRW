//var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var passport = require("passport");

require("./config/passport-config")(passport);
var index = require("./routes/index"),
	modificar = require("./routes/modificar"),
	autentificar = require("./routes/autentificar")(passport);
var base = require("./config/bd");

var keys = require("./keys.json");

base.conectar(keys.HOST, keys.USUARIO, keys.BD, keys.CONTRASEÑA);

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
app.use(passport.session());

app.use("/", index);
app.use("/actualizar", modificar);
app.use("/api/autentificar", autentificar);

// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	//res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});*/

module.exports = app;
