define(['joshlib!vendor/underscore', 'joshlib!vendor/reqwest'], 
	function(_, reqwest){
		return {
			root:'http://www.francetv.fr/resultats/',
			proxyURL:'/proxy',
			/** Map $.ajax
			* @function
			* @param {Object} options
			* @param {Function} callback
			**/
			request:function(options, callback){
				var done = false;
				var params = _.extend(options,
				                {
				                  success:function(data){
				                    done = true;
				                    callback(null, data)
				                  },
				                  error:function(err){
				                    done = true;
				                    callback(err, null);
				                  }
				                }
				              );
				//$.ajax(params);
				reqwest(params);
				setTimeout(function(){
				  if (!done){
				              console.log('timedout', params.url)

				    return callback('Request failed - '+options.url, null);
				  }
				}, 7500);

			},
			proxy:function(url, options, callback){
				return this.request(_.extend(options, {url:this.proxyURL, data:{url:encodeURIComponent(url)}}), callback);
			},
			init:function(callback){
				return callback();
			},
			getStatus:function(callback){
				var self=this;
				return this.proxy(this.root+'home.json',{type:'text'}, function(err, res){
					self.processTextResult(err, res, callback);
				});
			},
			getNationalResults:function(year, round, callback){
				var self=this;
				var url = this.getResultsRoot(year, round)+'/national/france.json';
				return this.proxy(url, {type:'text'}, function(err, res){
					self.processTextResult(err, res, callback);
				});
			},
			getDepartmentResults:function(year, round, department, callback){
				var self=this;
				var url = this.getResultsRoot(year, round)+'/department/'+department+'.json';
				return this.proxy(url, {type:'text'}, function(err, res){
					self.processTextResult(err, res, callback);
				});
			},
			getResultsRoot:function(year, round, type){
				if (!type){
					type='presidential';
				}
				return this.root+'resultats/'+year+'/'+type+'/'+round;
			},
			processTextResult:function(err, res, callback){
				if (err){
						return callback(err, null);
				}
				eval('var processed='+res.responseText);
				return callback(null, processed);
			}
		};
	}
);