define(['api', 'joshlib!vendor/underscore'],
	function(API, _){
		return _.extend({},API,{
			root:'http://www.francetv.fr/resultats/',
			getStatus:function(callback){
				var self=this;
				return this.proxy(this.root+'home.json',{type:'text'}, function(err, res){
					self.processTextResult(err, res, callback);
				});
			},
			getResults:function(year, round, callback){
				var cb = _.after(2, callback); //2: national + all departements
				var results = {};
				this.getNationalResults(year, round, function(err, res){
					results.national =res;
					cb(err, results);
				});
				this.getEveryDepartementsResults(year, round, function(err, res){
					results.departements = res;
					cb(err, results);
				});



			},
			getNationalResults:function(year, round, callback){
				var self=this;
				var url = this.getResultsRoot(year, round)+'/national/france.json';
				return this.proxy(url, {type:'text'}, function(err, res){
					self.processTextResult(err, res, callback);
				});
			},
			getEveryDepartementsResults:function(year, round, callback){
				var cb = _.after(96, callback);
				var results = {};
				for (var i=96;i-->1;){
					if (i==20){
						//corse
						this.getDepartmentResults(year, round, '2A', function(err, res){
							results['2A'] =res;
							cb(err, results);
						});
						this.getDepartmentResults(year, round, '2B', function(err, res){
							results['2B'] =res;
							cb(err, results);
						});
					}
					else{
						this.getDepartmentResults(year, round, i,function(err, res){
							if (res && !err){
								results[res.department] =res;
							}
							cb(err, results);
						});
					}
				}

			},
			getDepartmentResults:function(year, round, department, callback){
				var self=this;
				if (department<10){
					department = '0'+department;
				}
				var url = this.getResultsRoot(year, round)+'/department/'+department+'.json';
				
				return this.proxy(url, {type:'text'}, function(err, res){
					self.processTextResult(err, res, function(error, result){
						callback(error, _.extend({department:department}, result));
					});
				});
			},
			getResultsRoot:function(year, round, type){
				if (!type){
					type='presidential';
				}
				return this.root+'resultats/'+year+'/'+type+'/'+round;
			},
		});

	}
);