(function(){
    self.Board = function(width,height){
        this.width = width;
        this.height = height;
        this.playing = false;
        this.game_over = false;
        this.bars = [];
        this.ball = null;
        this.playing = false;
    },

    self.Board.prototype = {
        get elements(){
            //paso bars con map para pasar los elementos uno por uno para hacer una copia y que no sature de basura
            var elements = this.bars.map(function(bar){return bar;});
            elements.push(this.ball);
            return elements;
        }
    }
})();

(function(){
    self.Ball = function(x,y,radius,board){
        this.x = x;
        this.y = y;
        this.radius = radius;

        this.speed_y = 0;
        this.speed_x=3;
        this.speed = 3;
        this.board = board;

        board.ball = this;
        this.kind = "circle";
        this.direccion = 1
        this.bounce_angle = 0;
        this.max_bounce_angle= Math.PI / 12;

    }

    self.Ball.prototype ={
        muve: function(){
            this.x += (this.speed_x * this.direccion);
            this.y += (this.speed_y);

        },
        get width(){
            return this.radius * 2;
        },
        get height(){
            return this.radius * 2;
        },
        collision: function(bar){
            //colisiona con una barra que resive como parametro
             var relative_intesect_y = (bar.y + (bar.height / 2)) - this.y;
            
             var normalized_intersect_y= relative_intesect_y / (bar.height / 2);

             this.bounce_angle = normalized_intersect_y * this.max_bounce_angle;


             this.speed_y = this.speed * Math.sin(this.bounce_angle);
             this.speed_x= this.speed * Math.cos(this.bounce_angle);

             if (this.x > (this.board.width / 2)) {
                 this.direccion = -1;
             }else{
                 this.direccion =1;
             }
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
        this.speed = 25;
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
        clean: function(){
                this.ctx.clearRect(0,0,this.board.width,this.board.height);
        },
        draw: function(){
            for (var index = this.board.elements.length - 1; index >=0 ; index--) {
                var el = this.board.elements[index];
                
                draw(this.ctx, el);
            }; 
        },
        play: function(){
            if(this.board.playing){
            this.clean();
            this.draw();
            this.check_colisions();
            this.board.ball.muve();
            }
        },
        check_colisions: function(){
            for (let index = this.board.bars.length -1; index >=0 ; index--) {
                var bar = this.board.bars[index];
                if (hit(bar,this.board.ball)) {
                    console.log("hola")
                    this.board.ball.collision(bar)
                }
            }
        }
    }
    function hit(a,b){
        //revisa si a coliciona con b
        var hit = false;
        //colisiones horizontales
        if (b.x+b.width >= a.y && b.y < a.y + a.width) {
            //colisiones verticales
            if (b.y+b.height >= a.y && b.y < a.y + a.height) {
                hit= true;
            }
        }
        //colision de a con b
        if (b.x <= a.x && b.x + b.width >= a.x+a.width ) {
            if (b.y <= a.y && b.y + b.height >= a.y + a.height) {
                hit= true;
            }
        }
        //colision b con a
        if (a.x <= b.x && a.x + a.width >= b.x+b.width ) {
            if (a.y <= b.y && a.y + a.height >= b.y + b.height) {
                hit= true;
            }
        }
        return hit;
    }

    function draw(ctx,element){
        
            switch(element.kind){
            case "rectangle":
                ctx.fillRect(element.x,element.y,element.width,element.height);
                break;
            case "circle":
            ctx.beginPath();
            ctx.arc(element.x,element.y,element.radius,0,7);
            ctx.fill();
            ctx.closePath();
            break;
        }
        
        
    }
})();

var board = new Board(800,400);
var bar= new Bar(40,150,30,100,board);
var bar_2= new Bar(735,150,30,100,board);
var canvas = document.getElementById('canvas');
var board_view = new boardView(canvas,board);
var ball = new Ball(400,200,10,board);


document.addEventListener("keydown",function(ev){
    if (ev.keyCode==38) {
        bar.up();
    }
    else if (ev.keyCode==40) {
        bar.down();
    }

    if (ev.keyCode==87) {
        bar_2.up();
    }
    else if (ev.keyCode==83) {
        bar_2.down();
    }else if (ev.keyCode== 32) {
        ev.preventDefault();
        board.playing = !board.playing;
    }

    console.log(bar.toString());
    console.log(bar_2.toString());

});
board_view.draw();
window.requestAnimationFrame(Frame);
//window.addEventListener("load",main);
function Frame(){
    board_view.play();
    window.requestAnimationFrame(Frame);
}