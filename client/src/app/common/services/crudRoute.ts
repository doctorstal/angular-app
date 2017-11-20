import { IServiceProviderClass, IServiceProvider } from "angular";

export const servicesCrudRouteModule = angular.module('services.crudRoute', [
  'ngRoute'
]).provider('crudRoute', ['$routeProvider', crudRouteProvider]);

function crudRouteProvider($routeProvider): IServiceProvider {
  // Should not be instantiated
  this.$get = angular.noop;
  //
  // now we have something like:
  //
  //
  // ```
  // myMod.config(function(crudRouteProvider) {
  //   var routeProvider = crudRouteProvider.routesFor('MyBook', '/myApp');
  // });
  // ```
  //
  // this function is the key part of this "provider helper".
  // We use it to create routes for CRUD operations.  We give it some basic information about
  // the resource and the urls then it it returns our own special routeProvider.
  this.routesFor = function (resourceName, urlPrefix, routePrefix) {
    var baseUrl = resourceName.toLowerCase();
    var baseRoute = '/' + resourceName.toLowerCase();
    routePrefix = routePrefix || urlPrefix;

    // Prepend the urlPrefix if available.
    if (angular.isString(urlPrefix) && urlPrefix !== '') {
      baseUrl = urlPrefix + '/' + baseUrl;
    }

    // Prepend the routePrefix if it was provided;
    if (routePrefix !== null && routePrefix !== undefined && routePrefix !== '') {
      baseRoute = '/' + routePrefix + baseRoute;
    }

    // Create the templateUrl for a route to our resource that does the specified operation.
    var templateUrl = function (operation) {
      return baseUrl + '/' + resourceName.toLowerCase() + '-' + operation.toLowerCase() + '.tpl.html';
    };
    // Create the controller name for a route to our resource that does the specified operation.
    var controllerName = function (operation) {
      return resourceName + operation + 'Ctrl';
    };

    // This is the object that our `routesFactory()` function returns.  It decorates `$routeProvider`,
    // delegating the `when()` and `otherwise()` functions but also exposing some new functions for
    // creating CRUD routes.  Specifically we have `whenList(), `whenNew()` and `whenEdit()`.
    var routeBuilder = {
      // Create a route that will handle showing a list of items
      whenList: function (resolveFns) {
        routeBuilder.when(baseRoute, {
          templateUrl: templateUrl('List'),
          controller: controllerName('List'),
          resolve: resolveFns
        });
        return routeBuilder;
      },
      // Create a route that will handle creating a new item
      whenNew: function (resolveFns) {
        routeBuilder.when(baseRoute + '/new', {
          templateUrl: templateUrl('Edit'),
          controller: controllerName('Edit'),
          resolve: resolveFns
        });
        return routeBuilder;
      },
      // Create a route that will handle editing an existing item
      whenEdit: function (resolveFns) {
        routeBuilder.when(baseRoute + '/:itemId', {
          templateUrl: templateUrl('Edit'),
          controller: controllerName('Edit'),
          resolve: resolveFns
        });
        return routeBuilder;
      },
      // Pass-through to `$routeProvider.when()`
      when: function (path, route) {
        $routeProvider.when(path, route);
        return routeBuilder;
      },
      // Pass-through to `$routeProvider.otherwise()`
      otherwise: function (params) {
        $routeProvider.otherwise(params);
        return routeBuilder;
      },
      // Access to the core $routeProvider.
      $routeProvider: $routeProvider
    };
    return routeBuilder;
  };

  return this;
}

