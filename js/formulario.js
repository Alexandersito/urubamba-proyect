const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
    personas: /^[0-9]{1,2}$/,
    telefono: /^[+]+[0-9]{7,20}$/ // 7 a 14 numeros.
}

const campos = {
    fecha: false,
    personas: false,
    telefono: false
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "fecha":
            var fechaActual = new Date();
            var mesActual = (fechaActual.getMonth() + 1).toString();
            if (mesActual.length <= 1) {
                mesActual = "0" + mesActual;
            }
            var diaActual = fechaActual.getDate().toString();
            if (diaActual.length <= 1) {
                diaActual = "0" + diaActual;
            }
            var hoy = fechaActual.getFullYear() + "-" + mesActual + "-" + diaActual;
            var valor = e.target.value

            if (valor <= hoy) {
                document.getElementById(`grupo__fecha`).classList.add('formulario__grupo-incorrecto');
                document.getElementById(`grupo__fecha`).classList.remove('formulario__grupo-correcto');
                document.querySelector(`#grupo__fecha i`).classList.add('fa-times-circle');
                document.querySelector(`#grupo__fecha i`).classList.remove('fa-check-circle');
                document.querySelector(`#grupo__fecha .formulario__input-error`).classList.add('formulario__input-error-activo');
                campos.fecha = false;
            } else {
                document.getElementById(`grupo__fecha`).classList.remove('formulario__grupo-incorrecto');
                document.getElementById(`grupo__fecha`).classList.add('formulario__grupo-correcto');
                document.querySelector(`#grupo__fecha i`).classList.add('fa-check-circle');
                document.querySelector(`#grupo__fecha i`).classList.remove('fa-times-circle');
                document.querySelector(`#grupo__fecha .formulario__input-error`).classList.remove('formulario__input-error-activo');
                campos.fecha = true;
            }
            break;
        case "personas":
            validarCampo(expresiones.personas, e.target, 'personas');
            var valor = e.target.value
            var valorInt = parseInt(valor)
            if (e.target.value !== '' && expresiones.personas.test(e.target.value)) {
                e.target.value = valorInt
                $('.TotalPersonas').html("Total Persons: " + valorInt)
            }
            if (valorInt >= 2 && valorInt <= 30 && expresiones.personas.test(e.target.value)) {
                document.getElementById(`grupo__personas`).classList.remove('formulario__grupo-incorrecto');
                document.getElementById(`grupo__personas`).classList.add('formulario__grupo-correcto');
                document.querySelector(`#grupo__personas i`).classList.add('fa-check-circle');
                document.querySelector(`#grupo__personas i`).classList.remove('fa-times-circle');
                document.querySelector(`#grupo__personas .formulario__input-error`).classList.remove('formulario__input-error-activo');
                campos.personas = true;
            } else {
                document.getElementById(`grupo__personas`).classList.add('formulario__grupo-incorrecto');
                document.getElementById(`grupo__personas`).classList.remove('formulario__grupo-correcto');
                document.querySelector(`#grupo__personas i`).classList.add('fa-times-circle');
                document.querySelector(`#grupo__personas i`).classList.remove('fa-check-circle');
                document.querySelector(`#grupo__personas .formulario__input-error`).classList.add('formulario__input-error-activo');
                campos.personas = false;
            }
            //Multiplicar la cantidad de personas con el precio
            let productosLSA;
            productosLSA = carro.obtenerProductosLocalStorage();
            var totalPrecio = 0
            productosLSA.forEach(element => {
                var converter = parseInt(element.precio)
                totalPrecio += converter
            });
            if (valorInt > 2) {
                var precioPersona = totalPrecio / 2;
                var newPrecio = precioPersona * valorInt;
                $('.TotalPrecio').html("Total Price: " + newPrecio + "$")
                $('#precioTotalCarrito').val(newPrecio)
            } else {
                $('.TotalPrecio').html("Total Price: " + totalPrecio + "$")
                $('#precioTotalCarrito').val(totalPrecio)
            }
            break;
        case "telefono":
            validarCampo(expresiones.telefono, e.target, 'telefono');
            break;
    }

    if (campos.fecha && campos.personas && campos.telefono) {
        $('.formulario__btn').removeAttr("disabled");
    } else {
        $('.formulario__btn').attr("disabled", "disabled");
    }
}

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

function validar() {
    let productosLSA;
    productosLSA = carro.obtenerProductosLocalStorage();
    if (productosLSA.length === 0) {
        swal({
            type: "error",
            text: "Your shopping cart is empty",
            showConfirmButton: true,
            showConfirmButton: false,
            timer: 1000

        })
        return false;
    }
    var toursCarrito = []
    var arrayCode = []
    productosLSA.forEach(function(producto) {
        toursCarrito.push(producto.titulo);
    })
    productosLSA.forEach(function(code) {
        arrayCode.push(code.code);
    })
    $("#toursCarrito").val(toursCarrito)
    $("#arrayCodeBreaker").val(arrayCode)

    localStorage.clear();
}

// Skip Number
$(".skipNumber").click(function() {

    var numeroWsp = $(this).attr("clienteNumber");
    $("#telefono").css({ "font-weight": "900" })
    $("#telefono").val(numeroWsp);

})