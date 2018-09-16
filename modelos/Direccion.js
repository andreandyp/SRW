var BD = require("../config/bd");

class Direccion{
	static obtenerDirecciones(nick_u) {
		return BD.get().query(
			"SELECT d.idDir, d.colonia, d.cp, d.calle, d.no_int, d.no_ext FROM direccion d, persona_dir pd WHERE pd.Persona_Nick_U = ? AND pd.Direccion_idDir = d.idDir", 
			[nick_u])
			.then(rows => {
				return { status: 200, mensaje: rows[0] };
			}).catch(error => {
				return { status: 500, mensaje: error };
			});
	}

	static añadirDireccion(nick_u, datos){
		var nuevoIdDir;

		var colonia = datos.colonia,
			cp = datos.CP,
			calle = datos.calle,
			no_int = datos.no_int,
			no_ext = datos.no_ext,
			delegacion = datos.delegacion;
		//Obtener un nuevo ID
		return BD.get().query("SELECT idDir FROM direccion ORDER BY 1 DESC;")
			.then(rows => {
				nuevoIdDir = ++rows[0][0].idDir;
				return BD.get().execute("INSERT INTO Direccion VALUES(?, ?, ?, ?, ?, ?, ?)",
					[nuevoIdDir, colonia, cp, calle, no_int, no_ext, delegacion]);
			}).then(() => {
				return BD.get().execute("INSERT INTO Persona_Dir VALUES(?, ?)", [nick_u, nuevoIdDir]);
			}).then(() => {
				return { status: 200, mensaje: "Datos insertados" };
			}).catch(error => {
				return { status: 500, mensaje: error };
			});
	}

	static actualizarDireccion(datos){
		var idDir = datos.idDir,
			colonia = datos.colonia,
			cp = datos.CP,
			calle = datos.calle,
			no_int = datos.no_int,
			no_ext = datos.no_ext,
			delegacion = datos.delegacion;
		//Checar si existe la delegación actualizada
		return BD.get().execute(
			"UPDATE Direccion SET colonia=?, cp=?, calle=?, no_int=?, no_ext=?, Delegacion_idDel=? WHERE idDir = ?",
			[colonia, cp, calle, no_int, no_ext, delegacion, idDir])
			.then(() => {
				return { status: 200, mensaje: "Datos actualizados" };
			}).catch(error => {
				return { status: 500, mensaje: error };
			});
	}

	static eliminarDireccion(nick_u, idDir){
		return BD.get().query("SELECT Direccion_idDir AS idDir FROM persona_dir WHERE Persona_Nick_U = ?" , [nick_u])
			.then(rows => {
				if (!rows[0]) {
					return { status: 403, mensaje: "No tienes direcciones asignadas" };
				}
				for(var i = 0; i < rows[0].length; i++){
					if (rows[0][i].idDir.toString() === idDir){
						return BD.get().execute("DELETE FROM direccion WHERE idDir = ?", [idDir])
							.then(() => {
								return { status: 200, mensaje: "Datos eliminados" };
							});
					}
				}
				return { status: 403, mensaje: "Esa dirección no es la tuya" };
				
			}).catch(error => {
				return { status: 500, mensaje: error };
			});
	}
}

module.exports = Direccion;