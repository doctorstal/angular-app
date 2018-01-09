import { NotificationsService } from './app/i18nNotifications/notifications/notifications.service';
import { AppComponent } from './app/app.component';
import { downgradeComponent, downgradeInjectable } from '@angular/upgrade/static';
import { appModule as ng1App } from './ng1-app/app';
import { i18nMessages } from './app/i18nNotifications/constants/i18nMessages';
import { servicesNotificationsModule } from './ng1-app/common/services/notifications';

export { appModule as ng1App } from './ng1-app/app';

// Hybrid app should be angularJs app, containing downgraded angular2+ component(s)

angular.module(ng1App)
    .constant('I18N.MESSAGES', i18nMessages)

angular.module(servicesNotificationsModule)
    .factory('notifications', downgradeInjectable(NotificationsService));