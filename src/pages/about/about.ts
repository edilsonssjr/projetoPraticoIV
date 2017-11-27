import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';


declare var google;

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  options: GeolocationOptions;
  currentPos: Geoposition;
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public app: App, private geolocation: Geolocation, public alertCtrl: AlertController,public loadingCtrl: LoadingController) {

  }

  getUserPosition() {
    let loader = this.loadingCtrl.create({
      duration: 1500
    });
    loader.present();
    this.options = {
      enableHighAccuracy: false
    };
    this.geolocation.getCurrentPosition(this.options).then((pos: Geoposition) => {

      this.currentPos = pos;

      this.addMap(pos.coords.latitude, pos.coords.longitude);

  
    }, (err: PositionError) => {
      alert("Por favor, ligue o GPS e reinicie o app");
      console.log("error : " + err.message);
      ;
    })
  }

 

  ionViewDidEnter() {
    this.getUserPosition();
  }

  addMap(lat, long) {

    let latLng = new google.maps.LatLng(lat, long);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.addMarker();

     this.addMarker();
    

  }

  addMarker() {

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<p>Marcador!</p>";
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });


  }

  logout() {
    //Api token logout
    const root = this.app.getRootNav();
    root.popToRoot();
  }



}
