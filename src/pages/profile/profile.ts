import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  userinfo = {
    name: "",
    lastname: "",
    username: ""
  }

  user = firebase.auth().currentUser;

  constructor(public navCtrl: NavController, public navParams: NavParams, afAuth: AngularFireAuth) {
  
    if(this.user != null){      
      console.log(this.user.uid);
      console.log(this.user.email);

      firebase.database().ref(`users/` + this.user.uid).on('value', data => {
        this.userinfo.username = '@' + data.val().username;
        this.userinfo.name = data.val().name;
        this.userinfo.lastname = data.val().lastname;
      })
    }
  }

  deleteAccount() {

    firebase.database().ref('users/' + this.user.uid).remove();
    this.user.delete().then( info => {
      console.log('UID removed: ' + this.user.uid)
    }).catch(error => {
      console.log(error)
    })
    this.navCtrl.setRoot('FeedPage');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
