import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';

import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {
  //Obtener uid del usuario activo, pero como en feed no hay se lo voy a pasar directamente
  //user = firebase.auth().currentUser.uid;

  cards = [];

  constructor(public navCtrl: NavController, public menuCtrl: MenuController) {

    //Esta consulta se hace directamente a los usuarios y agarra todos los que existen
    firebase.database().ref('tutorias/').on('value', data => {
      if(data.val() != null){
      var datos = data.val();
      var keys = Object.keys(datos)

      for(var i = 0; i < keys.length; i++) {
        var k = keys[i];
        var datoTutoria = datos[k];

        this.cards.push(
          {
          nombre : datoTutoria.tutoriaName,
            tutor : datoTutoria.tutorName,
            descripcion : datoTutoria.descripcion,
            categoria : datoTutoria.categoria
          }
        );
        //console.log(this.cards);
      }
    }   
    }, error =>{
      this.cards.push(
        {
        nombre : "",
          tutor : "",
          descripcion : "",
          categoria : ""
        }
      );
    });
    
    //Cuando quieras hacer una consulta a un usuario en especifico debes obtener su uid y se lo pasas como ref.
    //la ref deberia ser: 'users/' + this.user
    /*
    firebase.database().ref('users/' + 'NecrYIXDxQgbdjhkf7nyqtp2i2w2').on('value', data => {
      this.infoCurso.nombre = data.val().name + " " + data.val().lastname;
      this.infoCurso.descripcion = "Esto es la descripcion"; // data.val().descripcion
      this.infoCurso.categoria = "Esta es la categoria"; //data.val().categoria
    });
    */

    this.menuCtrl.enable(false, 'menu');
  }

  logIn(){
    this.navCtrl.push('LoginPage');
  }

  createAccount(){
    this.navCtrl.push('SignupPage');
  }

}
