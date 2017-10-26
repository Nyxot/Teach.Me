import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase/app';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  item: FirebaseListObservable<any>;
  tutors: Array<{tName: string, tApellido: string, tUsername: string}>

  constructor(public navCtrl: NavController, public afDatabase: AngularFireDatabase,
    public afAuth: AngularFireAuth, public menuCtrl: MenuController) {    

    firebase.database().ref('users/').on('value', gotData, err);

    function gotData(data){
      var datos = data.val();
      var keys = Object.keys(datos);

      for(var i = 0; i < keys.length; i++){
        var k = keys[i];
        var datoTutor = datos[k]
        var nombre = datoTutor.name
        var apellido = datoTutor.lastname;
        var username = datoTutor.username;

        console.log('nombre:' + nombre + 'apellido:' + apellido + 'username:' + username);

      }
    }

    function err(err){
      console.log(err);
    }

    this.menuCtrl.enable(true, 'menu');
  }
}
