import { AppComponent } from './app/app.component';
import { downgradeComponent } from '@angular/upgrade/static';
import { appModule as ng1App } from './ng1-app/app';

export { appModule as ng1App } from './ng1-app/app';

// Hybrid app should be angularJs app, containing downgraded angular2+ component(s)

