import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import firebase from 'firebase';

import { TutoriastakeviewPage } from '../tutoriastakeview/tutoriastakeview';

@IonicPage()
@Component({
  selector: 'page-tutoriastake',
  templateUrl: 'tutoriastake.html',
})
export class TutoriastakePage {

  uid = firebase.auth().currentUser.uid;
  cards = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public modalCtrl: ModalController) {
    
    firebase.database().ref('tutoriasperuser/'+this.uid).on('value', data => {
      if(data.val() != null){
      var datos = data.val();
      var keys = Object.keys(datos)

      for(var i = 0; i < keys.length; i++) {
        var k = keys[i];
        var datoTutoria = datos[k];
        
        //for(var j in datoTutoria){
          //console.log(datoTutoria[j]);
          if(datoTutoria.completada == false){
            this.cards.push(
              {
                nombre : datoTutoria.tutoriaName,
                tutor : datoTutoria.tutorName,
                email : datoTutoria.tutorEmail,
                categoria : datoTutoria.categoria,
                tutorID : datoTutoria.tutorID
              }
            );
          }
        //}
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
  }

  viewCard(id : string){
    console.log(id);
    let tutoriaview = this.modalCtrl.create(TutoriastakeviewPage, {tutorID: id});
    tutoriaview.present();
  }
}
