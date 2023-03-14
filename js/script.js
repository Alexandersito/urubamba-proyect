var urlPrincipal = $("#urlPrincipal").val();
var urlServidor = $("#urlServidor").val();

//=======================================================================================================================================
//CAMBIO DE COLOR DEL HEADER
//=======================================================================================================================================

var ancho = $(".imagenizando").height()

$(window).scroll(function (event) {

    var scrollTop = $(window).scrollTop();

    if (scrollTop > (ancho - (95 * 2))) {
        $(".header-principal").css({ "background": "white" })
        $(".header-principal").css({ "border-bottom": "1px solid black" })
    } else {
        $(".header-principal").css({ "background": "rgba(100%, 100%, 100%, 35%)" })
        $(".header-principal").css({ "border-bottom": "none" })
    }
});

//=======================================================================================================================================
//NUEVO CARRITO DE COMPRAS
//=======================================================================================================================================
// Busca todos los elementos con la clase 'add-to-cart'
const addToCartBtns = document.querySelectorAll('.add-to-cart');
// Seleccionar la tabla
const tbody = document.querySelector('#lista-carrito tbody');

function obtenerContador() {
    // Recuperar los datos del carrito del local storage
    const objects = JSON.parse(localStorage.getItem('carrito')) || [];

    return objects.length
}

function actualizarContador() {
    if (obtenerContador() == 0) {
        $(".cantidad-carrito").text("")
    } else {
        $(".cantidad-carrito").text(obtenerContador())
    }
}

function obtenerDatosLocalStorage() {
    // Recuperar los datos del carrito del local storage
    const objects = JSON.parse(localStorage.getItem('carrito')) || [];

    return objects
}

//========================================
//AGREGAR PRODUCTO
//========================================

// Agrega un event listener a cada botón
addToCartBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {

        const product = btn.closest('.product');
        const productID = btn.getAttribute('data-id');
        const productName = product.querySelector('.nombre-tour').textContent;
        const productDays = product.querySelector('.dias').textContent;
        const productPrice = product.querySelector('.price').textContent;

        // capturar la ruta de la imagen
        var styleString = product.getAttribute('style');
        // var backgroundImage = styleString.match(/url\(\s*([^)]+)\)/)[1];

        // Buscar la URL de la imagen de fondo usando una expresión regular
        const urlMatch = styleString.match(/url\(['"]?(?:\.\.\/)*([^'"]+)['"]?\)/);

        // Obtener la ruta de la imagen de fondo
        const backgroundImage = urlMatch ? urlMatch[1] : null;

        // Crear el objeto del producto
        const newProduct = {
            id: productID,
            name: productName,
            days: productDays,
            price: productPrice,
            image: backgroundImage
        };

        // Obtener el carrito del Local Storage
        let cart = JSON.parse(localStorage.getItem('carrito')) || [];

        // Verificar si el producto ya se encuentra en el carrito
        const existingProductIndex = cart.findIndex(item => item.id === newProduct.id);
        if (existingProductIndex > -1) {
            // El producto ya existe en el carrito, no se agrega de nuevo
            Swal.fire({
                icon: 'success',
                title: 'ADDED!',
                text: 'Este producto ya está en el carrito',
            });
        } else {
            // Agregar el nuevo producto al carrito
            cart.push(newProduct);

            // Actualizar el Local Storage con el nuevo carrito
            localStorage.setItem('carrito', JSON.stringify(cart));

            // Actualiza el icono de agregar al carrito
            btn.classList.remove('fa-plus');
            btn.classList.add('fa-check');
            btn.style.color = "#25D366";
            //Actualiza el contador
            actualizarContador()

            if (tbody != null) {
                construirCarrito();
            } else {
                console.log("aqui no hay tabla")
            }

        }
    });
});

//========================================
//EJECUTAR AL CARGAR PAGINA
//========================================
document.addEventListener('DOMContentLoaded', function () {

    // Actualizar contador
    actualizarContador()
    //Actualizar Iconos
    actualizarIconos()

});

//========================================
//ACTUALIZAR ICONOS - ESTADOS 
//========================================
function actualizarIconos() {
    // Busca todos los elementos con la clase 'add-to-cart'
    const addToCartBtns = document.querySelectorAll('.add-to-cart');

    // Recuperar los datos del carrito del local storage
    const objects = JSON.parse(localStorage.getItem('carrito')) || [];

    // Función que busca un objeto en la lista por el ID
    function getObjectById(id) {
        return objects.find((obj) => obj.id === id);
    }

    // Recorre los botones y cambia el estado si el producto ya está en el carrito
    addToCartBtns.forEach(function (btn) {
        const productId = btn.getAttribute('data-id');
        console.log(btn.getAttribute('data-id'))

        // Verificar si el producto ya está en el carrito
        const obj = getObjectById(productId);
        if (obj) {
            // Cambiar el icono a un checkmark y el color a verde
            btn.classList.remove('fa-plus');
            btn.classList.add('fa-check');
            btn.style.color = "#25D366";
        } else {
            // Cambiar el icono a un plus y el color a blanco
            btn.classList.remove('fa-check');
            btn.classList.add('fa-plus');
            btn.style.color = "white";
        }
    });
}

//========================================
//CONSTRUIR CARRITO
//========================================
function construirCarrito() {
    const contador = obtenerContador();
    const objects = obtenerDatosLocalStorage();

    for (let i = 0; i < contador; i++) {
        const id = objects[i].id;

        // Verificar si el producto ya está en la tabla
        const filaExistente = tbody.querySelector(`tr[data-id="${id}"]`);

        if (filaExistente) {
            // Actualizar la cantidad y el precio total en la fila existente
            console.log("Ya esta")
        } else {
            // Crear una nueva fila en la tabla
            const fila = document.createElement('tr');
            fila.setAttribute('data-id', id);

            // Agregar el contenido de cada celda usando la estructura que mencionaste
            fila.innerHTML = `
                <td class="py-2 px-1" style="text-align: center;">
                    <div class="tiembla raton" style="display: inline-block; text-align: center; background-image: url(../${objects[i].image}); width: 60px; height: 60px; background-size: cover; background-position: center center; border-radius: 8px; box-shadow: 5px 5px 5px #8d8d8d;"></div>
                </td>
                <td class="fuente6" style="position: relative;">
                    <p class="p-0 m-0 fuente6 absolute centrado text-center" style="font-size: 13px;">${objects[i].name}</p>
                </td>
                <td class="relative fuente6">
                    <p class="absolute centrado fuente6" style="font-size: 13px;">${objects[i].days}</p>
                </td>
                <td class="relative fuente6">
                    <p class="absolute centrado fuente6" style="font-size: 13px;">$${objects[i].price}</p>
                </td>
                <td style="text-align: center;vertical-align: middle;height: 100%;">
                    <i data-id="${id}" class="borrar-producto fas fa-trash-alt  btn btn-danger py-1 px-2 tiembla" style="text-decoration: none;font-size: 15px;display: inline-block;line-height: inherit;"></i>
                </td>
            `;

            // Agregar la fila a la tabla
            tbody.appendChild(fila);
        }
    }
}
construirCarrito();

//========================================
//ELIMINAR PRODUCTO
//========================================
// Agregar event listener a la tabla para detectar clics en botones de eliminar
tbody.addEventListener('click', (e) => {
    if (e.target.classList.contains('borrar-producto')) {

        e.preventDefault();

        // Obtener id del producto
        const id = e.target.getAttribute('data-id');

        // Buscar y eliminar elemento del local storage con ese id
        let objects = obtenerDatosLocalStorage();
        objects = objects.filter(item => item.id !== id);
        localStorage.setItem('carrito', JSON.stringify(objects));

        // Eliminar fila correspondiente de la tabla
        const fila = e.target.parentElement.parentElement;
        tbody.removeChild(fila);

        actualizarIconos()
    }
});



//=======================================================================================================================================
//ANCLAS 2.0
//=======================================================================================================================================
function scrollToElement(elementId) {
    // Obtener la posición del elemento
    var elementPosition = document.getElementById(elementId).offsetTop;

    // Animar el scroll hasta la posición del elemento
    window.scrollTo({
        top: elementPosition - 100,
        behavior: "smooth"
    });
}

//=======================================================================================================================================
//TESTIMONIOS ANIMACION
//=======================================================================================================================================
var testimonios = $(".item-testimonials")
var testi = $(".item-testimonials .el-testimonio")
$(".item-testimonials").click(function () {
    var actual = $(this)
    var hijoItemTesti = $(this).children("div").children("div")
    $(this).css({ "transform": "rotateY(180deg)" })
    $(hijoItemTesti).css({ "display": "block" })

    setTimeout(function () {
        actual.css({ "transform": "rotateY(0deg)" })
        $(hijoItemTesti).css({ "display": "none" })
    }, 10000);

});

$('.myTours').click(function () {
    $('.contendorResers').toggle();
});

//=======================================================================================================================================
//ANIMACION DEL BOTON CARRITO DE COMPRAS - INFO
//=======================================================================================================================================
document.getElementById("miBoton").addEventListener("click", function () {
    var boton = document.getElementById("miBoton");
    var ancho = boton.offsetWidth; //Obtener el ancho del botón
    boton.style.backgroundColor = "purple";
    boton.style.color = "white";
    boton.style.width = ancho + "px"; //Establecer el ancho del botón
    boton.textContent = "¡ADDED!";
    boton.style.transition = "background-color 1s ease, color 1s ease";
});

