(function(root) {
	var SG = root.SG = (root.SG || {});
	
	var View = SG.View = function($el) {
		this.$el = $el;
	};
	
	View.prototype.start = function() {
		this.board = new SG.Board(20);
		
		// set up event listener
		
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
