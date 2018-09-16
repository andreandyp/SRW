var BD = require("../config/bd");

class ZonaTrabajo {
	static añadir(nick_u, datos) {
		var ciudad = datos.ciudad,
			delegacion = datos.delegacion;

		var nuevoIdZT;

		return BD.get().query("SELECT idZT FROM Zona_Trabajo ORDER BY 1 DESC")
			.then(rows => {
				nuevoIdZT = ++rows[0][0].idZT;
				return BD.get().execute("INSERT INTO Zona_Trabajo VALUES(?, ?, ?)", [nuevoIdZT, ciudad, delegacion]);
			}).then(() => {
				return BD.get().query("SELECT Nick_O FROM Owner WHERE Persona_Nick_U = ?", [nick_u]);
			}).then((rows) => {
				var nick_o = rows[0][0].Nick_O;
				return BD.get().execute("INSERT INTO Owner_ZT VALUES(?, ?)", [nick_o, nuevoIdZT]);
			}).then(() => {
				return { status: 200, mensaje: "Zona de trabajo añadida" };
			}).catch(error => {
				return { status: 500, mensaje: error };
			});
	}

	static obtener(nick_u) {
		return BD.get().query("SELECT Nick_O FROM Owner WHERE Persona_Nick_U = ?", [nick_u])
			.then(rows => {
				var nick_o = rows[0][0].Nick_O;
				return BD.get().query(
					"SELECT zt.* FROM Zona_Trabajo zt, Owner_ZT ozt \
					WHERE ozt.Owner_Nick_O = ? AND ozt.Zona_Trabajo_idZT = zt.idZT",
					[nick_o]);
			}).then((rows) => {
				return { status: 200, mensaje: rows[0] };
			}).catch(error => {
				return { status: 500, mensaje: error };
			});

	}

	static actualizar(nick_u, datos) {
		var idZT = datos.idZT,
			ciudad = datos.ciudad,
			delegacion = datos.delegacion;

		var nick_o;

		return BD.get().query("SELECT Nick_O FROM Owner WHERE Persona_Nick_U = ?", [nick_u])
			.then(rows => {
				nick_o = rows[0][0].Nick_O;
				return BD.get().query("SELECT Zona_Trabajo_idZT FROM Owner_ZT \
					WHERE Zona_Trabajo_idZT = ? AND Owner_Nick_O = ?", [idZT, nick_o]);
			}).then(rows => {
				if (!rows[0][0]) {
					return { status: 403, mensaje: "Esa no es tu zona de trabajo" };
				}
				
				return BD.get().execute("UPDATE Zona_Trabajo SET ciudad=?, delegacion=? WHERE idZT=?",
					[ciudad, delegacion, idZT]).then(() => {
						
					return { status: 200, mensaje: "Zona actualizada" };
				});
			})
			.catch(error => {
				return { status: 500, mensaje: error };
			});
	}

	static eliminar(nick_u, datos){
		var idZT = datos.idZT;

		var nick_o;
		return BD.get().query("SELECT Nick_O FROM Owner WHERE Persona_Nick_U = ?", [nick_u])
			.then(rows => {
				nick_o = rows[0][0].Nick_O;
				return BD.get().query("SELECT Zona_Trabajo_idZT FROM Owner_ZT \
					WHERE Zona_Trabajo_idZT = ? AND Owner_Nick_O = ?", [idZT, nick_o]);
			}).then(rows => {
				if (!rows[0][0]) {
					return { status: 403, mensaje: "Esa no es tu zona de trabajo" };
				}

				return BD.get().execute("DELETE FROM Zona_Trabajo WHERE idZT=?", [idZT]).then(() => {
					return { status: 200, mensaje: "Zona eliminada" };
				});
			})
			.catch(error => {
				return { status: 500, mensaje: error };
			});
	}

}

module.exports = ZonaTrabajo;