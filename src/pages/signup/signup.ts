import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';




@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  name:string;
  email:string;
  username:string;
  password:string;

  constructor(public navCtrl: NavController, public storage: Storage,public alertCtrl: AlertController) {
  }

 localStorage(){
   this.storage.get('name');
   this.storage.set('name', {name:this.name,email:this.email,username:this.username,password:this.password});
   let alert = this.alertCtrl.create({
      title: 'Sucesso!!',
      subTitle: 'Seja bem vindo ao RADAR DA CIDADE',
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.push(TabsPage);
 }



  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup(){
    //Api conecction
    this.navCtrl.push(TabsPage);
  }

}
