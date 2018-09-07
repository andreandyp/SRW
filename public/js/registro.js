$("#form-login").on("submit", function (e) {
	alert("hue");
	e.preventDefault();

	var datos = {
		email: $("#form-email").val(),
		contrasenia: $("#form-contrasenia").val(),
		tipo: $("#form-tipo").val()
	};

	$.ajax({
		url: "/api/autentificar/registrar",
		data: datos,
		method: "post"
	}).then(function () {
		window.location.href = "/";
	}).catch(function (xhr) {
		alert(xhr.responseText);
	});
});