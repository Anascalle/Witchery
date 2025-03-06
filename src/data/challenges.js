

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

export const preguntasEscribe = [
    {
        pregunta: "Escribe una rima con la palabra 'hechizo'.",
        tipo: "desafio", 
        respuestaCorrecta: "Cualquier rima válida que tenga la palabra 'hechizo'."
    },
    {
        pregunta: "Escribe una rima rápida utilizando la palabra 'misterio'.",
        tipo: "desafio", 
        respuestaCorrecta: "Cualquier rima válida con 'misterio'."
    },
    {
        pregunta: "Escribe un hechizo corto para transformar un objeto en otro. Debe tener rima y al menos 6 palabras.",
        tipo: "desafio", 
        respuestaCorrecta: "Debe tener rima y mencionar transformación.",
        participantes: "Todos"
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
        respuestaCorrecta: "Cada palabra debe transformarse correctamente.",
        participantes: "Todos"
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
        respuestaCorrecta: "Debe ser una pregunta cuya respuesta sea la luna.",
        participantes: "Todos"
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
        respuestaCorrecta: "Debe ser una frase donde todas las palabras tengan el mismo número de letras.",
        participantes: "Todos"
    },
    {
        pregunta: "Escribe una palabra que sea un anagrama de 'bruja' y 'mala'. Anagrama: Cambiar el orden de las letras y formar otra palabra.",
        tipo: "desafio", 
        respuestaCorrecta: "La palabra debe ser un anagrama válido."
    },
    {
        pregunta: "Escribe un acertijo sobre un fantasma.",
        tipo: "desafio", 
        respuestaCorrecta: "Cualquier acertijo sobre un fantasma.",
        participantes: "Todos"
    },
    {
        pregunta: "Escribe un acertijo sobre un hada.",
        tipo: "desafio", 
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
        participantes: "Todos"
    },
    {
        pregunta: "Completa el refrán: En casa de herrero, __________.",
        respuestaCorrecta: "cuchillo de palo",
        tipo: "rellena"
    },
    {
        pregunta: "Completa el refrán:  Del dicho al hecho, __________.",
        respuestaCorrecta: "hay mucho trecho",
        tipo: "rellena"
    },
    {
        pregunta: "Crea un conjuro usando solo palabras que empiecen con la misma letra.",
        tipo: "desafio", 
        respuestaCorrecta: "Debe ser un conjuro usando palabras con la misma letra inicial."
    },
    {
        pregunta: "Un brujo ha lanzado un hechizo sobre ti y ahora hablas al revés. Escribe una frase al revés (min 4 palabras).",
        tipo: "desafio", 
        respuestaCorrecta: "Debe ser una frase escrita al revés.",
        participantes: "Todos"
    },
    {
        pregunta: "Usa las letras de la palabra GATO para formar un acrónimo que tenga sentido con el tema de hechizos o magia. Cada letra debe representar una palabra o parte de una frase relacionada.",
        tipo: "desafio", 
        respuestaCorrecta: "Debe formar un acrónimo relacionado con magia."
    }
];

export const preguntasCrea = [
    {
        pregunta: "Dibuja un caldero mágico sin levantar el lápiz. Tu equipo debe adivinar qué objeto has dibujado.",
        tipo: "reto",
        respuestaCorrecta: "Un caldero mágico"
    },
    {
        pregunta: "Modela con plastilina a un dragón. Tu equipo debe adivinar qué criatura has modelado.",
        tipo: "reto",
        respuestaCorrecta: "Un dragón"
    },
    {
        pregunta: "Modela con plastilina a un cuervo. Tu equipo debe adivinar qué criatura has modelado.",
        tipo: "reto",
        respuestaCorrecta: "Un cuervo"
    },
    {
        pregunta: "Modela con plastilina a un gato. Tu equipo debe adivinar qué criatura has modelado.",
        tipo: "reto",
        respuestaCorrecta: "Un gato"
    },
    {
        pregunta: "Dibuja un hipogrifo. Tu equipo debe adivinar qué criatura has dibujado.",
        tipo: "reto",
        respuestaCorrecta: "Un hipogrifo"
    },
    {
        pregunta: "Dibuja un fénix. Tu equipo debe adivinar qué criatura has dibujado.",
        tipo: "reto",
        respuestaCorrecta: "Un fénix"
    },
    {
        pregunta: "Dibuja un pegaso. Tu equipo debe adivinar qué criatura has dibujado.",
        tipo: "reto",
        respuestaCorrecta: "Un pegaso"
    },
    {
        pregunta: "Modela una lámpara mágica. Tu equipo debe adivinar qué objeto has modelado.",
        tipo: "reto",
        respuestaCorrecta: "Una lámpara mágica"
    },
    {
        pregunta: "Dibuja un portal a otra dimensión. Tu equipo debe adivinar qué objeto has dibujado.",
        tipo: "reto",
        respuestaCorrecta: "Un portal a otra dimensión"
    },
    {
        pregunta: "Dibuja una mano lanzando un hechizo. Tu equipo debe adivinar qué acción representa el dibujo.",
        tipo: "reto",
        respuestaCorrecta: "Una mano lanzando un hechizo"
    },
    {
        pregunta: "Modela con plastilina una calavera encantada. Tu equipo debe adivinar qué objeto has modelado.",
        tipo: "reto",
        respuestaCorrecta: "Una calavera encantada"
    },
    {
        pregunta: "Dibuja un grimorio con símbolos mágicos. Tu equipo debe adivinar qué objeto has dibujado.",
        tipo: "reto",
        respuestaCorrecta: "Un grimorio con símbolos mágicos"
    },
    {
        pregunta: "Dibuja una escoba voladora. Tu equipo debe adivinar qué objeto has dibujado.",
        tipo: "reto",
        respuestaCorrecta: "Una escoba voladora"
    },
    {
        pregunta: "Dibuja un hechizo de tormenta eléctrica. Tu equipo debe adivinar qué objeto has dibujado.",
        tipo: "reto",
        respuestaCorrecta: "Un hechizo de tormenta eléctrica"
    },
    {
        pregunta: "Dibuja un hechizo de amor. Tu equipo debe adivinar qué objeto has dibujado.",
        tipo: "reto",
        respuestaCorrecta: "Un hechizo de amor"
    },
    {
        pregunta: "Modela un hombre lobo. Tu equipo debe adivinar qué criatura has modelado.",
        tipo: "reto",
        respuestaCorrecta: "Un hombre lobo"
    },
    {
        pregunta: "Modela un caldero mágico. Tu equipo debe adivinar qué objeto has modelado.",
        tipo: "reto",
        respuestaCorrecta: "Un caldero mágico"
    },
    {
        pregunta: "Modela una llave encantada. Tu equipo debe adivinar qué objeto has modelado.",
        tipo: "reto",
        respuestaCorrecta: "Una llave encantada"
    },
    {
        pregunta: "Modela un tritón. Tu equipo debe adivinar qué criatura has modelado.",
        tipo: "reto",
        respuestaCorrecta: "Un tritón"
    },
    {
        pregunta: "Modela una varita mágica. Tu equipo debe adivinar qué objeto has modelado.",
        tipo: "reto",
        respuestaCorrecta: "Una varita mágica"
    },
    {
        pregunta: "Dibuja un bosque. Tu equipo debe adivinar qué lugar has dibujado.",
        tipo: "reto",
        respuestaCorrecta: "Un bosque"
    },
    {
        pregunta: "Dibuja la respuesta de este acertijo: Un reloj sin manecillas, pero que siempre da la hora exacta.",
        tipo: "acertijo",
        respuestaCorrecta: "Un reloj de sol"
    },
    {
        pregunta: "Dibuja la respuesta de este acertijo: Cuanto más la quitas, más grande se hace.",
        tipo: "acertijo",
        respuestaCorrecta: "Un agujero"
    },
    {
        pregunta: "Dibuja la respuesta de este acertijo: Puede contener agua, pero tiene muchos agujeros. ",
        tipo: "acertijo",
        respuestaCorrecta: "Una esponja"
    },
    {
        pregunta: "Dibuja la respuesta de este acertijo: Es más ligera que el aire, pero la persona más fuerte no puede sostenerla por mucho tiempo. ",
        tipo: "acertijo",
        respuestaCorrecta: "La respiración"
    }

];

export const preguntasActua = [
    {
        pregunta: "Elige una de las tres opciones para actuar",
        tipo: "reto",
        elige:["Chef cocinando un postre complicado",
                "Pastelero decorando una tarta de bodas enorme ",
                " Mesero cargando una bandeja muy pesada",
        ]
    },
    {
        pregunta: "Elige una de las tres opciones para actuar",
        tipo: "reto",
        elige: [
            "Policía persiguiendo a un ladrón",
            "Bombero apagando un incendio",
            "Médico atendiendo una emergencia"
        ],
    },
    {
        pregunta: "Elige una de las tres opciones para actuar",
        tipo: "reto",
        elige: [
            "Profesor explicando una lección difícil",
            "Entrenador de fútbol dando instrucciones en un partido",
            "Músico tocando en un concierto"
        ],
    },
    {
        pregunta: "Elige una de las tres opciones para actuar",
        tipo: "reto",
        elige: [
            "Piloto despegando un avión",
            "Conductor de autobús en un tráfico terrible",
            "Repartidor de pizza llegando tarde"
        ],
    },
    {
        pregunta: "Elige una de las tres opciones para actuar",
        tipo: "reto",
        elige: [
            "Un veterinario revisando un perro inquieto",
            "Un granjero ordeñando una vaca",
            "Un biólogo observando animales salvajes"
        ],
    },
    {
        pregunta: "Elige una de las tres opciones para actuar",
        tipo: "reto",
        elige: [
            "Un actor en una escena de acción",
            "Un bailarín profesional haciendo una coreografía difícil",
            "Un mago haciendo un truco impresionante"
        ],
    },
    {
        pregunta: "Elige una de las tres opciones para actuar",
        tipo: "reto",
        elige: [
            "Un cajero contando billetes rápidamente",
            "Un mecánico reparando un coche averiado",
            "Un albañil construyendo una casa"
        ],
    },
    {
        pregunta: "Elige una de las tres opciones para actuar",
        tipo: "reto",
        elige: [
            "Un fotógrafo intentando capturar la mejor foto",
            "Un periodista entrevistando a alguien importante",
            "Un influencer grabando un video viral"
        ],
    },
    {
        pregunta: "Elige una de las tres opciones para actuar",
        tipo: "reto",
        elige: [
            "Un astronauta caminando en la luna",
            "Un buzo explorando el fondo del océano",
            "Un guardia de seguridad revisando cámaras de vigilancia"
        ],
    },
    {
        pregunta: "Elige una de las tres opciones para actuar",
        tipo: "reto",
        elige: [
            "Un peluquero cortando el cabello con mucho estilo",
            "Un diseñador de moda mostrando sus creaciones",
            "Un tatuador haciendo un tatuaje complicado"
        ],
    },
        {
            pregunta: "Deben actuar las tres cosas en orden y adivinarlas todas para ganar (Puede hacer sonidos más no hablar)",
            tipo: "reto",
            elige: [
                "Imitar a Mickey Mouse",
                "Un chef preparando sushi",
                "Un perro cavando un hoyo"
            ]
        },
        {
            pregunta: "Deben actuar las tres cosas en orden y adivinarlas todas para ganar (Puede hacer sonidos más no hablar)",
            tipo: "reto",
            elige: [
                "Imitar a Elsa de Frozen",
                "Un policía dirigiendo el tráfico",
                "Un gato estirándose perezosamente"
            ]
        },
        {
            pregunta: "Deben actuar las tres cosas en orden y adivinarlas todas para ganar (Puede hacer sonidos más no hablar)",
            tipo: "reto",
            elige: [
                "Imitar a Spider-Man lanzando telarañas",
                "Un doctor operando a un paciente",
                "Un gallo cantando al amanecer"
            ]
        },
        {
            pregunta: "Deben actuar las tres cosas en orden y adivinarlas todas para ganar (Puede hacer sonidos más no hablar)",
            tipo: "reto",
            elige: [
                "Imitar a Mario Bros saltando obstáculos",
                "Un piloto aterrizando un avión",
                "Un caballo trotando con elegancia"
            ]
        },
        {
            pregunta: "Deben actuar las tres cosas en orden y adivinarlas todas para ganar (Puede hacer sonidos más no hablar)",
            tipo: "reto",
            elige: [
                "Imitar a Bob Esponja riendo",
                "Un pastelero haciendo una tarta de cumpleaños",
                "Un elefante usando su trompa"
            ]
        },
        {
            pregunta: "Deben actuar las tres cosas en orden y adivinarlas todas para ganar (Puede hacer sonidos más no hablar)",
            tipo: "reto",
            elige: [
                "Imitar a Peppa Pig hablando feliz",
                "Un futbolista celebrando un gol",
                "Un mono trepando un árbol"
            ]
        },
        {
            pregunta: "Deben actuar las tres cosas en orden y adivinarlas todas para ganar (Puede hacer sonidos más no hablar)",
            tipo: "reto",
            elige: [
                "Imitar a Batman con su voz grave",
                "Un mecánico arreglando una llanta pinchada",
                "Un pato nadando en un lago"
            ]
        },
        {
            pregunta: "Deben actuar las tres cosas en orden y adivinarlas todas para ganar (Puede hacer sonidos más no hablar)",
            tipo: "reto",
            elige: [
                "Imitar a Dora la Exploradora dando instrucciones",
                "Un cantante en un concierto",
                "Un tigre acechando a su presa"
            ]
        },
        {
            pregunta: "Deben actuar las tres cosas en orden y adivinarlas todas para ganar (Puede hacer sonidos más no hablar)",
            tipo: "reto",
            elige: [
                "Imitar a la Sirenita nadando bajo el mar",
                "Un bombero rescatando a un gato de un árbol",
                "Un pingüino caminando torpemente"
            ]
        },
        {
            pregunta: "Deben actuar las tres cosas en orden y adivinarlas todas para ganar (Puede hacer sonidos más no hablar)",
            tipo: "reto",
            elige: [
                "Imitar a Winnie the Pooh buscando miel",
                "Un mago sacando un conejo del sombrero",
                "Un león rugiendo fuerte"
            ]
        },
        {
            pregunta: "Deben actuar las tres cosas en orden y adivinarlas todas para ganar (Puede hacer sonidos más no hablar)",
            tipo: "reto",
            elige: [
                "Imitar a Shrek gruñendo",
                "Un veterinario revisando a un loro parlante",
                "Un canguro saltando rápidamente"
            ]
        }
    
    
];









