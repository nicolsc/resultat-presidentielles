define(['joshlib!vendor/underscore', 'joshlib!vendor/reqwest'], 
	function(_, reqwest){
		return {
			root:undefined,
			proxyURL:'/proxy',
			/** Map $.ajax
			* @function
			* @param {Object} options
			* @param {Function} callback
			**/
			request:function(options, callback){
				var done = false;
				var timedout = false;
				var params = _.extend(options,
				                {
				                  success:function(data){
				                  	if (timedout){
				                  		//too late
				                  		return;
				                  	}
				                    done = true;
				                    callback(null, data)
				                  },
				                  error:function(err){
				                  	if (timedout){
				                  		//too late
				                  		return;
				                  	}
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
					timedout=true;
				    return callback('Request failed - '+options.url, null);
				  }
				}, 12500);

			},
			proxy:function(url, options, callback){
				return this.request(_.extend(options, {url:this.proxyURL, data:{url:encodeURIComponent(url)}}), callback);
			},
			init:function(callback){
				return callback();
			},
			getStatus:function(callback){
				callback('undefined method getStatus', null);
			},
			getResults:function(year, round, callback){
				callback('undefined method getResults', null);
			},
			getNationalResults:function(year, round, callback){
				callback('undefined method getNationalResults', null);
			},
			getEveryDepartementsResults:function(year, round, callback){
				callback('undefined method getEveryDepartementsResults', null);

			},
			getDepartmentResults:function(year, round, department, callback){
				callback('undefined method getDepartmentResults', null);
			},
			getResultsRoot:function(year, round, type){
				console && console.error('undefined method getResultsRoot');
				return null;
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