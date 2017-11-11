import { directivesCrudModule } from './../common/directives/crud/crud';
import { servicesBreadcrumbsModule } from './../common/services/breadcrumbs';
import { projectsModule } from './projects/projects';
import { projectsInfoModule } from './projectsinfo/projectsinfo';
import { dashboardModule } from './dashboard/dashboard';
import { servicesI18nNotificationsModule } from './../common/services/i18nNotifications';
import { adminModule } from './admin/admin';
import { securityModule } from '../common/security/index';
import { servicesExceptionHandlerModule } from '../common/services/exceptionHandler';
import { servicesHttpRequestTracker } from '../common/services/httpRequestTracker';
export const appModule = angular.module('app', [
  'ngRoute',
  projectsInfoModule.name,
  dashboardModule.name,
  projectsModule.name,
  adminModule.name,
  servicesBreadcrumbsModule.name,
  servicesI18nNotificationsModule.name,
  servicesExceptionHandlerModule.name, // Somehow it was not in dependencies in original sources
  servicesHttpRequestTracker.name,
  securityModule.name,
  directivesCrudModule.name,
  'templates.app',
  'templates.common']);

appModule.constant('MONGOLAB_CONFIG', {
  baseUrl: '/databases/',
  dbName: 'angular-app'
});

//TODO: move those messages to a separate module
appModule.constant('I18N.MESSAGES', {
  'errors.route.changeError':'Route change error',
  'crud.user.save.success':"A user with id '{{id}}' was saved successfully.",
  'crud.user.remove.success':"A user with id '{{id}}' was removed successfully.",
  'crud.user.remove.error':"Something went wrong when removing user with id '{{id}}'.",
  'crud.user.save.error':"Something went wrong when saving a user...",
  'crud.project.save.success':"A project with id '{{id}}' was saved successfully.",
  'crud.project.remove.success':"A project with id '{{id}}' was removed successfully.",
  'crud.project.save.error':"Something went wrong when saving a project...",
  'login.reason.notAuthorized':"You do not have the necessary access permissions.  Do you want to login as someone else?",
  'login.reason.notAuthenticated':"You must be logged in to access this part of the application.",
  'login.error.invalidCredentials': "Login failed.  Please check your credentials and try again.",
  'login.error.serverError': "There was a problem with authenticating: {{exception}}."
});

appModule.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider.otherwise({redirectTo:'/projectsinfo'});
}]);

appModule.run(['security', function(security) {
  // Get the current user when the application starts
  // (in case they are still logged in from a previous session)
  security.requestCurrentUser();
}]);

appModule.controller('AppCtrl', ['$scope', 'i18nNotifications', 'localizedMessages', function($scope, i18nNotifications, localizedMessages) {

  $scope.notifications = i18nNotifications;

  $scope.removeNotification = function (notification) {
    i18nNotifications.remove(notification);
  };

  $scope.$on('$routeChangeError', function(event, current, previous, rejection){
    i18nNotifications.pushForCurrentRoute('errors.route.changeError', 'error', {}, {rejection: rejection});
  });
}]);

appModule.controller('HeaderCtrl', ['$scope', '$location', '$route', 'security', 'breadcrumbs', 'notifications', 'httpRequestTracker',
  function ($scope, $location, $route, security, breadcrumbs, notifications, httpRequestTracker) {
  $scope.location = $location;
  $scope.breadcrumbs = breadcrumbs;

  $scope.isAuthenticated = security.isAuthenticated;
  $scope.isAdmin = security.isAdmin;

  $scope.home = function () {
    if (security.isAuthenticated()) {
      $location.path('/dashboard');
    } else {
      $location.path('/projectsinfo');
    }
  };

  $scope.isNavbarActive = function (navBarPath) {
    return navBarPath === breadcrumbs.getFirst().name;
  };

  $scope.hasPendingRequests = function () {
    return httpRequestTracker.hasPendingRequests();
  };
}]);
