import { FlickrProvider } from '../../providers/flickr/flickr';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public photo: any = {};
  public userGeolocation: any = {};

  constructor(public navCtrl: NavController,
              public flickr: FlickrProvider,
              public geolocation: Geolocation) {
      this.initialize();
  }

  initialize() {
      this.getUserGeolocation();
  }

  getUserGeolocation() {
    this.geolocation.getCurrentPosition().then(position => {
      this.userGeolocation = {
          lat: position.coords.latitude,
          lon: position.coords.longitude
      }
      this.getRandomImage();
    }, error => {
      console.log('geolocation error');
      // set a fixed location just in case
      this.userGeolocation = {
        lat: -3.731862,
        lon: -38.526670
      }
      this.getRandomImage();
    });
  }

  getRandomImage(){
    let tags = 'rain';

    this.flickr.searchImage(this.userGeolocation.lat,
                            this.userGeolocation.lon,tags)
        .subscribe( data => {
          this.photo = data;
        });
  }

}
