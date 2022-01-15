
function startGame() {
    gameArea.create();
}

const gameArea = {
    canvas: document.createElement("canvas"),
    create: function() {
        this.canvas.width = 500;
        this.canvas.height = 300;
        this.context = this.canvas.getContext('2d');
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
}