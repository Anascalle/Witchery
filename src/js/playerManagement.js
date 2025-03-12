import { ingredientes } from "../data/ingredients.js";
console.log(ingredientes);

// Asignar los ingredientes importados a la variable global
let ingredientesDisponibles = [...ingredientes];

document.addEventListener("DOMContentLoaded", function () {
    generarInputs();
    document.getElementById("cantidad").addEventListener("change", generarInputs);
    document.getElementById("mezclar-btn").addEventListener("click", generarGrupos);
});

// Variable global para almacenar los equipos
let teams = [];

function generarInputs() {
    let cantidad = document.getElementById("cantidad").value;
    let container = document.getElementById("nombres-container");
    container.innerHTML = "";

    for (let i = 0; i < cantidad; i++) {
        let input = document.createElement("input");
        input.type = "text";
        input.placeholder = `Nombre   ${i + 1}`;
        input.id = `nombre${i}`;
        container.appendChild(input);
    }
}

function generarGrupos() {
    let cantidad = parseInt(document.getElementById("cantidad").value);
    let container = document.getElementById("nombres-container");
    let boton = document.getElementById("mezclar-btn");
    let nombres = [];

    for (let i = 0; i < cantidad; i++) {
        let nombre = document.getElementById(`nombre${i}`).value.trim();
        if (nombre === "") {
            Swal.fire({
                title: "Error",
                text: "Todos los nombres deben ser ingresados.",
                icon: "warning",
                confirmButtonText: "Entendido"
            });
            return;
        }
        nombres.push(nombre);
    }

    // Ocultar el select-wrapper cuando se haga clic en "Crear grupos"
    let selectWrapper = document.querySelector(".select-wrapper");
    if (selectWrapper) {
        selectWrapper.style.display = "none";
    }

    // Mezclar nombres aleatoriamente
    for (let i = nombres.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [nombres[i], nombres[j]] = [nombres[j], nombres[i]];
    }

    // Crear equipos
    teams = [];
    let tamañoGrupo = cantidad === 4 ? 2 : 3; // Equipos de 2 o 3 jugadores
    for (let i = 0, numGrupo = 1; i < cantidad; i += tamañoGrupo, numGrupo++) {
        let miembros = nombres.slice(i, i + tamañoGrupo);
        let equipo = {
            name: `Equipo ${numGrupo}`,
            players: miembros,
            ingredients: []
        };
        teams.push(equipo);
    }

    // Asignar ingredientes a cada grupo
    asignarIngredientesAGrupos();

    // Mostrar los equipos en la interfaz sin los ingredientes
    container.innerHTML = "";
    teams.forEach(equipo => {
        let grupo = document.createElement("div");
        grupo.classList.add("grupo");

        let formatoNombres = equipo.players.length > 2 
            ? equipo.players.slice(0, -1).join(", ") + " y " + equipo.players.slice(-1) 
            : equipo.players.join(" y ");

        grupo.innerText = `${equipo.name}: ${formatoNombres}`;
        container.appendChild(grupo);
    });

    // Cambiar el texto del botón a "Iniciar juego"
    boton.innerText = "Iniciar juego";
    boton.onclick = iniciarJuego;

    // Actualizar los equipos en localStorage
    actualizarLocalStorage();
}

function obtenerIngredientesAleatorios(cantidad) {
    let copiaIngredientes = [...ingredientesDisponibles];
    let seleccionados = [];
    while (seleccionados.length < cantidad && copiaIngredientes.length > 0) {
        let indice = Math.floor(Math.random() * copiaIngredientes.length);
        seleccionados.push(copiaIngredientes.splice(indice, 1)[0]);
    }
    return seleccionados;
}

function asignarIngredientesAGrupos() {
    let totalIngredientes = teams.length * 3; // 4 ingredientes por equipo
    let ingredientesSeleccionados = obtenerIngredientesAleatorios(totalIngredientes);

    if (ingredientesSeleccionados.length < totalIngredientes) {
        console.warn("No hay suficientes ingredientes para todos los equipos.");
    }

    // Distribuir los ingredientes sin repetir entre los equipos
    teams.forEach((equipo, index) => {
        equipo.ingredients = ingredientesSeleccionados.slice(index * 3, (index + 1) * 3);
        console.log(`${equipo.name}:`, equipo.ingredients);
    });

    // Actualizar localStorage cada vez que se asignen ingredientes
    actualizarLocalStorage();
}

function iniciarJuego() {
    console.log("Equipos creados:", teams);
    localStorage.setItem("equipos", JSON.stringify(teams)); // Guardar equipos en localStorage
    window.location.href = "juego.html"; // Cambiar a la nueva pantalla
}

// Actualizar el localStorage con los equipos
function actualizarLocalStorage() {
    localStorage.setItem("equipos", JSON.stringify(teams));
}