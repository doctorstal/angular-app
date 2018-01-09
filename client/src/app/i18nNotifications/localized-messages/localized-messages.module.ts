import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizedMessagesService } from './localized-messages.service';

@NgModule({
  imports: [],
  providers: [
    LocalizedMessagesService,
  ]
})
export class LocalizedMessagesModule { }
