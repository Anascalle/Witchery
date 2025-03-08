
import { ingredientes } from "../data/ingredients.js";
import { hechizos } from "../data/spell.js";
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

export function mostrarModalHechizo() {
    let modalHechizo = document.getElementById("modal-hechizo");
    let mensajeHechizo = document.getElementById("mensaje-hechizo");
    let codigoInput = document.getElementById("codigo-hechizo");
    let botonHechizo = document.querySelector("button");

    if (modalHechizo) {
        modalHechizo.style.display = "block";
    } else {
        console.error("Modal de hechizo no encontrado.");
    }

    // Limpiar cualquier mensaje previo
    mensajeHechizo.innerText = "";
    codigoInput.style.display = "block";
    botonHechizo.style.display = "block";
}

// Función para aplicar el efecto del hechizo al equipo contrario
export function aplicarEfectoHechizo(hechizo) {
    let equipoContrario = equipos[(turnoActual + 1) % equipos.length]; // El equipo contrario

    switch (hechizo.codigo) {
        case "A1B2":
            // Hechizo del Silencio
            console.log(`${equipoContrario.name} no puede hablar durante su turno.`);
            break;
        case "C3D4":
            // Visión Nublada
            console.log(`${equipoContrario.name} debe hacer el desafío con los ojos cerrados.`);
            break;
        case "E5F6":
            // Lengua Encantada I
            console.log(`${equipoContrario.name} solo puede hablar usando la vocal 'A'.`);
            break;
        case "G7H8":
            // Lengua Encantada II
            console.log(`${equipoContrario.name} solo puede hablar usando la vocal 'E'.`);
            break;
        case "I9J0":
            // Lengua Encantada III
            console.log(`${equipoContrario.name} solo puede hablar usando la vocal 'I'.`);
            break;
        case "K1L2":
            // Prueba del Oráculo
            console.log(`${equipoContrario.name} debe responder una pregunta de cultura mágica antes de continuar.`);
            break;
        case "M3N4":
            // Confusión Temporal
            
            console.log(`${equipoContrario.name} intercambia su turno con el otro equipo.`);
            break;
        case "O5P6":
            // Hechizo de Desorden
            console.log(`${equipoContrario.name} debe intercambiar los roles de los jugadores.`);
            break;
        case "Q7R8":
            // Reto Duplicado
            console.log(`${equipoContrario.name} debe completar dos desafíos en lugar de uno para avanzar.`);
            break;
        case "S9T0":
            // Máscara Maldita
            console.log(`${equipoContrario.name} debe actuar como un personaje (bruja, ogro, hada, etc.) hasta que termine el desafío.`);
            break;
        case "U1V2":
            // Dado Maldito
            console.log(`${equipoContrario.name} debe restar 2 al número obtenido con el dado.`);
            break;
        case "W3X4":
            // Manos Encantadas
            console.log(`${equipoContrario.name} no puede usar sus manos en el siguiente desafío.`);
            break;
        case "Y5Z6":
            // Pérdida de Tiempo
            console.log(`${equipoContrario.name} pierde 30 segundos en su próximo desafío.`);
            break;
        case "A7B8":
            // El Susurro
            console.log(`${equipoContrario.name} debe realizar su próximo desafío de "Piensa" en susurros.`);
            break;
        case "C9D0":
            // El Fantasma Burlón
            console.log(`Un jugador de ${equipoContrario.name} debe realizar el desafío de "Crea" con los ojos vendados.`);
            break;
        case "E1F2":
            // El Dragón Dormido
            console.log(`Un jugador de ${equipoContrario.name} debe "dormir" (no participar) en su siguiente turno.`);
            break;
        case "G3H4":
            // El Regalo Tóxico
            console.log(`${equipoContrario.name} recibe una pista falsa disfrazada como correcta.`);
            break;
        case "I5J6":
            // La Rueda de la Fortuna
            console.log(`${equipoContrario.name} debe jugar el reto que el equipo que sacó la carta decida.`);
            break;
        default:
            console.warn("Hechizo no reconocido.");
            break;
    }

    // Cerrar el modal de hechizo después de aplicar el efecto
    cerrarModalHechizo();
}


// Función para cerrar el modal de hechizo
export function cerrarModalHechizo() {
    let modalHechizo = document.getElementById("modal-hechizo");
    let codigoInput = document.getElementById("codigo-hechizo");
    let botonHechizo = document.querySelector("button");
    let modalTitulo = document.getElementById("titulo-hechizo");

    if (modalHechizo) {
        modalHechizo.style.display = "none";
    }

    // Restablecer los valores cuando se cierre el modal
    // Restaurar el título del modal a su valor original
    modalTitulo.innerText = "Ingresa el código del hechizo"; 

    // Mostrar de nuevo el input y el botón
    codigoInput.style.display = "block";
    botonHechizo.style.display = "block";

    // Limpiar el input
    codigoInput.value = "";
    
    // Limpiar el mensaje de hechizo
    let mensajeHechizo = document.getElementById("mensaje-hechizo");
    mensajeHechizo.innerText = "";
}

export function validarCodigo() {
    let codigoInput = document.getElementById("codigo-hechizo");
    let mensajeHechizo = document.getElementById("mensaje-hechizo");
    let botonHechizo = document.querySelector("button"); // Obtener el botón de lanzar hechizo
    let modalTitulo = document.getElementById("titulo-hechizo"); // Obtener el título del modal

    // Código de hechizo ingresado
    let codigo = codigoInput.value.trim();

    // Verifica si el código del hechizo existe
    const hechizoEncontrado = hechizos.find(hechizo => hechizo.codigo === codigo);

    if (hechizoEncontrado) {
        // Mostrar el nombre del hechizo en el título del modal
        modalTitulo.innerText = hechizoEncontrado.nombre;  // Actualiza el título con el nombre del hechizo
        mensajeHechizo.innerText = `${hechizoEncontrado.descripcion}`;

        // Actualizar el input para que muestre el nombre del hechizo
        codigoInput.value = hechizoEncontrado.nombre; // Aquí cambiamos el texto del input por el nombre del hechizo

        // Aquí puedes agregar la lógica para aplicar el hechizo en el juego
        console.log(`Hechizo lanzado: ${hechizoEncontrado.descripcion}`);

        // Ocultar el input y el botón después de lanzar el hechizo
        codigoInput.style.display = "none";
        botonHechizo.style.display = "none";
        
    } else {
        // Si el código no es válido
        mensajeHechizo.innerText = "¡Código inválido! Intenta de nuevo.";
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
    let cerrarHechizoBtn = document.getElementById("cerrar-hechizo");
    
    cerrarHechizoBtn.style.display = "none";
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
                cerrarHechizoBtn.style.display = "inline-block";
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

    if (!ingrediente || !Array.isArray(ingrediente.pistas) || ingrediente.pistas.length === 0) {
        console.warn(`Ingrediente no válido o sin pistas para el equipo ${equipoActual.name}.`);
        return;
    }

    // Inicializa el progreso del ingrediente si no está definido
    if (progresoPistas[ingrediente.nombre] === undefined) {
        progresoPistas[ingrediente.nombre] = 0;
    }

    let indicePista = progresoPistas[ingrediente.nombre];
    let totalPistas = ingrediente.pistas.length;

    let modalTitulo = document.getElementById("modal-titulo");
    let modalTexto = document.getElementById("modal-texto");
    let pistaImagen = document.getElementById("pista-imagen");
    let cumplioBtn = document.getElementById("cumplio-btn");
    let noCumplioBtn = document.getElementById("no-cumplio-btn");
    let verificarIngredientesBtn = document.getElementById("verificar-ingredientes-btn");

    if (indicePista < totalPistas) {
        // Mostrar la pista actual
        modalTitulo.innerText = `Pista ${indicePista + 1}`;
        modalTexto.innerText = ingrediente.pistas[indicePista];

        if (ingrediente.imagen) {
            pistaImagen.src = ingrediente.imagen;
            pistaImagen.style.display = "block";
        } else {
            pistaImagen.style.display = "none";
        }

        // Ocultar los botones en esta etapa
        cumplioBtn.style.display = "none";
        noCumplioBtn.style.display = "none";

        // Avanzar al siguiente nivel de pista
        progresoPistas[ingrediente.nombre]++;
    } else {
        // Todas las pistas han sido mostradas para este ingrediente
        console.log(`Todas las pistas de "${ingrediente.nombre}" han sido mostradas.`);
        ingredienteActualIndex++;

        // Si era el último ingrediente, pasar al siguiente turno
        if (ingredienteActualIndex >= equipoActual.ingredients.length) {
            console.log("Todos los ingredientes han sido procesados. Cambio de turno.");

            // **Retrasar la aparición del botón hasta el inicio de la nueva ronda**
            setTimeout(() => {
                if (verificarIngredientesBtn) {
                    verificarIngredientesBtn.style.display = "inline-block";
                }
            }, 1000); // Retraso de 1 segundo antes de mostrar el botón

            ingredienteActualIndex = 0;  // Reiniciar el índice para el siguiente turno
        } else {
            // Cargar el siguiente ingrediente y su primera pista
            let siguienteIngrediente = equipoActual.ingredients[ingredienteActualIndex];
            console.log(`Pasando al siguiente ingrediente: ${siguienteIngrediente.nombre}`);

            modalTitulo.innerText = "Pista 1";
            modalTexto.innerText = siguienteIngrediente.pistas[0];

            if (siguienteIngrediente.imagen) {
                pistaImagen.src = siguienteIngrediente.imagen;
                pistaImagen.style.display = "block";
            } else {
                pistaImagen.style.display = "none";
            }

            // Reiniciar el progreso de pistas del nuevo ingrediente
            progresoPistas[siguienteIngrediente.nombre] = 1;
        }

        // Ocultar botones en esta etapa
        cumplioBtn.style.display = "none";
        noCumplioBtn.style.display = "none";
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