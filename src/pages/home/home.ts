import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../../pages/login/login';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public afAuthProvider: AuthProvider,
  public afDatabase: AngularFireDatabase, public afAuth: AngularFireAuth) {

    afAuth.authState.subscribe(user => {
      this.items = afDatabase.list(`users/${user.uid}`);
    });

  }

  logoutUser(){
    this.afAuthProvider.logoutUser();
    this.navCtrl.setRoot(LoginPage);
  }

}
