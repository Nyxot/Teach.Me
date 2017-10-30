import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera } from 'ionic-native';

import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  userinfo = {
    name: "",
    lastname: "",
    username: "",
    email: ""
  }

  user = firebase.auth().currentUser;
  public myPhotosRef: any;
  public myPhoto: any;
  public myPhotoURL: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, afAuth: AngularFireAuth) {
    this.myPhotosRef = firebase.storage().ref('Photos/');

    firebase.storage().ref().child('Photos/' + this.user.uid + '/imgProfile.png').getDownloadURL().then(url =>{
      this.myPhotoURL = url;
    })

    if(this.user != null){      
      console.log(this.user.uid);
      console.log(this.user.email);

      firebase.database().ref(`users/` + this.user.uid).on('value', data => {
        this.userinfo.username = '@' + data.val().username;
        this.userinfo.name = data.val().name;
        this.userinfo.lastname = data.val().lastname;
        this.userinfo.email = this.user.email;
      })
    }
  }

  selectPhoto(): void {
    Camera.getPicture({
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.DATA_URL,
      quality: 100,
      encodingType: Camera.EncodingType.PNG,
    }).then(imageData => {
      this.myPhoto = imageData;
      this.uploadPhoto();
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

  private uploadPhoto(): void {
    this.myPhotosRef.child(this.user.uid).child('imgProfile.png')
    .putString(this.myPhoto, 'base64', { contentType: 'image/png' })
    .then((savedPicture) => {
      this.myPhotoURL = savedPicture.downloadURL;
    });
  }

  deleteAccount() {

    firebase.storage().ref().child('Photos/' + this.user.uid + '/imgProfile.png').delete().then( info => {
      console.log(info);
    }).catch( error => {
      console.log(error);
    })

    firebase.database().ref('users/' + this.user.uid).remove();
    
    this.user.delete().then( info => {
      console.log('UID removed: ' + this.user.uid)
    }).catch(error => {
      console.log(error)
    })

    this.navCtrl.setRoot('FeedPage');
  }
}
