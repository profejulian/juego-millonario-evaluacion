/**
 * JUEGO ¿QUIÉN QUIERE SER MILLONARIO? - EVALUACIÓN
 *
 * MANUAL DE USO PARA EL DOCENTE:
 * 1. Preparar Archivos:
 *    Este script ya contiene las preguntas de la evaluación.
 *    Solo necesitas asegurarte de tener:
 *    - index.html
 *    - styles.css
 *    - script.js (este archivo)
 *    - Una carpeta 'assets' con:
 *      - placeholder_logo.png
 *      - correct.mp3
 *      - wrong.mp3
 *      - lifeline.mp3
 *      - next_question.mp3
 *
 * 2. Iniciar Juego:
 *    Abre 'index.html' en un navegador. El estudiante ingresa su nombre y presiona
 *    "Comenzar Juego".
 *
 * NOTA: El juego guarda el nombre del último jugador y la puntuación más alta en el
 * almacenamiento local del navegador.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const startScreen = document.getElementById('start-screen');
    const gameScreen = document.getElementById('game-screen');
    const endScreen = document.getElementById('end-screen');

    const playerNameInput = document.getElementById('player-name-input');
    const startGameBtn = document.getElementById('start-game-btn');

    const currentPlayerNameDisplay = document.getElementById('current-player-name');
    const currentScoreDisplay = document.getElementById('current-score-display');
    const questionTextElement = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const progressLadderElement = document.querySelector('.progress-ladder ul');
    const highScoreDisplay = document.getElementById('high-score-display');
    const finalResultDisplay = document.getElementById('final-result');
    const finalHighScoreDisplay = document.getElementById('final-high-score-display');
    const playAgainBtn = document.getElementById('play-again-btn');
    const horizontalProgressBar = document.getElementById('horizontal-progress-bar');
    const audienceChartContainer = document.getElementById('audience-chart-container');

    const lifelineBtns = document.querySelectorAll('.lifeline-btn');

    // --- Audio Elements ---
    const correctSound = document.getElementById('correct-sound');
    const wrongSound = document.getElementById('wrong-sound');
    const lifelineSound = document.getElementById('lifeline-sound');
    const nextQuestionSound = document.getElementById('next-question-sound');

    // --- Preguntas de la Evaluación (Incrustadas) ---
    const evaluationQuestions = [
        { // Pregunta 1 (de la imagen original)
            "enunciado": "Al sembrar semillas de fríjol en un recipiente transparente, un estudiante observa que, independientemente de la posición inicial de la semilla, las raíces siempre crecen hacia abajo y el pequeño tallo emerge hacia arriba. Este comportamiento es un ejemplo clásico de:",
            "opciones": [
                "a) Hidrotropismo, respuesta a la humedad (no descrito en detalle en la guía, pero es una opción).",
                "b) Gravitropismo (o geotropismo), respuesta a la gravedad (positivo en raíz, negativo en tallo).",
                "c) Fototropismo, respuesta a la luz.",
                "d) Nastia, movimiento rápido no direccional independiente de la gravedad.",
                "e) Quimiotropismo, respuesta a sustancias químicas en el suelo.",
                "f) Tigmotropismo, respuesta al contacto."
            ],
            "correcta": "b" // Asumiendo que esta es la letra, no la opción completa. Ajustar si es necesario.
        },
        { // Pregunta 2
            "enunciado": "¿Cuál de las siguientes opciones describe una función principal de la pared celular en los organismos que la poseen, según lo visto en bacterias, algas unicelulares y plantas?",
            "opciones": [
                "a) Facilitar la comunicación directa entre células adyacentes mediante plasmodesmos (plantas) o poros (bacterias).",
                "b) Regular selectivamente el paso de todas las sustancias hacia el interior celular.",
                "c) Almacenar material genético en forma de nucleoide.",
                "d) Realizar la fotosíntesis para obtener energía.",
                "e) Permitir el movimiento activo mediante contracciones.",
                "f) Proporcionar soporte estructural, dar forma a la célula y protegerla contra la lisis osmótica (ruptura por exceso de agua)."
            ],
            "correcta": "f"
        },
        { // Pregunta 3
            "enunciado": "Selecciona la opción que relaciona CORRECTAMENTE el organismo con su principal estructura o mecanismo de soporte O movimiento discutido en las semanas 1 y 2.",
            "opciones": [
                "a) Ameba - Soporte por pared celular de peptidoglucano y movimiento flagelar.",
                "b) Hongo Champiñón – Soporte basado en la presión de turgencia en sus hifas.",
                "c) Planta de Maíz - Paredes celulares de quitina y movimiento por tropismos.",
                "d) Árbol de Roble – Soporte por pared celular de celulosa, lignina (madera) y turgencia celular.",
                "e) Paramecium - Locomoción mediante pseudópodos y soporte por membrana flexible.",
                "f) Bacteria E. coli - Movimiento principalmente por cilios numerosos."
            ],
            "correcta": "d"
        },
        { // Pregunta 4
            "enunciado": "Un estudiante observa una muestra de agua estancada bajo el microscopio y descubre un organismo unicelular que se desplaza rápidamente mediante estructuras cortas y numerosas que parecen \"remos\" batiendo coordinadamente. Además, nota que tiene una forma definida, como de zapatilla. Según la descripción y la guía, ¿qué tipo de organismo es más probable que esté observando y qué estructura usa para moverse?",
            "opciones": [
                "a) Un Paramecium utilizando cilios.",
                "b) Una ameba utilizando pseudópodos.",
                "c) Un alga diatomea con caparazón de sílice y movimiento pasivo.",
                "d) Una Euglena utilizando un flagelo.",
                "e) Una bacteria con múltiples flagelos.",
                "f) Un hongo unicelular (levadura) sin estructuras de movimiento activas."
            ],
            "correcta": "a"
        },
        { // Pregunta 5
            "enunciado": "La Amoeba proteus se caracteriza por su capacidad de cambiar de forma y moverse mediante pseudópodos, lo cual es posible gracias a su membrana plasmática flexible y la ausencia de pared celular rígida. Si, hipotéticamente, una ameba desarrollara una pared celular rígida similar a la de una bacteria, ¿cuál de sus funciones vitales se vería MÁS DIRECTAMENTE afectada o impedida?",
            "opciones": [
                "a) La capacidad de moverse y alimentarse mediante la formación de pseudópodos (movimiento ameboide y fagocitosis).",
                "b) La capacidad de realizar fotosíntesis.",
                "c) La capacidad de almacenar nutrientes en vacuolas internas.",
                "d) La síntesis de proteínas en los ribosomas.",
                "e) La protección contra cambios de salinidad en el medio.",
                "f) La capacidad de reproducirse por división celular simple."
            ],
            "correcta": "a"
        },
        { // Pregunta 6
            "enunciado": "Un jardinero nota que una planta de girasol joven que crece en una maceta cerca de una ventana siempre tiene su tallo curvado hacia la ventana. Si el jardinero gira la maceta 180 grados, ¿qué espera observar después de unos días y cuál es el mecanismo biológico principal responsable?",
            "opciones": [
                "a) El tallo se marchitará debido al estrés del giro, perdiendo la turgencia.",
                "b) Las raíces se curvarán hacia la luz (fototropismo negativo) y el tallo se alejará de ella.",
                "c) La planta crecerá hacia abajo debido al gravitropismo negativo del tallo.",
                "d) La planta seguirá creciendo recta, ignorando la luz, debido a la gravedad.",
                "e) El tallo se curvará nuevamente hacia la ventana debido al fototropismo positivo, mediado por la acción de auxinas que promueven mayor crecimiento en el lado sombreado.",
                "f) La planta mostrará tigmotropismo, enrollándose sobre sí misma al sentir el cambio de posición."
            ],
            "correcta": "e"
        },
        // ESTA SERÁ LA PREGUNTA DE REPUESTO (Originalmente la 7)
        // {
        //     "enunciado": "Las plantas trepadoras, como las vides o los pepinos, a menudo desarrollan estructuras delgadas y enrolladas llamadas zarcillos que les permiten sujetarse a soportes como rejas o troncos. Cuando un zarcillo toca un soporte, crece enrollándose firmemente alrededor de él. Este fenómeno es un ejemplo de:",
        //     "opciones": [
        //         "a) Crecimiento apical normal.",
        //         "b) Tigmotropismo.",
        //         "c) Hidroesqueleto en acción.",
        //         "d) Fototropismo negativo.",
        //         "e) Nastia sísmica (como la Mimosa).",
        //         "f) Gravitropismo positivo."
        //     ],
        //     "correcta": "b"
        // },
        { // Pregunta 7 (Originalmente la 8)
            "enunciado": "Todas las siguientes son características o estructuras asociadas comúnmente con Paramecium, un protozoo ciliado, EXCEPTO:",
            "opciones": [
                "a) Ser un organismo unicelular eucarionte.",
                "b) Utilizar pseudópodos para capturar presas grandes mediante fagocitosis.",
                "c) Tener una forma definida, a menudo descrita como similar a una zapatilla.",
                "d) Ser encontrado típicamente en ambientes de agua dulce como charcos.",
                "e) Poseer numerosos cilios vibrátiles para la locomoción en medios acuáticos.",
                "f) Realizar todas las funciones vitales dentro de una única célula."
            ],
            "correcta": "b"
        },
        { // Pregunta 8 (Originalmente la 9)
            "enunciado": "Considerando los organismos estudiados en las semanas 1 y 2 (unicelulares, hongos, plantas), ¿cuál de las siguientes afirmaciones compara CORRECTAMENTE sus mecanismos primarios de soporte y/o movimiento?",
            "opciones": [
                "a) Las plantas usan celulosa y lignina para soporte rígido, los hongos usan quitina, y muchos protistas (como la ameba) dependen de una membrana flexible y pseudópodos tanto para soporte temporal como para movimiento.",
                "b) Todos dependen principalmente de paredes celulares rígidas para el soporte.",
                "c) El movimiento en plantas (tropismos) es rápido y depende de contracciones musculares, similar al de los animales.",
                "d) Solo los unicelulares poseen estructuras activas para la locomoción (cilios, flagelos, pseudópodos), mientras que hongos y plantas son completamente inmóviles.",
                "e) La turgencia es el principal mecanismo de soporte tanto en hongos filamentosos como en árboles leñosos.",
                "f) Los hongos y las bacterias comparten el uso de flagelos para la exploración del medio."
            ],
            "correcta": "a"
        },
        { // Pregunta 9 (Originalmente la 10)
            "enunciado": "Las bacterias y los protozoarios son organismos unicelulares, pero difieren significativamente en su estructura celular y soporte. ¿Cuál de las siguientes afirmaciones describe MEJOR una diferencia fundamental en el soporte estructural entre una bacteria típica como Escherichia coli y un protozoario como Amoeba proteus?",
            "opciones": [
                "a) El soporte en ambos depende exclusivamente de la membrana plasmática, pero la de la bacteria es mucho más gruesa.",
                "b) La ameba posee una pared celular de peptidoglucano, mientras que la bacteria tiene una pared de celulosa.",
                "c) La bacteria utiliza un citoesqueleto interno complejo para el soporte, y la ameba depende únicamente de la presión del agua interna (turgencia).",
                "d) La bacteria tiene una pared celular rígida que le da forma definida, mientras que la ameba carece de pared y su forma es variable gracias a su membrana flexible.",
                "e) Ambas poseen una membrana plasmática flexible como principal estructura de soporte, sin diferencias significativas.",
                "f) La ameba desarrolla un caparazón externo de quitina para soporte, mientras que la bacteria usa flagelos para mantenerse rígida."
            ],
            "correcta": "d"
        },
        { // Pregunta 10 (Originalmente la 11)
            "enunciado": "Si comparamos los cilios y los flagelos eucariotas (presentes en protistas), ambos son extensiones de la membrana plasmática con microtúbulos internos que permiten el movimiento. Sin embargo, se diferencian estructural y funcionalmente. ¿Cuál es la principal diferencia mencionada en la guía?",
            "opciones": [
                "a) Los flagelos solo se encuentran en bacterias (procariotas), mientras que los cilios son exclusivos de eucariotas.",
                "b) Los cilios se mueven por cambios de turgencia y los flagelos por contracción muscular.",
                "c) Los cilios son estructuras permanentes, mientras que los flagelos son temporales como los pseudópodos.",
                "d) Los cilios son generalmente cortos y numerosos, batiendo como remos; los flagelos son largos y escasos, con movimiento ondulatorio o rotatorio.",
                "e) Los cilios están hechos de quitina y los flagelos de celulosa.",
                "f) Los cilios sirven para la fotosíntesis y los flagelos para la respiración celular."
            ],
            "correcta": "d"
        },
        { // Pregunta 11 (Originalmente la 12)
            "enunciado": "Observa la Figura 1 de la guía, que muestra una Amoeba proteus. Si esta ameba encontrara una partícula alimenticia grande, ¿qué proceso esperaría observar y qué estructura celular sería fundamental para ello, considerando que carece de pared celular?",
            "opciones": [
                "a) Proyectaría pseudópodos para rodear y englobar la partícula (fagocitosis), gracias a la flexibilidad de su membrana.",
                "b) Liberaría cilios para empujar la comida hacia una boca celular.",
                "c) Secretaría enzimas digestivas al exterior y luego absorbería los productos, sin necesidad de englobar.",
                "d) Extendería flagelos para rotar y atraer la partícula.",
                "e) Utilizaría la pared celular para perforar la partícula alimenticia.",
                "f) Absorbería los nutrientes disueltos a través de su membrana rígida mediante ósmosis."
            ],
            "correcta": "a"
        },
        { // Pregunta 12 (Originalmente la 13)
            "enunciado": "Relaciona la estructura de locomoción con el organismo/descripción que característicamente la utiliza, según la guía. ¿Cuál de las siguientes asociaciones es INCORRECTA?",
            "opciones": [
                "a) Cilios - Hongo tipo moho (utilizados para explorar el sustrato).",
                "b) Pseudópodos - Glóbulos blancos humanos (movimiento ameboide para fagocitosis).",
                "c) Cilios - Paramecium (movimiento rápido y coordinado en agua).",
                "d) Flagelo - Euglena (movimiento propulsado por una estructura larga tipo látigo).",
                "e) Flagelo - Bacteria Salmonella (propulsión mediante estructuras largas y helicoidales).",
                "f) Pseudópodos - Amoeba (movimiento mediante extensiones temporales del citoplasma)."
            ],
            "correcta": "a"
        },
        { // Pregunta 13 (Originalmente la 14)
            "enunciado": "Un estudiante quiere demostrar experimentalmente que las raíces de las plantas presentan gravitropismo positivo (crecen hacia abajo) y los tallos gravitropismo negativo (crecen hacia arriba), independientemente de la orientación inicial. Coloca semillas germinadas en cuatro cajas Petri con algodón húmedo: A) Horizontal normal. B) Inclinada 45°. C) Vertical con semillas arriba. D) Vertical con semillas abajo. Todas se mantienen en oscuridad para evitar el fototropismo. ¿Qué resultado esperaría observar en TODAS las cajas después de unos días si el gravitropismo funciona como se describe?",
            "opciones": [
                "a) Las raíces y tallos crecerán siguiendo la orientación inicial de la semilla en cada caja.",
                "b) En todas las cajas, las raíces crecerán hacia abajo (en dirección de la gravedad) y los tallos crecerán hacia arriba (en contra de la gravedad), sin importar la orientación de la caja o la semilla.",
                "c) Todo el crecimiento se detendrá debido a la ausencia de luz.",
                "d) Solo en la caja A (horizontal) se observará el crecimiento esperado; en las demás, el crecimiento será aleatorio.",
                "e) Las raíces crecerán hacia la fuente de humedad (algodón) y los tallos hacia la tapa de la caja Petri.",
                "f) Las raíces crecerán hacia arriba y los tallos hacia abajo en las cajas B, C y D debido a la confusión gravitacional."
            ],
            "correcta": "b"
        },
        { // Pregunta 14 (Originalmente la 15)
            "enunciado": "Las plantas han desarrollado diversas estrategias para mantenerse erguidas y obtener recursos a pesar de ser sésiles. Todas las siguientes son estructuras o mecanismos de soporte en plantas vasculares EXCEPTO:",
            "opciones": [
                "a) La pared celular de celulosa que confiere rigidez a cada célula vegetal.",
                "b) La estructura general de raíces, tallo y ramas que distribuye el peso.",
                "c) La presión de turgencia generada por el agua dentro de las vacuolas celulares.",
                "d) La lignina, que endurece ciertos tejidos formando madera en tallos y troncos.",
                "e) Un exoesqueleto de quitina secretado por la epidermis para proteger contra la deshidratación.",
                "f) Tejidos especializados como fibras y esclerénquima que proporcionan resistencia mecánica."
            ],
            "correcta": "e"
        },
        { // Pregunta 15 (Originalmente la 16)
            "enunciado": "Los hongos, como los champiñones o los mohos, aunque parecen inmóviles, poseen estructuras especializadas para el soporte y la expansión. ¿Cuál de las siguientes afirmaciones describe MEJOR cómo un hongo pluricelular obtiene soporte y \"se mueve\" para colonizar su sustrato?",
            "opciones": [
                "a) Dependen de una concha externa calcárea para el soporte y liberan esporas flageladas para moverse en el agua.",
                "b) Tienen raíces que anclan el micelio y tallos lignificados que soportan la seta.",
                "c) Utilizan un hidroesqueleto basado en la presión del agua dentro de las hifas para mantenerse erguidos y moverse activamente.",
                "d) Tienen paredes celulares de celulosa y crecen hacia la luz mediante fototropismo, como las plantas.",
                "e) Su soporte proviene de una red de hifas (micelio) con paredes de quitina, y se expanden creciendo direccionalmente hacia los nutrientes.",
                "f) Poseen un esqueleto interno de quitina y se mueven mediante contracciones musculares lentas."
            ],
            "correcta": "e"
        },
        { // Pregunta 16 (Originalmente la 17)
            "enunciado": "El micelio de un hongo y el sistema de raíces de una planta son análogos en cierto sentido, ya que ambos exploran el sustrato. Sin embargo, difieren en su composición y función principal de soporte. ¿Cuál afirmación describe correctamente una diferencia clave?",
            "opciones": [
                "a) Las raíces absorben agua y nutrientes y anclan la planta, contribuyendo al soporte por turgencia y estructura leñosa; el micelio absorbe nutrientes y su red de hifas con quitina da soporte al cuerpo del hongo.",
                "b) Ambos están formados por tejido muscular liso que permite la exploración activa del suelo.",
                "c) El micelio forma una estructura subterránea densa tipo tubérculo para reserva, y las raíces son filamentos delgados para anclaje superficial.",
                "d) El micelio está hecho de células con pared de celulosa y lignina, mientras que las raíces tienen paredes de quitina.",
                "e) El micelio realiza fotosíntesis para el hongo, mientras que las raíces solo absorben agua.",
                "f) Las raíces permiten el movimiento activo de la planta (gravitropismo), mientras que el micelio es completamente estático."
            ],
            "correcta": "a"
        },
        { // Pregunta 17 (Originalmente la 18)
            "enunciado": "Un científico está diseñando un experimento para investigar específicamente el FOTOTROPISMO en plántulas de lenteja. Dispone de 4 montajes experimentales. ¿Cuál de los siguientes diseños es el más adecuado para observar y medir ÚNICAMENTE la respuesta del tallo a la dirección de la luz, controlando otras variables?",
            "opciones": [
                "a) Grupo 1: Plántulas con luz lateral unidireccional, mantenidas a 10°C. Grupo 2: Plántulas con luz lateral unidireccional, mantenidas a 25°C.",
                "b) Grupo 1: Plántulas en oscuridad total. Grupo 2: Plántulas con luz cenital (desde arriba).",
                "c) Grupo 1: Plántulas con luz lateral unidireccional. Grupo 2: Las mismas plántulas, pero tocando sus tallos diariamente (para medir tigmotropismo).",
                "d) Grupo 1: Plántulas con luz lateral unidireccional. Grupo 2: Plántulas en una plataforma giratoria (clinostato) con luz lateral unidireccional (para anular gravitropismo).",
                "e) Grupo 1: Plántulas regadas abundantemente con luz lateral. Grupo 2: Plántulas con poca agua y luz lateral.",
                "f) Grupo 1: Plántulas con luz lateral unidireccional. Grupo 2: Plántulas con luz desde todas direcciones (uniforme)."
            ],
            "correcta": "f"
        },
        { // Pregunta 18 (Originalmente la 19)
            "enunciado": "Considerando el soporte estructural en hongos y plantas, ¿cuál de las siguientes afirmaciones es FALSA?",
            "opciones": [
                "a) La composición química de la pared celular es diferente: quitina en hongos y celulosa (a menudo con lignina) en plantas.",
                "b) El micelio fúngico, una red de hifas, proporciona soporte estructural al cuerpo del hongo.",
                "c) Ambos grupos utilizan paredes celulares rígidas como principal estrategia de soporte a nivel celular.",
                "d) Los hongos forman tejidos altamente especializados como la madera (lignina) para alcanzar grandes alturas.",
                "e) Las plantas adicionalmente utilizan la presión de turgencia como un mecanismo hidrostático de soporte, especialmente en tejidos no leñosos.",
                "f) La rigidez de las paredes celulares limita en cierta medida el tamaño y la flexibilidad de estos organismos sésiles."
            ],
            "correcta": "d"
        },
        { // Pregunta 19 (Originalmente la 20)
            "enunciado": "Imagina un ecosistema acuático microscópico en una gota de agua de florero. Podrías encontrar bacterias móviles, algas unicelulares fotosintéticas como Euglena, y protozoos depredadores como Paramecium y Amoeba. ¿Qué combinación de estructuras de soporte y movimiento esperarías encontrar predominantemente en este ambiente?",
            "opciones": [
                "a) Paredes celulares diversas (peptidoglucano, celulosa), membranas flexibles, y movimiento por flagelos, cilios y pseudópodos.",
                "b) Exoesqueletos de quitina y locomoción mediante patas articuladas.",
                "c) Micelios de quitina y crecimiento direccional como principal forma de desplazamiento.",
                "d) Predominio de hidroesqueletos y movimiento por contracción muscular.",
                "e) Exclusivamente paredes celulares de celulosa y movimiento por tropismos.",
                "f) Endoesqueletos óseos y natación mediante aletas."
            ],
            "correcta": "a"
        },
        { // Pregunta 20 - Necesitamos una más para llegar a 20. Tomo la 1 de la página 5 de las evaluaciones.
            "enunciado": "Un científico está diseñando un experimento para investigar específicamente el FOTOTROPISMO en plántulas de lenteja. Dispone de 4 montajes experimentales. ¿Cuál de los siguientes diseños es el más adecuado para observar y medir ÚNICAMENTE la respuesta del tallo a la dirección de la luz, controlando otras variables?",
             "opciones": [
                "a) Grupo 1: Plántulas con luz lateral unidireccional. Grupo 2: Plántulas con luz desde todas direcciones (uniforme).",
                "b) Grupo 1: Plántulas con luz lateral unidireccional. Grupo 2: Las mismas plántulas, pero tocando sus tallos diariamente (para medir tigmotropismo).",
                "c) Grupo 1: Plántulas regadas abundantemente con luz lateral. Grupo 2: Plántulas con poca agua y luz lateral.",
                "d) Grupo 1: Plántulas en oscuridad total. Grupo 2: Plántulas con luz cenital (desde arriba).",
                "e) Grupo 1: Plántulas con luz lateral unidireccional, mantenidas a 10°C. Grupo 2: Plántulas con luz lateral unidireccional, mantenidas a 25°C.",
                "f) Grupo 1: Plántulas con luz lateral unidireccional. Grupo 2: Plántulas en una plataforma giratoria (clinostato) con luz lateral unidireccional (para anular gravitropismo)."
            ],
            "correcta": "a" // Asumiendo que 'a' es la correcta para la Q1 de la pág 5. (Es la misma que la 17, pero con 'f' siendo correcta. Revisar esto y poner la respuesta correcta)
                           // NOTA: Esta pregunta es muy similar a la 17. Es mejor tener preguntas distintas.
                           // Voy a cambiar esta pregunta por la "pregunta 7" original que había reservado.
        }
    ];

    const spareQuestionForLifeline = { // Pregunta 7 original, usada como repuesto
        "enunciado": "Las plantas trepadoras, como las vides o los pepinos, a menudo desarrollan estructuras delgadas y enrolladas llamadas zarcillos que les permiten sujetarse a soportes como rejas o troncos. Cuando un zarcillo toca un soporte, crece enrollándose firmemente alrededor de él. Este fenómeno es un ejemplo de:",
        "opciones": [
            "a) Crecimiento apical normal.",
            "b) Tigmotropismo.",
            "c) Hidroesqueleto en acción.",
            "d) Fototropismo negativo.",
            "e) Nastia sísmica (como la Mimosa).",
            "f) Gravitropismo positivo."
        ],
        "correcta": "b"
    };

    // Ajuste: Reemplazo la pregunta 20 (repetida) con la de repuesto para tener variedad, y luego la de repuesto real será otra.
    // O mejor, dejo la de repuesto como estaba y me aseguro que las 20 del juego sean distintas.
    // La pregunta 17 y la 20 que tomé de las imágenes son casi idénticas, solo cambia la opción correcta.
    // Voy a eliminar la 20ª que añadí (que era la P1 de la pág 5) y usaré la 'spareQuestionForLifeline' como la 20ª pregunta del juego.
    // Y necesitaré una NUEVA pregunta de repuesto.
    // Tomaré la pregunta 3 de la página 5 como la nueva pregunta de repuesto.

    evaluationQuestions[19] = spareQuestionForLifeline; // La pregunta de los zarcillos ahora es la #20 del juego

    const newSpareQuestion = { // Pregunta 3 de la página 5 de las evaluaciones
        "enunciado": "Las bacterias y los protozoarios son organismos unicelulares, pero difieren significativamente en su estructura celular y soporte. ¿Cuál de las siguientes afirmaciones describe MEJOR una diferencia fundamental en el soporte estructural entre una bacteria típica como Escherichia coli y un protozoario como Amoeba proteus?",
        "opciones": [
            "a) La ameba posee una pared celular de peptidoglucano, mientras que la bacteria tiene una pared de celulosa.",
            "b) La bacteria utiliza un citoesqueleto interno complejo para el soporte, y la ameba depende únicamente de la presión del agua interna (turgencia).",
            "c) La ameba desarrolla un caparazón externo de quitina para soporte, mientras que la bacteria usa flagelos para mantenerse rígida.",
            "d) Ambas poseen una membrana plasmática flexible como principal estructura de soporte, sin diferencias significativas.",
            "e) La bacteria tiene una pared celular rígida que le da forma definida, mientras que la ameba carece de pared y su forma es variable gracias a su membrana flexible.",
            "f) El soporte en ambos depende exclusivamente de la membrana plasmática, pero la de la bacteria es mucho más gruesa."
        ],
        "correcta": "e"
    };


    // --- Game State Variables ---
    let gameQuestions = [];
    let spareQuestion = null; // Será 'newSpareQuestion'
    let currentQuestionIndex = 0;
    let score = 1.0;
    let safeScore = 1.0;
    let playerName = '';
    const MAX_QUESTIONS = 20;
    const SCORE_INCREMENT = 0.20;
    const SAFE_LEVELS = [5, 10, 15, 20];

    let lifelines = {
        '5050': { used: false, element: document.getElementById('lifeline-5050') },
        'phone': { used: false, element: document.getElementById('lifeline-phone') },
        'audience': { used: false, element: document.getElementById('lifeline-audience') },
        'dice': { used: false, element: document.getElementById('lifeline-dice') },
        'change': { used: false, element: document.getElementById('lifeline-change') }
    };

    // --- Initialization ---
    loadSavedData();
    updateLadder();

    // --- Event Listeners ---
    startGameBtn.addEventListener('click', () => {
        playerName = playerNameInput.value.trim();
        if (!playerName) {
            alert('Por favor, ingresa tu nombre.');
            return;
        }
        savePlayerName(playerName);
        initializeGameDataFromEmbedded(); // Usar las preguntas incrustadas
        if (gameQuestions.length > 0) {
            startGame();
        } else {
            alert('Error: No se pudieron cargar las preguntas del juego.');
        }
    });

    playAgainBtn.addEventListener('click', () => {
        endScreen.classList.remove('active');
        startScreen.classList.add('active');
        loadSavedData();
    });

    lifelineBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.dataset.type;
            if (!lifelines[type].used && gameQuestions.length > 0 && currentQuestionIndex < MAX_QUESTIONS) {
                applyLifeline(type);
            }
        });
    });

    // --- Game Logic Functions ---

    function initializeGameDataFromEmbedded() {
        let allAvailableQuestions = [...evaluationQuestions]; // Usar las preguntas definidas arriba

        // Asegurar que todas las preguntas tengan la estructura esperada
        allAvailableQuestions = allAvailableQuestions.map(q => ({
            ...q,
            opciones: q.opciones || [], // Asegurar que opciones es un array
            correcta: q.correcta || 'a' // Asegurar que hay una respuesta correcta (fallback)
        }));
        
        // Barajar las preguntas
        allAvailableQuestions.sort(() => Math.random() - 0.5);

        if (allAvailableQuestions.length < MAX_QUESTIONS) {
            console.error("No hay suficientes preguntas incrustadas para el juego.");
            gameQuestions = [];
            spareQuestion = null;
            return;
        }

        gameQuestions = allAvailableQuestions.slice(0, MAX_QUESTIONS);
        spareQuestion = newSpareQuestion; // Usar la nueva pregunta de repuesto definida
    }
    
    function startGame() {
        currentQuestionIndex = 0;
        score = 1.0;
        safeScore = 1.0;
        resetLifelines();
        updateLadder();
        updateScoreDisplay();
        updateHorizontalProgress();

        currentPlayerNameDisplay.textContent = playerName;
        startScreen.classList.remove('active');
        gameScreen.classList.add('active');
        endScreen.classList.remove('active');

        renderQuestion();
    }

    function renderQuestion() {
        if (currentQuestionIndex >= gameQuestions.length) {
            endGame(true);
            return;
        }

        const question = gameQuestions[currentQuestionIndex];
        questionTextElement.textContent = question.enunciado;
        optionsContainer.innerHTML = '';
        audienceChartContainer.style.display = 'none';
        audienceChartContainer.innerHTML = '';

        // Asegurar 6 opciones, rellenando si es necesario
        let currentOptions = [...question.opciones];
        const optionLetters = ['a', 'b', 'c', 'd', 'e', 'f'];
        while (currentOptions.length < 6) {
            const nextLetter = optionLetters[currentOptions.length];
            currentOptions.push(`${nextLetter}) Opción de relleno ${currentOptions.length + 1}`);
        }
        if (currentOptions.length > 6) {
            currentOptions = currentOptions.slice(0,6); // Truncar si hay más de 6
        }


        currentOptions.forEach(optionText => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            
            // Extraer la letra y el texto de la opción
            const match = optionText.match(/^([a-f])\)\s*(.*)/i);
            let choiceLetter, actualOptionText;

            if (match) {
                choiceLetter = match[1].toLowerCase();
                actualOptionText = match[2];
            } else {
                // Fallback si el formato no es exacto (ej. solo "Opción X")
                // Esto es menos robusto y asume que la primera letra es el identificador
                choiceLetter = optionText.charAt(0).toLowerCase(); 
                actualOptionText = optionText;
                console.warn("Formato de opción no estándar, usando fallback:", optionText);
            }
            
            button.textContent = `${choiceLetter.toUpperCase()}) ${actualOptionText}`; // Mostrar siempre con formato X)
            button.dataset.choice = choiceLetter;
            
            button.addEventListener('click', () => handleAnswer(button.dataset.choice, button));
            optionsContainer.appendChild(button);
        });
        updateLadder();
        updateScoreDisplay();
        updateHorizontalProgress();
         // Reactivar botones de opción para la nueva pregunta
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.disabled = false;
            btn.classList.remove('hidden-by-lifeline', 'correct', 'incorrect');
        });
    }

    function handleAnswer(choice, clickedButton) {
        const currentQuestion = gameQuestions[currentQuestionIndex];
        const isCorrect = choice === currentQuestion.correcta.toLowerCase(); // Comparar en minúsculas

        document.querySelectorAll('.option-btn').forEach(btn => btn.disabled = true);

        if (isCorrect) {
            clickedButton.classList.add('correct');
            playSound(correctSound);
            score = parseFloat((score + SCORE_INCREMENT).toFixed(2));
            if (score > 5.0) score = 5.0;

            if (SAFE_LEVELS.includes(currentQuestionIndex + 1)) {
                safeScore = score;
                const ladderItem = progressLadderElement.children[MAX_QUESTIONS - 1 - currentQuestionIndex];
                if (ladderItem) {
                     // Podrías añadir una clase para una animación más específica aquí
                }
            }
            
            setTimeout(() => {
                currentQuestionIndex++;
                if (currentQuestionIndex < MAX_QUESTIONS) {
                    playSound(nextQuestionSound);
                    renderQuestion();
                } else {
                    endGame(true); // Todas las preguntas respondidas
                }
            }, 1500);
        } else {
            clickedButton.classList.add('incorrect');
            playSound(wrongSound);
            const correctBtn = optionsContainer.querySelector(`.option-btn[data-choice="${currentQuestion.correcta.toLowerCase()}"]`);
            if (correctBtn) correctBtn.classList.add('correct');
            
            setTimeout(() => {
                endGame(false);
            }, 2000);
        }
        updateScoreDisplay(); // Actualizar inmediatamente después de la respuesta
    }

    function applyLifeline(type) {
        if (lifelines[type].used) return;
        
        playSound(lifelineSound);
        lifelines[type].used = true;
        lifelines[type].element.disabled = true;
        lifelines[type].element.style.opacity = '0.5';

        const currentQuestion = gameQuestions[currentQuestionIndex];
        const optionButtons = Array.from(optionsContainer.querySelectorAll('.option-btn:not([style*="visibility: hidden"])')); // Solo visibles
        const incorrectOptions = optionButtons.filter(btn => btn.dataset.choice !== currentQuestion.correcta.toLowerCase());

        switch (type) {
            case '5050':
                // Siempre hay 6 opciones visualmente, algunas pueden ser de relleno.
                // Se deben ocultar la mitad de las opciones incorrectas VISIBLES.
                let incorrectVisibleOptions = optionButtons.filter(btn => btn.dataset.choice !== currentQuestion.correcta.toLowerCase());
                shuffleArray(incorrectVisibleOptions);
                const numToHide5050 = Math.ceil(incorrectVisibleOptions.length / 2); // Ocultar la mitad exacta o una más si es impar
                                
                for (let i = 0; i < numToHide5050 && i < incorrectVisibleOptions.length; i++) {
                    incorrectVisibleOptions[i].classList.add('hidden-by-lifeline'); // CSS se encargará de ocultarlo
                    // No es necesario deshabilitarlos si 'hidden-by-lifeline' los oculta visual y funcionalmente
                }
                break;
            case 'phone':
                let suggestedAnswer;
                let visibleOptionsForPhone = optionButtons.map(b => b.dataset.choice);
                if (Math.random() < 0.65 && visibleOptionsForPhone.includes(currentQuestion.correcta.toLowerCase())) {
                    suggestedAnswer = currentQuestion.correcta.toLowerCase();
                } else {
                    let possibleIncorrectSuggestions = incorrectOptions.filter(b => !b.classList.contains('hidden-by-lifeline')).map(b => b.dataset.choice);
                    if (possibleIncorrectSuggestions.length > 0) {
                        suggestedAnswer = possibleIncorrectSuggestions[Math.floor(Math.random() * possibleIncorrectSuggestions.length)];
                    } else { // Si todas las incorrectas están ocultas, sugiere la correcta
                        suggestedAnswer = currentQuestion.correcta.toLowerCase();
                    }
                }
                setTimeout(()=> alert(`Tu amigo sugiere: Opción ${suggestedAnswer.toUpperCase()}`), 200);
                break;
            case 'audience':
                let visibleChoicesForAudience = optionButtons
                    .filter(btn => !btn.classList.contains('hidden-by-lifeline'))
                    .map(b => b.dataset.choice);
                generateAudienceChart(currentQuestion.correcta.toLowerCase(), visibleChoicesForAudience);
                break;
            case 'dice':
                const diceRoll = Math.floor(Math.random() * 6) + 1;
                alert(`Has sacado un ${diceRoll} en el dado.`);
                let incorrectVisibleForDice = incorrectOptions.filter(b => !b.classList.contains('hidden-by-lifeline'));
                let numToRemoveDice = Math.min(diceRoll, incorrectVisibleForDice.length); 
                // No limitar a 5 aquí, ya que el dado puede ser 6 y podríamos tener 5 incorrectas.
                // Si el dado es mayor que las incorrectas restantes, las elimina todas.
                shuffleArray(incorrectVisibleForDice);
                for (let i = 0; i < numToRemoveDice; i++) {
                    incorrectVisibleForDice[i].classList.add('hidden-by-lifeline');
                }
                break;
            case 'change':
                if (spareQuestion) {
                    gameQuestions[currentQuestionIndex] = {...spareQuestion}; // Usar copia para evitar modificar el original
                    // spareQuestion = null; // Originalmente para usar solo una vez, pero si se quiere reusar, no poner a null
                                         // Para este juego, la ayuda se usa una vez.
                    renderQuestion();
                } else {
                    alert("No hay pregunta de repuesto disponible o ya se usó.");
                    lifelines[type].used = false; 
                    lifelines[type].element.disabled = false;
                    lifelines[type].element.style.opacity = '1';
                }
                break;
        }
    }
    
    function generateAudienceChart(correctChoice, availableChoices) {
        audienceChartContainer.innerHTML = '';
        audienceChartContainer.style.display = 'flex';
        let percentages = {}; // Usar objeto para asignar porcentajes a letras
        let remainingPercentage = 100;
        let choicesToChart = [...availableChoices]; // Copia para no modificar el original

        // Asegurar que la opción correcta está en las opciones a graficar si es visible
        if (!choicesToChart.includes(correctChoice) && optionButtons.find(b=>b.dataset.choice === correctChoice && !b.classList.contains('hidden-by-lifeline'))) {
            // Esto no debería pasar si availableChoices se genera bien, pero por si acaso.
        }
    
        const correctIsHighest = Math.random() < 0.70;
        let highestChoice = correctChoice;

        if (!correctIsHighest && choicesToChart.length > 1) {
            let otherOptions = choicesToChart.filter(c => c !== correctChoice);
            if(otherOptions.length > 0) {
                highestChoice = otherOptions[Math.floor(Math.random() * otherOptions.length)];
            } else { // Solo queda la correcta
                highestChoice = correctChoice;
            }
        }
        
        // Asignar el porcentaje más alto
        let highestPercentage = Math.floor(Math.random() * 31) + 40; // 40% a 70%
        percentages[highestChoice] = highestPercentage;
        remainingPercentage -= highestPercentage;
        
        let otherChoicesForChart = choicesToChart.filter(c => c !== highestChoice);
        shuffleArray(otherChoicesForChart);

        otherChoicesForChart.forEach((choice, index) => {
            if (index === otherChoicesForChart.length - 1) {
                percentages[choice] = remainingPercentage;
            } else {
                let perc = Math.floor(Math.random() * (remainingPercentage / (otherChoicesForChart.length - index) + 1));
                if (remainingPercentage - perc < 0) perc = remainingPercentage;
                percentages[choice] = perc;
                remainingPercentage -= perc;
            }
        });
         // Ajuste final para que sume 100%
        let currentSum = Object.values(percentages).reduce((sum, p) => sum + p, 0);
        if (currentSum !== 100 && choicesToChart.length > 0) {
            let lastChoiceInChart = choicesToChart[choicesToChart.length -1]; // Podría ser cualquiera si no se ordenan
            if (percentages[lastChoiceInChart] !== undefined) {
                 percentages[lastChoiceInChart] += (100 - currentSum);
            } else if (Object.keys(percentages).length > 0) { // Si la última no está en el objeto, añadir a la primera que sí esté
                let firstKey = Object.keys(percentages)[0];
                percentages[firstKey] += (100-currentSum);
            }
        }

        // Crear las barras ordenadas alfabéticamente
        optionLetters = ['a', 'b', 'c', 'd', 'e', 'f'];
        optionLetters.forEach(letter => {
            if (choicesToChart.includes(letter)) { // Solo mostrar barras para opciones visibles/disponibles
                const percValue = percentages[letter] || 0; // Si no tiene porcentaje asignado, es 0
                 if (percValue < 0) percentages[letter] = 0; // No permitir negativos

                const barDiv = document.createElement('div');
                barDiv.classList.add('audience-bar');
                barDiv.style.height = `${percentages[letter]}%`;
                
                const label = document.createElement('span');
                label.classList.add('bar-label');
                label.textContent = letter.toUpperCase();
                
                const percText = document.createElement('span');
                percText.classList.add('bar-percentage');
                percText.textContent = `${percentages[letter]}%`;
                
                barDiv.appendChild(percText); // Porcentaje arriba
                barDiv.appendChild(label);    // Letra abajo
                audienceChartContainer.appendChild(barDiv);
            }
        });
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function updateScoreDisplay() {
        currentScoreDisplay.textContent = `Nota: ${score.toFixed(1)}`;
    }
    
    function updateHorizontalProgress() {
        const progressPercentage = (currentQuestionIndex / MAX_QUESTIONS) * 100;
        horizontalProgressBar.style.width = `${progressPercentage}%`;
    }

    function updateLadder() {
        progressLadderElement.innerHTML = '';
        for (let i = 0; i < MAX_QUESTIONS; i++) {
            const li = document.createElement('li');
            const questionNumber = i + 1;
            let displayScore = 1.0 + (questionNumber * SCORE_INCREMENT);
            if (displayScore > 5.0) displayScore = 5.0; // Cap score
            displayScore = parseFloat(displayScore.toFixed(1)); // Asegurar un decimal

            li.textContent = `P ${questionNumber}: ${displayScore}`; // Más corto
            if (SAFE_LEVELS.includes(questionNumber)) {
                li.classList.add('safe-level');
            }
            if (i === currentQuestionIndex) {
                li.classList.add('current-question-level');
                if (SAFE_LEVELS.includes(questionNumber) && score === displayScore) { // Solo animar si se alcanzó este seguro
                     // li.style.animation = 'safePulse 1s infinite';
                }
            }
            progressLadderElement.appendChild(li);
        }
    }
    
    function resetLifelines() {
        for (const type in lifelines) {
            lifelines[type].used = false;
            lifelines[type].element.disabled = false;
            lifelines[type].element.style.opacity = '1';
        }
    }

    function endGame(completed) {
        let finalScoreValue = completed ? score : safeScore;
        finalScoreValue = parseFloat(finalScoreValue.toFixed(1));

        finalResultDisplay.textContent = `${playerName} – Puntuación: ${finalScoreValue}`;
        
        updateHighScore(finalScoreValue);

        gameScreen.classList.remove('active');
        endScreen.classList.add('active');
    }

    function playSound(soundElement) {
        if (soundElement) {
            soundElement.currentTime = 0;
            soundElement.play().catch(e => console.log("Error al reproducir sonido:", e));
        }
    }

    function savePlayerName(name) {
        localStorage.setItem('millonarioPlayerName', name);
    }
    function loadPlayerName() {
        return localStorage.getItem('millonarioPlayerName') || '';
    }
    function updateHighScore(currentScoreValue) {
        let highScore = parseFloat(localStorage.getItem('millonarioHighScore')) || 1.0;
        if (currentScoreValue > highScore) {
            highScore = currentScoreValue;
            localStorage.setItem('millonarioHighScore', highScore.toFixed(1));
        }
        highScoreDisplay.textContent = `Mejor Puntuación: ${highScore.toFixed(1)}`;
        finalHighScoreDisplay.textContent = `Mejor Puntuación Histórica: ${highScore.toFixed(1)}`;
        return highScore;
    }
    function loadSavedData() {
        playerNameInput.value = loadPlayerName();
        const highScore = parseFloat(localStorage.getItem('millonarioHighScore')) || 1.0;
        highScoreDisplay.textContent = `Mejor Puntuación: ${highScore.toFixed(1)}`;
    }
});