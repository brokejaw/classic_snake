(function(root) {
	var SG = root.SG = (root.SG || {});
	
	var View = SG.View = function($el, board) {
		this.$el = $el;
		this.board = new SG.Board(12)
		this.intervalID = null;
	};
	
	View.KEYS = {
		38: "n",
		39: "e",
		40: "s",
		37: "w"
	};
	
	View.prototype.render = function () {
		var view = this;
		var board = this.board;
		
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
		
		$('#score').html("Your score: " + board.score);
		$('#highscore').html("High-Score: " + board.highscore);
	};
	
	View.prototype.step = function () {
		var view = this;
		
		if (_.last(view.board.snake.segments)) {
			view.board.snake.move();
			view.render();
		} else {
			window.clearInterval(this.intervalID);
			view.start();
		}
	};
	
	View.prototype.handleKeyEvent = function(event) {
		if (_(View.KEYS).has(event.keyCode)){
			this.board.snake.turn(View.KEYS[event.keyCode]);
		} else {
		}
	};
	
	View.prototype.start = function() {
		this.board.boardSetup();
		
		$(window).keydown(this.handleKeyEvent.bind(this));
		
		this.intervalID = window.setInterval(
			this.step.bind(this), 100);
	};
	
	
})(this);