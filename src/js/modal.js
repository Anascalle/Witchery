import { ingredientes } from "../data/ingredients.js";
import { preguntasPiensa } from "../data/challenges.js";
import { preguntasEscribe } from "../data/challenges.js";
import { preguntasCrea } from "../data/challenges.js";
import { preguntasActua } from "../data/challenges.js";


export let equipos = JSON.parse(localStorage.getItem("equipos")) || [];
export let turnoActual = JSON.parse(localStorage.getItem("turnoActual")) || 0;


let progresoPistas = {};
let ingredienteActualIndex = 0; 


export function actualizarTurno() {
    let turnoElemento = document.getElementById("turno");

    if (equipos.length > 0 && turnoElemento) {
        turnoElemento.innerText = `Turno de: ${equipos[turnoActual].name}`;
    } else {
        console.warn("No hay equipos disponibles o no se encontró el elemento 'turno'.");
    }
}

export function siguienteTurno() {
    if (equipos.length > 0) {
        turnoActual = (turnoActual + 1) % equipos.length; 
        localStorage.setItem("turnoActual", JSON.stringify(turnoActual)); 
        actualizarTurno(); 
        console.log(`Ahora es el turno de: ${equipos[turnoActual].name}`);
    } else {
        console.warn("No hay equipos para cambiar el turno.");
    }
}

let preguntasMostradas = [];  // Array para almacenar las preguntas ya mostradas

export function mostrarModal(categoria, ingredienteNombre = null) {
    // Los elementos del modal
    let modalTitulo = document.getElementById("modal-titulo");
    let modalTexto = document.getElementById("modal-texto");
    let modal = document.getElementById("modal");
    let cumplioBtn = document.getElementById("cumplio-btn");
    let noCumplioBtn = document.getElementById("no-cumplio-btn");
    let pistaImagen = document.getElementById("pista-imagen");
    let iniciarBtn = document.getElementById("iniciar-btn");
    let opcionesContainer = document.getElementById("opciones-container");
    let enviarRespuestaBtn = document.getElementById("enviar-respuesta-btn");
    let instructivoContainer = document.getElementById("palabra-container");
    let verRespuestaBtn = document.getElementById("ver-respuesta-btn");

    if (!modalTitulo || !modalTexto || !modal || !cumplioBtn || !noCumplioBtn || !opcionesContainer || !instructivoContainer || !verRespuestaBtn) {
        console.error("Elementos del modal no encontrados.");
        return;
    }

    let preguntaAleatoria = null;

    // Inicializamos la visibilidad de los botones
    iniciarBtn.style.display = "inline-block"; 
    cumplioBtn.style.display = "none"; 
    noCumplioBtn.style.display = "none"; 
    opcionesContainer.style.display = "none"; 
    instructivoContainer.style.display = "none";  
    verRespuestaBtn.style.display = "none"; 

    // Selección de preguntas según la categoría
    if (categoria === "Piensa" || categoria === "Escribe" || categoria === "Crea" || categoria === "Actúa") {
        let preguntas;
        if (categoria === "Piensa") {
            preguntas = preguntasPiensa;
        } else if (categoria === "Escribe") {
            preguntas = preguntasEscribe;
        } else if (categoria === "Crea") {
            preguntas = preguntasCrea;
        } else if (categoria === "Actúa") {
            preguntas = preguntasActua;  // Asumimos que preguntasActua contiene las preguntas para la categoría Actua
        }

        if (preguntas.length === 0) {
            console.error(`No hay preguntas disponibles para la categoría ${categoria}`);
            return;
        }

        // Filtramos las preguntas que ya han sido mostradas
        let preguntasDisponibles = preguntas.filter(pregunta => !preguntasMostradas.includes(pregunta.pregunta));

        if (preguntasDisponibles.length === 0) {
            preguntasMostradas = [];
            preguntasDisponibles = preguntas;
        }

        preguntaAleatoria = preguntasDisponibles[Math.floor(Math.random() * preguntasDisponibles.length)];

        if (!preguntaAleatoria || !preguntaAleatoria.tipo) {
            console.error("La pregunta aleatoria no tiene un tipo válido.");
            return;
        }

        preguntasMostradas.push(preguntaAleatoria.pregunta);

        modalTitulo.innerText = categoria;

        let textoPregunta = `<p>${preguntaAleatoria.pregunta}</p>`;
        if (preguntaAleatoria.participantes === "Todos") {
            textoPregunta += `<p><strong>Participantes:</strong> Todos</p>`;
        }

        modalTexto.innerHTML = textoPregunta;

        if (preguntaAleatoria.tipo === "acertijo") {
            verRespuestaBtn.style.display = "none"; 
        }

        if (preguntaAleatoria.tipo === "rellena") {
            let inputElemento = document.createElement('input');
            inputElemento.type = 'text';
            inputElemento.placeholder = 'Escribe tu respuesta aquí...';
            inputElemento.id = 'respuesta-input';
            opcionesContainer.innerHTML = '';
            opcionesContainer.appendChild(inputElemento);
            opcionesContainer.style.display = "block"; 
            enviarRespuestaBtn.style.display = "inline-block"; 
            iniciarBtn.style.display = "none";  
        } else if (Array.isArray(preguntaAleatoria.opciones)) {
            opcionesContainer.innerHTML = ''; 
            preguntaAleatoria.opciones.forEach((opcion) => {
                let opcionElemento = document.createElement('button');
                opcionElemento.classList.add('opcion');
                opcionElemento.innerText = opcion;
                opcionElemento.onclick = function () {
                    validarRespuesta(opcion, preguntaAleatoria.respuestaCorrecta, opcionesContainer);
                };
                opcionesContainer.appendChild(opcionElemento);
            });
            opcionesContainer.style.display = "block"; 
            iniciarBtn.style.display = "none";  
        } else if (preguntaAleatoria.tipo === "reto" && Array.isArray(preguntaAleatoria.elige)) {
            // Mostrar las opciones como una lista en lugar de botones
            opcionesContainer.innerHTML = '';  
            let lista = document.createElement('ul'); // Creamos una lista <ul> para las opciones
            preguntaAleatoria.elige.forEach((opcion) => {
                let listaItem = document.createElement('li'); // Cada opción será un <li>
                listaItem.classList.add('opcion');
                listaItem.innerText = opcion;
                lista.appendChild(listaItem);  // Añadimos el <li> a la lista
            });
            opcionesContainer.appendChild(lista);  // Añadimos la lista al contenedor
            opcionesContainer.style.display = "block"; 
            iniciarBtn.style.display = "inline-block";  
        } else {
            iniciarBtn.style.display = "inline-block";  
            opcionesContainer.style.display = "none";  
        }

        pistaImagen.style.display = "none";  
    } else if (ingredienteNombre) {
        // Lógica para la categoría Ingrediente (sin cambios)
        let ingrediente = ingredientes.find(i => i.nombre === ingredienteNombre);
        if (!ingrediente || !ingrediente.pistas || !Array.isArray(ingrediente.pistas)) {
            console.warn(`Ingrediente "${ingredienteNombre}" no encontrado o sin pistas.`);
            return;
        }

        progresoPistas[ingredienteNombre] = 0;
        let pistaActual = ingrediente.pistas[0];
        modalTitulo.innerText = "Pista 1";
        modalTexto.innerText = pistaActual;

        if (ingrediente.imagen) {
            pistaImagen.src = ingrediente.imagen;
            pistaImagen.style.display = "block";
        } else {
            pistaImagen.style.display = "none";
        }
    } else {
        if (!retos[categoria]) {
            console.warn(`Categoría "${categoria}" no encontrada.`);
            return;
        }
        let retoAleatorio = retos[categoria][Math.floor(Math.random() * retos[categoria].length)];
        modalTitulo.innerText = categoria;
        modalTexto.innerText = retoAleatorio;
        pistaImagen.style.display = "none";
    }

    // Si no hay texto en el modal y solo los botones de "cumplio" o "no cumplio", mostramos "Juego en curso"
    if (modalTexto.innerHTML === "" && cumplioBtn.style.display === "inline-block") {
        modalTexto.innerHTML = "<p><strong>Juego en curso...</strong></p>";
    }

    // Función para manejar la acción de "Iniciar"
    iniciarBtn.onclick = function () {
        cumplioBtn.style.display = "inline-block";
        noCumplioBtn.style.display = "inline-block";
        iniciarBtn.style.display = "none";
        opcionesContainer.style.display = "none";  

        if (categoria === "Actúa") {
            modalTexto.style.display = "none";  
        } else {
            modalTexto.style.display = "block";  
        }

        if (preguntaAleatoria && preguntaAleatoria.tipo && preguntaAleatoria.tipo === "acertijo") {
            verRespuestaBtn.style.display = "inline-block"; 
        }

        instructivoContainer.style.display = "inline-block";  

        if (categoria === "Escribe") {
            modalTexto.style.display = "block";  
        } else if ((categoria === "Piensa" && preguntaAleatoria?.tipo === "reto") || categoria === "Crea") {
            modalTexto.style.display = "none";  
        }

        cumplioBtn.onclick = function () {
            if ((categoria === "Piensa" && preguntaAleatoria?.tipo === "reto") || categoria === "Escribe" || categoria === "Crea" || categoria === "Actúa") {
                modalTexto.style.display = "block";
                instructivoContainer.style.display = "none";
            }
            cumplioReto();
        };

        noCumplioBtn.onclick = function () {
            if ((categoria === "Piensa" && preguntaAleatoria?.tipo === "reto") || categoria === "Escribe" || categoria === "Crea" || categoria === "Actúa") {
                modalTexto.style.display = "block";
            }
            noCumplioReto();
        };
    };

    // Mostrar respuesta cuando se hace clic en el botón "Ver respuesta"
    verRespuestaBtn.onclick = function() {
        console.log("Botón 'Ver respuesta' presionado.");

        if (preguntaAleatoria && preguntaAleatoria.respuestaCorrecta) {
            let respuestaHTML = `<p><strong>Respuesta:</strong> ${preguntaAleatoria.respuestaCorrecta}</p>`;
            modalTexto.innerHTML += respuestaHTML;
            console.log("Respuesta añadida al modal:", respuestaHTML);
            modalTexto.style.display = "block";
            verRespuestaBtn.style.display = "none"; 
        } else {
            console.error("No se ha encontrado la respuesta correcta.");
        }
    };

    enviarRespuestaBtn.onclick = function () {
        let inputElemento = document.getElementById('respuesta-input');
        let opcionSeleccionada = inputElemento.value.trim();
        if (opcionSeleccionada === "") {
            alert("Por favor ingresa una respuesta.");
            return;
        }
        validarRespuesta(opcionSeleccionada, preguntaAleatoria.respuestaCorrecta, opcionesContainer);
        enviarRespuestaBtn.style.display = "none";
    };

    modal.style.display = "block";
}






function validarRespuesta(opcionSeleccionada, respuestaCorrecta, opcionesContainer, esReto) {
    let mensaje = document.createElement('p');
    let tiempoEspera = 3000; // Siempre 3s para "rellena"

    // Verificamos si la opción es de tipo "rellena"
    if (opcionesContainer.querySelector('input')) {
        // Es un campo de texto
        let inputElemento = document.getElementById('respuesta-input');
        opcionSeleccionada = inputElemento.value.trim(); // Tomamos lo que se haya ingresado
        if (opcionSeleccionada === respuestaCorrecta) {
            mensaje.innerText = "¡Respuesta correcta!";
            mensaje.style.color = "green";
        } else {
            mensaje.innerText = `Respuesta incorrecta. La respuesta correcta era: ${respuestaCorrecta}`;
            mensaje.style.color = "red";
        }
    } else {
        // Comportamiento normal de opciones
        if (opcionSeleccionada === respuestaCorrecta) {
            mensaje.innerText = "¡Respuesta correcta!";
            mensaje.style.color = "green";
        } else {
            mensaje.innerText = "Respuesta incorrecta. La respuesta correcta era: " + respuestaCorrecta;
            mensaje.style.color = "red";
        }
    }

    opcionesContainer.appendChild(mensaje);

    setTimeout(() => {
        opcionesContainer.innerHTML = ''; // Limpia las opciones y el mensaje

        if (esReto) {
            opcionesContainer.style.display = "none"; // Oculta el texto en los retos
        }

        if (opcionSeleccionada === respuestaCorrecta) {
            cumplioReto(); // Continúa con la pista
        } else {
            cerrarModal(); // Cambia de turno
        }
    }, tiempoEspera);
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

    // Si el progreso del ingrediente no ha sido establecido, comienza desde la primera pista
    if (progresoPistas[ingrediente.nombre] === undefined) {
        progresoPistas[ingrediente.nombre] = 0;  // Comienza en la pista 0
    }

    // Verifica si aún hay más pistas para mostrar
    if (progresoPistas[ingrediente.nombre] < ingrediente.pistas.length) {
        let pistaNumero = progresoPistas[ingrediente.nombre] + 1;
        let modalTitulo = document.getElementById("modal-titulo");
        let modalTexto = document.getElementById("modal-texto");
        let cumplioBtn = document.getElementById("cumplio-btn");
        let noCumplioBtn = document.getElementById("no-cumplio-btn");
        let pistaImagen = document.getElementById("pista-imagen");

        // Mostrar la pista actual
        modalTitulo.innerText = `Pista  ${pistaNumero}`;
        modalTexto.innerText = ingrediente.pistas[progresoPistas[ingrediente.nombre]];

        if (ingrediente.imagen) {
            pistaImagen.src = ingrediente.imagen;
            pistaImagen.style.display = "block";
        }

        // Esconde los botones en esta etapa, ya que los botones solo se mostrarán después de que se haya mostrado la pista
        cumplioBtn.style.display = "none";
        noCumplioBtn.style.display = "none";

        // Mostrar en consola el nombre del ingrediente que se está procesando
        console.log(`Dando pista para el ingrediente: ${ingrediente.nombre}`);

        // Avanzar al siguiente nivel de pista
        progresoPistas[ingrediente.nombre]++;
    } else {
        // Si ya se han mostrado todas las pistas para este ingrediente
        console.log(`Todas las pistas de "${ingrediente.nombre}" han sido mostradas.`);
        ingredienteActualIndex++;

        // Verifica si se han procesado todos los ingredientes del equipo
        if (ingredienteActualIndex >= equipoActual.ingredients.length) {
            console.log("Todos los ingredientes han sido procesados.");
            ingredienteActualIndex = 0;  // Reinicia para el siguiente turno
            siguienteTurno();  // Avanzar al siguiente turno si todos los ingredientes han sido procesados
        } else {
            console.log(`Pasando al siguiente ingrediente: ${equipoActual.ingredients[ingredienteActualIndex].nombre}`);

            // Asegúrate de ocultar el texto de pistas y botones cuando se pase al siguiente ingrediente
            let modalTitulo = document.getElementById("modal-titulo");
            let modalTexto = document.getElementById("modal-texto");
            let pistaImagen = document.getElementById("pista-imagen");
            let cumplioBtn = document.getElementById("cumplio-btn");
            let noCumplioBtn = document.getElementById("no-cumplio-btn");

            // Limpiar el contenido del modal antes de mostrar el siguiente ingrediente
            modalTitulo.innerText = '';
            modalTexto.innerText = '';
            pistaImagen.style.display = "none";  // Esconde la imagen
            cumplioBtn.style.display = "none";   // Esconde el botón
            noCumplioBtn.style.display = "none"; // Esconde el otro botón

            // Ahora, carga el siguiente ingrediente y su primera pista
            let siguienteIngrediente = equipoActual.ingredients[ingredienteActualIndex];
            if (siguienteIngrediente && siguienteIngrediente.pistas.length > 0) {
                // Mostrar la primera pista del siguiente ingrediente
                modalTitulo.innerText = "Pista 1";
                modalTexto.innerText = siguienteIngrediente.pistas[0];

                if (siguienteIngrediente.imagen) {
                    pistaImagen.src = siguienteIngrediente.imagen;
                    pistaImagen.style.display = "block";
                }

                // Esconder los botones ya que no deben aparecer en esta fase
                cumplioBtn.style.display = "none";
                noCumplioBtn.style.display = "none";

                // Restablecer el progreso de pistas del nuevo ingrediente
                progresoPistas[siguienteIngrediente.nombre] = 0;
            }
        }
    }
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