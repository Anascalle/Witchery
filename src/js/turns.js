// Cargar equipos desde localStorage o inicializar vacío
export let equipos = JSON.parse(localStorage.getItem("equipos")) || [];

// Inicializar turnoActual en 0
export let turnoActual = 0;
localStorage.setItem("turnoActual", JSON.stringify(turnoActual));

// Función para actualizar el turno en la interfaz
export function actualizarTurno() {
    let turnoElemento = document.getElementById("turno");
    if (equipos.length > 0 && turnoElemento) {
        turnoElemento.innerText = `Turno de: ${equipos[turnoActual]?.name || "Equipo desconocido"}`;
    } else {
        console.warn("No hay equipos disponibles o no se encontró el elemento 'turno'.");
    }
}

// Función para alternar entre los dos equipos
export function siguienteTurno() {
    if (equipos.length > 0) {
        turnoActual = (turnoActual + 1) % equipos.length; // Ciclo entre los equipos
        localStorage.setItem("turnoActual", JSON.stringify(turnoActual));
        actualizarTurno();
        console.log(`Ahora es el turno de: ${equipos[turnoActual].name}`);
    } else {
        console.warn("No hay equipos para cambiar el turno.");
    }
}

// Ejecutar actualización de turno al cargar la página
window.onload = function() {
    actualizarTurno();
};