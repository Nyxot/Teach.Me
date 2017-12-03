import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';

import firebase from 'firebase';

import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-tutoriastakeview',
  templateUrl: 'tutoriastakeview.html',
})
export class TutoriastakeviewPage {

  card = {nombre: "", categoria: "", tutorName: "", tutorEmail: "", tutorID:"", completada:""};
  idCard: any;
  uid = firebase.auth().currentUser.uid;
  finish = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public viewCtrl: ViewController, public app: App) {

    firebase.database().ref('tutoriasperuser/'+this.uid).on('value', data => {
      if(data.val() != null){
      var datos = data.val();
      var keys = Object.keys(datos)
      
      for(var i = 0; i < keys.length; i++) {
        var k = keys[i];
        var datoTutoria = datos[k];
        console.log(this.navParams.get('tutorID'));
        //for(var j in datoTutoria){
          if(datoTutoria.tutorID == navParams.get('tutorID') ){
            this.idCard = keys[i];
            this.card.nombre = datoTutoria.tutoriaName;
            this.card.categoria = datoTutoria.categoria;
            this.card.tutorName = datoTutoria.tutorName;
            this.card.tutorEmail = datoTutoria.tutorEmail;
            this.card.tutorID = datoTutoria.tutorID;
            this.card.completada = datoTutoria.completada;
            if(datoTutoria.completada == true){
              this.finish = true;
            }
          }
        //}
      }
    }
    }, error =>{
      this.idCard = "";
      this.card.nombre = "";
      this.card.categoria = "";
      this.card.tutorName = "";
      this.card.tutorEmail = "";
      this.card.tutorID = "";
    });
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  finishTutoria(){
    firebase.database().ref('tutoriasperuser/'+this.uid+'/'+this.idCard).update({
      completada : true
    });
    this.viewCtrl.dismiss();
    this.app.getRootNav().setRoot(HomePage);
  }
}
