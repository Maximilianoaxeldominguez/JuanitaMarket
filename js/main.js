//***************************************** ARRAY PRODUCTOS MAS ELEGIDOS******************************************* *//

let productosMasElegidos = [{
        id: 1,
        nombre: "ESCURRIDOR DE CUBIERTOS TINY",
        precio: 1370,
        imagen: "img/Cocina/1.jpeg",
    },
    {
        id: 2,
        nombre: "PORTA ESPONJA SIMPLE KOLL",
        precio: 345,
        imagen: "img/Cocina/2.jpeg",
    },
    {
        id: 3,
        nombre: "ADAPTADOR DE CANILLA ANTI SPLASH",
        precio: 530,
        imagen: "img/Cocina/3.jpeg",
    },
    {
        id: 4,
        nombre: "MOLDE DE HUEVO",
        precio: 390,
        imagen: "img/Cocina/4.jpeg",
    },
    {
        id: 5,
        nombre: "ESTANTE ORGANIZADOR COLGANTE ULTRA",
        precio: 2310,
        imagen: "img/Cocina/5.jpeg",
    },
    {
        id: 6,
        nombre: "PLATO BAMBU GATITO KIDS",
        precio: 460,
        imagen: "img/Cocina/6.jpeg",
    },
    {
        id: 7,
        nombre: "VIRULANA PARA LIMPIEZA",
        precio: 320,
        imagen: "img/Cocina/7.jpeg",
    },
    {
        id: 8,
        nombre: "KIT DE ESPONJAS",
        precio: 590,
        imagen: "img/Cocina/8.jpeg",
    },
    {
        id: 9,
        nombre: "PISA PAPA BLACK",
        precio: 330,
        imagen: "img/Cocina/9.jpeg",
    },
    {
        id: 10,
        nombre: "ESCURRIDOR DE CUBIERTOS LULU",
        precio: 1520,
        imagen: "img/Cocina/10.jpeg",
    },
    {
        id: 11,
        nombre: "PLATO HELICOPTERO",
        precio: 710,
        imagen: "img/Cocina/11.jpeg",
    },
    {
        id: 12,
        nombre: "CEPILLO DE LIMPIEZA TRIANGULAR",
        precio: 450,
        imagen: "img/Cocina/12.jpeg",
    },
];

const contenedor = document.getElementById("container");

productosMasElegidos.forEach((producto) => {

    let card = document.createElement("div");

    card.classList.add("containerProductos");

    card.innerHTML = `
    <img class="imagenProducto" src="${producto.imagen}"  alt="...">
    <div class="detalleProducto" >
      <h5 class="nombreProducto">${producto.nombre}</h5>
      <p class="precioProducto">$ ${producto.precio}</p>
      <a href="#cart" class="btn btn-primary btnAgregar" >Agregar al carrito</a>
    </div>
      `;
    contenedor.appendChild(card);
});

//* CARRITOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO //*


const Clickbutton = document.querySelectorAll('.btnAgregar')
const contenedorCarrito = document.querySelector('.ContenedorCarrito')
let carrito = []
let counter = document.querySelector("#counter")

Clickbutton.forEach(btn => {
    btn.addEventListener('click', addToCarritoItem)
})


function addToCarritoItem(e) {
    const button = e.target
    const item = button.closest('.containerProductos')
    const itemTitle = item.querySelector('.nombreProducto').textContent;
    const itemPrice = item.querySelector('.precioProducto').textContent;
    const itemImg = item.querySelector('.imagenProducto').src;

    const newItem = {
        title: itemTitle,
        precio: itemPrice,
        img: itemImg,
        cantidad: 1
    }

    addItemCarrito(newItem)
}


function addItemCarrito(newItem) {

    const alert = document.querySelector('.alert')

    setTimeout(function () {
        alert.classList.add('hide')
    }, 1000)
    alert.classList.remove('hide')

    const InputElemnto = contenedorCarrito.getElementsByClassName('inputCantidad')
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].title.trim() === newItem.title.trim()) {
            carrito[i].cantidad++;
            const inputValue = InputElemnto[i]
            inputValue.value++;
            CarritoTotal()
            return null;
        }
    }

    carrito.push(newItem)

    renderCarrito()
}


function renderCarrito() {

    contenedorCarrito.innerHTML = ''
    carrito.map(item => {
        const tr = document.createElement('tr')
        tr.classList.add('ItemCarrito')

        const Content = `
        <td class="tdImg"><img src=${item.img}  alt="" class="tdImg" width="65px" height="65px"></td>
        <td><h6 class="title">${item.title}</h6></td>
        <td class="tdPrecio"><p>${item.precio}</p></td>
        <td class="tdCantidad"><input type="number" min="1" value=${item.cantidad} class="inputCantidad"></td>
        <td><button class="delete btn btn-danger buttonDelete">x</button></td>
    `

        tr.innerHTML = Content;
        contenedorCarrito.append(tr)

         tr.querySelector(".buttonDelete").addEventListener('click', removeItemCarrito) 
    })
       CarritoTotal() 
}

 function CarritoTotal(){

  let Total = 0;
  const shoppingCartTotal = document.querySelector('.shoppingCartTotal')
  carrito.forEach((item) => {
    const precio = Number(item.precio.replace("$", ''))
    Total = Total + precio*item.cantidad
  })

  shoppingCartTotal.innerHTML = `Total $${Total}`
   addLocalStorage()
   counter.textContent = carrito.length;
}

function removeItemCarrito(e){
  const buttonDelete = e.target
  const tr = buttonDelete.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  for(let i=0; i<carrito.length ; i++){

    if(carrito[i].title.trim() === title.trim()){
      carrito.splice(i, 1)
    }
  }

  const alert = document.querySelector('.remove')

  setTimeout( function(){
    alert.classList.add('remove')
  }, 1000)
    alert.classList.remove('remove')

  tr.remove()
  CarritoTotal()
} 


 function addLocalStorage(){
  localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function(){
  const storage = JSON.parse(localStorage.getItem('carrito'));
  if(storage){
    carrito = storage;
    renderCarrito()
  }
}  
 