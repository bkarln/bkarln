const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = { x: 50, y: 300, width: 50, height: 50, velocityY: 0, jumping: false };
let gravity = 1;
let obstacles = [];
let score = 0;

function drawPlayer() {
  ctx.fillStyle = "#00f";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawObstacle(ob) {
  ctx.fillStyle = "#f00";
  ctx.fillRect(ob.x, ob.y, ob.width, ob.height);
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
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

    if (
      player.x < ob.x + ob.width &&
      player.x + player.width > ob.x &&
      player.y < ob.y + ob.height &&
      player.y + player.height > ob.y
    ) {
      alert("💥 Você bateu em um erro de código!");
      score = 0;
      obstacles = [];
    }

    if (ob.x < 0) {
      obstacles.splice(index, 1);
      score++;
    }
  });

  ctx.fillStyle = "#fff";
  ctx.fillText("Score: " + score, 700, 30);

  requestAnimationFrame(update);
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && !player.jumping) {
    player.velocityY = -15;
    player.jumping = true;
  }
});

setInterval(() => {
  obstacles.push({ x: 800, y: 300, width: 50, height: 50 });
}, 2000);

update();
