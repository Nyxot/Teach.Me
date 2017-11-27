import { Component, ViewChild } from '@angular/core';
import { NavController, MenuController, Tabs } from 'ionic-angular';

import firebase from 'firebase/app';

import {CardsPage} from  '../cards/cards';
import {AddtutoriaPage} from '../addtutoria/addtutoria';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public myPhotoURL: any;
  @ViewChild("paymentTabs") paymentTabs: Tabs;
  cardsRoot = CardsPage;
  addRoot = AddtutoriaPage;
  shouldHide = false;
  uid = firebase.auth().currentUser.uid;

  constructor(public navCtrl: NavController, public menuCtrl: MenuController) {

    firebase.storage().ref().child('Photos/assets/programacion.png').getDownloadURL().then(url =>{
      this.myPhotoURL = url;
    });

    firebase.database().ref('users/' + this.uid).on('value', data =>{
      if(data.val() != null){
        data.val().tutor;
        console.log(data.val().tutor);
        if(data.val().tutor == true){
          this.shouldHide = true;
        }
      }
    });

    this.menuCtrl.enable(true, 'menu');
  }

  ionViewDidEnter(){
    //console.log("home");
  }
}
