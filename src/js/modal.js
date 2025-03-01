import { retos } from "../data/challenges.js";
import { ingredientes } from "../data/ingredients.js";

export let equipos = JSON.parse(localStorage.getItem("equipos")) || [];
export let turnoActual = JSON.parse(localStorage.getItem("turnoActual")) || 0;

let progresoPistas = {};
let ingredienteActualIndex = 0;

export function mostrarEquipos() {
    console.log("Equipos y sus integrantes:");
    equipos.forEach((equipo, index) => {
        console.log(`Equipo ${index + 1}: ${equipo.name}`);
        console.log("  Integrantes:");
        equipo.players?.length 
            ? equipo.players.forEach(p => console.log(`    - ${p}`))
            : console.log("    - No tiene integrantes asignados.");
        console.log("  Ingredientes:");
        equipo.ingredients?.length 
            ? equipo.ingredients.forEach(i => console.log(`    - ${i.nombre}`))
            : console.log("    - No tiene ingredientes asignados.");
    });
}

export function mostrarModal(categoria, ingredienteNombre = null) {
    let modalTitulo = document.getElementById("modal-titulo");
    let modalTexto = document.getElementById("modal-texto");
    let modal = document.getElementById("modal");
    let cumplioBtn = document.getElementById("cumplio-btn");
    let noCumplioBtn = document.getElementById("no-cumplio-btn");
    let pistaImagen = document.getElementById("pista-imagen");
    let cerrarBtn = document.querySelector(".cerrar");

    if (!modalTitulo || !modalTexto || !modal || !cumplioBtn || !noCumplioBtn || !cerrarBtn) {
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

        if (!(ingredienteNombre in progresoPistas)) {
            progresoPistas[ingredienteNombre] = 0;
        }

        let pistaActual = ingrediente.pistas[progresoPistas[ingredienteNombre]];
        modalTitulo.innerText = `Pista ${progresoPistas[ingredienteNombre] + 1}`;
        modalTexto.innerText = pistaActual;

        pistaImagen.style.display = ingrediente.imagen ? "block" : "none";
        if (ingrediente.imagen) pistaImagen.src = ingrediente.imagen;

    } else if (retos[categoria]) {
        let retoAleatorio = retos[categoria][Math.floor(Math.random() * retos[categoria].length)];
        modalTitulo.innerText = categoria;
        modalTexto.innerText = retoAleatorio;
        pistaImagen.style.display = "none";
        cerrarBtn.style.display = "block";
    } else {
        console.warn(`Categoría "${categoria}" no encontrada.`);
        return;
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

    if (progresoPistas[ingrediente.nombre] < ingrediente.pistas.length - 1) {
        progresoPistas[ingrediente.nombre]++;
    } else {
        progresoPistas[ingrediente.nombre] = 0;
        ingredienteActualIndex++;

        if (ingredienteActualIndex >= equipoActual.ingredients.length) {
            console.log("Todos los ingredientes han sido procesados.");
            ingredienteActualIndex = 0;
            siguienteTurno();
            return;
        }
    }

    let modalTitulo = document.getElementById("modal-titulo");
    let modalTexto = document.getElementById("modal-texto");
    let pistaImagen = document.getElementById("pista-imagen");

    modalTitulo.innerText = `Pista ${progresoPistas[ingrediente.nombre] + 1}`;
    modalTexto.innerText = ingrediente.pistas[progresoPistas[ingrediente.nombre]];
    pistaImagen.style.display = ingrediente.imagen ? "block" : "none";
    if (ingrediente.imagen) pistaImagen.src = ingrediente.imagen;

    document.getElementById("cumplio-btn").style.display = "none";
    document.getElementById("no-cumplio-btn").style.display = "none";
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
