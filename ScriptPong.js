(function(){
    var self.Board = function(width,height){
        this.width = width;
        this.height = height;
        this.playing = false;
        this.game_over = false;
        this.bars = [];
        this.ball = null;
    }

    self.Board.prototype = {
        get elements(){
            var elements = this.bars;
            elements.push(ball);
            return elements;
        }
    }
})();
(function(){
    self.Bar = funtiom(x,y,width,height,board){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;
        this.board.bars.push(this);
        this.kind = "rectangle";

    }
    self.Board.prototype ={
        down: function(){

        }
        up: function(){
            
        }
    }
}

(function(){
    self.boardView = function(canvas,board){
        this.canvas = canvas;
        this.canvas.width = board.width;
        this. canvas.height = board.height;
        this.board = board;
        this.ctx = canvas.getCantext("2d");
    }

    self.boardView.prototype= {
        draw: function(){
            for (let index = 0; index < array.length; index++) {
                board.elements[index]
                
            }
        }
    }

    function draw(ctx,element){
        switch(element.kind){
            case "square":
                ctx.fillRect(element.x,element.width,element.height);
                break;
        }
    }
})();

window.addEventListener("load",main);
function main(){
    var board = new board(800,400);
    var canvas = document.getElementById('canvas');
    var board_view = new boardView(canvas,board);
}