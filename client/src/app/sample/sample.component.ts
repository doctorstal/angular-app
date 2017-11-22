import { Component, ElementRef, Injector, Directive } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
@Component({
    selector: 'sample',
    // Here is the trick: 
    // We can upgrade only to ng2+ directives. But router will handle only component.
    // So we need this wrapper component to use upgraded component in routes.
    template: `<sample-component></sample-component>`
})
export class SampleComponent {}

@Directive({selector:'sample-component'})
export class SampleComponentDirective extends UpgradeComponent {
    constructor(elRef: ElementRef, injector: Injector) {
        super('sampleComponent', elRef, injector);
    }
}

