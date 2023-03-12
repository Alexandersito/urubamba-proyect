jQuery(document).ready(function ($) {
    $('#WABoton').floatingWhatsApp({
        phone: '+51984510591', // Número WhatsApp Business 
        popupMessage: 'Hi 👋 how can we help you?', // Mensaje pop up
        message: "", // Mensaje por defecto
        showPopup: true, // Habilita el pop up
        headerTitle: 'WhatsApp Chat', // Título del header
        headerColor: '#25D366', // Color del header 
        buttonImage: '<img src="https://rawcdn.githack.com/rafaelbotazini/floating-whatsapp/3d18b26d5c7d430a1ab0b664f8ca6b69014aed68/whatsapp.svg" />', // Icono WhatsApp
        size: '50px', // Tamaño del icono
        // backgroundColor: '#00000', // Color de fondo del botón
        position: "right", // Posición del icono
        avatar: 'https://localhost/urubambaTours/vista/img/Logo Puma.png', // URL imagen avatar
        avatarName: 'Support', // Nombre del avatar
        avatarRole: 'Urubamba Tours', // Rol del avatar
        // autoOpenTimeout: 1000,
        zIndex: '99999',
    });
});

// ==================================================================================================================
//                                                  CODE TO SHOOPING CART
//===================================================================================================================

class Carrito {

    //Añadir producto al carrito
    comprarProducto(e) {
        e.preventDefault();
        //Delegado para agregar al carrito
        const producto = e.target.parentElement.parentElement.parentElement;
        //Enviamos el producto seleccionado para tomar sus datos
        this.leerDatosProducto(producto);
    }

    //Añadir producto al carrito
    comprarProductor(e) {
        e.preventDefault();
        //Delegado para agregar al carrito
        const producto = e.target;
        //Enviamos el producto seleccionado para tomar sus datos
        this.leerDatosProductor(producto);

    }

    //Leer datos del producto
    leerDatosProductor(producto) {
        const infoProducto = {
            img: producto.getAttribute('data-img'),
            titulo: producto.getAttribute('data-titulo'),
            dias: producto.getAttribute('data-dias'),
            precio: producto.getAttribute('data-precio'),
            code: producto.getAttribute('data-code'),
            id: producto.getAttribute('data-id'),
            cantidad: 1
        }

        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (productoLS) {
            if (productoLS.id === infoProducto.id) {
                productosLS = productoLS.id;
            }
        });

        if (productosLS === infoProducto.id) {
            swal({
                type: 'info',
                title: 'The tour is already added',
                showConfirmButton: false,
                timer: 1000
            })
        } else {
            this.insertarCarrito(infoProducto);
        }
    }

    //Leer datos del producto
    leerDatosProducto(producto) {
        const infoProducto = {
            img: producto.querySelector('.agregar-carrito').getAttribute('data-img'),
            titulo: producto.querySelector('.titulo-tour').textContent,
            dias: producto.querySelector('.dias-tour').textContent,
            precio: producto.querySelector('.precio-tour').textContent,
            code: producto.querySelector('.agregar-carrito').getAttribute('data-code'),
            id: producto.querySelector('.agregar-carrito').getAttribute('data-id'),
            cantidad: 1
        }
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (productoLS) {
            if (productoLS.id === infoProducto.id) {
                productosLS = productoLS.id;
            }
        });

        if (productosLS === infoProducto.id) {
            swal({
                type: 'info',
                title: 'The tour is already added',
                showConfirmButton: false,
                timer: 1000
            })
        } else {
            this.insertarCarrito(infoProducto);
        }
    }

    insertarCarrito(producto) {
        this.guardarProductosLocalStorage(producto);
        const row = document.createElement('tr');
        row.innerHTML = `
        
            <td class=" py-2 px-1">
                <div class="" style="background-image: url(${producto.img});width: 60px;height: 60px;background-size: cover;background-position: center center;border-radius: 8px; box-shadow: 5px 5px 5px #8d8d8d;">
                </div>
            </td>

            <td class="fuente6" style="position: relative;">
                <p class="p-0 m-0 fuente6 absolute centrado text-center" style="font-size: 13px;">${producto.titulo}</p>
            </td>

            <td class="relative fuente6">
                <p class="absolute centrado fuente6" style="font-size: 13px;">${producto.dias}</p>
            </td>

            <td class="relative fuente6">
                <p class="absolute centrado fuente6" style="font-size: 13px;">${producto.precio}$</p>
            </td>

            <td class="relative">
                <a href="" data-id="${producto.id}" class="borrar-producto fas fa-trash-alt absolute centrado btn btn-danger py-1 px-2" style="text-decoration: none;font-size: 15px;">
                </a>
            </td>
        
            `;
        listaProductos.appendChild(row);
    }

    //Eliminar el producto del carrito en el DOM
    eliminarProducto(e) {
        e.preventDefault();
        let producto, productoID;
        if (e.target.classList.contains('borrar-producto')) {
            e.target.parentElement.parentElement.remove();
            producto = e.target.parentElement.parentElement;
            productoID = producto.querySelector('a').getAttribute('data-id');
        }
        this.eliminarProductoLocalStorage(productoID);
        //this.calcularTotal();

    }

    //Almacenar en el LS
    guardarProductosLocalStorage(producto) {
        let productos;
        //Toma valor de un arreglo con datos del LS
        productos = this.obtenerProductosLocalStorage();
        //Agregar el producto al carrito
        productos.push(producto);
        //Agregamos al LS
        localStorage.setItem('productos', JSON.stringify(productos));
    }

    //Comprobar que hay elementos en el LS
    obtenerProductosLocalStorage() {
        let productoLS;
        //Comprobar si hay algo en LS
        if (localStorage.getItem('productos') === null) {
            productoLS = [];
        } else {
            productoLS = JSON.parse(localStorage.getItem('productos'));
        }
        return productoLS;
    }

    //Eliminar producto por ID del LS
    eliminarProductoLocalStorage(productoID) {
        let productosLS;
        //Obtenemos el arreglo de productos
        productosLS = this.obtenerProductosLocalStorage();
        //Comparar el id del producto borrado con LS
        productosLS.forEach(function (productoLS, index) {
            if (productoLS.id === productoID) {
                productosLS.splice(index, 1);
            }
        });

        //Añadimos el arreglo actual al LS
        localStorage.setItem('productos', JSON.stringify(productosLS));
    }

    //Mostrar los productos guardados en el LS
    leerLocalStorage() {
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (producto) {
            //Construir plantilla
            const row = document.createElement('tr');
            row.innerHTML = `
        
            <td class=" py-2 px-1">
                <div class="" style="background-image: url(${producto.img});width: 60px;height: 60px;background-size: cover;background-position: center center;border-radius: 8px; box-shadow: 5px 5px 5px #8d8d8d;">
                </div>
            </td>

            <td class="fuente6" style="position: relative;">
                <p class="p-0 m-0 fuente6 absolute centrado text-center" style="font-size: 13px;">${producto.titulo}</p>
            </td>

            <td class="relative fuente6">
                <p class="absolute centrado fuente6" style="font-size: 13px;">${producto.dias}</p>
            </td>

            <td class="relative fuente6">
                <p class="absolute centrado fuente6" style="font-size: 13px;">${producto.precio}$</p>
            </td>

            <td class="relative">
                <a href="" data-id="${producto.id}" class="borrar-producto fas fa-trash-alt absolute centrado btn btn-danger py-1 px-2" style="text-decoration: none;font-size: 15px;">
                </a>
            </td>
        
            `;
            listaProductos.appendChild(row);
        });
    }
}

//===============================================
// RESERVAR - SWEET ALERT
//===============================================
document.getElementById("reservar").addEventListener("click", function () {
    Swal.fire({
        icon: 'success',
        title: 'Reserva exitosa',
        text: 'Se ha completado la operación con éxito.',
    });
});




