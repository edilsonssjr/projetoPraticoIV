import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { ReportPage } from '../report/report';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(public navCtrl: NavController, public app: App) {

  }

  report(){
    this.navCtrl.push(ReportPage);
  }
}
