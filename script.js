document.addEventListener("DOMContentLoaded", () => {
  const products = [
    {
      nombre: "Masa de maíz blanco",
      precio: 2500,
      descripcion: "1.5 libras de masa de maíz blanco.",
      categoria: "Masas",
      imagen: "imagenes/Masa blanca.jpeg"
    },
    {
      nombre: "Masa de maíz amarillo",
      precio: 2500,
      descripcion: "1.5 libras de masa de maíz amarillo.",
      categoria: "Masas",
      imagen: "imagenes/Masa amarilla.webp"
    },
    {
      nombre: "Masa de yuca",
      precio: 3000,
      descripcion: "1.25 libras de masa de yuca lista para usar.",
      categoria: "Masas",
      imagen: "imagenes/Masa yuca.png"
    },
    {
      nombre: "Agua de maíz (1.5L)",
      precio: 1500,
      descripcion: "Bebida de maíz lista para servir.",
      categoria: "Líquidos",
      imagen: "imagenes/agua-maiz-1.5.png"
    },
    {
      nombre: "Agua de maíz (2L)",
      precio: 2000,
      descripcion: "Versión de 2 litros de agua de maíz.",
      categoria: "Líquidos",
      imagen: "imagenes/agua-maiz-2.png"
    },
    {
      nombre: "Agua de maíz (3L)",
      precio: 3000,
      descripcion: "Botella familiar de 3 litros de agua de maíz.",
      categoria: "Líquidos",
      imagen: "imagenes/agua-maiz-3.png"
    },
    {
      nombre: "Suero (0.5L)",
      precio: 6000,
      descripcion: "Suero costeño artesanal de 0.5 litros.",
      categoria: "Líquidos",
      imagen: "imagenes/suero.jpeg"
    },
    {
      nombre: "Empanadas (queso)",
      precio: 15000,
      descripcion: "10 unidades de empanadas rellenas de queso.",
      categoria: "Bandejas",
      imagen: "imagenes/empanadas-queso.png"
    },
    {
      nombre: "Empanadas (pollo)",
      precio: 15000,
      descripcion: "10 unidades de empanadas rellenas de pollo.",
      categoria: "Bandejas",
      imagen: "imagenes/empanadas-pollo.jpeg"
    },
     {
      nombre: "Empanadas (Carne Molida)",
      precio: 15000,
      descripcion: "10 unidades de empanadas rellenas de Carne Molida.",
      categoria: "Bandejas",
      imagen: "imagenes/empanadas-carnemolida.webp"
    },
    {
      nombre: "Carimañolas (queso)",
      precio: 15000,
      descripcion: "10 unidades de carimañolas con queso.",
      categoria: "Bandejas",
      imagen: "imagenes/carimañolas-queso.jpeg"
    },
    {
      nombre: "Carimañolas (pollo)",
      precio: 15000,
      descripcion: "10 unidades de carimañolas con pollo.",
      categoria: "Bandejas",
      imagen: "imagenes/carimañolas-pollo.jpg"
    },
    {
      nombre: "Carimañolas (Carne Molida)",
      precio: 15000,
      descripcion: "10 unidades de carimañolas con Carne Molida.",
      categoria: "Bandejas",
      imagen: "imagenes/carimañolas-carnemolida.jpeg"
    }
  ];

  const container = document.getElementById("products");
  const cartPanel = document.getElementById("cart-panel");
  const cartIcon = document.getElementById("cart");
  const closeCartBtn = document.getElementById("close-cart");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("menu");

  let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

  function renderProducts(list) {
    container.innerHTML = "";
    list.forEach(p => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${p.imagen}" alt="${p.nombre}">
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
        <span class="precio">$${p.precio.toLocaleString()}</span>
        <button class="add" data-nombre="${p.nombre}">Agregar</button>
      `;
      container.appendChild(card);
    });

    document.querySelectorAll(".add").forEach(btn =>
      btn.addEventListener("click", e => {
        const nombre = e.target.getAttribute("data-nombre");
        const prod = products.find(p => p.nombre === nombre);
        const item = cart.find(i => i.nombre === nombre);
        if (item) {
          item.cantidad += 1;
        } else {
          cart.push({ ...prod, cantidad: 1 });
        }
        saveCart();
        updateCartUI();
      })
    );
  }

  function updateCartUI() {
    cartItemsContainer.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
      const subtotal = item.precio * item.cantidad;
      total += subtotal;
      const li = document.createElement("li");
      li.innerHTML = `
        <div>
          <strong>${item.nombre}</strong><br>
          <small>x${item.cantidad}</small><br>
          <small>$${subtotal.toLocaleString()}</small>
        </div>
        <button aria-label="Eliminar" onclick="removeItem(${index})">❌</button>
      `;
      cartItemsContainer.appendChild(li);
    });
    cartCount.textContent = cart.reduce((acc, i) => acc + i.cantidad, 0);
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }

  window.removeItem = function(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
  };

  function saveCart() {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }

  window.filterCategory = function(categoria) {
    if (categoria === "Todos") {
      renderProducts(products);
    } else {
      renderProducts(products.filter(p => p.categoria === categoria));
    }
  };

  cartIcon.addEventListener("click", () => {
    cartPanel.classList.toggle("open");
  });

  closeCartBtn.addEventListener("click", () => {
    cartPanel.classList.remove("open");
  });

  hamburger.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  renderProducts(products);
  updateCartUI();
});
