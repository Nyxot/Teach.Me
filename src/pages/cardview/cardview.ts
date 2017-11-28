import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ViewController } from 'ionic-angular';
import firebase from 'firebase';
import { HomePage } from '../home/home';
import { CreatetutoriaPage } from '../createtutoria/createtutoria';

@IonicPage()
@Component({
  selector: 'page-cardview',
  templateUrl: 'cardview.html',
})
export class CardviewPage {

  card = {nombre: "", categoria: "", tutor: "", descripcion: ""};
  idCard: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public app: App, public viewCtrl: ViewController) {
    console.log(navParams.get('cardNombre'));

    firebase.database().ref('tutorias/').on('value', data => {
      if(data.val() != null){
      var datos = data.val();
      var keys = Object.keys(datos)

      for(var i = 0; i < keys.length; i++) {
        var k = keys[i];
        var datoTutoria = datos[k];

        if(datoTutoria.tutoriaName == navParams.get('cardNombre') ){
          this.idCard = keys[i];
          this.card.nombre = datoTutoria.tutoriaName;
          this.card.categoria = datoTutoria.categoria;
          this.card.tutor = datoTutoria.tutorName;
          this.card.descripcion = datoTutoria.descripcion;
        }
        //console.log(this.card);
        //console.log(this.idCard);
      }
    }
    }, error =>{
      this.idCard = "";
      this.card.nombre = "";
      this.card.categoria = "";
      this.card.tutor = "";
      this.card.descripcion = "";
    });
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  deleteCard(){
    firebase.database().ref('tutorias/'+this.idCard).remove();
    this.viewCtrl.dismiss();
    this.app.getRootNav().setRoot(HomePage);
  }

  editCard(){
    this.navCtrl.push(CreatetutoriaPage, {
      cardID : this.idCard
    });
  }
}