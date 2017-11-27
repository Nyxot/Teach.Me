import { Component } from '@angular/core';
import { IonicPage, 
  NavController, 
  LoadingController, 
  Loading, 
  AlertController,
  MenuController, 
  NavParams } from 'ionic-angular';
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
    public afAuth: AngularFireAuth, public menuCtrl: MenuController) {

    this.createForm = formBuilder.group({
      nombre: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      descrip: ['', Validators.compose([Validators.minLength(20), Validators.required])],
      categoria: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  closeModal() {
    this.navCtrl.pop();
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
    
      this.navCtrl.setRoot(HomePage);
      this.navCtrl.popToRoot();
    }
  }
}
