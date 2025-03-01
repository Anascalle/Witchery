// Importa los retos y los ingredientes desde archivos externos
import { retos } from "./challenges.js";
import { ingredientes } from "./ingredients.js";

// Cargar los equipos y el turno actual desde localStorage, o inicializar si no existen
export let equipos = JSON.parse(localStorage.getItem("equipos")) || [];
export let turnoActual = JSON.parse(localStorage.getItem("turnoActual")) || 0;

// Objeto para llevar el progreso de pistas de los ingredientes
let progresoPistas = {};
let ingredienteActualIndex = 0; // Controla el ingrediente actual

// Función para actualizar el turno en la interfaz
export function actualizarTurno() {
    let turnoElemento = document.getElementById("turno");

    if (equipos.length > 0 && turnoElemento) {
        turnoElemento.innerText = `Turno de: ${equipos[turnoActual].name}`;
    } else {
        console.warn("No hay equipos disponibles o no se encontró el elemento 'turno'.");
    }
}

// Función para pasar al siguiente turno
export function siguienteTurno() {
    if (equipos.length > 0) {
        turnoActual = (turnoActual + 1) % equipos.length; // Ciclo entre los equipos
        localStorage.setItem("turnoActual", JSON.stringify(turnoActual)); // Guarda el turno en localStorage
        actualizarTurno(); // Actualiza la interfaz
        console.log(`Ahora es el turno de: ${equipos[turnoActual].name}`);
    } else {
        console.warn("No hay equipos para cambiar el turno.");
    }
}
export function mostrarModal(categoria, ingredienteNombre = null) {
    let modalTitulo = document.getElementById("modal-titulo");
    let modalTexto = document.getElementById("modal-texto");
    let modal = document.getElementById("modal");
    let cumplioBtn = document.getElementById("cumplio-btn");
    let noCumplioBtn = document.getElementById("no-cumplio-btn");
    let pistaImagen = document.getElementById("pista-imagen");

    if (!modalTitulo || !modalTexto || !modal || !cumplioBtn || !noCumplioBtn) {
        console.error("Elementos del modal no encontrados.");
        return;
    }

    cumplioBtn.style.display = "inline-block";
    noCumplioBtn.style.display = "inline-block";

    if (ingredienteNombre) {
        let ingrediente = ingredientes.find(i => i.nombre === ingredienteNombre);
        if (!ingrediente || !ingrediente.pistas || !Array.isArray(ingrediente.pistas)) {
            console.warn(`Ingrediente "${ingredienteNombre}" no encontrado o sin pistas.`);
            return;
        }

        progresoPistas[ingredienteNombre] = 0;
        let pistaActual = ingrediente.pistas[0];
        modalTitulo.innerText = "Pista 1";
        modalTexto.innerText = pistaActual;

        if (ingrediente.imagen) {
            pistaImagen.src = ingrediente.imagen;
            pistaImagen.style.display = "block";
        } else {
            pistaImagen.style.display = "none";
        }
    } else {
        if (!retos[categoria]) {
            console.warn(`Categoría "${categoria}" no encontrada.`);
            return;
        }
        let retoAleatorio = retos[categoria][Math.floor(Math.random() * retos[categoria].length)];
        modalTitulo.innerText = categoria;
        modalTexto.innerText = retoAleatorio;
        pistaImagen.style.display = "none";
    }

    cumplioBtn.onclick = cumplioReto;
    noCumplioBtn.onclick = noCumplioReto;
    modal.style.display = "block";
}

export function cumplioReto() {
    let equipoActual = equipos[turnoActual];

    if (!equipoActual || !Array.isArray(equipoActual.ingredients) || equipoActual.ingredients.length === 0) {
        console.warn(`El equipo ${equipoActual?.name || "desconocido"} no tiene ingredientes asignados.`);
        return;
    }

    let ingrediente = equipoActual.ingredients[ingredienteActualIndex];
    if (!ingrediente || !ingrediente.pistas || !Array.isArray(ingrediente.pistas)) {
        console.warn(`Ingrediente no válido o sin pistas para el equipo ${equipoActual.name}.`);
        return;
    }

    progresoPistas[ingrediente.nombre] = progresoPistas[ingrediente.nombre] || 0;
    if (progresoPistas[ingrediente.nombre] < ingrediente.pistas.length - 1) {
        progresoPistas[ingrediente.nombre]++;
        console.log(`Mostrando siguiente pista de "${ingrediente.nombre}".`);
    } else {
        console.log(`Todas las pistas de "${ingrediente.nombre}" han sido mostradas.`);
        ingredienteActualIndex++;
        if (ingredienteActualIndex >= equipoActual.ingredients.length) {
            console.log("Todos los ingredientes han sido procesados.");
            ingredienteActualIndex = 0;
            siguienteTurno();
        } else {
            console.log(`Pasando al siguiente ingrediente: ${equipoActual.ingredients[ingredienteActualIndex].nombre}`);
        }
    }

    let modalTitulo = document.getElementById("modal-titulo");
    let modalTexto = document.getElementById("modal-texto");
    let cumplioBtn = document.getElementById("cumplio-btn");
    let noCumplioBtn = document.getElementById("no-cumplio-btn");
    let pistaImagen = document.getElementById("pista-imagen");

    let pistaNumero = progresoPistas[ingrediente.nombre] + 1;
    modalTitulo.innerText = `Pista Ingrediente ${pistaNumero}`;
    modalTexto.innerText = ingrediente.pistas[progresoPistas[ingrediente.nombre]];

    if (ingrediente.imagen) {
        pistaImagen.src = ingrediente.imagen;
        pistaImagen.style.display = "block";
    }

    cumplioBtn.style.display = "none";
    noCumplioBtn.style.display = "none";
}

export function noCumplioReto() {
    cerrarModal();

}

export function siguienteRonda() {
    siguienteTurno();
}

export function cerrarModal() {
    let modal = document.getElementById("modal");

    if (modal) {
        modal.style.display = "none";
    } else {
        console.error("No se encontró el modal.");
    }

    siguienteTurno();
}
