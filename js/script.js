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
//CARRITO DE COMPRAS CON LOCAL STORAGE
//=======================================================================================================================================

//========================================
//AGREGADO PRODUCTOS AL LOCAL STORAGE
//========================================
function addToCart(productId) {
    var product = document.getElementById(productId);
    var productName = product.querySelector('.nombre-tour').innerText;
    var productPrice = product.querySelector('.price').innerText;
    var productDias = product.querySelector('.dias').innerText;

    // capturar la ruta de la imagen
    var styleString = product.getAttribute('style');
    var backgroundImage = styleString.match(/url\(\s*([^)]+)\)/)[1];

    var carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Verificar si el producto ya existe en el carrito
    var productExists = carrito.some(function (item) {
        return item.name === productName;
    });
    if (!productExists) {
        carrito.push({ id: productId, name: productName, price: productPrice, dias: productDias, image: backgroundImage });
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarBoton()
    } else {
        Swal.fire({
            icon: 'success',
            title: 'ADDED',
            text: 'Ya se añadió al carrito',
        });
    }
}

//========================================
//CAMBIANDO ESTADO DE BOTONES (AGREGADO)
//========================================
function actualizarBoton() {
    // agrupar todos los div de los productos
    const agruparBotones = $('.add-to-cart')

    // Obtener todos los objetos del LocalStorage
    const objects = JSON.parse(localStorage.getItem("carrito"));

    if (Array.isArray(objects)) {

        // Actualizar contador del carrito
        const cantidadCarrito = document.querySelector('.cantidad-carrito');
        if (objects.length == 0) {
            cantidadCarrito.textContent = ""
        } else {
            cantidadCarrito.textContent = objects.length;
        }

        for (let i = 0; i < objects.length; i++) {

            for (let j = 0; j < agruparBotones.length; j++) {

                if (objects[i].id == agruparBotones[j].getAttribute("data-id")) {
                    var ancho = agruparBotones[j].offsetWidth
                    agruparBotones[j].style.transition = "1s all";
                    agruparBotones[j].style.animation = "shake 1s";
                    agruparBotones[j].classList.remove('fa-plus');
                    agruparBotones[j].classList.add('fa-check');
                    agruparBotones[j].style.color = "#25D366";
                    agruparBotones[j].style.width = ancho + "px"
                }
            }
        }
    } else {
        console.log("localstorage empty")
    }
}

document.addEventListener("DOMContentLoaded", function () {
    actualizarBoton();
});

//========================================
//INSERTAR DEL LOCALSTORAGE AL CARRITO (HTML)
//========================================

// Obteniendo la tabla
const listaProductos = document.querySelector('#lista-carrito tbody');

function insertandoAlCarrito() {
    // Obtener todos los objetos del LocalStorage
    const objects = JSON.parse(localStorage.getItem("carrito"));

    if (Array.isArray(objects)) {
        let lastIndex = listaProductos.rows.length - 1; // índice del último elemento que se agregó a la tabla

        // Agregar solo los elementos que no se han agregado previamente
        for (let i = lastIndex + 1; i < objects.length; i++) {
            //Construir plantilla
            const row = document.createElement("tr");
            row.innerHTML = `
      <td class="py-2 px-1" style="text-align: center;">
          <div style="display: inline-block; text-align: center; background-image: url(../${objects[i].image}); width: 60px; height: 60px; background-size: cover; background-position: center center; border-radius: 8px; box-shadow: 5px 5px 5px #8d8d8d;">
          </div>
      </td>

      <td class="fuente6" style="position: relative;">
          <p class="p-0 m-0 fuente6 absolute centrado text-center" style="font-size: 13px;">${objects[i].name}</p>
      </td>

      <td class="relative fuente6">
          <p class="absolute centrado fuente6" style="font-size: 13px;">${objects[i].dias}</p>
      </td>

      <td class="relative fuente6">
          <p class="absolute centrado fuente6" style="font-size: 13px;">${objects[i].price}$</p>
      </td>

      <td class="relative">
          <a href="" data-id="${objects[i].id}" class="borrar-producto fas fa-trash-alt absolute centrado btn btn-danger py-1 px-2" style="text-decoration: none;font-size: 15px;">
          </a>
      </td>
      `;

            listaProductos.appendChild(row);
        }

        // Actualizar el valor de lastIndex
        lastIndex = objects.length - 1;
    } else {
        console.log("localstorage empty")
    }
}

document.addEventListener("DOMContentLoaded", function () {

    insertandoAlCarrito()

    //========================================
    //ELIMINANDO UN ELEMENTO DEL CARRITO Y DEL LOCAL STORAGE
    //========================================

    // Obtener todos los elementos con la clase .borrar-producto
    const botonesBorrar = document.querySelectorAll('.borrar-producto');

    // Iterar por todos los elementos y agregar un evento click
    botonesBorrar.forEach(boton => {
        boton.addEventListener('click', e => {
            // Prevenir el comportamiento por defecto del enlace
            e.preventDefault();

            // Obtener el valor del atributo data-id
            const dataId = boton.getAttribute('data-id');

            // Obtener el array de objetos almacenados en el localStorage
            const objetos = JSON.parse(localStorage.getItem('carrito'));

            // Encontrar el objeto que se desea eliminar y obtener su índice en el array
            const indiceAEliminar = objetos.findIndex(obj => obj.id === dataId);

            // Verificar si se encontró el objeto y eliminarlo del array
            if (indiceAEliminar !== -1) {
                objetos.splice(indiceAEliminar, 1);

                // Actualizar el localStorage con el nuevo array sin el objeto eliminado
                localStorage.setItem('carrito', JSON.stringify(objetos));

                const fila = boton.closest('tr');
                fila.remove();
            }
        });
    });
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

