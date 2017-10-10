import { Component } from '@angular/core';
import { 
  IonicPage, 
  NavController, 
  LoadingController, 
  Loading, 
  AlertController,
  MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HomePage } from '../home/home';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public loginForm:FormGroup;
  public loading:Loading;

  constructor(public navCtrl: NavController, public authData: AuthProvider, 
    public formBuilder: FormBuilder, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController, public afDatabase: AngularFireDatabase, public afAuth: AngularFireAuth,
    public menuCtrl: MenuController) {

      this.loginForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });

      this.menuCtrl.enable(false, 'menu');
  }

  loginUser(){
    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .then( authData => {


        this.afAuth.authState.subscribe(user =>{
          console.log(user.uid);
          console.log(this.afDatabase.object(`users/${user.uid}`));
          console.log(this.afDatabase.list(`users/${user.uid}`));
          console.log(this.afDatabase.app.database.toString);
          console.log(this.afDatabase.database.ref(`users/`+user.displayName));
          console.log(this.afDatabase.database.ref(`users/`+user.uid));
          console.log(this.afDatabase.database.ref('users'));

          if(this.afDatabase.list(`users/${user.uid}`)){}

          this.navCtrl.setRoot(HomePage);
        });

        
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
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

  goToResetPassword(){
    this.navCtrl.push('ResetPasswordPage');
  }

  createAccount(){
    this.navCtrl.push('SignupPage');
  }
}
