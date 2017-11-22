import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleComponent, SampleComponentDirective } from './sample.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: SampleComponent}
    ])
  ],
  declarations: [
    SampleComponent,
    SampleComponentDirective
  ]
})
export class SampleModule { }
