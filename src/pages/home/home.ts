import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import firebase from 'firebase/app';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public myPhotoURL: any;

  constructor(public navCtrl: NavController, public menuCtrl: MenuController) {

    firebase.storage().ref().child('Photos/assets/programacion.png').getDownloadURL().then(url =>{
      this.myPhotoURL = url;
    });

    this.menuCtrl.enable(true, 'menu');
  }
}
