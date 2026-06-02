let snake;
let rez = 20;
let food;

let w;
let h;

let portalA;
let portalB;

let gameStarted = false;

function setup() {
    createCanvas(400, 400);

    w = floor(width / rez);
    h = floor(height / rez);

    snake = new Snake();

    portalA = createVector(2, 2);
    portalB = createVector(w - 3, h - 3);

    foodLocation();
}

function foodLocation() {

    let valid = false;

    while (!valid) {

        let x = floor(random(w));
        let y = floor(random(h));

        valid = true;

        for (let part of snake.body) {
            if (part.x === x && part.y === y) {
                valid = false;
            }
        }

        if (valid) {
            food = createVector(x, y);
        }
    }
}

function keyPressed() {

    if (!gameStarted) {
        gameStarted = true;
        frameRate(5);
    }

    if (keyCode === LEFT_ARROW) {
        snake.setDir(-1, 0);
    }
    else if (keyCode === RIGHT_ARROW) {
        snake.setDir(1, 0);
    }
    else if (keyCode === UP_ARROW) {
        snake.setDir(0, -1);
    }
    else if (keyCode === DOWN_ARROW) {
        snake.setDir(0, 1);
    }
}

function draw() {

    background(15, 15, 30);

    if (!gameStarted) {

        fill(255);
        textAlign(CENTER);

        textSize(32);
        text("NEON SNAKE", width / 2, height / 2 - 40);

        textSize(18);
        text("Press an Arrow Key to Start", width / 2, height / 2);

        textSize(14);
        text("Use Portals and Collect Food", width / 2, height / 2 + 30);

        return;
    }

    scale(rez);

    stroke(40);

    for (let i = 0; i < w; i++) {
        line(i, 0, i, h);
    }

    for (let j = 0; j < h; j++) {
        line(0, j, w, j);
    }

    if (snake.eat(food)) {

        foodLocation();

        frameRate(min(15, 5 + floor(snake.score / 5)));
    }

    snake.update();

    fill(180, 0, 255);
    noStroke();
    rect(portalA.x, portalA.y, 1, 1);

    fill(0, 255, 255);
    rect(portalB.x, portalB.y, 1, 1);

    let head = snake.body[snake.body.length - 1];

    if (head.x === portalA.x && head.y === portalA.y) {
        head.x = portalB.x;
        head.y = portalB.y;
    }

    if (head.x === portalB.x && head.y === portalB.y) {
        head.x = portalA.x;
        head.y = portalA.y;
    }

    fill(255, 50, 50);
    rect(food.x, food.y, 1, 1);

    snake.show();

    if (snake.endGame()) {

        noLoop();

        resetMatrix();

        fill(255, 0, 0);
        textAlign(CENTER);

        textSize(40);
        text("GAME OVER", width / 2, height / 2);

        textSize(20);
        text(
            "Final Score: " + snake.score,
            width / 2,
            height / 2 + 40
        );
    }

    resetMatrix();

    fill(255);

    textSize(20);
    textAlign(LEFT);

    text("Score: " + snake.score, 10, 25);
}
