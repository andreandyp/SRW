var BD = require("../config/bd");
var bcrypt = require("bcrypt-nodejs");

var Usuario = {
	registrar: function(email, contrasenia, tipo, callback){
		var nick_L = (tipo === "owner") ? "OW" : "RT";
		var idNuevoUsuario, idTipo;

		//Checar si el usuario ya existe mediante su correo electrónico
		return BD.get().query("SELECT email FROM login WHERE email LIKE ?", [email]).then(function(rows){
			if(rows[0][0]){
				return callback({ status: 401, mensaje: "El correo ya está registrado" }, false);
			}

			//Obtener el último OWxxx o RTxxx para añadir uno nuevo
			return BD.get().query("SELECT count(*) AS num FROM login WHERE nick_l LIKE ?", [nick_L + "%"])
				.then(function (rows) {
					var num = rows[0][0].num;
					++num;
					idNuevoUsuario = nick_L + num;
					var hash = crearHash(contrasenia);

					//Insertar en tabla Login
					return BD.get().execute("INSERT INTO login VALUES(?, ?, ?)", [idNuevoUsuario, email, hash]);
				}).then(function () {
					//Obtener el último ID de Tipo para añadir uno nuevo
					return BD.get().query("SELECT count(*) AS num FROM tipo");
				}).then(function(rows){
					idTipo = ++rows[0][0].num;
					return BD.get().execute("INSERT INTO Tipo VALUES(?, ?)", [idTipo, tipo]);
				}).then(function(){
					return BD.get().execute("INSERT INTO Login_Tipo VALUES(?, ?)", [idNuevoUsuario, idTipo]);
				}).then(function(){
					return callback(null, idNuevoUsuario);
				})
				.catch(function (error) {
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
			
			if (validarClave(contrasenia, rows[0][0].contrasenia)){
				callback(null, rows[0][0].Nick_L);
			}else{
				callback({ status: 401, mensaje: "Contraseña incorrecta" }, null);
			}
		});
	},
	buscarPorNick: function(){
	}
	
};

function crearHash(contraseña) {
	return bcrypt.hashSync(contraseña, bcrypt.genSaltSync(10), null);
}

function validarClave(contraseña, hash) {
	return bcrypt.compareSync(contraseña, hash);
}


module.exports = Usuario;