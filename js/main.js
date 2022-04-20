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
      <a href="#cart" class="btn btn-primary btnComprar addToCart" >Agregar al carrito</a>
    </div>
      `;
    contenedor.appendChild(card);
});

//* CARRITOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO //*


const agregarCarrito = document.querySelectorAll(".addToCart")

agregarCarrito.forEach(addToCartButton => {
    addToCartButton.addEventListener("click", addToCartClicked);
});

const comprarButton = document.querySelector(".btnFinalizarCompra")
comprarButton.addEventListener("click", comprarButtonclicked)

const shoopingCartItemContainer = document.getElementById("ContenedorCarrito") /** Selecciono en donde quiero ubicar el carrito */

function addToCartClicked(e) {
    const button = e.target; /** capturar el target del event*/
    const item = button.closest(".containerProductos") /** el elemento mas cercano de la clase es lo que quiero */

    const itemTitle = item.querySelector(".nombreProducto").textContent; /** capturo el elemento, y quiero que me devuelva el dato que necesito del producto */
    const itemPrice = item.querySelector(".precioProducto").textContent;
    const itemImg = item.querySelector(".imagenProducto").src;

    addItemToShoppingCart(itemTitle, itemPrice, itemImg)

}

function addItemToShoppingCart(itemTitle, itemPrice, itemImg, ) {

const elementsTitle = shoopingCartItemContainer.getElementsByClassName("shoppingCartItemTitle")

    for (let i = 0; i < elementsTitle.length; i++) {
        if (elementsTitle[i].innerText === itemTitle){
       let elementQuantity =  elementsTitle[i].parentElement.parentElement.parentElement.querySelector(".inputCantidad");
       elementQuantity.value++;
       updateShoppingCartTotal();
       return;
   }
    }


    const shoppingCartRow = document.createElement("tr");
    shoppingCartRow.classList.add('ItemCarrito')
    const shopingCartContent = `
    <td class="tdImg"><img src="${itemImg}" class="tdImg" width="65px" height="65px" alt=""></td>
    <td class="shoppingCartItemTitle">${itemTitle}</td>
    <td class="tdPrecio ">${itemPrice}</td>
    <td class="tdCantidad " ><input  class="inputCantidad" type="number" value="1"></td>
    <td><button type="button" class="btn btn-danger buttonDelete">X</button></td>
    `;

    shoppingCartRow.innerHTML = shopingCartContent;
    shoopingCartItemContainer.append(shoppingCartRow);

    const shoppingCartItems = getItemsInShoppingCart()
    addToLocalStorage("Carrito", shoppingCartItems);

    shoppingCartRow.querySelector(".buttonDelete").addEventListener("click",removeShoppingCartItem)
    shoppingCartRow.querySelector(".inputCantidad").addEventListener("change", quantityChanged)
    updateShoppingCartTotal()
}

function updateShoppingCartTotal() {

    let total = 0;

    const shoppingCartTotal = document.querySelector(".shoppingCartTotal")

    const shoppingCartItems = document.querySelectorAll(".ItemCarrito")

    shoppingCartItems.forEach(shoppingCartItem => {
        const shoppingCartItemPriceElement = shoppingCartItem.querySelector(".tdPrecio")
        const shoppinCartItemPrice = Number(shoppingCartItemPriceElement.textContent.replace("$", ""));
        const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(".inputCantidad");
        const shoppingCartItemQuantity = Number(shoppingCartItemQuantityElement.value);
        total = total + shoppinCartItemPrice * shoppingCartItemQuantity
    });
    shoppingCartTotal.innerHTML = `$${total.toFixed(2)}`

}

function removeShoppingCartItem(e) {
    const buttonClicked = e.target;

    buttonClicked.closest(".ItemCarrito").remove();
    updateShoppingCartTotal();

}

function quantityChanged(e) {
    const input = e.target;

    if(input.value <= 0 ) {
        input.value=1;
    }
    updateShoppingCartTotal();
}

function comprarButtonclicked() {

    shoopingCartItemContainer.innerHTML = ``;
    updateShoppingCartTotal();
}



function getItemsInShoppingCart(){
    const shoppingCartItems = document.querySelectorAll(".ItemCarrito")
    const arrShoppingCartItems = []

    shoppingCartItems.forEach(ItemCarrito => {
        const shoppingCartItemQuantityElement = ItemCarrito.querySelector(".inputCantidad");
        const shoppingCartItemQuantity = Number(shoppingCartItemQuantityElement.value);
        const itemTitle = ItemCarrito.querySelector(".shoppingCartItemTitle").textContent
        const itemPrice = ItemCarrito.querySelector(".tdPrecio").textContent
        const itemImg = ItemCarrito.querySelector(".tdImg").src
        
        const item ={
            titlle: itemTitle,
            price: itemPrice,
            img: itemImg,
            qty: shoppingCartItemQuantity
        }
        
        arrShoppingCartItems.push(item)
    }) ;
    return arrShoppingCartItems;
}

function addToLocalStorage(key,items){
    localStorage.setItem(key,JSON.stringify(items))
}
