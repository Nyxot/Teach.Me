import { Component } from '@angular/core';
import { 
  IonicPage, 
  NavController, 
  LoadingController, 
  Loading, 
  AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signupForm:FormGroup;
  public loading:Loading;

  tutor: boolean;
  user = { username: "", name: "", lastname: ""}

  constructor(public nav: NavController, public authData: AuthProvider, 
    public formBuilder: FormBuilder, public loadingCtrl: LoadingController, 
    public alertCtrl: AlertController, public afDatabase: AngularFireDatabase, public afAuth: AngularFireAuth) {

    this.signupForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
    });
  }

  /*
  datachanged(e:any){
    console.log(e.checked);
    this.checked = e.checked;
  }
  */

  signupUser(){
    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else {


      this.authData.signupUser(this.signupForm.value.email, this.signupForm.value.password).then(() => {
        this.afAuth.authState.subscribe(user =>{

          /*
          if(this.checked == true) this.afDatabase.object(`tutors/${user.uid}`).set(this.tutor);
          else this.afDatabase.object(`users/${user.uid}`).set(this.user);
          console.log("?:" + this.checked);
          */
          this.afDatabase.object(`users/${user.uid}`).set(this.user)
        });


        this.nav.setRoot('LoginPage');
      }, (error) => {
        this.loading.dismiss().then( () => {
          var errorMessage: string = error.message;
            let alert = this.alertCtrl.create({
              message: errorMessage,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }
}