import { servicesI18nNotificationsModule } from './../../common/services/i18nNotifications';
import { adminUsersEditValidateEqualsModule } from './validateEquals';
import { servicesCrudModule } from './../../common/services/crud';
import { adminUsersEditUniqueEmailModule } from './uniqueEmail';
export const adminUsersEditModule = angular.module('admin-users-edit',[
  servicesCrudModule.name,
  servicesI18nNotificationsModule.name,
  adminUsersEditUniqueEmailModule.name,
  adminUsersEditValidateEqualsModule.name
])

.controller('UsersEditCtrl', ['$scope', '$location', 'i18nNotifications', 'user', function ($scope, $location, i18nNotifications, user) {

  $scope.user = user;
  $scope.password = user.password;

  $scope.onSave = function (user) {
    i18nNotifications.pushForNextRoute('crud.user.save.success', 'success', {id : user.$id()});
    $location.path('/admin/users');
  };

  $scope.onError = function() {
    i18nNotifications.pushForCurrentRoute('crud.user.save.error', 'error');
  };

  $scope.onRemove = function(user) {
    i18nNotifications.pushForNextRoute('crud.user.remove.success', 'success', {id : user.$id()});
    $location.path('/admin/users');
  };

}]);