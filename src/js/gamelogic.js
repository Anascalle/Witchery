import { actualizarTurno, siguienteTurno } from "./turns.js";
import { mostrarModal, cerrarModal, cumplioReto, noCumplioReto, mostrarModalHechizo, validarCodigo, cerrarModalHechizo  } from "./modal.js";

document.addEventListener("DOMContentLoaded", function () {
    const turnoElemento = document.getElementById("turno");
    const verificarBtn = document.getElementById("verificar-btn");

    if (turnoElemento) {
        actualizarTurno();
    } else {
        console.error("No se encontró el elemento 'turno' en el DOM.");
    }

    if (!verificarBtn) {
        console.error("No se encontró el botón 'verificar-btn' en el DOM.");
    }

    window.siguienteTurno = siguienteTurno;
    window.mostrarModal = mostrarModal;
    window.cerrarModal = cerrarModal;
    window.cumplioReto = cumplioReto;
    window.noCumplioReto = noCumplioReto; 
    window.mostrarModalHechizo = mostrarModalHechizo; 
    window.validarCodigo = validarCodigo;
    window.cerrarModalHechizo = cerrarModalHechizo;
});
