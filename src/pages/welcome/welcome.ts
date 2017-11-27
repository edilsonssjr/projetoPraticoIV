import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';

import { AlertController } from 'ionic-angular';

/**
 * Generated class for the WelcomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public alerCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  login(){
      this.navCtrl.push(LoginPage);
  }

  signup(){
      this.navCtrl.push(SignupPage);
  }

  remember(){
    let confirm = this.alerCtrl.create({
      title: 'Lembrar senha',
      message: "Digite seu e-mail para resetar sua senha",
      inputs: [
        {
          name: 'email',
          placeholder: 'E-mail'
        },
      ],
      buttons: [
        {
          text: 'Fechar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Enviar',
          handler: data => {
            let alert = this.alerCtrl.create({
              subTitle: 'E-mail de recuperação enviado!',
              buttons: ['OK']
            });
            alert.present();
          }
        }
      ]
    });
    confirm.present();
  }
  }


