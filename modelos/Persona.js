var BD = require("../config/bd");

var Persona = {
	obtenerInfo: function(nick_l){
		return BD.get().query("SELECT * FROM Persona WHERE Nick_L = ?", [nick_l]).then(function(rows){
			return { status: 200, mensaje: rows[0][0] };
		}).catch(function (error) {
			return { status: 500, mensaje: error };
		});
	},
	actualizarInfo: function(nick_l, datos){
		var nombre = datos.nombre,
			apellidoP = datos.apellidoP,
			apellidoM = datos.apellidoM,
			genero = datos.genero,
			fecha = datos.fecha,
			cel = datos.cel,
			estado = datos.estado;

		return BD.get().query(
			"UPDATE Persona SET nombre=?, apellidoP=?, apellidoM=?, genero=?, fecha=?, cel=?, estado=? WHERE nick_l = ?",
			[nombre, apellidoP, apellidoM, genero, fecha, cel, estado, nick_l])
			.then(function () {
				return { status: 200, mensaje: "Datos actualizados" };
			}).catch(function (error) {
				return { status: 500, mensaje: error };
			});
	},
	añadirInfo: function(nick_l, datos){
		var nombre = datos.nombre,
			apellidoP = datos.apellidoP,
			apellidoM = datos.apellidoM,
			genero = datos.genero,
			fecha = datos.fecha,
			cel = datos.cel,
			estado = datos.estado;

		return BD.get().query("INSERT INTO Persona VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)", 
			[nick_l, nombre, apellidoP, apellidoM, genero, fecha, cel, estado, nick_l])
			.then(function () {
				return {status: 200, mensaje: "Datos añadidos"};
			}).catch(function(error){
				return { status: 500, mensaje: error };
			});
	}
};

module.exports = Persona;