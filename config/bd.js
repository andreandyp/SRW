var mysql = require("mysql2/promise");
var conexion;

function conectar(host, usuario, nombreBD, password){
	var connection = mysql.createConnection({
		host: host,
		user: usuario,
		database: nombreBD,
		password: password
	}).then(function(conn){
		console.log("Conectado a la base");
		return conn;
	}).catch(function(err){
		console.log(err);
		process.exit(-1);
	});
	

	conexion = connection;
}

module.exports = {
	conectar: conectar,
	conexion: conexion
};