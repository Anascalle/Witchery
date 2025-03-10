import { actualizarTurno, siguienteTurno } from "./turns.js";
import { mostrarModal, cerrarModal, cumplioReto, noCumplioReto,  } from "./modal.js";
import { mostrarModalHechizo, validarCodigo, cerrarModalHechizo, mostrarModalOraculo } from "./curses.js"

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
    window.mostrarModalOraculo = mostrarModalOraculo;
  
});