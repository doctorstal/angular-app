import { securityServiceModule } from './security';
import { securityInterceptorModule } from './interceptor';
import { securityLoginModule } from './login/login';
import { securityAuthorizationModule } from './authorization';
// Based loosely around work by Witold Szczerba - https://github.com/witoldsz/angular-http-auth
export const securityModule = angular.module('security', [
  securityServiceModule,
  securityInterceptorModule,
  securityLoginModule,
  securityAuthorizationModule])
  .name;
