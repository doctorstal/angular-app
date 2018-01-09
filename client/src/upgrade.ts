import { FactoryProvider } from "@angular/core/src/di/provider";

export const rootScopeProvider: FactoryProvider = {
    provide: '$rootScope',
    useFactory: $injector => $injector.get('$rootScope'),
    deps: ['$injector']
}