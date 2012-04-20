define(['joshlib!vendor/underscore','joshlib!vendor/backbone','joshlib!router',
		'api',
        'joshlib!ui/panel','joshlib!ui/list',
        'data/2007/1/national',
        'requiretext!templates/items.html'],
  function(_,Backbone,Router,
            API,
            Panel, List,
            data,
            tpl_items) {
  	window._ = _;
      
    var app =  {
    	API:API,
    	years:{active:2012, past:[2007, 2002, 1995]},
  		setup:function(){
  			var self=this;
  			self.API.init(function(){
  				self.setupRouter();
  				self.startRouter();	
  			});
  			
  		},
  		setupRouter:function(){
  			var self=this;
  			self.routes = Router({
	          routes: {
	            ""         : 'home',
	            "/"        : 'home',
	            "error/:type" : 'error',
	            "error/:type/:details" : 'error'
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
      			window.location.hash = 'error/initAPI/'+err;
      			return;
      		}
      		self.currentRound = res.phase;
      		$('h2').text((self.currentRound==1 ? '1er ': self.currentRound+'e ' )+'tour '+self.years.active);
      		if (res.timer && res.timer > 0){
      			
      			$('#wait').html('Résultats dans '+self.formatTime(res.timer));
      		}

      	});
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
