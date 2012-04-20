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
				console.log('req', options)
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
				return this.proxy(this.root+'home.json',{type:'text'}, function(err, res){
					if (err){
						return callback(err, null);
					}
					eval('var processed='+res.responseText);
					return callback(null, processed);
				});
			},
			getNationalResults:function(year, callback){

			},
			getDepartmentResults:function(year, department){

			}
		};
	}
);