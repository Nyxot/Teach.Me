import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import firebase from "firebase";

@IonicPage()
@Component({
  selector: 'page-cardviewhome',
  templateUrl: 'cardviewhome.html',
})
export class CardviewhomePage {
  card = {nombre: "", categoria: "", tutor: "", descripcion: "", tutorID: ""};
  idCard: any;
  uid = firebase.auth().currentUser.uid;
  uemail = firebase.auth().currentUser.email;
  uname = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public viewCtrl: ViewController) {

    //console.log(navParams.get('cardNombre'));
    
    firebase.database().ref('tutorias/').on('value', data => {
      if(data.val() != null){
      var datos = data.val();
      var keys = Object.keys(datos)

      for(var i = 0; i < keys.length; i++) {
        var k = keys[i];
        var datoTutoria = datos[k];

        if(datoTutoria.tutoriaName == navParams.get('cardNombre') ){
          this.idCard = keys[i];
          this.card.tutorID = datoTutoria.tutorId,
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
      this.card.tutorID = "",
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

  takeTutoria(){
    firebase.database().ref('tutoriasperuser/'+this.uid+'/'+this.idCard).set({
      tutorID : this.card.tutorID,
      tutorName : this.card.tutor,
      tutoriaName : this.card.nombre,
      categoria : this.card.categoria,
      descripcion : this.card.descripcion,
      completada : false
    });

    firebase.database().ref('users/'+this.uid).on('value', data =>{
      this.uname = data.val().name + " " + data.val().lastname;
    });

    firebase.database().ref('tutoriasSolicitadas/'+this.card.tutorID+'/'+this.idCard+'/'+
    this.uid).set({
      tutorID : this.card.tutorID, 
      tutoradoID : this.uid,
      tutoradoName : this.uname,
      tutoradoEmail : this.uemail,
      tutoriaName : this.card.nombre,
      categoria : this.card.categoria,
      descripcion : this.card.descripcion,
      completada : false
    });

    this.viewCtrl.dismiss();
  }

}
