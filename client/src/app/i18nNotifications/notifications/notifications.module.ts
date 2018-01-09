import { rootScopeProvider } from './../../../upgrade';
import { NotificationsService } from './notifications.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
  ],
  providers: [
    rootScopeProvider,
    NotificationsService
  ]
})
export class NotificationsModule { }
