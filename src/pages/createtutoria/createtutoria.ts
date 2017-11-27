import { Component } from '@angular/core';
import { IonicPage, 
  NavController, 
  LoadingController, 
  Loading, 
  AlertController,
  MenuController, 
  NavParams,
  ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { FormControl } from '@angular/forms/src/model';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-createtutoria',
  templateUrl: 'createtutoria.html',
})
export class CreatetutoriaPage {
  public createForm:FormGroup;
  public loading:Loading;
  uid = firebase.auth().currentUser.uid;
  nombre = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController, public afDatabase: AngularFireDatabase, 
    public afAuth: AngularFireAuth, public menuCtrl: MenuController,
    public viewCtrl: ViewController) {
    
    console.log(this.navParams.get('cardID'));
    if(!this.navParams.get('cardID')){
      console.log("no cardId");
      this.createForm = formBuilder.group({
        nombre: ['', Validators.compose([Validators.minLength(6), Validators.required])],
        descrip: ['', Validators.compose([Validators.minLength(20), Validators.required])],
        categoria: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });

    }else{

      console.log("cardId");

      firebase.database().ref('tutorias/' + this.navParams.get('cardID') ).on('value', data =>{
        if(data.val() != null ){
          console.log(data.val().tutoriaName);
          console.log(data.val().descripcion);
          console.log(data.val().categoria);

          this.createForm = formBuilder.group({
            nombre: [data.val().tutoriaName, Validators.compose([Validators.minLength(6), Validators.required])],
            descrip: [data.val().descripcion, Validators.compose([Validators.minLength(20), Validators.required])],
            categoria: [data.val().categoria, Validators.compose([Validators.minLength(6), Validators.required])]
          });
        }

      });
    
    }
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  createCard(){
    if (!this.createForm.valid){
      console.log(this.createForm.value);
    } else {
      const value = this.createForm.value;
      firebase.database().ref('users/' + this.uid).on('value', data => {
        this.nombre = data.val().name + " " + data.val().lastname;
      });

      firebase.database().ref('tutorias/' + this.uid +'@'+ value.nombre).set({
        tutorId: this.uid,
        tutorName: this.nombre,
        tutoriaName: value.nombre,
        descripcion: value.descrip,
        categoria: value.categoria
      });

      if(this.navParams.get('cardID')){
        firebase.database().ref('tutorias/' + this.navParams.get('cardID') ).on('value', data =>{
          if(data.val() != null ){
            if(this.navParams.get('cardID') != this.uid +'@'+ value.nombre){
              firebase.database().ref('tutorias/'+this.navParams.get('cardID')).remove();
            }
          }
        });
      }
    
      //this.navCtrl.popToRoot();
      this.viewCtrl.dismiss();
      this.navCtrl.setRoot(HomePage);
    }
  }
}
