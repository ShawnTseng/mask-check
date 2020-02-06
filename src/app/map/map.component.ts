import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  private map;

  ngAfterViewInit() {
    this.initLocation();
  }

  /** 取得使用者位置 */
  private initLocation() {
    const geoLocation: Geolocation = navigator.geolocation;
    if (geoLocation) {
      geoLocation.getCurrentPosition(this.showPosition.bind(this));
    } else {
      console.log('Geolocation is not supported.');
    }
  }

  private showPosition(position: Position) {
    this.initMap(position.coords);
  }

  private initMap({ longitude, latitude }: Coordinates) {
    this.map = L.map('map', {
      center: [latitude, longitude],
      zoom: 17
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }
}
