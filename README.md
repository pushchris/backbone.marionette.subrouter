Backbone Marionette Subrouter
=============================

The Backbone Marionette Documentation suggests splitting controllers and routers up among your various modules to reduce the load on any single file and better modularize code, yet provides no easy means of doing so.

Backbone Marionette Subrouter extends the Marionette AppRouter and allows for multiple smaller routers to be used in conglomeration with the base router. The base router no longer needs to be enormous and can instead be relegated to delegating paths to the new subrouters.

The Backbone Marionette Subrouter is based heavily off of the work on the [Backbone SubRoute by Dave Cadwallader](https://github.com/ModelN/backbone.subroute).

##Usage

The Marionette SubRouter works indentical to a normal AppRouter with the exception that it takes a prefix as its first parameter.

So if you wanted all url paths starting with "country" to go to a seperate router you could set it up like so:

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
    
##License

The MIT License (MIT)

Copyright (c) 2013

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
