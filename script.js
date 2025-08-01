
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

const historias = [/* mismo contenido anterior */];

// Crear cartas
for (let i = 0; i < 12; i++) {
  const carta = document.createElement("div");
  carta.className = "carta";
  carta.dataset.indice = i;
  carta.onclick = () => mostrarCarta(i);
  bosque.appendChild(carta);
}

function mostrarCarta(i) {
  cartaActual = i;
  mensajeCarta.textContent = mensajes[i];
  preguntaCarta.textContent = preguntas[i].pregunta;
  respuestaInput.value = "";
  modalCarta.classList.remove("oculto");
  modalCarta.style.display = "flex";
  new Audio("abrir-carta.mp3").play();
}

verificarRespuesta.onclick = () => {
  const valor = respuestaInput.value.trim().toLowerCase();
  if (valor === preguntas[cartaActual].respuesta) {
    modalCarta.classList.add("oculto");
    abrirPuzzle(cartaActual);
  } else {
    alert("¡Respuesta incorrecta!");
  }
};

function abrirPuzzle(index) {
  puzzleContainer.innerHTML = "";
  bandeja.innerHTML = "";
  const ordenCorrecto = Array.from({ length: 9 }, (_, i) => `${index + 1}_${i + 1}`);
  const piezasMezcladas = [...ordenCorrecto].sort(() => Math.random() - 0.5);

  for (let i = 0; i < 9; i++) {
    const dropzone = document.createElement("div");
    dropzone.className = "pieza dropzone";
    dropzone.dataset.posicion = ordenCorrecto[i];
    dropzone.ontouchstart = dropzone.ondragover = (e) => e.preventDefault();
    dropzone.ondrop = function (e) {
      e.preventDefault();
    };
    puzzleContainer.appendChild(dropzone);
  }

  piezasMezcladas.forEach((id) => {
    const img = document.createElement("img");
    img.src = `puzzle${id}.jpg`;
    img.className = "pieza-img";
    img.id = "pieza_" + id;

    // DRAG para PC
    img.draggable = true;
    img.ondragstart = (e) => e.dataTransfer.setData("text", e.target.id);

    // TOUCH para móviles
    img.ontouchstart = (e) => {
      const touch = e.touches[0];
      img.style.position = "absolute";
      img.style.zIndex = 1000;

      const moveAt = (pageX, pageY) => {
        img.style.left = pageX - img.offsetWidth / 2 + "px";
        img.style.top = pageY - img.offsetHeight / 2 + "px";
      };

      moveAt(touch.pageX, touch.pageY);

      const onTouchMove = (e) => {
        const touch = e.touches[0];
        moveAt(touch.pageX, touch.pageY);
      };

      document.addEventListener("touchmove", onTouchMove);

      img.ontouchend = function () {
        img.style.position = "";
        img.style.zIndex = "";

        document.removeEventListener("touchmove", onTouchMove);

        const elements = document.elementsFromPoint(
          parseInt(img.style.left) + img.offsetWidth / 2,
          parseInt(img.style.top) + img.offsetHeight / 2
        );

        const dropzone = elements.find(el => el.classList && el.classList.contains("dropzone"));
        if (dropzone) {
          if (dropzone.firstChild) bandeja.appendChild(dropzone.firstChild);
          dropzone.appendChild(img);
        } else {
          bandeja.appendChild(img);
        }
      };
    };

    bandeja.appendChild(img);
  });

  // zona drop para bandeja (PC)
  bandeja.ondragover = (e) => e.preventDefault();
  bandeja.ondrop = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text");
    const pieza = document.getElementById(id);
    if (!pieza || bandeja.contains(pieza)) return;
    bandeja.appendChild(pieza);
  };

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

playBtn.onclick = () => musica.play();

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
