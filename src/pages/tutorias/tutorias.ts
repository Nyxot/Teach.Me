import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import firebase from 'firebase';

import { TutoriaviewPage } from '../tutoriaview/tutoriaview';

@IonicPage()
@Component({
  selector: 'page-tutorias',
  templateUrl: 'tutorias.html',
})
export class TutoriasPage {

  uid = firebase.auth().currentUser.uid;
  cards = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public modalCtrl: ModalController) {

    firebase.database().ref('tutoriasSolicitadas/'+this.uid).on('value', data => {
      if(data.val() != null){
      var datos = data.val();
      var keys = Object.keys(datos)

      for(var i = 0; i < keys.length; i++) {
        var k = keys[i];
        var datoTutoria = datos[k];
        
        for(var j in datoTutoria){
          //console.log(datoTutoria[j]);
          if(datoTutoria[j].completada == false){
            this.cards.push(
              {
                nombre : datoTutoria[j].tutoriaName,
                tutorado : datoTutoria[j].tutoradoName,
                email : datoTutoria[j].tutoradoEmail,
                categoria : datoTutoria[j].categoria,
                tutoradoID : datoTutoria[j].tutoradoID
              }
            );
          }
        }
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

  viewCard(id: string){
    //console.log(nombre);
    let tutoriaview = this.modalCtrl.create(TutoriaviewPage, {tutoradoID: id});
    tutoriaview.present();
  }

}