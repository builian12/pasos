const bosque = document.getElementById("bosque");
const modalCarta = document.getElementById("modalCarta");
const modalPuzzle = document.getElementById("modalPuzzle");
const modalLogro = document.getElementById("modalLogro");
const mensajeCarta = document.getElementById("mensajeCarta");
const preguntaCarta = document.getElementById("preguntaCarta");
const respuestaInput = document.getElementById("respuestaInput");
const verificarRespuesta = document.getElementById("verificarRespuesta");
const puzzleContainer = document.getElementById("puzzleContainer");
const historiaTexto = document.getElementById("historiaTexto");
const musica = document.getElementById("musicaFondo");
const playBtn = document.getElementById("playMusica");
const bandeja = document.getElementById("bandejaPiezas");
let botonVerificar = document.getElementById("botonVerificar");

let cartaActual = 0;

const mensajes = Array.from({ length: 12 }, (_, i) => `Este es el mensaje especial de la carta ${i + 1}.`);
const preguntas = [
  { pregunta: "¿Cuánto es 2+2?", respuesta: "4" },
  { pregunta: "¿Color del cielo?", respuesta: "azul" },
  { pregunta: "¿Capital de Ecuador?", respuesta: "quito" },
  { pregunta: "¿Animal que dice miau?", respuesta: "gato" },
  { pregunta: "¿Número entre 2 y 4?", respuesta: "3" },
  { pregunta: "¿Día después del viernes?", respuesta: "sábado" },
  { pregunta: "¿Primera letra?", respuesta: "a" },
  { pregunta: "¿Última letra?", respuesta: "z" },
  { pregunta: "¿Color del sol?", respuesta: "amarillo" },
  { pregunta: "¿Animal que ladra?", respuesta: "perro" },
  { pregunta: "¿3x3?", respuesta: "9" },
  { pregunta: "¿Color del fuego?", respuesta: "rojo" }
];

const historias = [
  {
    titulo: "entre tus latidos",
    contenido: `tu respiracion marca el compas de mis pensamientos
y yo solo quiero bailar al ritmo de tu existencia
me ensenaste que amar no es poseer
es acompanhar
es saber estar sin necesidad de ocuparlo todo
cuando nuestras manos se rozan
el mundo se detiene por un segundo
y ese segundo vale mas que todos mis dias antes de ti
porque amar contigo es sencillo
es caminar despacio
es mirar el cielo sin prisa
es confiar en que siempre habra un lugar para nosotros en cualquier parte del mundo`
  },
  {
    titulo: "donde empieza tu nombre",
    contenido: `cada vez que pienso en ti
siento que mi vida empieza donde comienza tu nombre
y si me pierdo en tus palabras
es porque encuentro en ellas un refugio que no sabia que necesitaba
amarte es aprender a soltar las dudas
a reirme con el corazon
a abrazar incluso cuando no estas
eres el lugar donde vuelvo cuando todo se complica
y por eso
sin promesas eternas
te elijo todos los dias`
  },
  {
    titulo: "tu voz en mi silencio",
    contenido: `me he dado cuenta de que tu voz
tiene el poder de calmar cualquier tormenta
en medio de mis pensamientos mas ruidosos
apareces tu
y todo se vuelve claro
liviano
pacifico
es curioso
porque no necesito verte para saber que estas
tu presencia me acompanha en forma de recuerdo bonito
de susurro constante que me hace sonreir sin motivo
y si amar es encontrar paz
entonces contigo
he encontrado el verdadero significado`
  },
  {
    titulo: "el lenguaje de tus gestos",
    contenido: `no siempre dijiste te amo
pero cada uno de tus gestos lo gritaba
en la forma en que me mirabas cuando no decia nada
en la manera en que esperabas que yo terminara de hablar
aunque ya supieras lo que iba a decir
aprendi contigo que el amor esta en lo sencillo
en un vaso de agua a medianoche
en una cobija compartida
en un mensaje que llega justo cuando el dia duele
y si tu eres el idioma
entonces yo ya no quiero hablar ninguna otra lengua`
  },
  {
    titulo: "contigo el tiempo se detiene",
    contenido: `hay algo en ti que desafia el tiempo
cuando estoy contigo
las horas no corren
se quedan dormidas entre nuestras risas
no importa cuanto dure un instante
si lo vivo a tu lado
cada segundo se vuelve eterno
y cada momento tiene el sabor de lo que quiero conservar para siempre
no quiero prometerte anhos
quiero prometerte momentos reales
miradas autenticas
presencias completas
porque contigo
el tiempo se vuelve amor`
  },
  {
    titulo: "mapa hacia ti",
    contenido: `si alguna vez me pierdo
no quiero que me busques
quiero que cierres los ojos
y sigas el camino de lo que fuimos
te encontraras con mis palabras escondidas en canciones
con mis pasos pegados a los tuyos
con mi voz flotando en el eco de lo que no dije
pero tu sentiste igual
porque amarte ha sido convertirme en un mapa
uno que solo tu sabes leer
uno que solo tu puedes recorrer con los ojos cerrados y el corazon abierto
y si un dia ya no estoy
solo recuerda que el amor que te di
es la brujula que siempre apunta hacia ti`
  },
  {
    titulo: "constelacion contigo",
    contenido: `a veces creo que estas hecha de estrellas
no por tu brillo
sino por como iluminas lo que tocas sin darte cuenta
cada palabra tuya es una chispa
cada gesto
una constelacion que guia mis pasos
tu no llegaste a cambiarme
llegaste a recordarme quien era
antes de olvidar lo que merezco
desde que te conoci
mi universo ya no gira al azar
gira alrededor de tu voz`
  },
  {
    titulo: "tu manera de quedarte",
    contenido: `lo mas bonito de ti
es que no solo llegaste
te quedaste
no con promesas
sino con actos
con silencios que acompanhan
con abrazos que no piden explicacion
te instalaste en mi vida sin hacer ruido
y ahora no puedo imaginar mi casa interior sin tu risa
porque amar no es solo entrar
es quedarse
y tu has sabido quedarte en cada rincon de mi ser`
  },
  {
    titulo: "como si siempre hubieras estado",
    contenido: `desde el primer dia
senti que te conocia de antes
como si el universo nos hubiera presentado en otro tiempo
no pregunte por que
ni como
solo supe que debia quedarme ahi
junto a ti
no hay nada forzado en lo nuestro
todo fluye como si el amor supiera exactamente que hacer con nosotros
y si esto no es destino
entonces es la mejor coincidencia de mi vida`
  },
  {
    titulo: "tu risa como refugio",
    contenido: `hay dias que parecen pesar mas de la cuenta
pero entonces llegas tu
con esa risa que rompe el gris del mundo
tu alegria no solo alegra
sana
cura
acompanha
cuando te ries
mi alma encuentra un rincon donde descansar
y en ese lugar
todo lo demas se vuelve pequenho
porque si tu risa existe
nada esta del todo perdido`
  },
  {
    titulo: "amor sin prisas",
    contenido: `me gustas como llegan las estaciones
a su tiempo
sin empujar
sin apurar
hay una belleza en lo lento
en lo que se construye despacio
en lo que se cuida antes de nombrarlo
y asi llegaste tu
sin prometer nada
pero haciendo que todo cambie
quiero amarte sin urgencias
sin relojes
solo con la certeza de que cada dia
te elijo otra vez`
  },
  {
    titulo: "la forma en que me miras",
    contenido: `cuando me miras
el mundo se ordena
no necesito saber si el futuro es incierto
porque tus ojos me aseguran el presente
hay en tu mirada una ternura que no se aprende
una honestidad que no se disfraza
y si me preguntan como se que esto es amor
respondere
porque la forma en que me miras
me hace sentir que siempre estuve esperando verte`
  }
];

// Crear cartas
for (let i = 0; i < 12; i++) {
  const carta = document.createElement("div");
  carta.className = "carta";
  carta.dataset.indice = i;
  carta.onclick = () => mostrarCarta(i);
  bosque.appendChild(carta);
}

// Mostrar modal de la carta
function mostrarCarta(i) {
  cartaActual = i;
  mensajeCarta.textContent = mensajes[i];
  preguntaCarta.textContent = preguntas[i].pregunta;
  respuestaInput.value = "";
  modalCarta.classList.remove("oculto");
  modalCarta.style.display = "flex";
  new Audio("abrir-carta.mp3").play();
}

// Verificar respuesta
verificarRespuesta.onclick = () => {
  const valor = respuestaInput.value.trim().toLowerCase();
  if (valor === preguntas[cartaActual].respuesta) {
    modalCarta.classList.add("oculto");
    abrirPuzzle(cartaActual);
  } else {
    alert("¡Respuesta incorrecta!");
  }
};

// Mostrar puzzle
function abrirPuzzle(index) {
  puzzleContainer.innerHTML = "";
  bandeja.innerHTML = "";
  const ordenCorrecto = Array.from({ length: 9 }, (_, i) => `${index + 1}_${i + 1}`);
  const piezasMezcladas = [...ordenCorrecto].sort(() => Math.random() - 0.5);

  for (let i = 0; i < 9; i++) {
    const dropzone = document.createElement("div");
    dropzone.className = "pieza dropzone";
    dropzone.dataset.posicion = ordenCorrecto[i];
    dropzone.ondragover = (e) => e.preventDefault();
    dropzone.ondrop = function (e) {
      e.preventDefault();
      const id = e.dataTransfer.getData("text");
      const pieza = document.getElementById(id);
      if (!pieza || this.contains(pieza)) return;
      if (this.firstChild) bandeja.appendChild(this.firstChild);
      this.appendChild(pieza);
    };
    puzzleContainer.appendChild(dropzone);
  }

  piezasMezcladas.forEach((id) => {
    const img = document.createElement("img");
    img.src = `puzzle${id}.jpg`;
    img.className = "pieza-img";
    img.id = "pieza_" + id;
    img.draggable = true;
    img.ondragstart = (e) => e.dataTransfer.setData("text", e.target.id);
    bandeja.appendChild(img);
  });

  bandeja.ondragover = (e) => e.preventDefault();
  bandeja.ondrop = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text");
    const pieza = document.getElementById(id);
    if (!pieza || bandeja.contains(pieza)) return;
    bandeja.appendChild(pieza);
  };

  // Reasignar botón “¡Listo!”
  if (!botonVerificar) {
    botonVerificar = document.createElement("button");
    botonVerificar.id = "botonVerificar";
    botonVerificar.textContent = "¡Listo!";
    document.querySelector("#modalPuzzle .contenido").appendChild(botonVerificar);
  }

  botonVerificar.onclick = () => {
    const zonas = Array.from(document.querySelectorAll(".dropzone"));
    const completo = zonas.every((zona) => zona.firstChild);
    if (!completo) {
      alert("Aún faltan piezas por colocar.");
      return;
    }

    const correcto = zonas.every((zona) => {
      const pieza = zona.firstChild;
      return pieza && pieza.id === "pieza_" + zona.dataset.posicion;
    });

    if (correcto) {
      modalPuzzle.classList.add("oculto");
      historiaTexto.innerHTML = `
        <h3 style="text-align: center; margin-bottom: 1rem;">
          ${historias[cartaActual].titulo}
        </h3>
        <p style="white-space: pre-line;">
          ${historias[cartaActual].contenido.replace(/\n/g, "<br>")}
        </p>
      `;

      modalLogro.classList.remove("oculto");
      modalLogro.style.display = "flex";
    } else {
      alert("El puzzle no está armado correctamente. Inténtalo de nuevo.");
    }
  };

  modalPuzzle.classList.remove("oculto");
  modalPuzzle.style.display = "flex";
}

// Música
playBtn.onclick = () => musica.play();

// Cierre de todos los modales
document.getElementById("cerrarCarta").onclick = () => {
  modalCarta.classList.add("oculto");
  modalCarta.style.display = "none";
};
document.getElementById("cerrarPuzzle").onclick = () => {
  modalPuzzle.classList.add("oculto");
  modalPuzzle.style.display = "none";
};
document.getElementById("cerrarLogro").onclick = () => {
  modalLogro.classList.add("oculto");
  modalLogro.style.display = "none";
};