import { adminUsersEditModule } from './admin-users-edit';
import { adminUsersListModule } from './admin-users-list';
import { directivesGravatarModule } from './../../common/directives/gravatar';
import { securityAuthorizationModule } from './../../common/security/authorization';
import { servicesCrudModule } from './../../common/services/crud';

export const adminUsersModule = angular.module('admin-users', [
  adminUsersListModule,
  adminUsersEditModule,
  servicesCrudModule,
  securityAuthorizationModule,
  directivesGravatarModule
])

.config(['crudRouteProvider', 'securityAuthorizationProvider', function (crudRouteProvider, securityAuthorizationProvider) {

  crudRouteProvider.routesFor('Users', 'admin')
    .whenList({
      users: ['Users', function(Users) { return Users.all(); }],
      currentUser: securityAuthorizationProvider.requireAdminUser
    })
    .whenNew({
      user: ['Users', function(Users) { return new Users(); }],
      currentUser: securityAuthorizationProvider.requireAdminUser
    })
    .whenEdit({
      user:['$route', 'Users', function ($route, Users) {
        return Users.getById($route.current.params.itemId);
      }],
      currentUser: securityAuthorizationProvider.requireAdminUser
    });
}])
.name;