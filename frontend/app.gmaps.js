define(['app', 'api.ftv', 'data/gmaps/all', 'js/polygonzo'], 
	function(mainApp,API, departements, PolyGonzo){
		window.PolyGonzo = PolyGonzo;
		window.data = departements;
		var app =  _.extend({}, mainApp,{
			API:API,
			gmaps_apiKey:'AIzaSyD7OiTesAiVvYe0BTuSCVpZQHP_PRJgNss',
			initMap:function(id, callback){
				var self = this;
				window.gmaps_init_done=false;
				window.gmaps_init_callback = function(){
					if (!gmaps_init_done){
						self.initGMaps(id, callback);
						delete gmaps_init_callback;
						gmaps_init_done=true;
					}
				};

				self.loadGMaps('gmaps_init_callback');

				setTimeout(function(){
					if (!gmaps_init_done){
						//offline ?
						
						window.location.pathname = window.location.pathname.replace(/\/gmaps/,'');
					}
				}, 2000);
			},
			loadGMaps:function(callbackName){
				var script = document.createElement("script");
				script.type = "text/javascript";
	  			script.src = 'http://maps.googleapis.com/maps/api/js?key='+this.gmaps_apiKey+'&sensor=true&callback='+callbackName;
	  			document.body.appendChild(script);
			},
			initGMaps:function(id, callback){
				this.map = {
					gmap : new google.maps.Map(document.getElementById(id), this.getGMapsDefaultOptions()),
					entries: departements.features
				};
				callback();
			},
			setPolyGonzo:function(){
				var self = this;
				self.map.polyGonzo = new PolyGonzo.PgOverlay({
					map:self.map.gmap,
					geos:[departements],
					events:{
						click:function(evt, target){
							if (target && target.feature){
								window.location.hash = 'resultat/'+self.currentYear+'/'+self.currentRound+'/department/'+target.feature.id;
								return;
							}
							self.debug('map click', 'unknown target', target);
						}
					}
				});
				self.map.polyGonzo.setMap(self.map.gmap);
			},
			fillMap:function(results, year){
				if (results){
					this.colorMap.apply(this, arguments);
					this.updateDepartmentsShapes(results);
					this.setPolyGonzo();
				}
				
			},
			colorDepartment:function(dep, leader){
				var self = this;

				//self.debug('app.gmaps.colorDep', dep, leader, leader.color);

				
			},
			getGMapsDefaultOptions:function(){
				if (!google || !google.maps){
					this.debug('gmaps init failed', google);
					return false;
				}
				return {
					zoom:6,
					center:new google.maps.LatLng(46.5,2.2),
					mapTypeId: google.maps.MapTypeId.TERRAIN,
					disableDefaultUI:true,
					// draggable:false,
					// disableDoubleClickZoom:true,
					// scrollwheel:false
				};
			},
			updateDepartmentsShapes:function(results){

				var self = this;
				if (!self.map || !self.map.entries){
					return self.debug('app.updateDepartmentsShapes', 'no map entries', self.map.entries);
				}
				var options = {
					fillColor: '#FF0000',
					fillOpacity: 0,
					strokeWidth: 0.2,
					strokeColor: '#000000',
					strokeOpacity: .5
				};
				_.each(self.map.entries, function(dep){
					var id = parseInt(dep.id, 10) > 100 ? dep.id : dep.id.substring(1);
					var leader = self.getResultLeader(results[id]);

					_.extend(dep, options, {
						fillColor:leader ? leader.color : '#ffff00',
						fillOpacity: leader ? 0.8 : 0,
						id:id
					});
				});

				return;
			}
		});
		window.app = app;
		app.setup();
		return app;
	}
);