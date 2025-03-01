// Cargar equipos desde localStorage o inicializar vacío
export let equipos = JSON.parse(localStorage.getItem("equipos")) || [];

// Forzar turnoActual a 0 si hay equipos
export let turnoActual = (equipos.length > 1) ? 0 : 0;  // Aseguramos que siempre inicie en el grupo 1 (índice 0)
localStorage.setItem("turnoActual", JSON.stringify(turnoActual));

// Función para actualizar el turno en la interfaz
export function actualizarTurno() {
    let turnoElemento = document.getElementById("turno");

    if (equipos.length > 0 && turnoElemento) {
        turnoElemento.innerText = `Turno de: ${equipos[turnoActual]?.name || "Equipo desconocido"}`;
    } else {
        turnoElemento.innerText = "No hay equipos disponibles.";
    }
}

// Pasar al siguiente turno (pero siempre mantenerlo en 1 para que pase al siguiente equipo después)
export function siguienteTurno() {
    if (equipos.length > 0) {
        // Si estamos en el grupo 1 (turno 0), pasamos al grupo 2 (turno 1)
        turnoActual = (turnoActual === 0) ? 1 : 0;  // Alternamos entre el grupo 1 (0) y el grupo 2 (1)
        localStorage.setItem("turnoActual", JSON.stringify(turnoActual));
        actualizarTurno();
    }
}

// Asegurar que el turno se muestra al cargar la página
window.onload = function() {
    actualizarTurno();
};
