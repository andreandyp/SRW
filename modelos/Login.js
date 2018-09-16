var BD = require("../config/bd");
//var bcrypt = require("bcrypt-nodejs");

class Usuario{
	static registrar(email, contrasenia, tipo, callback){
		var nick_L = (tipo === "renter") ? "RT" : "OW";
		var idNuevoLogin, idNuevoUsuario, idTipo;

		//Checar si el usuario ya existe mediante su correo electrónico
		return BD.get().query("SELECT email FROM login WHERE email LIKE ?", [email]).then(rows => {
			if(rows[0][0]){
				return callback({ status: 401, mensaje: "El correo ya está registrado" }, false);
			}

			return BD.get().query("SELECT count(*) AS num FROM login WHERE nick_l LIKE ? ORDER BY 1 DESC", ["NL%"])
				.then(rows => {
					var num = ++rows[0][0].num;
					idNuevoLogin = "NL" + num;
					idNuevoUsuario = "US" + num;

					//Insertar en tabla Login
					return BD.get().execute("INSERT INTO login VALUES(?, ?, ?)", [idNuevoLogin, email, contrasenia]);
				}).then(() => {
					idTipo = (nick_L === "RT") ? "1" : "2";
					return BD.get().execute("INSERT INTO Login_Tipo VALUES(?, ?)", [idNuevoLogin, idTipo]);
				}).then(() => {
					return BD.get().execute("INSERT INTO Persona(Nick_U, Login_Nick_L) VALUES(?, ?)", [idNuevoUsuario, idNuevoLogin]);
				}).then(() => {
					if(nick_L === "RT"){
						return BD.get().query("SELECT COUNT(*) AS num FROM RENTER");
					}	
					else{
						return BD.get().query("SELECT COUNT(*) AS num FROM OWNER");
					}
				}).then(rows => {
					var num = rows[0][0].num;
					if (nick_L === "RT") {
						return BD.get().execute("INSERT INTO Renter VALUES(?, ?)", [nick_L + num, idNuevoUsuario]);
					}
					else {
						return BD.get().execute("INSERT INTO Owner VALUES(?, ?)", [nick_L + num, idNuevoUsuario]);
					}
				}).then(() => {
					return callback(null, { nick_u: idNuevoUsuario, nick_l: idNuevoLogin, tipo: idTipo });
				})
				.catch(error => {
					return callback({ status: 500, mensaje: error }, null);
				});
		}).catch(error => {
			return callback({ status: 500, mensaje: error }, null);
		});
	}

	static iniciarSesion(email, contrasenia, callback){
		var nick_l, nick_u;
		return BD.get().query("SELECT * FROM login WHERE email LIKE ?", [email]).then(rows => {
			if (!rows[0][0]) {
				return callback({ status: 401, mensaje: "El correo no está registrado" }, false);
			}
			nick_l = rows[0][0].Nick_L;
			
			if (contrasenia === rows[0][0].contrasenia){
				return BD.get().query("SELECT Nick_U FROM Persona WHERE Login_Nick_L = ?", [nick_l]);
			}else{
				return callback({ status: 401, mensaje: "Contraseña incorrecta" }, null);
			}
			
		}).then(rows => {
			nick_u = rows[0][0].Nick_U;
			return BD.get().query("SELECT Tipo_idTipo AS idTipo FROM Login_Tipo WHERE Login_Nick_L = ?", [nick_l]);
		}).then(rows => {
			var tipo = rows[0][0].idTipo;
			return callback(null, { nick_u: nick_u, nick_l: nick_l, tipo: tipo });
		}).catch(error => {
			return callback({ status: 500, mensaje: error }, null);
		});
	}
	
}

/*function crearHash(contraseña) {
	return bcrypt.hashSync(contraseña, bcrypt.genSaltSync(10), null);
}

function validarClave(contraseña, hash) {
	return bcrypt.compareSync(contraseña, hash);
}*/


module.exports = Usuario;