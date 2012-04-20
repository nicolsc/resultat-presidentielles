define(['joshlib!vendor/underscore','joshlib!vendor/backbone','joshlib!router',
        'joshlib!ui/panel','joshlib!ui/list',
        'data/2007/1/national',
        'requiretext!templates/items.html'],
  function(_,Backbone,Router,
            Panel, List,
            data,
            tpl_items) {
  	return {
  		setup:function(){
  			self.setupRouter();
  			self.startRouter();
  		},
  		setupRouter:function(){
  			self.routes = Router({
	          routes: {
	            ""         : 'home',
	            "/"        : 'home',
	            "error/:type" : 'error',
	            "error/:type/:details" : 'error'
	          },
	          home:function(){
	          	console.log('home');
	          },
	          error:function(){
	          	console.log('error', arguments);
	          }

	        });

  		},
  		startRouter:function(){
  			self.routes.historyStart();
      }
  	};
console.log('hello', data)
  }
 );
