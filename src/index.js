let user;

function startGame() {
    user = new component(60, 20, "/img/user.png", 275, 275, "image");
    //attacker.beginPath();
    //attacker = context.arc(10, 5, 5, 0, 2 * Math.PI);
    gameArea.create();
}

const gameArea = {
    canvas: document.createElement("canvas"),
    create: function() {
        this.canvas.width = 500;
        this.canvas.height = 300;
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

function component(width, height, color, x, y, type) {
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

function updateCompPosition() {
    gameArea.clear();
    //user.x += 1;
    user.newPosition();
    user.update();
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