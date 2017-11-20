import { resourcesTasksModule } from './../common/resources/tasks';
import { resourcesProjectsModule } from './../common/resources/projects';
export const dashboardModule = angular.module('dashboard', [
  resourcesProjectsModule.name, 
  resourcesTasksModule.name
])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl:'dashboard/dashboard.tpl.html',
    controller:'DashboardCtrl',
    resolve:{
      projects:['Projects', function (Projects) {
        //TODO: need to know the current user here
        return Projects.all();
      }],
      tasks:['Tasks', function (Tasks) {
        //TODO: need to know the current user here
        return Tasks.all();
      }]
    }
  });
}])

.controller('DashboardCtrl', ['$scope', '$location', 'projects', 'tasks', function ($scope, $location, projects, tasks) {
  $scope.projects = projects;
  $scope.tasks = tasks;

  $scope.manageBacklog = function (projectId) {
    $location.path('/projects/' + projectId + '/productbacklog');
  };

  $scope.manageSprints = function (projectId) {
    $location.path('/projects/' + projectId + '/sprints');
  };
}]);