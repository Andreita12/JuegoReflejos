// Seleccionar los elementos
const player = document.getElementById("player");
const target = document.getElementById("target");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const levelDisplay = document.getElementById("level");

let score = 0;
let gameTime = 0;
let level = 1;
let playerSize = 40;
let targetSize = 40;
let gameAreaSize = 400;

// Mover el jugador con el ratón
document.getElementById("game-area").addEventListener("mousemove", (event) => {
  const rect = event.currentTarget.getBoundingClientRect();
  let playerX = event.clientX - rect.left - player.offsetWidth / 2;
  let playerY = event.clientY - rect.top - player.offsetHeight / 2;

  // Asegurarse de que el jugador no salga del área de juego
  playerX = Math.max(0, Math.min(playerX, rect.width - player.offsetWidth));
  playerY = Math.max(0, Math.min(playerY, rect.height - player.offsetHeight));

  player.style.left = playerX + "px";
  player.style.top = playerY + "px";

  checkCollision();
});

// Mover el objetivo a una posición visible
function moveTarget() {
  const gameArea = document.getElementById("game-area");
  const rect = gameArea.getBoundingClientRect();

  // Calcular posiciones aleatorias dentro del área de juego
  const targetX = Math.random() * (rect.width - targetSize);
  const targetY = Math.random() * (rect.height - targetSize);

  // Asegurar que el objetivo esté siempre visible dentro del área
  target.style.left = targetX + "px";
  target.style.top = targetY + "px";
}

// Detectar colisión
function checkCollision() {
  const playerRect = player.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();

  if (
    playerRect.left < targetRect.right &&
    playerRect.right > targetRect.left &&
    playerRect.top < targetRect.bottom &&
    playerRect.bottom > targetRect.top
  ) {
    score += 1;
    scoreDisplay.textContent = score;

    // Reproducir sonido
    playSound();

    // Animar el objetivo
    target.classList.add("caught");
    setTimeout(() => target.classList.remove("caught"), 300);

    // Mover el objetivo a una nueva posición
    moveTarget();

    // Subir de nivel cada 5 aciertos
    if (score % 5 === 0) {
      levelUp();
    }
  }
}

// Subir de nivel
function levelUp() {
  level += 1;
  levelDisplay.textContent = level;

  // Reducir tamaño del jugador y objetivo
  playerSize = Math.max(20, playerSize - 5);
  targetSize = Math.max(20, targetSize - 5);

  player.style.width = playerSize + "px";
  player.style.height = playerSize + "px";
  target.style.width = targetSize + "px";
  target.style.height = targetSize + "px";

  // Aumentar el tamaño del área de juego
  gameAreaSize += 50;
  const gameArea = document.getElementById("game-area");
  gameArea.style.width = gameAreaSize + "px";
  gameArea.style.height = gameAreaSize + "px";

  // Mantener el área de juego centrada
  gameArea.scrollIntoView({ behavior: "smooth", block: "center" });

  // Asegurar que el objetivo esté dentro del nuevo tamaño
  moveTarget();
}

// Reproducir sonido al atrapar el objetivo
function playSound() {
  const audio = new Audio("https://www.soundjay.com/button/beep-07.wav");
  audio.play();
}

// Temporizador: Actualizar cada segundo
setInterval(() => {
  gameTime += 1;
  timeDisplay.textContent = gameTime;
}, 1000);

// Iniciar el juego
moveTarget();
