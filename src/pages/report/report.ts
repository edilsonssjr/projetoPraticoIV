import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { TabsPage } from '../tabs/tabs';

declare var google;


@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {

  options: GeolocationOptions;
  currentPos: Geoposition;
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  public photos: any;
  public base64Image: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, public loadingCtrl: LoadingController, private camera: Camera,public alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.photos = [];
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.photos.push(this.base64Image);
    }, (err) => {
      // Handle error
    });
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

  addMap(lat, long) {

    let latLng = new google.maps.LatLng(lat, long);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
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

  ionViewDidEnter() {
    this.getUserPosition();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage');
  }

  setReport(){
    let alert = this.alertCtrl.create({
      title: 'Sucesso',
      subTitle: 'Sua mensagem foi enviada com sucesso!!',
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.push(TabsPage);
  }

}
 