import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html',
})
export class CardsPage {

  cards = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public menuCtrl: MenuController) {
      
    firebase.database().ref('tutorias/').on('value', data => {
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
            categoria : datoTutoria.categora
          }
        );
        console.log(this.cards);
        /*
        this.cards.nombre = datoTutoria.tutoriaName;
        this.cards.tutor = datoTutoria.tutorName;
        this.cards.descripcion = datoTutoria.descripcion;
        this.cards.categoria = datoTutoria.categoria;
        */
      }
    });
    this.menuCtrl.enable(true, 'menu');
  }

}
