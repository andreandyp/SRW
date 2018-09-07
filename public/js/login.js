$("#form-login").on("submit", function(e){
	e.preventDefault();

	var datos = {
		email: $("#form-email").val(),
		contrasenia: $("#form-contrasenia").val()
	};
	
	$.ajax({
		url: "/api/autentificar/login",
		data: datos,
		method: "post"
	}).then(function(){
		window.location.href = "/";
	}).catch(function(xhr){
		alert(xhr.responseText);
	});
});