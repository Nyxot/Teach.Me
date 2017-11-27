import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { AuthProvider } from '../providers/auth/auth';
import { UserinfoPage } from '../pages/userinfo/userinfo';
import { AddtutoriaPage } from '../pages/addtutoria/addtutoria';
import { CardsPage } from '../pages/cards/cards';
import { CreatetutoriaPage } from '../pages/createtutoria/createtutoria';
import { CardviewPage } from '../pages/cardview/cardview';
import { CardviewhomePage } from '../pages/cardviewhome/cardviewhome';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

const firebaseConfig = {
  apiKey: "AIzaSyBTmTXCe85iCgjhwCi5dUT8n4u_oVZAt5c",
  authDomain: "teachme-3167c.firebaseapp.com",
  databaseURL: "https://teachme-3167c.firebaseio.com",
  projectId: "teachme-3167c",
  storageBucket: "teachme-3167c.appspot.com",
  messagingSenderId: "574506350680"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    UserinfoPage,
    ProfilePage,
    AddtutoriaPage,
    CardsPage,
    CreatetutoriaPage,
    CardviewPage,
    CardviewhomePage,
    LoginPage,
    SignupPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    UserinfoPage,
    ProfilePage,
    AddtutoriaPage,
    CardsPage,
    CreatetutoriaPage,
    CardviewPage,
    CardviewhomePage,
    LoginPage,
    SignupPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider
  ]
})
export class AppModule {}
