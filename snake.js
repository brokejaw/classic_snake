(function(root) {
	var SG = root.SG = (root.SG || {});
	
	var Coord = SG.Coord = function(x, y) {
		this.x = x;
		this.y = y;
	};
	
	Coord.prototype.plus = function(temp) {
		return new Coord(this.x + temp.x, this.y + temp.y);
	};
	
	var Snake = SG.Snake = function(board) {
		this.direction = "n";
		this.board = board;
		
		var midPoint = (board.dim/2);
		var center = new Coord(midPoint, midPoint);
		
		this.segments = [center];
		// return array with single position values
	};
	
	Snake.prototype.move = function() {
		
	};
	
	Snake.DIFFS = {
	//	'n': new Coord
	};
	
})(this);