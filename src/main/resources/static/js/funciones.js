/*
* Funciones para registro
* validar usuario
* validar e-mail
* validar contraseña
* validar confirmación de contraseña
* validar campos
*
*
* Funciones para inicio de sesión
* validar e-mail
* validar contraseña
* validar campos
*/

///This function verifies if an user exist and allows to verify entry fields
function userValidation(formName) {
    if (formName == "logInForm") {
        let email = $("#userEmail").val();
        let password = $("#userPassword").val();

        if ((email == "") || (password == "")) {
            alert("Debe diligenciar los campos");
        } else {
            if (!(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))) {
                alert("La dirección de email es incorrecta.");
            } else {
                $.ajax({
                    url: "http://129.151.124.186:80/api/user/" + email + "/" + password + "",//"http://localhost:8080/api/user/" + email + "/" + password + "",
                    type: "GET",
                    datatype: "JSON",
                    success: function (item) {
                        console.log(item);
                        userVerification(item);
                    }
                });
                clearFields(formName);
            }
        }
    }
}
//This Function allows to verify if the user is registered in the DB
function userVerification(user){
    if (user.name === "NO DEFINIDO"){
        alert("Usted no se encuentra registrado, por favor cree una cuenta");
    }else{
        alert("Bienvenido " + user.name);
    }
}
 //Clear fields
function clearFields(formName){
    if (formName == "logInForm"){
        $("#userEmail").val("");
        $("#userPassword").val("");
    }else if (formName == "registerForm"){
        $("#newName").val("");
        $("#newEmail").val("");
        $("#newPwd").val("");
        $("#repeatPwd").val("");
    }
}
 //Allows to CREATE a new user in DB
function createUser() {
    let formName = "registerForm";
    let newName = $("#newName").val();
    let newEmail = $("#newEmail").val();
    let newPassword = $("#newPwd").val();
    let repeatPwd = $("#repeatPwd").val();
    if (newName == "" || newEmail == "" || newPassword == "" || repeatPwd == "") {
        alert("Se deben diligenciar todos los campos");
    } else {
        if ((!(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(newEmail)))) {
            alert("La dirección de email es incorrecta.");
        } else {
            if (newPassword.length < 6) {
                alert("La contraseña debe tener mínimo 6 carácteres");
            } else {
                if (newPassword !== repeatPwd) {
                    alert("Las contraseñas no coinciden");
                } else {
                    if (emailVerification(newEmail)) {
                        alert("El email ingresado ya existe");
                        clearFields(formName);
                    } else {
                        let myData = {
                            name: $("#newName").val(),
                            email: $("#newEmail").val(),
                            password: $("#repeatPwd").val(),
                        };
                        let dataToSend = JSON.stringify(myData);
                        $.ajax({
                            url: "http://129.151.124.186:80/api/user/new",//"http://localhost:8080/api/user/new",
                            type: "POST",
                            data: dataToSend,
                            contentType: "application/json; charset=utf-8",
                            datatype: "JSON",
                            success: function (answer) {
                                alert("Se ha registrado con éxito");
                                clearFields(formName);
                            }
                        });
                    }
                }
            }
        }
    }
}
//Allows verify if a new user email exists in the DB
function emailVerification(email) {
    let emailExits = false;
    $.ajax({
        url: "http://129.151.124.186:80/api/user/" + email + "",//"http://localhost:8080/api/user/" + email + "",
        async: false,
        type: "GET",
        datatype: "JSON",
        //async: false,
        success: function (answer) {
            console.log(answer);
            emailExits = answer;
        }
    });
    return emailExits;
}