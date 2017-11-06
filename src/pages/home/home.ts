import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import firebase from 'firebase/app';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //tutors: Array<{tName: string, tApellido: string, tUsername: string}>
  public myPhotoURL: any;

  constructor(public navCtrl: NavController, public menuCtrl: MenuController) {

    firebase.storage().ref().child('Photos/assets/programacion.png').getDownloadURL().then(url =>{
      this.myPhotoURL = url;
    })

    /*
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
    */

    this.menuCtrl.enable(true, 'menu');
  }
}
