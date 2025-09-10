const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Imagens
const bgImg = new Image();
bgImg.src = "assets/background.png";

const playerImg = new Image();
playerImg.src = "assets/karolaine-runner.png";

const errorImg = new Image();
errorImg.src = "assets/error-404.png";

const syntaxImg = new Image();
syntaxImg.src = "assets/syntax-error.png";

const commitImg = new Image();
commitImg.src = "assets/commit.png";

// Jogadora
let player = { x: 50, y: 300, width: 50, height: 50, velocityY: 0, jumping: false };
let gravity = 1;
let obstacles = [];
let score = 0;

// Desenhar fundo
function drawBackground() {
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
}

// Desenhar jogadora
function drawPlayer() {
  ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
}

// Desenhar obstáculos
function drawObstacle(ob) {
  let img;
  if (ob.type === "error") img = errorImg;
  else if (ob.type === "syntax") img = syntaxImg;
  else if (ob.type === "commit") img = commitImg;

  ctx.drawImage(img, ob.x, ob.y, ob.width, ob.height);
}

// Atualizar jogo
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  drawPlayer();

  player.velocityY += gravity;
  player.y += player.velocityY;

  if (player.y > 300) {
    player.y = 300;
    player.jumping = false;
  }

  obstacles.forEach((ob, index) => {
    ob.x -= 5;
    drawObstacle(ob);

    // Colisão
    if (
      player.x < ob.x + ob.width &&
      player.x + player.width > ob.x &&
      player.y < ob.y + ob.height &&
      player.y + player.height > ob.y
    ) {
      if (ob.type === "commit") {
        score += 5; // coleta de commit
        obstacles.splice(index, 1);
      } else {
        alert("💥 Você bateu em um erro de código!");
        score = 0;
        obstacles = [];
      }
    }

    // Passou obstáculo
    if (ob.x < 0) {
      obstacles.splice(index, 1);
      score++;
    }
  });

  // Pontuação
  ctx.fillStyle = "#fff";
  ctx.font = "20px Courier New";
  ctx.fillText("Score: " + score, 700, 30);

  requestAnimationFrame(update);
}

// Pulo
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && !player.jumping) {
    player.velocityY = -15;
    player.jumping = true;
  }
});

// Obstáculos
setInterval(() => {
  const types = ["error", "syntax", "commit"];
  const randomType = types[Math.floor(Math.random() * types.length)];

  obstacles.push({
    x: 800,
    y: 300,
    width: 30,
    height: 30,
    type: randomType
  });
}, 2000);

// Iniciar
update();
