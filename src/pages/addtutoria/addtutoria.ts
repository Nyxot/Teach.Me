import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';

import { CreatetutoriaPage } from '../createtutoria/createtutoria'

@IonicPage()
@Component({
  selector: 'page-addtutoria',
  templateUrl: 'addtutoria.html',
})
export class AddtutoriaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public menuCtrl: MenuController, public modalCtrl: ModalController) {
    this.menuCtrl.enable(true, 'menu');
  }

  createTutoria(){
    let addModal = this.modalCtrl.create(CreatetutoriaPage);
    addModal.present();
  }
}
