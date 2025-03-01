import { actualizarTurno, siguienteTurno } from "./turns.js";
import { mostrarModal, cerrarModal, cumplioReto, noCumplioReto} from "./modal.js";

document.addEventListener("DOMContentLoaded", function () {
   
    const turnoElemento = document.getElementById("turno");
    if (turnoElemento) {
        actualizarTurno();
    } else {
        console.error("No se encontró el elemento 'turno' en el DOM.");
    }

    // Exponer funciones en `window` para el HTML
    window.siguienteTurno = siguienteTurno;
    window.mostrarModal = mostrarModal;
    window.cerrarModal = cerrarModal;
    window.cumplioReto = cumplioReto;
    window.noCumplioReto = noCumplioReto; 
});

