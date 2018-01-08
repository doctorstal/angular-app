import { I18nNotificationModule } from './i18nNotifications/i18nNotifications.module';
import { 
  Router, 
  RouterModule,
  UrlHandlingStrategy,
  UrlTree 
} from '@angular/router';
import { UpgradeModule } from '@angular/upgrade/static';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

export class Ng1Ng2UrlHandlingStrategy extends UrlHandlingStrategy {
  shouldProcessUrl(url: UrlTree): boolean {
    return false;
  }
  extract(url) { return url; }
  merge(url, whole) { return url; }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    UpgradeModule,
    RouterModule.forRoot([]),
    I18nNotificationModule
  ],
  providers: [
    {provide: UrlHandlingStrategy, useClass: Ng1Ng2UrlHandlingStrategy}
  ]
})
export class AppModule {
  ngDoBootstrap(){
    // Empty bootstrap for hybrid app is required
  }
 }
