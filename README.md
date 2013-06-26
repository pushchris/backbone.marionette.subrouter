Backbone Marionette Subrouter
=============================

The Backbone Marionette Documentation suggests splitting controllers and routers up among your various modules to reduce the load on any single file and better modularize code, yet provides no easy means of doing so.

Backbone Marionette Subrouter extends the Marionette AppRouter and allows for multiple smaller routers to be used in conglomeration with the base router. The base router no longer needs to be enormous and can instead be relegated to delegating paths to the new subrouters.

The Backbone marionetter Subrouter is based heavily off of the work on the [Backbone SubRoute by Dave Cadwallader](https://github.com/ModelN/backbone.subroute)

Usage
=====

The Marionette SubRouter works indentical to a normal AppRouter with the exception that it takes a prefix as its first parameter.

So lets say you want all url paths starting with "country" to go to a seperate router you could set it up like so:

    var CountrySubRouter = Marionette.SubRouter.extend({
  	  	controller: subController,
		appRoutes: {
			"discover" : "discover",
			":country/learn": "learn",
			":country/visit": "visit"
		}
	});
  
    var subController = {
  	    discover: function() {
			console.log("You should look into Mongolia");
		},
		learn: function(country) {
			console.log("Learning about: " + country);
		},
		visit: function(country) {
			console.log("Visiting: " + country);
		}
	}
  
Now to start the SubRouter all you need to do is create an instance of it passing in a base path (or prefix).

    var subRouter = new CountrySubRouter("country");
