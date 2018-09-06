var mysql = require("mysql2/promise");
var base = null;

function conectar(host, usuario, nombreBD, password){
	mysql.createConnection({
		host: host,
		user: usuario,
		database: nombreBD,
		password: password
	}).then(function(conn){
		console.log("Conectado a la base");
		base = conn;
	}).catch(function(err){
		console.log(err);
		process.exit(-1);
	});
}

module.exports = {
	conectar: conectar,
	get: function(){
		return base;
	}
};