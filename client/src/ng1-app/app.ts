import { directivesCrudModule } from './common/directives/crud/crud';
import { servicesBreadcrumbsModule } from './common/services/breadcrumbs';
import { projectsModule } from './projects/projects';
import { projectsInfoModule } from './projectsinfo/projectsinfo';
import { dashboardModule } from './dashboard/dashboard';
import { servicesI18nNotificationsModule } from './common/services/i18nNotifications';
import { adminModule } from './admin/admin';
import { securityModule } from './common/security/index';
import { servicesExceptionHandlerModule } from './common/services/exceptionHandler';
import { servicesHttpRequestTracker } from './common/services/httpRequestTracker';
import app_component_html from './app.component.html';
import header_component_html from './header.component.html';
import notifications_component_html from './notifications.component.html';


export const appModule = angular.module('app', [
  'ngRoute',
  projectsInfoModule,
  dashboardModule,
  projectsModule,
  adminModule,
  servicesBreadcrumbsModule,
  servicesI18nNotificationsModule,
  servicesExceptionHandlerModule, // Somehow it was not in dependencies in original sources
  servicesHttpRequestTracker,
  securityModule,
  directivesCrudModule,
  'templates.app',
  'templates.common'])
.constant('MONGOLAB_CONFIG', {
  baseUrl: '/databases/',
  dbName: 'angular-app'
})

.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider.otherwise({redirectTo:'/projectsinfo'});
}])

.run(['security', function(security) {
  // Get the current user when the application starts
  // (in case they are still logged in from a previous session)
  security.requestCurrentUser();
}])

.component('appRoot', {
  template: app_component_html,
  controller:
 ['$scope', 'i18nNotifications', 'localizedMessages', function($scope, i18nNotifications, localizedMessages) {
  $scope.notifications = i18nNotifications;

  $scope.removeNotification = function (notification) {
    i18nNotifications.remove(notification);
  };

  $scope.$on('$routeChangeError', function(event, current, previous, rejection){
    i18nNotifications.pushForCurrentRoute('errors.route.changeError', 'error', {}, {rejection: rejection});
  });
}]
})

.component('headerComponent', {
  template: header_component_html,
  controller: ['$scope', '$location', '$route', 'security', 'breadcrumbs', 'notifications', 'httpRequestTracker',
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
}]
})
.name;
