import { actualizarTurno, siguienteTurno } from "./turns.js";
import { mostrarModal, cerrarModal, cumplioReto } from "./modal.js";

document.addEventListener("DOMContentLoaded", function () {
    actualizarTurno();

    // Exponer funciones en `window` para el HTML
    window.siguienteTurno = siguienteTurno;
    window.mostrarModal = mostrarModal;
    window.cerrarModal = cerrarModal;
    window.cumplioReto = cumplioReto;
});
