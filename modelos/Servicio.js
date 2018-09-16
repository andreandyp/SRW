var BD = require("../config/bd");

class Servicio{
	static añadir(nick_u, datos){
		var nombre = datos.nombre,
			catalogo = datos.catalogo;

		var nuevoIdServicio;
		
		return BD.get().query("SELECT idServicio FROM Servicio ORDER BY 1 DESC")
			.then(rows => {
				nuevoIdServicio = ++rows[0][0].idServicio;
				return BD.get().execute("INSERT INTO Servicio VALUES(?, ?, ?)", [nuevoIdServicio, nombre, catalogo]);
			}).then(() => {
				return BD.get().query("SELECT Nick_O FROM Owner WHERE Persona_Nick_U = ?", [nick_u]);
			}).then((rows) => {
				var nick_o = rows[0][0].Nick_O;
				return BD.get().execute("INSERT INTO Owner_Ser VALUES(?, ?)", [nick_o, nuevoIdServicio]);
			}).then(() => {
				return { status: 200, mensaje: "Servicio añadido" };
			}).catch(error => {
				return { status: 500, mensaje: error };
			});
	}

	static obtener(nick_u){
		return BD.get().query("SELECT Nick_O FROM Owner WHERE Persona_Nick_U = ?", [nick_u])
			.then(rows => {
				var nick_o = rows[0][0].Nick_O;
				return BD.get().query(
					"SELECT serv.idServicio, serv.nombre, cs.nombre AS categoria FROM Servicio serv, Owner_ser os, Catalogo_Servicios cs \
					WHERE os.Owner_Nick_O = ? AND os.Servicio_idServicio = serv.idServicio \
					AND cs.idCS = serv.Catalogo_Servicios_idCS",
					[nick_o]);
			}).then((rows) => {
				return { status: 200, mensaje: rows[0] };
			}).catch(error => {
				return { status: 500, mensaje: error };
			});
		
	}

	static actualizar(nick_u, datos){
		var nombre = datos.nombre,
			catalogo = datos.catalogo,
			idServicio = datos.idServicio;

		var nick_o;

		return BD.get().query("SELECT Nick_O FROM Owner WHERE Persona_Nick_U = ?", [nick_u])
			.then(rows => {
				nick_o = rows[0][0].Nick_O;
				return BD.get().query("SELECT Servicio_idServicio FROM Owner_Ser \
					WHERE Servicio_idServicio = ? AND Owner_Nick_O = ?", [idServicio, nick_o]);
			}).then(rows => {
				if (!rows[0][0]) {
					return { status: 403, mensaje: "Ese servicio no es tuyo" };
				}
				return BD.get().execute("UPDATE Servicio SET nombre=?, Catalogo_Servicios_idCS=? WHERE idServicio=?",
					[nombre, catalogo, idServicio])
					.then(() => {
						return { status: 200, mensaje: "Servicio actualizado" };
					});
			}).catch(error => {
				return { status: 500, mensaje: error };
			});
	}


	static eliminar(nick_u, datos){
		var idServicio = datos.idServicio;

		var nick_o;

		return BD.get().query("SELECT Nick_O FROM Owner WHERE Persona_Nick_U = ?", [nick_u])
			.then(rows => {
				nick_o = rows[0][0].Nick_O;
				return BD.get().query("SELECT Servicio_idServicio FROM Owner_Ser \
					WHERE Servicio_idServicio = ? AND Owner_Nick_O = ?", [idServicio, nick_o]);
			}).then(rows => {
				if (!rows[0][0]) {
					return { status: 403, mensaje: "Ese servicio no es tuyo" };
				}
				return BD.get().execute("DELETE FROM Servicio WHERE idServicio=?",
					[idServicio])
					.then(() => {
						return { status: 200, mensaje: "Servicio eliminado" };
					});
			}).catch(error => {
				return { status: 500, mensaje: error };
			});
	}
}

module.exports = Servicio;