var BD = require("../config/bd");

var Direccion = {
	obtenerDirecciones: function (nick_u) {
		return BD.get().query("SELECT d.colonia, d.cp, d.calle, d.no_int, d.no_ext, pd.idDir FROM direccion d, persona_dir pd WHERE pd.nick_u = ? AND pd.idDir = d.idDir;", 
			[nick_u]).then(function (rows) {
			return { status: 200, mensaje: rows[0] };
		}).catch(function (error) {
			return { status: 500, mensaje: error };
		});
	},
	añadirDireccion: function(nick_u, datos){
		var nuevoIdDir;

		var colonia = datos.colonia,
			cp = datos.CP,
			calle = datos.calle,
			no_int = datos.no_int,
			no_ext = datos.no_ext,
			delegacion = datos.delegacion;
		//Obtener un nuevo ID
		return BD.get().query("SELECT count(*) AS num FROM Persona_Dir")
			.then(function(rows){

				nuevoIdDir = ++rows[0][0].num;
				return BD.get().query("SELECT idDel FROM delegacion WHERE nombre LIKE ?", [delegacion]);
			})
			.then(function(rows){
				var idDel;
				var nuevoIdDel;
				if(rows[0][0]){
					idDel = rows[0][0].idDel;
					return BD.get().execute("INSERT INTO Direccion VALUES(?, ?, ?, ?, ?, ?, ?)",
						[nuevoIdDir, colonia, cp, calle, no_int, no_ext, idDel]);
				}else{
					return BD.get().query("SELECT count(*) AS num FROM Delegacion")
						.then(function(rows){
							nuevoIdDel = ++rows[0][0].num;
							return BD.get().execute("INSERT INTO Delegacion VALUES(?, ?)", [nuevoIdDel, delegacion]);
						})
						.then(function(){
							return BD.get().execute("INSERT INTO Direccion VALUES(?, ?, ?, ?, ?, ?, ?)",
								[nuevoIdDir, colonia, cp, calle, no_int, no_ext, nuevoIdDel]);
						});
				}
			}).then(function () {
				return BD.get().execute("INSERT INTO Persona_Dir VALUES(?, ?)", [nick_u, nuevoIdDir]);
			}).then(function(){
				return { status: 200, mensaje: "Datos insertados" };
			}).catch(function(error){
				return { status: 500, mensaje: error };
			});
	},
	actualizarDireccion: function(){

	},
	eliminarDireccion: function(){

	}
};

module.exports = Direccion;