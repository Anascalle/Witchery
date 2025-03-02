import { actualizarTurno, siguienteTurno } from "./turns.js";
import { mostrarModal, cerrarModal, cumplioReto, noCumplioReto, mostrarModalHechizo, validarCodigo, cerrarModalHechizo, } from "./modal.js";

document.addEventListener("DOMContentLoaded", function () {
   
    const turnoElemento = document.getElementById("turno");
    if (turnoElemento) {
        actualizarTurno();
    } else {
        console.error("No se encontró el elemento 'turno' en el DOM.");
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
