import { Injectable } from '@angular/core';
import { Http, Jsonp, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FlickrProvider {

  private apiKey       = 'ec56c4e1b1e10a6c96a32300b8e774c8';
  private baseUrl      = 'https://api.flickr.com/services/rest/';

  private queryParams = {
    api_key      : this.apiKey,
    method       : 'flickr.photos.search',
    tags         : 'rain',
    lat          : null,
    lon          : null,
    format       : 'json',
    media        : 'photos',
     // different sizes here: https://www.flickr.com/services/api/misc.urls.html
    extras       : 'url_z, description, owner_name, date_taken',
    jsoncallback : 'JSONP_CALLBACK'
  }

  constructor(public http: Http, public jsonp: Jsonp) { }

  get(endpoint: string, params?: any, options?: RequestOptions) {
    options = new RequestOptions();

    // Support easy query params for GET requests
    let p = new URLSearchParams();
    if (params) {
      for(let k in params) {
        p.set(k, params[k]);
      }

    }

    // Set the search field if we have params and don't already have
    // a search field set in options.
    options.search = !options.search && p || options.search;
    return this.jsonp.get(endpoint, options);
  }

  searchImage(lat, lon, tags): any{
    this.queryParams.tags = tags;
    this.queryParams.lat  = lat;
    this.queryParams.lon  = lon;

    return this.get(this.baseUrl, this.queryParams).map(res => {
      let response = res.json();
      let photos = response.photos.photo;
      if(photos){
        let quantity    = photos.length;
        let randomIndex = Math.floor(Math.random() * quantity);
        let photo = photos[randomIndex];
        console.log(photo);
        return {
          title : photo.title,
          date  : photo.datetaken,
          owner : photo.ownername,
          image : photo.url_z
        }
      } else {
        return {};
      }
    });
  }

}
