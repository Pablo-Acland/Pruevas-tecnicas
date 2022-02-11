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
    },
        

    
    self.Bar.prototype ={
        down: function(){

        },
        up: function(){
            
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

window.addEventListener("load",main);
function main(){
    var board = new Board(800,400);
    var bar= new Bar(5,150,20,100,board);
    var bar= new Bar(775,150,20,100,board);
    var canvas = document.getElementById('canvas');
    var board_view = new boardView(canvas,board);
    board_view.draw();
}