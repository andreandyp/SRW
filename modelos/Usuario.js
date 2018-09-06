var BD = require("../config/bd");
var bcrypt = require("bcrypt-nodejs");

var Usuario = {
	registrar: function(email, contrasenia, tipo, callback){
		var nick_L = (tipo === "owner") ? "OW" : "RT";
		var id;

		return BD.get().query("SELECT email FROM login WHERE email LIKE ?", [email]).then(function(rows){
			if(rows[0][0]){
				return callback({ status: 401, mensaje: "El correo ya está registrado" }, false);
			}

			return BD.get().query("SELECT count(*) AS num FROM login WHERE nick_l LIKE ?", [nick_L + "%"])
				.then(function (rows) {
					var num = rows[0][0].num;
					++num;
					id = nick_L + num;

					return BD.get().execute("INSERT INTO login VALUES(?, ?, ?)", [id, email, contrasenia]);
				}).then(function () {
					return callback(null, id);
				}).catch(function (error) {
					return callback({ status: 500, mensaje: error }, null);
				});
		}).catch(function (error) {
			return callback({ status: 500, mensaje: error }, null);
		});
	},
	iniciarSesion: function(email, contrasenia, callback){
		return BD.get().query("SELECT * FROM login WHERE email LIKE ?", [email]).then(function (rows) {
			if (!rows[0][0]) {
				return callback({ status: 401, mensaje: "El correo no está registrado" }, false);
			}

			if(rows[0][0].Contrasenia === contrasenia){
				callback(null, rows[0][0].Nick_L);
			}else{
				callback({ status: 401, mensaje: "Contraseña incorrecta" }, null);
			}
		});
	},
	
};

/*function crearHash(contraseña) {
	return bcrypt.hashSync(contraseña, bcrypt.genSaltSync(10), null);
}*/

module.exports = Usuario;