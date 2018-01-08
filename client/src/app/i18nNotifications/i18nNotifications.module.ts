import { NgModule } from '@angular/core';
import { I18N_MESSAGES } from './constants/i18nMessages.token';
import { i18nMessages } from './constants/i18nMessages';

@NgModule({
    declarations: [
    ],
    imports: [
    ],
    providers: [
        { provide: I18N_MESSAGES, useValue: i18nMessages }
    ]
})
export class I18nNotificationModule {
}