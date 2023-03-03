/*=============================================
BOTÓN FACEBOOK
=============================================*/

$(".facebook").click(function() {

    FB.login(function(response) {

        validarUsuario();

    }, { scope: 'public_profile, email' })

})

/*=============================================
VALIDAR EL INGRESO
=============================================*/

function validarUsuario() {

    FB.getLoginStatus(function(response) {

        statusChangeCallback(response);

    })

}

/*=============================================
VALIDAMOS EL CAMBIO DE ESTADO EN FACEBOOK
=============================================*/

function statusChangeCallback(response) {

    if (response.status === 'connected') {

        testApi();

    } else {

        swal({
            type: "error",
            title: "¡ERROR!",
            text: "¡There was an error logging in with Facebook, please try again!",
            showConfirmButton: true,
            confirmButtonText: "OK"

        })

    }

}

/*=============================================
INGRESAMOS A LA API DE FACEBOOK
=============================================*/

function testApi() {

    FB.api('/me?fields=id,name,picture', function(response) {

        var nombre = response.name;
        var foto = "http://graph.facebook.com/" + response.id + "/picture?type=large";

        var datos = new FormData();
        datos.append("nombre", nombre);
        datos.append("foto", foto);

        $.ajax({

            url: urlPrincipal + "ajax/usuarios.ajax.php",
            method: "POST",
            data: datos,
            cache: false,
            contentType: false,
            processData: false,
            success: function(respuesta) {

                if (respuesta == "ok") {

                    window.location = urlPrincipal + "carrito";

                } else {

                    swal({
                        type: "error",
                        title: "¡ERROR!",
                        text: "¡There was an error logging in with Facebook, please try again!",
                        showConfirmButton: true,
                        confirmButtonText: "OK"

                    })

                }

            }

        })



    })

}

/*=============================================
SALIR DE FACEBOOK
=============================================*/

$(".salir").click(function(e) {

    e.preventDefault();

    FB.getLoginStatus(function(response) {

        if (response.status === 'connected') {

            FB.logout(function(response) {

                deleteCookie("fblo_663966647887622");

                setTimeout(function() {

                    window.location = urlPrincipal + "salir";

                }, 500)

            });

            function deleteCookie(name) {

                document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            }

        } else {

            setTimeout(function() {

                window.location = urlPrincipal + "salir";

            }, 500)

        }

    })

})