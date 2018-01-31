import { adminUsersListModule } from './admin-users-list';
describe('admin-users-list', function() {

  beforeEach(function() {
    angular.module('I18N-mock', []).value('I18N.MESSAGES', {});
  });
  beforeEach(angular.mock.module(adminUsersListModule, 'I18N-mock'));

  describe('UsersListCtrl', function () {

    it('should set up the scope correctly', inject(function($controller) {
      var locals = {
        $scope: <any>{},
        crudListMethods: jasmine.createSpy('crudListMethods'),
        users: {}
      };
      $controller('UsersListCtrl', locals);

      expect(locals.$scope.users).toBe(locals.users);
      expect(locals.crudListMethods).toHaveBeenCalled();
    }));
  });
});