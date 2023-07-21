const canvas = document.getElementById("mazeCanvas");
const ctx = canvas.getContext("2d");

// Game variables
const tileSize = 30;
const mazeSize = 20;
const playerSize = tileSize - 4;

// Create game objects
const maze = generateMaze(mazeSize, mazeSize);
const player = { x: 1, y: 1 };

function generateMaze(rows, columns) {
    // Create a 2D array of tiles
    const maze = new Array(rows);
    for (let i = 0; i < rows; i++) {
        maze[i] = new Array(columns);
        for (let j = 0; j < columns; j++) {
            maze[i][j] = 1;
        }
    }

    // Design the maze layout
    // 0 = path, 1 = wall
    // Customize this array to change the maze layout
    const layout = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
        [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    // Apply the layout to the maze
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (i < layout.length && j < layout[i].length) {
                maze[i][j] = layout[i][j];
            }
        }
    }

    return maze;
}

// Main game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

function update() {
    // Handle player movement and collision detection
    // Check for win condition
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the maze
    for (let i = 0; i < maze.length; i++) {
        for (let j = 0; j < maze[i].length; j++) {
            if (maze[i][j] === 1) {
                ctx.fillStyle = "black";
                ctx.fillRect(j * tileSize, i * tileSize, tileSize, tileSize);
            }
        }
    }

    // Draw the player as a stick figure
    const playerX = player.x * tileSize + tileSize / 2;
    const playerY = player.y * tileSize + tileSize / 2;

    // Head
    ctx.beginPath();
    ctx.arc(playerX, playerY - 10, 10, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();

    // Body
    ctx.beginPath();
    ctx.moveTo(playerX, playerY);
    ctx.lineTo(playerX, playerY + 20);
    ctx.strokeStyle = "blue";
    ctx.stroke();

    // Arms
    ctx.beginPath();
    ctx.moveTo(playerX - 10, playerY + 10);
    ctx.lineTo(playerX + 10, playerY + 10);
    ctx.strokeStyle = "blue";
    ctx.stroke();

    // Legs
    ctx.beginPath();
    ctx.moveTo(playerX, playerY + 20);
    ctx.lineTo(playerX - 10, playerY + 30);
    ctx.moveTo(playerX, playerY + 20);
    ctx.lineTo(playerX + 10, playerY + 30);
    ctx.strokeStyle = "blue";
    ctx.stroke();

    // Draw collectible items and obstacles
}

document.addEventListener("keydown", (e) => {
    const key = e.key;

    let newX = player.x;
    let newY = player.y;

    if (key === "ArrowUp") newY--;
    else if (key === "ArrowDown") newY++;
    else if (key === "ArrowLeft") newX--;
    else if (key === "ArrowRight") newX++;

    // Check for collisions with walls
    if (maze[newY] && maze[newY][newX] === 0) {
        player.x = newX;
        player.y = newY;
    }
});

gameLoop();
