(function(root) {
	var SG = root.SG = (root.SG || {});
	
	var Coord = SG.Coord = function(x, y) {
		this.x = x;
		this.y = y;
	};
	
	Coord.prototype.plus = function(temp) {
		return new Coord(this.x + temp.x, this.y + temp.y);
	};
	
	var Apple = SG.Apple = function(board) {
		this.board = board;
		this.position = null;
	};
	
	Apple.prototype.replace = function(snake){
		var x = Math.floor(Math.random() * this.board.dim);
		var y = Math.floor(Math.random() * this.board.dim);
		
		this.position = new Coord(x, y);
		
	};

	var Snake = SG.Snake = function(board) {
		this.dir = "n";
		this.board = board;
		
		var midPoint = (board.dim/2);
		var center = new Coord(midPoint, midPoint);
		
		this.segments = [center];
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
		var newHead = head.plus(Snake.DIFFS[this.dir]);
		
		if (this.eatsApple(newHead)) {
			snake.segments.push(head.plus(Snake.DIFFS[this.dir]));
			this.board.apple.replace(this);
			this.board.score += 7;
			if (this.board.highscore < this.board.score) {
				this.board.highscore += 7;
			}
		} else if (this.board.validMove(head.plus(Snake.DIFFS[this.dir]))) {
			snake.segments.push(head.plus(Snake.DIFFS[this.dir]));
			snake.segments.shift();
		} else {
			snake.segments = [];
		}
	};
	
	Snake.prototype.turn = function(newDir) {
		this.dir = newDir
	};
	
	Snake.prototype.eatsApple = function(headPos) {
		var applePos = this.board.apple.position;
		return (headPos.x == applePos.x) && (headPos.y == applePos.y)
	};

	var Board = SG.Board = function (dim) {
		this.dim = dim;
		this.highscore = 0;
	};
	
	Board.prototype.boardSetup = function () {
		this.snake = new Snake(this);
		this.score = 0;
		this.apple = new Apple(this);
		this.apple.replace();
	};
	
	Board.prototype.validMove = function(coord) {
		var insideBoard = (coord.x <= this.dim) && (coord.x >= 0) && (coord.y <= this.dim) && (coord.y >= 0);
		var empty = _(this.snake.segments).every(function(seg) {
			return (coord.x !== seg.x) || (coord.y !== seg.y)
		});
		
		return insideBoard && empty;
	};
})(this);

























