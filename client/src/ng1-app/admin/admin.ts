import { adminUsersModule } from './users/admin-users';
import { adminProjectsModule } from './projects/admin-projects';
export const adminModule = angular.module('admin', [
    adminProjectsModule, 
    adminUsersModule
])
.name;
