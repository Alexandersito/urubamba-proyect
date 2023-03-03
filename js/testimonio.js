/*=============================================
ARRASTRAR VARIAS IMAGENES GALERÍA
=============================================*/

var archivosTemporales = [];

$(".subirGaleria").on("dragenter", function(e) {

    e.preventDefault();
    e.stopPropagation();

    $(".subirGaleria").css({ "background": "url(../backend/vistas/img/plantilla/pattern.jpg)" })

})

$(".subirGaleria").on("dragleave", function(e) {

    e.preventDefault();
    e.stopPropagation();

    $(".subirGaleria").css({ "background": "" })

})

$(".subirGaleria").on("dragover", function(e) {

    e.preventDefault();
    e.stopPropagation();

})

$("#galeria").change(function() {

    var archivos = this.files;

    multiplesArchivos(archivos);

})

$(".subirGaleria").on("drop", function(e) {

    e.preventDefault();
    e.stopPropagation();

    $(".subirGaleria").css({ "background": "" })

    var archivos = e.originalEvent.dataTransfer.files;

    multiplesArchivos(archivos);

})

function multiplesArchivos(archivos) {

    if (archivos.length > 1) {

        swal({
            title: "Image upload error",
            text: "¡Just one picture!",
            type: "error",
            confirmButtonText: "¡Close!"
        });

    } else {

        for (var i = 0; i < archivos.length; i++) {

            var imagen = archivos[i];

            if (imagen["type"] != "image/jpeg") {

                swal({
                    title: "Image upload error",
                    text: "¡The image must be in JPG format!",
                    type: "error",
                    confirmButtonText: "¡Close!"
                });

                return;

            } else if (imagen["size"] > 2000000) {

                swal({
                    title: "Image upload error",
                    text: "¡The image should not be larger than 2MB. You can compress it on some image compression website to reduce its weight!",
                    type: "error",
                    confirmButtonText: "¡Close!"
                });

                return;

            } else {

                var datosImagen = new FileReader;
                datosImagen.readAsDataURL(imagen);

                $(datosImagen).on("load", function(event) {

                    var rutaImagen = event.target.result;

                    $(".vistaGaleria").append(`
    
                        <li class="col-12 col-md-6 col-lg-3 card px-3 rounded-0 shadow-none innerListBlock">
                          
                            <img class="card-img-top" src="` + rutaImagen + `">
    
                            <div class="card-img-overlay p-0 pr-3">
                              
                               <button class="btn btn-danger btn-sm float-right shadow-sm quitarFotoNueva" temporal>
                                 
                                 <i class="fas fa-times"></i>
    
                               </button>
    
                            </div>
    
                        </li>
    
                      `)


                    if (archivosTemporales.length != 0) {

                        archivosTemporales = JSON.parse($(".inputNuevaGaleria").val());

                    }

                    archivosTemporales.push(rutaImagen);

                    $(".inputNuevaGaleria").val(JSON.stringify(archivosTemporales))

                })

                var blockAndNone = $('.innerListBlock')
                if (blockAndNone) {
                    $('.subirGaleria').css({ "display": "none" })
                } else {
                    $('.subirGaleria').css({ "display": "block" })
                }


            }

        }
    }
}



/*=============================================
QUITAR IMAGEN DE LA GALERÍA
=============================================*/

$(document).on("click", ".quitarFotoNueva", function() {

    var listaFotosNuevas = $(".quitarFotoNueva");

    var listaTemporales = JSON.parse($(".inputNuevaGaleria").val());

    for (var i = 0; i < listaFotosNuevas.length; i++) {

        $(listaFotosNuevas[i]).attr("temporal", listaTemporales[i]);

        var quitarImagen = $(this).attr("temporal");

        if (quitarImagen == listaTemporales[i]) {

            listaTemporales.splice(i, 1);

            $(".inputNuevaGaleria").val(JSON.stringify(listaTemporales));

            $(this).parent().parent().remove();

        }

    }

    $('.subirGaleria').css({ "display": "block" })

})

/*=============================================
GUARDAR TESTIMONIO
=============================================*/

$(".guardarTestimonio").click(function() {

    var idUser = $('.userId').val();
    var testimonio = $("#comment").val();
    var link = $("#sel1").val();
    var img = $(".inputNuevaGaleria").val();

    if (link == null) {

        swal({
            title: "Save failed",
            text: "The 'Link' field cannot be empty",
            type: "error",
            confirmButtonText: "¡Close!"
        });

        return;

    } else if (testimonio == "") {

        swal({
            title: "Save failed",
            text: "The 'Testimony' field cannot be empty",
            type: "error",
            confirmButtonText: "¡Close!"
        });

        return;

    } else if (testimonio.length > 385) {

        swal({
            title: "Save failed",
            text: "The 'Testimony' field is very long",
            type: "error",
            confirmButtonText: "¡Close!"
        });

        return;

    } else if (img == "") {

        swal({
            title: "Save failed",
            text: "The 'img' field cannot be empty",
            type: "error",
            confirmButtonText: "¡Close!"
        });

        return;

    } else {

        var datos = new FormData();
        datos.append("id", idUser);
        datos.append("img", img);
        datos.append("tour", link);
        datos.append("contenido", testimonio);

        $.ajax({

            url: "../ajax/testimonios.ajax.php",
            method: "POST",
            data: datos,
            cache: false,
            contentType: false,
            processData: false,

            success: function(respuesta) {
                console.log(respuesta);
                if (respuesta == "ok") {

                    swal({
                        type: "success",
                        title: "NICE!",
                        text: "¡The testimony has been saved successfully!",
                        showConfirmButton: true,
                        confirmButtonText: "OK"

                    }).then(function(result) {

                        if (result.value) {

                            window.location = "../user";

                        }
                        window.location = "../user";
                    });

                }

            }

        })


    }

})