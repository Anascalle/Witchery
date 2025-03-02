
import { retos } from "../data/challenges.js";
import { ingredientes } from "../data/ingredients.js";
import { hechizos } from "../data/spell.js";
import { preguntasPiensa } from "../data/challenges.js";

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


export function mostrarModal(categoria, ingredienteNombre = null) {
    let modalTitulo = document.getElementById("modal-titulo");
    let modalTexto = document.getElementById("modal-texto");
    let modal = document.getElementById("modal");
    let cumplioBtn = document.getElementById("cumplio-btn");
    let noCumplioBtn = document.getElementById("no-cumplio-btn");
    let pistaImagen = document.getElementById("pista-imagen");
    let iniciarBtn = document.getElementById("iniciar-btn");
    let opcionesContainer = document.getElementById("opciones-container");

    if (!modalTitulo || !modalTexto || !modal || !cumplioBtn || !noCumplioBtn || !iniciarBtn || !opcionesContainer) {
        return;
    }

    // Escondemos los botones de "cumplió" o "no cumplió" al principio
    cumplioBtn.style.display = "none";
    noCumplioBtn.style.display = "none";
    opcionesContainer.style.display = "none"; // Ocultar opciones inicialmente

    // Obtener una pregunta aleatoria de "Piensa"
    let preguntaAleatoria = preguntasPiensa[Math.floor(Math.random() * preguntasPiensa.length)];

    modalTitulo.innerText = "Piensa"; // Mantener el título de la categoría visible

    if (preguntaAleatoria.tipo === "seleccion") {
        // En la categoría "selección" no mostramos el botón de inicio
        iniciarBtn.style.display = "none"; 

        modalTexto.innerHTML = `<p>${preguntaAleatoria.pregunta}</p>`;

        // Crear opciones de respuesta como botones
        opcionesContainer.innerHTML = ''; // Limpiar las opciones anteriores
        preguntaAleatoria.opciones.forEach((opcion) => {
            let opcionElemento = document.createElement('button');
            opcionElemento.classList.add('opcion');
            opcionElemento.innerText = opcion;
            opcionElemento.onclick = function () {
                mostrarResultado(opcion, preguntaAleatoria.respuestaCorrecta, opcionesContainer);
            };
            opcionesContainer.appendChild(opcionElemento);
        });

        // Mostrar las opciones de respuesta
        opcionesContainer.style.display = "block"; // Mostrar las opciones
        pistaImagen.style.display = "none"; // No mostrar imagen

    } else if (preguntaAleatoria.tipo === "reto") {
        // Mostrar la categoría y la pregunta al principio
        modalTexto.innerHTML = `<p>${preguntaAleatoria.pregunta}</p><p><em>Respuesta correcta: ${preguntaAleatoria.respuestaCorrecta}</em></p>`;
        
        // Al presionar el botón de iniciar, se inicia el cronómetro
        iniciarBtn.onclick = function () {
            // Esconder la consigna (texto de la pregunta) pero no el título
            modalTexto.innerHTML = ''; // Limpiar solo la consigna
            iniciarBtn.style.display = "none"; // Ocultar botón de iniciar

            // Iniciar el cronómetro y mostrar el tiempo
            let tiempoRestante = preguntaAleatoria.tiempoLimite;
            let temporizador = document.createElement('p');
            temporizador.innerText = `Tiempo restante: ${tiempoRestante} segundos`;
            modalTexto.appendChild(temporizador);

            let intervalo = setInterval(function() {
                tiempoRestante--;
                temporizador.innerText = `Tiempo restante: ${tiempoRestante} segundos`;
                if (tiempoRestante <= 0) {
                    clearInterval(intervalo);
                    temporizador.innerText = "¡Tiempo agotado!";

                    // Mostrar la respuesta correcta y los botones "cumplió" o "no cumplió"
                    setTimeout(() => {
                        modalTexto.innerHTML = `<p>El tiempo ha terminado. La respuesta correcta es: ${preguntaAleatoria.respuestaCorrecta}</p>`;
                        cumplioBtn.style.display = "inline-block";
                        noCumplioBtn.style.display = "inline-block";
                    }, 1000);  // Esperar un segundo antes de mostrar la respuesta correcta
                }
            }, 1000); // Actualiza cada segundo

            // Cambiar visibilidad de los botones al iniciar
            cumplioBtn.style.display = "none";
            noCumplioBtn.style.display = "none";
        };

        opcionesContainer.style.display = "none"; // No mostrar opciones en un reto
        pistaImagen.style.display = "none"; // Si no se requiere imagen
    }

    // Manejo de los botones de cumplió y no cumplió
    cumplioBtn.onclick = function () {
        cumplioReto(); // Llamar a la función correspondiente para avanzar al siguiente reto
    };

    noCumplioBtn.onclick = function () {
        noCumplioReto(); // Llamar a la función correspondiente para avanzar al siguiente reto
    };

    modal.style.display = "block";
}


// Función para mostrar el resultado (respuesta correcta o incorrecta)
function mostrarResultado(opcionSeleccionada, respuestaCorrecta, opcionesContainer) {
    let mensaje = document.createElement('p');
    if (opcionSeleccionada === respuestaCorrecta) {
        mensaje.innerText = "¡Respuesta correcta!";
        mensaje.style.color = "green";

        // Mostrar el mensaje por un breve momento (3 segundos)
        setTimeout(() => {
            // Avanzar al siguiente reto o pista
            opcionesContainer.style.display = "none"; // Ocultar opciones
            cumplioReto(); // Esto avanza al siguiente nivel de pista
        }, 3000); // El mensaje permanece por 3 segundos
    } else {
        mensaje.innerText = "Respuesta incorrecta. La respuesta correcta era: " + respuestaCorrecta;
        mensaje.style.color = "red";

        // Mostrar el mensaje por un tiempo más largo (3 segundos)
        setTimeout(() => {
            // Ocultar las opciones y permitir un nuevo intento o pasar al siguiente reto
            opcionesContainer.style.display = "none"; // Ocultar opciones
            noCumplioReto(); // Esto pasa al siguiente reto sin avanzar en la pista
        }, 3000); // El mensaje permanece por 3 segundos
    }

    // Añadir el mensaje de respuesta
    opcionesContainer.appendChild(mensaje);
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
        modalTitulo.innerText = `Pista ${pistaNumero}`;
        modalTexto.innerText = ingrediente.pistas[progresoPistas[ingrediente.nombre]];

        if (ingrediente.imagen) {
            pistaImagen.src = ingrediente.imagen;
            pistaImagen.style.display = "block";
        }

        // Esconde los botones en esta etapa, ya que los botones solo se mostrarán después de que se haya mostrado la pista
        cumplioBtn.style.display = "none";
        noCumplioBtn.style.display = "none";

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