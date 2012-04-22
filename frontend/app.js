define(['joshlib!vendor/underscore','joshlib!vendor/backbone','joshlib!router',
		'api',
        'joshlib!ui/panel','joshlib!ui/list',
        'data/2002/1/national','data/2002/2/national',
        'data/2002/1/departments/all','data/2002/2/departments/all',
        'data/2002/people',
        'data/2007/1/national','data/2007/2/national',
        'data/2007/1/departments/all','data/2007/2/departments/all',
        'data/2007/people',
        'data/2012/people',
        'data/geo',
        'requiretext!templates/result.html', 'requiretext!templates/result-people.html'],
  function(_,Backbone,Router,
            API,
            Panel, List,
            res_2002_1_national, res_2002_2_national,
            res_2002_1_departments, res_2002_2_departments,
            res_2002_people,
            res_2007_1_national, res_2007_2_national,
			res_2007_1_departments, res_2007_2_departments,
			res_2007_people,
			res_2012_people,
            geo,
            tpl_result, tpl_people) {
  	window._ = _;
  	window.geo = geo;

  	var app =  {
    	API:API,
    	views:{},
    	years:{active:2012, past:[2007, 2002]},
    	pastResults:{},
    	setup:function(){
  			var self=this;
  			self.initPastResults();
  			self.API.init(function(){
  				self.setupRouter();
  				self.startRouter();	
  			});
  			
  		},
  		initPastResults:function(){
  			var self=this;
  			_.each(self.years.past, function(y){
  				self.pastResults[y]={
					people:eval('res_'+y+'_people'),
  					1:{
  						national:eval('res_'+y+'_1_national'),
  						departments:eval('res_'+y+'_1_departments')
  					},
  					2:{
  						national:eval('res_'+y+'_2_national'),
  						departments:eval('res_'+y+'_2_departments')
  					}
  				};
  				
  			});
  		},
  		setupRouter:function(){
  			var self=this;
  			self.routes = Router({
	          routes: {
	            ""         				: 'home',
	            "/"        				: 'home',
	            "resultat/:year"		: 'result',
	            'resultat/:year/:round'	: 'result',
	            "error/:type" 			: 'error',
	            "error/:type/:details" 	: 'error'
	          },
	          result:function(year, round){
	          	self.viewResults(year, round || 1);
	          },
	          home:function(){
	          	self.viewHome();
	          },
	          error:function(){
	          	console.log('error', arguments);
	          }

	        });

  		},
  		startRouter:function(){
  			this.routes.historyStart();
      },
      viewHome:function(){
      	var self=this;
      	self.API.getStatus(function(err, res){
      		if (err){
      			console.error('unexpected error', err);
      			window.location.hash = 'error/initAPI/'+err.responseText;
      			return;
      		}
      		self.currentRound = res.phase;
      		$('h2').text((self.currentRound==1 ? '1er ': self.currentRound+'e ' )+'tour '+self.years.active);
      		if (res.timer && res.timer > 0){
      			
      			$('#wait').html('Résultats dans '+self.formatTime(res.timer));
      		}
      		else{
      			window.location.hash = 'resultat/'+self.years.active+'/'+self.currentRound;
      		}

      	});
      },
      viewResults:function(year, round){
      	var self=this;
      	self.getResults(year, round, function(err, results){
      		console.log('res',results )
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
	      	self.initMap('result-map');	
	      	self.fillMap(results.departments, year);


	      	if (results && results.national){
	      		$('h3').html('Source: '+_.first(results.national.sources)+', '+results.national.updated_at);
	      	}
      	});
      	

		$('h2').text((round==1 ? '1er ': round+'e ' )+'tour '+year);

      },
      getResults:function(year, round, callback){
		var self=this;
		if (year==self.years.active){
      		//get live results
      		self.API.getResults(year, round, callback);
      	}
      	else{
      		//static
      		callback(null,self.pastResults[year][round]);
      		
      	}
      },
      initMap:function(id){
      	var self=this;
      	self.map = {
      		keys:[],
      		raphael:new Raphael(document.getElementById(id), 600, 600)
      	};
      	_.each(geo, function(dep, key){
      		self.map.keys[key] = self.map.raphael.path(dep);
      	});
      },
      fillMap:function(results, year){
      	var self=this;
      	self.colorMap(results, year);
      },
      colorMap:function(results, year){
      	var self=this;
      	var people = self.pastResults[year] ? self.pastResults[year].people : eval('res_'+year+'_people');
      	var scores;
      	_.each(results, function(res, dep){
      		if (!self.map.keys[dep]){
      			return;
      		}
      		leader = _.first(_.sortBy(_.map(res.votes, function(item, name){
      			return {name:name, number:item.number, percent:item.percent};
      		}), function(item){return 0-item.number;}));

      		self.map.keys[dep].attr('fill', people[leader.name].color)
      	});
      },
      viewDepartmentResults:function(results){

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

	app.setup();

  	window.app=app;
  	return app;
  }
 );
