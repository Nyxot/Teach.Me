import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TutoriastakePage } from './tutoriastake';

@NgModule({
  declarations: [
    TutoriastakePage,
  ],
  imports: [
    IonicPageModule.forChild(TutoriastakePage),
  ],
})
export class TutoriastakePageModule {}
