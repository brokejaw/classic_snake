(function(root) {
	var SG = root.SG = (root.SG || {});
	
	var View = SG.View = function($el) {
		this.$el = $el;
	};
	
	View.prototype.start = function() {
		// create a new board object
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
