(function(root) {
	var SG = root.SG = (root.SG || {});
	
	var View = SG.View = function($el) {
		this.$el = $el;
		this.board = null;
		this.intervalID = null; // this is our interval. 
		
	};
	
	// map keyCode to dir
	View.KEYS = {
		38: "n",
		39: "e",
		40: "s",
		37: "w"
	};
	
	// DOM interaction point
	View.prototype.render = function () {
		
		var view = this;
		var board = this.board;
		var score = this.board.score;
		
		function blankMatrix () {
			
			return _.times(view.board.dim, function() {
				return _.times(view.board.dim, function() {
					return $('<div class="cell"></div>'); 
				});
			});
		};
		
		var boardMatrix = blankMatrix();
		_(board.snake.segments).each(function(seg) {
			
			boardMatrix[seg.x][seg.y].addClass("snake");	
		});
		
		var appleX = board.apple.position.x;
		var appleY = board.apple.position.y;
		
		boardMatrix[appleX][appleY].addClass("apple");
		
		this.$el.empty();
		
		_(boardMatrix).each(function (row) {
			var $rowEl = $('<div class="row"></div>');
			_(row).each(function ($cell) {
				$rowEl.append($cell)
			});
			view.$el.append($rowEl);
		});
		view.$el.append("Your score: " + score);
	};
	
	View.prototype.step = function () {
		var view = this;
		// if there is a snake segment at [0], call move
		if (_.last(view.board.snake.segments)) {
			view.board.snake.move();
			view.render();
		} else {
			alert("you lose");
			window.clearInterval(this.intervalID);
		}
		// otherwise, kill the interval
	};
	
	View.prototype.handleKeyEvent = function(event) {
		if (_(View.KEYS).has(event.keyCode)){
			this.board.snake.turn(View.KEYS[event.keyCode]);
		} else {
			// who cares
		}
	};
	
	View.prototype.start = function() {
		this.board = new SG.Board(20);
		
		// set up event listener
		$(window).keydown(this.handleKeyEvent.bind(this));
		
		// set up interval
		this.intervalID = window.setInterval(
			this.step.bind(this), 100);
	};
	
	
})(this);
// add-ons: make kid-friendly version that disables wall
// 					create easy-medium-hard. higher speeds == more points
// 					set up click-event to start. 
