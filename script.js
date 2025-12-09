const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Player
let player = {
    x: 50,
    y: 250,
    size: 30,
    dy: 0,
    gravity: 0.6,
    jumpPower: -10,
    onGround: true
};

// Obstacle
let obstacle = {
    x: 600,
    y: 260,
    width: 30,
    height: 30,
    speed: 4
};

let score = 0;
let gameOver = false;

// One-button control (SPACE)
document.addEventListener("keydown", e => {
    if (e.code === "Space") {
        if (gameOver) {
            restart();
        } else if (player.onGround) {
            player.dy = player.jumpPower;
            player.onGround = false;
        }
    }
});

function update() {
    if (gameOver) return;

    // Player physics
    player.dy += player.gravity;
    player.y += player.dy;

    // Ground check
    if (player.y >= 250) {
        player.y = 250;
        player.dy = 0;
        player.onGround = true;
    }

    // Move obstacle
    obstacle.x -= obstacle.speed;

    // Reset obstacle + increase difficulty
    if (obstacle.x < -30) {
        obstacle.x = 600;
        score++;
        obstacle.speed += 0.2;
    }

    // Collision detection
    if (
        player.x < obstacle.x + obstacle.width &&
        player.x + player.size > obstacle.x &&
        player.y + player.size > obstacle.y
    ) {
        gameOver = true;
    }

    draw();
    requestAnimationFrame(update);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Player
    ctx.fillStyle = "#00eaff";
    ctx.fillRect(player.x, player.y, player.size, player.size);

    // Obstacle
    ctx.fillStyle = "#ff004c";
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

    // Score
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 25);

    if (gameOver) {
        ctx.fillStyle = "yellow";
        ctx.font = "30px Arial";
        ctx.fillText("GAME OVER", 220, 150);
        ctx.font = "18px Arial";
        ctx.fillText("Press SPACE to Restart", 210, 180);
    }
}

function restart() {
    score = 0;
    obstacle.x = 600;
    obstacle.speed = 4;
    player.y = 250;
    player.dy = 0;
    player.onGround = true;
    gameOver = false;
    update();
}

update();
