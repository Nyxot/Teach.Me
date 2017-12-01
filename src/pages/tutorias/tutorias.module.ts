import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TutoriasPage } from './tutorias';

@NgModule({
  declarations: [
    TutoriasPage,
  ],
  imports: [
    IonicPageModule.forChild(TutoriasPage),
  ],
})
export class TutoriasPageModule {}
