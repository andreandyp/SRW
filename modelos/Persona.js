var BD = require("../config/bd");

class Persona{
	static obtenerInfo(nick_u){
		return BD.get().query("SELECT * FROM Persona WHERE Nick_u = ?", [nick_u]).then(function(rows){
			return { status: 200, mensaje: rows[0][0] };
		}).catch(function (error) {
			return { status: 500, mensaje: error };
		});
	}

	static actualizarInfo(nick_u, datos){
		var nombre = datos.nombre,
			apellidoP = datos.apellidoP,
			apellidoM = datos.apellidoM,
			genero = datos.genero,
			fecha_nac = datos.fecha_nac,
			cel = datos.cel,
			delegacion = datos.delegacion;

		return BD.get().query(
			"UPDATE Persona SET nombre=?, apellidoP=?, apellidoM=?, genero=?, fecha_nac=?, cel=?, delegacion=? WHERE nick_u = ?",
			[nombre, apellidoP, apellidoM, genero, fecha_nac, cel, delegacion, nick_u])
			.then(function () {
				return { status: 200, mensaje: "Datos actualizados" };
			}).catch(function (error) {
				return { status: 500, mensaje: error };
			});
	}

	static añadirInfo(nick_u, nick_l, datos){
		var nombre = datos.nombre,
			apellidoP = datos.apellidoP,
			apellidoM = datos.apellidoM,
			genero = datos.genero,
			fecha_nac = datos.fecha_nac,
			cel = datos.cel,
			delegacion = datos.delegacion;

		return BD.get().query("UPDATE Persona SET nombre=?, apellidoP=?, apellidoM=?, genero=?, Fecha_Nac=?, cel=?, delegacion=? WHERE nick_u = ?", 
			[nombre, apellidoP, apellidoM, genero, fecha_nac, cel, delegacion, nick_u])
			.then(function () {
				return {status: 200, mensaje: "Datos añadidos"};
			}).catch(function(error){
				return { status: 500, mensaje: error };
			});
	}	
}

module.exports = Persona;