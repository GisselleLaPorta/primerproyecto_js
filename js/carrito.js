// Variable para guardar carrito
let dataCompra = localStorage.getItem("furiosa"); 

// Transformando carrito a JSON
if(dataCompra) dataCompra = JSON.parse(dataCompra);

//Escucha de la función a realizar al cargar la página
document.addEventListener('DOMContentLoaded', () =>{
    mostrarDataCompra(dataCompra);
})

// Función para mostrar el carrito
function mostrarDataCompra(dataCompra){
    // Si se seleccionaron productos, creará en el contenedor una etiqueta por cada producto
    if(dataCompra){
        // Llamada de función para que no duplique los productos
        limpiarHTML('compra');
        for (const data of dataCompra) {

            // Declaración de variable para sacar el precio total de cada selección
            let total = data.cantidad * data.precio
            
            const contenedorCarrito = document.createElement('tr');
            contenedorCarrito.innerHTML += `
                        <th scope="row"><img src = "./img/${data.id}.jpg" class = "img__carrito rounded-3" alt= "${data.nombre}"/></th>
                            <td class="text-center">${data.categoria} 
                                ${data.nombre}
                            </td>
                            <td class="text-center">${data.cantidad}</td>
                            <td class="text-center">
                                <label for="talles" class="form-label fw-bold">S / M / L / XL / XXL:</label>
                                <input type="text" class="form-control" id="talles" placeholder="Indique talles">
                            </td>
                            <td class="text-center"><button id="remover${data.id}" class="eliminar" style="border:none;"><i class="bi bi-trash"></i></button></td>
                            <td class="fw-bold text-center">$ ${total}</td>
                        </th>
        `
        // Declaración del contenedor creado como hijo del tag 'contenedor__carrito'
        document.getElementById("contenedor__carrito").appendChild(contenedorCarrito);
        }
        
        // Llamada de función que evita pintar repetidamente el 'totalAPagar', al seleccionar más productos
        limpiarHTML();
        // Función reductora para calcular el 'totalAPagar'
        const totalTotal = dataCompra.reduce((acc,el)=> acc + (el.precio * el.cantidad),0)
        // Agregando la nueva variable al div contenedor HTML
        document.getElementById('totalAPagar').append(
            `TOTAL A PAGAR: $ ${totalTotal}`
        )

        // Llamada de función para eliminar cada producto
        eliminarProducto(); 
    
    // Si no seleccionaron productos, se indicará que no hay productos en el carrito
    }else{
        document.getElementById('contenedor__carrito').append(`No hay productos en el carrito`)
    } 

    // Guardado del carrito en el LocalStorage
    localStorage.setItem("furiosa", JSON.stringify(dataCompra))
}

// Función para eliminar productos
function eliminarProducto() {

        // Carga de todos los botones de eliminar
        let botones = document.getElementsByClassName("eliminar");
    
        // A cada botón se le asigna el evento click
        for(const boton of botones) {
            // Declaración del evento a cada botón de eliminar más su función
            boton.onclick = () => {
                let id = boton.getAttribute("id");
                idNumber = id.split("_")[1]
                dataCompra.splice(idNumber, 1)
                
                mostrarDataCompra(dataCompra);              

            }
        }
        // Eliminando lo guardado en el localStorage
        localStorage.removeItem("furiosa");
}

// Función para evitar repetición de los productos seleccionados en el carrito
// Reusada para evitarlo al pintar el totalAPagar
function limpiarHTML(dondeBorrar) {
    dondeBorrar === 'compra' ? document.getElementById('contenedor__carrito').innerHTML = '' : document.getElementById('totalAPagar').innerHTML = ''
}

// Función para capturar los datos del formulario y mostrarlos en un modal usando una librería
function datosFormulario(){

    let nombreCliente = document.getElementById('nombre');
    let mailCliente = document.getElementById('email');
    let direccionCliente = document.getElementById('direccion');
    let btn = document.getElementById(`btnCompra`); 
    console.log(nombreCliente.value, mailCliente.value, direccionCliente.value)
    btn.addEventListener('click', () => {
        Swal.fire({
            title: `¡Gracias por tu compra!`,
            text: `${nombreCliente.value}, la enviaremos a: ${direccionCliente.value} / Tu factura a: ${mailCliente.value}`,
            icon: 'success',
            confirmButtonText: 'OK'
        })
    })

}