import { retos } from "./challenges.js";
import { ingredientes } from "./ingredients.js";

// Cargar equipos y turno desde localStorage
export let equipos = JSON.parse(localStorage.getItem("equipos")) || [];
export let turnoActual = JSON.parse(localStorage.getItem("turnoActual")) || 0;

let progresoPistas = {}; // Progreso de cada ingrediente

// Actualizar el turno en la interfaz
export function actualizarTurno() {
    let turnoElemento = document.getElementById("turno");

    if (equipos.length > 0 && turnoElemento) {
        turnoElemento.innerText = `Turno de: ${equipos[turnoActual].name}`;
    } else {
        console.warn("⚠️ No hay equipos disponibles o no se encontró el elemento 'turno'.");
    }
}

// Pasar al siguiente turno
export function siguienteTurno() {
    if (equipos.length > 0) {
        turnoActual = (turnoActual + 1) % equipos.length;
        localStorage.setItem("turnoActual", JSON.stringify(turnoActual)); // Guarda turno
        actualizarTurno();
        console.log(`🔄 Ahora es el turno de: ${equipos[turnoActual].name}`);
    } else {
        console.warn("⚠️ No hay equipos para cambiar el turno.");
    }
}

// Mostrar el modal con una pista o reto
export function mostrarModal(categoria, ingredienteNombre = null) {
    let modalTitulo = document.getElementById("modal-titulo");
    let modalTexto = document.getElementById("modal-texto");
    let modal = document.getElementById("modal");

    if (!modalTitulo || !modalTexto || !modal) {
        console.error("❌ Elementos del modal no encontrados.");
        return;
    }

    if (ingredienteNombre) {
        let ingrediente = ingredientes.find(i => i.nombre === ingredienteNombre);
        if (!ingrediente) {
            console.warn(`⚠️ Ingrediente "${ingredienteNombre}" no encontrado.`);
            return;
        }

        // Inicializa progreso si no existe
        progresoPistas[ingredienteNombre] = progresoPistas[ingredienteNombre] || 0;
        let pistaActual = ingrediente.pistas[progresoPistas[ingredienteNombre]];

        modalTitulo.innerText = ingredienteNombre;
        modalTexto.innerText = pistaActual;
    } else {
        if (!retos[categoria]) {
            console.warn(`⚠️ Categoría "${categoria}" no encontrada.`);
            return;
        }

        let retoAleatorio = retos[categoria][Math.floor(Math.random() * retos[categoria].length)];
        modalTitulo.innerText = categoria;
        modalTexto.innerText = retoAleatorio;
    }

    modal.style.display = "block";
}

// Función cuando un equipo cumple o no un reto
export function cumplioReto(ingredienteNombre) {
    let ingrediente = ingredientes.find(i => i.nombre === ingredienteNombre);
    if (!ingrediente) {
        console.warn(`⚠️ Ingrediente "${ingredienteNombre}" no encontrado.`);
        return;
    }

    // Avanza a la siguiente pista si hay más disponibles
    if (progresoPistas[ingredienteNombre] < ingrediente.pistas.length - 1) {
        progresoPistas[ingredienteNombre]++;
        console.log(`✅ Mostrando siguiente pista de "${ingredienteNombre}".`);
    } else {
        console.log(`✅ Todas las pistas de "${ingredienteNombre}" han sido mostradas.`);
    }

    siguienteTurno();
    cerrarModal();
}

// Cerrar modal
export function cerrarModal() {
    let modal = document.getElementById("modal");
    if (modal) {
        modal.style.display = "none";
    } else {
        console.error("❌ No se encontró el modal.");
    }
}
