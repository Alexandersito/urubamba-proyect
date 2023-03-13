const carro = new Carrito();
const carrito = document.getElementById('carrito');
const productos = document.getElementById('lista-productos');
const productosTop = document.getElementById('lista-productosTop');
const product = document.getElementById('prom');

const updates = $('.agregar-carrito');

actualizarIconos();
actualizarBoton();
setInterval(actualizarIconos, 50);
setInterval(actualizarBoton, 50);

$(document).on("click", ".agregar-carrito", function (e) {
    const carro = new Carrito();
    carro.comprarProducto(e);
    actualizarPrecio();
})

$(document).on("click", ".borrar-producto", function (e) {
    const carro = new Carrito();
    carro.eliminarProducto(e);
    actualizarPrecio();
})

$(".agregar-carrito-info").click(function (e) {
    const carro = new Carrito();
    carro.comprarProductor(e);
    actualizarPrecio();
})

localStorager();

function localStorager() {
    document.addEventListener('DOMContentLoaded', carro.leerLocalStorage());
}

//Actualizar iconos
function actualizarIconos() {

    //Iconos actualizados cada .5ms
    var contUpdates = []
    let productosLSA;
    productosLSA = carro.obtenerProductosLocalStorage();

    productosLSA.forEach(element => {

        for (var i = 0; i < updates.length; i++) {
            if (element.id === updates[i].getAttribute('data-id')) {
                contUpdates.push(element.id)
            }
        }

    });

    for (var j = 0; j < updates.length; j++) {
        if (contUpdates.includes(updates[j].getAttribute('data-id')) === true) {
            updates[j].classList.remove('fa-plus');
            updates[j].classList.add('fa-check');
            updates[j].style.color = "#25D366";
        } else {
            updates[j].classList.remove('fa-check');
            updates[j].classList.add('fa-plus');
            updates[j].style.color = "white";
        }
    }

    //Contador de tours
    var cantidad = productosLSA.length;

    if (cantidad == 0) {
        $('.contadorTour').html('');
    } else {
        $('.contadorTour').html(cantidad);
    }

    //==============================================
    //              TOTALES EN EL CARRITO
    //==============================================

    //Total Tours
    $('.TotalTours').html("Total tours: " + cantidad)

    //Total Dias
    var totalDias = 0
    productosLSA.forEach(element => {
        var converter = parseInt(element.dias)
        totalDias += converter
    });
    $('.TotalDias').html("Total days: " + totalDias)
    $('#diasTotalCarrito').val(totalDias)

    //Total Precio
    // var totalPrecio = 0
    // productosLSA.forEach(element => {
    //     var converter = parseInt(element.precio)
    //     totalPrecio += converter
    // });
    // $('.TotalPrecio').html("Total Price: " + totalPrecio + "$")
}

function actualizarBoton() {
    var ancla = $('.brahrs a')
    var botonInfo = $('.brahrs a').attr('data-id');
    let productosLSB;
    productosLSB = carro.obtenerProductosLocalStorage();
    productosLSB.forEach(element => {
        if (element.id === botonInfo) {
            ancla[0].classList.remove('btn-success');
            ancla[0].classList.add('btn-secondary');
            $(".agregar-carrito-info").html("The tour is already added");
        }
    });
}

function actualizarPrecio() {
    //Total Precio
    var totalPrecio = 0;
    let productosLSA;
    productosLSA = carro.obtenerProductosLocalStorage();
    productosLSA.forEach(element => {
        var converter = parseInt(element.precio);
        totalPrecio += converter;
    });

    var valorPersonas = parseInt($('#personas').val());
    if (valorPersonas > 2) {
        var precioPersona = totalPrecio / 2;
        var newPrecio = precioPersona * valorPersonas;
        $('.TotalPrecio').html("Total Price: " + newPrecio + "$");
        $('#precioTotalCarrito').val(newPrecio);
    } else {
        $('.TotalPrecio').html("Total Price: " + totalPrecio + "$");
        $('#precioTotalCarrito').val(totalPrecio);
    }
}