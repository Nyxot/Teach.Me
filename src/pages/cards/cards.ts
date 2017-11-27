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
    this.menuCtrl.enable(true, 'menu');
  }

}
