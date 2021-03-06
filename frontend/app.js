define(['joshlib!vendor/underscore','joshlib!utils/dollar', 'joshlib!vendor/backbone','joshlib!router',
		'api',
        'joshlib!ui/panel','joshlib!ui/list',
        'data/2002/1/national','data/2002/2/national',
        'data/2002/1/departments/all','data/2002/2/departments/all',
        'data/2002/people',
        'data/2007/1/national','data/2007/2/national',
        'data/2007/1/departments/all','data/2007/2/departments/all',
        'data/2007/people',
        'data/2012/1/national',
        'data/2012/1/departments/all',
        'data/2012/people',
        'requiretext!templates/result.html', 'requiretext!templates/result-people.html', 'requiretext!templates/menu-item.html'],
  function(_,$,Backbone,Router,
            API,
            Panel, List,
            res_2002_1_national, res_2002_2_national,
            res_2002_1_departments, res_2002_2_departments,
            res_2002_people,
            res_2007_1_national, res_2007_2_national,
			res_2007_1_departments, res_2007_2_departments,
			res_2007_people,
			res_2012_1_national, 
			res_2012_1_departments,
			res_2012_people,
            tpl_result, tpl_people, tpl_menu_item) {
  	window._ = _;
    window.$ = $;

  	var app =  {
    	API:API,
    	views:{},
    	currentYear:2012,
    	currentRound:new Date().getTime()<1335909600000 ? 1 : 2, //1335909600000 = 2.5.2012
    	years:[2002, 2007, 2012],
    	pastResults:{},
      debug:function(){
        console && console.log.apply(console, arguments);
      },
    	setup:function(){
  			var self=this;
  			self.initPastResults();
  			self.API.init(function(){
  				self.setupRouter();
  				self.startRouter();	
  				self.initMenu();
  			});
  			
  		},
  		initPastResults:function(){
  			var self=this;
  			_.each(self.years, function(y){

  				self.pastResults[y]={
					people:(function(){
							try{
								return eval('res_'+y+'_people');
							}
							catch (e){
								return null;
							}
						})(),
  					1:{
  						national:(function(){
							try{
								return eval('res_'+y+'_1_national');
							}
							catch (e){
								return null;
							}
						})(),
  						departements:(function(){
							try{
								return eval('res_'+y+'_1_departments');
							}
							catch (e){
								return null;
							}
						})()
  					},
  					2:{
  						national:(function(){
							try{
								return eval('res_'+y+'_2_national');
							}
							catch (e){
								return null;
							}
						})(),
  						departements:(function(){
							try{
								return eval('res_'+y+'_2_departments');
							}
							catch (e){
								return null;
							}
						})()
  					}
  				};
  				
  			});
  		},
  		setupRouter:function(){
  			var self=this;
  			self.routes = Router({
	          routes: {
	            ""                                       : 'home',
	            "/"                                      : 'home',
	            "resultat/:year"						             : 'result',
	            'resultat/:year/:round'					         : 'result',
	            'resultat/:year/:round/departement/:dep' : 'resultDept',
	            "error/:type"                            : 'error',
	            "error/:type/:details" 					         : 'error'
	          },
	          result:function(year, round){
	          	$('#error').hide();
	          	self.viewResults(year || self.currentYear, round || self.currentRound);
	          },
	          resultDept:function(year, round, dep){
              $('#error').hide();
	          	self.viewResults(year, round, function(){
	          		self.viewDepartmentResults(dep);	
	          	});
	          	
	          },
	          home:function(){
	          	$('#error').hide();
	          	self.viewHome();
	          },

	          error:function(type, details){
	          	self.debug('error', arguments);
	          	$('#error').show();
	          	//setTimeout(function(){window.location.hash='';}, 2000);
	          }

	        });

  		},
  		startRouter:function(){
  			this.routes.historyStart();
      },
      initMenu:function(){
      	var entries = [];
      	_.each(this.years, function(year){
      		entries.push({label:year, href:'#resultat/'+year, children:[{
      				label:'1er tour',
      				href:'#resultat/'+year+'/1'
      			},
      			{
      				label:'2e tour',
      				href:'#resultat/'+year+'/2'
      			}
      		]});
      	});
      	
      	this.views.menu = new List({
      		el:'#menu',
      		itemTemplate:tpl_menu_item,
      		collection:new Backbone.Collection(entries)
      	});
      	this.views.menu.render();
      },
      viewHome:function(){
      	window.location.hash='resultat/'+this.currentYear;
        /*
        var self=this;
      	
        $('#wait').show();
      	self.API.getStatus(function(err, res){
		      $('#wait').hide();

      		if (err){
      			console.error('unexpected error', err);
      			window.location.hash = 'error/initAPI/'+err.responseText;
      			return;
      		}
      		//self.currentRound = res.phase;
      		$('h2').text((self.currentRound==1 ? '1er ': self.currentRound+'e ' )+'tour '+self.currentYear);
      		if (res.timer && res.timer > 0){
      			
      			$('#wait').html('Résultats dans '+self.formatTime(res.timer));
      		}
      		else{
      			window.location.hash = 'resultat/'+self.currentYear+'/'+self.currentRound;
      		}

      	});*/
      },
      viewResults:function(year, round, callback){
        var self=this;
      	if (self.currentResults && year==self.currentYear && round==self.currentRound){
          return callback ? callback() : true;
      	}
      	$('#result-department').hide();
      	$('#wait').show();
      	self.getResults(year, round, function(err, results){
    		  $('#wait').hide();



    		if (err || !results || !results.national){
          self.debug('viewResults error '+err);
    			window.location.hash = 'error/results/no';
    			return;
    		}

          self.currentYear = year;
        self.currentRound = round;  
        self.currentResults = results;
        if (self.currentResults.national.timer){
          //not yet
          $('h2').text((self.currentRound==1 ? '1er ': self.currentRound+'e ' )+'tour '+self.currentYear);
          $('#wait').html('Résultats dans '+self.formatTime(self.currentResults.national.timer)).show();

          return;
        }


      	
      		//sort results
			   self.views.resultInfos = new Panel({
	 			     el:"#result-infos",
	         	// templateEl:"#template-local",
	         	template : tpl_result,
	          	collection:new Backbone.Collection([results ? results.national : null]),
	      	});
	      	self.views.resultInfos.render();

	      	self.views.resultPeople = new List({
	      		el:'#result-people',
	      		itemTemplate:tpl_people,
	      		collection:new Backbone.Collection(results ? _.sortBy(_.map(results.national.votes, function(item, name){
	      			return _.extend({name:name}, item);
	      		}), function(item){return 0-item.percent}) : null)
	      	});
	      	self.views.resultPeople.render();
          self.initMap('result-map', function(){
            self.fillMap(self.currentResults.departements, year);
            if (self.currentResults && self.currentResults.national && self.currentResults.national.sources){
              $('#main-h3').html('Source: '+_.first(self.currentResults.national.sources)+', '+self.currentResults.national.updated_at);
            }
            $('#main-h2').text((round==1 ? '1er ': round+'e ' )+'tour '+year);
            if (callback){
              callback();
            }  
          });	
	      	
      	});

      },
      getResults:function(year, round, callback){
  		  var self=this;
  		  var results = self.pastResults[year] ? self.pastResults[year][round] : null;

  		  if (!results || !results.national){
      		//get live results
      		self.API.getResults(year, round, callback);
      	}
      	else{
      		//static
      		callback(null,results);
      		
      	}
      },
      initMap:function(id, callback){
      	this.debug('undefined method app.initMap');
        callback && callback();
      },
      fillMap:function(results, year){
      	var self=this;
      	self.colorMap(results, year);
      	self.bindMap();
      },
      colorMap:function(results, year){
      	var self=this;
      	_.each(results, function(res, dep){
         	var leader = self.getResultLeader(res, year);

          self.colorDepartment(dep, leader);
          
      	});
      },
      colorDepartment:function(dep, leader, year){
        this.debug('app.colorDep', dep, leader)
        if (!this.map.entries[dep]){
            return;
        }
        this.map.entries[dep].attr('fill',leader.color);
        this.map.entries[dep].node.id =  'map-item-'+dep;
      },
      getResultLeader:function(res, year){
        if (!res || !res.votes){
          return null;
        }
        if (!year){
          year = this.currentYear;
        }
        var leader = _.first(_.sortBy(_.map(res.votes, function(item, name){
            return {name:name, number:item.number, percent:item.percent};
          }), function(item){return 0-item.number;}));
        if (!leader) return null;

        try{
          var people = this.pastResults[year] ? this.pastResults[year].people : eval('res_'+year+'_people');  
        }
        catch(e){
          var people = {};
        }
        

        return {color:people[leader.name] ? people[leader.name].color : '#cecece', name:leader.name};

          
      },
      bindMap:function(){
      	var self = this;
      	$('#result-map path').bind('click', function(event){
      		var target = event.currentTarget || event.target;
      		var id = target.id.replace(/^map-item-/,'');
      		window.location.hash = 'resultat/'+self.currentYear+'/'+self.currentRound+'/departement/'+id;
      	});
      },
      viewDepartmentResults:function(department, results){
        var self=this;
      	if (!results){
      		results = self.currentResults;
      	}
      	self.views.resultDeptInfos = new Panel({
 			    el:"#result-department-infos",
         	// templateEl:"#template-local",
         	template : tpl_result,
          	collection:new Backbone.Collection([results && results.departements ? results.departements[department] : null]),
      	});
	     self.views.resultDeptInfos.render();
	     self.views.resultDeptPeople = new List({
      		el:'#result-department-people',
      		itemTemplate:tpl_people,
      		collection:new Backbone.Collection(results && results.departements ? _.sortBy(_.map(results.departements[department].votes, function(item, name){
      			return _.extend({name:name}, item);
      		}), function(item){return 0-item.percent}) : null)
      	});
      	self.views.resultDeptPeople.render();

      	if (results && results.departements && results.departements[department]){
      		var desc = results.departements[department].slug ? results.departements[department].slug.match(/^\/elections\/([^\_]*)/) : '';
      		
	      	$('#result-department h3').html('Résultats '+(desc ? desc[1].substring(0,1).toUpperCase()+desc[1].substring(1) : department));
	      	$('#result-department h4').html('Source: '+_.first(results.departements[department].sources)+', '+results.departements[department].updated_at);
	     }

	     $('#result-department').show();
      },
      formatTime:function(seconds){
      	var days = Math.floor(seconds/(3600*24));
      	seconds = seconds%(3600*24);
      	var hours = Math.floor(seconds/3600);
      	seconds = seconds%3600;
      	var minutes = Math.floor(seconds/60);
      	seconds = seconds%60;

      	return (days>0
      			? days+' jour'+(days>1 ? 's ' : ' ')
      			: ''
      			)
      			+ (hours > 0
      				? hours + ' heure'+(hours > 1 ? 's ':' ')
      				: ''
      			)
      			+ (minutes > 0
      				? minutes + ' minute'+(minutes>1 ? 's ':' ')
      				: '' 
      			)
      			+seconds+' secondes'
      			;

      }
  	};

  	return app;
  }
 );
