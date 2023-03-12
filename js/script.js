var urlPrincipal = $("#urlPrincipal").val();
var urlServidor = $("#urlServidor").val();

// =============================================

function addToCart(productId) {
    var product = document.getElementById(productId);
    var productName = product.querySelector('h2').innerText;
    var productPrice = product.querySelector('.price').innerText;
    var productImage = product.querySelector('img').src;

    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Verificar si el producto ya existe en el carrito
    var productExists = cart.some(function (item) {
        return item.name === productName;
    });
    if (!productExists) {
        cart.push({ id: productId, name: productName, price: productPrice, image: productImage });
        localStorage.setItem('cart', JSON.stringify(cart));
        actualizarBoton()
    } else {
        Swal.fire({
            icon: 'success',
            title: 'ADDED',
            text: 'Ya se añadió al carrito',
        });
    }
}

function actualizarBoton() {
    // agrupar todos los div de los productos
    const agruparProductos = $('.product')
    // console.log(agruparProductos.eq(1).data('id'))

    // Obtener todos los objetos del LocalStorage
    const objects = JSON.parse(localStorage.getItem("cart"));

    // Recorrer los objetos y buscar el que tenga el nombre "Leche"
    let objetoEncontrado;
    for (let i = 1; i <= objects.length + 1; i++) {

        if (objects.find(obj => obj.id === `${i}`)) {
            agruparProductos.eq(i - 1).find(".add-to-cart").text("Agregado")
        }

    }
}
actualizarBoton()


// =============================================
// =============================================

// =============================================
// CAMBIO DE COLOR DEL HEADER
// =============================================

var ancho = $(".imagenizando").height()
console.log("ancho " + ancho);

$(window).scroll(function (event) {

    var scrollTop = $(window).scrollTop();
    console.log("Vertical " + scrollTop);

    if (scrollTop > (ancho - (95 * 2))) {
        $(".header-principal").css({ "background": "white" })
        $(".header-principal").css({ "border-bottom": "1px solid black" })
    } else {
        $(".header-principal").css({ "background": "rgba(100%, 100%, 100%, 35%)" })
        $(".header-principal").css({ "border-bottom": "none" })
    }
});


// =============================================
// TIRANDO ANCLAS
// =============================================
// Anclas del header
$(".headersito .agora a").click(function (e) {

    e.preventDefault();

    var vinculo = $(this).attr("href");

    $("html, body").animate({

        scrollTop: $(vinculo).offset().top - 95

    }, 700)

})

// Anclas top
$(".ancla-top  a").click(function (e) {

    // e.preventDefault();

    var vinculo = $(this).attr("href");

    $("html, body").animate({

        scrollTop: $(vinculo).offset().top - 95

    }, 700)

})

// =============================================
// TESTIMONIOS ANIMACION
// =============================================
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

})


$('.myTours').click(function () {
    $('.contendorResers').toggle();
})

//===============================================
// ANIMACION DEL BOTON DEL CARRITO DE COMPRAS
//===============================================
document.getElementById("miBoton").addEventListener("click", function () {
    var boton = document.getElementById("miBoton");
    var ancho = boton.offsetWidth; //Obtener el ancho del botón
    boton.style.backgroundColor = "purple";
    boton.style.color = "white";
    boton.style.width = ancho + "px"; //Establecer el ancho del botón
    boton.textContent = "¡ADDED!";
    boton.style.transition = "background-color 1s ease, color 1s ease";
});
