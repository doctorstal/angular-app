import { sprintsModule } from './sprints/sprints';
import { securityAuthorizationModule } from './../common/security/authorization';
import { productBacklogModule } from './productbacklog/productbacklog';

export const projectsModule = angular.module('projects', [
  'resources.projects', 
  productBacklogModule, 
  sprintsModule, 
  securityAuthorizationModule])

.config(['$routeProvider', 'securityAuthorizationProvider', function ($routeProvider, securityAuthorizationProvider) {
  let conf: any = {
    controller:'ProjectsViewCtrl',
    resolve:{
      projects:['Projects', function (Projects) {
        //TODO: fetch only for the current user
        return Projects.all();
      }],
      authenticatedUser: securityAuthorizationProvider.requireAuthenticatedUser
    }
  };
  conf.templateUrl = 'projects/projects-list.tpl.html';
  $routeProvider.when('/projects', conf);
}])

.controller('ProjectsViewCtrl', ['$scope', '$location', 'projects', 'security', function ($scope, $location, projects, security) {
  $scope.projects = projects;

  $scope.viewProject = function (project) {
    $location.path('/projects/'+project.$id());
  };

  $scope.manageBacklog = function (project) {
    $location.path('/projects/'+project.$id()+'/productbacklog');
  };

  $scope.manageSprints = function (project) {
    $location.path('/projects/'+project.$id()+'/sprints');
  };

  $scope.getMyRoles = function(project) {
    if ( security.currentUser ) {
      return project.getRoles(security.currentUser.id);
    }
  };
}])
.name;
