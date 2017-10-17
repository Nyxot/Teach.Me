import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public afDatabase: AngularFireDatabase,
    public afAuth: AngularFireAuth, public menuCtrl: MenuController) {

    afAuth.authState.subscribe(user => {
      this.items = afDatabase.list(`users/${user.uid}`);
    });

    this.menuCtrl.enable(true, 'menu');

  }

}
