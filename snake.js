(function(root) {
	var SG = root.SG = (root.SG || {});
	////////////////
	var Coord = SG.Coord = function(x, y) {
		this.x = x;
		this.y = y;
	};
	
	Coord.prototype.plus = function(temp) {
		return new Coord(this.x + temp.x, this.y + temp.y);
	};
	/////////////////
	/////////////////
	var Apple = SG.Apple = function(board) {
		this.board = board;
		this.position = null;
	};
	
	// creates two new random variables, and sets them as the 
	// position value for apple. keep in mind to stay in bounds
	Apple.prototype.replace = function(){
		var x = Math.floor(Math.random() * this.board.dim);
		var y = Math.floor(Math.random() * this.board.dim);
		
		this.position = new Coord(x, y);
	};
	/////////////////
	/////////////////
	var Snake = SG.Snake = function(board) {
		this.dir = "n";
		this.board = board;
		
		var midPoint = (board.dim/2);
		var center = new Coord(midPoint, midPoint);
		
		this.segments = [center];
		// return array with single position values
	};
	
	Snake.DIFFS = {
		"n": new Coord(-1, 0),
		"s": new Coord(1, 0),
		"e": new Coord(0, 1),
		"w": new Coord(0, -1)
	};
	
	Snake.prototype.move = function() {
		var snake = this;
		var head = _.last(snake.segments); 
					// equivalent to _(snake.segments).last()
		var newHead = head.plus(Snake.DIFFS[this.dir]);
		
		if (this.eatsApple(newHead)) {
			snake.segments.push(head.plus(Snake.DIFFS[this.dir]));
			this.board.apple.replace();
		} else if (this.board.validMove(head.plus(Snake.DIFFS[this.dir]))) {
			snake.segments.push(head.plus(Snake.DIFFS[this.dir]));
			snake.segments.shift();
		} else {
			snake.segments = [];
		}
	};
	
	// fix this so you can't turn into yourself
	Snake.prototype.turn = function(newDir) {
		this.dir = newDir
	};
	
	Snake.prototype.eatsApple = function(headPos) {
		var applePos = this.board.apple.position;
		return (headPos.x == applePos.x) && (headPos.y == applePos.y)
	};
	/////////////////
	/////////////////
	var Board = SG.Board = function (dim) {
		this.dim = dim;
		this.apple = new Apple(this);
		this.apple.replace();
		
		this.snake = new Snake(this);
	};
	
	Board.prototype.validMove = function(coord) {
		var insideBoard = (coord.x <= 19) && (coord.x >= 0) && (coord.y <= 19) && 											(coord.y >= 0);
		var empty = _(this.snake.segments).every(function(seg) {
			return (coord.x !== seg.x) || (coord.y !== seg.y)
		});
		
		return insideBoard && empty;
	};
	/////////////////
})(this);

























