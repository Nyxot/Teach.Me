import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';

import firebase from 'firebase';

import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-tutoriaview',
  templateUrl: 'tutoriaview.html',
})
export class TutoriaviewPage {
  card = {nombre: "", categoria: "", tutoradoName: "", tutoradoEmail: "", tutoradoID:""};
  idCard: any;
  uid = firebase.auth().currentUser.uid;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public viewCtrl: ViewController, public app: App) {

    firebase.database().ref('tutoriasSolicitadas/'+this.uid).on('value', data => {
      if(data.val() != null){
      var datos = data.val();
      var keys = Object.keys(datos)
      
      for(var i = 0; i < keys.length; i++) {
        var k = keys[i];
        var datoTutoria = datos[k];

        for(var j in datoTutoria){
          if(datoTutoria[j].tutoradoID == navParams.get('tutoradoID') ){
            this.idCard = keys[i];
            this.card.nombre = datoTutoria[j].tutoriaName;
            this.card.categoria = datoTutoria[j].categoria;
            this.card.tutoradoName = datoTutoria[j].tutoradoName;
            this.card.tutoradoEmail = datoTutoria[j].tutoradoEmail;
            this.card.tutoradoID = datoTutoria[j].tutoradoID;
          }
        }
      }
    }
    }, error =>{
      this.idCard = "";
      this.card.nombre = "";
      this.card.categoria = "";
      this.card.tutoradoName = "";
      this.card.tutoradoEmail = "";
      this.card.tutoradoID = "";
    });
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  finishTutoria(){
    firebase.database().ref('tutoriasSolicitadas/'+this.uid+'/'+this.idCard+'/'+
    this.card.tutoradoID).update({
      completada : true
    });
    this.viewCtrl.dismiss();
    this.app.getRootNav().setRoot(HomePage);
  }
}