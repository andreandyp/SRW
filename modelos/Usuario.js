var BD = require("../config/bd").conexion;

var Usuario = {
	buscarPorNick: function(nick, callback){
		BD.execute("SELECT FROM Login WHERE Nick_L = ?", [nick]).then(function(rows, fields){
			console.log(rows);
			console.log(fields);
			return callback(null, rows);
		});
	},
	registrar: function(email, contrasenia, nick, tipo, callback){
		var nick_L = (tipo === "owner") ? "OW" : "RT";
		BD.execute("SELECT FROM Login WHERE Nick_L LIKE '?%'", [nick_L]);
		BD.query("INSERT INTO Login VALUES(?, ?, ?)", [nick, email, contrasenia]).then(function (results, fields) {
			console.log(results);
			console.log(fields);
			return BD.query("INSERT INTO Tipo VALUES()");
		});
	},
	iniciarSesion: function(){

	}
};

module.exports = Usuario;