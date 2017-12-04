import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App,
          AlertController } from 'ionic-angular';

import firebase from 'firebase';

import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-tutoriaview',
  templateUrl: 'tutoriaview.html',
})
export class TutoriaviewPage {
  card = {nombre: "", categoria: "", tutoradoName: "", tutoradoEmail: "", tutoradoID:""};
  tiempo = {horas: ""};
  idCard: any;
  uid = firebase.auth().currentUser.uid;
  start = false;
  finish = false;
  temporizador = true;
  tempo = true;
  local = new Date();
  localdatetime = this.local.getHours() + ":" + this.local.getMinutes() + ":" + this.local.getSeconds();

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public viewCtrl: ViewController, public app: App, public alertCtrl : AlertController) {

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
            if(datoTutoria[j].completada == false){
              this.start = false;
              this.finish = true;
            }
            if(datoTutoria[j].startTime){
              this.start = true;
              this.finish = false;
              var start = parseInt(datoTutoria[j].startTime);
              var end = start + 2;
              var now = parseInt(this.localdatetime);
              console.log(start);
              console.log(end);
              if(now >= end){
                this.tiempo.horas = "0";
              }else{
                this.tiempo.horas = (end - now).toString();
              }
              console.log(this.tiempo.horas);
              this.temporizador = false;
            }
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

  startTutoria(){
    console.log("start");
    console.log(this.localdatetime);
    firebase.database().ref('tutoriasSolicitadas/'+this.uid+'/'+this.idCard+'/'+
    this.card.tutoradoID).update({
      startTime : this.localdatetime
    });

    firebase.database().ref('tutoriasSolicitadas/'+this.uid+'/'+this.idCard+'/'+
    this.card.tutoradoID).on('value', data =>{
      var datos = data.val();
      var start = parseInt(datos.startTime);
      var end = start + 2;
      var now = parseInt(this.localdatetime);
      console.log(start);
      console.log(end);
      if(now >= end){
        this.tiempo.horas = "0";
      }else{
        this.tiempo.horas = (end - now).toString();
      }
    })
    this.temporizador = false;
  }

  finishTutoria(){
    if(parseInt(this.tiempo.horas) <= 0){
      firebase.database().ref('tutoriasSolicitadas/'+this.uid+'/'+this.idCard+'/'+
      this.card.tutoradoID).update({
        completada : true
      });
      this.viewCtrl.dismiss();
      this.app.getRootNav().setRoot(HomePage);
    }else{
      /*let alert = this.alertCtrl.create({
        message : "Aun queda tiempo de tutoria",
        buttons : [
          {
            text: "OK",
            role: 'cancel'
          }
        ]
      });
      alert.present();
      */
      this.tempo = false;
    }

    console.log("finish");
  }
}