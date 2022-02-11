(function(){
    self.Board = function(width,height){
        this.width = width;
        this.height = height;
        this.playing = false;
        this.game_over = false;
        this.bars = [];
        this.ball = null;
    },

    self.Board.prototype = {
        get elements(){
            var elements = this.bars;
            elements.push(this.ball);
            return elements;
        }
    }
})();
(function(){
    self.Bar = function(x,y,width,height,board){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;
        this.board.bars.push(this);
        this.kind = "rectangle";
        this.speed = 10;
    },
        

    
    self.Bar.prototype ={
        down: function(){
            this.y += this.speed;
        },
        up: function(){
            this.y -= this.speed;
        },
        toString: function(){
            return "x: "+ this.x+" y: "+this.y;
        }
    }
})();

(function(){
    self.boardView = function(canvas,board){
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.ctx = canvas.getContext("2d");
    }

    self.boardView.prototype= {
        draw: function(){
            for (var index = this.board.elements.length - 1; index >=0 ; index--) {
                var el = this.board.elements[index];
                
                draw(this.ctx, el);
            }; 
        }
    }

    function draw(ctx,element){
        if(element!== null && element.hasOwnProperty("kind")){
            switch(element.kind){
            case "rectangle":
                ctx.fillRect(element.x,element.y,element.width,element.height);
                break;
            }
        }
        
    }
})();

var board = new Board(800,400);
var bar= new Bar(5,150,20,100,board);
var bar= new Bar(775,150,20,100,board);
var canvas = document.getElementById('canvas');
var board_view = new boardView(canvas,board);

document.addEventListener("keydown",function(ev){
    if (ev.keyCode==38) {
        bar.up();
    }
    else if (ev.keyCode==40) {
        bar.down();
    }

    console.log(""+bar);

});

window.addEventListener("load",main);
function main(){
    console.log("hola a todos");

    board_view.draw();
}