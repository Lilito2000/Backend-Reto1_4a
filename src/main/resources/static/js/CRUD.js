var pagina = '';
var arg = '';
var host = '';
var datos = '';

function CRUD(argument, pag) {
    host = "http://localhost:8080";
    pagina = host + pag;
    arg = argument;

    switch (arg) {
        case 'Ingresar':
            if (validarCampos(arg)) {
                pagina = pagina.replace("{email}", valorAtributo('email')).replace("{password}", valorAtributo('password'))
                getFetch();
            }

            break;
        
        case 'userValidate':
            pagina = pagina.replace("{email}", valorAtributo('regEmail'))
            getFetch();
            break;

        case 'registro':
            if (validarCampos(arg)) {

                datos = {
                    'name': valorAtributo('regUserName'),
                    'email': valorAtributo('regEmail'),
                    'password': valorAtributo('password')
                }
                postFetch();
            }

            break;
    }
}
function responseCRUD(argument, response) {
    switch (argument) {
        case 'login':
            if (response.id == null) {
                alert('EMAIL O CONTRASEÑA INVALIDOS')
            }
            else {
                showSection('home', 'sign-in')
                $("#welcome").text('Bienvenido ' + response.name)
            }
            break;

            case 'userValidate':
                if (!response){
                    CRUD('register', '/api/user/new');
                }else{
                    alert('El email del usuario ya se encuentra registrado');
                } 
                
                break;

        case 'register':
            alert('Registro exitoso');
            showSection('sign-in', 'register');
            $('form input').each(function(){this.value = ''})
            break;
    }

}