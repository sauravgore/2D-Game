let user;
let attacker;

/*
attacker.src="/img/attaker.png";
attacker.onload = function() {
    attackerPos.save();
    attackerPos.beginPath();
    attackerPos.arc(25, 25, 25, 0, MATH.PI * 2, true);
    attackerPos.closePath();
    attackerPos.clip();

    attackerPos.drawImage(attackerPos, 0, 0, 50, 50);
    attackerPos.beginPath();
    attackerPos.arc(0, 0, 25, 0, MATH.PI * 2, true);
    attackerPos.closePath();
    attackerPos.clip();
}
*/

function startGame() {
    user = new componentUser(80, 20, "/img/user.png", 90, 480, "image");
    attacker = new componentAttacker(15, 12, "/img/attacker.png", 100, 5, "image");
    gameArea.create();
}

const gameArea = {
    canvas: document.createElement("canvas"),
    create: function() {
        this.canvas.width = 700;
        this.canvas.height = 500;
        this.context = this.canvas.getContext('2d');
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateCompPosition, 10);
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function() {
        clearInterval(this.interval);
    }
}

function componentUser(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.moveX = 0;
    this.moveY = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        compElm = gameArea.context;
        if (type == "image") {
            compElm.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
        else {
            compElm.fillStyle = color;
            compElm.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPosition = function() {
        this.x += this.moveX;
        this.y += this.moveY;
    }
}

function componentAttacker(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.moveX = 0;
    this.moveY = 0;
    this.x = x;
    this.y = y;
    this.gravity = 0.03;
    this.gravitySpeed = 0;
    this.update = function() {
        compElm = gameArea.context;
        if (type == "image") {
            compElm.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
        else {
            compElm.fillStyle = color;
            compElm.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPosition = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.moveX;
        this.y += this.moveY + this.gravitySpeed;
    }

    /*-------- Development in progress --------*/

    this.hitBottom = function() {
        let floorBottom = gameArea.canvas.height - this.height;
        if (this.y > floorBottom) {
            this.y = floorBottom;
            this.gravitySpeed = 0;
        }
    }
}

function updateCompPosition() {
    gameArea.clear();
    user.newPosition();
    user.update();
    attacker.newPosition();
    attacker.update();
}

function moveLeft() {
    user.moveX = -1;
}

function moveRight() {
    user.moveX = 1;
}

function clearMove() {
    user.moveX = 0;
    user.moveY = 0;
}