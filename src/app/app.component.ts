import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { AuthProvider } from '../providers/auth/auth';

import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any;
  pages: Array<{name: string, icon: string, component: any}>
  user = firebase.auth().currentUser;
  userinfo = {
    lastname: "",
    name: "",
    username: ""
  }

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, afAuth: AngularFireAuth,
  public afAuthProvider: AuthProvider) {
    
    const authObserver = afAuth.authState.subscribe(user => {
      if(user){
        this.rootPage = HomePage;
        authObserver.unsubscribe();
      } else {
        this.rootPage = 'FeedPage';
        authObserver.unsubscribe();
      }
    });

    this.pages = [
      { name: 'Home', icon: 'home', component: HomePage },
      { name: 'Profile', icon: 'person', component: ProfilePage }
    ]

    /*
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
    */
  }

  openPage(page){
    this.nav.setRoot(page.component);
  }

  logoutUser(){
    this.afAuthProvider.logoutUser();
    this.nav.setRoot('FeedPage');
  }

}
