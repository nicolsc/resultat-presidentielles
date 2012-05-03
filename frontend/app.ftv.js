define(['app', 'api.ftv', 'data/geo'],
	function(mainApp, API, geo){
		var app = _.extend({}, mainApp, {
			API:API,
			initMap:function(id, callback){
				var self=this;
		      	document.getElementById(id).innerHTML = '';
		      	self.map = {
		      		entries:{},
		      		raphael:new Raphael(document.getElementById(id), 600, 600),
		      	};
		      	self.map.set = self.map.raphael.set();
		      	_.each(geo, function(dep, key){
		      		self.map.entries[key] = self.map.raphael.path(dep);
		      		self.map.set.push(self.map.entries[key])
		      	});

		      	callback();
			}
		});


		app.setup();
		window.app = app;
		return app;
	}
);