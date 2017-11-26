import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';

import { CreatetutoriaPage } from '../createtutoria/createtutoria';
import { CardviewPage } from '../cardview/cardview';

import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-addtutoria',
  templateUrl: 'addtutoria.html',
})
export class AddtutoriaPage {

  cards = [];
  uid = firebase.auth().currentUser.uid;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public menuCtrl: MenuController, public modalCtrl: ModalController) {

    this.menuCtrl.enable(true, 'menu');

    firebase.database().ref('tutorias/').on('value', data => {
      if(data.val() != null){
      var datos = data.val();
      var keys = Object.keys(datos)

      for(var i = 0; i < keys.length; i++) {
        var k = keys[i];
        var datoTutoria = datos[k];

        if(datoTutoria.tutorId == this.uid){
          this.cards.push(
            {
              nombre : datoTutoria.tutoriaName,
              tutor : datoTutoria.tutorName,
              descripcion : datoTutoria.descripcion,
              categoria : datoTutoria.categoria
            }
          );
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

  createTutoria(){
    let addModal = this.modalCtrl.create(CreatetutoriaPage);
    addModal.present();
  }

  viewCard(nombre: string){
    console.log(nombre);
    let cardview = this.modalCtrl.create(CardviewPage, {cardNombre: nombre});
    cardview.present();
  }
  
}
