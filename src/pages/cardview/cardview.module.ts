import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CardviewPage } from './cardview';

@NgModule({
  declarations: [
    CardviewPage,
  ],
  imports: [
    IonicPageModule.forChild(CardviewPage),
  ],
})
export class CardviewPageModule {}
