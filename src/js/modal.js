
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
        setTimeout(() => {
            verificarIngredientes();
        }, 500);
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
    const modalTitulo = document.getElementById("modal-titulo");
    const modalTexto = document.getElementById("modal-texto");
    const modal = document.getElementById("modal");
    const cumplioBtn = document.getElementById("cumplio-btn");
    const noCumplioBtn = document.getElementById("no-cumplio-btn");
    const iniciarBtn = document.getElementById("iniciar-btn");
    const opcionesContainer = document.getElementById("opciones-container");
    const enviarRespuestaBtn = document.getElementById("enviar-respuesta-btn");
    const instructivoContainer = document.getElementById("palabra-container");
    const verRespuestaBtn = document.getElementById("ver-respuesta-btn");
    const cerrarHechizoBtn = document.getElementById("cerrar-hechizos");

    cerrarHechizoBtn.style.display = "none";

    // Validación de elementos del modal
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
    let preguntas = [];
    if (categoria === "Piensa") preguntas = preguntasPiensa;
    else if (categoria === "Escribe") preguntas = preguntasEscribe;
    else if (categoria === "Crea") preguntas = preguntasCrea;
    else if (categoria === "Actúa") preguntas = preguntasActua;

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
    instructivoContainer.style.display = "none";

    // Mostrar las palabras si están definidas y es necesario
    if (preguntaAleatoria.palabras) {
        let palabrasTexto = `<p><strong>Palabras:</strong></p><ul>`;
        preguntaAleatoria.palabras.forEach(palabra => {
            palabrasTexto += `<li>${palabra}</li>`;
        });
        palabrasTexto += `</ul>`;
        
        instructivoContainer.innerHTML = palabrasTexto;
        instructivoContainer.style.display = "inline-block";  // Mostrar solo si hay palabras
    }

    if (preguntaAleatoria.tipo === "acertijo") {
        verRespuestaBtn.style.display = "none"; 
    }
    if (preguntaAleatoria.tipo === "rellena" || Array.isArray(preguntaAleatoria.opciones)) {
        // Mostrar las opciones de tipo "rellena" o "selecciona"
        opcionesContainer.innerHTML = '';
        
        if (preguntaAleatoria.tipo === "rellena") {
            let inputElemento = document.createElement('input');
            inputElemento.type = 'text';
            inputElemento.placeholder = 'Escribe tu respuesta aquí...';
            inputElemento.id = 'respuesta-input';
            opcionesContainer.appendChild(inputElemento);
            opcionesContainer.style.display = "block"; 
            enviarRespuestaBtn.style.display = "inline-block"; 
            iniciarBtn.style.display = "none";  
        } else if (Array.isArray(preguntaAleatoria.opciones)) {
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
        }
        
        // Mostrar la "X" de cerrar solo en la pista (rellena o selecciona)
        cerrarHechizoBtn.style.display = "inline-block"; 
    } else if (preguntaAleatoria.tipo === "reto" && Array.isArray(preguntaAleatoria.elige)) {
        // Mostrar opciones como una lista <ul> solo para el tipo "reto"
        opcionesContainer.innerHTML = '';  
        let lista = document.createElement('ul');
        preguntaAleatoria.elige.forEach((opcion) => {
            let listaItem = document.createElement('li');
            listaItem.classList.add('opcion');
            listaItem.innerText = opcion;
            lista.appendChild(listaItem);
        });
        opcionesContainer.appendChild(lista);
        opcionesContainer.style.display = "block"; 
        iniciarBtn.style.display = "inline-block";  
    
        // No mostrar la "X" de cierre en los retos
        cerrarHechizoBtn.style.display = "none"; 
    } else {
        iniciarBtn.style.display = "inline-block";  
        opcionesContainer.style.display = "none";  
        cerrarHechizoBtn.style.display = "none"; // Esconde la "X" cuando no es ni pista ni reto
    }
    
    // Si no hay texto en el modal y solo los botones de "cumplio" o "no cumplio", mostramos "Juego en curso"
    if (modalTexto.innerHTML === "" && cumplioBtn.style.display === "inline-block") {
        modalTexto.innerHTML = "<p><strong>Juego en curso...</strong></p>";
    }
    
    
    iniciarBtn.onclick = function () {
        cumplioBtn.style.display = "none"; // Escondemos los botones de cumplió y no cumplió
        noCumplioBtn.style.display = "none";
        iniciarBtn.style.display = "none";
        verRespuestaBtn.style.display = "none";
        opcionesContainer.style.display = "none";  
    
        if ((categoria === "Actúa" || categoria === "Crea") && preguntaAleatoria.tipo !== "acertijo") {
            modalTexto.style.display = "none";  
        } else {
            modalTexto.style.display = "block";  
        }
    
        if (preguntaAleatoria && preguntaAleatoria.tipo === "acertijo") {
            verRespuestaBtn.style.display = "inline-block"; 
        } else{
            cumplioBtn.style.display = "inline-block"; // Para las demás preguntas, mostramos los botones cumplió/no cumplió
            noCumplioBtn.style.display = "inline-block";  
        }
        if (categoria === "Piensa" && preguntaAleatoria.tipo === "reto") {
            opcionesContainer.style.display = "none";
            modalTexto.style.display= "none"  // Escondemos las opciones si es un reto de la categoría Piensa
        }
        iniciarBtn.style.display = "none"; // Ocultamos el botón de iniciar
        opcionesContainer.style.display = "none";  // Ocultamos las opciones si las hay
    };
    
    cumplioBtn.onclick = function () {
        if ((categoria === "Piensa" && preguntaAleatoria?.tipo === "reto") || categoria === "Escribe" || categoria === "Crea" || categoria === "Actúa") {
            modalTexto.style.display = "block";
            instructivoContainer.style.display = "none";
            cerrarHechizoBtn.style.display = "inline-block"; // Mostrar la "X" al cumplir un reto
        }
        cumplioReto();
    };
    
    noCumplioBtn.onclick = function () {
        if ((categoria === "Piensa" && preguntaAleatoria?.tipo === "reto") || categoria === "Escribe" || categoria === "Crea" || categoria === "Actúa") {
            modalTexto.style.display = "block";
        }
        noCumplioReto();
    };
    
    verRespuestaBtn.onclick = function() {
        if (preguntaAleatoria && preguntaAleatoria.respuestaCorrecta) {
            let respuestaHTML = `<p><strong>Respuesta:</strong> ${preguntaAleatoria.respuestaCorrecta}</p>`;
            modalTexto.innerHTML += respuestaHTML;
            modalTexto.style.display = "block";
        
            // Después de mostrar la respuesta, mostramos los botones "Cumplió" y "No cumplió"
            cumplioBtn.style.display = "inline-block";
            noCumplioBtn.style.display = "inline-block";
            verRespuestaBtn.style.display = "none"; // Escondemos el botón "Ver respuesta" después de presionarlo
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
    let tiempoEspera = 2000; // Siempre 3s para "rellena"

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


export function verificarIngredientes() {
    let verificarIngredientesBtn = document.getElementById("verificar-ingredientes-btn");
    let modal = document.getElementById("modal-verificacion");
    let contenedorIngredientes = document.getElementById("contenedor-ingredientes");
    let equipoActual = equipos[turnoActual];

    // Array para almacenar los ingredientes seleccionados
    let ingredientesSeleccionados = [];
    let botonesIngredientes = [];

    if (!equipoActual || !Array.isArray(equipoActual.ingredients)) {
        console.warn("⚠️ No hay ingredientes asignados al equipo.");
        return;
    }

    if (equiposCompletados[equipoActual.name]) {
        verificarIngredientesBtn.style.display = "inline-block";

        verificarIngredientesBtn.onclick = function() {
            contenedorIngredientes.innerHTML = ""; // Limpiar contenido previo
            ingredientesSeleccionados = []; // Resetear las selecciones anteriores
            botonesIngredientes = []; // Resetear botones anteriores

            ingredientes.forEach(ingrediente => {
                // Crear un botón para cada ingrediente
                let button = document.createElement("button");
                button.classList.add("boton-ingrediente");

                // Crear imagen para el ingrediente
                let img = document.createElement("img");
                img.src = ingrediente.imagen || "ruta/por/defecto/imagen.jpg"; // Ruta por defecto en caso de que la imagen esté vacía
                img.alt = ingrediente.nombre;
                img.style.width = "100px";  // Ajusta el tamaño de la imagen
                img.style.height = "100px";
                img.style.marginRight = "10px";  // Espacio entre la imagen y el texto

                // Asignamos el nombre del ingrediente como atributo `data-name` y lo ocultamos visualmente
                button.setAttribute("data-name", ingrediente.nombre);
                button.setAttribute("data-id", ingrediente.id); // (Si necesitas un identificador único)

                // Agregar la imagen al botón
                button.appendChild(img);

                // Agregar el botón al contenedor
                contenedorIngredientes.appendChild(button);

                // Establecer el comportamiento del botón (agregar ingredientes seleccionados)
                button.onclick = function() {
                    if (ingredientesSeleccionados.length < 3) {
                        // Si aún no hemos seleccionado 3 ingredientes, agregar este
                        let nombreIngrediente = button.getAttribute("data-name");

                        if (!ingredientesSeleccionados.includes(nombreIngrediente)) {
                            ingredientesSeleccionados.push(nombreIngrediente);
                            console.log(`Seleccionado: ${nombreIngrediente}`);

                            // Añadir clase o estilo para marcar el ingrediente como seleccionado
                            button.classList.add("seleccionado");

                            // Mostrar el número de ingredientes seleccionados
                            console.log(`Ingredientes seleccionados: ${ingredientesSeleccionados.length}`);
                        }
                    } else {
                        alert("¡Ya seleccionaste 3 ingredientes!");
                    }
                };

                // Guardar los botones para referencia futura
                botonesIngredientes.push(button);
            });

            // Botón de verificación
            let botonVerificar = document.createElement("button");
            botonVerificar.textContent = "Verificar Selección";
            botonVerificar.onclick = function() {
                // Normalizar la comparación: convertir a minúsculas y eliminar espacios
                let ingredientesSeleccionadosNormalizados = ingredientesSeleccionados.map(ingrediente => 
                    String(ingrediente).trim().toLowerCase()
                );
                let ingredientesEsperadosNormalizados = equipoActual.ingredients.map(ingrediente => 
                    String(ingrediente.nombre).trim().toLowerCase() // Asegurándonos de comparar solo el nombre
                );

                // Comparar los ingredientes seleccionados con los ingredientes del equipo
                if (JSON.stringify(ingredientesSeleccionadosNormalizados.sort()) === JSON.stringify(ingredientesEsperadosNormalizados.sort())) {
                    alert("¡Correcto! Los ingredientes seleccionados son los correctos.");
                    
                    // Limpiar la selección si es correcta (opcional si prefieres resetear los ingredientes después de cada turno)
                    ingredientesSeleccionados = [];
                    botonesIngredientes.forEach(button => {
                        button.classList.remove("seleccionado");
                        button.style.backgroundColor = ""; // Resetear color de fondo
                    });

                    modal.style.display = "none"; // Cerrar el modal después de verificar correctamente
                    siguienteTurno(); // Cambiar turno si la verificación es correcta
                } else {
                    alert("¡Incorrecto! Los ingredientes seleccionados no coinciden.");
                    
                    // Limpiar la selección para que el jugador pueda escoger otros ingredientes
                    ingredientesSeleccionados = [];
                    botonesIngredientes.forEach(button => {
                        button.classList.remove("seleccionado");
                        button.style.backgroundColor = ""; // Resetear color de fondo
                    });

                    modal.style.display = "none"; // Cerrar el modal si es incorrecto
                    siguienteTurno(); // Cambiar turno también si es incorrecto
                }
            };

            // Agregar botón de verificación al contenedor
            contenedorIngredientes.appendChild(botonVerificar);

            modal.style.display = "block";
        };

        // Cerrar el modal
        cerrarModal.onclick = function() {
            modal.style.display = "none";
            siguienteTurno(); // Cambiar turno al cerrar el modal
        };

        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
                siguienteTurno(); // Cambiar turno si se hace clic fuera del modal
            }
        };
    } else {
        verificarIngredientesBtn.style.display = "none";
    }
}

let equiposCompletados = {}; // Objeto para almacenar qué equipos han completado sus pistas


function todasLasPistasCompletadas() {
    let equipoActual = equipos[turnoActual];

    if (!equipoActual || !Array.isArray(equipoActual.ingredients)) {
        console.warn("⚠️ No hay equipo actual o no tiene ingredientes.");
        return false;
    }

    return equipoActual.ingredients.every(ingrediente =>
        progresoPistas[ingrediente.nombre] >= ingrediente.pistas.length
    );
}

// 🚀 Función para cambiar de turno y verificar el botón
function pasarAlSiguienteTurno() {
    turnoActual = (turnoActual + 1) % equipos.length; // Avanza al siguiente equipo
    ingredienteActualIndex = 0; // Reiniciar índice de ingredientes

    console.log(`🔄 Cambiando al equipo: ${equipos[turnoActual].name}`);

    setTimeout(() => {
        verificarIngredientes(); // 🔥 Se ejecuta automáticamente al iniciar el turno
    }, 300);
}
export function cumplioReto() {
    let equipoActual = equipos[turnoActual];

    if (!equipoActual || !Array.isArray(equipoActual.ingredients) || equipoActual.ingredients.length === 0) {
        console.warn(`⚠️ El equipo ${equipoActual?.name || "desconocido"} no tiene ingredientes asignados.`);
        return;
    }

    if (ingredienteActualIndex >= equipoActual.ingredients.length) {
        console.warn("⚠️ No hay más ingredientes para mostrar.");
        return;
    }

    let ingrediente = equipoActual.ingredients[ingredienteActualIndex];

    if (!ingrediente || !Array.isArray(ingrediente.pistas) || ingrediente.pistas.length === 0) {
        console.warn(`⚠️ Ingrediente no válido o sin pistas para el equipo ${equipoActual.name}.`);
        return;
    }

    if (!progresoPistas[ingrediente.nombre]) {
        progresoPistas[ingrediente.nombre] = 0;
    }

    let indicePista = progresoPistas[ingrediente.nombre];
    let totalPistas = ingrediente.pistas.length;

    let modalTitulo = document.getElementById("modal-titulo");
    let modalTexto = document.getElementById("modal-texto");
    let cumplioBtn = document.getElementById("cumplio-btn");
    let noCumplioBtn = document.getElementById("no-cumplio-btn");

    if (indicePista < totalPistas) {
        modalTitulo.innerText = `Pista ${indicePista + 1}`;
        modalTexto.innerText = ingrediente.pistas[indicePista];
    
      
    
        cumplioBtn.style.display = "none";
        noCumplioBtn.style.display = "none";
    
        progresoPistas[ingrediente.nombre]++;
    } else {
        console.log(`✅ Todas las pistas de "${ingrediente.nombre}" han sido mostradas.`);
        ingredienteActualIndex++;
    
        if (ingredienteActualIndex >= equipoActual.ingredients.length) {
            console.log("🔄 Se completaron todos los ingredientes de este equipo.");
            
            
            
            // Pasar al siguiente turno solo si se requiere
            pasarAlSiguienteTurno();
        } else {
            let siguienteIngrediente = equipoActual.ingredients[ingredienteActualIndex];
            console.log(`🔄 Pasando al siguiente ingrediente: ${siguienteIngrediente.nombre}`);
    
            modalTitulo.innerText = "Pista 1";
            modalTexto.innerText = siguienteIngrediente.pistas[0];
    
          
    
            progresoPistas[siguienteIngrediente.nombre] = 1;
        }
    
        cumplioBtn.style.display = "none";
        noCumplioBtn.style.display = "none";
    }
    
}


// 🚀 **Ejecutar la verificación al cargar la página**
document.addEventListener("DOMContentLoaded", () => {
    verificarIngredientes();
});

export function cerrarModal() {
    let modal = document.getElementById("modal");

    if (modal) {
        modal.style.display = "none";
    } else {
        console.error("No se encontró el modal.");
    }

    let equipoActual = equipos[turnoActual];

    if (todasLasPistasCompletadas()) {
        console.log(`✅ El equipo ${equipoActual.name} ha completado todas sus pistas.`);
        equiposCompletados[equipoActual.name] = true; // Marcar el equipo como completado
        
    }

    siguienteTurno(); // Pasar turno después de la verificación
}




export function noCumplioReto() {
    cerrarModal();

}

export function siguienteRonda() {
    siguienteTurno();
}
