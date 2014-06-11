(function(root) {
	var SG = root.SG = (root.SG || {});
	
	var View = SG.View = function($el) {
		this.$el = $el;
		this.board = null;
		
	};
	
	View.KEYS = {
		38: "n",
		39: "e",
		40: "s",
		37: "w"
	};
	
	View.prototype.render = function () {
		
	};
	
	View.prototype.step = function () {
		
	};
	
	View.prototype.handleKeyEvent = function(event) {
		if (_View.KEYS).has(event.keyCode)){
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
	};
	
	
})(this);
/*
  <body>
    <div id="grid"></div>

    <script>
      $(function () { new SG.View($("#grid")).start(); });
    </script>
  </body>
*/
