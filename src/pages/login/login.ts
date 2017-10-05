import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AlertController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    //Api conecction
    this.navCtrl.push(TabsPage);
    let alert = this.alertCtrl.create({
      subTitle: 'Seja bem vindo ao RADAR DA CIDADE',
      buttons: ['OK']
    });
     alert.present();
  }

}
