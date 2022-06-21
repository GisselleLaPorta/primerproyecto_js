// Clase constructora
class Producto{
    constructor(id, categoria, nombre, talle, precio, img, cantidad){
        this.id = id;
        this.categoria = categoria;
        this.nombre = nombre;
        this.talle = talle;
        this.precio = precio;
        this.img = img;
        this.cantidad = cantidad || 0; 
    }
}

// Variables 
// Array contenedor de los productos
let productos = [];
let compra = [];
let contador = 0; 

// Haciendo petición de mi json
fetch('./data/productos.json').then(
    (response) => {
        const productos2 = response.json();
        return productos2;
    }
).then((producto) => {
    producto.forEach ((pro) => {
        productos.push(new Producto(pro.id, pro.categoria, pro.nombre, pro.talle, pro.precio, pro.img));
    }); 
    mostrarProductos()
})

//Declaración y llamado del 'div HTML' que contendrá los productos
const contenedorProductos = document.getElementById('contenedor__productos');

//Escucha de la función a realizar cuando cargue la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos();   
})


 // Función para pintar los productos en el HTML
function mostrarProductos(){
    // Recorriendo el array productos, creará una etiqueta en el html
    for (const producto of productos) {
        const contenedor = document.createElement('div');
        contenedor.className='card mx-5 mb-4 border border-info border-1 rounded-3'
        contenedor.innerHTML += `
                <img src = "./img/${producto.id}.jpg" class = "mt-3 rounded-3" alt= "${producto.nombre}"/>
                <div class = "card-body">
                    <div class = "text-center fw-bold">
                        <h3>${producto.categoria} ${producto.nombre}</h3>
                    </div>
                    <h3 class = "text-center">'$' ${producto.precio}</h3>
                    <div class = "text-center m-2">
                        <button id="compra${producto.id}" class="btn btn-info fw-bold">Agregar a carrito</button>
                    </div>
                </div>`
        // Declaración del div creado como hijo del contenedor de productos
        contenedorProductos.appendChild(contenedor);
        // Declaración del evento al botón de compra más su función
        document.getElementById(`compra${producto.id}`).addEventListener('click', () => {
            incrementoContador();
            agregarCompra(producto)
        })
    }

}

// Declaración de función contador según productos seleccionados
function incrementoContador() {
    document.getElementById("totalCantidad").innerHTML = ++contador;
}


// Declaración de función de compra
function agregarCompra(productoSeleccionado){
    //uso de librería
    Toastify({
        text: "Agregado al carrito",
        duration: 2000,
        destination: "http://127.0.0.1:5500/3era.Entrega/carrito.html",
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #b3eef0, #fa8fb1)", color: 'black'
        },
        className: 'rounded-3'
    }).showToast();

    // Función búsqueda de la existencia del producto en las compras seleccionadas
    const productoEncontrado = compra.find((producto) => producto.id  === productoSeleccionado.id)
    // Producto en existencia, suma la cantidad
    if(productoEncontrado){
        productoEncontrado.cantidad++
    // Sino agrega por primera vez
    }else{
        let compraProducto = productoSeleccionado
        compraProducto.cantidad++
        compra.push(compraProducto)
    }
    // Guardado de la compra en el LocalStorage
    localStorage.setItem("Contador", contador);
    localStorage.setItem("furiosa", JSON.stringify(compra))
    // Llamado de la función que mostrará la compra en el contenedor asignado
    mostrarCompra(compra);

}

// Función para mostrar compra 
function mostrarCompra(compra) {
    // Recorriendo 'compra', para pintar lo seleccionado en el carrito
    for (const producto of compra) {
        const contenedor = document.createElement('tr'); 
        // Declaración de variable para sacar el precio total de cada selección
        let total = producto.cantidad * producto.precio
        contenedor.innerHTML += `
            <th scope="row"><img src = "./img/${producto.id}.jpg" class = "img__carrito rounded-3" alt= "${producto.nombre}"/></th>
                <td class="text-center">${producto.categoria} 
                    ${producto.nombre}
                </td>
                <td class="text-center">${producto.cantidad}</td>
                <td class="text-center">
                    <label for="talles" class="form-label fw-bold">S / M / L / XL / XXL:</label>
                    <input type="text" class="form-control" id="talles" placeholder="Indique talles">
                </td>
                <td class="text-center"><button id="remover${producto.id}" class="eliminar" style="border:none;"><i class="bi bi-trash"></i></button></td>
                <td class="fw-bold text-center">$ ${total}</td>
            </th>`
        // Declaración del div creado como hijo del tag 'contenedor__carrito' del HTML
        document.getElementById('contenedor__carrito').append(contenedor)
    }
    
}

function contadorEnLocalStorage(){
    let cantidadContador = localStorage.getItem("Contador")
    document.getElementById("totalCantidad").innerHTML = cantidadContador
}


// Almacenamiento en el LocalStorage
function carritoEnLocalStorage(){
    // Nueva variable para guardar lo existente 
    let carro = JSON.parse(localStorage.getItem('furiosa'))
    // Recorrido de la nueva variable y pusheo de lo existente
    if(carro){
        for(let i = 0; i < carro.length; i++){
            compra.push(new Producto(carro[i].id, carro[i].categoria, carro[i].nombre, carro[i].talle, carro[i].precio, carro[i].img, carro[i].cantidad));
        }
    contadorEnLocalStorage();
    }
}

carritoEnLocalStorage();
