(function(root) {
	var SG = root.SG = (root.SG || {});
	
	var Snake = SG.Snake = function(board) {
		this.direction = "n";
		this.board = board;
		
		var center = [(this.board.dim/2), (this.board.dim/2)]
		
		this.segments = [(center[0], center[1])];
		// return array with single position values
	};
	
})(this);

// we are just moving around position values and class-status for 
// an array matrix. 