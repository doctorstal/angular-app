export const projectsInfoModule = angular.module('projectsinfo', [], ['$routeProvider', function($routeProvider){

  $routeProvider.when('/projectsinfo', {
    templateUrl:'projectsinfo/list.tpl.html',
    controller:'ProjectsInfoListCtrl',
    resolve:{
      projects:['Projects', function(Projects){
        return Projects.all();
      }]
    }
  });
}])
.controller('ProjectsInfoListCtrl', ['$scope', 'projects', function($scope, projects){
  $scope.projects = projects;
}])
.name;