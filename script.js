const paper = document.getElementById("paper");
const hint = document.getElementById("hint");
const audio = document.getElementById("bg-audio");

/*
  Página final.
  Tú pediste que lleve a /Cariño.

  Si Neocities no abre /Cariño, cambia esta línea por:
  const finalPage = "/Cariño.html";
*/
const finalPage = "/Carino.html";

let isOpen = false;
let openClicks = 0;
let mobilePreviewDone = false;

const isTouchDevice = window.matchMedia("(hover: none)").matches;

if (isTouchDevice && audio) {
  audio.preload = "none";
}

function startAudio() {
  if (!audio) return;

  audio.volume = 0.45;

  const playPromise = audio.play();

  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // El navegador puede bloquear el audio hasta que haya interacción.
      // No pasa nada; se vuelve a intentar en el siguiente clic.
    });
  }
}

function openPaper() {
  isOpen = true;

  paper.classList.remove("is-folded");
  paper.classList.remove("mobile-preview");
  paper.classList.add("is-open");

  hint.textContent = "haz clic en la nota";
}

function animateOpenNoteClick() {
  openClicks++;

  paper.classList.remove("step-1", "step-2", "step-3", "step-4");

  void paper.offsetWidth;

  paper.classList.add(`step-${openClicks}`);
  paper.classList.add("jiggle");

  setTimeout(() => {
    paper.classList.remove("jiggle");
  }, 700);

  if (openClicks === 1) {
    hint.textContent = "otra vez";
  }

  if (openClicks === 2) {
    hint.textContent = "sigue";
  }

  if (openClicks === 3) {
    hint.textContent = "una última vez";
  }

  if (openClicks >= 4) {
    hint.classList.add("hidden");

    setTimeout(() => {
      paper.classList.add("disappear");
    }, 300);

    setTimeout(() => {
      window.location.href = finalPage;
    }, 1500);
  }
}

function handlePaperInteraction() {
  startAudio();

  if (!isOpen) {
    /*
      En celular:
      - Primer toque: solo aumenta de tamaño.
      - Segundo toque: se abre.
    */
    if (isTouchDevice && !mobilePreviewDone) {
      mobilePreviewDone = true;
      paper.classList.add("mobile-preview");
      hint.textContent = "toca otra vez";
      return;
    }

    openPaper();
    return;
  }

  animateOpenNoteClick();
}

paper.addEventListener("click", handlePaperInteraction);

paper.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    handlePaperInteraction();
  }
});
