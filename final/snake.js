class Snake {

    constructor() {
        this.body = [];
        this.body[0] = createVector(floor(w / 2), floor(h / 2));

        this.xdir = 0;
        this.ydir = 0;

        this.len = 0;
        this.score = 0;
    }

    setDir(x, y) {

        if (this.body.length > 1) {
            if (x === -this.xdir && y === -this.ydir) {
                return;
            }
        }

        this.xdir = x;
        this.ydir = y;
    }

    update() {

        let head = this.body[this.body.length - 1].copy();

        this.body.shift();

        head.x += this.xdir;
        head.y += this.ydir;

        this.body.push(head);
    }

    grow() {
        let head = this.body[this.body.length - 1].copy();

        this.len++;
        this.score++;

        this.body.push(head);
    }
    endGame() {
        let head = this.body[this.body.length - 1];
        if (
            head.x < 0 ||
            head.y < 0 ||
            head.x >= w ||
            head.y >= h
        ) {
            return true;
        }
        for (let i = 0; i < this.body.length - 1; i++) {

            if (
                this.body[i].x === head.x &&
                this.body[i].y === head.y
            ) {
                return true;
            }
        }
        return false;
    }
    eat(pos) {

        let head = this.body[this.body.length - 1];

        if (head.x === pos.x && head.y === pos.y) {
            this.grow();
            return true;
        }

        return false;
    }

    show() {

        for (let i = 0; i < this.body.length - 1; i++) {

            fill(0, 255, 120);
            noStroke();
            rect(
                this.body[i].x,
                this.body[i].y,
                1,
                1,
                0.2
            );
        }
        let head = this.body[this.body.length - 1];
        fill(0, 200, 255);
        rect(head.x, head.y, 1, 1, 0.2);
        fill(255);
        circle(head.x + 0.3, head.y + 0.3, 0.15);
        circle(head.x + 0.7, head.y + 0.3, 0.15);
    }
}
