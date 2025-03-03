
export const retos = {
"Crea": [
    "Dibuja un caldero mágico sin levantar el lápiz. Tu equipo debe adivinar qué objeto has dibujado.",
    "Modela con plastilina a un dragón. Tu equipo debe adivinar qué criatura has modelado.",
    "Modela con plastilina a un cuervo. Tu equipo debe adivinar qué criatura has modelado.",
    "Modela con plastilina a un gato. Tu equipo debe adivinar qué criatura has modelado.",
    "Dibuja un hipogrifo. Tu equipo debe adivinar qué criatura has dibujado.",
    "Dibuja un fenix. Tu equipo debe adivinar qué criatura has dibujado.",
    "Dibuja un pegaso. Tu equipo debe adivinar qué criatura has dibujado.",
    "Haz una escultura rápida con objetos que tengas cerca en 30 segundos. Tu equipo debe adivinar qué has creado."
],

    "Actúa": [
        "Imita a un personaje famoso y haz que tu equipo lo adivine.",
        "Expresa una emoción sin hablar, solo con gestos.",
        "Recrea una escena de una película sin usar palabras."
    ],
   
    "Escribe": [
        "Escribe una rima con la palabra 'hechizo'",
         "Escribe una rima rápida utilizando la palabra 'misterio'",
        "a3",
        "v"
    ]
};
export const preguntasPiensa = [
    {
        pregunta: "Un grupo de amigos va de excursión a devolver una joya, pero en el camino se enredan con un tipo pálido que se obsesiona con ellos y un monstruo con doble personalidad. ¿De qué película se trata?",
        tipo: "seleccion", 
        opciones: [
            "El Señor de los Anillos",
            "Los Goonies",
            "Indiana Jones y el Templo de la Perdición",
            "Harry Potter y las Reliquias de la Muerte"
        ],
        respuestaCorrecta: "El Señor de los Anillos"
    },
    {
        pregunta: "Menciona en 1 minuto la mayor cantidad de elementos dentro de la categoría: cosas que iluminan pero no son lámparas. El otro jugador debe adivinar la categoría.",
        tipo: "reto", 
        respuestaCorrecta: "cosas que iluminan pero no son lámparas", 
      
    },
    {
        pregunta: "Una joven con una condición dermatológica poco común destaca académicamente, pero su reputación se arruina por una serie de malentendidos políticos y un escándalo con animales parlantes. ¿De qué película se trata?",
        tipo: "seleccion", 
        opciones: [
            "Wicked",
            "Matilda",
            "El viaje de Chihiro",
            "La brújula dorada"
        ],
        respuestaCorrecta: "Wicked"
    },
    {
        pregunta: "Menciona en 1 minuto la mayor cantidad de elementos dentro de una categoría inusual, en este caso: cosas que se mueven pero no tienen patas, mientras otro jugador del equipo intenta adivinar la categoría",
        tipo: "reto",  
        respuestaCorrecta: "cosas que se mueven pero no tienen patas",
    },
    {
        pregunta: "Menciona en 1 minuto la mayor cantidad de elementos dentro de una categoría inusual, en este caso: cosas que flotan pero no son barcos, mientras otro jugador del equipo intenta adivinar la categoría.",
        tipo: "reto", 
        respuestaCorrecta: "cosas que flotan pero no son barcos", 
    },
    {
        pregunta: "En 1 minuto, explica qué es un avión sin usar las palabras 'volar', 'cielo' o 'alas', mientras otro jugador del equipo intenta adivinar el objeto. ",
        tipo: "reto",
        respuestaCorrecta: "avión",
       
    },
    {
        pregunta: "Adivina la Película. Un hombre besa a un cadáver, se enamora de ella, y cuando ella revive, resulta que es una princesa. Todo el mundo lo ve normal. ¿De qué película se trata?",
        tipo: "seleccion",
        opciones: [
            "Blancanieves y los siete enanitos",
            "La bella y la bestia",
            "El cadáver de la novia",
            "La Sirenita"
        ],
        respuestaCorrecta: "Blancanieves y los siete enanitos"
    }
];

export const preguntasEscribe =[
    {
        pregunta: "Escribe una rima con la palabra 'hechizo'",
        tipo: "desafio", 
        respuestaCorrecta: "Cualquier rima válida que tenga la palabra 'hechizo'."
    },
    {
        pregunta: "Escribe una rima rápida utilizando la palabra 'misterio'",
        tipo: "desafio", 
        respuestaCorrecta: "Cualquier rima válida con 'misterio'."
    },
    {
        pregunta: "Escribe un hechizo corto para transformar un objeto en otro. Debe tener rima y al menos 6 palabras.",
        tipo: "desafio", 
        respuestaCorrecta: "Debe tener rima y mencionar transformación."
    },
    {
        pregunta: "Usa las letras de la palabra HECHIZO para formar un acrónimo que tenga sentido con el tema de hechizos o magia. Cada letra debe representar una palabra o parte de una frase relacionada.",
        tipo: "desafio", 
        respuestaCorrecta: "Debe formar un acrónimo relacionado con magia."
    },
    {
        pregunta: "Cambia solo una letra en cada palabra para formar una nueva palabra válida en español. No puedes agregar ni quitar letras, solo modificar una.",
        tipo: "desafio", 
        palabras: ["Barco", "Diente", "Plaza", "Camino", "Rocas"],
        respuestaCorrecta: "Cada palabra debe transformarse correctamente."
    },
    {
        pregunta: "Cambia solo una letra en cada palabra para formar una nueva palabra válida en español. No puedes agregar ni quitar letras, solo modificar una.",
        tipo: "desafio", 
        palabras: ["Mesa", "Canto", "Río", "Toro", "Perro"],
        respuestaCorrecta: "Cada palabra debe transformarse correctamente."
    },
    {
        pregunta: "Escribe una frase en la que 'rojo' signifique algo distinto al color.",
        tipo: "desafio", 
        respuestaCorrecta: "Debe ser una frase donde 'rojo' signifique algo distinto."
    },
    {
        pregunta: "Escribe una pregunta cuya respuesta sea 'la luna'.",
        tipo: "desafio", 
        respuestaCorrecta: "Debe ser una pregunta cuya respuesta sea la luna."
    },
    {
        pregunta: "Usa las letras de la palabra BRUJA para formar un acrónimo que tenga sentido con el tema de hechizos o magia. Cada letra debe representar una palabra o parte de una frase relacionada.",
        tipo: "desafio", 
        respuestaCorrecta: "Debe formar un acrónimo relacionado con magia."
    },
    {
        pregunta: "Escribe dos palabras que contengan tres vocales diferentes.",
        tipo: "desafio", 
        respuestaCorrecta: "Cualquier par de palabras con tres vocales diferentes."
    },
    {
        pregunta: "Escribe una frase en la que cada palabra tenga la misma cantidad de letras.",
        tipo: "desafio", 
        respuestaCorrecta: "Debe ser una frase donde todas las palabras tengan el mismo número de letras."
    },
    {
        pregunta: "Escribe una palabra que sea un anagrama de 'bruja' y 'mala'. Anagrama: Cambiar el orden de las letras y formar otra palabra",
        tipo: "desafio", 
        respuestaCorrecta: "La palabra debe ser un anagrama válido."
    },
    {
        pregunta: "Escribe un acertijo sobre un fantasma, mientras otro jugador del equipo intenta adivinar.",
        tipo: "reto", 
        respuestaCorrecta: "Cualquier acertijo sobre un fantasma."
    },
    {
        pregunta: "Escribe un acertijo sobre un hada, mientras otro jugador del equipo intenta adivinar.",
        tipo: "reto", 
        respuestaCorrecta: "Cualquier acertijo sobre un hada."
    },
    {
        pregunta: "Escribe tres palabras que signifiquen lo mismo que 'encantamiento'.",
        tipo: "desafio", 
        respuestaCorrecta: "Debe ser un conjunto de tres sinónimos de 'encantamiento'."
    },
    {
        pregunta: "Completa el refrán: El que con lobos anda, __________.",
        respuestaCorrecta:  "aullar aprende",
        tipo: "rellena",
    },
    {
        pregunta: "Completa el refrán: En casa de herrero, __________.",
        respuestaCorrecta: "cuchillo de palo",
        tipo: "rellena",
    },
    {
        pregunta: "Completa el refrán:  Del dicho al hecho, __________.",
        respuestaCorrecta: "hay mucho trecho",
        tipo: "rellena",
    },
    {
        pregunta: "Crea un conjuro usando solo palabras que empiecen con la misma letra.",
        tipo: "desafio", 
        respuestaCorrecta: "Debe ser un conjuro usando palabras con la misma letra inicial."
    },
    {
        pregunta: "Un brujo ha lanzado un hechizo sobre ti y ahora hablas al revés. Escribe una frase al revés (min 4 palabras).",
        tipo: "desafio", 
        respuestaCorrecta: "Debe ser una frase escrita al revés."
    },
    {
        pregunta: "Usa las letras de la palabra GATO para formar un acrónimo que tenga sentido con el tema de hechizos o magia. Cada letra debe representar una palabra o parte de una frase relacionada.",
        tipo: "desafio", 
        respuestaCorrecta: "Debe formar un acrónimo relacionado con magia."
    }
];







