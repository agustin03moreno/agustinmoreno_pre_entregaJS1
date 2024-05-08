
const productos = [
    { id: 1, nombre: "PC gama baja", precio: 300 },
    { id: 2, nombre: "PC gama media", precio: 600 },
    { id: 3, nombre: "PC gama alta", precio: 1100 },
];


  
  let carrito = [];

  
  function mostrarProductos() {
    const listaProductos = document.getElementById("listaProductos");
    listaProductos.innerHTML = ""; 

    productos.forEach((producto) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <h3>${producto.nombre}</h3>
        <p>Precio: $${producto.precio}</p>
        <button data-id="${producto.id}">Agregar al carrito</button>
      `;

      
      li.querySelector("button").addEventListener("click", () => {
        agregarAlCarrito(producto.id);
      });

      listaProductos.appendChild(li);
    });
  }

  
  function agregarAlCarrito(idProducto) {
    const producto = productos.find((producto) => producto.id === idProducto);
    if (producto) {
      carrito.push(producto);
      mostrarCarrito();
    } else {
      console.error("Producto no encontrado");
    }
  }

  
  function mostrarCarrito() {
    const listaCarrito = document.getElementById("listaCarrito");
    listaCarrito.innerHTML = "";

    carrito.forEach((producto) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${producto.nombre} - $${producto.precio}
        <button data-id="${producto.id}">Quitar del carrito</button>
      `;

      
      li.querySelector("button").addEventListener("click", () => {
        quitarDelCarrito(producto.id);
      });

      listaCarrito.appendChild(li);
    });

    
    const total = carrito.reduce((total, producto) => total + producto.precio, 0);
    document.getElementById("totalCarrito").textContent = `Total: $${total}`;
  }

  
  function quitarDelCarrito(idProducto) {
    const index = carrito.findIndex((producto) => producto.id === idProducto);
    if (index !== -1) {
      carrito.splice(index, 1);
      mostrarCarrito();
    } else {
      console.error("Producto no encontrado en el carrito");
    }
  }

  
  function vaciarCarrito() {
    carrito = [];
    mostrarCarrito();
  }

  
  const btnVaciarCarrito = document.getElementById("btnVaciarCarrito");
  const btnComprar = document.getElementById("btnComprar");

  btnVaciarCarrito.addEventListener("click", vaciarCarrito);

  btnComprar.addEventListener("click", comprar);

  
  mostrarProductos();

 
  function comprar() {
    if (carrito.length > 0) {
      
      const modal = document.getElementById("modalCompra");
      modal.style.display = "block";
  
      
      const formularioCompra = document.getElementById("formularioCompra");
      formularioCompra.addEventListener("submit", (event) => {
        event.preventDefault(); 
        const nombre = document.getElementById("nombre").value;
        const numeroTarjeta = document.getElementById("numeroTarjeta").value;
        const cds = document.getElementById("cds").value;
        const mail = document.getElementById("mail").value;
  
        if (validarDatosCompra(nombre, numeroTarjeta, cds, mail)) {
          
          console.log("Datos del formulario válidos:", {
            nombre,
            numeroTarjeta,
            cds,
            mail,
          });
  
          
          modal.style.display = "none";
          alert("¡Gracias por tu compra!");
  
          vaciarCarrito(); 
        } else {
          alert("Los datos ingresados no son válidos. Por favor, revisa e intenta nuevamente.");
        }
      });
    } else {
      alert("Tu carrito está vacío. Agrega productos para realizar una compra.");
    }
  }
  
 
  function validarDatosCompra(nombre, numeroTarjeta, cds, mail) {
   
    return (
      nombre.trim() !== "" &&
      numeroTarjeta.trim() !== "" &&
      cds.trim() !== "" &&
      mail.trim() !== ""
    );
  }