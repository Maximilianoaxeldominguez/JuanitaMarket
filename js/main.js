/* -------------------------------------------------------------------------- */
/*                             ARRAY DE PRODUCTOS                             */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                                   CARRITO                                  */
/* -------------------------------------------------------------------------- */


const btnAgregar = document.querySelectorAll('.btnAgregar')
const contenedorCarrito = document.querySelector('.ContenedorCarrito')
let carrito = []
let counter = document.querySelector("#counter")
let btnFinalizarCompra = document.querySelector(".btnFinalizarCompra")


btnAgregar.forEach(btn => {
    btn.addEventListener('click', agregarAlCarrito)
})

btnFinalizarCompra.addEventListener("click", finalizarCompra);


function agregarAlCarrito(e) {
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

    agregarItemAlCarrito(newItem)
}


function agregarItemAlCarrito(newItem) {

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

        tr.querySelector(".buttonDelete").addEventListener('click', eliminarItemDelCarrito)
        tr.querySelector(".inputCantidad").addEventListener('change', sumaCantidad)
    })
    CarritoTotal()
}

function CarritoTotal() {

    let Total = 0;
    const totalCarrito = document.querySelector('.totalCarrito')
    carrito.forEach((item) => {
        const precio = Number(item.precio.replace("$", ''))
        Total = Total + precio * item.cantidad
    })

    totalCarrito.innerHTML = `Total $${Total}`
    addLocalStorage()
    counter.textContent = carrito.length;
}

function eliminarItemDelCarrito(e) {
    const buttonDelete = e.target
    const tr = buttonDelete.closest(".ItemCarrito")
    const title = tr.querySelector('.title').textContent;
    for (let i = 0; i < carrito.length; i++) {

        if (carrito[i].title.trim() === title.trim()) {
            carrito.splice(i, 1)
        }
    }

    const alert = document.querySelector('.remove')

    setTimeout(function () {
        alert.classList.add('remove')
    }, 1000)
    alert.classList.remove('remove')

    tr.remove()
    CarritoTotal()
}

function sumaCantidad(e) {
    const sumaInput = e.target
    const tr = sumaInput.closest(".ItemCarrito")
    const title = tr.querySelector('.title').textContent;
    carrito.forEach(item => {
        if (item.title.trim() === title) {
            sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
            item.cantidad = sumaInput.value;
            CarritoTotal()
        }
    })
}


function addLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function () {
    const storage = JSON.parse(localStorage.getItem('carrito'));
    if (storage) {
        carrito = storage;
        renderCarrito()
    }
}

function finalizarCompra() {

    contenedorCarrito.innerHTML = ``;

    const totalCarrito = document.querySelector('.totalCarrito')
    totalCarrito.innerHTML = `Total $ 0`

    if (carrito.length == 0) {
        Swal.fire(
            'Debe agregar productos al carrito',
            'solucione el problema, y vuelva a intentarlo',
            'error'
        )
    } else {
        Swal.fire(
        'Gracias por tu compra',
        'a la brevedad nos estaremos comunicando',
        'success'
    )}

    carrito = [];
    counter.textContent = carrito.length;

    localStorage.removeItem("carrito")

}


/* -------------------------------------------------------------------------- */
/*                               API DEL TIEMPO                               */
/* -------------------------------------------------------------------------- */

let lon
let lat

let temperaturaValor = document.getElementById("temperaturaValor");
let temperaturaDescripcion = document.getElementById("temperaturaDescripcion");

let ubicacion = document.getElementById("ubicacion");
let iconoAnimadoClima = document.getElementById("iconoAnimadoClima");

let vientoVelocidad = document.getElementById("vientoVelocidad");



window.addEventListener("load", () => {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(posicion => {

            lon = posicion.coords.longitude
            lat = posicion.coords.latitude

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8b1228efc09846e0298d4086a1d0187c&lang=es&units=metric`

            fetch(url)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    let temp = Math.round(data.main.temp)
                    temperaturaValor.textContent = `${temp} ºC`

                    let desc = data.weather[0].description;
                    temperaturaDescripcion.textContent = desc.toUpperCase()

                    ubicacion.textContent = data.name;

                    vientoVelocidad.textContent = `${data.wind.speed} m/s`

                    switch (data.weather[0].main) {
                        case "Clear":
                            iconoAnimadoClima.src = "http://openweathermap.org/img/wn/01d@2x.png"
                            break
                        case "Clouds":
                            iconoAnimadoClima.src = "http://openweathermap.org/img/wn/03d@2x.png"
                            break
                        case "Thunderstorm":
                            iconoAnimadoClima.src = "http://openweathermap.org/img/wn/11d@2x.png"
                            break
                        case "Drizzle":
                            iconoAnimadoClima.src = "http://openweathermap.org/img/wn/09d@2x.png"
                            break
                        case "Rain":
                            iconoAnimadoClima.src = "http://openweathermap.org/img/wn/10d@2x.png"
                            break
                        case "Snow":
                            iconoAnimadoClima.src = "http://openweathermap.org/img/wn/13d@2x.png"
                            break
                        case "atmosphere":
                            iconoAnimadoClima.src = "http://openweathermap.org/img/wn/50d@2x.png"
                            break
                        default:
                            iconoAnimadoClima.src = "http://openweathermap.org/img/wn/01d@2x.png"
                    }

                })
                .catch(error => {
                    console.log(error)
                })
        })
    }
})