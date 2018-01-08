import { AppComponent } from './app/app.component';
import { downgradeComponent, downgradeInjectable } from '@angular/upgrade/static';
import { appModule as ng1App } from './ng1-app/app';
import { i18nMessages } from './app/i18nNotifications/constants/i18nMessages';

export { appModule as ng1App } from './ng1-app/app';

// Hybrid app should be angularJs app, containing downgraded angular2+ component(s)

angular.module(ng1App)
    .constant('I18N.MESSAGES', i18nMessages)