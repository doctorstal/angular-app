import { securityLoginToolbarModule } from './toolbar';
import { securityLoginFormModule } from './LoginFormController';
export const securityLoginModule = angular.module('security.login', [
    securityLoginFormModule.name, 
    securityLoginToolbarModule.name
]);