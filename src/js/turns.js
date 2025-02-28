// Cargar equipos desde localStorage o inicializar vacío
export let equipos = JSON.parse(localStorage.getItem("equipos")) || [];

// Asegurar que turnoActual siempre sea válido (iniciar en equipo 1)
export let turnoActual = localStorage.getItem("turnoActual") !== null ? 
    Number(localStorage.getItem("turnoActual")) : 0;

// Si el turno guardado es inválido, resetear a 0
if (turnoActual >= equipos.length || turnoActual < 0) {
    turnoActual = 0;
    localStorage.setItem("turnoActual", JSON.stringify(turnoActual));
}

console.log("📌 Equipos cargados:", equipos);
console.log("📌 Turno actual cargado:", turnoActual);

// Actualizar turno en pantalla
export function actualizarTurno() {
    let turnoElemento = document.getElementById("turno");

    console.log(`🔄 Actualizando turno...`);
    console.log(`👥 Equipos:`, equipos);
    console.log(`🎯 Turno actual en variable: ${turnoActual}`);
    console.log(`💾 Turno guardado en localStorage:`, localStorage.getItem("turnoActual"));

    if (equipos.length > 0 && turnoElemento) {
        turnoElemento.innerText = `Turno de: ${equipos[turnoActual].name}`;
    } else {
        turnoElemento.innerText = "No hay equipos disponibles.";
    }
}

// Pasar al siguiente turno (alternando entre los equipos)
export function siguienteTurno() {
    if (equipos.length > 0) {
        turnoActual = (turnoActual + 1) % equipos.length; // Alternar turnos
        localStorage.setItem("turnoActual", JSON.stringify(turnoActual)); // Guardar turno
        actualizarTurno(); // Actualizar en pantalla
    }
}

// Asegurar que el turno se muestra al cargar la página
window.onload = function() {
    actualizarTurno();
};
