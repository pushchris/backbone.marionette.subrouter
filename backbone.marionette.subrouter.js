// This is heavily based on Backbone.SubRoute 
// (https://github.com/ModelN/backbone.subroute) by Dave Cadwallader


(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['underscore', 'backbone'], factory);
    } else {
        factory(_, Backbone);
    }
}(function(_, Backbone){
    Marionette.SubRouter = Marionette.AppRouter.extend({
        constructor: function(prefix, options) {
 
            var controller,
                appRoutes,
                routes = {};
 
            // Prefix is optional, set to empty string if not passed
            this.prefix = prefix = prefix || "";
 
            // SubRoute instances may be instantiated using a prefix with or without a trailing slash.
            // If the prefix does *not* have a trailing slash, we need to insert a slash as a separator
            // between the prefix and the sub-route path for each route that we register with Backbone.
            this.separator = (prefix.slice(-1) === "/")
                            ? ""
                            : "/";
 
            // if you want to match "books" and "books/" without creating separate routes, set this
            // option to "true" and the sub-router will automatically create those routes for you.
            var createTrailingSlashRoutes = options && options.createTrailingSlashRoutes;
 
            if(this.appRoutes) {
 
                appRoutes = this.appRoutes;
                controller = this.controller;
 
                if(options && options.controller) {
                    controller = options.controller;
                }
 
                _.each(appRoutes, function(callback, path) {
 
                    if(path) {
                        // strip off any leading slashes in the sub-route path,
                        // since we already handle inserting them when needed.
                        if(path.substr(0) === "/") {
                            path = path.substr(1, path.length);
                        }
 
                        routes[prefix + this.separator + path] = callback;
 
                        if (createTrailingSlashRoutes) {
                            routes[prefix + this.separator + path + "/"] = callback;
                        }
                    } else {
                        // default routes (those with a path equal to the empty string)
                        // are simply registered using the prefix as the route path.
                        routes[prefix] = callback;
 
                        if(createTrailingSlashRoutes) {
                            routes[prefix + "/"] = callback;
                        }
                    }
 
                }, this);
 
                // Override the local sub-routes with the fully-qualified routes that we just set up.
                this.appRoutes = routes;
 
            }
 
            Marionette.AppRouter.prototype.constructor.call(this, options);

            // grab the full URL
            var hash;
            if(Backbone.history.fragment) {
                hash = Backbone.history.getFragment();
            } else {
                hash = Backbone.history.getHash();
            }

            // Trigger the subroute immediately.  this supports the case where 
            // a user directly navigates to a URL with a subroute on the first page load.
            if(hash.indexOf(prefix) === 0) {
                Backbone.history.loadUrl(hash);
            }
        }
 
    });
 
    return Marionette.SubRouter;
 
});
