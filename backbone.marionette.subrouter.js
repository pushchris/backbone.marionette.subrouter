// This is heavily based on Backbone.SubRoute 
// (https://github.com/ModelN/backbone.subroute) by Dave Cadwallader


(function (factory) {
    if (typeof define === "function" && define.amd) {
        define(["underscore", "backbone", "marionette"], factory);
    } else {
        factory(_, Backbone, Marionette);
    }
}(function(_, Backbone, Marionette) {
    Marionette.SubRouter = Marionette.AppRouter.extend({
        constructor: function(prefix, options) {
 
            var routes = {};
 
            // Prefix is optional, set to empty string if not passed
            this.prefix = prefix = prefix || "";
 
            // SubRoute instances may be instantiated using a prefix with or without a trailing slash.
            // If the prefix does *not* have a trailing slash, we need to insert a slash as a separator
            // between the prefix and the sub-route path for each route that we register with Backbone.
            this.separator = (prefix.slice(-1) === "/")
                            ? ""
                            : "/";
 
            // If you want to match "books" and "books/" without creating separate routes, set this
            // option to "true" and the sub-router will automatically create those routes for you.
            var createTrailingSlashRoutes = options && options.createTrailingSlashRoutes;
 
            if (this.appRoutes) {
 
                if (options && options.controller) {
                    this.controller = options.controller;
                }
 
                _.each(this.appRoutes, function(callback, path) {
                    if (path) {
                        // Strip off any leading slashes in the sub-route path,
                        // since we already handle inserting them when needed.
                        if (path.substr(0) === "/") {
                            path = path.substr(1, path.length);
                        }
 
                        routes[prefix + this.separator + path] = callback;
 
                        if (createTrailingSlashRoutes) {
                            routes[prefix + this.separator + path + "/"] = callback;
                        }
                    } else {
                        // Default routes (those with a path equal to the empty string)
                        // are simply registered using the prefix as the route path.
                        routes[prefix] = callback;
 
                        if (createTrailingSlashRoutes) {
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
            if (Backbone.history.fragment) {
                hash = Backbone.history.getFragment();
            } else {
                hash = Backbone.history.getHash();
            }

            _.every(this.appRoutes, function(key, route){
                if (hash.match(Backbone.Router.prototype._routeToRegExp(route))) {
                    Backbone.history.loadUrl(hash);
                    return false;
                }
                return true;
            }, this);
        },

        navigate: function(route, options) {
            if (route.substr(0, 1) != "/" &&
                route.indexOf(this.prefix.substr(0, this.prefix.length - 1)) !== 0) {

                route = this.prefix +
                    (route ? this.separator : "") +
                    route;
            }
            Marionette.AppRouter.prototype.navigate.call(this, route, options);
        }
    });
 
    return Marionette.SubRouter;
}));
