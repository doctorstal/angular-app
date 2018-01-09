import { NotificationsModule } from './notifications/notifications.module';
import { NgModule } from '@angular/core';
import { I18N_MESSAGES } from './constants/i18nMessages.token';
import { i18nMessages } from './constants/i18nMessages';
import { LocalizedMessagesModule } from './localized-messages/localized-messages.module';
import { I18NotificationsService } from './i18-notifications.service';

@NgModule({
    declarations: [
    ],
    imports: [
        LocalizedMessagesModule,
        NotificationsModule
    ],
    providers: [
        { provide: I18N_MESSAGES, useValue: i18nMessages },
        I18NotificationsService,
    ]
})
export class I18nNotificationModule {
}