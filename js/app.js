// ========================================================
// ACTIVIDAD 2 - UNIDAD 3: DINAMISMO CON JAVASCRIPT
// Alumna: Andrea Itzel Cortés Bahena
// ========================================================

document.addEventListener("DOMContentLoaded", () => {
  // ------------------------------------------------------
  // REQUERIMIENTO 1: VALIDACIÓN EN TIEMPO REAL DEL FORMULARIO
  // ------------------------------------------------------
  const campoNombre = document.getElementById("campoNombre");
  const campoEmail = document.getElementById("campoEmail");
  const campoTelefono = document.getElementById("campoTelefono");

  // Validación de nombre: mínimo 3 letras
  if (campoNombre) {
    campoNombre.addEventListener("input", () => {
      if (campoNombre.value.trim().length >= 3) {
        campoNombre.classList.add("is-valid");
        campoNombre.classList.remove("is-invalid");
      } else {
        campoNombre.classList.add("is-invalid");
        campoNombre.classList.remove("is-valid");
      }
    });
  }

  // Validación de correo electrónico con expresión regular
  if (campoEmail) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    campoEmail.addEventListener("input", () => {
      if (regexEmail.test(campoEmail.value.trim())) {
        campoEmail.classList.add("is-valid");
        campoEmail.classList.remove("is-invalid");
      } else {
        campoEmail.classList.add("is-invalid");
        campoEmail.classList.remove("is-valid");
      }
    });
  }

  // Validación de teléfono: exactamente 10 dígitos numéricos
  if (campoTelefono) {
    const regexTel = /^[0-9]{10}$/;
    campoTelefono.addEventListener("input", () => {
      if (regexTel.test(campoTelefono.value.trim())) {
        campoTelefono.classList.add("is-valid");
        campoTelefono.classList.remove("is-invalid");
      } else {
        campoTelefono.classList.add("is-invalid");
        campoTelefono.classList.remove("is-valid");
      }
    });
  }

  // ------------------------------------------------------
  // REQUERIMIENTO 2: CONSUMO DE API REST FALSA (FETCH)
  // Usamos JSONPlaceholder para simular testimonios de clientes
  // ------------------------------------------------------
  const contenedorResenas = document.getElementById("contenedorResenas");
  if (contenedorResenas) {
    fetch("https://jsonplaceholder.typicode.com/comments?_limit=3")
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        contenedorResenas.innerHTML = "";
        datos.forEach((comentario) => {
          const tarjeta = document.createElement("div");
          tarjeta.className = "col-12 col-md-4";
          tarjeta.innerHTML = `
            <div class="card h-100 p-3 shadow-sm border-0 bg-light">
              <h6 class="fw-bold mb-1">${comentario.name.slice(0, 20)}</h6>
              <p class="text-muted small mb-2">${comentario.email}</p>
              <p class="small mb-0">"${comentario.body.slice(0, 80)}..."</p>
            </div>
          `;
          contenedorResenas.appendChild(tarjeta);
        });
      })
      .catch((error) => {
        console.error("Error al consultar la API:", error);
      });
  }

  // ------------------------------------------------------
  // REQUERIMIENTO 3: MANIPULACIÓN DEL DOM (CARRITO DE COMPRAS)
  // Permite agregar productos y eliminarlos dinámicamente
  // ------------------------------------------------------
  const listaCarrito = document.getElementById("listaCarrito");
  const botonesAgregar = document.querySelectorAll(".btn-agregar-carrito");

  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", () => {
      const nombrePrenda = boton.getAttribute("data-nombre");
      const precioPrenda = boton.getAttribute("data-precio");

      // Si el carrito está vacío, limpiamos el aviso inicial
      const mensajeVacio = document.getElementById("mensajeVacio");
      if (mensajeVacio) {
        mensajeVacio.remove();
      }

      // Crear nuevo elemento en la lista
      const elementoLista = document.createElement("li");
      elementoLista.className = "list-group-item d-flex justify-content-between align-items-center";
      elementoLista.innerHTML = `
        <span><strong>${nombrePrenda}</strong> - $${precioPrenda} MXN</span>
        <button class="btn btn-sm btn-outline-danger btn-eliminar">&times;</button>
      `;

      // Evento para eliminar elemento del DOM al hacer clic
      elementoLista.querySelector(".btn-eliminar").addEventListener("click", () => {
        elementoLista.remove();
        if (listaCarrito.children.length === 0) {
          listaCarrito.innerHTML = '<li id="mensajeVacio" class="list-group-item text-muted text-center">El carrito está vacío.</li>';
        }
      });

      listaCarrito.appendChild(elementoLista);
    });
  });
});