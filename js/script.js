var urlPrincipal = $("#urlPrincipal").val();
var urlServidor = $("#urlServidor").val();
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




