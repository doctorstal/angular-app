import { AppComponent } from './app/app.component';
import { Router } from '@angular/router';
import { enableProdMode, NgZone } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { downgradeComponent, UpgradeModule } from '@angular/upgrade/static';
import { setAngularLib } from '@angular/upgrade/static';
import { ng1App } from './downgrade';

if (environment.production) {
  enableProdMode();
}

// First we bootstrap ng2+ application. Module should have empty bootstrap, 
// so no components will be bootstrapped now
platformBrowserDynamic().bootstrapModule(AppModule)
  .then(moduleRef => {
    // Then we should bootstrap angularJs application. 
    // Downgraded 2+ components should be already added to that module
    const upgrade: UpgradeModule = moduleRef.injector.get(UpgradeModule);
    setAngularLib(angular);

    upgrade.bootstrap(document.body, [ng1App.name]);

    // Next thing we need to do - init ng2+ Router navigation.
    // We need to do it in NgZone::run, so routerLinks will work smoothly.
    const zone: NgZone = moduleRef.injector.get(NgZone);
    zone.run(()=>{
      moduleRef.injector.get(Router).initialNavigation();
    });

    // Hybrid app bootstrap is done!
  })
  .catch(err => console.log(err));
