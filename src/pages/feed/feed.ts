import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {
  tutors: Array<{tName: string, tApellido: string, tUsername: string}>

  constructor(public navCtrl: NavController, public menuCtrl: MenuController, public navParams: NavParams) {

    this.tutors = [
      {tName: 'Noel', tApellido: 'Espino', tUsername: 'NoelCordova'},
      {tName: 'asdfs', tApellido: 'sadf', tUsername: 'ASDFASDFAS'},
      {tName: 'asdkfjai', tApellido: 'asdfa', tUsername: 'ASDASdasdASF'},
      {tName: 'asdkfjai', tApellido: 'asdfa', tUsername: 'ASDASdasdASF'}
    ];

    this.menuCtrl.enable(false, 'menu');
  }

  /*ionViewDidLoad() {
    console.log('ionViewDidLoad FeedPage');
  }*/

  logIn(){
    this.navCtrl.push('LoginPage');
  }

  createAccount(){
    this.navCtrl.push('SignupPage');
  }

}
