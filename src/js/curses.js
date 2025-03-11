import { hechizos } from "../data/spell.js";
import { equipos, turnoActual } from "../js/modal.js"
import { siguienteTurno } from "../js/modal.js";
import { preguntasOraculo } from "../data/oracle.js"; // Importamos las preguntas
import { pistasFalsas } from "../data/fakeClues.js";
import { preguntasActua } from "../data/challenges.js";
import { preguntasCrea } from "../data/challenges.js";

export function mostrarModalHechizo() {
    let modalHechizo = document.getElementById("modal-hechizo");
    let mensajeHechizo = document.getElementById("mensaje-hechizo");
    let codigoInput = document.getElementById("codigo-hechizo");
    let botonHechizo = document.querySelector("button");

    if (modalHechizo) {
        modalHechizo.style.display = "block";
    } else {
        console.error("Modal de hechizo no encontrado.");
    }

    // Limpiar cualquier mensaje previo
    mensajeHechizo.innerText = "";
    codigoInput.style.display = "block";
    botonHechizo.style.display = "block";
}

export function mostrarModalOraculo() {
    let modalOraculo = document.getElementById("modal-oraculo");
    let mensajeOraculo = document.getElementById("mensaje-oraculo");
    let opcionesContainer = document.getElementById("opciones-container");

    // Elegir una pregunta aleatoria
    let preguntaAleatoria = preguntasOraculo[Math.floor(Math.random() * preguntasOraculo.length)];

    // Mostrar el texto de la pregunta
    mensajeOraculo.innerText = preguntaAleatoria.pregunta;

    // Limpiar opciones anteriores
    opcionesContainer.innerHTML = "";

    // Crear botones de respuesta
    preguntaAleatoria.opciones.forEach((opcion, index) => {
        let boton = document.createElement("button");
        boton.innerText = opcion;
        boton.addEventListener("click", () => verificarRespuesta(index, preguntaAleatoria.respuestaCorrecta, modalOraculo));
        opcionesContainer.appendChild(boton);
    });

    if (modalOraculo) {
        modalOraculo.style.display = "block";
    } else {
        console.error("Modal del Oráculo no encontrado.");
    }
}

function verificarRespuesta(indiceSeleccionado, respuestaCorrecta, modal) {
    let mensajeOraculo = document.getElementById("mensaje-oraculo");
    let opcionesContainer = document.getElementById("opciones-container");
    // Limpiar opciones anteriores
    opcionesContainer.innerHTML = "";

    if (indiceSeleccionado === respuestaCorrecta) {
        // ✅ Respuesta correcta
        mensajeOraculo.innerText = "✅ Correcto, pueden proseguir con la búsqueda.";

        // Agregar botón para cerrar el modal
        let botonCerrar = document.createElement("button");
        botonCerrar.innerText = "Cerrar";
        botonCerrar.addEventListener("click", () => {
            modal.style.display = "none"; // Cierra el modal sin penalización
        });
        opcionesContainer.appendChild(botonCerrar);
    } else {
        // ❌ Respuesta incorrecta
        mensajeOraculo.innerText = "❌ Incorrecto, quedan congelados y pierden un turno.";

        // Agregar botón de aceptar que además salta el turno
        let botonAceptar = document.createElement("button");
        botonAceptar.innerText = "Cerrar";
        botonAceptar.addEventListener("click", () => {
            modal.style.display = "none"; // Cierra el modal
            siguienteTurno(); // Pierden el turno
        });
        opcionesContainer.appendChild(botonAceptar);
    }
}

export function mostrarModalPistaFalsa() {
    let modal = document.getElementById("modal-pista-falsa");
    let mensajePista = document.getElementById("mensaje-pista-falsa");
    let botonCerrar = document.getElementById("cerrar-pista-falsa");

    // Elegir una pista aleatoria
    let pistaAleatoria = pistasFalsas[Math.floor(Math.random() * pistasFalsas.length)];

    if (modal && mensajePista && botonCerrar) {
        mensajePista.innerText = `\n\n${pistaAleatoria}`;

        modal.style.display = "block";

        botonCerrar.onclick = () => {
            modal.style.display = "none"; // Cerrar el modal al hacer clic
        };
    } else {
        console.error("Error: Modal de pista falsa no encontrado.");
    }
}

export function mostrarModalDesafioExtra() {
    let modal = document.getElementById("modal-desafio-extra");
    let mensajeInicial = document.getElementById("mensaje-inicial-desafio-extra");
    let botonAceptar = document.getElementById("aceptar-desafio-extra");
    let contenidoDesafio = document.getElementById("contenido-desafio-extra");
    let mensajeDesafio = document.getElementById("mensaje-desafio-extra");
    let botonCumplio = document.getElementById("cumplio-desafio");
    let botonNoCumplio = document.getElementById("no-cumplio-desafio");

    // Combinar los retos de "Crea" y "Actúa"
    let desafiosExtra = [...preguntasCrea, ...preguntasActua];

    // Seleccionar un desafío aleatorio
    let desafioAleatorio = desafiosExtra[Math.floor(Math.random() * desafiosExtra.length)];

    if (modal && mensajeInicial && botonAceptar && contenidoDesafio && mensajeDesafio && botonCumplio && botonNoCumplio) {
        modal.style.display = "block"; // Mostrar el modal

        // Evento para el botón "Aceptar" que muestra el desafío
        botonAceptar.onclick = () => {
            mensajeInicial.style.display = "none"; // Ocultar el mensaje inicial
            botonAceptar.style.display = "none"; // Ocultar el botón de aceptar
            contenidoDesafio.style.display = "block"; // Mostrar el desafío y los botones

            // Verificar si el reto tiene opciones o es una pregunta con respuesta
            if (desafioAleatorio.elige) {
                mensajeDesafio.innerHTML = `<strong>Elige una opción para actuar:</strong><br>`;
                desafioAleatorio.elige.forEach(opcion => {
                    mensajeDesafio.innerHTML += `- ${opcion}<br>`;
                });
            } else {
                mensajeDesafio.innerHTML = `<strong>${desafioAleatorio.pregunta}</strong>`;
            }
        };

        // Evento para cerrar el modal si completan el reto
        botonCumplio.onclick = () => {
            modal.style.display = "none"; // Cerrar el modal normalmente
        };

        // Evento para cerrar el modal y saltar turno si no lo cumplen
        botonNoCumplio.onclick = () => {
            modal.style.display = "none"; // Cerrar el modal
            siguienteTurno(); // Saltar turno como penalización
        };
    } else {
        console.error("Error: Modal de desafío extra no encontrado.");
    }
}

// Función para cerrar el modal de hechizo
let ultimoHechizo = null; // Variable global para almacenar el último hechizo lanzado

export function cerrarModalHechizo() {
    let modalHechizo = document.getElementById("modal-hechizo");
    let codigoInput = document.getElementById("codigo-hechizo");
    let botonHechizo = document.querySelector("button");
    let modalTitulo = document.getElementById("titulo-hechizo");

    if (modalHechizo) {
        modalHechizo.style.display = "none";
    }

    // Restablecer valores
    modalTitulo.innerText = "Ingresa el código del hechizo"; 
    codigoInput.style.display = "block";
    botonHechizo.style.display = "block";
    codigoInput.value = "";
    let mensajeHechizo = document.getElementById("mensaje-hechizo");
    mensajeHechizo.innerText = "";

    // Cambiar de turno
    siguienteTurno();

    // Aplicar efecto del hechizo en el nuevo turno
    setTimeout(() => {
        aplicarEfecto(ultimoHechizo);
    }, 1000); // Se espera 1 segundo para mayor fluidez

    botonHechizo.innerText = "Lanzar Hechizo";
    botonHechizo.onclick = validarCodigo;
}

// 🧙‍♂️ Función que aplica los efectos del hechizo en el nuevo turno
function aplicarEfecto(hechizoCodigo) {
    if (!hechizoCodigo) return; // Si no hay hechizo, no hacer nada

    let equipoContrario = equipos[(turnoActual) % equipos.length];

    switch (hechizoCodigo) {
        case "K1L2": // Prueba del Oráculo
            console.log(`📜 ${equipoContrario.name} debe responder una pregunta de cultura mágica.`);
            mostrarModalOraculo();
            break;

        case "M3N4": // Confusión Temporal
            console.log(`🔄 ${equipoContrario.name} intercambia su turno con el otro equipo.`);
            siguienteTurno(); // Saltar al siguiente turno
            break;

        case "Q7R8": // Desafío Espejo
            console.log(`🪞 ${equipoContrario.name} debe completar dos desafíos en su próximo turno.`);
            mostrarModalDesafioExtra()
            break;

        case "G3H4": // La Manzana Envenenada
            console.log(`🍎 ${equipoContrario.name} recibirá una pista falsa.`);
            mostrarModalPistaFalsa()
            break;

        default:
            console.log("⚠️ Hechizo sin efecto especial.");
            break;
    }

    ultimoHechizo = null; // Resetear hechizo después de aplicarlo
}

// 🪄 Función para validar el código y asignarlo a ultimoHechizo
export function validarCodigo() {
    let codigoInput = document.getElementById("codigo-hechizo");
    let mensajeHechizo = document.getElementById("mensaje-hechizo");
    let botonHechizo = document.querySelector("button");
    let modalTitulo = document.getElementById("titulo-hechizo");

    let codigo = codigoInput.value.trim();
    const hechizoEncontrado = hechizos.find(hechizo => hechizo.codigo === codigo);

    if (hechizoEncontrado) {
        modalTitulo.innerText = hechizoEncontrado.nombre;
        mensajeHechizo.innerText = `${hechizoEncontrado.descripcion}`;
        codigoInput.value = hechizoEncontrado.nombre;

        console.log(`✨ Hechizo lanzado: ${hechizoEncontrado.nombre}`);
        
        codigoInput.style.display = "none";
        botonHechizo.innerText = "Cerrar";
        botonHechizo.onclick = cerrarModalHechizo;

        // Guardar el hechizo para aplicarlo en el siguiente turno
        ultimoHechizo = hechizoEncontrado.codigo;
    } else {
        mensajeHechizo.innerText = "¡Código inválido! Intenta de nuevo.";
    }
}